import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  Search, 
  Filter, 
  FileText, 
  Calendar, 
  Clock, 
  ArrowRight, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  X,
  Printer
} from 'lucide-react';
import { mockArticles, downloadableGuides, faqList } from '../data/mockBlog';
import { useData } from '../context/DataContext';

export default function ResourcesPage() {
  const { showToast } = useData();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticleModal, setActiveArticleModal] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const categories = ['All', 'Safety', 'Technology', 'Policy', 'Health'];

  const filteredArticles = mockArticles.filter(art => {
    const matchCat = selectedCategory === 'All' || art.category === selectedCategory;
    const matchSearch = searchQuery === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleDownloadPDF = (guide) => {
    showToast(`Downloading "${guide.filename}" (${guide.fileSize})...`, 'success');
  };

  const toggleFaq = (idx) => {
    setOpenFaqIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-100 text-ocean-800 dark:bg-ocean-950 dark:text-aqua-300 text-xs font-bold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Open Knowledge Hub</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          WASH Articles, Safety Blueprints & FAQs
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
          Evidence-based articles on UN SDG 6, groundwater hydrology, rainwater harvesting designs, and community sanitation.
        </p>

        {/* Search & Category Filter */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search articles or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-aqua-500 shadow-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-ocean-800 text-white font-bold shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 1: Articles Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-black text-slate-900 dark:text-white">
          Featured Publications & Field Reports
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => setActiveArticleModal(art)}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-aqua-500/50 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="h-44 rounded-2xl overflow-hidden relative">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white">
                    {art.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span>{art.date}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-ocean-700 dark:group-hover:text-aqua-400 transition-colors line-clamp-2">
                  {art.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-ocean-700 dark:text-aqua-400">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Downloadable Guides & Blueprints */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-ocean-50 to-aqua-50 dark:from-ocean-950/40 dark:to-aqua-950/30 border border-ocean-200/60 dark:border-ocean-900/60 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-ocean-700 dark:text-aqua-400">
            Field Manuals & Blueprints
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            Free Downloadable Toolkits (PDF)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Print-ready technical manuals, school WASH curricula, and emergency water treatment guides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {downloadableGuides.map((guide) => (
            <div
              key={guide.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/50 flex items-center justify-center text-red-500">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-snug">
                  {guide.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {guide.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">{guide.fileSize} • {guide.pages} pages</span>
                <button
                  onClick={() => handleDownloadPDF(guide)}
                  className="flex items-center gap-1 text-xs font-bold text-ocean-700 dark:text-aqua-400 hover:underline"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: Frequently Asked Questions Accordion */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Everything you need to know about water testing, boiling limits, and civic reporting.
          </p>
        </div>

        <div className="space-y-3">
          {faqList.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white"
              >
                <span>{faq.question}</span>
                {openFaqIndex === idx ? (
                  <ChevronUp className="w-4 h-4 text-aqua-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              {openFaqIndex === idx && (
                <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 max-h-[85vh] overflow-y-auto relative">
            <button
              onClick={() => setActiveArticleModal(null)}
              className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-ocean-100 text-ocean-800 dark:bg-ocean-950 dark:text-aqua-300">
                {activeArticleModal.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {activeArticleModal.title}
              </h2>
              <p className="text-xs text-slate-400">
                By {activeArticleModal.author} • Published on {activeArticleModal.date} ({activeArticleModal.readTime})
              </p>

              <img
                src={activeArticleModal.image}
                alt={activeArticleModal.title}
                className="w-full h-56 rounded-2xl object-cover"
              />

              <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-3 whitespace-pre-line">
                {activeArticleModal.content}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
