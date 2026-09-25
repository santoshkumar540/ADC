import React from 'react';
import { Timer } from './Timer';
import { AlertCircle, Save, CheckCircle } from 'lucide-react';

interface TestHeaderProps {
  title: string;
  subjectName?: string;
  totalQuestions: number;
  durationMinutes: number;
  negativeMarking: number;
  penaltyPerWrong: number;
  onTimeUp: () => void;
  onSubmitClick: () => void;
  isAutoSaving?: boolean;
}

export const TestHeader: React.FC<TestHeaderProps> = ({
  title,
  subjectName,
  durationMinutes,
  negativeMarking,
  penaltyPerWrong,
  onTimeUp,
  onSubmitClick,
  isAutoSaving = false
}) => {
  return (
    <div className="bg-white border-b border-slate-200/90 py-3.5 px-4 sm:px-6 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Title & Negative marking pill */}
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                {subjectName || 'Exam Mode'}
              </span>
              <h2 className="text-base font-extrabold text-slate-900 line-clamp-1">{title}</h2>
            </div>
            {negativeMarking ? (
              <p className="text-[11px] text-amber-700 flex items-center gap-1 font-medium mt-0.5">
                <AlertCircle className="w-3 h-3" />
                Negative marking active (-{penaltyPerWrong} per incorrect)
              </p>
            ) : (
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                No negative marking &bull; 1 mark per correct answer
              </p>
            )}
          </div>
        </div>

        {/* Right: Autosave status, Timer, and Submit button */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400">
            {isAutoSaving ? (
              <span className="text-teal-600 flex items-center gap-1">
                <Save className="w-3 h-3 animate-spin" /> Saving...
              </span>
            ) : (
              <span className="text-slate-400 flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-500" /> Auto-saved
              </span>
            )}
          </div>

          <Timer totalSeconds={durationMinutes * 60} onTimeUp={onTimeUp} />

          <button
            type="button"
            onClick={onSubmitClick}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 transition shadow-sm shadow-blue-950/20 cursor-pointer"
          >
            Submit Test
          </button>
        </div>
      </div>
    </div>
  );
};
