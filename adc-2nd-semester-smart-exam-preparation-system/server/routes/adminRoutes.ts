import { Router } from 'express';
import { db } from '../db.js';
import { requireAdmin, type AuthRequest } from '../auth.js';

export const adminRouter = Router();

// GET Admin Statistics & Analytics
adminRouter.get('/admin/stats', requireAdmin, (_req: AuthRequest, res) => {
  try {
    const totalStudents = (db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'student'").get() as any).count;
    const totalSubjects = (db.prepare('SELECT COUNT(*) as count FROM subjects').get() as any).count;
    const totalChapters = (db.prepare('SELECT COUNT(*) as count FROM chapters').get() as any).count;
    const totalTopics = (db.prepare('SELECT COUNT(*) as count FROM topics').get() as any).count;
    const totalTerms = (db.prepare('SELECT COUNT(*) as count FROM terms').get() as any).count;
    const totalMCQs = (db.prepare('SELECT COUNT(*) as count FROM mcqs').get() as any).count;
    const totalTests = (db.prepare('SELECT COUNT(*) as count FROM tests').get() as any).count;
    const totalAttempts = (db.prepare('SELECT COUNT(*) as count FROM attempts').get() as any).count;

    const avgAccuracyRow = db.prepare('SELECT COALESCE(AVG(accuracy), 0) as avg FROM attempts').get() as any;
    const avgAccuracy = Math.round(avgAccuracyRow.avg);

    // Most missed MCQs
    const mostMissedMCQs = db.prepare(`
      SELECT 
        m.id,
        m.question_text,
        s.name as subject_name,
        t.title as topic_title,
        SUM(mst.mistake_count) as total_mistakes
      FROM mistakes mst
      JOIN mcqs m ON mst.mcq_id = m.id
      JOIN subjects s ON mst.subject_id = s.id
      JOIN topics t ON mst.topic_id = t.id
      GROUP BY m.id
      ORDER BY total_mistakes DESC
      LIMIT 5
    `).all();

    res.json({
      stats: {
        total_students: totalStudents,
        total_subjects: totalSubjects,
        total_chapters: totalChapters,
        total_topics: totalTopics,
        total_terms: totalTerms,
        total_mcqs: totalMCQs,
        total_tests: totalTests,
        total_attempts: totalAttempts,
        avg_accuracy: avgAccuracy
      },
      most_missed_mcqs: mostMissedMCQs
    });
  } catch (err: unknown) {
    console.error('Admin stats error:', err);
    res.status(500).json({ error: 'Failed to load admin metrics.' });
  }
});

// GET Users list
adminRouter.get('/admin/users', requireAdmin, (_req: AuthRequest, res) => {
  try {
    const users = db.prepare('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC').all();
    res.json({ users });
  } catch (err: unknown) {
    res.status(500).json({ error: 'Failed to load users.' });
  }
});

// GET MCQs with filtering & pagination
adminRouter.get('/admin/mcqs', requireAdmin, (req: AuthRequest, res) => {
  try {
    const { subject_id, status, difficulty, search, limit = 50, offset = 0 } = req.query;

    let query = `
      SELECT 
        m.*,
        s.name as subject_name,
        t.title as topic_title
      FROM mcqs m
      JOIN subjects s ON m.subject_id = s.id
      JOIN topics t ON m.topic_id = t.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (subject_id) {
      query += ' AND m.subject_id = ?';
      params.push(subject_id);
    }
    if (status) {
      query += ' AND m.status = ?';
      params.push(status);
    }
    if (difficulty) {
      query += ' AND m.difficulty = ?';
      params.push(difficulty);
    }
    if (search && typeof search === 'string') {
      query += ' AND m.question_text LIKE ?';
      params.push(`%${search.trim()}%`);
    }

    query += ' ORDER BY m.created_at DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));

    const mcqs = db.prepare(query).all(...params) as any[];

    for (const m of mcqs) {
      m.options = db.prepare('SELECT option_key, option_text FROM mcq_options WHERE mcq_id = ? ORDER BY option_key ASC').all(m.id);
    }

    const totalCount = (db.prepare('SELECT COUNT(*) as count FROM mcqs').get() as any).count;

    res.json({ mcqs, total_count: totalCount });
  } catch (err: unknown) {
    console.error('Error fetching admin MCQs:', err);
    res.status(500).json({ error: 'Failed to fetch MCQs.' });
  }
});

// POST Create new MCQ with strict 5-option validation
adminRouter.post('/admin/mcqs', requireAdmin, (req: AuthRequest, res) => {
  try {
    const {
      subject_id,
      chapter_id,
      topic_id,
      question_text,
      difficulty = 'Medium',
      question_type = 'Conceptual',
      options, // array of { option_key: 'A'|'B'|'C'|'D'|'E', option_text: string }
      correct_option,
      english_explanation,
      urdu_explanation,
      memory_tip = '',
      source_reference,
      status = 'Published'
    } = req.body;

    // Strict validation
    if (!subject_id || !chapter_id || !topic_id) {
      res.status(400).json({ error: 'Subject, chapter, and topic are strictly required.' });
      return;
    }

    if (!question_text || question_text.trim().length < 5) {
      res.status(400).json({ error: 'Valid question text is required.' });
      return;
    }

    if (!['A', 'B', 'C', 'D', 'E'].includes(correct_option)) {
      res.status(400).json({ error: 'Correct option must be one of: A, B, C, D, E.' });
      return;
    }

    if (!Array.isArray(options) || options.length !== 5) {
      res.status(400).json({ error: 'Exactly five options (A, B, C, D, E) must be provided.' });
      return;
    }

    const keys = options.map(o => o.option_key);
    for (const k of ['A', 'B', 'C', 'D', 'E']) {
      if (!keys.includes(k)) {
        res.status(400).json({ error: `Missing option key: ${k}` });
        return;
      }
    }

    for (const opt of options) {
      if (!opt.option_text || opt.option_text.trim() === '') {
        res.status(400).json({ error: `Option ${opt.option_key} cannot be empty.` });
        return;
      }
    }

    if (!english_explanation || !urdu_explanation) {
      res.status(400).json({ error: 'Both English and Urdu explanations are required for students.' });
      return;
    }

    const mcqId = `mcq-cust-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    db.prepare(`
      INSERT INTO mcqs (id, subject_id, chapter_id, topic_id, question_text, difficulty, question_type, correct_option, english_explanation, urdu_explanation, memory_tip, source_reference, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      mcqId,
      subject_id,
      chapter_id,
      topic_id,
      question_text.trim(),
      difficulty,
      question_type,
      correct_option,
      english_explanation.trim(),
      urdu_explanation.trim(),
      memory_tip.trim(),
      source_reference ? source_reference.trim() : 'ADC Syllabus Verified Question',
      status
    );

    const insertOpt = db.prepare('INSERT INTO mcq_options (id, mcq_id, option_key, option_text) VALUES (?, ?, ?, ?)');
    for (const opt of options) {
      insertOpt.run(`${mcqId}-opt-${opt.option_key}`, mcqId, opt.option_key, opt.option_text.trim());
    }

    res.status(201).json({
      message: 'MCQ created and published successfully.',
      mcq_id: mcqId
    });
  } catch (err: unknown) {
    console.error('Error creating MCQ:', err);
    res.status(500).json({ error: 'Failed to create MCQ.' });
  }
});

// DELETE MCQ
adminRouter.delete('/admin/mcqs/:id', requireAdmin, (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM mcqs WHERE id = ?').run(id);
    res.json({ message: 'MCQ deleted successfully.' });
  } catch (err: unknown) {
    console.error('Error deleting MCQ:', err);
    res.status(500).json({ error: 'Failed to delete MCQ.' });
  }
});

// POST Bulk Import MCQs (JSON array with validation)
adminRouter.post('/admin/mcqs/bulk-import', requireAdmin, (req: AuthRequest, res) => {
  try {
    const { items } = req.body; // array of items

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: 'No items provided for import.' });
      return;
    }

    let insertedCount = 0;
    const errors: string[] = [];

    const insertMCQ = db.prepare(`
      INSERT INTO mcqs (id, subject_id, chapter_id, topic_id, question_text, difficulty, question_type, correct_option, english_explanation, urdu_explanation, memory_tip, source_reference, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertOpt = db.prepare(`
      INSERT INTO mcq_options (id, mcq_id, option_key, option_text)
      VALUES (?, ?, ?, ?)
    `);

    for (let i = 0; i < items.length; i++) {
      const row = items[i];
      const rowNum = i + 1;

      if (!row.question || !row.correct_option || !row.option_a || !row.option_b || !row.option_c || !row.option_d || !row.option_e) {
        errors.push(`Row ${rowNum}: Question and all 5 options (A to E) are required.`);
        continue;
      }

      if (!['A', 'B', 'C', 'D', 'E'].includes(row.correct_option.toUpperCase())) {
        errors.push(`Row ${rowNum}: Invalid correct option '${row.correct_option}'. Must be A, B, C, D, or E.`);
        continue;
      }

      // Check subject
      let subId = row.subject_id;
      if (!subId && row.subject) {
        const sub = db.prepare('SELECT id FROM subjects WHERE slug = ? OR name LIKE ?').get(row.subject, `%${row.subject}%`) as any;
        if (sub) subId = sub.id;
      }
      if (!subId) {
        subId = 'sub-bc'; // fallback to first subject
      }

      // Check topic
      let topicId = row.topic_id;
      if (!topicId) {
        const top = db.prepare('SELECT t.id, t.chapter_id FROM topics t JOIN chapters c ON t.chapter_id = c.id WHERE c.subject_id = ? LIMIT 1').get(subId) as any;
        if (top) {
          topicId = top.id;
          row.chapter_id = top.chapter_id;
        } else {
          errors.push(`Row ${rowNum}: Could not match a topic for subject ${subId}.`);
          continue;
        }
      }

      const chapterId = row.chapter_id || (db.prepare('SELECT chapter_id FROM topics WHERE id = ?').get(topicId) as any)?.chapter_id;

      const mcqId = `mcq-imp-${Date.now()}-${i}`;
      const correct = row.correct_option.toUpperCase() as 'A' | 'B' | 'C' | 'D' | 'E';

      try {
        insertMCQ.run(
          mcqId,
          subId,
          chapterId,
          topicId,
          row.question.trim(),
          row.difficulty || 'Medium',
          row.question_type || 'Conceptual',
          correct,
          row.english_explanation || 'Detailed explanation based on official syllabus concepts.',
          row.urdu_explanation || 'Official ADC syllabus ke mutabiq wazahat.',
          row.memory_tip || '',
          row.source_reference || 'Official ADC Syllabus Import',
          'Published'
        );

        insertOpt.run(`${mcqId}-opt-A`, mcqId, 'A', row.option_a.trim());
        insertOpt.run(`${mcqId}-opt-B`, mcqId, 'B', row.option_b.trim());
        insertOpt.run(`${mcqId}-opt-C`, mcqId, 'C', row.option_c.trim());
        insertOpt.run(`${mcqId}-opt-D`, mcqId, 'D', row.option_d.trim());
        insertOpt.run(`${mcqId}-opt-E`, mcqId, 'E', row.option_e.trim());

        insertedCount++;
      } catch (err: unknown) {
        errors.push(`Row ${rowNum}: Database insertion failed.`);
      }
    }

    res.json({
      message: `Bulk import completed: ${insertedCount} questions imported successfully.`,
      inserted_count: insertedCount,
      errors
    });
  } catch (err: unknown) {
    console.error('Bulk import error:', err);
    res.status(500).json({ error: 'Failed to process bulk import.' });
  }
});

// GET Ad Settings
adminRouter.get('/admin/ad-settings', (_req: AuthRequest, res) => {
  try {
    const settings = db.prepare('SELECT * FROM ad_settings LIMIT 1').get() as any;
    res.json({
      settings: {
        ads_enabled: Boolean(settings.ads_enabled),
        publisher_id: settings.publisher_id,
        top_ad_slot: settings.top_ad_slot,
        inline_ad_slot: settings.inline_ad_slot,
        sidebar_ad_slot: settings.sidebar_ad_slot,
        bottom_ad_slot: settings.bottom_ad_slot
      }
    });
  } catch (err: unknown) {
    console.error('Error fetching ad settings:', err);
    res.status(500).json({ error: 'Failed to load ad settings.' });
  }
});

// PUT Update Ad Settings
adminRouter.put('/admin/ad-settings', requireAdmin, (req: AuthRequest, res) => {
  try {
    const { ads_enabled, publisher_id, top_ad_slot, inline_ad_slot, sidebar_ad_slot, bottom_ad_slot } = req.body;

    db.prepare(`
      UPDATE ad_settings SET
        ads_enabled = ?,
        publisher_id = ?,
        top_ad_slot = ?,
        inline_ad_slot = ?,
        sidebar_ad_slot = ?,
        bottom_ad_slot = ?,
        updated_at = datetime('now')
    `).run(
      ads_enabled ? 1 : 0,
      publisher_id || 'ca-pub-0000000000000000',
      top_ad_slot || '',
      inline_ad_slot || '',
      sidebar_ad_slot || '',
      bottom_ad_slot || ''
    );

    res.json({ message: 'AdSense settings updated successfully.' });
  } catch (err: unknown) {
    console.error('Error updating ad settings:', err);
    res.status(500).json({ error: 'Failed to update ad configuration.' });
  }
});
