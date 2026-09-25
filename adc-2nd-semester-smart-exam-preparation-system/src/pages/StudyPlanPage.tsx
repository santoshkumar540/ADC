import React, { useEffect, useState } from 'react';
import type { StudyPlan, StudyPlanItem, Subject } from '../types';
import { api } from '../services/api';
import { AdInline } from '../components/ads';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Check
} from 'lucide-react';

interface StudyPlanPageProps {
  navigate: (path: string) => void;
}

export const StudyPlanPage: React.FC<StudyPlanPageProps> = ({ navigate }) => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [examDate, setExamDate] = useState('');
  const [dailyHours, setDailyHours] = useState(3);
  const [dailyMCQTarget, setDailyMCQTarget] = useState(50);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Default exam date = 30 days from now
    const target = new Date();
    target.setDate(target.getDate() + 30);
    setExamDate(target.toISOString().split('T')[0]);

    api.getSubjects().then((res) => {
      const subList = Array.isArray(res?.subjects) ? res.subjects : [];
      setSubjects(subList);
      setSelectedSubjects(subList.map((s) => s.id));
    });

    api.getStudyPlan()
      .then((res) => {
        if (res.plan) {
          setPlan(res.plan);
          setExamDate(res.plan.exam_date);
          setDailyHours(res.plan.daily_hours);
          setDailyMCQTarget(res.plan.daily_mcq_target);
        }
      })
      .catch((err) => console.error('Error fetching plan:', err))
      .finally(() => setLoading(false));
  }, [user]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!examDate) {
      showToast('Please select your target exam date.', 'error');
      return;
    }

    setGenerating(true);
    try {
      await api.generateStudyPlan({
        exam_date: examDate,
        daily_hours: Number(dailyHours),
        daily_mcq_target: Number(dailyMCQTarget),
        preferred_subjects: selectedSubjects
      });

      showToast('Personalized study plan created!', 'success');
      const res = await api.getStudyPlan();
      setPlan(res.plan);
    } catch (err: any) {
      showToast(err.message || 'Failed to generate plan.', 'error');
    } finally {
      setGenerating(false);
    }
  };

  const handleToggleItem = async (itemId: string) => {
    try {
      const res = await api.toggleStudyPlanItem(itemId);
      setPlan((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          items: prev.items.map((it) =>
            it.id === itemId ? { ...it, is_completed: res.is_completed } : it
          )
        };
      });
      showToast(res.is_completed ? 'Task completed!' : 'Task uncompleted.', 'info');
    } catch {
      showToast('Failed to update task.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <div className="h-32 rounded-3xl bg-slate-200 animate-pulse" />
        <div className="h-96 rounded-3xl bg-slate-200 animate-pulse" />
      </div>
    );
  }

  // Group items by day
  const groupedDays: Record<number, StudyPlanItem[]> = {};
  if (plan?.items) {
    plan.items.forEach((it) => {
      if (!groupedDays[it.day_number]) groupedDays[it.day_number] = [];
      groupedDays[it.day_number].push(it);
    });
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-900 transition mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Personalized ADC Study Plan
          </h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Set your exam date and daily study targets to generate a structured day-by-day revision checklist.
        </p>
      </div>

      {/* Plan Configuration Form */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          {plan ? 'Update Your Study Schedule' : 'Create Your Study Schedule'}
        </h3>

        <form onSubmit={handleGenerate} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Target Exam Date
              </label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Daily Study Hours
              </label>
              <select
                value={dailyHours}
                onChange={(e) => setDailyHours(Number(e.target.value))}
                className="w-full text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-900"
              >
                <option value={2}>2 Hours / Day</option>
                <option value={3}>3 Hours / Day</option>
                <option value={4}>4 Hours / Day</option>
                <option value={5}>5+ Hours / Day</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Daily MCQ Target
              </label>
              <select
                value={dailyMCQTarget}
                onChange={(e) => setDailyMCQTarget(Number(e.target.value))}
                className="w-full text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-900"
              >
                <option value={30}>30 MCQs / Day</option>
                <option value={50}>50 MCQs / Day (Recommended)</option>
                <option value={75}>75 MCQs / Day</option>
                <option value={100}>100 MCQs / Day</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={generating}
            className="w-full py-3 rounded-xl text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 transition shadow-sm cursor-pointer"
          >
            {generating ? 'Generating Schedule...' : plan ? 'Regenerate Study Schedule' : 'Generate Study Plan'}
          </button>
        </form>
      </div>

      {/* AdSense Inline */}
      <AdInline />

      {/* Active Day-by-Day Checklist */}
      {plan && plan.items && plan.items.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Your Daily Study Tasks
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Target: {plan.daily_mcq_target} MCQs &bull; {plan.daily_hours} hrs/day
            </span>
          </div>

          <div className="space-y-4">
            {Object.entries(groupedDays).map(([dayNum, dayTasks]) => {
              const allDone = dayTasks.every((t) => t.is_completed);
              return (
                <div
                  key={dayNum}
                  className={`bg-white rounded-2xl border p-5 shadow-xs transition ${
                    allDone ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200/90'
                  }`}
                >
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900">
                      DAY {dayNum}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {dayTasks.filter((t) => t.is_completed).length} of {dayTasks.length} tasks complete
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {dayTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-3 ${
                          task.is_completed
                            ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950 line-through opacity-80'
                            : 'bg-slate-50 border-slate-200/80 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleToggleItem(task.id)}
                            className={`w-5 h-5 rounded-lg border flex items-center justify-center transition cursor-pointer ${
                              task.is_completed
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-slate-300 bg-white hover:border-blue-900'
                            }`}
                            aria-label="Toggle task completion"
                          >
                            {task.is_completed && <Check className="w-3.5 h-3.5" />}
                          </button>
                          <div>
                            <span className="font-bold text-blue-900 mr-2">[{task.subject_name}]</span>
                            <span className="font-medium">{task.topic_title}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
                            {task.target_mcqs} MCQs &bull; {task.task_type}
                          </span>
                          <button
                            onClick={() => navigate(`/learn?topic_id=${task.topic_id}`)}
                            className="px-2.5 py-1 text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 font-semibold"
                          >
                            Start
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
