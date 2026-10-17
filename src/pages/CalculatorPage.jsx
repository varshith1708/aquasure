import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Droplets, 
  TrendingDown, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  Download, 
  Printer, 
  Info,
  DollarSign
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';

export default function CalculatorPage() {
  const [people, setPeople] = useState(4);
  const [showerMinutes, setShowerMinutes] = useState(8); // min per person
  const [showerPerDay, setShowerPerDay] = useState(1);
  const [toiletFlushes, setToiletFlushes] = useState(4); // flushes per person
  const [dishwashingLoads, setDishwashingLoads] = useState(2); // loads/day
  const [laundryLoadsPerWeek, setLaundryLoadsPerWeek] = useState(4);
  const [gardenMinutes, setGardenMinutes] = useState(10); // min/day
  const [drippingTaps, setDrippingTaps] = useState(1); // count of dripping faucets

  // Calculations (WHO standard volumetric assumptions)
  const calculation = useMemo(() => {
    const showerLiters = people * showerPerDay * showerMinutes * 9; // ~9L/min standard head
    const toiletLiters = people * toiletFlushes * 7; // ~7L per flush
    const kitchenLiters = dishwashingLoads * 25 + people * 5; // dishes + drinking/cooking
    const laundryDailyLiters = (laundryLoadsPerWeek * 60) / 7; // ~60L per laundry cycle
    const outdoorLiters = gardenMinutes * 12; // ~12L/min garden hose
    const leakLiters = drippingTaps * 25; // ~25L/day per dripping tap

    const totalDaily = Math.round(showerLiters + toiletLiters + kitchenLiters + laundryDailyLiters + outdoorLiters + leakLiters);
    const perCapitaDaily = Math.round(totalDaily / (people || 1));
    const totalMonthly = Math.round(totalDaily * 30.5);

    return {
      showerLiters: Math.round(showerLiters),
      toiletLiters: Math.round(toiletLiters),
      kitchenLiters: Math.round(kitchenLiters),
      laundryLiters: Math.round(laundryDailyLiters),
      outdoorLiters: Math.round(outdoorLiters),
      leakLiters: Math.round(leakLiters),
      totalDaily,
      perCapitaDaily,
      totalMonthly,
      gallonsDaily: Math.round(totalDaily * 0.264172)
    };
  }, [people, showerMinutes, showerPerDay, toiletFlushes, dishwashingLoads, laundryLoadsPerWeek, gardenMinutes, drippingTaps]);

  // Donut chart category data
  const pieData = [
    { name: 'Showers & Bathing', value: calculation.showerLiters, color: '#0c8ee9' },
    { name: 'Toilet Flushing', value: calculation.toiletLiters, color: '#14B8A6' },
    { name: 'Kitchen & Cooking', value: calculation.kitchenLiters, color: '#10B981' },
    { name: 'Laundry', value: calculation.laundryLiters, color: '#8b5cf6' },
    { name: 'Outdoor & Garden', value: calculation.outdoorLiters, color: '#f59e0b' },
    { name: 'Leaks & Drips', value: calculation.leakLiters, color: '#ef4444' }
  ].filter(d => d.value > 0);

  // Benchmark comparison against WHO standard
  const benchmarkData = [
    { name: 'WHO Minimum', amount: 50, fill: '#10B981' },
    { name: 'WHO Ideal', amount: 100, fill: '#14B8A6' },
    { name: 'Your Household', amount: calculation.perCapitaDaily, fill: calculation.perCapitaDaily > 135 ? '#ef4444' : '#0A4D8C' },
    { name: 'Urban Average', amount: 135, fill: '#64748b' }
  ];

  // Interactive savings checklist
  const [savingsChecked, setSavingsChecked] = useState([true, false, true, false]);
  const tips = [
    { id: 0, title: "Install tap aerators & low-flow showerhead", savingsLitersMonth: 2400, savingsCost: 15 },
    { id: 1, title: "Shorten showers by 2 minutes per person", savingsLitersMonth: 2160, savingsCost: 14 },
    { id: 2, title: "Fix dripping faucet washers & toilet flappers", savingsLitersMonth: 900, savingsCost: 6 },
    { id: 3, title: "Reuse greywater for garden & floor wash", savingsLitersMonth: 1800, savingsCost: 12 }
  ];

  const totalMonthlySavings = tips
    .filter((_, idx) => savingsChecked[idx])
    .reduce((sum, item) => sum + item.savingsLitersMonth, 0);

  const totalCostSavings = tips
    .filter((_, idx) => savingsChecked[idx])
    .reduce((sum, item) => sum + item.savingsCost, 0);

  const toggleSavings = (idx) => {
    setSavingsChecked(prev => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-100 text-ocean-800 dark:bg-ocean-950 dark:text-aqua-300 text-xs font-bold mb-3">
          <Calculator className="w-3.5 h-3.5" />
          <span>Conservation Simulator</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Household Water Usage & Savings Calculator
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
          Track your family's daily water consumption, compare against international WHO baselines, and calculate potential volume and cost savings.
        </p>
      </div>

      {/* Sliders Input Panel + Real-Time Result Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Interactive Controls */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="font-bold text-base text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            Household Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* People in Household */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>Household Members</span>
                <span className="font-bold text-ocean-700 dark:text-aqua-400">{people} people</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
                className="w-full accent-ocean-600"
              />
            </div>

            {/* Shower Minutes */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>Avg Shower Duration</span>
                <span className="font-bold text-ocean-700 dark:text-aqua-400">{showerMinutes} min / person</span>
              </div>
              <input
                type="range"
                min="2"
                max="25"
                value={showerMinutes}
                onChange={(e) => setShowerMinutes(Number(e.target.value))}
                className="w-full accent-ocean-600"
              />
            </div>

            {/* Toilet Flushes */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>Toilet Flushes / Person</span>
                <span className="font-bold text-ocean-700 dark:text-aqua-400">{toiletFlushes} times / day</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                value={toiletFlushes}
                onChange={(e) => setToiletFlushes(Number(e.target.value))}
                className="w-full accent-ocean-600"
              />
            </div>

            {/* Laundry Loads */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>Washing Machine Cycles</span>
                <span className="font-bold text-ocean-700 dark:text-aqua-400">{laundryLoadsPerWeek} loads / week</span>
              </div>
              <input
                type="range"
                min="0"
                max="14"
                value={laundryLoadsPerWeek}
                onChange={(e) => setLaundryLoadsPerWeek(Number(e.target.value))}
                className="w-full accent-ocean-600"
              />
            </div>

            {/* Garden / Hose Watering */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>Outdoor / Garden Hose</span>
                <span className="font-bold text-ocean-700 dark:text-aqua-400">{gardenMinutes} min / day</span>
              </div>
              <input
                type="range"
                min="0"
                max="45"
                value={gardenMinutes}
                onChange={(e) => setGardenMinutes(Number(e.target.value))}
                className="w-full accent-ocean-600"
              />
            </div>

            {/* Leaking Faucets */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>Dripping Taps / Leaks</span>
                <span className="font-bold text-red-500">{drippingTaps} fixtures</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                value={drippingTaps}
                onChange={(e) => setDrippingTaps(Number(e.target.value))}
                className="w-full accent-red-500"
              />
            </div>

          </div>
        </div>

        {/* Right 1 Column: Result Summary Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-ocean-900 to-ocean-950 text-white shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-bold text-aqua-300 uppercase tracking-wider">
              Total Consumption Footprint
            </span>
            
            <div>
              <p className="text-4xl sm:text-5xl font-black text-white">
                {calculation.totalDaily.toLocaleString()} <span className="text-xl font-normal text-aqua-200">L / day</span>
              </p>
              <p className="text-xs text-slate-300 mt-1">
                ≈ {calculation.gallonsDaily.toLocaleString()} US Gallons • {calculation.totalMonthly.toLocaleString()} L / month
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Per Capita Daily Usage:</span>
                <span className="font-bold text-white">{calculation.perCapitaDaily} L / person</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">WHO Potable Baseline:</span>
                <span className="font-bold text-emerald-400">50 - 100 L / person</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Status:</span>
                <span className={`font-bold ${calculation.perCapitaDaily <= 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {calculation.perCapitaDaily <= 100 ? 'Eco-Conscious / Efficient' : 'Higher Than Global Benchmark'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <p className="text-[11px] text-slate-400 leading-relaxed italic">
              "Access to 50-100 liters of water per person per day is the threshold to ensure the most basic health needs under UN SDG 6."
            </p>
          </div>
        </div>

      </div>

      {/* Visual Analytics Charts: Donut + Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Donut Breakdown */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Daily Water Consumption by Source
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Benchmark Comparison Bar */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Per Person Benchmark Comparison (Liters / Day)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={benchmarkData} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} domain={[0, 160]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }} />
                <Bar dataKey="amount" name="Liters / Day" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Interactive Savings Plan Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Personalized Water Conservation Plan
            </h3>
            <p className="text-xs text-slate-400">
              Select efficiency interventions to see potential volumetric and utility savings:
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Potential Monthly Savings</span>
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                {totalMonthlySavings.toLocaleString()} Liters (~${totalCostSavings})
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tips.map((tip, idx) => (
            <div
              key={tip.id}
              onClick={() => toggleSavings(idx)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                savingsChecked[idx]
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-400 dark:border-emerald-900/60'
                  : 'bg-slate-50/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="mt-0.5">
                <CheckCircle2 className={`w-5 h-5 ${savingsChecked[idx] ? 'text-emerald-500 fill-emerald-100 dark:fill-emerald-950' : 'text-slate-300'}`} />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {tip.title}
                </h4>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                  <span>Save {tip.savingsLitersMonth.toLocaleString()} L / mo</span>
                  <span>•</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">≈ ${tip.savingsCost}/mo saved</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
