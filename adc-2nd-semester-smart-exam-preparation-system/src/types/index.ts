export type Role = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  created_at?: string;
}

export interface Subject {
  id: string;
  slug: string;
  name: string;
  code: string;
  description: string;
  icon: string;
  color: string;
  chapter_count?: number;
  topic_count?: number;
  mcq_count?: number;
  term_count?: number;
  user_progress?: number;
}

export interface Chapter {
  id: string;
  subject_id: string;
  chapter_number: number;
  title: string;
  description: string;
  topics?: Topic[];
}

export interface Topic {
  id: string;
  chapter_id: string;
  chapter_title?: string;
  subject_id?: string;
  subject_name?: string;
  topic_number: number;
  title: string;
  description: string;
  is_official_syllabus: number;
  source_reference: string;
  status?: 'Not Started' | 'Learning' | 'Completed';
  subtopics?: Subtopic[];
  terms?: Term[];
  mcq_count?: number;
  accuracy?: number;
}

export interface Subtopic {
  id: string;
  topic_id: string;
  title: string;
  notes: string;
}

export interface Term {
  id: string;
  subject_id: string;
  chapter_id: string;
  topic_id: string;
  term: string;
  english_meaning: string;
  urdu_meaning: string;
  simple_explanation: string;
  example: string;
  memory_tip: string;
  source_reference: string;
  subject_name?: string;
  topic_title?: string;
  is_bookmarked?: boolean;
}

export type MCQOptionKey = 'A' | 'B' | 'C' | 'D' | 'E';

export interface MCQOption {
  id?: string;
  mcq_id?: string;
  option_key: MCQOptionKey;
  option_text: string;
}

export type MCQDifficulty = 'Easy' | 'Medium' | 'Hard';

export type MCQQuestionType =
  | 'Definition'
  | 'Conceptual'
  | 'Application'
  | 'Scenario'
  | 'Comparison'
  | 'Numerical'
  | 'Formula-based'
  | 'Terminology'
  | 'Factual'
  | 'Chronological';

export interface MCQ {
  id: string;
  subject_id: string;
  chapter_id: string;
  topic_id: string;
  subject_name?: string;
  chapter_title?: string;
  topic_title?: string;
  question_text: string;
  difficulty: MCQDifficulty;
  question_type: MCQQuestionType;
  correct_option: MCQOptionKey;
  english_explanation: string;
  urdu_explanation: string;
  memory_tip: string;
  source_reference: string;
  status: 'Draft' | 'Review' | 'Published' | 'Archived';
  options: MCQOption[];
  is_bookmarked?: boolean;
}

export interface Test {
  id: string;
  title: string;
  subject_id: string | null;
  subject_name?: string;
  test_type:
    | 'Topic Test'
    | 'Chapter Test'
    | 'Practice Test'
    | 'Subject Test'
    | 'Full Subject Mock'
    | 'Weak Topic Test'
    | 'Mistake Retest';
  question_count: number;
  duration_minutes: number;
  negative_marking: number;
  penalty_per_wrong: number;
  randomize_questions: number;
  randomize_options: number;
  status: 'Draft' | 'Published' | 'Archived';
  created_at: string;
}

export interface TestQuestionItem {
  id: string;
  question_text: string;
  difficulty: MCQDifficulty;
  question_type: MCQQuestionType;
  options: { option_key: MCQOptionKey; option_text: string }[];
  topic_title?: string;
  subject_name?: string;
}

export interface AttemptAnswer {
  mcq_id: string;
  selected_option: MCQOptionKey | null;
  time_spent_seconds?: number;
}

export interface AttemptResult {
  attempt_id: string;
  test_id: string | null;
  test_title: string;
  subject_name: string;
  total_questions: number;
  correct_count: number;
  wrong_count: number;
  skipped_count: number;
  score: number;
  max_score: number;
  accuracy: number;
  time_spent_seconds: number;
  strong_topics: { topic_id: string; title: string; accuracy: number }[];
  weak_topics: { topic_id: string; title: string; accuracy: number; mistake_count: number }[];
  questions_feedback: {
    mcq_id: string;
    question_text: string;
    student_answer: MCQOptionKey | null;
    correct_answer: MCQOptionKey;
    is_correct: boolean;
    english_explanation: string;
    urdu_explanation: string;
    memory_tip: string;
    options: MCQOption[];
    topic_title: string;
  }[];
}

export interface MistakeItem {
  id: string;
  mcq_id: string;
  subject_id: string;
  subject_name: string;
  chapter_id: string;
  topic_id: string;
  topic_title: string;
  question_text: string;
  student_answer: MCQOptionKey;
  correct_answer: MCQOptionKey;
  mistake_count: number;
  last_wrong_at: string;
  resolved: number;
  english_explanation: string;
  urdu_explanation: string;
  memory_tip: string;
  options: MCQOption[];
}

export interface WeakTopicAnalysis {
  topic_id: string;
  topic_title: string;
  subject_id: string;
  subject_name: string;
  accuracy: number;
  total_attempts: number;
  mistake_count: number;
  status: 'Strong' | 'Needs Practice' | 'Needs Revision';
}

export interface StudyPlan {
  id: string;
  exam_date: string;
  daily_hours: number;
  daily_mcq_target: number;
  preferred_subjects: string[];
  items: StudyPlanItem[];
}

export interface StudyPlanItem {
  id: string;
  day_number: number;
  subject_id: string;
  subject_name: string;
  topic_id: string;
  topic_title: string;
  target_mcqs: number;
  task_type: string;
  is_completed: number;
}

export interface DashboardStats {
  overall_progress: number;
  overall_accuracy: number;
  completed_mcqs: number;
  today_target: number;
  today_completed: number;
  mistakes_to_review: number;
  revision_due_count: number;
  mocks_completed: number;
  study_streak_days: number;
  subjects_progress: {
    id: string;
    name: string;
    slug: string;
    code: string;
    progress: number;
    accuracy: number;
    learned_topics: number;
    total_topics: number;
  }[];
  recent_attempts: {
    id: string;
    title: string;
    score: number;
    total_questions: number;
    accuracy: number;
    completed_at: string;
  }[];
}

export interface AdSettings {
  ads_enabled: boolean;
  publisher_id: string;
  top_ad_slot: string;
  inline_ad_slot: string;
  sidebar_ad_slot: string;
  bottom_ad_slot: string;
}
