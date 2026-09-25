import { Router } from 'express';
import { db } from '../db.js';
import { requireAuth, type AuthRequest } from '../auth.js';

export const bookmarkRouter = Router();

// GET all user bookmarks (optionally filtered by item_type)
bookmarkRouter.get('/bookmarks', requireAuth, (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const { item_type } = req.query;

    let query = 'SELECT * FROM bookmarks WHERE user_id = ?';
    const params: any[] = [userId];

    if (item_type && ['mcq', 'term', 'topic'].includes(item_type as string)) {
      query += ' AND item_type = ?';
      params.push(item_type);
    }
    query += ' ORDER BY created_at DESC';

    const bookmarks = db.prepare(query).all(...params) as any[];

    // Hydrate item details
    const mcqs: any[] = [];
    const terms: any[] = [];
    const topics: any[] = [];

    for (const bm of bookmarks) {
      if (bm.item_type === 'mcq') {
        const m = db.prepare(`
          SELECT m.*, s.name as subject_name, t.title as topic_title
          FROM mcqs m
          JOIN subjects s ON m.subject_id = s.id
          JOIN topics t ON m.topic_id = t.id
          WHERE m.id = ?
        `).get(bm.item_id) as any;
        if (m) {
          m.options = db.prepare('SELECT option_key, option_text FROM mcq_options WHERE mcq_id = ? ORDER BY option_key ASC').all(m.id);
          m.bookmark_id = bm.id;
          mcqs.push(m);
        }
      } else if (bm.item_type === 'term') {
        const tm = db.prepare(`
          SELECT tm.*, s.name as subject_name, t.title as topic_title
          FROM terms tm
          JOIN subjects s ON tm.subject_id = s.id
          JOIN topics t ON tm.topic_id = t.id
          WHERE tm.id = ?
        `).get(bm.item_id) as any;
        if (tm) {
          tm.bookmark_id = bm.id;
          terms.push(tm);
        }
      } else if (bm.item_type === 'topic') {
        const tp = db.prepare(`
          SELECT t.*, s.name as subject_name, c.title as chapter_title
          FROM topics t
          JOIN chapters c ON t.chapter_id = c.id
          JOIN subjects s ON c.subject_id = s.id
          WHERE t.id = ?
        `).get(bm.item_id) as any;
        if (tp) {
          tp.bookmark_id = bm.id;
          topics.push(tp);
        }
      }
    }

    res.json({
      mcqs,
      terms,
      topics,
      total_count: bookmarks.length
    });
  } catch (err: unknown) {
    console.error('Error fetching bookmarks:', err);
    res.status(500).json({ error: 'Failed to fetch bookmarks.' });
  }
});

// POST Toggle Bookmark
bookmarkRouter.post('/bookmarks/toggle', requireAuth, (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const { item_type, item_id } = req.body;

    if (!item_type || !item_id || !['mcq', 'term', 'topic'].includes(item_type)) {
      res.status(400).json({ error: 'Valid item_type (mcq, term, topic) and item_id are required.' });
      return;
    }

    const existing = db.prepare('SELECT id FROM bookmarks WHERE user_id = ? AND item_type = ? AND item_id = ?').get(userId, item_type, item_id) as { id: string } | undefined;

    if (existing) {
      db.prepare('DELETE FROM bookmarks WHERE id = ?').run(existing.id);
      res.json({ bookmarked: false, message: 'Bookmark removed.' });
    } else {
      const bmId = `bm-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      db.prepare('INSERT INTO bookmarks (id, user_id, item_type, item_id) VALUES (?, ?, ?, ?)').run(bmId, userId, item_type, item_id);
      res.json({ bookmarked: true, message: 'Saved to bookmarks.' });
    }
  } catch (err: unknown) {
    console.error('Error toggling bookmark:', err);
    res.status(500).json({ error: 'Failed to toggle bookmark.' });
  }
});
