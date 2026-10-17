import React, { useState } from 'react';
import { X, Droplets, ShieldCheck, UserCheck, Mail, Lock, User } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, login } = useData();
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      name: name || (email.split('@')[0].toUpperCase() || 'Civic User'),
      email: email || 'citizen@aquasure.org',
      role: 'citizen',
      region: 'North Zone',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      phone: '+91 98110 00000',
      contributions: 1,
      memberSince: 'October 2026'
    });
  };

  const handleDemoLogin = (role) => {
    if (role === 'admin') {
      login({
        name: "Dr. Alok Verma",
        email: "alok.verma@civic.org",
        role: "admin",
        region: "North Zone",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
        phone: "+91 98112 45890",
        contributions: 32,
        memberSince: "January 2026"
      });
    } else {
      login({
        name: "Aarav Sharma",
        email: "aarav.sharma@aquasure.org",
        role: "citizen",
        region: "Central Valley",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        phone: "+91 98260 11984",
        contributions: 7,
        memberSince: "April 2026"
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
      <div 
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-aqua-400 to-ocean-800 flex items-center justify-center text-white shadow-lg shadow-aqua-500/20 mb-3">
            <Droplets className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            {mode === 'login' ? 'Welcome Back to AquaSure' : 'Create Civic Account'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Access verified community reports, track tickets, and save safe water points.
          </p>
        </div>

        {/* Demo Fast Login Buttons */}
        <div className="space-y-2 mb-6">
          <button
            type="button"
            onClick={() => handleDemoLogin('citizen')}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-aqua-300 dark:border-aqua-900/60 bg-aqua-50/50 dark:bg-aqua-950/30 hover:bg-aqua-100/60 dark:hover:bg-aqua-950/60 transition-all text-left"
          >
            <div className="flex items-center gap-2.5">
              <UserCheck className="w-5 h-5 text-aqua-600 dark:text-aqua-400" />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Quick Login: Aarav Sharma
                </p>
                <p className="text-[10px] text-slate-500">Citizen Volunteer Demo</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-aqua-700 dark:text-aqua-300 bg-white dark:bg-slate-800 px-2 py-1 rounded-md shadow-sm">
              Use Citizen
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleDemoLogin('admin')}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-ocean-300 dark:border-ocean-900/60 bg-ocean-50/50 dark:bg-ocean-950/30 hover:bg-ocean-100/60 dark:hover:bg-ocean-950/60 transition-all text-left"
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-ocean-600 dark:text-aqua-400" />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Quick Login: Dr. Alok Verma
                </p>
                <p className="text-[10px] text-slate-500">Field Operations Admin Demo</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-ocean-700 dark:text-aqua-300 bg-white dark:bg-slate-800 px-2 py-1 rounded-md shadow-sm">
              Use Admin
            </span>
          </button>
        </div>

        <div className="relative flex py-2 items-center mb-4">
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          <span className="flex-shrink mx-3 text-[11px] text-slate-400 font-medium">Or continue with credentials</span>
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. S. Ramanathan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-aqua-500 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-aqua-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-aqua-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-ocean-700 to-aqua-600 hover:from-ocean-800 hover:to-aqua-700 text-white font-bold text-xs shadow-md shadow-aqua-500/20 transition-all mt-2"
          >
            {mode === 'login' ? 'Sign In to Dashboard' : 'Register Account'}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-5 text-center text-xs text-slate-500 dark:text-slate-400">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-aqua-600 dark:text-aqua-400 font-bold hover:underline"
              >
                Sign up free
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-aqua-600 dark:text-aqua-400 font-bold hover:underline"
              >
                Sign in here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
