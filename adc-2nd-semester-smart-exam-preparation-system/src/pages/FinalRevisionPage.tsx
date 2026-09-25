import React, { useEffect, useState } from 'react';
import type { Subject, Term, MistakeItem } from '../types';
import { api } from '../services/api';
import { TermCard } from '../components/cards/TermCard';
import { MistakeCard } from '../components/cards/MistakeCard';
import { AdInline } from '../components/ads';
import {
  Zap,
  BookOpen,
  Award,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck2
} from 'lucide-react';

interface FinalRevisionPageProps {
  navigate: (path: string) => void;
}

export const FinalRevisionPage: React.FC<FinalRevisionPageProps> = ({ navigate }) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [terms, setTerms] = useState<Term[]>([]);
  const [mistakes, setMistakes] = useState<MistakeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getSubjects().then((res) => {
      const subList = Array.isArray(res?.subjects) ? res.subjects : [];
      setSubjects(subList);
      if (subList.length > 0 && subList[0]?.id) {
        setSelectedSubjectId(subList[0].id);
      }
    });
  }, []);

  useEffect(() => {
    if (!selectedSubjectId) return;
    setLoading(true);
    Promise.all([
      api.getTerms({ subject_id: selectedSubjectId }),
      api.getMistakes({ subject_id: selectedSubjectId, resolved: false })
    ])
      .then(([termsRes, mistakesRes]) => {
        setTerms(Array.isArray(termsRes?.terms) ? termsRes.terms : []);
        setMistakes(Array.isArray(mistakesRes?.mistakes) ? mistakesRes.mistakes : []);
      })
      .catch((err) => console.error('Error fetching final revision data:', err))
      .finally(() => setLoading(false));
  }, [selectedSubjectId]);

  const activeSubject = subjects.find((s) => s.id === selectedSubjectId);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-teal-700 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>High-Yield Final Review</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Final Exam Revision Mode
          </h1>
          <p className="text-xs sm:text-sm text-slate-100 max-w-lg leading-relaxed">
            Consolidated last-minute review of high-yield bilingual terms, key conceptual formulas, previous mistakes, and full 60-question mocks.
          </p>
        </div>

        {activeSubject && (
          <button
            onClick={() => navigate(`/test/test-mock-${activeSubject.slug}`)}
            className="px-5 py-3 rounded-2xl text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 transition shadow-lg flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Award className="w-4 h-4 text-teal-700" />
            Launch 60-MCQ Mock
          </button>
        )}
      </div>

      {/* Subject Selector Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Select Subject to Revise:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {subjects.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubjectId(sub.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedSubjectId === sub.id
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      </div>

      {/* High-Yield Terms Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-900" />
            Important Syllabus Terminology ({terms.length})
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            English + Urdu Meanings &bull; Memory Tips
          </span>
        </div>

        {loading ? (
          <div className="space-y-3">
            <div className="h-32 rounded-2xl bg-slate-200 animate-pulse" />
            <div className="h-32 rounded-2xl bg-slate-200 animate-pulse" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {terms.map((t) => (
              <TermCard key={t.id} term={t} />
            ))}
          </div>
        )}
      </div>

      {/* AdSense Inline */}
      <AdInline />

      {/* Previous Mistakes Review for This Subject */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-rose-600" />
            Unresolved Mistakes for {activeSubject?.name} ({mistakes.length})
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Prioritize fixing recurring errors
          </span>
        </div>

        {mistakes.length === 0 ? (
          <div className="p-6 text-center bg-white rounded-2xl border border-slate-200 text-emerald-700 text-xs font-semibold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            No active mistakes recorded for this subject!
          </div>
        ) : (
          <div className="space-y-4">
            {mistakes.map((mst) => (
              <MistakeCard key={mst.id} mistake={mst} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
