import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  AlertTriangle, 
  Upload, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Search, 
  FileText, 
  User, 
  Phone, 
  X, 
  ChevronRight,
  ShieldAlert,
  Droplets,
  ArrowRight
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function ReportPage() {
  const { reports, addReport, showToast } = useData();
  const [searchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState('new'); // 'new' or 'track'
  const [ticketSearch, setTicketSearch] = useState('');
  const [trackedReport, setTrackedReport] = useState(null);

  // Form State
  const [category, setCategory] = useState('contamination');
  const [region, setRegion] = useState('North Zone');
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState('High');
  const [affectedCount, setAffectedCount] = useState(150);
  const [description, setDescription] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [reporterContact, setReporterContact] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Read location param if passed from map
  useEffect(() => {
    const locParam = searchParams.get('location');
    if (locParam) {
      setLocation(locParam);
    }
    const ticketParam = searchParams.get('ticket');
    if (ticketParam) {
      setActiveTab('track');
      setTicketSearch(ticketParam);
      const found = reports.find(r => r.id.toLowerCase() === ticketParam.toLowerCase());
      if (found) setTrackedReport(found);
    }
  }, [searchParams, reports]);

  const categoryLabels = {
    contamination: "Water Contamination / Discoloration",
    leakage: "Pipeline Leakage / Burst",
    broken_pump: "Broken Hand Pump / Borewell",
    no_supply: "No Water Supply / Extended Drought",
    sanitation: "Sanitation / Public Toilet Failure"
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location.trim() || !description.trim()) {
      showToast("Please provide incident location and description", "warning");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newRep = addReport({
        type: category,
        categoryLabel: categoryLabels[category],
        region,
        location,
        coordinates: region === 'North Zone' ? [28.63, 77.21] :
                     region === 'Central Valley' ? [23.25, 77.41] :
                     region === 'Coastal District' ? [13.06, 80.25] :
                     region === 'Eastern Highlands' ? [22.57, 88.36] : [12.97, 77.59],
        severity,
        affectedCount: Number(affectedCount),
        description,
        reporterName: reporterName || "Anonymous Citizen",
        reporterContact: reporterContact || "Not provided",
        photo: photoPreview
      });

      setIsSubmitting(false);
      setTrackedReport(newRep);
      setTicketSearch(newRep.id);
      setActiveTab('track');
      // Reset form
      setDescription('');
      setPhotoPreview(null);
    }, 600);
  };

  const handleTrackSearch = (e) => {
    e.preventDefault();
    const query = ticketSearch.trim().toUpperCase();
    const found = reports.find(r => r.id.toUpperCase() === query);
    if (found) {
      setTrackedReport(found);
    } else {
      showToast(`No ticket found matching "${ticketSearch}"`, 'warning');
      setTrackedReport(null);
    }
  };

  const getStatusStepIndex = (status) => {
    switch (status) {
      case 'Submitted': return 0;
      case 'In Review': return 1;
      case 'In Progress': return 2;
      case 'Resolved': return 3;
      default: return 0;
    }
  };

  const stages = [
    { title: "Submitted", desc: "Report received & logged in civic database" },
    { title: "In Review", desc: "Assigned to zonal sanitary inspector" },
    { title: "In Progress", desc: "Field maintenance crew dispatched" },
    { title: "Resolved", desc: "Problem rectified & water quality verified" }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 text-xs font-bold mb-3">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Civic Incident Response Protocol</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Report a Water or Sanitation Hazard
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
          Your report alerts municipal engineers and nearby citizens. Every report receives an unforgeable ticket ID for transparent public tracking.
        </p>

        {/* Tab Switcher */}
        <div className="flex justify-center mt-6">
          <div className="p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center">
            <button
              onClick={() => setActiveTab('new')}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'new'
                  ? 'bg-white dark:bg-slate-900 text-ocean-800 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              File New Incident Report
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'track'
                  ? 'bg-white dark:bg-slate-900 text-ocean-800 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Track Existing Ticket
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: New Report Form */}
      {activeTab === 'new' && (
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          
          {/* Issue Category Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-2">
              1. Type of Hazard
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { id: 'contamination', label: 'Water Contamination / Smell', icon: '☣️' },
                { id: 'leakage', label: 'Pipeline Leakage / Burst', icon: '💦' },
                { id: 'broken_pump', label: 'Broken Hand Pump / Well', icon: '⚙️' },
                { id: 'no_supply', label: 'No Supply / Tank Dry', icon: '🏜️' },
                { id: 'sanitation', label: 'Sanitation / Toilet Failure', icon: '🚻' }
              ].map(cat => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    category === cat.id
                      ? 'border-ocean-600 bg-ocean-50/70 dark:bg-ocean-950/60 ring-2 ring-ocean-500 text-ocean-900 dark:text-aqua-300 font-bold'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className="text-xs">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Region & Location Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-2">
                Region
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-aqua-500 font-semibold"
              >
                <option value="North Zone">North Zone</option>
                <option value="Central Valley">Central Valley</option>
                <option value="Coastal District">Coastal District</option>
                <option value="Eastern Highlands">Eastern Highlands</option>
                <option value="Metro South">Metro South</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-2">
                Street Address / Landmark
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Near Community Hall, Sector 12 Market..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-aqua-500"
                />
              </div>
            </div>
          </div>

          {/* Severity & Affected Population */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-2">
                Severity Level
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['Low', 'Medium', 'High', 'Critical'].map(sev => (
                  <button
                    type="button"
                    key={sev}
                    onClick={() => setSeverity(sev)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      severity === sev
                        ? sev === 'Critical' ? 'bg-red-600 text-white' :
                          sev === 'High' ? 'bg-orange-500 text-white' :
                          sev === 'Medium' ? 'bg-amber-500 text-white' :
                          'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                {severity === 'Critical' ? 'Severe hazard: Contamination causing nausea or total water outage' :
                 severity === 'High' ? 'Substantial hazard: High risk of infection or widespread pipe burst' :
                 severity === 'Medium' ? 'Moderate issue: Leaks, low pressure, foul odor' :
                 'Minor issue: Slow dripping valve or minor maintenance'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-2">
                Estimated Affected People: <span className="text-ocean-600 dark:text-aqua-400 font-bold">{affectedCount}</span>
              </label>
              <input
                type="range"
                min="10"
                max="5000"
                step="25"
                value={affectedCount}
                onChange={(e) => setAffectedCount(e.target.value)}
                className="w-full accent-aqua-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>10 (Single home)</span>
                <span>1,000 (Neighborhood)</span>
                <span>5,000+ (Whole ward)</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-2">
              Incident Description & Observable Symptoms
            </label>
            <textarea
              required
              rows={3}
              placeholder="Describe what you see or smell: is water discolored, does it have an oily sheen or chlorine stench? Have people fallen sick?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-aqua-500 leading-relaxed"
            />
          </div>

          {/* Photo Upload with Preview */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-2">
              Attach Photo Evidence (Optional)
            </label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-colors">
                <Upload className="w-4 h-4 text-aqua-600 dark:text-aqua-400" />
                <span>Upload Incident Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              {photoPreview && (
                <div className="relative">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-14 h-14 rounded-xl object-cover ring-2 ring-aqua-500 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setPhotoPreview(null)}
                    className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 shadow"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Reporter Contact Info */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Ramesh Patel"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Phone Number (For SMS Status Updates)
              </label>
              <input
                type="tel"
                placeholder="+91 98000 00000"
                value={reporterContact}
                onChange={(e) => setReporterContact(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-ocean-800 to-aqua-600 hover:from-red-700 hover:to-aqua-700 text-white font-extrabold text-sm shadow-xl shadow-red-500/10 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <ShieldAlert className="w-5 h-5" />
            <span>{isSubmitting ? "Submitting to Civic Network..." : "Submit Verified Incident Ticket"}</span>
          </button>

        </form>
      )}

      {/* TAB 2: Track Existing Ticket */}
      {activeTab === 'track' && (
        <div className="space-y-6">
          
          {/* Search Box */}
          <form onSubmit={handleTrackSearch} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Enter Ticket ID (e.g. AQ-2026-1001, AQ-2026-1002)..."
              value={ticketSearch}
              onChange={(e) => setTicketSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none font-mono"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-ocean-800 hover:bg-ocean-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Track Ticket
            </button>
          </form>

          {/* Tracked Ticket Card */}
          {trackedReport ? (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 animate-in fade-in">
              
              {/* Ticket Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-ocean-600 dark:text-aqua-400 bg-ocean-50 dark:bg-ocean-950 px-2.5 py-1 rounded-lg">
                      {trackedReport.id}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      trackedReport.severity === 'Critical' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' :
                      trackedReport.severity === 'High' ? 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300' :
                      'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {trackedReport.severity} Severity
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                    {trackedReport.categoryLabel}
                  </h3>
                  <p className="text-xs text-slate-400">
                    📍 {trackedReport.location} • Logged on {new Date(trackedReport.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="sm:text-right">
                  <span className="text-[11px] text-slate-400 block">Assigned Officer</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {trackedReport.assignedOfficer}
                  </span>
                </div>
              </div>

              {/* Visual 4-Step Status Stepper */}
              <div className="py-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {stages.map((stage, idx) => {
                    const activeIndex = getStatusStepIndex(trackedReport.status);
                    const isDone = idx <= activeIndex;
                    const isCurrent = idx === activeIndex;

                    return (
                      <div
                        key={stage.title}
                        className={`p-4 rounded-2xl border text-center transition-all ${
                          isDone
                            ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 opacity-60'
                        }`}
                      >
                        <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-black mb-2 ${
                          isDone
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                        }`}>
                          {isDone ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                        </div>
                        <h4 className={`text-xs font-bold ${isCurrent ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}`}>
                          {stage.title}
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                          {stage.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Description & Photo */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="md:col-span-2 space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Reported Observation
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl">
                    "{trackedReport.description}"
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Estimated Affected Households: <strong>{trackedReport.affectedCount}</strong>
                  </p>
                </div>

                {trackedReport.photo && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Photo Evidence
                    </h4>
                    <img
                      src={trackedReport.photo}
                      alt="Incident Evidence"
                      className="w-full h-36 rounded-2xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 shadow-sm"
                    />
                  </div>
                )}
              </div>

              {/* Timeline Updates Log */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Official Investigation Timeline
                </h4>
                <div className="space-y-3 pl-2 border-l-2 border-aqua-500">
                  {trackedReport.timeline.map((item, idx) => (
                    <div key={idx} className="relative pl-4 text-xs">
                      <span className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-aqua-500 ring-4 ring-white dark:ring-slate-900"></span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">{item.status}</span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(item.time).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 mt-0.5">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4">
              <FileText className="w-10 h-10 mx-auto text-slate-300" />
              <div>
                <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
                  Search or select an active ticket to view real-time status.
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Try one of our recent verified tickets below:
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {reports.slice(0, 4).map(r => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setTicketSearch(r.id);
                      setTrackedReport(r);
                    }}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-ocean-50 text-xs font-mono font-bold text-ocean-700 dark:text-aqua-300 transition-colors"
                  >
                    {r.id} ({r.categoryLabel.split(' ')[0]})
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
