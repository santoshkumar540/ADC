import React, { useEffect, useState } from 'react';
import type { MCQ, MCQOptionKey, Subject } from '../types';
import { api } from '../services/api';
import { MCQCard } from '../components/cards/MCQCard';
import { AdInline } from '../components/ads';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  BookOpen,
  Filter,
  X,
  FileCheck2
} from 'lucide-react';

interface PracticeModePageProps {
  navigate: (path: string) => void;
  initialSubjectId?: string;
  initialTopicId?: string;
}

export const PracticeModePage: React.FC<PracticeModePageProps> = ({
  navigate,
  initialSubjectId,
  initialTopicId
}) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubjectId || '');
  const [selectedTopicId, setSelectedTopicId] = useState<string | undefined>(initialTopicId);
  const [selectedTopicTitle, setSelectedTopicTitle] = useState<string>('');
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, MCQOptionKey>>({});
  const [loading, setLoading] = useState(false);

  // Fetch all subjects
  useEffect(() => {
    api.getSubjects().then((res) => {
      if (Array.isArray(res?.subjects)) {
        setSubjects(res.subjects);
        if (!selectedSubject && !initialTopicId && res.subjects.length > 0 && res.subjects[0]) {
          setSelectedSubject(res.subjects[0].id);
        }
      }
    });
  }, []);

  // When initialTopicId is provided, resolve subject and title
  useEffect(() => {
    if (initialTopicId) {
      setSelectedTopicId(initialTopicId);
      api.getTopicDetail(initialTopicId)
        .then((res) => {
          if (res?.topic) {
            setSelectedSubject(res.topic.subject_id);
            setSelectedTopicTitle(res.topic.title);
          }
        })
        .catch((err) => {
          console.warn('Could not fetch topic detail:', err);
        });
    }
  }, [initialTopicId]);

  // Fetch MCQs
  useEffect(() => {
    if (!selectedTopicId && !selectedSubject) return;

    setLoading(true);
    api.getPracticeMCQs({
      topic_id: selectedTopicId || undefined,
      subject_id: selectedTopicId ? undefined : selectedSubject,
      count: selectedTopicId ? 25 : 30
    })
      .then((res) => {
        const questions = Array.isArray(res?.mcqs) ? res.mcqs : [];
        setMcqs(questions);
        setCurrentIndex(0);
        setUserAnswers({});
        if (!selectedSubject && questions.length > 0 && questions[0]?.subject_id) {
          setSelectedSubject(questions[0].subject_id);
        }
      })
      .catch((err) => {
        console.error('Error fetching practice questions:', err);
        setMcqs([]);
      })
      .finally(() => setLoading(false));
  }, [selectedSubject, selectedTopicId]);

  const safeMcqs = Array.isArray(mcqs) ? mcqs : [];
  const currentMCQ = safeMcqs.length > 0 && currentIndex < safeMcqs.length ? safeMcqs[currentIndex] : null;

  const handleSelectOption = (key: MCQOptionKey) => {
    if (!currentMCQ) return;
    if (userAnswers[currentMCQ.id]) return; // already answered

    setUserAnswers((prev) => ({
      ...prev,
      [currentMCQ.id]: key
    }));
  };

  const handleSubjectChange = (newSubjectId: string) => {
    setSelectedSubject(newSubjectId);
    setSelectedTopicId(undefined);
    setSelectedTopicTitle('');
  };

  const handleClearTopicFilter = () => {
    setSelectedTopicId(undefined);
    setSelectedTopicTitle('');
  };

  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = Object.entries(userAnswers).filter(([mId, ans]) => {
    const q = safeMcqs.find((m) => m.id === mId);
    return q && q.correct_option === ans;
  }).length;
  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
  const currentSubjectObj = subjects.find((s) => s.id === selectedSubject);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => navigate(-1 as any)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-900 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>

        {/* Subject switcher dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Subject:</span>
          <select
            value={selectedSubject}
            onChange={(e) => handleSubjectChange(e.target.value)}
            className="text-xs font-bold bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900"
          >
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active topic filter indicator */}
      {selectedTopicId && (
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-blue-50/80 border border-blue-200/80 rounded-xl text-xs">
          <div className="flex items-center gap-2 text-blue-950 font-medium">
            <Filter className="w-3.5 h-3.5 text-blue-700 shrink-0" />
            <span>
              Practicing Topic: <strong className="font-bold">{selectedTopicTitle || selectedTopicId}</strong>
            </span>
          </div>
          <button
            onClick={handleClearTopicFilter}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-800 hover:text-blue-950 bg-white border border-blue-200 px-2.5 py-1 rounded-lg transition hover:bg-blue-50"
          >
            <X className="w-3 h-3" /> Practice All Questions
          </button>
        </div>
      )}

      {/* Live score scoreboard */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs grid grid-cols-4 gap-2 text-center text-xs">
        <div>
          <div className="text-slate-400 font-medium text-[11px]">Question</div>
          <div className="font-extrabold text-slate-800 text-sm">
            {safeMcqs.length > 0 ? `${currentIndex + 1} / ${safeMcqs.length}` : '0 / 0'}
          </div>
        </div>
        <div>
          <div className="text-slate-400 font-medium text-[11px]">Answered</div>
          <div className="font-extrabold text-slate-800 text-sm">{answeredCount}</div>
        </div>
        <div>
          <div className="text-emerald-600 font-medium text-[11px]">Correct</div>
          <div className="font-extrabold text-emerald-700 text-sm">{correctCount}</div>
        </div>
        <div>
          <div className="text-blue-900 font-medium text-[11px]">Accuracy</div>
          <div className="font-extrabold text-blue-900 text-sm">{accuracy}%</div>
        </div>
      </div>

      {/* Loading state or MCQ card or Empty fallback */}
      {loading ? (
        <div className="h-80 rounded-3xl bg-slate-200 animate-pulse flex items-center justify-center text-slate-400 text-xs font-semibold">
          Loading practice questions...
        </div>
      ) : currentMCQ ? (
        <MCQCard
          key={currentMCQ.id}
          mcq={currentMCQ}
          mode="practice"
          selectedOption={userAnswers[currentMCQ.id] || null}
          onSelectOption={handleSelectOption}
        />
      ) : (
        <div className="bg-white p-8 rounded-2xl text-center border border-slate-200/80 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-900 mx-auto flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No questions found for this topic filter</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              You can practice all questions available for {currentSubjectObj?.name || 'this subject'} or pick another subject from the dropdown above.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {selectedTopicId && (
              <button
                onClick={handleClearTopicFilter}
                className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition"
              >
                Practice All {currentSubjectObj?.name || 'Subject'} MCQs
              </button>
            )}
            <button
              onClick={() => navigate('/subjects')}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition"
            >
              Browse All Subjects
            </button>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      {safeMcqs.length > 0 && (
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
              setUserAnswers({});
              setCurrentIndex(0);
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Restart Practice
          </button>

          <button
            onClick={() => setCurrentIndex((prev) => Math.min(safeMcqs.length - 1, prev + 1))}
            disabled={currentIndex === safeMcqs.length - 1}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 disabled:opacity-40 transition flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* AdSense Placement */}
      <AdInline />
    </div>
  );
};
