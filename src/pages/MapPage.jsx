import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, 
  Navigation, 
  Filter, 
  ShieldCheck, 
  AlertTriangle, 
  Bookmark, 
  Check, 
  Search, 
  Layers, 
  Compass, 
  Info,
  Droplets,
  ExternalLink,
  Clock
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function MapPage() {
  const { sources, reports, savedSources, toggleSaveSource, showToast } = useData();
  const [searchParams] = useSearchParams();
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [nearestInfo, setNearestInfo] = useState(null);

  // Region Center Coordinates
  const regionCoordinates = {
    'All': [20.5937, 78.9629], // All India center view
    'North Zone': [28.63, 77.21],
    'Central Valley': [23.25, 77.41],
    'Coastal District': [13.06, 80.25],
    'Eastern Highlands': [22.57, 88.36],
    'Metro South': [12.97, 77.59]
  };

  // Helper: Haversine distance in km
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // 1. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [20.5937, 78.9629],
        zoom: 5,
        zoomControl: true,
        attributionControl: false
      });

      // Add OpenStreetMap Tile Layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      // Attribution
      L.control.attribution({ position: 'bottomright' })
        .addAttribution('&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> | AquaSure Civic Data')
        .addTo(map);

      // Marker Group
      const markersLayer = L.layerGroup().addTo(map);
      markersLayerRef.current = markersLayer;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. Render Markers on Map
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layer = markersLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    // Custom marker icon builder
    const createCustomIcon = (status, type) => {
      let bg = '#10B981'; // Green for Safe
      if (status === 'Caution') bg = '#F59E0B'; // Amber
      if (status === 'Unsafe') bg = '#EF4444'; // Red

      let symbol = '💧';
      if (type === 'treatment_plant') symbol = '🏭';
      if (type === 'sanitation') symbol = '🚻';
      if (type === 'public_tap') symbol = '🚰';
      if (type === 'problem') symbol = '⚠️';

      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            background-color: ${bg};
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            border: 2.5px solid white;
            cursor: pointer;
            transition: transform 0.2s;
          " onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">
            ${symbol}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18]
      });
    };

    // Filter water sources
    const matchedSources = sources.filter(s => {
      const matchType = typeFilter === 'All' || s.type === typeFilter;
      const matchStatus = statusFilter === 'All' || s.status === statusFilter;
      const matchRegion = regionFilter === 'All' || s.region === regionFilter;
      return matchType && matchStatus && matchRegion;
    });

    matchedSources.forEach(s => {
      const icon = createCustomIcon(s.status, s.type);
      const marker = L.marker(s.coordinates, { icon }).addTo(layer);

      marker.on('click', () => {
        setSelectedItem(s);
      });

      marker.bindTooltip(`<b>${s.name}</b><br/><span style="color:${s.status === 'Safe' ? '#10B981' : s.status === 'Caution' ? '#F59E0B' : '#EF4444'}">${s.status}</span> • ${s.region}`, {
        direction: 'top',
        offset: [0, -12]
      });
    });

    // Also plot Active Problem Areas from reports if enabled
    if (typeFilter === 'All' || typeFilter === 'problem') {
      const matchedReports = reports.filter(r => {
        const matchRegion = regionFilter === 'All' || r.region === regionFilter;
        return matchRegion && r.status !== 'Resolved';
      });

      matchedReports.slice(0, 20).forEach(r => {
        const icon = createCustomIcon('Unsafe', 'problem');
        const marker = L.marker(r.coordinates, { icon }).addTo(layer);

        marker.on('click', () => {
          setSelectedItem({
            id: r.id,
            name: `${r.categoryLabel} Hazard`,
            type: 'problem',
            region: r.region,
            status: 'Unsafe',
            address: r.location,
            notes: r.description,
            severity: r.severity,
            ticketStatus: r.status,
            reportedAt: r.createdAt
          });
        });

        marker.bindTooltip(`<b>⚠️ Issue: ${r.categoryLabel}</b><br/>${r.location} (${r.severity})`, {
          direction: 'top',
          offset: [0, -12]
        });
      });
    }

  }, [sources, reports, typeFilter, statusFilter, regionFilter]);

  // 3. Pan on Region Change
  const handleRegionChange = (newRegion) => {
    setRegionFilter(newRegion);
    const coords = regionCoordinates[newRegion];
    if (mapInstanceRef.current && coords) {
      const zoom = newRegion === 'All' ? 5 : 12;
      mapInstanceRef.current.flyTo(coords, zoom, { duration: 1.5 });
    }
  };

  // 4. Check for URL query param e.g. ?source=WS-01
  useEffect(() => {
    const srcId = searchParams.get('source');
    if (srcId) {
      const target = sources.find(s => s.id === srcId);
      if (target && mapInstanceRef.current) {
        setSelectedItem(target);
        setRegionFilter(target.region);
        mapInstanceRef.current.flyTo(target.coordinates, 14, { duration: 1.5 });
      }
    }
  }, [searchParams, sources]);

  // 5. "Find Nearest Safe Water Source" with Geolocation
  const handleFindNearest = () => {
    showToast("Detecting your location to find nearest safe source...", "info");

    const onSuccess = (pos) => {
      const userLat = pos.coords.latitude;
      const userLng = pos.coords.longitude;
      setUserLocation([userLat, userLng]);

      locateNearest(userLat, userLng);
    };

    const onError = (err) => {
      // Fallback to simulated location in North Zone
      const fallbackLat = 28.6315;
      const fallbackLng = 77.2185;
      setUserLocation([fallbackLat, fallbackLng]);
      showToast("Using current regional center coordinates", "info");
      locateNearest(fallbackLat, fallbackLng);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 8000 });
    } else {
      onError();
    }
  };

  const locateNearest = (lat, lng) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Filter only Safe sources
    const safePoints = sources.filter(s => s.status === 'Safe');
    if (safePoints.length === 0) {
      showToast("No certified safe sources found in database", "warning");
      return;
    }

    let nearest = safePoints[0];
    let minDistance = calculateDistance(lat, lng, nearest.coordinates[0], nearest.coordinates[1]);

    for (let i = 1; i < safePoints.length; i++) {
      const dist = calculateDistance(lat, lng, safePoints[i].coordinates[0], safePoints[i].coordinates[1]);
      if (dist < minDistance) {
        minDistance = dist;
        nearest = safePoints[i];
      }
    }

    setSelectedItem(nearest);
    const walkMinutes = Math.round(minDistance * 12); // ~5 km/h walk speed
    setNearestInfo({
      distanceKm: minDistance.toFixed(2),
      walkMinutes: Math.max(2, walkMinutes)
    });

    // Fly to target
    map.flyTo(nearest.coordinates, 15, { duration: 1.8 });

    showToast(`Nearest safe source: ${nearest.name} (~${minDistance.toFixed(1)} km)`, "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Header & Fast Find Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-aqua-100 text-aqua-800 dark:bg-aqua-950 dark:text-aqua-300">
              <MapPin className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Interactive Safe Water Source Map
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Pinpointing certified potable taps, municipal treatment works, public toilets, and reported hazards.
          </p>
        </div>

        {/* Action Button: Find Nearest Safe Source */}
        <button
          onClick={handleFindNearest}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-ocean-800 to-aqua-600 hover:from-ocean-700 hover:to-aqua-500 text-white font-bold text-xs shadow-lg shadow-aqua-500/20 hover:scale-105 transition-all cursor-pointer shrink-0"
        >
          <Navigation className="w-4 h-4 animate-spin-slow" />
          <span>Find Nearest Safe Source</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        
        {/* Source Type Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Layer:
          </span>
          <button
            onClick={() => setTypeFilter('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              typeFilter === 'All' ? 'bg-ocean-800 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            All Types
          </button>
          <button
            onClick={() => setTypeFilter('public_tap')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              typeFilter === 'public_tap' ? 'bg-ocean-800 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            🚰 Public Taps
          </button>
          <button
            onClick={() => setTypeFilter('treatment_plant')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              typeFilter === 'treatment_plant' ? 'bg-ocean-800 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            🏭 Plants
          </button>
          <button
            onClick={() => setTypeFilter('borewell')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              typeFilter === 'borewell' ? 'bg-ocean-800 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            💧 Borewells
          </button>
          <button
            onClick={() => setTypeFilter('sanitation')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              typeFilter === 'sanitation' ? 'bg-ocean-800 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            🚻 Sanitation
          </button>
          <button
            onClick={() => setTypeFilter('problem')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              typeFilter === 'problem' ? 'bg-red-600 text-white' : 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100'
            }`}
          >
            ⚠️ Reported Hazards
          </button>
        </div>

        {/* Region & Status Selectors */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-slate-400">Region:</span>
            <select
              value={regionFilter}
              onChange={(e) => handleRegionChange(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none"
            >
              <option value="All">All Regions</option>
              <option value="North Zone">North Zone</option>
              <option value="Central Valley">Central Valley</option>
              <option value="Coastal District">Coastal District</option>
              <option value="Eastern Highlands">Eastern Highlands</option>
              <option value="Metro South">Metro South</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-slate-400">Quality:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Safe">Safe Only</option>
              <option value="Caution">Caution Only</option>
              <option value="Unsafe">Unsafe Only</option>
            </select>
          </div>
        </div>

      </div>

      {/* Map + Detail Side Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Leaflet Map Box */}
        <div className="lg:col-span-2 h-[550px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md relative">
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Map Legend Overlay */}
          <div className="absolute bottom-4 left-4 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 text-[11px] space-y-1.5">
            <p className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">
              Legend
            </p>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span>Safe (Potable)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span>Caution (Boil/Filter)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span>Unsafe / Contaminated</span>
            </div>
          </div>
        </div>

        {/* Selected Marker Detail Drawer */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          {selectedItem ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    selectedItem.status === 'Safe' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                    selectedItem.status === 'Caution' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                    'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                  }`}>
                    {selectedItem.status} Status
                  </span>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1.5">
                    {selectedItem.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {selectedItem.id} • {selectedItem.region}
                  </p>
                </div>

                {selectedItem.type !== 'problem' && (
                  <button
                    onClick={() => toggleSaveSource(selectedItem.id)}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                    title="Bookmark this water point"
                  >
                    <Bookmark className={`w-4 h-4 ${savedSources.includes(selectedItem.id) ? 'fill-aqua-500 text-aqua-500' : ''}`} />
                  </button>
                )}
              </div>

              {/* Nearest distance banner if available */}
              {nearestInfo && selectedItem.status === 'Safe' && (
                <div className="p-3 rounded-xl bg-aqua-50 dark:bg-aqua-950/40 border border-aqua-200 dark:border-aqua-900/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-aqua-800 dark:text-aqua-300">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>~{nearestInfo.distanceKm} km away</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>~{nearestInfo.walkMinutes} min walk</span>
                  </div>
                </div>
              )}

              {/* Address & Description */}
              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <p className="font-semibold text-slate-700 dark:text-slate-200">
                  📍 {selectedItem.address}
                </p>
                {selectedItem.notes && (
                  <p className="text-slate-500 dark:text-slate-400 italic">
                    "{selectedItem.notes}"
                  </p>
                )}
              </div>

              {/* Parameters Breakdown for Water Sources */}
              {selectedItem.ph !== undefined && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Chemical & Biological Metrics
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                      <span className="text-[10px] text-slate-400">pH Level</span>
                      <p className="font-bold text-slate-900 dark:text-white">{selectedItem.ph}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                      <span className="text-[10px] text-slate-400">Turbidity</span>
                      <p className="font-bold text-slate-900 dark:text-white">{selectedItem.turbidity} NTU</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                      <span className="text-[10px] text-slate-400">TDS (Dissolved Solids)</span>
                      <p className="font-bold text-slate-900 dark:text-white">{selectedItem.tds} ppm</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                      <span className="text-[10px] text-slate-400">Free Chlorine</span>
                      <p className="font-bold text-slate-900 dark:text-white">{selectedItem.chlorine} mg/L</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 col-span-2">
                      <span className="text-[10px] text-slate-400">Coliform Bacteria</span>
                      <p className={`font-bold ${selectedItem.bacteria > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                        {selectedItem.bacteria} CFU/100ml ({selectedItem.bacteria === 0 ? 'Zero Bacteria' : 'Pathogens Detected'})
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Problem Report Details if it's a hazard */}
              {selectedItem.severity && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs space-y-1">
                  <p className="font-bold text-red-700 dark:text-red-300">
                    Severity: {selectedItem.severity}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    Ticket Status: <strong>{selectedItem.ticketStatus}</strong>
                  </p>
                </div>
              )}

              {/* Bottom Actions */}
              <div className="pt-4 flex flex-col gap-2">
                <Link
                  to={`/report?location=${encodeURIComponent(selectedItem.address)}`}
                  className="w-full py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs text-center shadow-sm transition-colors"
                >
                  Report Issue At This Location
                </Link>
                <Link
                  to="/testing-guide"
                  className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs text-center transition-colors"
                >
                  Run Water Safety Quiz
                </Link>
              </div>
            </div>
          ) : (
            <div className="py-24 text-center text-slate-400 text-xs space-y-3">
              <Compass className="w-10 h-10 mx-auto text-slate-300 animate-pulse" />
              <p className="font-semibold text-slate-600 dark:text-slate-300">
                Click any water source or tap marker on the map to inspect full chemical readings and directions.
              </p>
              <p className="text-[11px] text-slate-400">
                Over 30 verified sites currently monitored across 5 zones.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
