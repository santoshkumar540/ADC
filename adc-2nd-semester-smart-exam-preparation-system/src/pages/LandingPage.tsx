import React, { useEffect, useState } from 'react';
import type { Subject } from '../types';
import { api } from '../services/api';
import { SubjectCard } from '../components/cards/SubjectCard';
import { AdTop, AdInline, AdBottom } from '../components/ads';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Award,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  HelpCircle,
  BarChart3,
  Calendar,
  Layers,
  Lightbulb
} from 'lucide-react';

interface LandingPageProps {
  navigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ navigate }) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getSubjects()
      .then((res) => setSubjects(Array.isArray(res?.subjects) ? res.subjects : []))
      .catch((err) => {
        console.error('Failed to load subjects:', err);
        setSubjects([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const roadmapSteps = [
    { title: '1. Syllabus', desc: 'Verified 6 subjects structure', icon: BookOpen },
    { title: '2. Learning', desc: 'Bilingual English & Urdu terms', icon: Sparkles },
    { title: '3. Practice', desc: '5-option MCQs with answers', icon: Layers },
    { title: '4. Test Mode', desc: 'Timed tests with hidden answers', icon: CheckCircle2 },
    { title: '5. Mistakes', desc: 'Auto-saved mistake tracking', icon: RotateCcw },
    { title: '6. Revision', desc: 'Smart weak-topic diagnostic', icon: Lightbulb },
    { title: '7. Retest', desc: 'Targeted error retesting', icon: RotateCcw },
    { title: '8. 60-MCQ Mock', desc: 'Full exam simulation', icon: Award },
    { title: '9. Final Prep', desc: 'High-yield exam review', icon: GraduationCap },
  ];

  const faqs = [
    {
      q: 'Does this platform follow the official ADC 2nd Semester syllabus?',
      a: 'Yes. All subjects, units, chapters, and topics are directly mapped from the official ADC (Associate Degree in Commerce) curriculum. We strictly label official syllabus topics and keep educational explanations distinct.'
    },
    {
      q: 'Why are explanations provided in Urdu while questions are in English?',
      a: 'University exams are conducted in English, so question stems, options, and terminology must be mastered in English. Simple Urdu and Roman Urdu explanations help students grasp deep conceptual meanings, accounting logic, and economic theories without language barriers.'
    },
    {
      q: 'How does the 60-MCQ Mock Exam work?',
      a: 'Each subject features full 60-question timed mock assessments with a 60-minute countdown, 5 options (A, B, C, D, E), question navigation palettes, and instant diagnostic performance analytics with negative marking support if configured.'
    },
    {
      q: 'How does the mistake tracking and revision engine help me?',
      a: 'Every question you answer incorrectly is automatically logged into your personal Mistake Bank with an occurrence counter. The smart weak-topic engine flags topics with accuracy below 70% and generates customized revision sets.'
    },
    {
      q: 'Do you guarantee exact exam questions or 100% paper predictions?',
      a: 'No. In adherence to academic integrity, we do not make false claims of "guaranteed questions" or "100% paper prediction". Our platform delivers rigorous syllabus-based conceptual preparation and exam-style practice.'
    }
  ];

  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-900 text-xs font-semibold shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-blue-700" />
          <span>ADC 2nd Semester &bull; University Curriculum Aligned</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
          ADC 2nd Semester <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-900 via-teal-700 to-blue-800 bg-clip-text text-transparent">
            Smart Exam Preparation
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Learn your syllabus, understand important terms in English and Urdu, practice MCQs, revise your mistakes, and prepare with full mock exams.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/learn')}
            className="px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-blue-900 hover:bg-blue-800 shadow-md shadow-blue-900/20 transition flex items-center gap-2 cursor-pointer"
          >
            Start Learning
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/subjects')}
            className="px-6 py-3.5 rounded-xl text-sm font-bold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 transition cursor-pointer"
          >
            Explore Subjects
          </button>
          <button
            onClick={() => navigate('/mocks')}
            className="px-6 py-3.5 rounded-xl text-sm font-bold text-teal-800 bg-teal-50 border border-teal-200 hover:bg-teal-100 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Award className="w-4 h-4 text-teal-700" />
            Take 60-MCQ Mock
          </button>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-6 text-xs font-semibold text-slate-600">
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600" /> 6 Core Subjects
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600" /> 5-Option (A to E) MCQs
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600" /> Bilingual English + Urdu Terms
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600" /> Mistake Tracking Engine
          </span>
        </div>
      </section>

      {/* AdSense Top Slot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdTop />
      </div>

      {/* 2. What is the platform? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md">
              Comprehensive LMS & Assessment Engine
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Built Specifically for ADC Commerce Students in Pakistan
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Unlike generic exam websites, this platform is tailored strictly around the Associate Degree in Commerce (ADC) 2nd Semester curriculum. We bridge the language gap by pairing English examination terms with intuitive Urdu meanings and business examples.
            </p>
            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  1
                </div>
                <p className="text-xs sm:text-sm text-slate-700">
                  <span className="font-bold text-slate-900">Syllabus-as-Truth:</span> No made-up chapters. All 6 subjects directly follow university curriculum outlines.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-900 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-xs sm:text-sm text-slate-700">
                  <span className="font-bold text-slate-900">Five-Option MCQ Engine:</span> Exactly options A, B, C, D, and E with real numerical workings, formulas, and conceptual explanations.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  3
                </div>
                <p className="text-xs sm:text-sm text-slate-700">
                  <span className="font-bold text-slate-900">Mistake Retention:</span> Automatically flags topics where your accuracy is under 70% and generates focused revision sets.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-teal-400">SAMPLE BILINGUAL CONCEPT</span>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">
                EC-204
              </span>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase">Term</div>
              <div className="text-xl font-bold text-white">Inflation (افراطِ زر)</div>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-xs space-y-1">
              <div className="text-teal-400 font-semibold">English Definition:</div>
              <p className="text-slate-300">A sustained, persistent increase in the general price level of goods and services.</p>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-xs space-y-1">
              <div className="text-amber-400 font-semibold">Simple Urdu Meaning:</div>
              <p className="text-slate-300 font-urdu leading-relaxed">
                Inflation ka matlab hai maeeshat mein aam ashiya aur khadmaat ki qeematon ka musalsal barhna.
              </p>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Memory Tip: Prices generally increase over time.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Six Subjects Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md">
              Official Curriculum
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              The Six ADC 2nd Semester Subjects
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Verified syllabus structures, chapters, bilingual terminology, and 5-option MCQ question banks.
            </p>
          </div>
          <button
            onClick={() => navigate('/subjects')}
            className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            View All Subjects <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

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
      </section>

      {/* AdSense Inline Slot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdInline />
      </div>

      {/* 4. How Preparation Works (Roadmap) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md">
            Scientific Preparation Methodology
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            The 9-Step Exam Mastery Workflow
          </h2>
          <p className="text-sm text-slate-600">
            From official syllabus exploration to final 60-MCQ mock exams, every step is built to maximize concept retention and eliminate exam anxiety.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-3">
          {roadmapSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 p-4 flex flex-col items-center text-center shadow-2xs hover:shadow-sm hover:border-blue-300 transition"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center mb-2.5">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-0.5">{step.title}</h4>
                <p className="text-[11px] text-slate-500 leading-tight">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. 60-MCQ Mock Exam Simulation Feature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-teal-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300 bg-teal-500/20 px-3 py-1 rounded-full border border-teal-500/30">
              Exam Simulation Engine
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Full 60-Question Subject Mock Exams
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Test yourself under realistic exam conditions. 60 questions, exactly 5 options each, 60-minute countdown timer, question palette navigation, and instant diagnostic performance analytics with negative marking support.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigate('/mocks')}
                className="px-6 py-3 rounded-xl text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 transition shadow-md shadow-teal-500/20 flex items-center gap-1.5 cursor-pointer"
              >
                <Award className="w-4 h-4" /> Start 60-MCQ Mock
              </button>
              <button
                onClick={() => navigate('/practice')}
                className="px-5 py-3 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition cursor-pointer"
              >
                Quick 20-Question Practice
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-6 w-full lg:max-w-md space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-bold text-teal-300">Mock Exam Diagnostic</span>
              <span className="text-slate-400">60 Questions &bull; 60 Mins</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Timer Countdown</span>
                <span className="font-mono text-emerald-400 font-bold">58:42 Remaining</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Negative Marking Penalty</span>
                <span className="text-amber-300 font-medium">Configurable (Default: 0)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Autosave Protection</span>
                <span className="text-teal-300 font-medium">Active (Local + Server)</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-300">
              Diagnostic report categorizes topics into <span className="text-emerald-400 font-semibold">Strong (&ge;85%)</span> and <span className="text-rose-400 font-semibold">Needs Revision (&lt;70%)</span>.
            </div>
          </div>
        </div>
      </section>

      {/* 6. Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md">
            Common Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs"
            >
              <h4 className="text-sm font-bold text-slate-900 flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                {faq.q}
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed pl-6.5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* AdSense Bottom Slot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBottom />
      </div>
    </div>
  );
};
