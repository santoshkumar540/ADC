import React from 'react';
import type { Subject } from '../../types';
import {
  MessageSquare,
  Landmark,
  Calculator,
  TrendingUp,
  BarChart3,
  Laptop,
  ArrowRight,
  BookOpen,
  FileCheck2,
  Sparkles
} from 'lucide-react';

interface SubjectCardProps {
  subject: Subject;
  onSelect: (slug: string) => void;
  onPractice?: (id: string) => void;
}

const iconMap: Record<string, any> = {
  MessageSquare,
  Landmark,
  Calculator,
  TrendingUp,
  BarChart3,
  Laptop
};

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onSelect, onPractice }) => {
  const IconComponent = iconMap[subject.icon] || BookOpen;
  const progress = subject.user_progress || 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-900 group-hover:scale-105 transition">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono font-bold tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
            {subject.code}
          </span>
        </div>

        {/* Title & Description */}
        <h3
          onClick={() => onSelect(subject.slug)}
          className="text-lg font-bold text-slate-900 hover:text-blue-900 cursor-pointer transition line-clamp-1 mb-2"
        >
          {subject.name}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-5">
          {subject.description}
        </p>

        {/* Syllabus Stats */}
        <div className="grid grid-cols-3 gap-2 py-3 px-3.5 bg-slate-50 rounded-xl text-center text-xs mb-5">
          <div>
            <div className="font-extrabold text-slate-800 text-sm">{subject.chapter_count || 4}</div>
            <div className="text-[11px] text-slate-400 font-medium">Chapters</div>
          </div>
          <div className="border-x border-slate-200/60">
            <div className="font-extrabold text-slate-800 text-sm">{subject.topic_count || 8}</div>
            <div className="text-[11px] text-slate-400 font-medium">Topics</div>
          </div>
          <div>
            <div className="font-extrabold text-blue-900 text-sm">{subject.mcq_count || 30}+</div>
            <div className="text-[11px] text-slate-400 font-medium">MCQs</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="text-slate-500">Preparation Progress</span>
            <span className="font-bold text-slate-900">{progress}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-700 to-teal-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.max(5, progress)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
        <button
          onClick={() => onSelect(subject.slug)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-700 transition"
        >
          Explore Syllabus
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
        </button>

        {onPractice && (
          <button
            onClick={() => onPractice(subject.id)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 shadow-2xs transition"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-teal-600" />
            Practice
          </button>
        )}
      </div>
    </div>
  );
};
