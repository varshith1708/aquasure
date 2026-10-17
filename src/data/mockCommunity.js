export const mockEvents = [
  {
    id: "EVT-01",
    title: "Yamuna Floodplain Plastic & Silt Clean-Up Drive",
    region: "North Zone",
    location: "Kudsia Ghat, North Riverfront",
    date: "2026-10-25",
    time: "06:30 AM - 10:30 AM",
    volunteersNeeded: 120,
    volunteersRegistered: 86,
    organizer: "AquaSure Delhi Chapter & Clean Yamuna Taskforce",
    description: "Join hands with 100+ civic volunteers to extract non-biodegradable debris and install floating trash booms along the river inlet.",
    perks: ["Safety gloves & boots provided", "Volunteer Certificate", "WASH Hero Badge", "Refreshments & hydration kit"],
    category: "River Cleanup"
  },
  {
    id: "EVT-02",
    title: "School Sanitation & Handwashing Workshop",
    region: "Central Valley",
    location: "Govt Higher Secondary School, Berasia",
    date: "2026-10-28",
    time: "09:30 AM - 01:00 PM",
    volunteersNeeded: 25,
    volunteersRegistered: 21,
    organizer: "UNICEF Youth WASH Ambassadors",
    description: "Interactive session teaching 300+ rural school students the 6 WHO handwashing steps and distributing soap bars and hygiene kits.",
    perks: ["Teaching handbook", "Field transport provided", "Official Recommendation Letter"],
    category: "Hygiene Workshop"
  },
  {
    id: "EVT-03",
    title: "Marina Beach Coastal Water Sampling Blitz",
    region: "Coastal District",
    location: "Besant Nagar Beach Promenade",
    date: "2026-11-02",
    time: "07:00 AM - 11:00 AM",
    volunteersNeeded: 50,
    volunteersRegistered: 44,
    organizer: "Citizen Science Coastal Alliance",
    description: "Collecting 80 coastal groundwater and seawater samples with digital TDS and pH probes to track seasonal salinity intrusion.",
    perks: ["Water testing kit training", "Field probe certificate", "Community networking lunch"],
    category: "Water Quality Testing"
  },
  {
    id: "EVT-04",
    title: "Community Rooftop Rainwater Harvesting Demo",
    region: "Metro South",
    location: "Cubbon Park Horticultural Hall",
    date: "2026-11-08",
    time: "10:00 AM - 03:00 PM",
    volunteersNeeded: 40,
    volunteersRegistered: 32,
    organizer: "Bangalore Rain Catchers & AquaSure",
    description: "Hands-on installation of first-flush diverters, dual-barrel gravel filters, and recharge pits to prevent urban groundwater depletion.",
    perks: ["DIY Rainwater blueprint", "Free first-flush mesh filter", "Certification"],
    category: "Conservation Workshop"
  }
];

export const mockLeaderboard = [
  {
    rank: 1,
    name: "Dr. Suniti Sen",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    role: "Senior Hydrologist",
    region: "Eastern Highlands",
    points: 4820,
    reportsVerified: 142,
    eventsAttended: 18,
    litersConservedEstimate: "350,000 L",
    badge: "Master Guardian"
  },
  {
    rank: 2,
    name: "Anand Ranganathan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    role: "Community Water Scout",
    region: "North Zone",
    points: 4210,
    reportsVerified: 119,
    eventsAttended: 24,
    litersConservedEstimate: "280,000 L",
    badge: "Rapid Responder"
  },
  {
    rank: 3,
    name: "Priyanka Nair",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    role: "WASH Educator",
    region: "Coastal District",
    points: 3950,
    reportsVerified: 94,
    eventsAttended: 19,
    litersConservedEstimate: "210,000 L",
    badge: "Hygiene Champion"
  },
  {
    rank: 4,
    name: "Karthik Shettigar",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    role: "Plumbing Technician",
    region: "Metro South",
    points: 3480,
    reportsVerified: 88,
    eventsAttended: 15,
    litersConservedEstimate: "190,000 L",
    badge: "Infrastructure Hero"
  },
  {
    rank: 5,
    name: "Fatima Zaidi",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    role: "Youth Lead",
    region: "Central Valley",
    points: 3120,
    reportsVerified: 76,
    eventsAttended: 14,
    litersConservedEstimate: "145,000 L",
    badge: "Youth Ambassador"
  }
];

export const donationTiers = [
  {
    id: "tier-1",
    amount: 15,
    label: "Safe Water for 1 Family",
    impact: "Supplies 3 months of chlorine water purification tablets and a food-grade sealed dispenser bucket to a vulnerable household.",
    badge: "Water Supporter"
  },
  {
    id: "tier-2",
    amount: 35,
    label: "Bio-Sand Filter Unit",
    impact: "Constructs and deploys a permanent concrete bio-sand gravity filter providing 50L/day of safe, bacteria-free water.",
    popular: true,
    badge: "Filter Champion"
  },
  {
    id: "tier-3",
    amount: 75,
    label: "School Handwashing Station",
    impact: "Funds a durable foot-pedal operated 4-basin handwash station with integrated soap dispenser for a rural primary school.",
    badge: "Sanitation Hero"
  },
  {
    id: "tier-4",
    amount: 150,
    label: "Community Well Restoration",
    impact: "Re-bores, seals parapet, and installs an automated chlorination cartridge for a shared village drinking borewell.",
    badge: "Community Patron"
  }
];
