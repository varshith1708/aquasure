import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-aqua-400 to-ocean-800 flex items-center justify-center text-white shadow-xl shadow-aqua-500/20">
          <Droplets className="w-10 h-10 animate-bounce" />
        </div>

        <div>
          <span className="text-5xl font-black text-ocean-800 dark:text-aqua-400 font-mono">
            404
          </span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            Water Point Not Found
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            The page or resource you are looking for has been moved, evaporated, or does not exist in our civic database.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-ocean-800 hover:bg-ocean-700 text-white font-bold text-xs shadow-md transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to AquaSure Home</span>
          </Link>
          <Link
            to="/map"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 transition-all"
          >
            <span>Explore Safe Map</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
