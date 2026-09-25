import React from 'react';
import type { MistakeItem } from '../../types';
import { CheckCircle2, XCircle, Lightbulb, Check, RotateCcw } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

interface MistakeCardProps {
  mistake: MistakeItem;
  onResolved?: (id: string) => void;
  onRetest?: (mcqId: string) => void;
}

export const MistakeCard: React.FC<MistakeCardProps> = ({ mistake, onResolved, onRetest }) => {
  const { showToast } = useToast();

  const handleResolve = async () => {
    try {
      await api.resolveMistake(mistake.id);
      showToast('Mistake marked as resolved.', 'success');
      if (onResolved) onResolved(mistake.id);
    } catch {
      showToast('Failed to resolve mistake.', 'error');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
            {mistake.subject_name}
          </span>
          <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-medium">
            {mistake.topic_title}
          </span>
          <span className="text-[11px] font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded">
            Repeated: {mistake.mistake_count}x
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!mistake.resolved && (
            <button
              onClick={handleResolve}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition"
            >
              <Check className="w-3.5 h-3.5" /> Mark Resolved
            </button>
          )}
          {onRetest && (
            <button
              onClick={() => onRetest(mistake.mcq_id)}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retest
            </button>
          )}
        </div>
      </div>

      {/* Question */}
      <h4 className="text-base font-bold text-slate-900 leading-snug">
        {mistake.question_text}
      </h4>

      {/* Student answer vs Correct answer comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200/70 text-rose-950 flex items-start gap-2.5">
          <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-rose-800 uppercase tracking-wider text-[10px]">
              Your Selected Answer
            </div>
            <div className="font-semibold text-sm mt-0.5">
              Option {mistake.student_answer || 'None (Skipped)'}
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/70 text-emerald-950 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-emerald-800 uppercase tracking-wider text-[10px]">
              Official Correct Answer
            </div>
            <div className="font-semibold text-sm mt-0.5">
              Option {mistake.correct_answer}
            </div>
          </div>
        </div>
      </div>

      {/* Options list */}
      <div className="space-y-1.5 pt-1">
        {mistake.options.map((opt) => (
          <div
            key={opt.option_key}
            className={`p-2.5 rounded-lg border text-xs flex items-start gap-2.5 ${
              opt.option_key === mistake.correct_answer
                ? 'bg-emerald-50/70 border-emerald-300 font-semibold text-emerald-950'
                : opt.option_key === mistake.student_answer
                ? 'bg-rose-50/70 border-rose-300 text-rose-950 line-through opacity-80'
                : 'bg-slate-50 border-slate-200/60 text-slate-600'
            }`}
          >
            <span className="font-bold w-4 text-center shrink-0">{opt.option_key}.</span>
            <span>{opt.option_text}</span>
          </div>
        ))}
      </div>

      {/* Explanations */}
      <div className="pt-2 space-y-2.5">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs">
          <div className="font-bold text-slate-500 uppercase tracking-wider text-[10px] mb-0.5">
            English Explanation
          </div>
          <p className="text-slate-800 font-medium leading-relaxed">
            {mistake.english_explanation}
          </p>
        </div>

        <div className="bg-teal-50/60 p-3 rounded-xl border border-teal-100 text-xs">
          <div className="font-bold text-teal-800 uppercase tracking-wider text-[10px] mb-0.5">
            Urdu Meaning & Explanation (اردو مفہوم)
          </div>
          <p className="text-slate-900 font-urdu leading-relaxed text-sm">
            {mistake.urdu_explanation}
          </p>
        </div>

        {mistake.memory_tip && (
          <div className="flex items-start gap-2 bg-amber-50 p-2.5 rounded-xl border border-amber-200/70 text-xs text-amber-950">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-900">Memory Key:</span> {mistake.memory_tip}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
