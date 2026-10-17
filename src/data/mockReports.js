export const mockReports = [
  {
    id: "AQ-2026-1001",
    type: "contamination",
    categoryLabel: "Water Contamination",
    region: "North Zone",
    location: "Block B, Anand Vihar",
    coordinates: [28.6492, 77.3155],
    severity: "Critical",
    status: "In Progress",
    description: "Tap water running brownish-yellow with strong sulfur odor since morning. Several households report children with mild nausea.",
    affectedCount: 450,
    reporterName: "Rajesh Sharma",
    reporterContact: "+91 98112 45890",
    photo: "https://images.unsplash.com/photo-1617155093730-a8bf47be792d?auto=format&fit=crop&w=600&q=80",
    createdAt: "2026-10-17T08:30:00Z",
    updatedAt: "2026-10-17T11:15:00Z",
    assignedOfficer: "Dr. A. K. Verma (Chief Sanitary Inspector)",
    timeline: [
      { status: "Submitted", time: "2026-10-17T08:30:00Z", note: "Incident reported by community leader." },
      { status: "In Review", time: "2026-10-17T09:10:00Z", note: "Water test sample dispatched to regional lab." },
      { status: "In Progress", time: "2026-10-17T11:15:00Z", note: "Main feeder valve isolated. Repair crew addressing sewer backflow." }
    ]
  },
  {
    id: "AQ-2026-1002",
    type: "leakage",
    categoryLabel: "Pipeline Leakage",
    region: "Central Valley",
    location: "MP Nagar Zone II, Main Crossing",
    coordinates: [23.2325, 77.4315],
    severity: "High",
    status: "Resolved",
    description: "High-pressure municipal transmission pipe burst beneath asphalt. Water flooding pedestrian pathway and wasting thousands of liters.",
    affectedCount: 1200,
    reporterName: "Pooja Deshmukh",
    reporterContact: "+91 94250 88123",
    photo: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
    createdAt: "2026-10-15T14:20:00Z",
    updatedAt: "2026-10-16T18:00:00Z",
    assignedOfficer: "Eng. Vikram Patel (Water Board)",
    timeline: [
      { status: "Submitted", time: "2026-10-15T14:20:00Z", note: "Citizen reported via mobile app." },
      { status: "In Review", time: "2026-10-15T15:00:00Z", note: "Emergency crew alerted." },
      { status: "In Progress", time: "2026-10-15T16:30:00Z", note: "Excavation and clamp installation commenced." },
      { status: "Resolved", time: "2026-10-16T18:00:00Z", note: "Pipe weld completed, pressure tested, and road resurfaced." }
    ]
  },
  {
    id: "AQ-2026-1003",
    type: "broken_pump",
    categoryLabel: "Broken Hand Pump",
    region: "Metro South",
    location: "Vasanthnagar Slum Cluster, Lane 4",
    coordinates: [12.9895, 77.5855],
    severity: "Medium",
    status: "In Review",
    description: "Mark II hand pump handle severed and cylinder leaking water back into borehole. Sole drinking source for 80 migrant families.",
    affectedCount: 320,
    reporterName: "M. Kumar",
    reporterContact: "+91 97410 33412",
    photo: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    createdAt: "2026-10-16T19:00:00Z",
    updatedAt: "2026-10-17T09:45:00Z",
    assignedOfficer: "Deepa Reddy (Zonal Engineer)",
    timeline: [
      { status: "Submitted", time: "2026-10-16T19:00:00Z", note: "Ticket logged with photo verification." },
      { status: "In Review", time: "2026-10-17T09:45:00Z", note: "Spare mechanical rod requisitioned from central store." }
    ]
  },
  {
    id: "AQ-2026-1004",
    type: "no_supply",
    categoryLabel: "No Water Supply",
    region: "Coastal District",
    location: "Royapuram Fishermen Colony",
    coordinates: [13.1125, 80.2985],
    severity: "High",
    status: "In Progress",
    description: "Zero piped water delivery for the past 4 consecutive days. Pressure booster pump in ward pump house broken.",
    affectedCount: 2200,
    reporterName: "S. Murugan",
    reporterContact: "+91 94441 22901",
    photo: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80",
    createdAt: "2026-10-16T07:15:00Z",
    updatedAt: "2026-10-17T08:00:00Z",
    assignedOfficer: "K. R. Ramanathan (MetroWater)",
    timeline: [
      { status: "Submitted", time: "2026-10-16T07:15:00Z", note: "Mass petition filed by residents." },
      { status: "In Review", time: "2026-10-16T10:00:00Z", note: "Water tanker relief deployed as temporary measure." },
      { status: "In Progress", time: "2026-10-17T08:00:00Z", note: "Impeller replacement underway at substation." }
    ]
  },
  {
    id: "AQ-2026-1005",
    type: "sanitation",
    categoryLabel: "Sanitation Problem",
    region: "Eastern Highlands",
    location: "Sealdah Canal Bank Ward 28",
    coordinates: [22.5685, 88.3715],
    severity: "Critical",
    status: "In Review",
    description: "Open community septic pit overflowed into public lane following heavy thunderstorm. Raw sewage spreading near vegetable stalls.",
    affectedCount: 1500,
    reporterName: "Subrata Sen",
    reporterContact: "+91 98302 77145",
    photo: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80",
    createdAt: "2026-10-17T06:40:00Z",
    updatedAt: "2026-10-17T07:30:00Z",
    assignedOfficer: "B. N. Ghosh (Municipal Health Officer)",
    timeline: [
      { status: "Submitted", time: "2026-10-17T06:40:00Z", note: "Urgent sanitation alarm raised." },
      { status: "In Review", time: "2026-10-17T07:30:00Z", note: "Suction vacuum trucks routed to site; lime bleaching ordered." }
    ]
  },
  {
    id: "AQ-2026-1006",
    type: "contamination",
    categoryLabel: "Water Contamination",
    region: "Central Valley",
    location: "Shahpura Lake Promenade Taps",
    coordinates: [23.1945, 77.4225],
    severity: "Medium",
    status: "Resolved",
    description: "Fishy odor and green algae residue detected on standpost spouts. Algae growth inside intermediate storage tank.",
    affectedCount: 750,
    reporterName: "Amitabh Joshi",
    reporterContact: "+91 98260 11984",
    photo: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
    createdAt: "2026-10-13T11:00:00Z",
    updatedAt: "2026-10-15T16:00:00Z",
    assignedOfficer: "Anita Saxena (Environmental Analyst)",
    timeline: [
      { status: "Submitted", time: "2026-10-13T11:00:00Z", note: "Logged with photo proof." },
      { status: "In Review", time: "2026-10-13T14:30:00Z", note: "Site visited by sanitary inspector." },
      { status: "In Progress", time: "2026-10-14T10:00:00Z", note: "Overhead tank completely drained, power scrubbed, and chlorinated." },
      { status: "Resolved", time: "2026-10-15T16:00:00Z", note: "Water test passed with 0 CFU bacteria. Safe consumption resumed." }
    ]
  },
  {
    id: "AQ-2026-1007",
    type: "leakage",
    categoryLabel: "Pipeline Leakage",
    region: "North Zone",
    location: "Lajpat Nagar IV, Central Ring",
    coordinates: [28.5682, 77.2415],
    severity: "Low",
    status: "Submitted",
    description: "Slow, continuous drip from municipal valve flange creating puddles. Potable water wastage estimated at 200L daily.",
    affectedCount: 60,
    reporterName: "Simran Kaur",
    reporterContact: "+91 98991 33456",
    photo: null,
    createdAt: "2026-10-17T11:00:00Z",
    updatedAt: "2026-10-17T11:00:00Z",
    assignedOfficer: "Pending Assignment",
    timeline: [
      { status: "Submitted", time: "2026-10-17T11:00:00Z", note: "Report received via portal." }
    ]
  },
  {
    id: "AQ-2026-1008",
    type: "sanitation",
    categoryLabel: "Sanitation Problem",
    region: "Metro South",
    location: "Shivajinagar Bus Stand Restroom",
    coordinates: [12.9855, 77.6045],
    severity: "High",
    status: "Resolved",
    description: "Broken flushing cisterns and lack of running water in women's section. Severe lack of sanitation supplies.",
    affectedCount: 3500,
    reporterName: "Farida Begum",
    reporterContact: "+91 98450 77123",
    photo: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
    createdAt: "2026-10-12T09:30:00Z",
    updatedAt: "2026-10-14T14:00:00Z",
    assignedOfficer: "Sunil Gowda (Transit Facility Manager)",
    timeline: [
      { status: "Submitted", time: "2026-10-12T09:30:00Z", note: "Passenger grievance recorded." },
      { status: "In Progress", time: "2026-10-13T08:00:00Z", note: "Plumbing contractor installed 6 new dual-flush cisterns." },
      { status: "Resolved", time: "2026-10-14T14:00:00Z", note: "Continuous supply restored, soap dispensers stocked." }
    ]
  },
  {
    id: "AQ-2026-1009",
    type: "broken_pump",
    categoryLabel: "Broken Hand Pump",
    region: "Coastal District",
    location: "Ennore Fisher Hamlet Ward 1",
    coordinates: [13.2115, 80.3185],
    severity: "High",
    status: "In Progress",
    description: "Pump base cracked and internal check valve worn out; sucking air and mud instead of clean water.",
    affectedCount: 500,
    reporterName: "Velu Pandian",
    reporterContact: "+91 94440 88231",
    photo: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    createdAt: "2026-10-15T16:00:00Z",
    updatedAt: "2026-10-17T10:00:00Z",
    assignedOfficer: "P. Selvam (District Rural Water Mission)",
    timeline: [
      { status: "Submitted", time: "2026-10-15T16:00:00Z", note: "Report verified by village head." },
      { status: "In Review", time: "2026-10-16T11:00:00Z", note: "Site inspected." },
      { status: "In Progress", time: "2026-10-17T10:00:00Z", note: "New riser pipe and foot valve being lowered." }
    ]
  },
  {
    id: "AQ-2026-1010",
    type: "no_supply",
    categoryLabel: "No Water Supply",
    region: "Eastern Highlands",
    location: "Purulia Tribal Hamlet #3",
    coordinates: [23.3215, 86.3515],
    severity: "Critical",
    status: "In Progress",
    description: "Drought conditions lowered water table below 120ft. Gravity pipe dried out; villagers walking 4km to stagnant stream.",
    affectedCount: 900,
    reporterName: "Mangal Murmu",
    reporterContact: "+91 97321 00451",
    photo: null,
    createdAt: "2026-10-14T08:00:00Z",
    updatedAt: "2026-10-16T12:00:00Z",
    assignedOfficer: "T. Banerjee (District Magistrate Water Desk)",
    timeline: [
      { status: "Submitted", time: "2026-10-14T08:00:00Z", note: "Urgent hardship notification." },
      { status: "In Review", time: "2026-10-14T14:00:00Z", note: "Emergency water tankers dispatched twice daily." },
      { status: "In Progress", time: "2026-10-16T12:00:00Z", note: "Hydro-geological survey active for deep borewell drilling." }
    ]
  }
];

// Generate additional 42 realistic reports across regions to hit 52+ realistic reports
const regions = ["North Zone", "Central Valley", "Coastal District", "Eastern Highlands", "Metro South"];
const types = [
  { type: "contamination", label: "Water Contamination", severities: ["High", "Critical", "Medium"] },
  { type: "leakage", label: "Pipeline Leakage", severities: ["Low", "Medium", "High"] },
  { type: "broken_pump", label: "Broken Hand Pump", severities: ["Medium", "High"] },
  { type: "no_supply", label: "No Water Supply", severities: ["High", "Critical"] },
  { type: "sanitation", label: "Sanitation Problem", severities: ["Medium", "High", "Critical"] }
];
const statuses = ["Submitted", "In Review", "In Progress", "Resolved"];

const names = [
  "Ramesh Patel", "Kavita Nair", "Arun Mukherjee", "Sunita Rao", "Irfan Khan",
  "Ananya Roy", "Gopalakrishnan V.", "Meera Joshi", "David Fernandes", "Priyanka Das",
  "Balram Yadav", "Tanya Sen", "Mohan Lal", "Lakshmi Bai", "Chirag Gandhi"
];

const mockLocations = {
  "North Zone": ["Karol Bagh Market", "Pitampura Block KP", "Civil Lines Road", "Okhla Phase II", "Mayur Vihar Ext."],
  "Central Valley": ["Bairagarh Station", "Govindpura Industrial", "Bhopal Junction West", "Gulmohar Colony", "Habibganj Area"],
  "Coastal District": ["T. Nagar Pondy Bazaar", "Anna Nagar West", "Thiruvanmiyur Beach", "Tambaram East", "Kilpauk Garden"],
  "Eastern Highlands": ["Salt Lake Sector V", "Park Circus Connector", "Dum Dum Cantonment", "Garia Station Road", "New Town Action Area 1"],
  "Metro South": ["Whitefield Kadugodi", "Jayanagar 4th T Block", "BTM Layout 2nd Stage", "Indiranagar 100ft Rd", "Malleshwaram 8th Cross"]
};

const coordinatesByRegion = {
  "North Zone": [28.63, 77.21],
  "Central Valley": [23.25, 77.41],
  "Coastal District": [13.06, 80.25],
  "Eastern Highlands": [22.57, 88.36],
  "Metro South": [12.97, 77.59]
};

for (let i = 11; i <= 52; i++) {
  const reg = regions[(i * 3) % regions.length];
  const typeObj = types[(i * 2) % types.length];
  const stat = statuses[(i * 7) % statuses.length];
  const sev = typeObj.severities[i % typeObj.severities.length];
  const locList = mockLocations[reg];
  const loc = locList[i % locList.length];
  const baseCoord = coordinatesByRegion[reg];
  const jitterLat = (Math.sin(i * 9) * 0.08);
  const jitterLng = (Math.cos(i * 7) * 0.08);
  const name = names[i % names.length];
  const dayOffset = (i % 20);

  const descMap = {
    contamination: `Water exhibiting noticeable cloudy turbidity and high chlorine/metallic aftertaste in ${loc}. Multiple households boiling water before drinking.`,
    leakage: `Sub-surface pipe rupture causing continuous water geyser near road culvert in ${loc}. Water pressure dropped significantly across nearby blocks.`,
    broken_pump: `Community hand pump lever mechanism fractured due to continuous mechanical stress in ${loc}. Local residents forced to borrow water.`,
    no_supply: `Unannounced supply suspension lasting over 48 hours in ${loc}. Secondary overhead tank empty; community taps completely dry.`,
    sanitation: `Public community latrines facing drainage backup and foul odor due to clogged outlet line in ${loc}. Immediate sanitation treatment needed.`
  };

  mockReports.push({
    id: `AQ-2026-${1000 + i}`,
    type: typeObj.type,
    categoryLabel: typeObj.label,
    region: reg,
    location: `${loc}, ${reg}`,
    coordinates: [Number((baseCoord[0] + jitterLat).toFixed(4)), Number((baseCoord[1] + jitterLng).toFixed(4))],
    severity: sev,
    status: stat,
    description: descMap[typeObj.type],
    affectedCount: 150 + ((i * 73) % 1800),
    reporterName: name,
    reporterContact: `+91 ${98000 + i * 17} ${10000 + i * 33}`,
    photo: (i % 3 === 0) ? "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80" : null,
    createdAt: `2026-10-${String(Math.max(1, 17 - dayOffset)).padStart(2, '0')}T${String((i * 3) % 24).padStart(2, '0')}:30:00Z`,
    updatedAt: `2026-10-17T12:00:00Z`,
    assignedOfficer: `Officer ${name.split(" ")[1]} (Zonal Team)`,
    timeline: [
      { status: "Submitted", time: `2026-10-${String(Math.max(1, 17 - dayOffset)).padStart(2, '0')}T10:00:00Z`, note: "Report recorded via AquaSure field app." },
      ...(stat !== "Submitted" ? [{ status: "In Review", time: `2026-10-${String(Math.max(1, 17 - dayOffset)).padStart(2, '0')}T14:00:00Z`, note: "Prioritized based on impact radius." }] : []),
      ...(stat === "In Progress" || stat === "Resolved" ? [{ status: "In Progress", time: `2026-10-16T09:00:00Z`, note: "Maintenance crew dispatched to rectify issue." }] : []),
      ...(stat === "Resolved" ? [{ status: "Resolved", time: `2026-10-17T11:30:00Z`, note: "Field verification complete. Potable pressure restored." }] : [])
    ]
  });
}
