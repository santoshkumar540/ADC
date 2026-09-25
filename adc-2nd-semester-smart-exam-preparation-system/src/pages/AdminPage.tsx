import React, { useEffect, useState } from 'react';
import type { Subject, MCQ, AdSettings, MCQOptionKey, MCQDifficulty, MCQQuestionType } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  ShieldCheck,
  Users,
  BookOpen,
  HelpCircle,
  FileSpreadsheet,
  Settings,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Upload,
  Layers,
  Sparkles
} from 'lucide-react';

interface AdminPageProps {
  navigate: (path: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ navigate }) => {
  const { user, isAdmin } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'stats' | 'mcqs' | 'create_mcq' | 'bulk_import' | 'users' | 'ads'>('stats');
  const [stats, setStats] = useState<any>(null);
  const [mostMissed, setMostMissed] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [adSettings, setAdSettings] = useState<AdSettings | null>(null);
  const [loading, setLoading] = useState(true);

  // Filter states for MCQ list
  const [filterSubject, setFilterSubject] = useState<string>('');

  // Form states for creating a new MCQ
  const [formSubjectId, setFormSubjectId] = useState('');
  const [formChapterId, setFormChapterId] = useState('');
  const [formTopicId, setFormTopicId] = useState('');
  const [formQuestion, setFormQuestion] = useState('');
  const [formDifficulty, setFormDifficulty] = useState<MCQDifficulty>('Medium');
  const [formType, setFormType] = useState<MCQQuestionType>('Conceptual');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [optE, setOptE] = useState('');
  const [formCorrect, setFormCorrect] = useState<MCQOptionKey>('A');
  const [formEnglishExp, setFormEnglishExp] = useState('');
  const [formUrduExp, setFormUrduExp] = useState('');
  const [formMemoryTip, setFormMemoryTip] = useState('');
  const [formSource, setFormSource] = useState('Official ADC Syllabus');
  const [formStatus, setFormStatus] = useState<'Draft' | 'Review' | 'Published'>('Published');

  // Bulk import states
  const [importJsonText, setImportJsonText] = useState('');
  const [importResult, setImportResult] = useState<any>(null);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
      return;
    }

    setLoading(true);
    Promise.all([
      api.getAdminStats(),
      api.getSubjects(),
      api.getAdminMCQs(),
      api.getAdminUsers(),
      api.getAdSettings()
    ])
      .then(([statsRes, subRes, mcqRes, usrRes, adRes]) => {
        setStats(statsRes?.stats || null);
        setMostMissed(Array.isArray(statsRes?.most_missed_mcqs) ? statsRes.most_missed_mcqs : []);
        const subList = Array.isArray(subRes?.subjects) ? subRes.subjects : [];
        setSubjects(subList);
        setMcqs(Array.isArray(mcqRes?.mcqs) ? mcqRes.mcqs : []);
        setUsers(Array.isArray(usrRes?.users) ? usrRes.users : []);
        setAdSettings(adRes?.settings || null);

        if (subList.length > 0 && subList[0]?.id) {
          setFormSubjectId(subList[0].id);
        }
      })
      .catch((err) => console.error('Admin init error:', err))
      .finally(() => setLoading(false));
  }, [isAdmin]);

  const handleCreateMCQ = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formQuestion.trim()) {
      showToast('Question text cannot be empty.', 'error');
      return;
    }
    if (!optA.trim() || !optB.trim() || !optC.trim() || !optD.trim() || !optE.trim()) {
      showToast('All 5 options (A, B, C, D, E) are strictly required.', 'error');
      return;
    }
    if (!formEnglishExp.trim() || !formUrduExp.trim()) {
      showToast('Both English and Urdu explanations are required.', 'error');
      return;
    }

    try {
      await api.createMCQ({
        subject_id: formSubjectId,
        chapter_id: formChapterId || 'bc-ch-1',
        topic_id: formTopicId || 'bc-top-1',
        question_text: formQuestion,
        difficulty: formDifficulty,
        question_type: formType,
        correct_option: formCorrect,
        options: [
          { option_key: 'A', option_text: optA },
          { option_key: 'B', option_text: optB },
          { option_key: 'C', option_text: optC },
          { option_key: 'D', option_text: optD },
          { option_key: 'E', option_text: optE },
        ],
        english_explanation: formEnglishExp,
        urdu_explanation: formUrduExp,
        memory_tip: formMemoryTip,
        source_reference: formSource,
        status: formStatus
      });

      showToast('MCQ published to question bank!', 'success');
      // Reset form
      setFormQuestion('');
      setOptA('');
      setOptB('');
      setOptC('');
      setOptD('');
      setOptE('');
      setFormEnglishExp('');
      setFormUrduExp('');
      setFormMemoryTip('');

      // Refresh list
      const res = await api.getAdminMCQs();
      setMcqs(res.mcqs);
      setActiveTab('mcqs');
    } catch (err: any) {
      showToast(err.message || 'Failed to create MCQ.', 'error');
    }
  };

  const handleDeleteMCQ = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return;
    try {
      await api.deleteMCQ(id);
      setMcqs((prev) => prev.filter((m) => m.id !== id));
      showToast('Question deleted.', 'success');
    } catch {
      showToast('Failed to delete question.', 'error');
    }
  };

  const handleBulkImport = async () => {
    try {
      const parsed = JSON.parse(importJsonText);
      const items = Array.isArray(parsed) ? parsed : [parsed];
      const res = await api.bulkImportMCQs(items);
      setImportResult(res);
      showToast(res.message, 'success');
      const mcqRes = await api.getAdminMCQs();
      setMcqs(mcqRes.mcqs);
    } catch (err: any) {
      showToast('Invalid JSON format: ' + err.message, 'error');
    }
  };

  const handleUpdateAds = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adSettings) return;
    try {
      await api.updateAdSettings(adSettings);
      showToast('AdSense settings updated!', 'success');
    } catch {
      showToast('Failed to update ad settings.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-6">
        <div className="h-28 rounded-3xl bg-slate-200 animate-pulse" />
        <div className="h-96 rounded-3xl bg-slate-200 animate-pulse" />
      </div>
    );
  }

  const filteredMCQs = mcqs.filter((m) => {
    if (filterSubject && m.subject_id !== filterSubject) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Student View
          </button>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
            <h1 className="text-2xl font-black tracking-tight">Admin CMS Dashboard</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            ADC 2nd Semester Examination Management, MCQ Engine &amp; Syllabus Administration
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('create_mcq')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Single MCQ
          </button>
          <button
            onClick={() => setActiveTab('bulk_import')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-teal-300 bg-teal-950/60 border border-teal-500/30 hover:bg-teal-900/60 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-4 h-4" /> Bulk Import
          </button>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-1">
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'stats'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Analytics &amp; Overview
        </button>

        <button
          onClick={() => setActiveTab('mcqs')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'mcqs'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <HelpCircle className="w-4 h-4" /> Question Bank ({mcqs.length})
        </button>

        <button
          onClick={() => setActiveTab('create_mcq')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'create_mcq'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Plus className="w-4 h-4" /> Create MCQ
        </button>

        <button
          onClick={() => setActiveTab('bulk_import')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'bulk_import'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Upload className="w-4 h-4" /> Bulk Import
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'users'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" /> Users ({users.length})
        </button>

        <button
          onClick={() => setActiveTab('ads')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'ads'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Settings className="w-4 h-4" /> AdSense Settings
        </button>
      </div>

      {/* Tab: Stats */}
      {activeTab === 'stats' && stats && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Total Students</div>
              <div className="text-2xl font-black text-slate-900 mt-1">{stats.total_students}</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Core Subjects</div>
              <div className="text-2xl font-black text-blue-900 mt-1">{stats.total_subjects}</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Syllabus Topics</div>
              <div className="text-2xl font-black text-teal-700 mt-1">{stats.total_topics}</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Banked MCQs</div>
              <div className="text-2xl font-black text-indigo-700 mt-1">{stats.total_mcqs}</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Tests Completed</div>
              <div className="text-2xl font-black text-slate-900 mt-1">{stats.total_attempts}</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Average Accuracy</div>
              <div className="text-2xl font-black text-emerald-700 mt-1">{stats.avg_accuracy}%</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Bilingual Terms</div>
              <div className="text-2xl font-black text-amber-700 mt-1">{stats.total_terms}</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Configured Mocks</div>
              <div className="text-2xl font-black text-slate-900 mt-1">{stats.total_tests}</div>
            </div>
          </div>

          {/* Most Missed Questions */}
          {mostMissed.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Most Frequently Missed Questions across Students
              </h3>
              <div className="divide-y divide-slate-100 text-xs">
                {mostMissed.map((m) => (
                  <div key={m.id} className="py-3 flex items-center justify-between gap-4">
                    <div>
                      <span className="font-bold text-blue-900 mr-2">[{m.subject_name}]</span>
                      <span className="text-slate-800 font-medium">{m.question_text}</span>
                    </div>
                    <span className="font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full shrink-0">
                      Missed {m.total_mistakes}x
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: MCQs List */}
      {activeTab === 'mcqs' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">Filter Subject:</span>
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="font-bold bg-white border border-slate-300 rounded-lg px-2.5 py-1"
              >
                <option value="">All Subjects</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <span className="text-slate-500 font-medium">
              Showing {filteredMCQs.length} published questions
            </span>
          </div>

          <div className="space-y-3">
            {filteredMCQs.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                      {m.subject_name}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {m.difficulty}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      Correct: Option {m.correct_option}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{m.question_text}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-600 pt-1">
                    {m.options.map((o) => (
                      <div
                        key={o.option_key}
                        className={o.option_key === m.correct_option ? 'font-bold text-emerald-700' : ''}
                      >
                        {o.option_key}. {o.option_text}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleDeleteMCQ(m.id)}
                    className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition"
                    title="Delete Question"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Create MCQ */}
      {activeTab === 'create_mcq' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">
              Create New 5-Option Verified MCQ
            </h3>
            <p className="text-xs text-slate-500">
              All five options (A to E) and both English and Urdu explanations are strictly enforced.
            </p>
          </div>

          <form onSubmit={handleCreateMCQ} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Subject
                </label>
                <select
                  value={formSubjectId}
                  onChange={(e) => setFormSubjectId(e.target.value)}
                  className="w-full text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                >
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Difficulty
                </label>
                <select
                  value={formDifficulty}
                  onChange={(e) => setFormDifficulty(e.target.value as any)}
                  className="w-full text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Question Type
                </label>
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value as any)}
                  className="w-full text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                >
                  <option value="Conceptual">Conceptual</option>
                  <option value="Definition">Definition</option>
                  <option value="Application">Application</option>
                  <option value="Scenario">Scenario</option>
                  <option value="Numerical">Numerical</option>
                  <option value="Formula-based">Formula-based</option>
                  <option value="Terminology">Terminology</option>
                  <option value="Factual">Factual</option>
                  <option value="Comparison">Comparison</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Question Text
              </label>
              <textarea
                value={formQuestion}
                onChange={(e) => setFormQuestion(e.target.value)}
                rows={2}
                placeholder="Enter clear, unambiguous question text in English..."
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
                required
              />
            </div>

            {/* Five Options: A, B, C, D, E */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Five Distinct Options (A, B, C, D, E)
              </label>

              {[
                { key: 'A', val: optA, set: setOptA },
                { key: 'B', val: optB, set: setOptB },
                { key: 'C', val: optC, set: setOptC },
                { key: 'D', val: optD, set: setOptD },
                { key: 'E', val: optE, set: setOptE }
              ].map(({ key, val, set }) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-slate-100 font-bold text-xs flex items-center justify-center text-slate-700 shrink-0">
                    {key}
                  </span>
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => set(e.target.value)}
                    placeholder={`Enter Option ${key} text...`}
                    className="flex-1 text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2"
                    required
                  />
                  <label className="flex items-center gap-1 text-xs font-bold cursor-pointer select-none">
                    <input
                      type="radio"
                      name="correctOption"
                      checked={formCorrect === key}
                      onChange={() => setFormCorrect(key as any)}
                      className="text-emerald-600 focus:ring-emerald-600"
                    />
                    <span className="text-slate-600 text-[11px]">Correct</span>
                  </label>
                </div>
              ))}
            </div>

            {/* Explanations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  English Conceptual Explanation
                </label>
                <textarea
                  value={formEnglishExp}
                  onChange={(e) => setFormEnglishExp(e.target.value)}
                  rows={3}
                  placeholder="Provide rigorous conceptual reasoning for the correct choice..."
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">
                  Simple Urdu Explanation (اردو وضاحت)
                </label>
                <textarea
                  value={formUrduExp}
                  onChange={(e) => setFormUrduExp(e.target.value)}
                  rows={3}
                  placeholder="Aasan Roman Urdu ya Urdu mein wazahat likhein..."
                  className="w-full text-xs bg-teal-50/40 border border-teal-200 rounded-xl p-2.5 font-urdu"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                Exam Memory Tip (Optional)
              </label>
              <input
                type="text"
                value={formMemoryTip}
                onChange={(e) => setFormMemoryTip(e.target.value)}
                placeholder="e.g. Remember: FIFO in inflation yields lowest COGS"
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 transition shadow-sm cursor-pointer"
            >
              Validate &amp; Publish MCQ
            </button>
          </form>
        </div>
      )}

      {/* Tab: Bulk Import */}
      {activeTab === 'bulk_import' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">
              Bulk MCQ Import (JSON / CSV Format)
            </h3>
            <p className="text-xs text-slate-500">
              Paste a JSON array of questions. Every record must specify question, option_a, option_b, option_c, option_d, option_e, and correct_option.
            </p>
          </div>

          <textarea
            value={importJsonText}
            onChange={(e) => setImportJsonText(e.target.value)}
            rows={10}
            placeholder={`[
  {
    "subject": "Business Communication",
    "question": "What is the primary goal of the buffer in a bad news letter?",
    "option_a": "To state the blunt refusal immediately",
    "option_b": "To establish a neutral, goodwill common ground before the refusal",
    "option_c": "To threaten legal action",
    "option_d": "To demand immediate cash payment",
    "option_e": "To avoid communication completely",
    "correct_option": "B",
    "difficulty": "Medium",
    "question_type": "Conceptual",
    "english_explanation": "A buffer establishes rapport and softens the impact of negative news.",
    "urdu_explanation": "Buffer ka maqsad inkaar se pehle narm aur dosti ka mahaul qaim karna hota hai."
  }
]`}
            className="w-full font-mono text-xs bg-slate-900 text-teal-300 p-4 rounded-2xl border border-slate-800 focus:outline-none"
          />

          <button
            onClick={handleBulkImport}
            className="w-full py-3 bg-blue-900 text-white rounded-xl text-xs font-bold hover:bg-blue-800 cursor-pointer transition"
          >
            Run Import Engine &amp; Insert into Question Bank
          </button>

          {importResult && (
            <div className="p-4 rounded-xl bg-slate-50 border text-xs space-y-2">
              <div className="font-bold text-slate-900">Import Summary:</div>
              <p className="text-emerald-700 font-semibold">{importResult.message}</p>
              {importResult.errors && importResult.errors.length > 0 && (
                <div className="text-rose-700 space-y-1">
                  <div className="font-bold">Errors encountered:</div>
                  {importResult.errors.map((err: string, i: number) => (
                    <div key={i}>&bull; {err}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab: Users */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">Registered Students &amp; Admins</h3>
          <div className="divide-y divide-slate-100 text-xs">
            {users.map((u) => (
              <div key={u.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">{u.name}</div>
                  <div className="text-slate-400 text-[11px]">{u.email}</div>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                    u.role === 'admin'
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-blue-100 text-blue-900'
                  }`}
                >
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: AdSense Settings */}
      {activeTab === 'ads' && adSettings && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">
              Google AdSense Integration Architecture
            </h3>
            <p className="text-xs text-slate-500">
              Configure publisher identity and ad slot identifiers. Ads are disabled by default for academic compliance.
            </p>
          </div>

          <form onSubmit={handleUpdateAds} className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <input
                type="checkbox"
                id="ads_enabled"
                checked={adSettings.ads_enabled}
                onChange={(e) =>
                  setAdSettings({ ...adSettings, ads_enabled: e.target.checked })
                }
                className="w-4 h-4 text-blue-900 rounded focus:ring-blue-900 cursor-pointer"
              />
              <label htmlFor="ads_enabled" className="text-xs font-bold text-slate-800 cursor-pointer">
                Enable Google AdSense on Platform (Live Production)
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                AdSense Publisher ID
              </label>
              <input
                type="text"
                value={adSettings.publisher_id}
                onChange={(e) =>
                  setAdSettings({ ...adSettings, publisher_id: e.target.value })
                }
                placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Top Ad Slot ID
                </label>
                <input
                  type="text"
                  value={adSettings.top_ad_slot}
                  onChange={(e) =>
                    setAdSettings({ ...adSettings, top_ad_slot: e.target.value })
                  }
                  className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Inline Content Ad Slot ID
                </label>
                <input
                  type="text"
                  value={adSettings.inline_ad_slot}
                  onChange={(e) =>
                    setAdSettings({ ...adSettings, inline_ad_slot: e.target.value })
                  }
                  className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Sidebar Ad Slot ID
                </label>
                <input
                  type="text"
                  value={adSettings.sidebar_ad_slot}
                  onChange={(e) =>
                    setAdSettings({ ...adSettings, sidebar_ad_slot: e.target.value })
                  }
                  className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Bottom Ad Slot ID
                </label>
                <input
                  type="text"
                  value={adSettings.bottom_ad_slot}
                  onChange={(e) =>
                    setAdSettings({ ...adSettings, bottom_ad_slot: e.target.value })
                  }
                  className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl px-3 py-2"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-900 text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition cursor-pointer"
            >
              Save AdSense Configuration
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
