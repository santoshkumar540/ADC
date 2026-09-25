import { Router } from 'express';
import { db } from '../db.js';
import { requireAuth, type AuthRequest } from '../auth.js';

export const progressRouter = Router();

// GET Student Dashboard Progress Summary
progressRouter.get('/progress/summary', requireAuth, (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

    // Total topics in syllabus
    const totalTopicsRow = db.prepare('SELECT COUNT(*) as count FROM topics').get() as { count: number };
    const totalTopics = totalTopicsRow.count || 1;

    // Learned / Completed topics
    const learnedTopicsRow = db.prepare("SELECT COUNT(*) as count FROM topic_progress WHERE user_id = ? AND status = 'Completed'").get(userId) as { count: number };
    const learnedTopics = learnedTopicsRow.count;

    // Completed attempts & MCQs
    const attemptsStats = db.prepare(`
      SELECT 
        COUNT(a.id) as total_attempts,
        COALESCE(SUM(a.total_questions), 0) as total_mcqs,
        COALESCE(SUM(a.correct_count), 0) as total_correct
      FROM attempts a
      WHERE a.user_id = ?
    `).get(userId) as { total_attempts: number; total_mcqs: number; total_correct: number };

    const overallAccuracy = attemptsStats.total_mcqs > 0 ? Math.round((attemptsStats.total_correct / attemptsStats.total_mcqs) * 100) : 0;

    // Mocks completed (60-MCQ mocks)
    const mocksCompletedRow = db.prepare(`
      SELECT COUNT(*) as count 
      FROM attempts a
      JOIN tests t ON a.test_id = t.id
      WHERE a.user_id = ? AND t.test_type = 'Full Subject Mock'
    `).get(userId) as { count: number };

    // Mistakes to review
    const mistakesRow = db.prepare('SELECT COUNT(*) as count FROM mistakes WHERE user_id = ? AND resolved = 0').get(userId) as { count: number };

    // Revision due
    const today = new Date().toISOString().split('T')[0];
    const revisionDueRow = db.prepare('SELECT COUNT(*) as count FROM revision_items WHERE user_id = ? AND next_due_date <= ?').get(userId, today) as { count: number };

    // Today's completed MCQs
    const todayMcqsRow = db.prepare(`
      SELECT COALESCE(SUM(total_questions), 0) as count
      FROM attempts 
      WHERE user_id = ? AND date(created_at) = date('now')
    `).get(userId) as { count: number };

    // Subject breakdown
    const subjects = db.prepare('SELECT id, name, slug, code FROM subjects ORDER BY rowid ASC').all() as any[];
    const subjectsProgress = subjects.map(sub => {
      const subTopicsCount = (db.prepare(`
        SELECT COUNT(*) as count 
        FROM topics t 
        JOIN chapters c ON t.chapter_id = c.id 
        WHERE c.subject_id = ?
      `).get(sub.id) as { count: number }).count || 1;

      const subLearned = (db.prepare(`
        SELECT COUNT(*) as count 
        FROM topic_progress tp 
        JOIN topics t ON tp.topic_id = t.id 
        JOIN chapters c ON t.chapter_id = c.id 
        WHERE tp.user_id = ? AND c.subject_id = ? AND tp.status = 'Completed'
      `).get(userId, sub.id) as { count: number }).count;

      const subAttemptStats = db.prepare(`
        SELECT 
          COALESCE(SUM(total_questions), 0) as total,
          COALESCE(SUM(correct_count), 0) as correct
        FROM attempts 
        WHERE user_id = ? AND subject_id = ?
      `).get(userId, sub.id) as { total: number; correct: number };

      const subAcc = subAttemptStats.total > 0 ? Math.round((subAttemptStats.correct / subAttemptStats.total) * 100) : 0;
      const progress = Math.min(100, Math.round((subLearned / subTopicsCount) * 100));

      return {
        id: sub.id,
        name: sub.name,
        slug: sub.slug,
        code: sub.code,
        progress,
        accuracy: subAcc,
        learned_topics: subLearned,
        total_topics: subTopicsCount
      };
    });

    // Recent attempts
    const recentAttempts = db.prepare(`
      SELECT 
        a.id,
        COALESCE(t.title, 'Quick Assessment') as title,
        a.score,
        a.total_questions,
        a.accuracy,
        a.completed_at
      FROM attempts a
      LEFT JOIN tests t ON a.test_id = t.id
      WHERE a.user_id = ?
      ORDER BY a.created_at DESC
      LIMIT 5
    `).all(userId) as any[];

    // Calculate composite overall progress
    // 40% syllabus topic completion + 30% MCQ volume + 30% accuracy benchmark
    const topicFactor = Math.min(100, (learnedTopics / totalTopics) * 100);
    const mcqFactor = Math.min(100, (attemptsStats.total_mcqs / 300) * 100);
    const overallProgress = Math.round((topicFactor * 0.45) + (mcqFactor * 0.35) + (overallAccuracy * 0.20));

    res.json({
      stats: {
        overall_progress: Math.min(100, Math.max(0, overallProgress)),
        overall_accuracy: overallAccuracy,
        completed_mcqs: attemptsStats.total_mcqs,
        today_target: 50,
        today_completed: todayMcqsRow.count,
        mistakes_to_review: mistakesRow.count,
        revision_due_count: revisionDueRow.count,
        mocks_completed: mocksCompletedRow.count,
        study_streak_days: attemptsStats.total_attempts > 0 ? 3 : 1,
        subjects_progress: subjectsProgress,
        recent_attempts: recentAttempts
      }
    });
  } catch (err: unknown) {
    console.error('Error fetching progress summary:', err);
    res.status(500).json({ error: 'Failed to calculate progress.' });
  }
});
