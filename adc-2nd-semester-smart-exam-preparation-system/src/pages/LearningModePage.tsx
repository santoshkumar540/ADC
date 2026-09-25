import React, { useEffect, useState } from 'react';
import type { MCQ, Subject } from '../types';
import { api } from '../services/api';
import { MCQCard } from '../components/cards/MCQCard';
import { AdInline } from '../components/ads';
import { useToast } from '../context/ToastContext';
import {
  Sparkles,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  CheckCircle2,
  BookOpen,
  List,
  Layers,
  HelpCircle
} from 'lucide-react';

interface LearningModePageProps {
  navigate: (path: string) => void;
  topicId?: string;
  subjectId?: string;
}

export const LearningModePage: React.FC<LearningModePageProps> = ({ navigate, topicId, subjectId }) => {
  const { showToast } = useToast();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>(subjectId || '');
  const [selectedTopic, setSelectedTopic] = useState<string>(topicId || '');
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [loading, setLoading] = useState(true);

  // Fetch all 6 subjects for filter dropdown
  useEffect(() => {
    api.getSubjects().then((res) => {
      const list = Array.isArray(res?.subjects) ? res.subjects : [];
      setSubjects(list);
      if (!selectedSubject && list.length > 0 && !subjectId && !topicId) {
        setSelectedSubject(list[0].id);
      }
    });
  }, [subjectId, topicId]);

  // If topicId is provided, resolve its parent subject
  useEffect(() => {
    if (topicId) {
      setSelectedTopic(topicId);
      api.getTopicDetail(topicId)
        .then((res) => {
          if (res?.topic?.subject_id) {
            setSelectedSubject(res.topic.subject_id);
          }
        })
        .catch((err) => {
          console.warn('Could not resolve topic subject:', err);
        });
    }
  }, [topicId]);

  useEffect(() => {
    setLoading(true);
    api.getLearningMCQs({
      topic_id: selectedTopic || undefined,
      subject_id: selectedTopic ? undefined : (selectedSubject || undefined),
      limit: 500
    })
      .then((res) => {
        setMcqs(Array.isArray(res?.mcqs) ? res.mcqs : []);
        setCurrentIndex(0);
      })
      .catch((err) => {
        console.error('Error fetching learning MCQs:', err);
        setMcqs([]);
      })
      .finally(() => setLoading(false));
  }, [selectedSubject, selectedTopic]);

  const safeMcqs = Array.isArray(mcqs) ? mcqs : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/subjects')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-900 transition mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Subjects
          </button>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-blue-700" />
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Bilingual Learning Mode
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Questions, 5 options, correct answers, and simple Urdu explanations are visible for conceptual study.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('card')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'card'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Step-by-Step
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'list'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List className="w-3.5 h-3.5" /> All Questions ({safeMcqs.length})
          </button>
        </div>
      </div>

      {/* Subject Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-600">Select Subject:</span>
          <select
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value);
              setSelectedTopic('');
            }}
            className="font-bold bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900"
          >
            <option value="">All 6 Subjects</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.code})
              </option>
            ))}
          </select>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <strong className="text-blue-900">{safeMcqs.length}</strong> official syllabus questions
        </div>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="space-y-4">
          <div className="h-20 rounded-2xl bg-slate-200 animate-pulse" />
          <div className="h-80 rounded-3xl bg-slate-200 animate-pulse" />
        </div>
      ) : safeMcqs.length === 0 ? (
        <div className="max-w-md mx-auto my-16 text-center space-y-4 bg-white p-8 rounded-3xl border border-slate-200">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-900 mx-auto flex items-center justify-center font-bold">
            <HelpCircle className="w-6 h-6 text-blue-700" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">No Learning Questions Found</h2>
          <p className="text-xs text-slate-500">
            Select another subject from the dropdown above or explore the full syllabus.
          </p>
          <button
            onClick={() => setSelectedSubject('')}
            className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold"
          >
            Show All Subjects
          </button>
        </div>
      ) : viewMode === 'card' ? (
        <div className="space-y-6">
          {/* Progress pill & counter */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>
              Question {currentIndex + 1} of {safeMcqs.length}
            </span>
            <span>
              {Math.round(((currentIndex + 1) / safeMcqs.length) * 100)}% through lesson
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-blue-900 h-1.5 transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / safeMcqs.length) * 100}%` }}
            />
          </div>

          {/* Current MCQ Card in Learning Mode */}
          <MCQCard
            mcq={safeMcqs[currentIndex]}
            mode="learning"
            showExplanation={true}
          />

          {/* Navigation Controls: Previous / Next / Mark as Learned */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex items-center justify-between gap-3">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 transition flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <button
              onClick={() => {
                showToast('Marked question as learned!', 'success');
                if (currentIndex < safeMcqs.length - 1) {
                  setCurrentIndex((prev) => prev + 1);
                }
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Mark as Learned
            </button>

            <button
              onClick={() => setCurrentIndex((prev) => Math.min(safeMcqs.length - 1, prev + 1))}
              disabled={currentIndex === safeMcqs.length - 1}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 disabled:opacity-40 transition flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* List Mode: Shows all questions & answers sequentially */
        <div className="space-y-6">
          {safeMcqs.map((mcq, idx) => (
            <div key={mcq.id} className="relative">
              <div className="absolute -left-3 -top-3 w-7 h-7 rounded-full bg-blue-900 text-white font-extrabold text-xs flex items-center justify-center shadow-md z-10">
                {idx + 1}
              </div>
              <MCQCard mcq={mcq} mode="learning" showExplanation={true} />
            </div>
          ))}
        </div>
      )}

      {/* AdSense Placement */}
      <AdInline />
    </div>
  );
};

