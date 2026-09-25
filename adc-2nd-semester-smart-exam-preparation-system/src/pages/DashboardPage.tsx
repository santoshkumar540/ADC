import React, { useEffect, useState } from 'react';
import type { DashboardStats } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { AdTop, AdInline } from '../components/ads';
import {
  BookOpen,
  Award,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Zap,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  FileCheck2,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface DashboardPageProps {
  navigate: (path: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ navigate }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setLoading(true);
    api.getProgressSummary()
      .then((res) => setStats(res.stats))
      .catch((err) => console.error('Dashboard load error:', err))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="h-44 rounded-3xl bg-slate-200 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 rounded-2xl bg-slate-200 animate-pulse" />
          <div className="h-32 rounded-2xl bg-slate-200 animate-pulse" />
          <div className="h-32 rounded-2xl bg-slate-200 animate-pulse" />
        </div>
      </div>
    );
  }

  const s = stats || {
    overall_progress: 0,
    overall_accuracy: 0,
    completed_mcqs: 0,
    today_target: 50,
    today_completed: 0,
    mistakes_to_review: 0,
    revision_due_count: 0,
    mocks_completed: 0,
    study_streak_days: 1,
    subjects_progress: [],
    recent_attempts: []
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Welcome & Overview Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>ADC 2nd Semester Exam Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name ? user.name.split(' ')[0] : 'Student'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Track your preparation progress across the six core subjects, review flagged mistakes, and complete your daily target.
          </p>
        </div>

        {/* Big Overall Progress Pill */}
        <div className="flex items-center gap-6 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 shrink-0">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-teal-400">
              {s.overall_progress}%
            </div>
            <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mt-0.5">
              Overall Preparation
            </div>
          </div>
          <div className="w-px h-12 bg-white/20" />
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white">
              {s.overall_accuracy}%
            </div>
            <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mt-0.5">
              Accuracy Rate
            </div>
          </div>
        </div>
      </div>

      {/* Top AdSlot */}
      <AdTop />

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Today's Target */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Today's Target</span>
            <CheckCircle2 className="w-4 h-4 text-blue-900" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {s.today_completed} <span className="text-xs font-normal text-slate-400">/ {s.today_target} MCQs</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-blue-900 h-1.5 rounded-full transition-all"
              style={{ width: `${Math.min(100, (s.today_completed / s.today_target) * 100)}%` }}
            />
          </div>
        </div>

        {/* Mistakes to Review */}
        <div
          onClick={() => navigate('/mistakes')}
          className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between cursor-pointer hover:border-rose-300 transition"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">Mistakes to Review</span>
            <RotateCcw className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-700">
            {s.mistakes_to_review}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Tap to launch error retests
          </p>
        </div>

        {/* Revision Due */}
        <div
          onClick={() => navigate('/revision')}
          className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between cursor-pointer hover:border-amber-300 transition"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Revision Due</span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-800">
            {s.revision_due_count}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Weak topics &amp; spaced review
          </p>
        </div>

        {/* 60-MCQ Mocks Completed */}
        <div
          onClick={() => navigate('/mocks')}
          className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between cursor-pointer hover:border-teal-300 transition"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Mocks Completed</span>
            <Award className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-black text-teal-800">
            {s.mocks_completed}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Take full 60-question mocks
          </p>
        </div>
      </div>

      {/* Quick Action Navigation Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button
          onClick={() => navigate('/learn')}
          className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 text-slate-800 transition flex flex-col items-center text-center cursor-pointer shadow-2xs"
        >
          <Sparkles className="w-5 h-5 text-blue-900 mb-1.5" />
          <span className="text-xs font-bold">Continue Learning</span>
        </button>

        <button
          onClick={() => navigate('/practice')}
          className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-teal-400 hover:bg-teal-50/30 text-slate-800 transition flex flex-col items-center text-center cursor-pointer shadow-2xs"
        >
          <FileCheck2 className="w-5 h-5 text-teal-600 mb-1.5" />
          <span className="text-xs font-bold">Practice Test</span>
        </button>

        <button
          onClick={() => navigate('/mocks')}
          className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-teal-400 hover:bg-teal-50/30 text-slate-800 transition flex flex-col items-center text-center cursor-pointer shadow-2xs"
        >
          <Award className="w-5 h-5 text-teal-700 mb-1.5" />
          <span className="text-xs font-bold">60-MCQ Mock Exam</span>
        </button>

        <button
          onClick={() => navigate('/mistakes')}
          className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-rose-400 hover:bg-rose-50/30 text-slate-800 transition flex flex-col items-center text-center cursor-pointer shadow-2xs"
        >
          <RotateCcw className="w-5 h-5 text-rose-600 mb-1.5" />
          <span className="text-xs font-bold">My Mistakes ({s.mistakes_to_review})</span>
        </button>

        <button
          onClick={() => navigate('/study-plan')}
          className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 text-slate-800 transition flex flex-col items-center text-center cursor-pointer shadow-2xs col-span-2 sm:col-span-1"
        >
          <Calendar className="w-5 h-5 text-indigo-600 mb-1.5" />
          <span className="text-xs font-bold">Study Plan</span>
        </button>
      </div>

      {/* Six Subjects Progress Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-900" />
            Subject Preparation Progress
          </h3>
          <button
            onClick={() => navigate('/subjects')}
            className="text-xs font-bold text-blue-900 hover:text-blue-700"
          >
            View All Syllabus &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {s.subjects_progress.map((sub) => (
            <div
              key={sub.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between hover:shadow-sm transition"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                    {sub.code}
                  </span>
                  <span className="text-xs font-bold text-slate-800">{sub.progress}%</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{sub.name}</h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  {sub.learned_topics} of {sub.total_topics} topics completed &bull; {sub.accuracy}% test accuracy
                </p>
                <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-700 to-teal-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(5, sub.progress)}%` }}
                  />
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => navigate(`/subjects/${sub.slug}`)}
                  className="text-xs font-bold text-blue-900 hover:text-blue-700"
                >
                  Syllabus
                </button>
                <button
                  onClick={() => navigate(`/practice?subject_id=${sub.id}`)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                >
                  Practice MCQs
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AdSense Placement */}
      <AdInline />

      {/* Recent Attempts History */}
      {s.recent_attempts.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Recent Assessment History
          </h3>
          <div className="divide-y divide-slate-100">
            {s.recent_attempts.map((att) => (
              <div
                key={att.id}
                onClick={() => navigate(`/results/${att.id}`)}
                className="py-3 flex items-center justify-between text-xs hover:bg-slate-50 rounded-xl px-2 cursor-pointer transition"
              >
                <div>
                  <div className="font-bold text-slate-900">{att.title}</div>
                  <div className="text-[11px] text-slate-400">
                    Completed on {att.completed_at ? new Date(att.completed_at).toLocaleDateString() : 'Recent'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-teal-700">
                    {att.score} / {att.total_questions} ({att.accuracy}%)
                  </div>
                  <div className="text-[11px] text-blue-900 font-semibold">View Result &rarr;</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
