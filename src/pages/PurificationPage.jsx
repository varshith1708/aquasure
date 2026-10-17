import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  Droplets, 
  ShieldCheck, 
  Sun, 
  Cpu, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw,
  Sliders,
  DollarSign,
  Zap,
  Info
} from 'lucide-react';
import { purificationMethods, recommenderQuestions } from '../data/mockPurification';

export default function PurificationPage() {
  const [activeTab, setActiveTab] = useState('encyclopedia'); // 'encyclopedia' or 'wizard'

  // Wizard State
  const [wizardAnswers, setWizardAnswers] = useState({
    source: 'tap',
    power: 'reliable',
    budget: 'moderate',
    concern: 'microbes'
  });
  const [recommendation, setRecommendation] = useState(null);

  const handleSelectWizard = (questionId, value) => {
    setWizardAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateRecommendation = () => {
    const { source, power, budget, concern } = wizardAnswers;

    let primary = "boiling";
    let rationale = "";

    if (concern === "tds" || source === "borewell" && budget === "premium" && power === "reliable") {
      primary = "ro_system";
      rationale = "High TDS (dissolved salts) and hard groundwater minerals can ONLY be effectively reduced by semipermeable Reverse Osmosis membranes.";
    } else if (budget === "free" || budget === "low") {
      if (power === "none") {
        primary = "sodis";
        rationale = "In off-grid situations with zero budget, Solar Disinfection (SODIS) uses free sunlight in transparent PET bottles to inactivate pathogens.";
      } else {
        primary = "boiling";
        rationale = "Boiling requires no commercial consumables and reliably destroys 99.99% of bacterial and viral pathogens using household heat.";
      }
    } else if (power === "none" || power === "intermittent") {
      if (budget === "moderate" || budget === "premium") {
        primary = "ceramic_filter";
        rationale = "Ceramic gravity candle filters operate 24/7 without electricity, filtering out sediment, cysts, and bacteria purely by gravity flow.";
      } else {
        primary = "chlorination";
        rationale = "Chlorine tablets provide quick chemical disinfection without electricity and prevent recontamination in storage vessels.";
      }
    } else if (concern === "turbidity") {
      primary = "ceramic_filter";
      rationale = "Physical microporous ceramic filtration physically traps sediment and suspended mud, producing clear drinking water.";
    } else {
      primary = "boiling";
      rationale = "Boiling is the universal standard for microbiological purity, suitable for treated municipal water with bacterial concerns.";
    }

    const matchedMethod = purificationMethods.find(m => m.id === primary);
    setRecommendation({
      method: matchedMethod,
      rationale
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-100 text-ocean-800 dark:bg-ocean-950 dark:text-aqua-300 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Science-Backed Water Treatment</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Water Purification Methods & Recommender
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
          Compare physical, thermal, chemical, and membrane technologies according to WHO benchmarks, or find the ideal solution for your household.
        </p>

        {/* Tab Switcher */}
        <div className="flex justify-center mt-6">
          <div className="p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center">
            <button
              onClick={() => setActiveTab('encyclopedia')}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'encyclopedia'
                  ? 'bg-white dark:bg-slate-900 text-ocean-800 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Method Comparison Guide
            </button>
            <button
              onClick={() => setActiveTab('wizard')}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'wizard'
                  ? 'bg-white dark:bg-slate-900 text-ocean-800 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Interactive Method Recommender
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: Encyclopedia */}
      {activeTab === 'encyclopedia' && (
        <div className="space-y-8">
          
          {/* Quick Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purificationMethods.map((m) => {
              const icons = {
                boiling: Flame,
                chlorination: Droplets,
                ceramic_filter: ShieldCheck,
                sodis: Sun,
                ro_system: Cpu
              };
              const Icon = icons[m.id] || Sparkles;

              return (
                <div
                  key={m.id}
                  id={m.id}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-aqua-500/50 transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-ocean-50 dark:bg-ocean-950 flex items-center justify-center text-ocean-700 dark:text-aqua-400">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {m.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {m.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        {m.tagline}
                      </p>
                    </div>

                    {/* Metadata specs */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-slate-400 block">Est. Cost</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{m.costLevel}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Power Needed</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{m.powerRequired.split(' ')[0]}</span>
                      </div>
                    </div>

                    {/* Effectiveness Table */}
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1.5">
                      <p className="font-bold text-[10px] text-slate-400 uppercase tracking-wider">
                        Pathogen Clearance Rate:
                      </p>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Bacteria:</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">{m.effectiveness.bacteria}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Viruses:</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">{m.effectiveness.viruses}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">TDS / Salts:</span>
                        <span className="font-bold text-slate-700 dark:text-slate-300">{m.effectiveness.tdsReduction}</span>
                      </div>
                    </div>

                    {/* Pros and Cons */}
                    <div className="space-y-2 pt-1 text-xs">
                      <div>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-[11px] mb-1">
                          Key Advantages:
                        </span>
                        <ul className="space-y-1 text-slate-600 dark:text-slate-300 text-[11px]">
                          {m.pros.slice(0, 2).map((p, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2">
                        <span className="font-bold text-amber-600 dark:text-amber-400 block text-[11px] mb-1">
                          Limitations:
                        </span>
                        <ul className="space-y-1 text-slate-600 dark:text-slate-300 text-[11px]">
                          {m.cons.slice(0, 2).map((c, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <XCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Instructions Popover / Accordion */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                    <p className="font-semibold text-ocean-700 dark:text-aqua-300">
                      WHO Status: {m.whoStandard}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* TAB 2: Method Recommender Wizard */}
      {activeTab === 'wizard' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8 max-w-3xl mx-auto">
          
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Tailored Water Treatment Recommender
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Select your household water source, budget, and power constraints to get a personalized recommendation:
            </p>
          </div>

          {/* Form Questions */}
          <div className="space-y-6">
            {recommenderQuestions.map((q) => (
              <div key={q.id} className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                  {q.question}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt) => {
                    const isSelected = wizardAnswers[q.id] === opt.value;
                    return (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() => handleSelectWizard(q.id, opt.value)}
                        className={`p-3 rounded-2xl border text-left text-xs transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-aqua-500 bg-aqua-50/70 dark:bg-aqua-950/60 ring-2 ring-aqua-500 font-bold text-slate-900 dark:text-white'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-aqua-600 dark:text-aqua-400 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Calculate Button */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={calculateRecommendation}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-ocean-800 to-aqua-600 hover:from-ocean-700 hover:to-aqua-500 text-white font-extrabold text-sm shadow-xl shadow-aqua-500/20 transition-all cursor-pointer"
            >
              Calculate Optimal Purification Setup
            </button>
          </div>

          {/* Recommendation Output */}
          {recommendation && (
            <div className="p-6 rounded-3xl bg-gradient-to-br from-ocean-50 to-aqua-50 dark:from-ocean-950/50 dark:to-aqua-950/40 border border-aqua-300 dark:border-aqua-900/60 space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-aqua-500 text-white font-black text-xs">
                  #1 MATCH
                </span>
                <span className="text-xs font-bold text-aqua-900 dark:text-aqua-300 uppercase tracking-wider">
                  Recommended For Your Situation
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {recommendation.method.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {recommendation.rationale}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 block">Typical Cost</span>
                  <span className="font-bold text-slate-900 dark:text-white">{recommendation.method.costEstimate}</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 block">Electricity</span>
                  <span className="font-bold text-slate-900 dark:text-white">{recommendation.method.powerRequired}</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 block">Bacteria Kill Rate</span>
                  <span className="font-bold text-emerald-600">{recommendation.method.effectiveness.bacteria}</span>
                </div>
              </div>

              {/* Instructions steps */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2">
                  Step-by-Step Implementation:
                </h4>
                <ol className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 list-decimal pl-4">
                  {recommendation.method.instructions.map((inst, idx) => (
                    <li key={idx} className="leading-relaxed">{inst}</li>
                  ))}
                </ol>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
