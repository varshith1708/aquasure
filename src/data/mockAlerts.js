export const mockAlerts = [
  {
    id: "ALT-2026-01",
    title: "BOIL-WATER ADVISORY: Najafgarh Basin Sector 9",
    type: "boil_water",
    severity: "Critical",
    region: "North Zone",
    startDate: "2026-10-16",
    estimatedResolution: "2026-10-19",
    status: "Active",
    message: "High coliform microbial count identified in raw groundwater. All residents must bring drinking and cooking water to a vigorous rolling boil for at least 1 full minute (3 minutes at high altitude) before consumption.",
    actions: [
      "Boil water for a minimum of 60 seconds",
      "Do not use tap water for infant formula or brushing teeth",
      "Collect chlorine disinfection tablets from Primary Health Center #4"
    ]
  },
  {
    id: "ALT-2026-02",
    title: "Scheduled Pipeline Maintenance: Central Valley Zone B",
    type: "maintenance",
    severity: "Warning",
    region: "Central Valley",
    startDate: "2026-10-18 22:00",
    estimatedResolution: "2026-10-19 06:00",
    status: "Upcoming",
    message: "Replacement of 900mm primary trunk valve near Narmada feeder station. Piped pressure will be suspended overnight. Please store sufficient clean water.",
    actions: [
      "Store minimum 40 liters per household for morning essentials",
      "Emergency mobile water bowsers stationed at Sector 3 and Sector 7 community grounds"
    ]
  },
  {
    id: "ALT-2026-03",
    title: "Chlorine Booster Flushing: Coastal North District",
    type: "flush",
    severity: "Info",
    region: "Coastal District",
    startDate: "2026-10-17 14:00",
    estimatedResolution: "2026-10-17 20:00",
    status: "Active",
    message: "Periodic municipal pipeline disinfection in progress. Tap water may have a noticeable temporary chlorine scent. The water remains bacteriologically safe.",
    actions: [
      "Let water stand in open pitcher for 30 minutes to dissipate chlorine taste",
      "Safe for washing and bathing"
    ]
  },
  {
    id: "ALT-2026-04",
    title: "Saline Intrusion Warning: Ennore Estuary Tubewells",
    type: "contamination",
    severity: "Critical",
    region: "Coastal District",
    startDate: "2026-10-15",
    estimatedResolution: "2026-10-22",
    status: "Active",
    message: "TDS readings in coastal shallow wells have exceeded 1,600 ppm due to seasonal tidal surge. High salinity is unsafe for hypertensive individuals and infants.",
    actions: [
      "Refill from AquaSure community RO kiosks at Port Trust road",
      "Do not use shallow groundwater for infant cooking"
    ]
  },
  {
    id: "ALT-2026-05",
    title: "Supply Timing Revision: Eastern Highlands Sector V",
    type: "schedule",
    severity: "Info",
    region: "Eastern Highlands",
    startDate: "2026-10-15",
    estimatedResolution: "Ongoing",
    status: "Active",
    message: "Morning supply hours adjusted to 05:30 - 08:30 IST; Evening supply: 17:30 - 20:30 IST to optimize gravity reservoir balancing.",
    actions: [
      "Inspect roof tank inlet float valves to prevent overflow",
      "Report low pressure through the AquaSure portal"
    ]
  },
  {
    id: "ALT-2026-06",
    title: "Industrial Effluent Precaution: Bellandur Catchment",
    type: "contamination",
    severity: "Critical",
    region: "Metro South",
    startDate: "2026-10-16",
    estimatedResolution: "2026-10-25",
    status: "Active",
    message: "Pollution Control Board has sealed 3 agricultural borewells showing trace surfactants and organic contaminants near Yemalur channel.",
    actions: [
      "Use only municipal piped Cauvery water supply",
      "Avoid private tanker supplies sourcing from unverified borewells"
    ]
  }
];
