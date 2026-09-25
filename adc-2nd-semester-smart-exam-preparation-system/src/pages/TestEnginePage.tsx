import React, { useEffect, useState, useRef } from 'react';
import type { Test, MCQOptionKey, AttemptResult } from '../types';
import { api } from '../services/api';
import { TestHeader } from '../components/test/TestHeader';
import { QuestionNavigator } from '../components/test/QuestionNavigator';
import { MCQOptionButton } from '../components/cards/MCQOption';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  RotateCcw,
  AlertTriangle,
  Send,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

interface TestEnginePageProps {
  testId: string;
  navigate: (path: string, state?: any) => void;
}

export const TestEnginePage: React.FC<TestEnginePageProps> = ({ testId, navigate }) => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [test, setTest] = useState<Test | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, MCQOptionKey | null>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());

  const autosaveKey = `adc_test_autosave_${testId}`;

  useEffect(() => {
    setLoading(true);
    api.getTest(testId)
      .then((res) => {
        setTest(res.test);
        setQuestions(res.questions);
        setStartTime(Date.now());

        // Restore any saved answers from localStorage
        try {
          const cached = localStorage.getItem(autosaveKey);
          if (cached) {
            const parsed = JSON.parse(cached);
            setAnswers(parsed.answers || {});
            if (Array.isArray(parsed.marked)) {
              setMarkedForReview(new Set(parsed.marked));
            }
            showToast('Restored your previous unsaved test session.', 'info');
          } else {
            // Initialize empty answers map
            const initial: Record<string, null> = {};
            res.questions.forEach((q: any) => {
              initial[q.id] = null;
            });
            setAnswers(initial);
          }
        } catch {
          // ignore cache parsing error
        }
      })
      .catch((err) => {
        console.error('Error loading test:', err);
        showToast('Unable to load this test. Please try again.', 'error');
      })
      .finally(() => setLoading(false));
  }, [testId]);

  // Autosave to localStorage whenever answers or marked questions change
  useEffect(() => {
    if (questions.length === 0) return;
    try {
      localStorage.setItem(
        autosaveKey,
        JSON.stringify({
          answers,
          marked: Array.from(markedForReview)
        })
      );
    } catch {
      // ignore
    }
  }, [answers, markedForReview, autosaveKey, questions.length]);

  const handleSelectOption = (key: MCQOptionKey) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: key
    }));
  };

  const handleToggleMarkForReview = () => {
    if (!currentQuestion) return;
    setMarkedForReview((prev) => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) {
        next.delete(currentQuestion.id);
      } else {
        next.add(currentQuestion.id);
      }
      return next;
    });
  };

  const handleClearAnswer = () => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: null
    }));
  };

  const handleSubmitTest = async () => {
    if (submitting) return;
    if (!user) {
      showToast('Please log in to submit your test and record progress.', 'error');
      navigate('/login');
      return;
    }

    setSubmitting(true);
    const elapsedSeconds = Math.max(1, Math.round((Date.now() - startTime) / 1000));

    try {
      const result = await api.submitTest(testId, {
        answers,
        time_spent_seconds: elapsedSeconds
      });

      // Clear local backup
      localStorage.removeItem(autosaveKey);

      showToast('Test submitted successfully!', 'success');
      navigate(`/results/${result.attempt_id}`, { result });
    } catch (err: any) {
      console.error('Submission error:', err);
      showToast(err.message || 'Your answer could not be saved. Please check your connection.', 'error');
      setSubmitting(false);
      setShowConfirmModal(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-6">
        <div className="h-14 rounded-2xl bg-slate-200 animate-pulse" />
        <div className="h-96 rounded-3xl bg-slate-200 animate-pulse" />
      </div>
    );
  }

  if (!test || questions.length === 0) {
    return (
      <div className="max-w-md mx-auto my-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Test Unavailable</h2>
        <p className="text-xs text-slate-500">
          This test is currently not available or has no active questions.
        </p>
        <button
          onClick={() => navigate('/subjects')}
          className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold"
        >
          Back to Subjects
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentQuestion.id] || null;
  const isMarked = markedForReview.has(currentQuestion.id);

  const answeredCount = Object.values(answers).filter((v) => v !== null).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Test Header with countdown & submit trigger */}
      <TestHeader
        title={test.title}
        subjectName={test.subject_name}
        totalQuestions={questions.length}
        durationMinutes={test.duration_minutes}
        negativeMarking={test.negative_marking}
        penaltyPerWrong={test.penalty_per_wrong}
        onTimeUp={handleSubmitTest}
        onSubmitClick={() => setShowConfirmModal(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Main Question Display (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
              {/* Question metadata */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  {currentQuestion.topic_title && (
                    <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-medium">
                      {currentQuestion.topic_title}
                    </span>
                  )}
                  <span className="text-[11px] font-semibold text-slate-400">
                    {currentQuestion.question_type}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleToggleMarkForReview}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    isMarked
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Flag className={`w-3.5 h-3.5 ${isMarked ? 'fill-amber-600 text-amber-600' : ''}`} />
                  {isMarked ? 'Marked for Review' : 'Mark for Review'}
                </button>
              </div>

              {/* Question Text */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {currentQuestion.question_text}
              </h3>

              {/* 5 Options: A, B, C, D, E */}
              <div className="space-y-3 pt-2">
                {currentQuestion.options.map((opt: any) => (
                  <MCQOptionButton
                    key={opt.option_key}
                    optionKey={opt.option_key}
                    text={opt.option_text}
                    isSelected={currentAnswer === opt.option_key}
                    showStatus={false} // Hidden during examination!
                    onSelect={handleSelectOption}
                  />
                ))}
              </div>

              {/* Bottom Actions: Clear Answer & Skip */}
              <div className="pt-2 flex items-center justify-between text-xs">
                {currentAnswer && (
                  <button
                    type="button"
                    onClick={handleClearAnswer}
                    className="text-slate-500 hover:text-rose-600 transition font-medium"
                  >
                    Clear Selected Option
                  </button>
                )}
                <span className="text-slate-400 ml-auto">
                  Options A, B, C, D, E &bull; Single Choice
                </span>
              </div>
            </div>

            {/* Bottom Nav Buttons */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 transition flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <button
                type="button"
                onClick={() => {
                  if (currentIndex < questions.length - 1) {
                    setCurrentIndex((prev) => prev + 1);
                  } else {
                    setShowConfirmModal(true);
                  }
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 transition flex items-center gap-1.5 cursor-pointer"
              >
                {currentIndex < questions.length - 1 ? (
                  <>
                    Next <ChevronRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Review &amp; Finish <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Sidebar: Question Palette & Progress (1 col) */}
          <div className="lg:col-span-1 space-y-4">
            <QuestionNavigator
              totalQuestions={questions.length}
              currentIndex={currentIndex}
              answers={answers}
              markedForReview={markedForReview}
              questionIds={questions.map((q) => q.id)}
              onSelectQuestion={(idx) => setCurrentIndex(idx)}
            />

            <div className="bg-blue-50/70 rounded-2xl border border-blue-200/70 p-4 text-xs space-y-2 text-blue-950">
              <div className="font-bold flex items-center gap-1.5 text-blue-900">
                <HelpCircle className="w-4 h-4" /> Test Instructions
              </div>
              <ul className="space-y-1 text-slate-600 text-[11px] list-disc list-inside">
                <li>Select one option for each question.</li>
                <li>Mark questions for review to revisit later.</li>
                <li>Answers are auto-saved automatically.</li>
                <li>Test will auto-submit when timer expires.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold mx-auto">
              <Send className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-slate-900">Ready to Submit Your Test?</h3>
              <p className="text-xs text-slate-500">
                Review your response statistics before final evaluation.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-2xl text-center text-xs">
              <div>
                <div className="font-bold text-slate-800 text-sm">{questions.length}</div>
                <div className="text-[11px] text-slate-400">Total</div>
              </div>
              <div className="border-x border-slate-200">
                <div className="font-bold text-teal-700 text-sm">{answeredCount}</div>
                <div className="text-[11px] text-slate-400">Answered</div>
              </div>
              <div>
                <div className="font-bold text-amber-700 text-sm">{unansweredCount}</div>
                <div className="text-[11px] text-slate-400">Unanswered</div>
              </div>
            </div>

            {unansweredCount > 0 && (
              <p className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                Notice: You still have {unansweredCount} unanswered question{unansweredCount > 1 ? 's' : ''}. Unanswered questions will be scored as skipped.
              </p>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                disabled={submitting}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
              >
                Keep Testing
              </button>
              <button
                type="button"
                onClick={handleSubmitTest}
                disabled={submitting}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 transition shadow-sm shadow-blue-950/20"
              >
                {submitting ? 'Submitting...' : 'Yes, Submit Test'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
