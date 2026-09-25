import React, { useEffect, useState } from 'react';
import type { MistakeItem, Subject } from '../types';
import { api } from '../services/api';
import { MistakeCard } from '../components/cards/MistakeCard';
import { AdInline } from '../components/ads';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Play,
  ArrowLeft,
  Filter
} from 'lucide-react';

interface MistakesPageProps {
  navigate: (path: string) => void;
}

export const MistakesPage: React.FC<MistakesPageProps> = ({ navigate }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [mistakes, setMistakes] = useState<MistakeItem[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [unresolvedOnly, setUnresolvedOnly] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    api.getSubjects().then((res) => setSubjects(res.subjects));
  }, [user]);

  const fetchMistakes = () => {
    setLoading(true);
    api.getMistakes({
      subject_id: selectedSubject || undefined,
      resolved: unresolvedOnly ? false : undefined
    })
      .then((res) => {
        setMistakes(res.mistakes);
      })
      .catch((err) => console.error('Error fetching mistakes:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user) {
      fetchMistakes();
    }
  }, [user, selectedSubject, unresolvedOnly]);

  const handleRetestAll = async () => {
    try {
      const res = await api.generateTest({
        test_type: 'Mistake Retest',
        question_count: 20,
        duration_minutes: 20
      });
      showToast('Mistake Retest generated! Good luck.', 'success');
      navigate(`/test/${res.test_id}`);
    } catch (err: any) {
      showToast(err.message || 'No unresolved mistakes available for retest.', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-900 transition mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </button>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <RotateCcw className="w-4 h-4" />
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              My Mistakes Bank
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Every incorrect response from your tests is saved here for targeted revision and retesting.
          </p>
        </div>

        {mistakes.length > 0 && (
          <button
            onClick={handleRetestAll}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-md shadow-rose-900/10 transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <Play className="w-4 h-4" /> Launch Mistake Retest
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Filter Subject:</span>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="font-bold bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-none"
          >
            <option value="">All 6 Subjects</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={unresolvedOnly}
              onChange={(e) => setUnresolvedOnly(e.target.checked)}
              className="rounded text-blue-900 focus:ring-blue-900"
            />
            <span className="font-semibold text-slate-700">Show Unresolved Only</span>
          </label>
        </div>
      </div>

      {/* Mistakes List */}
      {loading ? (
        <div className="space-y-4">
          <div className="h-44 rounded-2xl bg-slate-200 animate-pulse" />
          <div className="h-44 rounded-2xl bg-slate-200 animate-pulse" />
        </div>
      ) : mistakes.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-10 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            No Mistakes Found!
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You currently have no recorded mistakes for this selection. Keep taking practice tests to identify any hidden weak spots.
          </p>
          <button
            onClick={() => navigate('/practice')}
            className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold"
          >
            Take a Practice Test
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {mistakes.map((mst) => (
            <MistakeCard
              key={mst.id}
              mistake={mst}
              onResolved={() => fetchMistakes()}
              onRetest={handleRetestAll}
            />
          ))}
        </div>
      )}

      {/* AdSense Placement */}
      <AdInline />
    </div>
  );
};
