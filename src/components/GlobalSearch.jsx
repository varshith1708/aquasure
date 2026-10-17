import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  X, 
  MapPin, 
  AlertTriangle, 
  Sparkles, 
  BookOpen, 
  Activity, 
  ExternalLink 
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { purificationMethods } from '../data/mockPurification';
import { mockArticles } from '../data/mockBlog';

export default function GlobalSearch() {
  const { isSearchOpen, setIsSearchOpen, sources, reports } = useData();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Search Results
  const matchingSources = sources.filter(s =>
    s.name.toLowerCase().includes(trimmed) ||
    s.region.toLowerCase().includes(trimmed) ||
    s.address.toLowerCase().includes(trimmed)
  ).slice(0, 4);

  const matchingReports = reports.filter(r =>
    r.id.toLowerCase().includes(trimmed) ||
    r.location.toLowerCase().includes(trimmed) ||
    r.categoryLabel.toLowerCase().includes(trimmed)
  ).slice(0, 4);

  const matchingMethods = purificationMethods.filter(m =>
    m.name.toLowerCase().includes(trimmed) ||
    m.tagline.toLowerCase().includes(trimmed)
  ).slice(0, 3);

  const matchingArticles = mockArticles.filter(a =>
    a.title.toLowerCase().includes(trimmed) ||
    a.category.toLowerCase().includes(trimmed)
  ).slice(0, 3);

  const handleSelect = (path) => {
    setIsSearchOpen(false);
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-aqua-600 dark:text-aqua-400 shrink-0" />
          <input
            type="text"
            placeholder="Search water points, ticket IDs, purification methods, or health articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm md:text-base text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-4">
          {trimmed === '' ? (
            <div className="py-8 text-center text-slate-400 text-xs space-y-2">
              <p>Type keywords to search across the entire AquaSure ecosystem.</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  Try "North Zone"
                </span>
                <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  Try "Boiling"
                </span>
                <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  Try "AQ-2026-1001"
                </span>
                <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  Try "TDS"
                </span>
              </div>
            </div>
          ) : (
            <>
              {/* Water Sources */}
              {matchingSources.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-aqua-500" />
                    Water Sources ({matchingSources.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchingSources.map(s => (
                      <button
                        key={s.id}
                        onClick={() => handleSelect(`/map?source=${s.id}`)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between transition-colors"
                      >
                        <div>
                          <p className="text-xs font-semibold text-slate-900 dark:text-white">
                            {s.name}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {s.region} • {s.address}
                          </p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          s.status === 'Safe' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                          s.status === 'Caution' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                          'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                        }`}>
                          {s.status}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Reports */}
              {matchingReports.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                    Incident Reports ({matchingReports.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchingReports.map(r => (
                      <button
                        key={r.id}
                        onClick={() => handleSelect(`/report?ticket=${r.id}`)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-bold text-ocean-600 dark:text-aqua-400">
                              {r.id}
                            </span>
                            <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                              {r.categoryLabel}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate max-w-sm">
                            {r.location}
                          </p>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-500">
                          {r.status}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Purification Methods */}
              {matchingMethods.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-ocean-500" />
                    Purification Methods ({matchingMethods.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchingMethods.map(m => (
                      <button
                        key={m.id}
                        onClick={() => handleSelect(`/purification#${m.id}`)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between transition-colors"
                      >
                        <div>
                          <p className="text-xs font-semibold text-slate-900 dark:text-white">
                            {m.name}
                          </p>
                          <p className="text-[11px] text-slate-400 line-clamp-1">
                            {m.tagline}
                          </p>
                        </div>
                        <span className="text-[10px] font-medium text-aqua-600 dark:text-aqua-400">
                          {m.costLevel}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles */}
              {matchingArticles.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                    Articles & Guides ({matchingArticles.length})
                  </h4>
                  <div className="space-y-1.5">
                    {matchingArticles.map(a => (
                      <button
                        key={a.id}
                        onClick={() => handleSelect(`/resources`)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between transition-colors"
                      >
                        <div>
                          <p className="text-xs font-semibold text-slate-900 dark:text-white">
                            {a.title}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {a.category} • {a.readTime}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {matchingSources.length === 0 && matchingReports.length === 0 && matchingMethods.length === 0 && matchingArticles.length === 0 && (
                <div className="py-8 text-center text-slate-400 text-xs">
                  No matching results for "{query}". Try checking your spelling or searching broader terms.
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Tip: Press ESC to exit search</span>
          <span>AquaSure Real-Time Data</span>
        </div>
      </div>
    </div>
  );
}
