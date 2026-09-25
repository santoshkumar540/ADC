import React from 'react';
import type { MCQOptionKey } from '../../types';
import { Check, X } from 'lucide-react';

interface MCQOptionProps {
  optionKey: MCQOptionKey;
  text: string;
  isSelected: boolean;
  isCorrect?: boolean | null; // null if not revealed yet
  showStatus?: boolean; // whether to show green/red correctness
  disabled?: boolean;
  onSelect: (key: MCQOptionKey) => void;
}

export const MCQOptionButton: React.FC<MCQOptionProps> = ({
  optionKey,
  text,
  isSelected,
  isCorrect = null,
  showStatus = false,
  disabled = false,
  onSelect
}) => {
  let containerStyles = 'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/30 text-slate-800';
  let badgeStyles = 'bg-slate-100 text-slate-700 border-slate-300';

  if (showStatus) {
    if (isCorrect === true) {
      containerStyles = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-semibold ring-1 ring-emerald-500';
      badgeStyles = 'bg-emerald-600 text-white border-emerald-600';
    } else if (isSelected && isCorrect === false) {
      containerStyles = 'border-rose-400 bg-rose-50/80 text-rose-950 font-medium ring-1 ring-rose-400';
      badgeStyles = 'bg-rose-600 text-white border-rose-600';
    } else if (isSelected) {
      containerStyles = 'border-blue-700 bg-blue-50/70 text-blue-950 ring-1 ring-blue-700';
      badgeStyles = 'bg-blue-900 text-white border-blue-900';
    }
  } else if (isSelected) {
    containerStyles = 'border-blue-700 bg-blue-50/70 text-blue-950 font-semibold ring-2 ring-blue-700/20';
    badgeStyles = 'bg-blue-900 text-white border-blue-900';
  }

  return (
    <button
      type="button"
      onClick={() => !disabled && onSelect(optionKey)}
      disabled={disabled}
      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-150 flex items-start gap-3.5 select-none cursor-pointer disabled:cursor-default ${containerStyles}`}
    >
      <span
        className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center text-xs font-bold border transition ${badgeStyles}`}
      >
        {showStatus && isCorrect === true ? (
          <Check className="w-4 h-4" />
        ) : showStatus && isSelected && isCorrect === false ? (
          <X className="w-4 h-4" />
        ) : (
          optionKey
        )}
      </span>
      <span className="text-sm leading-relaxed pt-0.5 break-words flex-1">
        {text}
      </span>
    </button>
  );
};
