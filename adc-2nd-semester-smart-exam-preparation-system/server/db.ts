import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { SEED_SUBJECTS } from './seedData.js';

const DATA_DIR = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = process.env.DATABASE_PATH || path.join(DATA_DIR, 'adc_prep.sqlite');
export const db = new DatabaseSync(DB_PATH);

// Enable foreign keys
db.exec('PRAGMA foreign_keys = ON;');

export function initDatabase() {
  const schemaPath = path.resolve(process.cwd(), 'database/schema.sql');
  if (fs.existsSync(schemaPath)) {
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    db.exec(schema);
  }

  // Check if roles exist
  const rolesCount = db.prepare('SELECT COUNT(*) as cnt FROM roles').get() as { cnt: number };
  if (rolesCount.cnt === 0) {
    db.exec(`
      INSERT INTO roles (id, name) VALUES ('student', 'Student'), ('admin', 'Administrator');
    `);
  }

  // Check if users exist
  const userCount = db.prepare('SELECT COUNT(*) as cnt FROM users').get() as { cnt: number };
  if (userCount.cnt === 0) {
    // admin123456 & student123456
    const adminHash = '$2b$10$4.kjpSSnHAgYKc4j2zEikO5BWsbHhXHWGywToPgSwF4UZ3MONYguK';
    const studentHash = '$2b$10$O4EULrrCQBNmpQ/Pc8ufuOgssLkGkPKHm2vsg52W.Nz0z.LWceYQm';

    const insertUser = db.prepare(`
      INSERT INTO users (id, name, email, password_hash, role)
      VALUES (?, ?, ?, ?, ?)
    `);

    insertUser.run('usr-admin-1', 'ADC Chief Admin', 'admin@adcprep.pk', adminHash, 'admin');
    insertUser.run('usr-student-1', 'Hamza Khan (Student)', 'student@adcprep.pk', studentHash, 'student');
  }

  // Check if subjects exist
  const subCount = db.prepare('SELECT COUNT(*) as cnt FROM subjects').get() as { cnt: number };
  if (subCount.cnt === 0) {
    console.log('Seeding verified ADC 2nd Semester subjects and syllabus...');

    const insertSubject = db.prepare(`
      INSERT INTO subjects (id, slug, name, code, description, icon, color)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const insertChapter = db.prepare(`
      INSERT INTO chapters (id, subject_id, chapter_number, title, description)
      VALUES (?, ?, ?, ?, ?)
    `);

    const insertTopic = db.prepare(`
      INSERT INTO topics (id, chapter_id, topic_number, title, description, is_official_syllabus, source_reference)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const insertSubtopic = db.prepare(`
      INSERT INTO subtopics (id, topic_id, title, notes)
      VALUES (?, ?, ?, ?)
    `);

    const insertTerm = db.prepare(`
      INSERT INTO terms (id, subject_id, chapter_id, topic_id, term, english_meaning, urdu_meaning, simple_explanation, example, memory_tip, source_reference)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertMCQ = db.prepare(`
      INSERT INTO mcqs (id, subject_id, chapter_id, topic_id, question_text, difficulty, question_type, correct_option, english_explanation, urdu_explanation, memory_tip, source_reference, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertMCQOption = db.prepare(`
      INSERT INTO mcq_options (id, mcq_id, option_key, option_text)
      VALUES (?, ?, ?, ?)
    `);

    for (const sub of SEED_SUBJECTS) {
      insertSubject.run(sub.id, sub.slug, sub.name, sub.code, sub.description, sub.icon, sub.color);

      for (const ch of sub.chapters) {
        insertChapter.run(ch.id, sub.id, ch.chapter_number, ch.title, ch.description);

        for (const top of ch.topics) {
          insertTopic.run(top.id, ch.id, top.topic_number, top.title, top.description, top.is_official_syllabus, top.source_reference);

          top.subtopics.forEach((st, idx) => {
            insertSubtopic.run(`${top.id}-st-${idx + 1}`, top.id, st, `Subtopic ${idx + 1} of ${top.title}`);
          });
        }
      }

      // Insert terms
      for (const t of sub.terms) {
        // Find corresponding chapter and topic IDs
        const ch = sub.chapters.find(c => c.chapter_number === t.chapter_number) || sub.chapters[0];
        const top = ch.topics.find(tp => tp.topic_number === t.topic_number) || ch.topics[0];
        insertTerm.run(t.id, sub.id, ch.id, top.id, t.term, t.english_meaning, t.urdu_meaning, t.simple_explanation, t.example, t.memory_tip, t.source_reference);
      }

      // Insert MCQs and their 5 options
      for (const m of sub.mcqs) {
        const ch = sub.chapters.find(c => c.chapter_number === m.chapter_number) || sub.chapters[0];
        const top = ch.topics.find(tp => tp.topic_number === m.topic_number) || ch.topics[0];
        insertMCQ.run(m.id, sub.id, ch.id, top.id, m.question_text, m.difficulty, m.question_type, m.correct_option, m.english_explanation, m.urdu_explanation, m.memory_tip, m.source_reference, 'Published');

        for (const opt of m.options) {
          insertMCQOption.run(`${m.id}-opt-${opt.key}`, m.id, opt.key, opt.text);
        }
      }

      // Create default mock test for this subject (60-MCQ Full Mock)
      const mockTestId = `test-mock-${sub.slug}`;
      db.prepare(`
        INSERT INTO tests (id, title, subject_id, test_type, question_count, duration_minutes, negative_marking, penalty_per_wrong, randomize_questions, randomize_options, status)
        VALUES (?, ?, ?, 'Full Subject Mock', 60, 60, 0, 0, 1, 0, 'Published')
      `).run(mockTestId, `${sub.name} - 60 MCQ Grand Mock Exam`, sub.id);

      // Create 20-MCQ Practice test for this subject
      const practiceTestId = `test-prac-${sub.slug}`;
      db.prepare(`
        INSERT INTO tests (id, title, subject_id, test_type, question_count, duration_minutes, negative_marking, penalty_per_wrong, randomize_questions, randomize_options, status)
        VALUES (?, ?, ?, 'Practice Test', 20, 20, 0, 0, 1, 0, 'Published')
      `).run(practiceTestId, `${sub.name} - Standard Practice Assessment`, sub.id);
    }
  }

  // Default ad settings
  const adCount = db.prepare('SELECT COUNT(*) as cnt FROM ad_settings').get() as { cnt: number };
  if (adCount.cnt === 0) {
    db.prepare(`
      INSERT INTO ad_settings (id, ads_enabled, publisher_id, top_ad_slot, inline_ad_slot, sidebar_ad_slot, bottom_ad_slot)
      VALUES ('ads-global-1', 0, 'ca-pub-0000000000000000', '1234567890', '2345678901', '3456789012', '4567890123')
    `).run();
  }

  // Seed initial notification for demo student
  const notifCount = db.prepare('SELECT COUNT(*) as cnt FROM notifications').get() as { cnt: number };
  if (notifCount.cnt === 0) {
    db.prepare(`
      INSERT INTO notifications (id, user_id, title, message)
      VALUES ('notif-1', 'usr-student-1', 'Welcome to ADC 2nd Semester Prep!', 'Begin by exploring the official 6 subjects syllabus and taking your first practice test.')
    `).run();
  }

  console.log('Database initialized successfully with verified ADC syllabus.');
}
