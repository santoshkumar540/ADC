import { Router } from 'express';
import { db } from '../db.js';
import { optionalAuth, requireAuth, type AuthRequest } from '../auth.js';

export const syllabusRouter = Router();

// GET all 6 subjects with counts and student progress
syllabusRouter.get('/subjects', optionalAuth, (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;

    const subjects = db.prepare(`
      SELECT 
        s.*,
        (SELECT COUNT(*) FROM chapters c WHERE c.subject_id = s.id) as chapter_count,
        (SELECT COUNT(*) FROM topics t JOIN chapters c ON t.chapter_id = c.id WHERE c.subject_id = s.id) as topic_count,
        (SELECT COUNT(*) FROM mcqs m WHERE m.subject_id = s.id AND m.status = 'Published') as mcq_count,
        (SELECT COUNT(*) FROM terms tm WHERE tm.subject_id = s.id) as term_count
      FROM subjects s
      ORDER BY s.rowid ASC
    `).all() as any[];

    // If student logged in, compute progress for each subject
    const enriched = subjects.map(sub => {
      let user_progress = 0;
      if (userId && sub.topic_count > 0) {
        const completed = db.prepare(`
          SELECT COUNT(*) as cnt 
          FROM topic_progress tp
          JOIN topics t ON tp.topic_id = t.id
          JOIN chapters c ON t.chapter_id = c.id
          WHERE tp.user_id = ? AND c.subject_id = ? AND tp.status = 'Completed'
        `).get(userId, sub.id) as { cnt: number };

        user_progress = Math.round((completed.cnt / sub.topic_count) * 100);
      }
      return {
        ...sub,
        user_progress
      };
    });

    res.json({ subjects: enriched });
  } catch (err: unknown) {
    console.error('Error fetching subjects:', err);
    res.status(500).json({ error: 'Failed to fetch subjects.' });
  }
});

// GET subject by slug or id
syllabusRouter.get('/subjects/:slug', optionalAuth, (req: AuthRequest, res) => {
  try {
    const { slug } = req.params;
    const userId = req.user?.id;

    const subject = db.prepare(`
      SELECT * FROM subjects WHERE slug = ? OR id = ?
    `).get(slug, slug) as any;

    if (!subject) {
      res.status(404).json({ error: 'Subject not found.' });
      return;
    }

    // Get chapters and their topics
    const chapters = db.prepare(`
      SELECT * FROM chapters WHERE subject_id = ? ORDER BY chapter_number ASC
    `).all(subject.id) as any[];

    for (const ch of chapters) {
      const topics = db.prepare(`
        SELECT 
          t.*,
          (SELECT COUNT(*) FROM mcqs m WHERE m.topic_id = t.id AND m.status = 'Published') as mcq_count
        FROM topics t
        WHERE t.chapter_id = ?
        ORDER BY t.topic_number ASC
      `).all(ch.id) as any[];

      for (const top of topics) {
        top.subtopics = db.prepare('SELECT * FROM subtopics WHERE topic_id = ?').all(top.id);
        
        // Topic user progress
        if (userId) {
          const prog = db.prepare('SELECT status FROM topic_progress WHERE user_id = ? AND topic_id = ?').get(userId, top.id) as { status: string } | undefined;
          top.status = prog ? prog.status : 'Not Started';
        } else {
          top.status = 'Not Started';
        }
      }

      ch.topics = topics;
    }

    // Get tests for this subject
    const tests = db.prepare(`
      SELECT * FROM tests WHERE subject_id = ? AND status = 'Published' ORDER BY created_at ASC
    `).all(subject.id);

    res.json({
      subject,
      chapters,
      tests
    });
  } catch (err: unknown) {
    console.error('Error fetching subject detail:', err);
    res.status(500).json({ error: 'Failed to fetch subject details.' });
  }
});

// GET full syllabus hierarchy for a subject
syllabusRouter.get('/syllabus/:subjectId', (req, res) => {
  try {
    const { subjectId } = req.params;

    const subject = db.prepare('SELECT * FROM subjects WHERE id = ? OR slug = ?').get(subjectId, subjectId) as any;
    if (!subject) {
      res.status(404).json({ error: 'Subject not found' });
      return;
    }

    const chapters = db.prepare('SELECT * FROM chapters WHERE subject_id = ? ORDER BY chapter_number ASC').all(subject.id) as any[];

    for (const ch of chapters) {
      const topics = db.prepare('SELECT * FROM topics WHERE chapter_id = ? ORDER BY topic_number ASC').all(ch.id) as any[];
      for (const top of topics) {
        top.subtopics = db.prepare('SELECT * FROM subtopics WHERE topic_id = ?').all(top.id);
        top.terms = db.prepare('SELECT * FROM terms WHERE topic_id = ?').all(top.id);
      }
      ch.topics = topics;
    }

    res.json({
      subject,
      chapters
    });
  } catch (err: unknown) {
    console.error('Error fetching syllabus:', err);
    res.status(500).json({ error: 'Failed to load syllabus.' });
  }
});

// GET single topic detail with terms, subtopics, related learning MCQs count
syllabusRouter.get('/topics/:id', optionalAuth, (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const topic = db.prepare(`
      SELECT 
        t.*,
        c.title as chapter_title,
        c.chapter_number,
        s.id as subject_id,
        s.name as subject_name,
        s.slug as subject_slug
      FROM topics t
      JOIN chapters c ON t.chapter_id = c.id
      JOIN subjects s ON c.subject_id = s.id
      WHERE t.id = ?
    `).get(id) as any;

    if (!topic) {
      res.status(404).json({ error: 'Topic not found.' });
      return;
    }

    topic.subtopics = db.prepare('SELECT * FROM subtopics WHERE topic_id = ?').all(topic.id);
    topic.terms = db.prepare('SELECT * FROM terms WHERE topic_id = ?').all(topic.id);

    const mcqStats = db.prepare("SELECT COUNT(*) as count FROM mcqs WHERE topic_id = ? AND status = 'Published'").get(topic.id) as { count: number };
    topic.mcq_count = mcqStats.count;

    if (userId) {
      const prog = db.prepare('SELECT status FROM topic_progress WHERE user_id = ? AND topic_id = ?').get(userId, topic.id) as { status: string } | undefined;
      topic.status = prog ? prog.status : 'Not Started';
    } else {
      topic.status = 'Not Started';
    }

    res.json({ topic });
  } catch (err: unknown) {
    console.error('Error fetching topic:', err);
    res.status(500).json({ error: 'Failed to load topic.' });
  }
});

// POST update topic progress status ('Not Started', 'Learning', 'Completed')
syllabusRouter.post('/topics/:id/progress', requireAuth, (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user!.id;

    if (!['Not Started', 'Learning', 'Completed'].includes(status)) {
      res.status(400).json({ error: 'Invalid status. Must be Not Started, Learning, or Completed.' });
      return;
    }

    const topic = db.prepare('SELECT id FROM topics WHERE id = ?').get(id);
    if (!topic) {
      res.status(404).json({ error: 'Topic not found.' });
      return;
    }

    db.prepare(`
      INSERT INTO topic_progress (id, user_id, topic_id, status, last_studied_at)
      VALUES (?, ?, ?, ?, datetime('now'))
      ON CONFLICT(user_id, topic_id) DO UPDATE SET
        status = excluded.status,
        last_studied_at = datetime('now')
    `).run(`prog-${userId}-${id}`, userId, id, status);

    res.json({ message: 'Progress updated successfully.', status });
  } catch (err: unknown) {
    console.error('Error updating progress:', err);
    res.status(500).json({ error: 'Failed to update progress.' });
  }
});
