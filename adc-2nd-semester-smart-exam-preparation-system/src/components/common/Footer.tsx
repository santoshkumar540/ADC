import React from 'react';
import { GraduationCap, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const subjects = [
    { name: 'Business Communication', slug: 'business-communication' },
    { name: 'Pakistan Studies', slug: 'pakistan-studies' },
    { name: 'Financial Accounting', slug: 'financial-accounting' },
    { name: 'Macro Economics', slug: 'macro-economics' },
    { name: 'Business Statistics', slug: 'business-statistics' },
    { name: 'Computer Application in Business', slug: 'computer-application-in-business' },
  ];

  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-14 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand & Purpose */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-bold text-white text-base tracking-tight">
                ADC 2nd Semester Prep
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Curriculum-aligned smart preparation engine for Associate Degree in Commerce (ADC) students. Bilingual terminology, 5-option MCQs, and mistake-driven revision.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Official Syllabus Aligned &bull; No Guess Papers</span>
            </div>
          </div>

          {/* Core Subjects */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3.5">
              ADC 2nd Semester Subjects
            </h4>
            <ul className="space-y-2 text-xs">
              {subjects.map((s) => (
                <li key={s.slug}>
                  <button
                    onClick={() => navigate(`/subjects/${s.slug}`)}
                    className="text-slate-400 hover:text-white transition text-left"
                  >
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Assessment & Learning Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3.5">
              Preparation Modules
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('/practice')} className="hover:text-white transition">
                  Interactive Practice MCQs
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/mocks')} className="hover:text-white transition">
                  60-MCQ Timed Mock Exams
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/revision')} className="hover:text-white transition">
                  Spaced Revision Engine
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/mistakes')} className="hover:text-white transition">
                  Mistake Tracker & Retesting
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/study-plan')} className="hover:text-white transition">
                  Personalized Study Schedule
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/final-revision')} className="hover:text-white transition">
                  Final Revision Mode
                </button>
              </li>
            </ul>
          </div>

          {/* Educational Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Academic Disclaimer
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              This platform provides syllabus-based practice and concept revision. We do not claim paper prediction or guaranteed questions. All questions are educational exercises mapped to university syllabus topics.
            </p>
            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300">
              <span className="font-semibold text-teal-400">Language Policy:</span> Questions and options are in English; conceptual explanations use clear Urdu/Roman Urdu.
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>&copy; {new Date().getFullYear()} ADC Smart Exam Preparation System. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <span>Built for higher academic excellence</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-1" />
            <span>in Pakistan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
