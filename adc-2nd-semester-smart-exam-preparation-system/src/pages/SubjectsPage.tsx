import React, { useEffect, useState } from 'react';
import type { Subject } from '../types';
import { api } from '../services/api';
import { SubjectCard } from '../components/cards/SubjectCard';
import { AdInline } from '../components/ads';
import { BookOpen, ShieldCheck, Sparkles, FileCheck2 } from 'lucide-react';

interface SubjectsPageProps {
  navigate: (path: string) => void;
}

export const SubjectsPage: React.FC<SubjectsPageProps> = ({ navigate }) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getSubjects()
      .then((res) => setSubjects(Array.isArray(res?.subjects) ? res.subjects : []))
      .catch((err) => {
        console.error('Error loading subjects:', err);
        setSubjects([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-blue-700" />
            <span>ADC 2nd Semester Core Curriculum</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Six Official ADC 2nd Semester Subjects
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            Select any subject to explore chapters, study bilingual English and Urdu terminology, practice 5-option MCQs, or take a full 60-question timed mock exam.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigate('/practice')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 transition flex items-center gap-1.5 cursor-pointer shadow-sm shadow-blue-950/20"
          >
            <FileCheck2 className="w-4 h-4" /> Practice All Subjects
          </button>
          <button
            onClick={() => navigate('/mocks')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 hover:bg-teal-100 transition cursor-pointer"
          >
            Full Mock Exams
          </button>
        </div>
      </div>

      {/* Subjects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-72 rounded-2xl bg-slate-200 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((sub) => (
            <SubjectCard
              key={sub.id}
              subject={sub}
              onSelect={(slug) => navigate(`/subjects/${slug}`)}
              onPractice={() => navigate(`/practice?subject_id=${sub.id}`)}
            />
          ))}
        </div>
      )}

      {/* AdSense Inline Placement */}
      <AdInline />

      {/* Syllabus Assurance Note */}
      <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Verified Curriculum Reference:</span> Every chapter and topic listed above is verified against the official university syllabus for Associate Degree in Commerce (ADC Part 1 - 2nd Semester).
        </div>
      </div>
    </div>
  );
};
