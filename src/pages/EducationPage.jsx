import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Droplets, 
  Sparkles, 
  Languages, 
  Play, 
  Pause, 
  RotateCcw, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Heart, 
  Info,
  Award,
  Clock,
  ArrowRight
} from 'lucide-react';
import { 
  educationTranslations, 
  handwashingSteps, 
  waterborneDiseases, 
  sanitationBestPractices, 
  menstrualHygieneGuide, 
  hygieneQuizQuestions 
} from '../data/mockEducation';

export default function EducationPage() {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('handwashing');

  // 20-Second Handwashing Practice Timer
  const [timeLeft, setTimeLeft] = useState(20);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const handleStartTimer = () => {
    setTimeLeft(20);
    setIsTimerRunning(true);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(20);
  };

  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleSelectQuiz = (qId, optionIdx) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const calculateScore = () => {
    let score = 0;
    hygieneQuizQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  const t = educationTranslations[lang] || educationTranslations.en;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header & Multi-Language Switcher */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              <BookOpen className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t.heroTitle}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            {t.heroSubtitle}
          </p>
        </div>

        {/* Multi-language Selector */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
          <Languages className="w-4 h-4 text-aqua-600 dark:text-aqua-400 ml-2" />
          <div className="flex items-center gap-1 text-xs font-semibold">
            {[
              { code: 'en', label: 'English' },
              { code: 'hi', label: 'हिंदी' },
              { code: 'gu', label: 'ગુજરાતી' },
              { code: 'te', label: 'తెలుగు' }
            ].map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  lang === l.code
                    ? 'bg-ocean-800 text-white font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
        {[
          { id: 'handwashing', label: t.tabs.handwashing },
          { id: 'diseases', label: t.tabs.diseases },
          { id: 'sanitation', label: t.tabs.sanitation },
          { id: 'menstrual', label: t.tabs.menstrual },
          { id: 'quiz', label: t.tabs.quiz }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: WHO Handwashing Guide with 20s Timer */}
      {activeTab === 'handwashing' && (
        <div className="space-y-8">
          
          {/* 20-Second Practice Timer Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-ocean-900 to-aqua-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] font-bold uppercase tracking-widest text-aqua-300">
                Interactive Practice Module
              </span>
              <h3 className="text-xl sm:text-2xl font-black">
                The WHO 20-Second Scrub Rule
              </h3>
              <p className="text-xs text-aqua-100 max-w-md">
                Soap requires 20 full seconds of friction to rupture viral lipid membranes and break bacterial surface tension.
              </p>
            </div>

            {/* Timer Display */}
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 rounded-full border-4 border-aqua-400/30 flex items-center justify-center bg-white/5 backdrop-blur-sm shadow-inner">
                <span className="text-3xl font-black text-white font-mono">
                  {timeLeft}s
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {!isTimerRunning && timeLeft > 0 && (
                  <button
                    onClick={handleStartTimer}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-aqua-500 hover:bg-aqua-400 text-slate-950 font-black text-xs shadow-md transition-all"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{t.timerStart}</span>
                  </button>
                )}

                {isTimerRunning && (
                  <button
                    onClick={() => setIsTimerRunning(false)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-all"
                  >
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Pause</span>
                  </button>
                )}

                {timeLeft === 0 && (
                  <div className="text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.timerDone}</span>
                  </div>
                )}

                <button
                  onClick={handleResetTimer}
                  className="px-4 py-1.5 rounded-xl border border-white/20 text-white/80 hover:text-white text-xs font-semibold flex items-center justify-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.resetTimer}</span>
                </button>
              </div>
            </div>
          </div>

          {/* 6 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {handwashingSteps.map((s) => (
              <div
                key={s.step}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center font-black text-xs">
                    0{s.step}
                  </span>
                  <Droplets className="w-5 h-5 text-aqua-500" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 2: Waterborne Disease Prevention */}
      {activeTab === 'diseases' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 text-xs text-red-900 dark:text-red-200 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
            <span>
              Waterborne infections are the leading cause of preventable childhood mortality. Always use boiled or chlorine-treated water.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {waterborneDiseases.map((d) => (
              <div
                key={d.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                      {d.name}
                    </h3>
                    <p className="text-xs text-slate-400">Pathogen: {d.cause}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    d.severity === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' :
                    'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300'
                  }`}>
                    {d.severity} Alert
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Key Clinical Symptoms:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {d.symptoms.map((sym, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px]">
                          {sym}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">
                      Transmission Pathway:
                    </span>
                    <p className="text-slate-600 dark:text-slate-400">{d.transmission}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 block text-[11px] mb-1">
                      Emergency Clinical Protocol:
                    </span>
                    <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-[11px]">
                      {d.emergencyProtocol}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Sanitation & Waste Management */}
      {activeTab === 'sanitation' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sanitationBestPractices.map((prac, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-ocean-100 text-ocean-800 dark:bg-ocean-950 dark:text-aqua-300 font-bold text-xs flex items-center justify-center">
                    #{idx + 1}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {prac.title}
                  </h3>
                </div>
                <div className="p-3 rounded-xl bg-ocean-50/60 dark:bg-ocean-950/30 text-xs font-semibold text-ocean-900 dark:text-aqua-300">
                  {prac.rule}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {prac.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Menstrual Hygiene */}
      {activeTab === 'menstrual' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 text-xs space-y-2">
            <h3 className="text-base font-bold text-rose-900 dark:text-rose-200">
              Dignity, Health & Gender Equity in WASH
            </h3>
            <p className="text-rose-800 dark:text-rose-300 leading-relaxed">
              Managing menstruation safely requires accessible running water, private gender-segregated toilets, soap, and clean disposal facilities in all homes, schools, and workplaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menstrualHygieneGuide.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
              >
                <div className="flex items-center gap-2 text-rose-500">
                  <Heart className="w-5 h-5 fill-current" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Interactive Knowledge Quiz */}
      {activeTab === 'quiz' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8 max-w-3xl mx-auto">
          
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              WASH Knowledge Check (5 Questions)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Test your understanding of safe water storage, handwashing science, and disease prevention.
            </p>
          </div>

          <div className="space-y-6">
            {hygieneQuizQuestions.map((q, qIdx) => (
              <div key={q.id} className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                  {qIdx + 1}. {q.question}
                </h4>

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[q.id] === optIdx;
                    const isCorrect = optIdx === q.correctIndex;

                    let btnClass = 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300';
                    if (quizSubmitted) {
                      if (isCorrect) {
                        btnClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnClass = 'border-red-500 bg-red-50 dark:bg-red-950/60 text-red-900 dark:text-red-200';
                      }
                    } else if (isSelected) {
                      btnClass = 'border-aqua-500 bg-aqua-50 dark:bg-aqua-950/60 text-slate-900 dark:text-white font-bold ring-2 ring-aqua-500';
                    }

                    return (
                      <button
                        type="button"
                        key={optIdx}
                        onClick={() => handleSelectQuiz(q.id, optIdx)}
                        className={`w-full p-3 rounded-2xl border text-left text-xs transition-all flex items-center justify-between ${btnClass}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                        {quizSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    💡 <strong>Explanation:</strong> {q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {!quizSubmitted ? (
              <button
                type="button"
                onClick={() => setQuizSubmitted(true)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-aqua-600 hover:from-emerald-700 hover:to-aqua-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Submit & Check Answers
              </button>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-sm">
                    Score: {calculateScore()} / 5
                  </span>
                  <span className="text-xs text-slate-500">
                    {calculateScore() >= 4 ? "Excellent! You're a certified WASH Hero." : "Good try! Review the explanations above."}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                >
                  Retake Quiz
                </button>
              </>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
