import React from 'react';
import { Flag, Check } from 'lucide-react';

interface QuestionNavigatorProps {
  totalQuestions: number;
  currentIndex: number;
  answers: Record<string, string | null>;
  markedForReview: Set<string>;
  questionIds: string[];
  onSelectQuestion: (index: number) => void;
}

export const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
  totalQuestions,
  currentIndex,
  answers,
  markedForReview,
  questionIds,
  onSelectQuestion
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Question Palette ({totalQuestions})
        </h4>
        <div className="flex items-center gap-2 text-[11px] font-semibold">
          <span className="text-teal-700">
            {Object.values(answers).filter((v) => v !== null).length} answered
          </span>
          <span className="text-slate-300">&bull;</span>
          <span className="text-amber-600">{markedForReview.size} review</span>
        </div>
      </div>

      {/* Grid of question buttons */}
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-6 gap-2 max-h-72 overflow-y-auto pr-1">
        {questionIds.map((qId, index) => {
          const isAnswered = answers[qId] !== null && answers[qId] !== undefined;
          const isMarked = markedForReview.has(qId);
          const isCurrent = currentIndex === index;

          let btnStyles = 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100';

          if (isCurrent) {
            btnStyles = 'ring-2 ring-blue-900 border-blue-900 font-extrabold bg-blue-50 text-blue-950';
          } else if (isMarked) {
            btnStyles = 'bg-amber-50 border-amber-300 text-amber-900 font-bold';
          } else if (isAnswered) {
            btnStyles = 'bg-teal-600 border-teal-600 text-white font-bold';
          }

          return (
            <button
              key={qId}
              type="button"
              onClick={() => onSelectQuestion(index)}
              className={`relative h-10 rounded-xl border text-xs flex items-center justify-center transition cursor-pointer ${btnStyles}`}
              aria-label={`Jump to question ${index + 1}`}
            >
              {index + 1}
              {isMarked && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-white" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-1 pt-3.5 mt-3 border-t border-slate-100 text-[10px] text-slate-500 font-medium">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-teal-600 shrink-0" />
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-amber-100 border border-amber-300 shrink-0" />
          <span>For Review</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-slate-50 border border-slate-200 shrink-0" />
          <span>Unanswered</span>
        </div>
      </div>
    </div>
  );
};
