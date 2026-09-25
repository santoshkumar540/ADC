import React, { useEffect } from 'react';
import type { AttemptResult } from '../../types';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Sparkles,
  TrendingDown,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { AdInline } from '../ads';

interface ResultCardProps {
  result: AttemptResult;
  onReviewMistakes: () => void;
  onStartRevision: () => void;
  onRetakeTest: () => void;
  navigate: (path: string) => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  onReviewMistakes,
  onStartRevision,
  onRetakeTest,
  navigate
}) => {
  useEffect(() => {
    if (result.accuracy >= 75) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore confetti errors in restricted frames
      }
    }
  }, [result.accuracy]);

  const minutes = Math.floor(result.time_spent_seconds / 60);
  const seconds = result.time_spent_seconds % 60;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 mb-3">
              <Trophy className="w-3.5 h-3.5 text-teal-400" /> Assessment Completed
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1">
              {result.test_title}
            </h2>
            <p className="text-xs text-slate-300">
              Subject: <span className="font-semibold text-white">{result.subject_name}</span> &bull; Detailed Performance Diagnostic
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-teal-400">
                {result.score}
                <span className="text-lg text-slate-300 font-normal"> / {result.max_score}</span>
              </div>
              <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mt-0.5">
                Total Score
              </div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-white">
                {result.accuracy}%
              </div>
              <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mt-0.5">
                Accuracy
              </div>
            </div>
          </div>
        </div>

        {/* 4 Stat Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="text-lg font-bold">{result.correct_count}</div>
              <div className="text-[11px] text-slate-400">Correct Answers</div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex items-center gap-3">
            <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <div>
              <div className="text-lg font-bold">{result.wrong_count}</div>
              <div className="text-[11px] text-slate-400">Incorrect (Mistakes)</div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex items-center gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-slate-400 flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0">
              0
            </div>
            <div>
              <div className="text-lg font-bold">{result.skipped_count}</div>
              <div className="text-[11px] text-slate-400">Skipped</div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex items-center gap-3">
            <Clock className="w-5 h-5 text-teal-400 shrink-0" />
            <div>
              <div className="text-lg font-bold">
                {minutes}m {seconds}s
              </div>
              <div className="text-[11px] text-slate-400">Time Utilized</div>
            </div>
          </div>
        </div>
      </div>

      {/* AdSense Placement Between Major Result Sections */}
      <AdInline />

      {/* Diagnostic Analysis: Strong Topics & Topics Needing Revision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strong Topics */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h4 className="text-sm font-bold text-slate-900">Strong Topics (Mastery &ge; 85%)</h4>
          </div>
          {result.strong_topics.length > 0 ? (
            <div className="space-y-2">
              {result.strong_topics.map((top) => (
                <div
                  key={top.topic_id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs font-medium text-emerald-950"
                >
                  <span className="line-clamp-1">{top.title}</span>
                  <span className="font-bold text-emerald-700 bg-white px-2 py-0.5 rounded shadow-2xs">
                    {top.accuracy}%
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">
              Continue practicing to achieve 85%+ mastery in individual topics.
            </p>
          )}
        </div>

        {/* Topics Needing Revision */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="w-4 h-4 text-amber-600" />
            <h4 className="text-sm font-bold text-slate-900">Topics Needing Revision (&lt; 70%)</h4>
          </div>
          {result.weak_topics.length > 0 ? (
            <div className="space-y-2">
              {result.weak_topics.map((top) => (
                <div
                  key={top.topic_id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/70 border border-amber-100 text-xs font-medium text-amber-950"
                >
                  <span className="line-clamp-1">{top.title}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-amber-800">
                      {top.mistake_count} mistake{top.mistake_count > 1 ? 's' : ''}
                    </span>
                    <span className="font-bold text-amber-900 bg-white px-2 py-0.5 rounded shadow-2xs">
                      {top.accuracy}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">
              No weak topics detected below 70%! Excellent syllabus retention.
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {result.wrong_count > 0 && (
            <button
              onClick={onReviewMistakes}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 transition shadow-sm shadow-rose-900/10 flex items-center gap-1.5 cursor-pointer"
            >
              <XCircle className="w-4 h-4" /> Review {result.wrong_count} Mistakes
            </button>
          )}

          {result.weak_topics.length > 0 && (
            <button
              onClick={onStartRevision}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-blue-900 bg-blue-100 hover:bg-blue-200 transition flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-blue-700" /> Start Weak Topic Revision
            </button>
          )}

          <button
            onClick={onRetakeTest}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" /> Retake Test
          </button>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-900 hover:text-blue-900 transition flex items-center gap-1.5 cursor-pointer"
        >
          Return to Dashboard <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
