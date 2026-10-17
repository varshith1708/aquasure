import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckSquare, 
  Square, 
  HelpCircle, 
  AlertTriangle, 
  Droplets, 
  Eye, 
  Wind, 
  Coffee, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  RotateCcw,
  CheckCircle2,
  XCircle,
  FileCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TestingGuidePage() {
  const [activeTab, setActiveTab] = useState('checklist'); // 'checklist' or 'quiz'

  // Interactive Checklist State
  const [completedSteps, setCompletedSteps] = useState([false, false, false, false, false]);

  const toggleStep = (index) => {
    setCompletedSteps(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const steps = [
    {
      title: "Step 1: Visual Clarity Inspection",
      icon: Eye,
      instructions: "Pour tap water into a clean, transparent glass tumbler. Hold it against a white sheet of paper in natural daylight.",
      checklist: [
        "Is the water 100% transparent with zero haze or cloudiness?",
        "Are there any floating black specks (carbon/pipe rust) or sediment at the bottom?",
        "Is there any yellow, brown, or greenish tint?"
      ],
      tip: "Turbid or cloudy water indicates suspended silt or colloidal particles that shelter harmful pathogens from chlorine disinfection."
    },
    {
      title: "Step 2: Sensory Odor Test",
      icon: Wind,
      instructions: "Swirl the water in the glass tumbler, bring it to your nose, and take a deep sniff.",
      checklist: [
        "Rotten egg smell: Indicates hydrogen sulfide gas produced by anaerobic sulfur bacteria in wellheads.",
        "Swimming pool / bleach smell: Indicates high municipal chlorine dosing. Safe, but let stand 30 min to vent.",
        "Earthy or musty smell: Caused by geosmin from seasonal algae blooms in surface reservoirs."
      ],
      tip: "If water smells strongly of petroleum, solvent, or rotten sewage, discard immediately and notify the municipal health desk."
    },
    {
      title: "Step 3: Boil & Residue Test",
      icon: Flame,
      instructions: "Boil 250ml of water in a clean stainless steel saucepan until it completely evaporates.",
      checklist: [
        "White chalky residue: Harmless calcium carbonate and magnesium (hard water minerals).",
        "Reddish/brown stain: Indicates dissolved iron (ferric oxides) leaching from corroded cast iron pipes.",
        "Greasy or oily film on surface: Indicates potential surfactant or hydrocarbon runoff."
      ],
      tip: "White mineral scale is not toxic, but high hardness (>300 ppm) may damage electric geysers and kettles over time."
    },
    {
      title: "Step 4: DIY Multi-Parameter Test Strips",
      icon: Sparkles,
      instructions: "Dip a standard 5-in-1 or 7-in-1 water test strip into fresh water for 2 seconds, remove without shaking, and compare color pads at exactly 30 seconds.",
      checklist: [
        "pH Pad: Ideal reading is between 6.5 and 8.5 (light yellow to teal).",
        "Free Chlorine Pad: Ideal residual is 0.2 to 1.0 mg/L (faint purple).",
        "Nitrate (NO3) Pad: Should be below 10 mg/L (pale pink; dark magenta indicates agricultural fertilizer runoff)."
      ],
      tip: "Always store test strip bottles tightly capped in a dry, dark cabinet to prevent moisture from degrading enzymatic pads."
    },
    {
      title: "Step 5: Hand Soap Foam Test",
      icon: Droplets,
      instructions: "Add 2 drops of standard liquid hand soap to a sealed bottle half-filled with water and shake vigorously for 15 seconds.",
      checklist: [
        "Abundant frothy suds: Indicates soft water (< 100 ppm mineral hardness).",
        "Curdy, cloudy scum with almost no foam: Indicates high mineral hardness (requires water softener or RO)."
      ],
      tip: "Soap scum occurs when calcium and magnesium ions bind with soap carboxylates, neutralizing cleansing efficiency."
    }
  ];

  // Diagnostic Quiz State
  const quizQuestions = [
    {
      id: 1,
      question: "What does your water look like in a clear glass?",
      options: [
        { label: "Crystal clear with zero floating particles", score: 0 },
        { label: "Slightly hazy or milky, clears after sitting a few minutes", score: 1 },
        { label: "Noticeably cloudy, brownish, or has visible sediment at bottom", score: 3 }
      ]
    },
    {
      id: 2,
      question: "Does your water have any distinctive odor?",
      options: [
        { label: "Zero smell / Fresh neutral scent", score: 0 },
        { label: "Mild chlorine scent (like tap water in hotels)", score: 1 },
        { label: "Strong rotten egg (sulfur), earthy, sewage, or metallic smell", score: 3 }
      ]
    },
    {
      id: 3,
      question: "Where is your raw water sourced from?",
      options: [
        { label: "Municipal piped water network with regular supply", score: 0 },
        { label: "Deep community borewell or protected mountain spring", score: 1 },
        { label: "Shallow open dug well, lake, canal, or private unverified tanker", score: 3 }
      ]
    },
    {
      id: 4,
      question: "Has anyone in your household had stomach cramps, nausea, or diarrhea recently?",
      options: [
        { label: "No, everyone has been completely healthy", score: 0 },
        { label: "Occasional mild indigestion after drinking unboiled tap water", score: 2 },
        { label: "Yes, acute vomiting or watery diarrhea affecting multiple members", score: 4 }
      ]
    },
    {
      id: 5,
      question: "When boiling, does your water leave stains or thick oily sheen?",
      options: [
        { label: "Boils cleanly with barely any residue", score: 0 },
        { label: "Leaves thin white chalky ring on saucepan bottom (hard minerals)", score: 1 },
        { label: "Leaves brown/black rust stains or an oily rainbow slick on surface", score: 3 }
      ]
    }
  ];

  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  const handleSelectAnswer = (qIndex, score) => {
    setQuizAnswers(prev => ({
      ...prev,
      [qIndex]: score
    }));
  };

  const handleCalculateQuiz = () => {
    let totalScore = 0;
    for (let i = 0; i < quizQuestions.length; i++) {
      if (quizAnswers[i] === undefined) {
        alert("Please answer all 5 questions before submitting.");
        return;
      }
      totalScore += quizAnswers[i];
    }

    let verdict = '';
    let status = '';
    let advice = [];

    if (totalScore <= 2) {
      status = 'Safe';
      verdict = "Likely Safe For Normal Consumption";
      advice = [
        "Your water sensory characteristics match potable WHO guidelines.",
        "Store drinking water in narrow-mouth, covered containers with a dispensing tap.",
        "Perform a simple periodic visual check after heavy rainfall or plumbing work."
      ];
    } else if (totalScore <= 6) {
      status = 'Caution';
      verdict = "Moderate Risk — Disinfection / Filtration Required";
      advice = [
        "Do NOT drink directly from tap without treatment.",
        "Bring water to a vigorous rolling boil for at least 1 full minute before drinking or infant formula.",
        "Consider installing a gravity ceramic candle filter or carbon-block filter to remove sediment and odor."
      ];
    } else {
      status = 'Unsafe';
      verdict = "CRITICAL HAZARD — Unsafe For Human Consumption";
      advice = [
        "STOP drinking this water immediately. High probability of microbial pathogens or toxic runoff.",
        "Do not use this water even for brushing teeth or washing raw fruits/vegetables.",
        "Use certified bottled water or fetch water from a verified Safe Tap on our Interactive Map.",
        "File an urgent contamination report on AquaSure to dispatch water authorities."
      ];
    }

    setQuizResult({ totalScore, status, verdict, advice });
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizResult(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aqua-100 text-aqua-800 dark:bg-aqua-950 dark:text-aqua-300 text-xs font-bold mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Home Diagnostic Protocol</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Water Testing Guide & Safety Assessment
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
          Learn how to perform sensory and chemical tests right at your kitchen counter, or take our interactive diagnostic quiz to evaluate your water's risk level.
        </p>

        {/* Tab Toggle */}
        <div className="flex justify-center mt-6">
          <div className="p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center">
            <button
              onClick={() => setActiveTab('checklist')}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'checklist'
                  ? 'bg-white dark:bg-slate-900 text-ocean-800 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              5-Step Home Testing Checklist
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'quiz'
                  ? 'bg-white dark:bg-slate-900 text-ocean-800 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              "Is My Water Safe?" Quiz
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: 5-Step Checklist */}
      {activeTab === 'checklist' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-aqua-50 dark:bg-aqua-950/30 border border-aqua-200 dark:border-aqua-900/60 flex items-center justify-between text-xs">
            <span className="font-semibold text-aqua-900 dark:text-aqua-200">
              Check off items as you test your household water:
            </span>
            <span className="font-bold text-aqua-700 dark:text-aqua-300">
              {completedSteps.filter(Boolean).length} of 5 Completed
            </span>
          </div>

          <div className="space-y-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isDone = completedSteps[idx];

              return (
                <div
                  key={step.title}
                  className={`p-6 rounded-3xl border transition-all ${
                    isDone
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900/60 shadow-sm'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                        isDone ? 'bg-emerald-500 text-white' : 'bg-ocean-100 text-ocean-800 dark:bg-ocean-950 dark:text-aqua-300'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {step.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {step.instructions}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleStep(idx)}
                      className="p-2 rounded-xl text-slate-400 hover:text-emerald-600 cursor-pointer"
                    >
                      {isDone ? (
                        <CheckSquare className="w-6 h-6 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                      ) : (
                        <Square className="w-6 h-6" />
                      )}
                    </button>
                  </div>

                  {/* Checklist Items */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pl-3">
                    {step.checklist.map((c, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-aqua-500"></span>
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pro Tip */}
                  <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-[11px] text-slate-500 dark:text-slate-400">
                    💡 <strong>Insight:</strong> {step.tip}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => setActiveTab('quiz')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-ocean-800 hover:bg-ocean-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <span>Now Take The Diagnostic Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: Diagnostic Quiz */}
      {activeTab === 'quiz' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          
          {!quizResult ? (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  5 Diagnostic Questions
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select the option that best describes your drinking water:
                </p>
              </div>

              {quizQuestions.map((q, qIndex) => (
                <div key={q.id} className="space-y-2.5">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {qIndex + 1}. {q.question}
                  </h4>
                  <div className="space-y-2">
                    {q.options.map((opt, optIndex) => {
                      const isSelected = quizAnswers[qIndex] === opt.score;
                      return (
                        <button
                          type="button"
                          key={optIndex}
                          onClick={() => handleSelectAnswer(qIndex, opt.score)}
                          className={`w-full p-3 rounded-2xl border text-left text-xs transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-aqua-500 bg-aqua-50/70 dark:bg-aqua-950/50 ring-2 ring-aqua-500 font-semibold text-slate-900 dark:text-white'
                              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span>{opt.label}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-aqua-600 dark:text-aqua-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handleCalculateQuiz}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-ocean-800 to-aqua-600 hover:from-ocean-700 hover:to-aqua-500 text-white font-extrabold text-sm shadow-xl shadow-aqua-500/20 transition-all cursor-pointer"
                >
                  Analyze My Water Safety Score
                </button>
              </div>
            </div>
          ) : (
            /* Quiz Results Display */
            <div className="space-y-6 text-center animate-in fade-in">
              <div className={`w-16 h-16 mx-auto rounded-3xl flex items-center justify-center text-white shadow-xl ${
                quizResult.status === 'Safe' ? 'bg-emerald-500 shadow-emerald-500/30' :
                quizResult.status === 'Caution' ? 'bg-amber-500 shadow-amber-500/30' :
                'bg-red-500 shadow-red-500/30'
              }`}>
                {quizResult.status === 'Safe' ? <CheckCircle2 className="w-9 h-9" /> :
                 quizResult.status === 'Caution' ? <AlertTriangle className="w-9 h-9" /> :
                 <XCircle className="w-9 h-9" />}
              </div>

              <div>
                <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                  quizResult.status === 'Safe' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                  quizResult.status === 'Caution' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                  'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                }`}>
                  Risk Score: {quizResult.totalScore} / 15 ({quizResult.status} Status)
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                  {quizResult.verdict}
                </h3>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  Recommended Action Plan:
                </h4>
                {quizResult.advice.map((adv, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span className="font-bold text-aqua-600">•</span>
                    <span>{adv}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={resetQuiz}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Quiz</span>
                </button>
                <Link
                  to="/purification"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-ocean-800 hover:bg-ocean-700 text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Explore Suitable Purification Methods</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {quizResult.status === 'Unsafe' && (
                  <Link
                    to="/report"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md transition-colors"
                  >
                    Report Hazardous Water Now
                  </Link>
                )}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
