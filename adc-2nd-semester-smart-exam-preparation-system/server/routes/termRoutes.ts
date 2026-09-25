import { Router } from 'express';
import { db } from '../db.js';
import { optionalAuth, type AuthRequest } from '../auth.js';

export const termRouter = Router();

// GET all terms with filters (subject_id, topic_id, search)
termRouter.get('/terms', optionalAuth, (req: AuthRequest, res) => {
  try {
    const { subject_id, topic_id, search } = req.query;
    const userId = req.user?.id;

    let query = `
      SELECT 
        tm.*,
        s.name as subject_name,
        s.slug as subject_slug,
        t.title as topic_title
      FROM terms tm
      JOIN subjects s ON tm.subject_id = s.id
      JOIN topics t ON tm.topic_id = t.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (subject_id) {
      query += ' AND tm.subject_id = ?';
      params.push(subject_id);
    }

    if (topic_id) {
      query += ' AND tm.topic_id = ?';
      params.push(topic_id);
    }

    if (search && typeof search === 'string' && search.trim() !== '') {
      query += ' AND (tm.term LIKE ? OR tm.english_meaning LIKE ? OR tm.urdu_meaning LIKE ?)';
      const termPattern = `%${search.trim()}%`;
      params.push(termPattern, termPattern, termPattern);
    }

    query += ' ORDER BY tm.term ASC';

    const terms = db.prepare(query).all(...params) as any[];

    // Enforce bookmarks check if logged in
    const enriched = terms.map(term => {
      let is_bookmarked = false;
      if (userId) {
        const bm = db.prepare("SELECT id FROM bookmarks WHERE user_id = ? AND item_type = 'term' AND item_id = ?").get(userId, term.id);
        is_bookmarked = !!bm;
      }
      return {
        ...term,
        is_bookmarked
      };
    });

    res.json({ terms: enriched });
  } catch (err: unknown) {
    console.error('Error fetching terms:', err);
    res.status(500).json({ error: 'Failed to fetch terminology.' });
  }
});

// GET single term with related MCQs
termRouter.get('/terms/:id', optionalAuth, (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const term = db.prepare(`
      SELECT 
        tm.*,
        s.name as subject_name,
        s.slug as subject_slug,
        t.title as topic_title
      FROM terms tm
      JOIN subjects s ON tm.subject_id = s.id
      JOIN topics t ON tm.topic_id = t.id
      WHERE tm.id = ?
    `).get(id) as any;

    if (!term) {
      res.status(404).json({ error: 'Term not found.' });
      return;
    }

    if (userId) {
      const bm = db.prepare("SELECT id FROM bookmarks WHERE user_id = ? AND item_type = 'term' AND item_id = ?").get(userId, term.id);
      term.is_bookmarked = !!bm;
    }

    // Get related MCQs from same topic
    const relatedMcqs = db.prepare(`
      SELECT m.* FROM mcqs m
      WHERE m.topic_id = ? AND m.status = 'Published'
      LIMIT 3
    `).all(term.topic_id) as any[];

    for (const m of relatedMcqs) {
      m.options = db.prepare('SELECT option_key, option_text FROM mcq_options WHERE mcq_id = ? ORDER BY option_key ASC').all(m.id);
    }

    res.json({ term, related_mcqs: relatedMcqs });
  } catch (err: unknown) {
    console.error('Error fetching term:', err);
    res.status(500).json({ error: 'Failed to fetch term.' });
  }
});
