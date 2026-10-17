import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Plus, 
  Download, 
  Search, 
  MapPin, 
  CheckCircle2, 
  X, 
  FileText, 
  Activity, 
  Users, 
  LogIn 
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function AdminPage() {
  const { 
    user, 
    login, 
    reports, 
    sources, 
    updateReportStatus, 
    addWaterSource, 
    showToast 
  } = useData();

  const [reportFilterStatus, setReportFilterStatus] = useState('All');
  const [reportSearch, setReportSearch] = useState('');
  const [selectedReportForUpdate, setSelectedReportForUpdate] = useState(null);
  const [newStatus, setNewStatus] = useState('In Progress');
  const [officerNote, setOfficerNote] = useState('');

  // Add Water Source Modal
  const [addSourceModalOpen, setAddSourceModalOpen] = useState(false);
  const [newSource, setNewSource] = useState({
    name: '',
    type: 'public_tap',
    region: 'North Zone',
    lat: '28.6300',
    lng: '77.2100',
    status: 'Safe',
    ph: 7.2,
    turbidity: 1.0,
    tds: 220,
    chlorine: 0.5,
    bacteria: 0,
    servingPopulation: 2500,
    address: '',
    notes: 'Installed with multi-stage pre-filtration.'
  });

  const isAdmin = user?.role === 'admin';

  // Metrics
  const metrics = useMemo(() => {
    const totalReports = reports.length;
    const resolved = reports.filter(r => r.status === 'Resolved').length;
    const inProgress = reports.filter(r => r.status === 'In Progress' || r.status === 'In Review').length;
    const totalSources = sources.length;
    return {
      totalReports,
      resolved,
      inProgress,
      totalSources,
      resolutionRate: totalReports > 0 ? Math.round((resolved / totalReports) * 100) : 0
    };
  }, [reports, sources]);

  // Filtered reports
  const filteredReports = useMemo(() => {
    return reports.filter(r => {
      const matchStatus = reportFilterStatus === 'All' || r.status === reportFilterStatus;
      const matchSearch = reportSearch === '' ||
        r.id.toLowerCase().includes(reportSearch.toLowerCase()) ||
        r.location.toLowerCase().includes(reportSearch.toLowerCase()) ||
        r.categoryLabel.toLowerCase().includes(reportSearch.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [reports, reportFilterStatus, reportSearch]);

  const handleUpdateStatusSubmit = (e) => {
    e.preventDefault();
    if (!selectedReportForUpdate) return;
    updateReportStatus(selectedReportForUpdate.id, newStatus, officerNote);
    setSelectedReportForUpdate(null);
    setOfficerNote('');
  };

  const handleCreateSourceSubmit = (e) => {
    e.preventDefault();
    if (!newSource.name.trim() || !newSource.address.trim()) {
      showToast("Please provide source name and address", "warning");
      return;
    }

    addWaterSource({
      name: newSource.name,
      type: newSource.type,
      region: newSource.region,
      coordinates: [parseFloat(newSource.lat), parseFloat(newSource.lng)],
      status: newSource.status,
      ph: parseFloat(newSource.ph),
      turbidity: parseFloat(newSource.turbidity),
      tds: parseInt(newSource.tds),
      chlorine: parseFloat(newSource.chlorine),
      bacteria: parseInt(newSource.bacteria),
      servingPopulation: parseInt(newSource.servingPopulation),
      address: newSource.address,
      notes: newSource.notes
    });

    setAddSourceModalOpen(false);
    setNewSource({
      name: '',
      type: 'public_tap',
      region: 'North Zone',
      lat: '28.6300',
      lng: '77.2100',
      status: 'Safe',
      ph: 7.2,
      turbidity: 1.0,
      tds: 220,
      chlorine: 0.5,
      bacteria: 0,
      servingPopulation: 2500,
      address: '',
      notes: ''
    });
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ sources, reports }, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `AquaSure_Full_Export_${new Date().toISOString().split('T')[0]}.json`);
    dlAnchorElem.click();
    showToast("Full data exported as JSON successfully!", "success");
  };

  // If not admin, show login mock prompt
  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-ocean-100 dark:bg-ocean-950 flex items-center justify-center text-ocean-700 dark:text-aqua-300 shadow-md">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Admin Operations Access
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            This module requires field administrator privileges to manage incident workflows and modify water source databases.
          </p>
        </div>
        <button
          onClick={() => {
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
          }}
          className="w-full py-3.5 rounded-2xl bg-ocean-800 hover:bg-ocean-700 text-white font-bold text-xs shadow-xl shadow-ocean-800/20 transition-all flex items-center justify-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          <span>Sign In As Demo Field Admin</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-ocean-100 text-ocean-800 dark:bg-ocean-950 dark:text-aqua-300">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Field Operations & Incident Management
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Logged in as <strong>{user.name}</strong> ({user.role.toUpperCase()}) • Live Municipal Water Grid Control
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setAddSourceModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Water Source</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 font-bold text-xs shadow-sm transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Reports</span>
          <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{metrics.totalReports}</p>
        </div>
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">Active In-Progress</span>
          <p className="text-3xl font-black text-amber-500 mt-1">{metrics.inProgress}</p>
        </div>
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Resolved Tickets</span>
          <p className="text-3xl font-black text-emerald-500 mt-1">{metrics.resolved}</p>
        </div>
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-ocean-600 dark:text-aqua-400 uppercase tracking-wider">Monitored Sources</span>
          <p className="text-3xl font-black text-ocean-700 dark:text-aqua-300 mt-1">{metrics.totalSources}</p>
        </div>
      </div>

      {/* Reports Incident Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Citizen Incident Reports Dispatch ({filteredReports.length})
            </h3>
            <p className="text-xs text-slate-400">Click 'Update Status' to change workflow phase or add inspector findings.</p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={reportFilterStatus}
              onChange={(e) => setReportFilterStatus(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="In Review">In Review</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search ticket or location..."
                value={reportSearch}
                onChange={(e) => setReportSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none text-slate-800 dark:text-slate-200 w-44"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Ticket</th>
                <th className="py-3 px-3">Hazard Category</th>
                <th className="py-3 px-3">Region & Location</th>
                <th className="py-3 px-3">Severity</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Reporter</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredReports.slice(0, 15).map((rep) => (
                <tr key={rep.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono font-bold text-ocean-700 dark:text-aqua-300">
                    {rep.id}
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">
                    {rep.categoryLabel}
                  </td>
                  <td className="py-3 px-3 text-slate-500 truncate max-w-xs">
                    {rep.location}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      rep.severity === 'Critical' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' :
                      rep.severity === 'High' ? 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300' :
                      'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {rep.severity}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-700 dark:text-slate-300">
                    {rep.status}
                  </td>
                  <td className="py-3 px-3 text-slate-400">
                    {rep.reporterName}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedReportForUpdate(rep);
                        setNewStatus(rep.status);
                      }}
                      className="px-3 py-1 rounded-lg bg-ocean-50 dark:bg-ocean-950 hover:bg-ocean-100 text-ocean-800 dark:text-aqua-300 font-bold text-[11px] transition-colors"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Modal: Update Ticket Status */}
      {selectedReportForUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 relative">
            <button
              onClick={() => setSelectedReportForUpdate(null)}
              className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Update Incident Status: {selectedReportForUpdate.id}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {selectedReportForUpdate.categoryLabel} at {selectedReportForUpdate.location}
            </p>

            <form onSubmit={handleUpdateStatusSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1">
                  Change Workflow Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white"
                >
                  <option value="Submitted">Submitted (Pending Inspection)</option>
                  <option value="In Review">In Review (Lab Sample Dispatched)</option>
                  <option value="In Progress">In Progress (Repair Crew On-Site)</option>
                  <option value="Resolved">Resolved (Water Tested Safe)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1">
                  Officer Field Notes
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Primary valve repaired; chlorine residual restored to 0.5 mg/L."
                  value={officerNote}
                  onChange={(e) => setOfficerNote(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-ocean-800 hover:bg-ocean-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Save & Broadcast Update
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add New Water Source */}
      {addSourceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setAddSourceModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">
              Add New Water Source to Public Map
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Enter official GPS coordinates and water quality parameters.
            </p>

            <form onSubmit={handleCreateSourceSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Source Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Okhla Phase III Community Tap"
                  value={newSource.name}
                  onChange={(e) => setNewSource({ ...newSource, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Source Type</label>
                  <select
                    value={newSource.type}
                    onChange={(e) => setNewSource({ ...newSource, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
                  >
                    <option value="public_tap">Public Standpost Tap</option>
                    <option value="treatment_plant">Treatment Plant</option>
                    <option value="borewell">Deep Borewell</option>
                    <option value="sanitation">Sanitation Hub / Latrine</option>
                    <option value="spring">Mountain Spring</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Region</label>
                  <select
                    value={newSource.region}
                    onChange={(e) => setNewSource({ ...newSource, region: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
                  >
                    <option value="North Zone">North Zone</option>
                    <option value="Central Valley">Central Valley</option>
                    <option value="Coastal District">Coastal District</option>
                    <option value="Eastern Highlands">Eastern Highlands</option>
                    <option value="Metro South">Metro South</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Latitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    required
                    value={newSource.lat}
                    onChange={(e) => setNewSource({ ...newSource, lat: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Longitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    required
                    value={newSource.lng}
                    onChange={(e) => setNewSource({ ...newSource, lng: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              {/* Quality Parameters */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <label className="block font-semibold text-slate-500 mb-1">pH</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newSource.ph}
                    onChange={(e) => setNewSource({ ...newSource, ph: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-500 mb-1">Turbidity (NTU)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newSource.turbidity}
                    onChange={(e) => setNewSource({ ...newSource, turbidity: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-500 mb-1">TDS (ppm)</label>
                  <input
                    type="number"
                    value={newSource.tds}
                    onChange={(e) => setNewSource({ ...newSource, tds: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Near Metro Pillar 128, Industrial Area"
                  value={newSource.address}
                  onChange={(e) => setNewSource({ ...newSource, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer mt-4"
              >
                Register & Publish Water Source
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
