import type {
  Subject,
  Topic,
  Term,
  MCQ,
  Test,
  AttemptResult,
  MistakeItem,
  WeakTopicAnalysis,
  StudyPlan,
  DashboardStats,
  AdSettings,
  User
} from '../types';

const API_BASE = '/api';

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('adc_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get('content-type') || '';
  let data: any = {};

  if (contentType.includes('application/json')) {
    data = await response.json().catch(() => ({}));
  } else {
    // If not JSON (e.g. HTML 404/fallback), consider it an error
    throw new Error(`Endpoint ${endpoint} returned invalid non-JSON response.`);
  }

  if (!response.ok) {
    const errorMsg = data.error || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data as T;
}

export const api = {
  // Auth
  register: (payload: any) => request<{ message: string; token: string; user: User }>('/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload: any) => request<{ message: string; token: string; user: User }>('/login', { method: 'POST', body: JSON.stringify(payload) }),
  getMe: () => request<{ user: User }>('/me'),

  // Subjects & Syllabus
  getSubjects: () => request<{ subjects: Subject[] }>('/subjects'),
  getSubjectDetail: (slug: string) => request<{ subject: Subject; chapters: any[]; tests: Test[] }>(`/subjects/${slug}`),
  getTopicDetail: (id: string) => request<{ topic: Topic }>(`/topics/${id}`),
  updateTopicProgress: (id: string, status: 'Not Started' | 'Learning' | 'Completed') =>
    request<{ message: string; status: string }>(`/topics/${id}/progress`, { method: 'POST', body: JSON.stringify({ status }) }),

  // Terms
  getTerms: (params?: { subject_id?: string; topic_id?: string; search?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return request<{ terms: Term[] }>(`/terms${query ? `?${query}` : ''}`);
  },
  getTermDetail: (id: string) => request<{ term: Term; related_mcqs: MCQ[] }>(`/terms/${id}`),

  // MCQs
  getLearningMCQs: (params?: { subject_id?: string; topic_id?: string; chapter_id?: string; limit?: number }) => {
    const query = new URLSearchParams(params as any).toString();
    return request<{ mcqs: MCQ[] }>(`/mcqs/learning${query ? `?${query}` : ''}`);
  },
  getPracticeMCQs: (params?: { subject_id?: string; topic_id?: string; count?: number; difficulty?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return request<{ mcqs: MCQ[] }>(`/mcqs/practice${query ? `?${query}` : ''}`);
  },

  // Tests & Mocks
  getTests: (params?: { subject_id?: string; test_type?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return request<{ tests: Test[] }>(`/tests${query ? `?${query}` : ''}`);
  },
  generateTest: (payload: any) => request<{ message: string; test_id: string; question_count: number; duration_minutes: number }>('/tests/generate', { method: 'POST', body: JSON.stringify(payload) }),
  getTest: (id: string) => request<{ test: Test; questions: any[] }>(`/tests/${id}`),
  submitTest: (id: string, payload: { answers: Record<string, string | null>; time_spent_seconds: number }) =>
    request<AttemptResult>(`/tests/${id}/submit`, { method: 'POST', body: JSON.stringify(payload) }),
  getAttempt: (id: string) => request<{ attempt: any; answers: any[] }>(`/attempts/${id}`),

  // Mistakes & Weak Topics
  getMistakes: (params?: { subject_id?: string; resolved?: boolean }) => {
    const query = new URLSearchParams(params as any).toString();
    return request<{ mistakes: MistakeItem[]; unresolved_count: number }>(`/mistakes${query ? `?${query}` : ''}`);
  },
  resolveMistake: (id: string) => request<{ message: string }>(`/mistakes/${id}/resolve`, { method: 'POST' }),
  getWeakTopics: () => request<{ weak_topics: WeakTopicAnalysis[]; all_topics_performance: WeakTopicAnalysis[] }>('/revision/weak-topics'),
  getDueRevision: () => request<{ due_items: any[] }>('/revision/due'),

  // Study Plan
  getStudyPlan: () => request<{ plan: StudyPlan | null }>('/study-plan'),
  generateStudyPlan: (payload: any) => request<{ message: string; plan_id: string; days_planned: number }>('/study-plan/generate', { method: 'POST', body: JSON.stringify(payload) }),
  toggleStudyPlanItem: (id: string) => request<{ message: string; is_completed: number }>(`/study-plan/items/${id}/toggle`, { method: 'PATCH' }),

  // Bookmarks
  getBookmarks: (item_type?: string) => request<{ mcqs: MCQ[]; terms: Term[]; topics: Topic[]; total_count: number }>(`/bookmarks${item_type ? `?item_type=${item_type}` : ''}`),
  toggleBookmark: (item_type: 'mcq' | 'term' | 'topic', item_id: string) =>
    request<{ bookmarked: boolean; message: string }>('/bookmarks/toggle', { method: 'POST', body: JSON.stringify({ item_type, item_id }) }),

  // Dashboard & Progress
  getProgressSummary: () => request<{ stats: DashboardStats }>('/progress/summary'),

  // Notifications
  getNotifications: () => request<{ notifications: any[]; unread_count: number }>('/notifications'),
  markNotificationRead: (id: string) => request<{ message: string }>(`/notifications/${id}/read`, { method: 'PATCH' }),
  markAllNotificationsRead: () => request<{ message: string }>('/notifications/read-all', { method: 'POST' }),

  // Admin
  getAdminStats: () => request<{ stats: any; most_missed_mcqs: any[] }>('/admin/stats'),
  getAdminUsers: () => request<{ users: any[] }>('/admin/users'),
  getAdminMCQs: (params?: any) => {
    const query = new URLSearchParams(params).toString();
    return request<{ mcqs: MCQ[]; total_count: number }>(`/admin/mcqs${query ? `?${query}` : ''}`);
  },
  createMCQ: (payload: any) => request<{ message: string; mcq_id: string }>('/admin/mcqs', { method: 'POST', body: JSON.stringify(payload) }),
  deleteMCQ: (id: string) => request<{ message: string }>(`/admin/mcqs/${id}`, { method: 'DELETE' }),
  bulkImportMCQs: (items: any[]) => request<{ message: string; inserted_count: number; errors: string[] }>('/admin/mcqs/bulk-import', { method: 'POST', body: JSON.stringify({ items }) }),
  getAdSettings: () => request<{ settings: AdSettings }>('/admin/ad-settings'),
  updateAdSettings: (payload: AdSettings) => request<{ message: string }>('/admin/ad-settings', { method: 'PUT', body: JSON.stringify(payload) }),
};
