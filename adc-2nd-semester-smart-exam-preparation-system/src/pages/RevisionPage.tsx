import React, { useEffect, useState } from 'react';
import type { WeakTopicAnalysis } from '../types';
import { api } from '../services/api';
import { AdInline } from '../components/ads';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  RotateCcw,
  Sparkles,
  TrendingDown,
  Clock,
  ArrowRight,
  Play,
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface RevisionPageProps {
  navigate: (path: string) => void;
}

export const RevisionPage: React.FC<RevisionPageProps> = ({ navigate }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [weakTopics, setWeakTopics] = useState<WeakTopicAnalysis[]>([]);
  const [allTopics, setAllTopics] = useState<WeakTopicAnalysis[]>([]);
  const [dueItems, setDueItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setLoading(true);
    Promise.all([api.getWeakTopics(), api.getDueRevision()])
      .then(([weakRes, dueRes]) => {
        setWeakTopics(weakRes.weak_topics);
        setAllTopics(weakRes.all_topics_performance);
        setDueItems(dueRes.due_items);
      })
      .catch((err) => console.error('Error fetching revision data:', err))
      .finally(() => setLoading(false));
  }, [user]);

  const handleStartWeakTopicTest = async (topicId?: string) => {
    try {
      const res = await api.generateTest({
        test_type: 'Weak Topic Test',
        topic_id: topicId,
        question_count: 15,
        duration_minutes: 15
      });
      showToast('Generated targeted Weak Topic Test!', 'success');
      navigate(`/test/${res.test_id}`);
    } catch (err: any) {
      showToast(err.message || 'Failed to generate revision test.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <div className="h-32 rounded-3xl bg-slate-200 animate-pulse" />
        <div className="h-64 rounded-3xl bg-slate-200 animate-pulse" />
      </div>
    );
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
          <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <RotateCcw className="w-4 h-4" />
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Smart Revision Engine
          </h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Dynamically detects topics below 70% accuracy and schedules spaced review intervals (1, 3, 7, 14 days).
        </p>
      </div>

      {/* Spaced Revision Due Alert */}
      {dueItems.length > 0 && (
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-amber-900">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <h3 className="text-sm font-bold">
              Spaced Revision Due Today ({dueItems.length} Topics)
            </h3>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            According to the Ebbinghaus forgetting curve, reviewing these topics now locks concepts into long-term memory before the exam.
          </p>
          <div className="space-y-2 pt-1">
            {dueItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-3 border border-amber-200 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900">{item.topic_title}</span>
                  <span className="text-[11px] text-slate-400 ml-2">({item.subject_name})</span>
                </div>
                <button
                  onClick={() => navigate(`/learn?topic_id=${item.topic_id}`)}
                  className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs"
                >
                  Revise Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weak Topics Diagnostic Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-rose-600" />
              Topics Needing Revision (&lt; 70% Accuracy)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Topics dynamically calculated from your recent practice &amp; mock performance.
            </p>
          </div>

          {weakTopics.length > 0 && (
            <button
              onClick={() => handleStartWeakTopicTest()}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 shadow-sm transition flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Play className="w-3.5 h-3.5" /> Start Weak Topic Quiz
            </button>
          )}
        </div>

        {weakTopics.length === 0 ? (
          <div className="p-8 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-emerald-950">No Critical Weak Topics!</h4>
            <p className="text-xs text-emerald-800 max-w-md mx-auto">
              Your overall topic accuracies are currently maintaining the 70%+ threshold. Continue exploring new topics or taking full 60-MCQ mock exams.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {weakTopics.map((top) => (
              <div
                key={top.topic_id}
                className="p-3.5 rounded-xl border border-rose-100 bg-rose-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                      {top.subject_name}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{top.topic_title}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Accuracy: <span className="font-bold text-rose-600">{top.accuracy}%</span> &bull; Mistakes: <span className="font-bold text-slate-700">{top.mistake_count}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/learn?topic_id=${top.topic_id}`)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition shadow-2xs"
                  >
                    Learn
                  </button>
                  <button
                    onClick={() => handleStartWeakTopicTest(top.topic_id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 transition"
                  >
                    Re-Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AdSense Inline */}
      <AdInline />

      {/* All Topics Performance Matrix */}
      {allTopics.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            All Tested Topics Breakdown
          </h3>
          <div className="divide-y divide-slate-100 text-xs">
            {allTopics.map((item) => (
              <div key={item.topic_id} className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800">{item.topic_title}</span>
                  <span className="text-slate-400 text-[11px] ml-2">({item.subject_name})</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 text-[11px]">{item.total_attempts} attempts</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                      item.accuracy >= 85
                        ? 'bg-emerald-50 text-emerald-700'
                        : item.accuracy >= 70
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {item.accuracy}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
