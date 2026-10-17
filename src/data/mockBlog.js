export const mockArticles = [
  {
    id: "art-1",
    slug: "sdg6-clean-water-sanitation-2030-roadmap",
    title: "Accelerating UN SDG 6: Why Community Data is Key to Clean Water for All",
    category: "Policy",
    readTime: "6 min read",
    date: "2026-10-10",
    author: "Elena Rostova (UN-Water Civic Advisor)",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80",
    summary: "Over 2 billion people worldwide still lack safely managed drinking water. How decentralized citizen science and real-time civic reporting close the infrastructure gap.",
    content: `Sustainable Development Goal 6 (SDG 6) challenges the global community to ensure availability and sustainable management of water and sanitation for all by 2030. While massive centralized reservoirs and municipal treatment works are crucial, the last-mile pipeline often suffers from silent leaks, cross-contamination, and broken hand pumps.

Decentralized civic platforms like AquaSure bridge this critical blindspot. By equipping citizens with simple visual and chemical water test strips, geo-tagged reporting, and transparent public dashboards, municipalities can detect contamination within hours rather than weeks.

Key SDG 6 Targets Addressed:
1. Target 6.1: Universal and equitable access to safe and affordable drinking water for all.
2. Target 6.2: Adequate and equitable sanitation and hygiene for all, ending open defecation.
3. Target 6.3: Improving water quality by reducing pollution, eliminating dumping, and minimizing release of hazardous chemicals.
4. Target 6.b: Supporting and strengthening local community participation in water and sanitation management.`
  },
  {
    id: "art-2",
    slug: "demystifying-tds-water-hardness-health",
    title: "Demystifying TDS: What Total Dissolved Solids Really Mean For Your Health",
    category: "Safety",
    readTime: "5 min read",
    date: "2026-10-05",
    author: "Dr. K. Srinivas (Environmental Biochemist)",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    summary: "Is low TDS always better? Unraveling the science of minerals, calcium, magnesium, and the difference between safe minerals and toxic heavy metals.",
    content: `Total Dissolved Solids (TDS) refers to the cumulative inorganic salts (principally calcium, magnesium, potassium, sodium, bicarbonates, chlorides, and sulfates) and small amounts of organic matter dissolved in water.

According to WHO guidelines:
- Less than 300 ppm: Excellent
- 300 - 600 ppm: Good
- 600 - 900 ppm: Fair
- 900 - 1200 ppm: Poor
- Greater than 1200 ppm: Unacceptable

Contrary to commercial marketing, drinking water with near-zero TDS (such as aggressive un-remineralized RO water below 50 ppm) lacks essential dietary magnesium and calcium, which may negatively impact cardiovascular health over prolonged periods. The objective is balanced mineral purity, not distilled emptiness.`
  },
  {
    id: "art-3",
    slug: "rooftop-rainwater-harvesting-urban-drought",
    title: "The Urban Sponge: How Rooftop Rainwater Harvesting Saves Cities from Drought",
    category: "Technology",
    readTime: "7 min read",
    date: "2026-09-28",
    author: "Meera Subramanian (Civil Engineer)",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    summary: "A practical guide to sizing catchments, designing first-flush diverters, and recharging parched urban aquifers during heavy monsoon downpours.",
    content: `As asphalt and concrete cover our cities, 85% of rainfall is lost to stormwater runoff that causes urban flooding while deep borewells run dry. Rooftop rainwater harvesting reverses this cycle.

A modest 1,000 sq ft rooftop in an area receiving 800mm of annual rainfall can harvest up to 60,000 Liters of pristine water every year. By introducing a first-flush diverter (which discards the initial 1-2mm of roof wash containing dust and bird droppings), the remaining water can either be stored for direct non-potable use or injected into recharge wells to replenish depleted shallow water tables.`
  },
  {
    id: "art-4",
    slug: "sanitation-dignity-ending-open-defecation",
    title: "Sanitation is Dignity: Why Gender-Segregated School Latrines Keep Girls in Class",
    category: "Health",
    readTime: "6 min read",
    date: "2026-09-18",
    author: "Zoya Akhtar (Adolescent Health Specialist)",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    summary: "Examining the profound impact of functional toilets, running water, and menstrual disposal systems on educational retention and dignity.",
    content: `Globally, 1 in 3 adolescent girls misses up to 20% of their school days simply because their school lacks private, clean toilets with running water and safe disposal options for menstrual hygiene.

Providing gender-segregated toilet blocks equipped with continuous water, contactless handwash basins, and hygienic incinerators produces an immediate 30% jump in secondary school graduation rates for girls. WASH is fundamentally a gender equity imperative.`
  }
];

export const downloadableGuides = [
  {
    id: "guide-1",
    title: "Home Water Testing & Safety Checklist",
    category: "Safety",
    fileSize: "1.4 MB",
    pages: 4,
    description: "Visual clarity tests, odor identification flowchart, test strip color comparison chart, and emergency action checklist.",
    filename: "AquaSure_Home_Water_Testing_Checklist.pdf"
  },
  {
    id: "guide-2",
    title: "Emergency Flood & Disaster Water Disinfection Protocol",
    category: "Emergency",
    fileSize: "850 KB",
    pages: 2,
    description: "Rapid boiling ratios, bleach dosing per container size, SODIS sunlight guidelines, and ORS dehydration recipes.",
    filename: "AquaSure_Emergency_Disinfection_Protocol.pdf"
  },
  {
    id: "guide-3",
    title: "Community Bio-Sand Filter Construction Manual",
    category: "Technology",
    fileSize: "3.2 MB",
    pages: 12,
    description: "Step-by-step schematics for casting concrete filter bodies, layering graded gravel, sand, and maintaining biological schmutzdecke layer.",
    filename: "AquaSure_BioSand_Filter_Blueprint.pdf"
  },
  {
    id: "guide-4",
    title: "School WASH & Menstrual Hygiene Action Kit",
    category: "Education",
    fileSize: "2.1 MB",
    pages: 8,
    description: "Classroom activities, poster printables for handwashing steps, and safe disposal infrastructure guidelines.",
    filename: "AquaSure_School_WASH_Toolkit.pdf"
  }
];

export const faqList = [
  {
    question: "How do I know if my tap water is safe to drink without testing equipment?",
    answer: "Begin with sensory inspection: Pour water into a clear, clean glass against a white background. Look for cloudiness, tint (yellow/brown), or floating particles. Smell for chlorine, sulfur (rotten egg), or musty odors. However, deadly bacteria (like E. coli) and heavy metals (lead, arsenic) are odorless and invisible. When in doubt, bring to a rolling boil for 1 full minute."
  },
  {
    question: "What should I do if my local water source shows 'Unsafe' status on AquaSure?",
    answer: "Do not consume the water directly for drinking or tooth brushing. If biological contamination is reported, boil the water for at least 1 minute or treat with chlorine tablets. If chemical or high TDS contamination is flagged, use alternative safe water points mapped on our Interactive Map, and report your household's status to accelerate municipal tanker dispatch."
  },
  {
    question: "How does AquaSure handle community incident reports?",
    answer: "Every report generates a public tracking ID (e.g., AQ-2026-XXXX). Local water authorities and zonal sanitary inspectors receive automated alerts based on severity. The community can track the four stages in real time: Submitted → In Review → In Progress → Resolved."
  },
  {
    question: "Does boiling water remove lead, arsenic, or chemical fertilizers?",
    answer: "No. Boiling only destroys biological organisms (bacteria, viruses, parasites). Boiling actually slightly increases the concentration of heavy metals and minerals because pure water evaporates as steam while the metals remain behind. For heavy metals or high nitrates, Reverse Osmosis (RO) or certified ion-exchange filters are required."
  },
  {
    question: "How can our school or housing society register as a volunteer chapter?",
    answer: "Navigate to the Community & Volunteer section and click 'Register as Volunteer' or 'Partner With Us'. We provide free testing kits, educational banners, and technical guidance to establish local water monitoring hubs."
  }
];
