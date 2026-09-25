import React, { useEffect, useState } from 'react';
import type { AttemptResult } from '../types';
import { api } from '../services/api';
import { ResultCard } from '../components/cards/ResultCard';
import { AdInline } from '../components/ads';
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Filter
} from 'lucide-react';

interface ResultPageProps {
  attemptId: string;
  resultData?: AttemptResult | null;
  navigate: (path: string) => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({ attemptId, resultData, navigate }) => {
  const [result, setResult] = useState<AttemptResult | null>(resultData || null);
  const [loading, setLoading] = useState(!resultData);
  const [filterMode, setFilterMode] = useState<'all' | 'mistakes' | 'correct'>('all');
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (resultData) {
      setResult(resultData);
      setLoading(false);
      return;
    }

    setLoading(true);
    api.getAttempt(attemptId)
      .then((res) => {
        const att = res.attempt;
        // Transform attempt into AttemptResult structure
        const feedback = res.answers.map((a: any) => ({
          mcq_id: a.mcq_id,
          question_text: a.question_text,
          student_answer: a.selected_option,
          correct_answer: a.correct_answer,
          is_correct: Boolean(a.is_correct),
          english_explanation: a.english_explanation,
          urdu_explanation: a.urdu_explanation,
          memory_tip: a.memory_tip,
          options: a.options,
          topic_title: a.topic_title
        }));

        setResult({
          attempt_id: att.id,
          test_id: att.test_id,
          test_title: att.test_title || 'Assessment Result',
          subject_name: att.subject_name || 'ADC 2nd Semester',
          total_questions: att.total_questions,
          correct_count: att.correct_count,
          wrong_count: att.wrong_count,
          skipped_count: att.skipped_count,
          score: att.score,
          max_score: att.total_questions,
          accuracy: att.accuracy,
          time_spent_seconds: att.time_spent_seconds,
          strong_topics: [],
          weak_topics: [],
          questions_feedback: feedback
        });
      })
      .catch((err) => console.error('Error fetching attempt:', err))
      .finally(() => setLoading(false));
  }, [attemptId, resultData]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-6">
        <div className="h-64 rounded-3xl bg-slate-200 animate-pulse" />
        <div className="h-96 rounded-3xl bg-slate-200 animate-pulse" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="max-w-md mx-auto my-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Result Not Found</h2>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const toggleExpand = (id: string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredQuestions = result.questions_feedback.filter((q) => {
    if (filterMode === 'mistakes') return !q.is_correct;
    if (filterMode === 'correct') return q.is_correct;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Top action */}
      <div>
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-900 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      {/* Main Result Card */}
      <ResultCard
        result={result}
        onReviewMistakes={() => setFilterMode('mistakes')}
        onStartRevision={() => navigate('/revision')}
        onRetakeTest={() => navigate(result.test_id ? `/test/${result.test_id}` : '/practice')}
        navigate={navigate}
      />

      {/* Question Feedback Section Header & Filters */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Comprehensive Question-by-Question Review
          </h3>
          <p className="text-xs text-slate-500">
            Analyze your answer choices alongside official syllabus explanations and Urdu notes.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1 rounded-lg transition ${
              filterMode === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({result.questions_feedback.length})
          </button>
          <button
            onClick={() => setFilterMode('mistakes')}
            className={`px-3 py-1 rounded-lg transition ${
              filterMode === 'mistakes' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mistakes ({result.wrong_count})
          </button>
          <button
            onClick={() => setFilterMode('correct')}
            className={`px-3 py-1 rounded-lg transition ${
              filterMode === 'correct' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Correct ({result.correct_count})
          </button>
        </div>
      </div>

      {/* Question List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => {
          const isExpanded = expandedQuestions[q.mcq_id] ?? true; // expanded by default
          return (
            <div
              key={q.mcq_id}
              className={`bg-white rounded-2xl border transition-all p-5 shadow-xs ${
                q.is_correct ? 'border-emerald-200/80' : 'border-rose-200/80'
              }`}
            >
              {/* Question header */}
              <div
                onClick={() => toggleExpand(q.mcq_id)}
                className="flex items-start justify-between gap-3 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                      q.is_correct
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {q.topic_title}
                      </span>
                      {q.is_correct ? (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Correct (+1)
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> Incorrect
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {q.question_text}
                    </h4>
                  </div>
                </div>

                <button
                  type="button"
                  className="p-1 text-slate-400 hover:text-slate-600 transition"
                  aria-label="Toggle Question Details"
                >
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {/* Options & Explanations (collapsible) */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
                  {/* Options */}
                  <div className="space-y-2">
                    {q.options.map((opt) => {
                      const isCorrectOpt = opt.option_key === q.correct_answer;
                      const isStudentOpt = opt.option_key === q.student_answer;

                      let optStyle = 'bg-slate-50 border-slate-200 text-slate-700';
                      if (isCorrectOpt) {
                        optStyle = 'bg-emerald-50/80 border-emerald-400 font-semibold text-emerald-950 ring-1 ring-emerald-400';
                      } else if (isStudentOpt && !q.is_correct) {
                        optStyle = 'bg-rose-50/80 border-rose-300 font-medium text-rose-950 line-through';
                      }

                      return (
                        <div
                          key={opt.option_key}
                          className={`p-3 rounded-xl border text-xs flex items-start gap-3 ${optStyle}`}
                        >
                          <span className="font-bold w-4 text-center shrink-0">
                            {opt.option_key}
                          </span>
                          <span className="flex-1">{opt.option_text}</span>
                          {isCorrectOpt && (
                            <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded">
                              Correct Answer
                            </span>
                          )}
                          {isStudentOpt && !isCorrectOpt && (
                            <span className="text-[10px] font-bold bg-rose-600 text-white px-2 py-0.5 rounded">
                              Your Choice
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanations */}
                  <div className="space-y-2 pt-1 text-xs">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                        English Conceptual Explanation
                      </div>
                      <p className="text-slate-800 font-medium leading-relaxed">
                        {q.english_explanation}
                      </p>
                    </div>

                    <div className="bg-teal-50/60 p-3 rounded-xl border border-teal-100">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-teal-800 mb-0.5">
                        Simple Urdu Meaning & Explanation (اردو وضاحت)
                      </div>
                      <p className="text-slate-900 font-urdu leading-relaxed text-sm">
                        {q.urdu_explanation}
                      </p>
                    </div>

                    {q.memory_tip && (
                      <div className="flex items-start gap-2 bg-amber-50 p-2.5 rounded-xl border border-amber-200/70 text-amber-950">
                        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-amber-900">Exam Memory Tip:</span> {q.memory_tip}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* AdSense Placement */}
      <AdInline />
    </div>
  );
};
