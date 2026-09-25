import React, { useState } from 'react';
import type { Term } from '../../types';
import { Bookmark, Copy, Check, Lightbulb, Compass, BookOpen } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

interface TermCardProps {
  term: Term;
  onBookmarkChange?: (termId: string, isBookmarked: boolean) => void;
}

export const TermCard: React.FC<TermCardProps> = ({ term, onBookmarkChange }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [bookmarked, setBookmarked] = useState(Boolean(term.is_bookmarked));
  const [copied, setCopied] = useState(false);

  const handleToggleBookmark = async () => {
    if (!user) {
      showToast('Please log in to bookmark terminology.', 'info');
      return;
    }
    try {
      const res = await api.toggleBookmark('term', term.id);
      setBookmarked(res.bookmarked);
      showToast(res.message, 'success');
      if (onBookmarkChange) {
        onBookmarkChange(term.id, res.bookmarked);
      }
    } catch {
      showToast('Failed to update bookmark.', 'error');
    }
  };

  const handleCopy = () => {
    const textToCopy = `${term.term}\n\nEnglish: ${term.english_meaning}\n\nUrdu: ${term.urdu_meaning}\n\nExplanation: ${term.simple_explanation}\n\nMemory Tip: ${term.memory_tip}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showToast('Terminology copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition p-5 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className="text-[11px] font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
              {term.subject_name || 'Bilingual Concept'}
            </span>
            <h4 className="text-xl font-bold text-slate-900 mt-1">{term.term}</h4>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              title="Copy Terminology"
              aria-label="Copy Terminology"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={handleToggleBookmark}
              className={`p-1.5 rounded-lg transition ${
                bookmarked
                  ? 'text-teal-600 bg-teal-50'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              }`}
              title={bookmarked ? 'Remove Bookmark' : 'Save to Bookmarks'}
              aria-label={bookmarked ? 'Remove Bookmark' : 'Save to Bookmarks'}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-teal-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* English Meaning */}
        <div className="mb-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            English Definition
          </p>
          <p className="text-sm text-slate-800 font-medium leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            {term.english_meaning}
          </p>
        </div>

        {/* Urdu Meaning */}
        <div className="mb-3.5">
          <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">
            Urdu Explanation (اردو مفہوم)
          </p>
          <p className="text-sm text-slate-900 font-urdu leading-relaxed bg-teal-50/50 p-2.5 rounded-xl border border-teal-100/70">
            {term.urdu_meaning}
          </p>
        </div>

        {/* Simple Explanation & Example */}
        {term.simple_explanation && (
          <div className="mb-3 text-xs text-slate-600 space-y-1.5">
            <p>
              <span className="font-semibold text-slate-700">Concept:</span> {term.simple_explanation}
            </p>
            {term.example && (
              <p className="text-slate-500 italic bg-amber-50/50 p-2 rounded-lg border border-amber-100/60">
                <span className="font-semibold text-amber-800 not-italic">Example:</span> {term.example}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Memory Tip & Reference */}
      <div className="pt-3 border-t border-slate-100 mt-2">
        {term.memory_tip && (
          <div className="flex items-start gap-2 text-xs bg-indigo-50/70 text-indigo-950 p-2.5 rounded-xl border border-indigo-100 mb-2.5">
            <Lightbulb className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Memory Tip:</span> {term.memory_tip}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="inline-flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {term.source_reference}
          </span>
          <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">
            Syllabus Reference
          </span>
        </div>
      </div>
    </div>
  );
};
