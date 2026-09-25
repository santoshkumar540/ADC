import { Router } from 'express';
import { db } from '../db.js';
import { requireAuth, optionalAuth, type AuthRequest } from '../auth.js';

export const testRouter = Router();

// GET all tests (optionally filtered by subject or test_type)
testRouter.get('/tests', (req, res) => {
  try {
    const { subject_id, test_type } = req.query;

    let query = `
      SELECT 
        t.*,
        s.name as subject_name,
        s.slug as subject_slug
      FROM tests t
      LEFT JOIN subjects s ON t.subject_id = s.id
      WHERE t.status = 'Published'
    `;
    const params: any[] = [];

    if (subject_id) {
      query += ' AND t.subject_id = ?';
      params.push(subject_id);
    }
    if (test_type) {
      query += ' AND t.test_type = ?';
      params.push(test_type);
    }

    query += ' ORDER BY t.created_at DESC';

    const tests = db.prepare(query).all(...params);
    res.json({ tests });
  } catch (err: unknown) {
    console.error('Error fetching tests:', err);
    res.status(500).json({ error: 'Failed to fetch tests.' });
  }
});

// POST Generate Custom Test (Topic test, Chapter test, Practice test, 60-MCQ Mock, Weak Topic Test, Mistake Retest)
testRouter.post('/tests/generate', requireAuth, (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const {
      subject_id,
      chapter_id,
      topic_id,
      test_type = 'Practice Test',
      question_count = 20,
      duration_minutes = 20,
      negative_marking = 0,
      penalty_per_wrong = 0.25
    } = req.body;

    const count = Number(question_count) || 20;
    const duration = Number(duration_minutes) || count; // default 1 min per question

    let targetSubjectName = 'All Subjects';
    if (subject_id) {
      const sub = db.prepare('SELECT name FROM subjects WHERE id = ?').get(subject_id) as { name: string } | undefined;
      if (sub) targetSubjectName = sub.name;
    }

    let mcqIds: string[] = [];

    if (test_type === 'Mistake Retest') {
      // Fetch MCQs user previously got wrong
      const mistakes = db.prepare(`
        SELECT mcq_id FROM mistakes 
        WHERE user_id = ? AND resolved = 0
        ORDER BY mistake_count DESC, last_wrong_at DESC
        LIMIT ?
      `).all(userId, count) as { mcq_id: string }[];

      mcqIds = mistakes.map(m => m.mcq_id);

      if (mcqIds.length === 0) {
        res.status(400).json({ error: 'No unresolved mistakes found! Great work.' });
        return;
      }
    } else {
      let query = "SELECT id FROM mcqs WHERE status = 'Published'";
      const params: any[] = [];

      if (subject_id) {
        query += ' AND subject_id = ?';
        params.push(subject_id);
      }
      if (chapter_id) {
        query += ' AND chapter_id = ?';
        params.push(chapter_id);
      }
      if (topic_id) {
        query += ' AND topic_id = ?';
        params.push(topic_id);
      }

      query += ' ORDER BY RANDOM() LIMIT ?';
      params.push(count);

      const rows = db.prepare(query).all(...params) as { id: string }[];
      mcqIds = rows.map(r => r.id);

      if (mcqIds.length === 0) {
        res.status(400).json({ error: 'No questions available for the selected criteria.' });
        return;
      }
    }

    const testId = `test-gen-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const title = `${targetSubjectName} - ${test_type} (${mcqIds.length} MCQs)`;

    db.prepare(`
      INSERT INTO tests (id, title, subject_id, test_type, question_count, duration_minutes, negative_marking, penalty_per_wrong, randomize_questions, randomize_options, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 0, 'Published')
    `).run(testId, title, subject_id || null, test_type, mcqIds.length, duration, negative_marking ? 1 : 0, penalty_per_wrong);

    // Link test questions
    const insertTestQ = db.prepare(`
      INSERT INTO test_questions (id, test_id, mcq_id, question_order)
      VALUES (?, ?, ?, ?)
    `);

    mcqIds.forEach((mId, index) => {
      insertTestQ.run(`${testId}-q-${index + 1}`, testId, mId, index + 1);
    });

    res.status(201).json({
      message: 'Test created successfully.',
      test_id: testId,
      question_count: mcqIds.length,
      duration_minutes: duration
    });
  } catch (err: unknown) {
    console.error('Error generating test:', err);
    res.status(500).json({ error: 'Failed to generate test.' });
  }
});

// GET single test for test-taking mode (HIDES ANSWERS & EXPLANATIONS)
testRouter.get('/tests/:id', optionalAuth, (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const test = db.prepare(`
      SELECT 
        t.*,
        s.name as subject_name,
        s.slug as subject_slug
      FROM tests t
      LEFT JOIN subjects s ON t.subject_id = s.id
      WHERE t.id = ?
    `).get(id) as any;

    if (!test) {
      res.status(404).json({ error: 'Test not found.' });
      return;
    }

    // Get test questions (or sample questions from subject if dynamic mock)
    let questions = db.prepare(`
      SELECT 
        m.id,
        m.question_text,
        m.difficulty,
        m.question_type,
        m.topic_id,
        t.title as topic_title,
        s.name as subject_name
      FROM test_questions tq
      JOIN mcqs m ON tq.mcq_id = m.id
      JOIN topics t ON m.topic_id = t.id
      JOIN subjects s ON m.subject_id = s.id
      WHERE tq.test_id = ?
      ORDER BY tq.question_order ASC
    `).all(test.id) as any[];

    // If test has no pre-linked questions (e.g. seeded mock), fetch matching questions up to question_count
    if (questions.length === 0) {
      let query = `
        SELECT 
          m.id,
          m.question_text,
          m.difficulty,
          m.question_type,
          m.topic_id,
          t.title as topic_title,
          s.name as subject_name
        FROM mcqs m
        JOIN topics t ON m.topic_id = t.id
        JOIN subjects s ON m.subject_id = s.id
        WHERE m.status = 'Published'
      `;
      const params: any[] = [];
      if (test.subject_id) {
        query += ' AND m.subject_id = ?';
        params.push(test.subject_id);
      }
      query += ' ORDER BY RANDOM() LIMIT ?';
      params.push(test.question_count);

      questions = db.prepare(query).all(...params) as any[];
    }

    // Attach 5 options for each question (NEVER RETURN correct_option OR explanations)
    for (const q of questions) {
      q.options = db.prepare(`
        SELECT option_key, option_text 
        FROM mcq_options 
        WHERE mcq_id = ? 
        ORDER BY option_key ASC
      `).all(q.id);
    }

    res.json({
      test: {
        id: test.id,
        title: test.title,
        subject_id: test.subject_id,
        subject_name: test.subject_name,
        test_type: test.test_type,
        question_count: questions.length,
        duration_minutes: test.duration_minutes,
        negative_marking: test.negative_marking,
        penalty_per_wrong: test.penalty_per_wrong
      },
      questions
    });
  } catch (err: unknown) {
    console.error('Error loading test:', err);
    res.status(500).json({ error: 'Unable to load this test. Please try again.' });
  }
});

// POST Submit Test and evaluate results
testRouter.post('/tests/:id/submit', requireAuth, (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const { answers, time_spent_seconds = 0 } = req.body as {
      answers: Record<string, string | null>; // mcq_id -> 'A' | 'B' | 'C' | 'D' | 'E' | null
      time_spent_seconds: number;
    };

    const test = db.prepare('SELECT * FROM tests WHERE id = ?').get(id) as any;
    if (!test) {
      res.status(404).json({ error: 'Test not found.' });
      return;
    }

    const submittedMcqIds = Object.keys(answers || {});
    if (submittedMcqIds.length === 0) {
      res.status(400).json({ error: 'No answers provided for submission.' });
      return;
    }

    // Fetch official MCQs with correct options and explanations
    const placeholders = submittedMcqIds.map(() => '?').join(',');
    const mcqs = db.prepare(`
      SELECT 
        m.*,
        t.title as topic_title,
        s.name as subject_name
      FROM mcqs m
      JOIN topics t ON m.topic_id = t.id
      JOIN subjects s ON m.subject_id = s.id
      WHERE m.id IN (${placeholders})
    `).all(...submittedMcqIds) as any[];

    let correct_count = 0;
    let wrong_count = 0;
    let skipped_count = 0;

    const topicStats: Record<string, { title: string; total: number; correct: number; mistakes: number }> = {};
    const questionsFeedback: any[] = [];

    const attemptId = `att-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    // Prepare DB statements
    const insertAttemptAnswer = db.prepare(`
      INSERT INTO attempt_answers (id, attempt_id, mcq_id, selected_option, is_correct, time_spent_seconds)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const upsertMistake = db.prepare(`
      INSERT INTO mistakes (id, user_id, attempt_id, mcq_id, subject_id, chapter_id, topic_id, student_answer, correct_answer, mistake_count, last_wrong_at, resolved)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, datetime('now'), 0)
      ON CONFLICT(user_id, mcq_id) DO UPDATE SET
        mistake_count = mistake_count + 1,
        last_wrong_at = datetime('now'),
        student_answer = excluded.student_answer,
        resolved = 0
    `);

    const resolveMistakeIfCorrect = db.prepare(`
      UPDATE mistakes SET resolved = 1 WHERE user_id = ? AND mcq_id = ?
    `);

    for (const mcq of mcqs) {
      const selected = answers[mcq.id] || null;
      const isCorrect = selected === mcq.correct_option;
      const isSkipped = selected === null || selected === undefined;

      if (!topicStats[mcq.topic_id]) {
        topicStats[mcq.topic_id] = { title: mcq.topic_title, total: 0, correct: 0, mistakes: 0 };
      }
      topicStats[mcq.topic_id].total += 1;

      if (isSkipped) {
        skipped_count += 1;
      } else if (isCorrect) {
        correct_count += 1;
        topicStats[mcq.topic_id].correct += 1;
      } else {
        wrong_count += 1;
        topicStats[mcq.topic_id].mistakes += 1;
      }
    }

    const totalQuestions = mcqs.length;
    let score = correct_count;
    if (test.negative_marking) {
      score = Math.max(0, correct_count - (wrong_count * test.penalty_per_wrong));
    }
    const accuracy = totalQuestions > 0 ? Math.round((correct_count / totalQuestions) * 100) : 0;

    // Save attempt FIRST so foreign key constraint succeeds
    db.prepare(`
      INSERT INTO attempts (id, user_id, test_id, subject_id, total_questions, correct_count, wrong_count, skipped_count, score, accuracy, time_spent_seconds, is_completed, completed_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, datetime('now'))
    `).run(
      attemptId,
      userId,
      test.id,
      test.subject_id,
      totalQuestions,
      correct_count,
      wrong_count,
      skipped_count,
      score,
      accuracy,
      time_spent_seconds
    );

    // Save attempt_answers and mistakes
    for (const mcq of mcqs) {
      const selected = answers[mcq.id] || null;
      const isCorrect = selected === mcq.correct_option;
      const isSkipped = selected === null || selected === undefined;

      if (isCorrect) {
        resolveMistakeIfCorrect.run(userId, mcq.id);
      } else if (!isSkipped) {
        upsertMistake.run(
          `mst-${userId}-${mcq.id}`,
          userId,
          attemptId,
          mcq.id,
          mcq.subject_id,
          mcq.chapter_id,
          mcq.topic_id,
          selected,
          mcq.correct_option
        );
      }

      insertAttemptAnswer.run(
        `ans-${attemptId}-${mcq.id}`,
        attemptId,
        mcq.id,
        selected,
        isCorrect ? 1 : 0,
        0
      );

      const options = db.prepare('SELECT option_key, option_text FROM mcq_options WHERE mcq_id = ? ORDER BY option_key ASC').all(mcq.id);

      questionsFeedback.push({
        mcq_id: mcq.id,
        question_text: mcq.question_text,
        student_answer: selected,
        correct_answer: mcq.correct_option,
        is_correct: isCorrect,
        english_explanation: mcq.english_explanation,
        urdu_explanation: mcq.urdu_explanation,
        memory_tip: mcq.memory_tip,
        options,
        topic_title: mcq.topic_title
      });
    }

    // Compute strong & weak topics
    const strong_topics: any[] = [];
    const weak_topics: any[] = [];

    for (const [tId, stats] of Object.entries(topicStats)) {
      const topAcc = Math.round((stats.correct / stats.total) * 100);
      if (topAcc >= 85) {
        strong_topics.push({ topic_id: tId, title: stats.title, accuracy: topAcc });
      } else if (topAcc < 70) {
        weak_topics.push({ topic_id: tId, title: stats.title, accuracy: topAcc, mistake_count: stats.mistakes });
      }
    }

    // Schedule spaced revision if accuracy was poor
    if (weak_topics.length > 0) {
      const firstWeak = weak_topics[0];
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const isoDate = tomorrow.toISOString().split('T')[0];

      db.prepare(`
        INSERT INTO revision_items (id, user_id, topic_id, subject_id, interval_stage, next_due_date, last_reviewed_at)
        VALUES (?, ?, ?, ?, 1, ?, datetime('now'))
        ON CONFLICT(user_id, topic_id) DO UPDATE SET
          next_due_date = excluded.next_due_date,
          interval_stage = 1
      `).run(`rev-${userId}-${firstWeak.topic_id}`, userId, firstWeak.topic_id, test.subject_id || 'sub-bc', isoDate);
    }

    const subjectName = test.subject_id ? (db.prepare('SELECT name FROM subjects WHERE id = ?').get(test.subject_id) as any)?.name || 'Multi-Subject Assessment' : 'Multi-Subject Assessment';

    res.json({
      attempt_id: attemptId,
      test_id: test.id,
      test_title: test.title,
      subject_name: subjectName,
      total_questions: totalQuestions,
      correct_count,
      wrong_count,
      skipped_count,
      score,
      max_score: totalQuestions,
      accuracy,
      time_spent_seconds,
      strong_topics,
      weak_topics,
      questions_feedback: questionsFeedback
    });
  } catch (err: unknown) {
    console.error('Error submitting test:', err);
    res.status(500).json({ error: 'Your answer could not be saved. Please check your connection.' });
  }
});

// GET Attempt Result by attempt_id
testRouter.get('/attempts/:id', requireAuth, (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const attempt = db.prepare(`
      SELECT 
        a.*,
        t.title as test_title,
        s.name as subject_name
      FROM attempts a
      LEFT JOIN tests t ON a.test_id = t.id
      LEFT JOIN subjects s ON a.subject_id = s.id
      WHERE a.id = ? AND a.user_id = ?
    `).get(id, userId) as any;

    if (!attempt) {
      res.status(404).json({ error: 'Attempt result not found.' });
      return;
    }

    const answers = db.prepare(`
      SELECT 
        aa.*,
        m.question_text,
        m.correct_option as correct_answer,
        m.english_explanation,
        m.urdu_explanation,
        m.memory_tip,
        t.title as topic_title
      FROM attempt_answers aa
      JOIN mcqs m ON aa.mcq_id = m.id
      JOIN topics t ON m.topic_id = t.id
      WHERE aa.attempt_id = ?
    `).all(attempt.id) as any[];

    for (const ans of answers) {
      ans.options = db.prepare('SELECT option_key, option_text FROM mcq_options WHERE mcq_id = ? ORDER BY option_key ASC').all(ans.mcq_id);
    }

    res.json({
      attempt,
      answers
    });
  } catch (err: unknown) {
    console.error('Error loading attempt:', err);
    res.status(500).json({ error: 'Failed to load attempt result.' });
  }
});
