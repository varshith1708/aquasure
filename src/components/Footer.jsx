import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Droplets, 
  ShieldCheck, 
  Heart, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Globe, 
  ExternalLink 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      {/* Top Banner: UN SDG 6 Commitment */}
      <div className="bg-gradient-to-r from-ocean-950 via-ocean-900 to-aqua-950 border-b border-ocean-800/40 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-lg bg-aqua-500/20 text-aqua-400 border border-aqua-400/30 flex items-center justify-center font-black text-sm">
              6
            </span>
            <div>
              <p className="text-xs font-bold text-white tracking-wide uppercase">
                Aligned with United Nations Sustainable Development Goal 6
              </p>
              <p className="text-xs text-aqua-200/70">
                Ensure availability and sustainable management of water and sanitation for all by 2030.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/community"
              className="px-3.5 py-1.5 rounded-lg bg-aqua-500 hover:bg-aqua-400 text-slate-950 font-bold text-xs shadow-sm transition-all"
            >
              Support the Mission
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-aqua-400 to-ocean-800 flex items-center justify-center text-white shadow-md">
                <Droplets className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                AquaSure
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              A civic-technology initiative providing hyper-local water quality monitoring, community incident verification, and decentralized sanitation education.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
              <PhoneCall className="w-5 h-5 text-red-400 shrink-0" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  24/7 Water Crisis Helpline
                </p>
                <p className="text-sm font-bold text-white">
                  1800-120-WATER (Toll-Free)
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Water Platforms */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Platforms & Tools
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/dashboard" className="hover:text-aqua-400 transition-colors">
                  Water Quality Dashboard
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-aqua-400 transition-colors">
                  Interactive Safe Tap Map
                </Link>
              </li>
              <li>
                <Link to="/report" className="hover:text-aqua-400 transition-colors">
                  Report Contamination
                </Link>
              </li>
              <li>
                <Link to="/testing-guide" className="hover:text-aqua-400 transition-colors">
                  Home Testing Checklist
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-aqua-400 transition-colors">
                  Household Water Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Health & Learning */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Sanitation & Education
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/purification" className="hover:text-aqua-400 transition-colors">
                  Purification Methods Guide
                </Link>
              </li>
              <li>
                <Link to="/education" className="hover:text-aqua-400 transition-colors">
                  WHO 6-Step Handwashing
                </Link>
              </li>
              <li>
                <Link to="/education" className="hover:text-aqua-400 transition-colors">
                  Waterborne Disease Guide
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-aqua-400 transition-colors">
                  Downloadable Safety PDFs
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="hover:text-aqua-400 transition-colors">
                  Public Advisories & Notices
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Community & Operations */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Civic Action
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/community" className="hover:text-aqua-400 transition-colors">
                  Upcoming River Clean-ups
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-aqua-400 transition-colors">
                  Volunteer Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-aqua-400 transition-colors">
                  Field Admin Console
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-aqua-400 transition-colors">
                  Contact & Hotlines
                </Link>
              </li>
              <li>
                <span className="inline-flex items-center gap-1 text-xs text-aqua-400">
                  <ShieldCheck className="w-3.5 h-3.5" /> Open Civic Data
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 AquaSure Civic Platform. Built for humanity under open-source MIT license.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for clean water access
            </span>
            <span>WCAG 2.1 AA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
