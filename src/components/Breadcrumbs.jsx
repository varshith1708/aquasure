import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeNames = {
  '/dashboard': 'Water Quality Dashboard',
  '/map': 'Interactive Safe Tap Map',
  '/report': 'Report an Issue',
  '/testing-guide': 'Water Testing Guide',
  '/purification': 'Purification Methods',
  '/education': 'Sanitation & Hygiene Education',
  '/calculator': 'Water Usage Calculator',
  '/alerts': 'Alerts Center',
  '/community': 'Community & Volunteer',
  '/admin': 'Admin Operations Center',
  '/resources': 'Resources & Articles',
  '/contact': 'Contact & Helplines',
  '/profile': 'User Profile'
};

export default function Breadcrumbs() {
  const location = useLocation();

  if (location.pathname === '/') return null;

  const currentTitle = routeNames[location.pathname] || 'Page';

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <ol className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <li>
          <Link to="/" className="flex items-center gap-1 hover:text-ocean-700 dark:hover:text-aqua-400 transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </li>
        <li className="font-semibold text-slate-800 dark:text-slate-200">
          {currentTitle}
        </li>
      </ol>
    </nav>
  );
}
