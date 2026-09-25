import { Router } from 'express';
import { db } from '../db.js';
import { requireAuth, type AuthRequest } from '../auth.js';

export const mistakeRouter = Router();

// GET Student Mistake Bank
mistakeRouter.get('/mistakes', requireAuth, (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const { subject_id, resolved } = req.query;

    let query = `
      SELECT 
        mst.*,
        m.question_text,
        m.difficulty,
        m.question_type,
        m.english_explanation,
        m.urdu_explanation,
        m.memory_tip,
        s.name as subject_name,
        t.title as topic_title
      FROM mistakes mst
      JOIN mcqs m ON mst.mcq_id = m.id
      JOIN subjects s ON mst.subject_id = s.id
      JOIN topics t ON mst.topic_id = t.id
      WHERE mst.user_id = ?
    `;
    const params: any[] = [userId];

    if (subject_id) {
      query += ' AND mst.subject_id = ?';
      params.push(subject_id);
    }
    if (resolved !== undefined) {
      query += ' AND mst.resolved = ?';
      params.push(resolved === 'true' || resolved === '1' ? 1 : 0);
    }

    query += ' ORDER BY mst.mistake_count DESC, mst.last_wrong_at DESC';

    const mistakes = db.prepare(query).all(...params) as any[];

    for (const mst of mistakes) {
      mst.options = db.prepare('SELECT option_key, option_text FROM mcq_options WHERE mcq_id = ? ORDER BY option_key ASC').all(mst.mcq_id);
    }

    const unresolvedCount = db.prepare('SELECT COUNT(*) as count FROM mistakes WHERE user_id = ? AND resolved = 0').get(userId) as { count: number };

    res.json({
      mistakes,
      unresolved_count: unresolvedCount.count
    });
  } catch (err: unknown) {
    console.error('Error fetching mistakes:', err);
    res.status(500).json({ error: 'Failed to load mistake bank.' });
  }
});

// POST Resolve a mistake
mistakeRouter.post('/mistakes/:id/resolve', requireAuth, (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    db.prepare('UPDATE mistakes SET resolved = 1 WHERE (id = ? OR mcq_id = ?) AND user_id = ?').run(id, id, userId);

    res.json({ message: 'Mistake marked as resolved.' });
  } catch (err: unknown) {
    console.error('Error resolving mistake:', err);
    res.status(500).json({ error: 'Failed to resolve mistake.' });
  }
});

// GET Smart Weak-Topic Engine
mistakeRouter.get('/revision/weak-topics', requireAuth, (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

    // Calculate accuracy and mistake count grouped by topic for this user
    const topicStats = db.prepare(`
      SELECT 
        t.id as topic_id,
        t.title as topic_title,
        s.id as subject_id,
        s.name as subject_name,
        COUNT(aa.id) as total_attempts,
        SUM(CASE WHEN aa.is_correct = 1 THEN 1 ELSE 0 END) as correct_count,
        COALESCE((SELECT COUNT(*) FROM mistakes m WHERE m.topic_id = t.id AND m.user_id = ? AND m.resolved = 0), 0) as mistake_count
      FROM attempt_answers aa
      JOIN attempts a ON aa.attempt_id = a.id
      JOIN mcqs m ON aa.mcq_id = m.id
      JOIN topics t ON m.topic_id = t.id
      JOIN subjects s ON m.subject_id = s.id
      WHERE a.user_id = ?
      GROUP BY t.id
    `).all(userId, userId) as any[];

    const analysis = topicStats.map(row => {
      const accuracy = row.total_attempts > 0 ? Math.round((row.correct_count / row.total_attempts) * 100) : 0;
      let status: 'Strong' | 'Needs Practice' | 'Needs Revision' = 'Strong';
      if (accuracy < 70 || row.mistake_count > 0) {
        status = 'Needs Revision';
      } else if (accuracy < 85) {
        status = 'Needs Practice';
      }
      return {
        topic_id: row.topic_id,
        topic_title: row.topic_title,
        subject_id: row.subject_id,
        subject_name: row.subject_name,
        accuracy,
        total_attempts: row.total_attempts,
        mistake_count: row.mistake_count,
        status
      };
    });

    res.json({
      weak_topics: analysis.filter(a => a.status === 'Needs Revision'),
      all_topics_performance: analysis
    });
  } catch (err: unknown) {
    console.error('Error computing weak topics:', err);
    res.status(500).json({ error: 'Failed to calculate weak topics.' });
  }
});

// GET Spaced Revision items due
mistakeRouter.get('/revision/due', requireAuth, (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const today = new Date().toISOString().split('T')[0];

    const dueItems = db.prepare(`
      SELECT 
        ri.*,
        t.title as topic_title,
        s.name as subject_name,
        s.slug as subject_slug
      FROM revision_items ri
      JOIN topics t ON ri.topic_id = t.id
      JOIN subjects s ON ri.subject_id = s.id
      WHERE ri.user_id = ? AND ri.next_due_date <= ?
      ORDER BY ri.next_due_date ASC
    `).all(userId, today);

    res.json({ due_items: dueItems });
  } catch (err: unknown) {
    console.error('Error fetching due revision:', err);
    res.status(500).json({ error: 'Failed to fetch revision tasks.' });
  }
});
