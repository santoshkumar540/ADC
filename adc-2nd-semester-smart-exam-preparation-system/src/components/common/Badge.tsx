import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

interface BadgeProps {
  type: 'syllabus' | 'support' | 'exam' | 'difficulty' | 'type';
  text?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, text, className = '' }) => {
  if (type === 'syllabus') {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80 ${className}`}>
        <BookOpen className="w-3 h-3 text-blue-600" />
        {text || 'Syllabus Topic'}
      </span>
    );
  }

  if (type === 'support') {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 ${className}`}>
        <Sparkles className="w-3 h-3 text-emerald-600" />
        {text || 'Supporting Explanation'}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200 ${className}`}>
      {text}
    </span>
  );
};
