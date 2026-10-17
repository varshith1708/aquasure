import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Droplets, 
  MapPin, 
  Activity, 
  AlertTriangle, 
  ShieldCheck, 
  BookOpen, 
  Calculator, 
  Bell, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  User, 
  LogIn, 
  LogOut, 
  Users, 
  Sparkles,
  ExternalLink,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { 
    user, 
    notifications, 
    markNotificationRead, 
    setIsSearchOpen, 
    setIsAuthOpen, 
    logout 
  } = useData();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setNotifDropdownOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: Activity },
    { name: 'Safe Map', path: '/map', icon: MapPin },
    { name: 'Report Issue', path: '/report', icon: AlertTriangle, highlight: true },
    { name: 'Test Water', path: '/testing-guide', icon: ShieldCheck },
    { name: 'Purification', path: '/purification', icon: Sparkles },
    { name: 'Hygiene & Edu', path: '/education', icon: BookOpen },
    { name: 'Calculator', path: '/calculator', icon: Calculator },
    { name: 'Alerts', path: '/alerts', icon: Bell },
    { name: 'Community', path: '/community', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aqua-400 to-ocean-800 flex items-center justify-center text-white shadow-md shadow-aqua-500/20 group-hover:scale-105 transition-transform">
              <Droplets className="w-6 h-6 animate-pulse-subtle" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-ocean-800 via-ocean-600 to-aqua-500 dark:from-white dark:to-aqua-400 bg-clip-text text-transparent">
                  AquaSure
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-aqua-100 text-aqua-800 dark:bg-aqua-950 dark:text-aqua-300 border border-aqua-300/40">
                  SDG 6
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 -mt-1 hidden md:block">
                Clean Water & Sanitation For All
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-ocean-50 text-ocean-700 dark:bg-ocean-950/80 dark:text-aqua-300 shadow-sm'
                      : link.highlight
                      ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40'
                      : 'text-slate-600 dark:text-slate-300 hover:text-ocean-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${link.highlight ? 'text-red-500' : ''}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Icons: Search, Notifs, Theme, User */}
          <div className="flex items-center gap-2">
            
            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search across AquaSure"
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-ocean-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline bg-slate-200/70 dark:bg-slate-700/60 px-1.5 py-0.5 rounded text-[11px] text-slate-500 dark:text-slate-400">
                ⌘K
              </span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                aria-label="Notifications"
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-ocean-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
                )}
              </button>

              {/* Notification Dropdown */}
              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-ocean-600 dark:text-aqua-400" />
                      <h4 className="font-semibold text-sm">Notifications</h4>
                      {unreadCount > 0 && (
                        <span className="text-[11px] bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 px-2 py-0.5 rounded-full font-bold">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <Link
                      to="/alerts"
                      onClick={() => setNotifDropdownOpen(false)}
                      className="text-xs text-ocean-600 dark:text-aqua-400 hover:underline"
                    >
                      View all alerts
                    </Link>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-center text-xs text-slate-500">No notifications</p>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationRead(n.id)}
                          className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors ${
                            !n.read ? 'bg-ocean-50/50 dark:bg-ocean-950/30' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">
                              {n.title}
                            </span>
                            <span className="text-[10px] text-slate-400 whitespace-nowrap">
                              {n.time}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                            {n.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-ocean-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            {/* User Profile / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="User profile menu"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-aqua-500"
                  />
                  <span className="hidden lg:inline text-xs font-semibold max-w-[100px] truncate text-slate-800 dark:text-slate-200">
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="font-semibold text-sm truncate">{user.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      {user.role === 'admin' && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded-md bg-ocean-100 text-ocean-800 dark:bg-ocean-950 dark:text-aqua-300">
                          Field Admin
                        </span>
                      )}
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <User className="w-4 h-4" />
                      My Profile & Reports
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-ocean-600 dark:text-aqua-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        Admin Operations Center
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-ocean-800 hover:bg-ocean-700 text-white shadow-sm transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="xl:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-4">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Link
              to="/report"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-red-500 text-white text-xs font-bold shadow-sm"
            >
              <AlertTriangle className="w-4 h-4" />
              Report Issue
            </Link>
            <Link
              to="/map"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-aqua-600 text-white text-xs font-bold shadow-sm"
            >
              <MapPin className="w-4 h-4" />
              Find Safe Tap
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium ${
                    isActive
                      ? 'bg-ocean-50 text-ocean-700 dark:bg-ocean-950 dark:text-aqua-300'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 text-ocean-600 dark:text-aqua-400" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
            <Link
              to="/resources"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <BookOpen className="w-4 h-4 text-ocean-600 dark:text-aqua-400" />
              <span>Articles & PDFs</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <PhoneCall className="w-4 h-4 text-ocean-600 dark:text-aqua-400" />
              <span>Helplines & FAQs</span>
            </Link>
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold text-ocean-700 dark:text-aqua-300 bg-ocean-50 dark:bg-ocean-950/60"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Console</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
