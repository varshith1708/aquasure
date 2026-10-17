import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Flame, 
  Wrench, 
  Clock, 
  MapPin, 
  Mail, 
  Phone, 
  CheckCircle2, 
  ShieldAlert, 
  X,
  Filter
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function AlertsPage() {
  const { alerts, subscribeAlerts } = useData();

  const [regionFilter, setRegionFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);

  // Subscription Form State
  const [contactType, setContactType] = useState('email'); // 'email' or 'sms'
  const [contactValue, setContactValue] = useState('');
  const [subRegion, setSubRegion] = useState('North Zone');

  const filteredAlerts = alerts.filter(a => {
    const matchReg = regionFilter === 'All' || a.region === regionFilter;
    const matchSev = severityFilter === 'All' || a.severity === severityFilter;
    return matchReg && matchSev;
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!contactValue.trim()) return;
    subscribeAlerts(contactValue, subRegion);
    setSubscribeModalOpen(false);
    setContactValue('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
              <Bell className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Public Water Alerts & Emergency Advisories
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time notices for boil-water orders, chemical pipeline maintenance, and scheduled supply disruptions.
          </p>
        </div>

        <button
          onClick={() => setSubscribeModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-ocean-800 to-aqua-600 hover:from-ocean-700 hover:to-aqua-500 text-white font-bold text-xs shadow-md shadow-aqua-500/20 hover:scale-105 transition-all cursor-pointer shrink-0"
        >
          <Mail className="w-4 h-4" />
          <span>Subscribe to Mobile / Email Alerts</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Filter:
          </span>
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none"
          >
            <option value="All">All Regions</option>
            <option value="North Zone">North Zone</option>
            <option value="Central Valley">Central Valley</option>
            <option value="Coastal District">Coastal District</option>
            <option value="Eastern Highlands">Eastern Highlands</option>
            <option value="Metro South">Metro South</option>
          </select>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical Only (Boil Water)</option>
            <option value="Warning">Warning Only (Maintenance)</option>
            <option value="Info">Info Only (Schedules)</option>
          </select>
        </div>

        <span className="text-xs text-slate-400">
          Showing {filteredAlerts.length} active advisories
        </span>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            No active alerts matching your filter criteria. All monitored water systems operating nominally.
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isCritical = alert.severity === 'Critical';
            const isWarning = alert.severity === 'Warning';

            return (
              <div
                key={alert.id}
                className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                  isCritical
                    ? 'bg-red-50/50 dark:bg-red-950/20 border-red-300 dark:border-red-900/60 shadow-md shadow-red-500/5'
                    : isWarning
                    ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-900/60 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                      isCritical ? 'bg-red-600 text-white' :
                      isWarning ? 'bg-amber-500 text-white' :
                      'bg-ocean-600 text-white'
                    }`}>
                      {alert.severity} ADVISORY
                    </span>
                    <span className="text-xs font-semibold text-slate-500 font-mono">
                      {alert.id} • {alert.region}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Effective: {alert.startDate}</span>
                    <span>→</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{alert.estimatedResolution}</span>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {alert.title}
                  </h3>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
                    {alert.message}
                  </p>

                  {/* Required Public Actions */}
                  <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                    <h4 className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                      Immediate Mandatory Precautionary Steps:
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                      {alert.actions.map((act, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Subscription Modal */}
      {subscribeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 relative">
            <button
              onClick={() => setSubscribeModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-ocean-100 dark:bg-ocean-950 flex items-center justify-center text-ocean-700 dark:text-aqua-300 mb-3">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Subscribe for Urgent Water Alerts
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Receive instant notifications when boil-water orders or contamination hazards are issued in your region.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1">
                  Delivery Channel
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setContactType('email')}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      contactType === 'email'
                        ? 'border-aqua-500 bg-aqua-50 dark:bg-aqua-950/50 text-aqua-900 dark:text-white ring-2 ring-aqua-500'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600'
                    }`}
                  >
                    Email Newsletter
                  </button>
                  <button
                    type="button"
                    onClick={() => setContactType('sms')}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      contactType === 'sms'
                        ? 'border-aqua-500 bg-aqua-50 dark:bg-aqua-950/50 text-aqua-900 dark:text-white ring-2 ring-aqua-500'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600'
                    }`}
                  >
                    SMS Emergency Alert
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1">
                  {contactType === 'email' ? 'Email Address' : 'Mobile Number'}
                </label>
                <input
                  type={contactType === 'email' ? 'email' : 'tel'}
                  required
                  placeholder={contactType === 'email' ? 'yourname@example.com' : '+91 98000 00000'}
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-aqua-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1">
                  Primary Ward / Region
                </label>
                <select
                  value={subRegion}
                  onChange={(e) => setSubRegion(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-semibold"
                >
                  <option value="North Zone">North Zone</option>
                  <option value="Central Valley">Central Valley</option>
                  <option value="Coastal District">Coastal District</option>
                  <option value="Eastern Highlands">Eastern Highlands</option>
                  <option value="Metro South">Metro South</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-ocean-800 to-aqua-600 hover:from-ocean-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Confirm Alert Subscription
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
