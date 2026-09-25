import React, { useState } from 'react';
import type { MCQ, MCQOptionKey } from '../../types';
import { MCQOptionButton } from './MCQOption';
import { Bookmark, Lightbulb, BookOpen, CheckCircle2, HelpCircle } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

interface MCQCardProps {
  mcq: MCQ;
  mode?: 'learning' | 'practice' | 'review';
  selectedOption?: MCQOptionKey | null;
  onSelectOption?: (key: MCQOptionKey) => void;
  showExplanation?: boolean;
}

export const MCQCard: React.FC<MCQCardProps> = ({
  mcq,
  mode = 'practice',
  selectedOption: externalSelected,
  onSelectOption,
  showExplanation: externalShowExplanation
}) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [internalSelected, setInternalSelected] = useState<MCQOptionKey | null>(null);
  const [bookmarked, setBookmarked] = useState(Boolean(mcq.is_bookmarked));

  const selected = externalSelected !== undefined ? externalSelected : internalSelected;
  const isLearning = mode === 'learning';
  const isReview = mode === 'review';
  const showAnswerAndExplanation = isLearning || isReview || Boolean(externalShowExplanation) || (mode === 'practice' && selected !== null);

  const handleSelect = (key: MCQOptionKey) => {
    if (onSelectOption) {
      onSelectOption(key);
    } else {
      setInternalSelected(key);
    }
  };

  const handleToggleBookmark = async () => {
    if (!user) {
      showToast('Please log in to bookmark questions.', 'info');
      return;
    }
    try {
      const res = await api.toggleBookmark('mcq', mcq.id);
      setBookmarked(res.bookmarked);
      showToast(res.message, 'success');
    } catch {
      showToast('Failed to bookmark question.', 'error');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
        <div className="flex flex-wrap items-center gap-2">
          {mcq.subject_name && (
            <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              {mcq.subject_name}
            </span>
          )}
          {mcq.topic_title && (
            <span className="text-xs text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full font-medium">
              {mcq.topic_title}
            </span>
          )}
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100/80 px-2 py-0.5 rounded">
            {mcq.question_type}
          </span>
          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded ${
              mcq.difficulty === 'Easy'
                ? 'bg-emerald-50 text-emerald-700'
                : mcq.difficulty === 'Medium'
                ? 'bg-amber-50 text-amber-700'
                : 'bg-rose-50 text-rose-700'
            }`}
          >
            {mcq.difficulty}
          </span>
        </div>

        <button
          onClick={handleToggleBookmark}
          className={`p-1.5 rounded-lg transition ${
            bookmarked ? 'text-teal-600 bg-teal-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
          }`}
          title={bookmarked ? 'Bookmarked' : 'Bookmark Question'}
          aria-label={bookmarked ? 'Bookmarked' : 'Bookmark Question'}
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-teal-600' : ''}`} />
        </button>
      </div>

      {/* Question Text */}
      <div className="mb-6">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {mcq.question_text}
        </h3>
      </div>

      {/* 5 Options: A, B, C, D, E */}
      <div className="space-y-3 mb-6">
        {mcq.options.map((opt) => {
          const isThisSelected = selected === opt.option_key;
          const isThisCorrect = opt.option_key === mcq.correct_option;

          return (
            <MCQOptionButton
              key={opt.option_key}
              optionKey={opt.option_key}
              text={opt.option_text}
              isSelected={isThisSelected}
              isCorrect={showAnswerAndExplanation ? isThisCorrect : null}
              showStatus={showAnswerAndExplanation}
              disabled={isLearning || (mode === 'practice' && selected !== null)}
              onSelect={handleSelect}
            />
          );
        })}
      </div>

      {/* Explanations & Memory Tip (Shown in Learning Mode or after answering) */}
      {showAnswerAndExplanation && (
        <div className="mt-6 pt-5 border-t border-slate-100 space-y-4 animate-in fade-in-50 duration-200">
          {/* Correct Answer Badge */}
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-bold text-emerald-950">
              Correct Answer: Option {mcq.correct_option}
            </span>
          </div>

          {/* English Explanation */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              English Conceptual Explanation
            </div>
            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              {mcq.english_explanation}
            </p>
          </div>

          {/* Urdu Explanation */}
          <div className="bg-teal-50/60 p-3.5 rounded-xl border border-teal-100">
            <div className="text-xs font-bold uppercase tracking-wider text-teal-800 mb-1">
              Simple Urdu Meaning & Explanation (اردو وضاحت)
            </div>
            <p className="text-sm text-slate-900 leading-relaxed font-urdu">
              {mcq.urdu_explanation}
            </p>
          </div>

          {/* Memory Tip */}
          {mcq.memory_tip && (
            <div className="flex items-start gap-2.5 bg-amber-50 p-3 rounded-xl border border-amber-200/80 text-xs text-amber-950">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-900">Exam Memory Tip:</span> {mcq.memory_tip}
              </div>
            </div>
          )}

          {/* Source Reference */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              {mcq.source_reference}
            </span>
            <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
              Syllabus Aligned
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
