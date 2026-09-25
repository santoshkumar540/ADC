import { Router } from 'express';
import { db } from '../db.js';
import { requireAuth, type AuthRequest } from '../auth.js';

export const studyPlanRouter = Router();

// GET active study plan for current student
studyPlanRouter.get('/study-plan', requireAuth, (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

    const plan = db.prepare('SELECT * FROM study_plans WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId) as any;

    if (!plan) {
      res.json({ plan: null });
      return;
    }

    const items = db.prepare(`
      SELECT 
        spi.*,
        s.name as subject_name,
        s.slug as subject_slug,
        t.title as topic_title
      FROM study_plan_items spi
      JOIN subjects s ON spi.subject_id = s.id
      JOIN topics t ON spi.topic_id = t.id
      WHERE spi.plan_id = ?
      ORDER BY spi.day_number ASC, spi.id ASC
    `).all(plan.id);

    let pref = [];
    try {
      pref = JSON.parse(plan.preferred_subjects);
    } catch {
      pref = [];
    }

    res.json({
      plan: {
        ...plan,
        preferred_subjects: pref,
        items
      }
    });
  } catch (err: unknown) {
    console.error('Error fetching study plan:', err);
    res.status(500).json({ error: 'Failed to fetch study plan.' });
  }
});

// POST generate new customized study plan
studyPlanRouter.post('/study-plan/generate', requireAuth, (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const {
      exam_date,
      daily_hours = 3,
      daily_mcq_target = 50,
      preferred_subjects = []
    } = req.body;

    if (!exam_date) {
      res.status(400).json({ error: 'Exam target date is required.' });
      return;
    }

    // Calculate days until exam
    const today = new Date();
    const targetDate = new Date(exam_date);
    const diffTime = targetDate.getTime() - today.getTime();
    const daysAvailable = Math.max(3, Math.min(60, Math.ceil(diffTime / (1000 * 60 * 60 * 24))));

    const planId = `plan-${Date.now()}`;
    const prefJson = JSON.stringify(preferred_subjects);

    db.prepare(`
      INSERT INTO study_plans (id, user_id, exam_date, daily_hours, daily_mcq_target, preferred_subjects)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(planId, userId, exam_date, Number(daily_hours), Number(daily_mcq_target), prefJson);

    // Fetch topics across selected subjects (or all subjects if none selected)
    let topicsQuery = `
      SELECT t.id as topic_id, t.title as topic_title, s.id as subject_id, s.name as subject_name
      FROM topics t
      JOIN chapters c ON t.chapter_id = c.id
      JOIN subjects s ON c.subject_id = s.id
    `;
    const params: any[] = [];

    if (Array.isArray(preferred_subjects) && preferred_subjects.length > 0) {
      const placeholders = preferred_subjects.map(() => '?').join(',');
      topicsQuery += ` WHERE s.id IN (${placeholders}) OR s.slug IN (${placeholders})`;
      params.push(...preferred_subjects, ...preferred_subjects);
    }

    topicsQuery += ' ORDER BY s.rowid, c.chapter_number, t.topic_number';
    const topics = db.prepare(topicsQuery).all(...params) as any[];

    const insertItem = db.prepare(`
      INSERT INTO study_plan_items (id, plan_id, day_number, subject_id, topic_id, target_mcqs, task_type, is_completed)
      VALUES (?, ?, ?, ?, ?, ?, ?, 0)
    `);

    // Distribute topics over available days
    const numDays = Math.min(daysAvailable, 30);
    let topicIndex = 0;

    for (let day = 1; day <= numDays; day++) {
      if (topicIndex < topics.length) {
        const top = topics[topicIndex];
        insertItem.run(
          `spi-${planId}-d${day}-1`,
          planId,
          day,
          top.subject_id,
          top.topic_id,
          Math.round(daily_mcq_target * 0.6),
          'Learning & Practice'
        );
        topicIndex++;
      }

      // Add a secondary topic or revision review on alternate days
      if (topicIndex < topics.length) {
        const secondTop = topics[topicIndex];
        insertItem.run(
          `spi-${planId}-d${day}-2`,
          planId,
          day,
          secondTop.subject_id,
          secondTop.topic_id,
          Math.round(daily_mcq_target * 0.4),
          day % 3 === 0 ? 'Mistake Revision' : 'Concept Test'
        );
        topicIndex++;
      }
    }

    res.status(201).json({
      message: 'Personalized study plan generated successfully.',
      plan_id: planId,
      days_planned: numDays
    });
  } catch (err: unknown) {
    console.error('Error generating study plan:', err);
    res.status(500).json({ error: 'Failed to generate study plan.' });
  }
});

// PATCH toggle study plan item completion
studyPlanRouter.patch('/study-plan/items/:id/toggle', requireAuth, (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    // Verify item belongs to user's plan
    const item = db.prepare(`
      SELECT spi.*, sp.user_id
      FROM study_plan_items spi
      JOIN study_plans sp ON spi.plan_id = sp.id
      WHERE spi.id = ? AND sp.user_id = ?
    `).get(id, userId) as any;

    if (!item) {
      res.status(404).json({ error: 'Study plan task not found.' });
      return;
    }

    const nextState = item.is_completed ? 0 : 1;
    db.prepare('UPDATE study_plan_items SET is_completed = ? WHERE id = ?').run(nextState, id);

    res.json({ message: 'Task status updated.', is_completed: nextState });
  } catch (err: unknown) {
    console.error('Error toggling plan item:', err);
    res.status(500).json({ error: 'Failed to update task.' });
  }
});
