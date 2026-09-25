import React, { useEffect, useState } from 'react';
import type { Subject, Chapter, Test, Term, MCQ } from '../types';
import { api } from '../services/api';
import { TermCard } from '../components/cards/TermCard';
import { MCQCard } from '../components/cards/MCQCard';
import { AdInline } from '../components/ads';
import {
  BookOpen,
  ArrowLeft,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Layers,
  FileCheck2,
  Bookmark,
  HelpCircle
} from 'lucide-react';

interface SubjectDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
}

export const SubjectDetailPage: React.FC<SubjectDetailPageProps> = ({ slug, navigate }) => {
  const [subject, setSubject] = useState<Subject | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [tests, setTests] = useState<Test[]>([]);
  const [terms, setTerms] = useState<Term[]>([]);
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [activeTab, setActiveTab] = useState<'syllabus' | 'mcqs' | 'terms' | 'tests'>('syllabus');
  const [loading, setLoading] = useState(true);
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api.getSubjectDetail(slug)
      .then((res) => {
        if (res?.subject) setSubject(res.subject);
        const chList = Array.isArray(res?.chapters) ? res.chapters : [];
        setChapters(chList);
        setTests(Array.isArray(res?.tests) ? res.tests : []);
        if (chList.length > 0 && chList[0]?.id) {
          setExpandedChapter(chList[0].id);
        }
        if (res?.subject?.id) {
          return Promise.all([
            api.getTerms({ subject_id: res.subject.id }),
            api.getLearningMCQs({ subject_id: res.subject.id, limit: 150 })
          ]);
        }
        return null;
      })
      .then((data) => {
        if (data) {
          const [termsRes, mcqsRes] = data;
          if (Array.isArray(termsRes?.terms)) setTerms(termsRes.terms);
          if (Array.isArray(mcqsRes?.mcqs)) setMcqs(mcqsRes.mcqs);
        }
      })
      .catch((err) => console.error('Error fetching subject:', err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <div className="h-40 rounded-3xl bg-slate-200 animate-pulse" />
        <div className="h-96 rounded-3xl bg-slate-200 animate-pulse" />
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="max-w-md mx-auto my-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Subject Not Found</h2>
        <p className="text-xs text-slate-500">The requested ADC syllabus subject could not be located.</p>
        <button
          onClick={() => navigate('/subjects')}
          className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold"
        >
          Back to Subjects
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/subjects')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-900 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All Subjects
        </button>
      </div>

      {/* Hero Subject Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-blue-900 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
              {subject.code}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              ADC 2nd Semester &bull; Official Curriculum
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            {subject.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            {subject.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
          <button
            onClick={() => navigate(`/learn?subject_id=${subject.id}`)}
            className="px-4 py-3 rounded-xl text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 transition flex items-center justify-center gap-1.5 shadow-sm shadow-blue-950/20 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-teal-300" /> Start Learning Mode
          </button>
          <button
            onClick={() => navigate(`/practice?subject_id=${subject.id}`)}
            className="px-4 py-3 rounded-xl text-xs font-bold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <FileCheck2 className="w-4 h-4 text-teal-600" /> Practice MCQs
          </button>
          <button
            onClick={() => navigate(`/test/test-mock-${subject.slug}`)}
            className="px-4 py-3 rounded-xl text-xs font-bold text-teal-900 bg-teal-50 border border-teal-200 hover:bg-teal-100 transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Award className="w-4 h-4 text-teal-700" /> 60-MCQ Mock Exam
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-1">
        <button
          onClick={() => setActiveTab('syllabus')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'syllabus'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" /> Syllabus Explorer ({chapters.length} Chapters)
        </button>

        <button
          onClick={() => setActiveTab('mcqs')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'mcqs'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <HelpCircle className="w-4 h-4" /> Questions &amp; Answers ({mcqs.length} MCQs)
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'terms'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Bilingual Terminology ({terms.length} Terms)
        </button>

        <button
          onClick={() => setActiveTab('tests')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'tests'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" /> Tests &amp; Mock Exams ({tests.length})
        </button>
      </div>

      {/* Tab 1: Syllabus Explorer */}
      {activeTab === 'syllabus' && (
        <div className="space-y-4">
          {chapters.map((chapter) => {
            const isExpanded = expandedChapter === chapter.id;
            return (
              <div
                key={chapter.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs"
              >
                <div
                  onClick={() => setExpandedChapter(isExpanded ? null : chapter.id)}
                  className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/70 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-900 font-extrabold text-xs flex items-center justify-center shrink-0">
                      Ch {chapter.chapter_number}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{chapter.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-1">{chapter.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-slate-400 hidden sm:inline">
                      {chapter.topics?.length || 0} Topics
                    </span>
                    {isExpanded ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
                  </div>
                </div>

                {isExpanded && chapter.topics && (
                  <div className="border-t border-slate-100 divide-y divide-slate-100 bg-slate-50/40">
                    {chapter.topics.map((topic) => (
                      <div
                        key={topic.id}
                        className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white transition"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                              Topic {topic.topic_number}
                            </span>
                            <span className="text-xs font-bold text-slate-900">{topic.title}</span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                            {topic.description}
                          </p>
                          {topic.subtopics && topic.subtopics.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {topic.subtopics.map((st: any) => (
                                <span
                                  key={st.id}
                                  className="text-[11px] bg-slate-100/90 text-slate-600 px-2 py-0.5 rounded"
                                >
                                  &bull; {st.title}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => navigate(`/topic/${topic.id}`)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition shadow-2xs cursor-pointer"
                          >
                            Explore Topic
                          </button>
                          <button
                            onClick={() => navigate(`/learn?topic_id=${topic.id}`)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 transition cursor-pointer"
                          >
                            Learn MCQs
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab: Questions & Answers */}
      {activeTab === 'mcqs' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 text-xs text-blue-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold">Subject Question Bank:</span> Official 5-option MCQs with verified correct answers, English concepts, and simple Urdu explanations.
            </div>
            <button
              onClick={() => navigate(`/practice?subject_id=${subject.id}`)}
              className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold shrink-0 self-start sm:self-auto cursor-pointer"
            >
              Test Yourself in Practice Mode
            </button>
          </div>

          {mcqs.length === 0 ? (
            <div className="p-8 bg-white rounded-3xl border border-slate-200 text-center text-xs text-slate-400">
              No questions found for this subject.
            </div>
          ) : (
            <div className="space-y-6">
              {mcqs.map((mcq, idx) => (
                <div key={mcq.id} className="relative">
                  <div className="absolute -left-3 -top-3 w-7 h-7 rounded-full bg-blue-900 text-white font-extrabold text-xs flex items-center justify-center shadow-md z-10">
                    {idx + 1}
                  </div>
                  <MCQCard mcq={mcq} mode="learning" showExplanation={true} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Bilingual Terms */}
      {activeTab === 'terms' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 text-xs text-teal-950 flex items-center justify-between">
            <span>
              <span className="font-bold">Bilingual Examination Vocabulary:</span> All terminology aligns with ADC syllabus standards. Click any term to read full explanations in English and simple Urdu.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {terms.map((term) => (
              <TermCard key={term.id} term={term} />
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Tests & Mocks */}
      {activeTab === 'tests' && (
        <div className="space-y-4">
          {tests.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md">
                    {test.test_type}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{test.title}</h3>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                  <span>{test.question_count} Questions (5 Options each)</span>
                  <span>&bull;</span>
                  <span>{test.duration_minutes} Minutes Duration</span>
                  <span>&bull;</span>
                  <span>{test.negative_marking ? `Negative Marking (-${test.penalty_per_wrong})` : 'No Negative Penalty'}</span>
                </div>
              </div>

              <button
                onClick={() => navigate(`/test/${test.id}`)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 transition shadow-sm shadow-blue-950/20 cursor-pointer shrink-0"
              >
                Start Test Now
              </button>
            </div>
          ))}
        </div>
      )}

      {/* AdSense Inline */}
      <AdInline />
    </div>
  );
};
