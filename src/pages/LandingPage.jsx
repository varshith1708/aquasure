import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Droplets, 
  MapPin, 
  Activity, 
  AlertTriangle, 
  ShieldCheck, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  Users, 
  CheckCircle2, 
  HeartHandshake, 
  Globe2, 
  TrendingUp, 
  Award,
  ChevronRight,
  Flame,
  Search,
  Bell
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function LandingPage() {
  const { sources, reports, alerts } = useData();

  // Animated counters
  const [counts, setCounts] = useState({
    people: 0,
    villages: 0,
    tests: 0,
    resolvedRate: 0
  });

  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        people: Math.floor(1420800 * progress),
        villages: Math.floor(840 * progress),
        tests: Math.floor(128450 * progress),
        resolvedRate: Math.floor(96.8 * progress * 10) / 10
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts({
          people: 1420800,
          villages: 840,
          tests: 128450,
          resolvedRate: 96.8
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const safeSourcesCount = sources.filter(s => s.status === 'Safe').length;
  const criticalAlertsCount = alerts.filter(a => a.severity === 'Critical').length;

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* 1. Hero Section with Water Wave Backdrop */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-gradient-to-b from-ocean-50/70 via-aqua-50/30 to-transparent dark:from-slate-900 dark:via-ocean-950/40 dark:to-slate-950">
        
        {/* Subtle Water Droplets Decorative Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-ocean-400/20 via-aqua-400/20 to-ocean-600/10 blur-3xl pointer-events-none rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Ticker Alert Banner */}
          <div className="flex justify-center mb-6">
            <Link
              to="/alerts"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 border border-ocean-200 dark:border-slate-700 shadow-sm hover:shadow transition-all text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-ocean-700 dark:hover:text-aqua-400 backdrop-blur-md"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span>Live Alert: {criticalAlertsCount} Boil-Water Advisories in effect</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>

          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Clean, Safe Water & Dignified Sanitation{' '}
              <span className="bg-gradient-to-r from-ocean-700 via-ocean-500 to-aqua-500 bg-clip-text text-transparent">
                For Every Community.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              AquaSure is a civic-tech platform empowering citizens, hydrologists, and municipalities to monitor water safety, report pipeline hazards, locate verified potable taps, and protect public health under <strong>UN SDG 6</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <Link
                to="/map"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-ocean-800 hover:bg-ocean-700 text-white font-bold text-sm shadow-xl shadow-ocean-800/20 hover:scale-[1.02] transition-all"
              >
                <MapPin className="w-4 h-4 text-aqua-300" />
                <span>Find Nearest Safe Tap</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <Link
                to="/report"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 font-bold text-sm shadow-sm hover:scale-[1.02] transition-all"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Report Water Hazard</span>
              </Link>

              <Link
                to="/testing-guide"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold text-sm shadow-sm transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-aqua-600 dark:text-aqua-400" />
                <span>Is My Water Safe?</span>
              </Link>
            </div>

            {/* Verified Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                30+ Certified Water Sources
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Real-Time Citizen Verification
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Zero Backend Dependency (Local-first)
              </span>
            </div>

          </div>

        </div>

      </section>

      {/* 2. Live Impact Counters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-ocean-900 via-ocean-800 to-aqua-900 text-white shadow-2xl relative overflow-hidden">
          
          <div className="absolute right-0 top-0 w-96 h-96 bg-aqua-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center mb-8">
            <span className="text-[11px] font-bold uppercase tracking-widest text-aqua-300">
              Measurable Civic Impact
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1">
              Protecting Communities One Drop at a Time
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            
            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <p className="text-3xl sm:text-4xl font-black text-aqua-300">
                {counts.people.toLocaleString()}+
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                People Protected Daily
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <p className="text-3xl sm:text-4xl font-black text-white">
                {counts.villages.toLocaleString()}+
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                Villages & Wards Covered
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <p className="text-3xl sm:text-4xl font-black text-aqua-300">
                {counts.tests.toLocaleString()}+
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                Water Quality Tests Logged
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <p className="text-3xl sm:text-4xl font-black text-emerald-400">
                {counts.resolvedRate}%
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                Reported Hazards Resolved
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Core Capabilities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-ocean-600 dark:text-aqua-400">
            End-To-End Water Security
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
            Everything You Need For Safe Water
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Explore dedicated civic modules designed for citizens, local health workers, and municipal engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Live Quality Dashboard */}
          <Link
            to="/dashboard"
            className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-aqua-500/50 shadow-sm hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-ocean-50 dark:bg-ocean-950 flex items-center justify-center text-ocean-700 dark:text-aqua-400 mb-4 group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-ocean-700 dark:group-hover:text-aqua-400 transition-colors">
              Water Quality Dashboard
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Track real-time pH, turbidity, TDS, free chlorine, and coliform levels across 5 zones with interactive graphs and CSV reports.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-ocean-700 dark:text-aqua-400">
              <span>View Live Analytics</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Safe Tap Map */}
          <Link
            to="/map"
            className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-aqua-500/50 shadow-sm hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-aqua-50 dark:bg-aqua-950 flex items-center justify-center text-aqua-600 dark:text-aqua-400 mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-ocean-700 dark:group-hover:text-aqua-400 transition-colors">
              Interactive Safe Tap Map
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Locate verified public standposts, RO kiosks, deep borewells, and sanitation hubs with GPS navigation and walk times.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-aqua-600 dark:text-aqua-400">
              <span>Explore Map Locations</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Report Incident */}
          <Link
            to="/report"
            className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-400/50 shadow-sm hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/60 flex items-center justify-center text-red-600 dark:text-red-400 mb-4 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              Report Water Hazards
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              File photo-verified reports for pipeline bursts, sewage backflows, and dry taps with ticket tracking from submission to fix.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400">
              <span>File a Ticket</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Purification Methods */}
          <Link
            to="/purification"
            className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-aqua-500/50 shadow-sm hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-ocean-50 dark:bg-ocean-950 flex items-center justify-center text-ocean-700 dark:text-aqua-400 mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-ocean-700 dark:group-hover:text-aqua-400 transition-colors">
              Purification Encyclopedia
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Compare Boiling, Chlorination, Ceramic Filters, SODIS, and RO with cost, effectiveness, and an interactive situation recommender.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-ocean-700 dark:text-aqua-400">
              <span>Compare Methods</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 5: Hygiene Education */}
          <Link
            to="/education"
            className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-aqua-500/50 shadow-sm hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Hygiene & Disease Guide
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              WHO 6-step handwashing with interactive timer, cholera/typhoid prevention, menstrual hygiene, in 4 Indian languages.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <span>Learn in 4 Languages</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 6: Usage Calculator */}
          <Link
            to="/calculator"
            className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-aqua-500/50 shadow-sm hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              Water Usage Calculator
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Calculate your household water footprint against WHO standards and unlock tailored leak-reduction and savings tips.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400">
              <span>Calculate Footprint</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>
      </section>

      {/* 4. Testimonials Section */}
      <section className="bg-slate-100/70 dark:bg-slate-900/60 py-16 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-ocean-600 dark:text-aqua-400">
              Voices From The Field
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              Trusted by Citizens & Health Officials
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                  alt="Fatima"
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-aqua-500"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Fatima Sheikh</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Gram Panchayat Lead, Central Valley</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "When our village well showed brownish turbidity, we filed a report on AquaSure. Within 4 hours, a civic inspector verified the report and dispatched chlorinated mobile bowsers."
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Dr. Ramesh"
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-ocean-500"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Dr. Ramesh Chandra</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Public Health Officer, North Zone</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "The live water quality dashboard allows our medical teams to track coliform and chlorine anomalies before acute diarrhea outbreaks can spread through densely populated wards."
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                  alt="Ananya"
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Ananya Roy</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Youth Volunteer, Eastern Highlands</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "The 4-language hygiene guide and step-by-step handwashing timer have become standard teaching tools in our community school workshops. Truly transformative."
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Partner Logos (Civic & Global Alliances) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
          Aligned With Global Standards & Frameworks
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2 font-black text-slate-700 dark:text-slate-300 text-sm">
            <Globe2 className="w-5 h-5 text-aqua-600" />
            <span>UN-WATER</span>
          </div>
          <div className="flex items-center gap-2 font-black text-slate-700 dark:text-slate-300 text-sm">
            <Award className="w-5 h-5 text-ocean-600" />
            <span>WHO GUIDELINES</span>
          </div>
          <div className="flex items-center gap-2 font-black text-slate-700 dark:text-slate-300 text-sm">
            <HeartHandshake className="w-5 h-5 text-red-500" />
            <span>UNICEF WASH</span>
          </div>
          <div className="flex items-center gap-2 font-black text-slate-700 dark:text-slate-300 text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>OPEN CIVIC DATA</span>
          </div>
        </div>
      </section>

      {/* 6. Bottom Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-ocean-800 to-aqua-600 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black">
              Witnessing Dirty Water or Broken Taps?
            </h3>
            <p className="text-xs sm:text-sm text-aqua-100 max-w-xl">
              File a verified report in less than 60 seconds. Every report alerts nearby citizens and municipal engineers for immediate intervention.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/report"
              className="px-6 py-3.5 rounded-2xl bg-white text-ocean-900 font-extrabold text-xs shadow-lg hover:bg-slate-100 hover:scale-105 transition-all"
            >
              Report Hazard Now
            </Link>
            <Link
              to="/community"
              className="px-6 py-3.5 rounded-2xl bg-ocean-950/40 text-white border border-white/20 font-bold text-xs hover:bg-ocean-950/60 transition-all"
            >
              Join Volunteer Drive
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
