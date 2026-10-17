import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Bookmark, 
  AlertTriangle, 
  ShieldCheck, 
  Calendar, 
  Mail, 
  Phone, 
  Trash2, 
  ExternalLink,
  Droplets
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function ProfilePage() {
  const { user, sources, reports, savedSources, toggleSaveSource } = useData();
  const [activeTab, setActiveTab] = useState('saved'); // 'saved' or 'reports'

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <User className="w-12 h-12 mx-auto text-slate-300" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Sign In to Access Your Civic Profile
        </h2>
        <p className="text-xs text-slate-500">
          Save favorite water sources, track submitted reports, and receive personalized alerts.
        </p>
      </div>
    );
  }

  const bookmarkedPoints = sources.filter(s => savedSources.includes(s.id));
  const userReports = reports.slice(0, 5); // display first few reports filed

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-3xl object-cover ring-4 ring-aqua-500/30 shadow-lg"
        />

        <div className="space-y-2 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              {user.name}
            </h1>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-aqua-100 text-aqua-800 dark:bg-aqua-950 dark:text-aqua-300">
              {user.role === 'admin' ? 'Field Administrator' : 'Citizen Hydrologist'}
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            {user.email} • {user.phone} • Based in {user.region}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-500">
            <span>Verified Contributions: <strong>{user.contributions}</strong></span>
            <span>•</span>
            <span>Member Since: <strong>{user.memberSince}</strong></span>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('saved')}
          className={`py-3 px-6 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'saved'
              ? 'border-ocean-800 text-ocean-800 dark:border-aqua-400 dark:text-aqua-400'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Safe Water Points ({bookmarkedPoints.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`py-3 px-6 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'reports'
              ? 'border-ocean-800 text-ocean-800 dark:border-aqua-400 dark:text-aqua-400'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>My Incident Reports & Tracking</span>
        </button>
      </div>

      {/* TAB 1: Saved Water Points */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          {bookmarkedPoints.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              You haven't bookmarked any water sources yet. Explore the Interactive Map and click the bookmark icon on any safe water point.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarkedPoints.map((source) => (
                <div
                  key={source.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      source.status === 'Safe' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {source.status}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                      {source.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      📍 {source.address}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      pH: {source.ph} • TDS: {source.tds} ppm • Chlorine: {source.chlorine} mg/L
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      to={`/map?source=${source.id}`}
                      className="p-2 rounded-xl bg-ocean-50 dark:bg-ocean-950 text-ocean-700 dark:text-aqua-300 hover:bg-ocean-100"
                      title="View on Map"
                    >
                      <MapPin className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => toggleSaveSource(source.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: My Reports */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            {userReports.map((rep) => (
              <div key={rep.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-ocean-700 dark:text-aqua-300">
                      {rep.id}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      rep.severity === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {rep.severity}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {rep.categoryLabel}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {rep.location}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Status: {rep.status}
                  </span>
                  <Link
                    to={`/report?ticket=${rep.id}`}
                    className="px-3.5 py-1.5 rounded-xl bg-ocean-800 text-white font-bold text-xs hover:bg-ocean-700"
                  >
                    Track Progress
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
