import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  Download, 
  Filter, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  AlertTriangle, 
  XCircle, 
  Droplets, 
  Search, 
  Info,
  ChevronDown
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { useData } from '../context/DataContext';

export default function DashboardPage() {
  const { sources, showToast } = useData();

  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedDateRange, setSelectedDateRange] = useState('30d');
  const [searchTable, setSearchTable] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');

  const regions = ['All', 'North Zone', 'Central Valley', 'Coastal District', 'Eastern Highlands', 'Metro South'];

  // Filter sources by region
  const filteredSources = useMemo(() => {
    return sources.filter(s => {
      const matchRegion = selectedRegion === 'All' || s.region === selectedRegion;
      const matchStatus = selectedStatusFilter === 'All' || s.status === selectedStatusFilter;
      const matchSearch = searchTable === '' ||
        s.name.toLowerCase().includes(searchTable.toLowerCase()) ||
        s.address.toLowerCase().includes(searchTable.toLowerCase()) ||
        s.id.toLowerCase().includes(searchTable.toLowerCase());
      return matchRegion && matchStatus && matchSearch;
    });
  }, [sources, selectedRegion, selectedStatusFilter, searchTable]);

  // Status counts
  const statusCounts = useMemo(() => {
    const total = filteredSources.length;
    const safe = filteredSources.filter(s => s.status === 'Safe').length;
    const caution = filteredSources.filter(s => s.status === 'Caution').length;
    const unsafe = filteredSources.filter(s => s.status === 'Unsafe').length;
    return {
      total,
      safe,
      caution,
      unsafe,
      safePercentage: total > 0 ? Math.round((safe / total) * 100) : 0
    };
  }, [filteredSources]);

  // Aggregate averages
  const averages = useMemo(() => {
    if (filteredSources.length === 0) return { ph: 0, turbidity: 0, tds: 0, chlorine: 0, bacteria: 0 };
    const sum = filteredSources.reduce((acc, curr) => ({
      ph: acc.ph + curr.ph,
      turbidity: acc.turbidity + curr.turbidity,
      tds: acc.tds + curr.tds,
      chlorine: acc.chlorine + curr.chlorine,
      bacteria: acc.bacteria + curr.bacteria
    }), { ph: 0, turbidity: 0, tds: 0, chlorine: 0, bacteria: 0 });

    const len = filteredSources.length;
    return {
      ph: (sum.ph / len).toFixed(1),
      turbidity: (sum.turbidity / len).toFixed(1),
      tds: Math.round(sum.tds / len),
      chlorine: (sum.chlorine / len).toFixed(2),
      bacteria: Math.round(sum.bacteria / len)
    };
  }, [filteredSources]);

  // Trend data for charts (mock simulated temporal data across 7 weeks)
  const trendData = useMemo(() => {
    const weeks = ['W1 (Sep 1)', 'W2 (Sep 8)', 'W3 (Sep 15)', 'W4 (Sep 22)', 'W5 (Sep 29)', 'W6 (Oct 6)', 'W7 (Oct 13)'];
    return weeks.map((w, idx) => ({
      week: w,
      ph: Number((7.1 + Math.sin(idx + (selectedRegion === 'All' ? 0 : 2)) * 0.4).toFixed(2)),
      turbidity: Number((1.8 + Math.cos(idx * 0.9) * 0.8).toFixed(1)),
      tds: Math.round(260 + Math.sin(idx * 1.2) * 50),
      chlorine: Number((0.55 - Math.sin(idx * 0.5) * 0.15).toFixed(2)),
      bacteria: Math.max(0, Math.round(4 + Math.sin(idx * 2) * 6))
    }));
  }, [selectedRegion]);

  // TDS distribution across sources for bar chart
  const tdsComparisonData = useMemo(() => {
    return filteredSources.slice(0, 10).map(s => ({
      name: s.name.length > 16 ? s.name.substring(0, 14) + '...' : s.name,
      tds: s.tds,
      status: s.status
    }));
  }, [filteredSources]);

  // CSV Export Function
  const handleDownloadCSV = () => {
    if (filteredSources.length === 0) {
      showToast("No data to export", "warning");
      return;
    }

    const headers = ["Source ID", "Name", "Type", "Region", "Status", "pH", "Turbidity (NTU)", "TDS (ppm)", "Free Chlorine (mg/L)", "Coliform Bacteria (CFU/100ml)", "Last Tested", "Serving Population", "Address"];
    const rows = filteredSources.map(s => [
      `"${s.id}"`,
      `"${s.name}"`,
      `"${s.type}"`,
      `"${s.region}"`,
      `"${s.status}"`,
      s.ph,
      s.turbidity,
      s.tds,
      s.chlorine,
      s.bacteria,
      `"${s.lastTested}"`,
      s.servingPopulation,
      `"${s.address}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AquaSure_Water_Quality_Report_${selectedRegion.replace(' ', '_')}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("CSV report generated and downloaded successfully!", "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-ocean-100 text-ocean-800 dark:bg-ocean-950 dark:text-aqua-300">
              <Activity className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Water Quality Analytics Dashboard
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time chemical & microbiological monitoring based on World Health Organization (WHO) potable standards.
          </p>
        </div>

        {/* Global Filter Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Region Dropdown */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs shadow-sm">
            <MapPin className="w-4 h-4 text-aqua-600 dark:text-aqua-400" />
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-transparent font-semibold focus:outline-none cursor-pointer text-slate-800 dark:text-slate-200"
            >
              {regions.map(r => (
                <option key={r} value={r} className="dark:bg-slate-900">
                  {r === 'All' ? 'All 5 Regions' : r}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Dropdown */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs shadow-sm">
            <Calendar className="w-4 h-4 text-ocean-600 dark:text-aqua-400" />
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="bg-transparent font-semibold focus:outline-none cursor-pointer text-slate-800 dark:text-slate-200"
            >
              <option value="7d" className="dark:bg-slate-900">Last 7 Days</option>
              <option value="30d" className="dark:bg-slate-900">Last 30 Days</option>
              <option value="90d" className="dark:bg-slate-900">Last 90 Days</option>
              <option value="ytd" className="dark:bg-slate-900">Year to Date (2026)</option>
            </select>
          </div>

          {/* Download CSV button */}
          <button
            onClick={handleDownloadCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-aqua-600 hover:bg-aqua-500 text-white font-bold text-xs shadow-md shadow-aqua-600/20 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Safety Score & Status Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Safety Index */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-ocean-800 to-ocean-950 text-white shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-aqua-300 uppercase tracking-wider">
              Water Safety Index
            </span>
            <ShieldCheck className="w-5 h-5 text-aqua-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-white">
              {statusCounts.safePercentage}%
            </span>
            <span className="text-xs text-aqua-200">
              Compliant Sources
            </span>
          </div>
          <p className="text-[11px] text-slate-300 mt-2">
            {statusCounts.safe} of {statusCounts.total} monitored sites meet strict potable benchmarks.
          </p>
        </div>

        {/* Card 2: Safe Points */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-200/80 dark:border-emerald-950 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Potable (Safe)
            </span>
            <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              {statusCounts.safe}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Directly safe for consumption</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Caution Points */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-amber-200/80 dark:border-amber-950 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Under Caution
            </span>
            <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              {statusCounts.caution}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Boiling / Filtration advised</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Unsafe Points */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-red-200/80 dark:border-red-950 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
              Hazardous (Unsafe)
            </span>
            <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              {statusCounts.unsafe}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Red alert; DO NOT consume</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/60 flex items-center justify-center text-red-600 dark:text-red-400">
            <XCircle className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Key Water Parameters Averages Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Avg pH Level</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{averages.ph}</span>
            <span className="text-[10px] text-slate-400">pH</span>
          </div>
          <span className="inline-block mt-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded">
            Target: 6.5 - 8.5
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Avg Turbidity</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{averages.turbidity}</span>
            <span className="text-[10px] text-slate-400">NTU</span>
          </div>
          <span className="inline-block mt-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded">
            Target: &lt; 5.0 NTU
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Avg Total Dissolved Solids</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{averages.tds}</span>
            <span className="text-[10px] text-slate-400">ppm</span>
          </div>
          <span className="inline-block mt-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded">
            Target: &lt; 500 ppm
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Free Chlorine</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{averages.chlorine}</span>
            <span className="text-[10px] text-slate-400">mg/L</span>
          </div>
          <span className="inline-block mt-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded">
            Target: 0.2 - 1.0 mg/L
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm col-span-2 sm:col-span-1">
          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Bacteria (Coliform)</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className={`text-2xl font-black ${averages.bacteria > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
              {averages.bacteria}
            </span>
            <span className="text-[10px] text-slate-400">CFU/100ml</span>
          </div>
          <span className={`inline-block mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded ${
            averages.bacteria === 0 ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50' : 'text-red-600 bg-red-50 dark:bg-red-950/50'
          }`}>
            Target: 0 CFU/100ml
          </span>
        </div>

      </div>

      {/* Charts Section: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Multi-parameter Trend Graph */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Multi-Week Parameter Trends ({selectedRegion})
              </h3>
              <p className="text-xs text-slate-400">pH and Turbidity readings across temporal checkpoints</p>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded bg-ocean-50 text-ocean-800 dark:bg-ocean-950 dark:text-aqua-300 font-bold">
              7-Week Window
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="phGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#14B8A6" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="turbGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="5%" stopColor="#0A4D8C" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#0A4D8C" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} domain={[0, 10]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="ph" name="pH Value" stroke="#14B8A6" fillOpacity={1} fill="url(#phGrad)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="turbidity" name="Turbidity (NTU)" stroke="#0A4D8C" fillOpacity={1} fill="url(#turbGrad)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: TDS Distribution by Source */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Total Dissolved Solids (TDS) Comparison
              </h3>
              <p className="text-xs text-slate-400">PPM levels across top sampled water points (Safe &lt; 500 ppm)</p>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded bg-aqua-50 text-aqua-800 dark:bg-aqua-950 dark:text-aqua-300 font-bold">
              WHO Metric
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tdsComparisonData} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" angle={-25} textAnchor="end" tick={{ fontSize: 9 }} interval={0} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }} />
                <Bar dataKey="tds" name="TDS (ppm)" fill="#0c8ee9" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Comprehensive Water Sources Table with Filter & Search */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Monitored Water Sources Table ({filteredSources.length} Points)
            </h3>
            <p className="text-xs text-slate-400">Click headers or use filters to inspect field testing data</p>
          </div>

          <div className="flex items-center gap-2">
            {/* Status quick filter */}
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Safe">Safe Only</option>
              <option value="Caution">Caution Only</option>
              <option value="Unsafe">Unsafe Only</option>
            </select>

            {/* Table Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search table..."
                value={searchTable}
                onChange={(e) => setSearchTable(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-aqua-500 text-slate-800 dark:text-slate-200 w-44"
              />
            </div>
          </div>
        </div>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">ID & Source</th>
                <th className="py-3 px-3">Region</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">pH</th>
                <th className="py-3 px-3">Turbidity</th>
                <th className="py-3 px-3">TDS (ppm)</th>
                <th className="py-3 px-3">Chlorine</th>
                <th className="py-3 px-3">Bacteria</th>
                <th className="py-3 px-4">Serving Pop.</th>
                <th className="py-3 px-4">Tested</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredSources.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-400">
                    No water sources found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredSources.map((source) => (
                  <tr key={source.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {source.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {source.id} • {source.type.replace('_', ' ')}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                      {source.region}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        source.status === 'Safe' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                        source.status === 'Caution' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                        'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                      }`}>
                        {source.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-700 dark:text-slate-300">
                      {source.ph}
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-700 dark:text-slate-300">
                      {source.turbidity} NTU
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-700 dark:text-slate-300">
                      {source.tds}
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-700 dark:text-slate-300">
                      {source.chlorine} mg/L
                    </td>
                    <td className="py-3 px-3">
                      <span className={`font-semibold ${source.bacteria > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                        {source.bacteria} CFU
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {source.servingPopulation.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                      {source.lastTested}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
