import React, { useEffect, useState } from 'react';
import type { Topic, MCQ } from '../types';
import { api } from '../services/api';
import { TermCard } from '../components/cards/TermCard';
import { MCQCard } from '../components/cards/MCQCard';
import { Badge } from '../components/common/Badge';
import { AdInline } from '../components/ads';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  ArrowLeft,
  BookOpen,
  Sparkles,
  FileCheck2,
  CheckCircle2,
  Bookmark,
  Layers,
  HelpCircle
} from 'lucide-react';

interface TopicDetailPageProps {
  topicId: string;
  navigate: (path: string) => void;
}

export const TopicDetailPage: React.FC<TopicDetailPageProps> = ({ topicId, navigate }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [status, setStatus] = useState<'Not Started' | 'Learning' | 'Completed'>('Not Started');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.getTopicDetail(topicId),
      api.getLearningMCQs({ topic_id: topicId, limit: 30 })
    ])
      .then(([topicRes, mcqRes]) => {
        setTopic(topicRes.topic);
        setStatus(topicRes.topic.status || 'Not Started');
        setMcqs(Array.isArray(mcqRes?.mcqs) ? mcqRes.mcqs : []);
      })
      .catch((err) => console.error('Error fetching topic:', err))
      .finally(() => setLoading(false));
  }, [topicId]);

  const handleStatusChange = async (newStatus: 'Not Started' | 'Learning' | 'Completed') => {
    if (!user) {
      showToast('Please log in to save learning progress.', 'info');
      return;
    }
    setStatus(newStatus);
    try {
      await api.updateTopicProgress(topicId, newStatus);
      showToast(`Topic marked as ${newStatus}!`, 'success');
    } catch {
      showToast('Failed to update progress.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <div className="h-44 rounded-3xl bg-slate-200 animate-pulse" />
        <div className="h-64 rounded-3xl bg-slate-200 animate-pulse" />
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="max-w-md mx-auto my-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Topic Not Found</h2>
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(topic.subject_id ? `/subjects/${topic.subject_id}` : '/subjects')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-900 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Subject
        </button>
      </div>

      {/* Main Topic Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge type="syllabus" text="Official Syllabus Topic" />
            <span className="text-xs font-semibold text-slate-500">
              {topic.chapter_title} &bull; Topic {topic.topic_number}
            </span>
          </div>

          {/* Progress Status Buttons */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {(['Not Started', 'Learning', 'Completed'] as const).map((st) => (
              <button
                key={st}
                onClick={() => handleStatusChange(st)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  status === st
                    ? st === 'Completed'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : st === 'Learning'
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-white text-slate-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
          {topic.title}
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed">
          {topic.description}
        </p>

        {/* Source Reference Badge */}
        <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-blue-700" />
            Primary Source: <strong className="text-slate-700">{topic.source_reference}</strong>
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            {topic.mcq_count || 5} Questions Banked
          </span>
        </div>

        {/* Quick Launch Buttons */}
        <div className="pt-4 flex flex-wrap gap-2.5">
          <button
            onClick={() => navigate(`/learn?topic_id=${topic.id}&subject_id=${topic.subject_id}`)}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 transition flex items-center gap-1.5 shadow-sm shadow-blue-950/20 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-teal-300" /> Start Learning MCQs
          </button>
          <button
            onClick={() => navigate(`/practice?topic_id=${topic.id}&subject_id=${topic.subject_id}`)}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition flex items-center gap-1.5 cursor-pointer"
          >
            <FileCheck2 className="w-4 h-4 text-teal-600" /> Topic Practice Test
          </button>
        </div>
      </div>

      {/* Subtopics Breakdown */}
      {topic.subtopics && topic.subtopics.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Topic Breakdown & Subtopics
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topic.subtopics.map((st, idx) => (
              <div
                key={st.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs flex items-start gap-2.5"
              >
                <div className="w-5 h-5 rounded-md bg-teal-100 text-teal-900 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  {idx + 1}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{st.title}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{st.notes}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AdSense Placement */}
      <AdInline />

      {/* Bilingual Terms for this topic */}
      {topic.terms && topic.terms.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-900" />
              Bilingual Terminology for this Topic
            </h3>
            <span className="text-xs text-slate-400 font-medium">
              English Definition + Simple Urdu Meaning
            </span>
          </div>

          <div className="space-y-4">
            {topic.terms.map((term) => (
              <TermCard key={term.id} term={term} />
            ))}
          </div>
        </div>
      )}

      {/* Related Learning MCQs with Answers & Urdu Explanations */}
      <div className="space-y-4 pt-4 border-t border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              Topic MCQs &amp; Conceptual Answers ({mcqs.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Official 5-option exam questions with verified correct answers and simple Urdu explanations.
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 self-start sm:self-auto">
            Answers Visible &bull; Learning
          </span>
        </div>

        {mcqs.length === 0 ? (
          <div className="p-8 bg-white rounded-3xl border border-slate-200 text-center text-xs text-slate-400">
            No questions linked directly to this topic yet.
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
    </div>
  );
};
