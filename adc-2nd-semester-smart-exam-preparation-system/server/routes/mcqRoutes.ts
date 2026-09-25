import { Router } from 'express';
import { db } from '../db.js';
import { optionalAuth, type AuthRequest } from '../auth.js';

export const mcqRouter = Router();

// GET Learning Mode MCQs (answers & explanations included)
mcqRouter.get(['/learning', '/mcqs/learning'], optionalAuth, (req: AuthRequest, res) => {
  try {
    const { subject_id, topic_id, chapter_id, limit = 50 } = req.query;
    const userId = req.user?.id;

    let query = `
      SELECT 
        m.*,
        s.name as subject_name,
        c.title as chapter_title,
        t.title as topic_title
      FROM mcqs m
      JOIN subjects s ON m.subject_id = s.id
      JOIN chapters c ON m.chapter_id = c.id
      JOIN topics t ON m.topic_id = t.id
      WHERE m.status = 'Published'
    `;
    const params: any[] = [];

    if (topic_id) {
      query += ' AND m.topic_id = ?';
      params.push(topic_id);
    } else {
      if (subject_id) {
        query += ' AND m.subject_id = ?';
        params.push(subject_id);
      }
      if (chapter_id) {
        query += ' AND m.chapter_id = ?';
        params.push(chapter_id);
      }
    }

    query += ' ORDER BY m.rowid ASC LIMIT ?';
    params.push(Number(limit));

    const mcqs = db.prepare(query).all(...params) as any[];

    for (const m of mcqs) {
      m.options = db.prepare('SELECT option_key, option_text FROM mcq_options WHERE mcq_id = ? ORDER BY option_key ASC').all(m.id);
      if (userId) {
        const bm = db.prepare("SELECT id FROM bookmarks WHERE user_id = ? AND item_type = 'mcq' AND item_id = ?").get(userId, m.id);
        m.is_bookmarked = !!bm;
      }
    }

    res.json({ mcqs });
  } catch (err: unknown) {
    console.error('Error fetching learning MCQs:', err);
    res.status(500).json({ error: 'Failed to fetch learning MCQs.' });
  }
});

// GET Practice MCQs (can filter by subject, topic, difficulty, count 10-20)
mcqRouter.get(['/practice', '/mcqs/practice'], (req, res) => {
  try {
    const { subject_id, topic_id, count = 10, difficulty } = req.query;

    let query = `
      SELECT 
        m.*,
        s.name as subject_name,
        t.title as topic_title
      FROM mcqs m
      JOIN subjects s ON m.subject_id = s.id
      JOIN topics t ON m.topic_id = t.id
      WHERE m.status = 'Published'
    `;
    const params: any[] = [];

    if (topic_id) {
      query += ' AND m.topic_id = ?';
      params.push(topic_id);
    } else if (subject_id) {
      query += ' AND m.subject_id = ?';
      params.push(subject_id);
    }
    if (difficulty) {
      query += ' AND m.difficulty = ?';
      params.push(difficulty);
    }

    query += ' ORDER BY RANDOM() LIMIT ?';
    params.push(Number(count));

    const mcqs = db.prepare(query).all(...params) as any[];

    for (const m of mcqs) {
      m.options = db.prepare('SELECT option_key, option_text FROM mcq_options WHERE mcq_id = ? ORDER BY option_key ASC').all(m.id);
    }

    res.json({ mcqs });
  } catch (err: unknown) {
    console.error('Error fetching practice MCQs:', err);
    res.status(500).json({ error: 'Failed to fetch practice questions.' });
  }
});
