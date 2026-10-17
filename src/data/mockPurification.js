export const purificationMethods = [
  {
    id: "boiling",
    name: "Boiling (Thermal Disinfection)",
    tagline: "The gold standard for biological sterilization with zero special equipment.",
    category: "Thermal",
    costLevel: "Low / Free",
    costEstimate: "$0.02 - $0.05 / 10 Liters (Fuel/Gas)",
    maintenance: "None",
    powerRequired: "Fuel / Firewood / Gas / Electricity",
    flowRate: "Batch (10-20L per hour)",
    effectiveness: {
      bacteria: "99.99%",
      viruses: "99.99%",
      protozoa: "99.99% (Giardia & Cryptosporidium)",
      chemicals: "0% (May concentrate heavy metals)",
      turbidity: "0% (Requires pre-filtering)",
      tdsReduction: "None"
    },
    pros: [
      "Kills 100% of biological pathogens (bacteria, viruses, cysts)",
      "Universal accessibility; works with any pot and heat source",
      "No replacement cartridges or consumables required",
      "Immediate reliability during post-flood or cholera outbreaks"
    ],
    cons: [
      "Consumes firewood, LPG, or electrical energy",
      "Does not remove silt, sand, heavy metals, or chemical toxins",
      "Water takes 1-2 hours to cool down before drinking",
      "Flat taste due to dissolved oxygen loss (aerate by shaking)"
    ],
    instructions: [
      "If water is cloudy, let settle and strain through clean cotton cloth.",
      "Bring water to a vigorous rolling boil where large bubbles break the surface.",
      "Maintain the rolling boil for 1 full minute (3 minutes if above 2,000m altitude).",
      "Cover the pot and allow to cool naturally in the same vessel.",
      "Pour into a clean, sanitized container with a tight lid."
    ],
    whoStandard: "Fully approved for microbial safety."
  },
  {
    id: "chlorination",
    name: "Chlorination / Water Tablets",
    tagline: "Rapid chemical disinfection with long-lasting residual protection against recontamination.",
    category: "Chemical",
    costLevel: "Low",
    costEstimate: "$0.01 per 20 Liters (Sodium hypochlorite or NaDCC tablets)",
    maintenance: "Replenish tablets / bleach solution",
    powerRequired: "None",
    flowRate: "Batch (20L in 30 minutes)",
    effectiveness: {
      bacteria: "99.99%",
      viruses: "99.9%",
      protozoa: "Moderate (Ineffective against Cryptosporidium oocysts)",
      chemicals: "0%",
      turbidity: "0% (Turbid water consumes free chlorine)",
      tdsReduction: "None"
    },
    pros: [
      "Residual chlorine protects stored water from secondary contamination for days",
      "Extremely lightweight, portable, and ideal for disaster packs and trekking",
      "Very cheap per liter treated",
      "Scalable from individual water bottles to whole municipal reservoirs"
    ],
    cons: [
      "Leaves noticeable chemical taste/smell if overdosed",
      "Requires 30 minutes contact time before water is safe to drink",
      "Ineffective against Cryptosporidium parasites",
      "Water must be clear (< 5 NTU) for chlorine to work effectively"
    ],
    instructions: [
      "Ensure water is clear; filter cloudy water through cloth or sand first.",
      "Add 1 chlorine tablet (Aquatabs / NaDCC) or 2 drops of 5% unscented household bleach per 1 Liter of clear water.",
      "Stir or shake container thoroughly.",
      "Let stand for at least 30 minutes before consuming.",
      "Verify with chlorine test strip: ideal free chlorine is 0.2 - 0.5 mg/L."
    ],
    whoStandard: "Approved WHO emergency and household standard."
  },
  {
    id: "ceramic_filter",
    name: "Ceramic & Gravity Candle Filters",
    tagline: "Electricity-free physical filtration removing silt and bacteria via microscopic micropores.",
    category: "Physical Filtration",
    costLevel: "Medium",
    costEstimate: "$15 - $35 initial unit; $3/year replacement candles",
    maintenance: "Scrub candle monthly with soft brush",
    powerRequired: "None (Gravity operated)",
    flowRate: "1 - 3 Liters / hour continuous",
    effectiveness: {
      bacteria: "99.9%",
      viruses: "Low to Moderate (Viruses are smaller than 0.2 micron pores)",
      protozoa: "99.99%",
      chemicals: "Moderate (if carbon core included)",
      turbidity: "95% (Removes cloudiness and sediment)",
      tdsReduction: "None"
    },
    pros: [
      "Zero electricity required; operates purely by gravity",
      "Removes physical turbidity, giving sparkling clear water",
      "Durable; candle elements last 6 to 12 months with periodic scrubbing",
      "Silver-impregnated ceramic candles inhibit bacterial biofilm growth"
    ],
    cons: [
      "Slow flow rate (gravity-driven drip)",
      "Standard pores (0.2 - 0.5 microns) do not trap microscopic viral particles",
      "Ceramic candles are fragile and can crack if dropped",
      "Does not remove dissolved chemical salts (TDS)"
    ],
    instructions: [
      "Assemble upper raw water chamber with ceramic candle installed securely with food-grade silicone washers.",
      "Pour pre-screened raw water into top container and close lid.",
      "Water trickles down into lower stainless steel or food-grade storage chamber.",
      "Clean filter candle once a month under running tap with the provided scrub pad (no detergent!)."
    ],
    whoStandard: "Endorsed for rural and decentralized household water treatment."
  },
  {
    id: "sodis",
    name: "SODIS (Solar Disinfection)",
    tagline: "Harnessing free solar ultraviolet (UV-A) radiation and thermal heat in transparent PET bottles.",
    category: "Solar / UV",
    costLevel: "Free",
    costEstimate: "$0.00 (Uses recycled transparent PET drink bottles)",
    maintenance: "Replace scratched bottles every 6 months",
    powerRequired: "Direct sunlight (minimum 6 hours)",
    flowRate: "Batch (1.5 - 2L per bottle)",
    effectiveness: {
      bacteria: "99.9%",
      viruses: "99.0%",
      protozoa: "99.0%",
      chemicals: "0%",
      turbidity: "0% (Water MUST be clear < 30 NTU)",
      tdsReduction: "None"
    },
    pros: [
      "Completely free of recurring costs; relies solely on sunlight and PET bottles",
      "No chemical odor or alteration of water flavor",
      "Validated by Swiss Federal Institute of Aquatic Science (Eawag)",
      "Simple to teach in schools and remote rural communities"
    ],
    cons: [
      "Depends entirely on bright sunshine (takes 2 days on cloudy days; useless during monsoons)",
      "Water must be crystal clear; sunlight cannot penetrate turbid water",
      "Bottles must be PET (#1 recyclable), not PVC or glass",
      "Limited batch volume per day"
    ],
    instructions: [
      "Collect clean, scratch-free transparent PET plastic bottles (up to 2L capacity).",
      "Fill 3/4 full, recap tightly, and shake vigorously for 20 seconds to oxygenate the water.",
      "Fill to the brim and recap tightly.",
      "Lay bottles horizontally on a corrugated metal roof or reflective foil under full sunshine.",
      "Leave exposed for at least 6 consecutive hours (or 2 full days if sky is 50% clouded).",
      "Drink directly from bottle or pour into sterile container."
    ],
    whoStandard: "WHO and UNICEF recognized low-cost solar solution."
  },
  {
    id: "ro_system",
    name: "Reverse Osmosis (RO) + UV Systems",
    tagline: "High-precision semipermeable membrane separating dissolved solids, heavy metals, and microbes.",
    category: "Membrane / Advanced",
    costLevel: "High",
    costEstimate: "$120 - $280 unit; $25 - $40 annual filter set",
    maintenance: "Pre-sediment filter 3 months, RO membrane 18-24 months",
    powerRequired: "220V/110V continuous electricity",
    flowRate: "12 - 15 Liters / hour",
    effectiveness: {
      bacteria: "99.999%",
      viruses: "99.99%",
      protozoa: "99.999%",
      chemicals: "95 - 99% (Arsenic, Lead, Fluoride, Nitrates)",
      turbidity: "99.9%",
      tdsReduction: "85 - 95% reduction in total dissolved solids"
    },
    pros: [
      "The only standard household technology that removes dissolved heavy metals (arsenic, lead, chromium) and excess salinity",
      "Produces crystal-clear, sweet-tasting drinking water",
      "Automated pressure cut-off and water level tank control",
      "Essential for areas with TDS > 500 ppm or industrial contamination"
    ],
    cons: [
      "High upfront and maintenance cost",
      "Wastes reject water (typically 1 to 2 liters rejected per 1 liter purified)",
      "Requires continuous electric grid power or pressurized booster pump",
      "Strips natural beneficial minerals (requires remineralization cartridge)"
    ],
    instructions: [
      "Install unit near cold water inlet and plumbing drain for reject line.",
      "Connect 5-micron spun polypropylene pre-filter to trap rust and large silt.",
      "Ensure booster pump delivers 60+ PSI across the thin-film composite (TFC) membrane.",
      "Route reject wastewater to bucket for floor mopping or plant watering (never sewer waste).",
      "Sanitize storage tank every 6 months."
    ],
    whoStandard: "Compliant with highest international water quality parameters."
  }
];

export const recommenderQuestions = [
  {
    id: "source",
    question: "Where does your primary raw water come from?",
    options: [
      { label: "Municipal Piped Tap (Treated, but occasional taste/chlorine issues)", value: "tap" },
      { label: "Deep Groundwater Borewell / Tubewell (Hard, high mineral/TDS)", value: "borewell" },
      { label: "Surface Water (River, canal, pond, or open lake)", value: "surface" },
      { label: "Rainwater Harvesting Catchment", value: "rainwater" }
    ]
  },
  {
    id: "power",
    question: "What is your electricity access situation?",
    options: [
      { label: "Reliable 24/7 Grid Power", value: "reliable" },
      { label: "Intermittent / Frequent Outages (4-8 hours blackouts)", value: "intermittent" },
      { label: "No Electricity / Off-grid setting", value: "none" }
    ]
  },
  {
    id: "budget",
    question: "What is your budget preference for water treatment?",
    options: [
      { label: "Zero / Near-zero cost ($0 - $5)", value: "free" },
      { label: "Moderate ($15 - $40 one-time setup)", value: "moderate" },
      { label: "Premium / Long-term investment ($100+ with automated features)", value: "premium" }
    ]
  },
  {
    id: "concern",
    question: "What is your single biggest concern about your water?",
    options: [
      { label: "Biological sickness (diarrhea, cholera, germs)", value: "microbes" },
      { label: "Salinity, hard taste, white scale stains, or heavy metals", value: "tds" },
      { label: "Visible dirt, silt, mud, or cloudiness", value: "turbidity" }
    ]
  }
];
