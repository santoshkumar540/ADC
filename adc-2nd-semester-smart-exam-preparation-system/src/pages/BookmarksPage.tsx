import React, { useEffect, useState } from 'react';
import type { MCQ, Term, Topic } from '../types';
import { api } from '../services/api';
import { MCQCard } from '../components/cards/MCQCard';
import { TermCard } from '../components/cards/TermCard';
import { AdInline } from '../components/ads';
import { useAuth } from '../context/AuthContext';
import {
  Bookmark,
  ArrowLeft,
  BookOpen,
  HelpCircle,
  Layers,
  Sparkles
} from 'lucide-react';

interface BookmarksPageProps {
  navigate: (path: string) => void;
}

export const BookmarksPage: React.FC<BookmarksPageProps> = ({ navigate }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'mcqs' | 'terms' | 'topics'>('mcqs');
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [terms, setTerms] = useState<Term[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setLoading(true);
    api.getBookmarks()
      .then((res) => {
        setMcqs(res.mcqs);
        setTerms(res.terms);
        setTopics(res.topics);
      })
      .catch((err) => console.error('Error fetching bookmarks:', err))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <div className="h-28 rounded-3xl bg-slate-200 animate-pulse" />
        <div className="h-64 rounded-3xl bg-slate-200 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-900 transition mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <Bookmark className="w-4 h-4 fill-teal-600" />
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Saved Bookmarks
          </h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Review your bookmarked MCQs, bilingual terminology, and high-priority syllabus topics.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        <button
          onClick={() => setActiveTab('mcqs')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'mcqs'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <HelpCircle className="w-4 h-4" /> Bookmarked MCQs ({mcqs.length})
        </button>
        <button
          onClick={() => setActiveTab('terms')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'terms'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Bilingual Terms ({terms.length})
        </button>
        <button
          onClick={() => setActiveTab('topics')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'topics'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" /> Topics ({topics.length})
        </button>
      </div>

      {/* MCQs Tab */}
      {activeTab === 'mcqs' && (
        <div className="space-y-4">
          {mcqs.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
              No bookmarked questions yet. Click the bookmark icon on any question during learning or practice.
            </div>
          ) : (
            mcqs.map((m) => (
              <MCQCard key={m.id} mcq={m} mode="learning" showExplanation={true} />
            ))
          )}
        </div>
      )}

      {/* Terms Tab */}
      {activeTab === 'terms' && (
        <div className="space-y-4">
          {terms.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
              No bookmarked terminology yet.
            </div>
          ) : (
            terms.map((t) => <TermCard key={t.id} term={t} />)
          )}
        </div>
      )}

      {/* Topics Tab */}
      {activeTab === 'topics' && (
        <div className="space-y-3">
          {topics.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
              No bookmarked topics yet.
            </div>
          ) : (
            topics.map((tp) => (
              <div
                key={tp.id}
                className="bg-white rounded-2xl border p-4 flex items-center justify-between shadow-xs"
              >
                <div>
                  <span className="text-[10px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                    {tp.subject_name}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{tp.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{tp.description}</p>
                </div>
                <button
                  onClick={() => navigate(`/topic/${tp.id}`)}
                  className="px-3 py-1.5 bg-blue-900 text-white rounded-lg text-xs font-bold"
                >
                  Explore
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* AdSense Placement */}
      <AdInline />
    </div>
  );
};
