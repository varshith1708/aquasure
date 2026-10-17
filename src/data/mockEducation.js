export const educationTranslations = {
  en: {
    heroTitle: "Water, Sanitation & Hygiene (WASH) Education",
    heroSubtitle: "Empowering communities with essential knowledge to prevent waterborne diseases, maintain dignified sanitation, and protect public health.",
    selectLanguage: "Language",
    tabs: {
      handwashing: "Handwashing Guide",
      diseases: "Disease Prevention",
      sanitation: "Sanitation & Waste",
      menstrual: "Menstrual Hygiene",
      quiz: "Knowledge Quiz"
    },
    timerStart: "Start 20s Practice Timer",
    timerRunning: "Washing... Keep scrubbing!",
    timerDone: "Great job! Clean hands save lives.",
    resetTimer: "Reset Timer"
  },
  hi: {
    heroTitle: "जल, स्वच्छता एवं स्वास्थ्य (WASH) शिक्षा",
    heroSubtitle: "जल जनित बीमारियों की रोकथाम, गरिमापूर्ण स्वच्छता और जनस्वास्थ्य की सुरक्षा के लिए व्यावहारिक ज्ञान।",
    selectLanguage: "भाषा चुनें",
    tabs: {
      handwashing: "हाथ धोने की विधि",
      diseases: "रोग निवारण",
      sanitation: "शौचालय व कचरा प्रबंधन",
      menstrual: "माहवारी स्वच्छता",
      quiz: "ज्ञान प्रश्नोत्तरी"
    },
    timerStart: "20 सेकंड का अभ्यास टाइमर शुरू करें",
    timerRunning: "हाथ धो रहे हैं... रगड़ते रहें!",
    timerDone: "शाबाश! स्वच्छ हाथ जिंदगियां बचाते हैं।",
    resetTimer: "टाइमर रीसेट करें"
  },
  gu: {
    heroTitle: "પાણી, સ્વચ્છતા અને આરોગ્ય (WASH) શિક્ષણ",
    heroSubtitle: "પાણીજન્ય રોગો અટકાવવા, ગૌરવપૂર્ણ સ્વચ્છતા જાળવવા અને જાહેર આરોગ્યનું રક્ષણ કરવા માટે સમુદાયોનું સશક્તિકરણ.",
    selectLanguage: "ભાષા પસંદ કરો",
    tabs: {
      handwashing: "હાથ ધોવાની રીત",
      diseases: "રોગ નિવારણ",
      sanitation: "શૌચાલય અને કચરા વ્યવસ્થાપન",
      menstrual: "માસિક ધર્મ સ્વચ્છતા",
      quiz: "જ્ઞાન ક્વિઝ"
    },
    timerStart: "20 સેકન્ડ પ્રેક્ટિસ ટાઈમર શરૂ કરો",
    timerRunning: "હાથ ધોઈ રહ્યા છો... ઘસવાનું ચાલુ રાખો!",
    timerDone: "સરસ! સ્વચ્છ હાથ જીવન બચાવે છે.",
    resetTimer: "ટાઈમર રીસેટ કરો"
  },
  te: {
    heroTitle: "నీరు, పారిశుధ్యం & పరిశుభ్రత (WASH) విద్య",
    heroSubtitle: "నీటి ద్వారా సంక్రమించే వ్యాధులను నివారించడానికి, పారిశుధ్యాన్ని కాపాడటానికి సమగ్ర సమాచారం.",
    selectLanguage: "భాషను ఎంచుకోండి",
    tabs: {
      handwashing: "చేతులు కడుక్కోవడం",
      diseases: "వ్యాధుల నివారణ",
      sanitation: "మరుగుదొడ్లు & వ్యర్థాల నిర్వహణ",
      menstrual: "రుతుక్రమ పరిశుభ్రత",
      quiz: "జ్ఞాన క్విజ్"
    },
    timerStart: "20 సెకన్ల ప్రాక్టీస్ టైమర్ ప్రారంభించండి",
    timerRunning: "కడుగుతున్నారు... రుద్దుతూ ఉండండి!",
    timerDone: "చాలా బాగుంది! పరిశుభ్రమైన చేతులు ప్రాణాలను కాపాడతాయి.",
    resetTimer: "రీసెట్ చేయండి"
  }
};

export const handwashingSteps = [
  {
    step: 1,
    title: "Wet & Soap",
    desc: "Wet hands with clean, running water (warm or cold), turn off tap, and apply sufficient soap.",
    icon: "Droplets"
  },
  {
    step: 2,
    title: "Palm to Palm",
    desc: "Rub your hands palm to palm vigorously in circular motions until rich foam develops.",
    icon: "Sparkles"
  },
  {
    step: 3,
    title: "Back of Hands & Webbing",
    desc: "Place right palm over left dorsum with interlaced fingers and rub thoroughly, then swap hands.",
    icon: "Hand"
  },
  {
    step: 4,
    title: "Fingers & Knuckles",
    desc: "Interlock your fingers and rub the backs of fingers against the opposing palms.",
    icon: "Maximize"
  },
  {
    step: 5,
    title: "Thumbs & Wrists",
    desc: "Clasp left thumb with right hand and rotate rub; repeat with left hand. Rub wrists up to 2 inches.",
    icon: "RotateCw"
  },
  {
    step: 6,
    title: "Rinse & Air Dry",
    desc: "Rinse thoroughly with clean running water. Dry with a single-use towel or let air dry completely.",
    icon: "Wind"
  }
];

export const waterborneDiseases = [
  {
    id: "cholera",
    name: "Cholera",
    cause: "Vibrio cholerae bacterium",
    transmission: "Drinking water or food contaminated with fecal matter",
    symptoms: ["Profuse watery diarrhea ('rice water')", "Severe vomiting", "Rapid dehydration", "Muscle cramps"],
    incubation: "2 hours to 5 days",
    prevention: "Boil water, use chlorine tablets, wash hands before eating, avoid unpeeled raw foods.",
    emergencyProtocol: "Immediate Oral Rehydration Salts (ORS) solution: 6 tsp sugar + 0.5 tsp salt in 1 Liter clean boiled water. Seek clinical care immediately.",
    severity: "Critical"
  },
  {
    id: "typhoid",
    name: "Typhoid Fever",
    cause: "Salmonella Typhi bacterium",
    transmission: "Sewage contamination entering drinking water lines or handled by infected food handlers",
    symptoms: ["Persistent high fever (103°F-104°F)", "Headache and abdominal pain", "Weakness and fatigue", "Rose-colored spots on trunk"],
    incubation: "6 to 30 days",
    prevention: "Typhoid conjugate vaccination, drinking exclusively purified water, proper sanitation around well heads.",
    emergencyProtocol: "Antibiotic treatment prescribed by medical physician. Complete bed rest and continuous boiled water hydration.",
    severity: "High"
  },
  {
    id: "diarrhea",
    name: "Acute Diarrheal Disease (Rotavirus / E. coli)",
    cause: "Rotavirus, Enterotoxigenic E. coli, Cryptosporidium",
    transmission: "Unfiltered surface runoff, unwashed hands after toilet use, unclean water storage vessels",
    symptoms: ["Loose or watery stools (>3 times/day)", "Abdominal cramping", "Low-grade fever", "Dry mouth and sunken eyes"],
    incubation: "12 to 72 hours",
    prevention: "Rotavirus immunization for infants, exclusive breastfeeding for first 6 months, covered narrow-neck water storage.",
    emergencyProtocol: "Zinc supplementation (20mg/day for 10-14 days for children) along with continuous ORS solution and clean fluids.",
    severity: "High"
  },
  {
    id: "hepatitis_a",
    name: "Hepatitis A & E",
    cause: "Hepatitis A & E viruses",
    transmission: "Fecal-oral route via contaminated water supplies during monsoons and floods",
    symptoms: ["Yellowing of skin and eyes (Jaundice)", "Dark tea-colored urine", "Loss of appetite and nausea", "Joint pain"],
    incubation: "14 to 28 days",
    prevention: "Hepatitis A vaccine, avoiding raw shellfish, safe disposal of sewage at least 30m away from wells.",
    emergencyProtocol: "Supportive nutrition, zero alcohol consumption, clean boiled fluids, and liver panel monitoring.",
    severity: "Medium"
  }
];

export const sanitationBestPractices = [
  {
    title: "Safe Latrine Distance",
    rule: "Build pit latrines at least 30 meters (100 feet) downhill from any water well, stream, or water source.",
    desc: "Prevents pathogenic bacteria and nitrates in human waste from leaching through soil fissures into groundwater."
  },
  {
    title: "Twin-Pit Pour-Flush Latrines",
    rule: "Use alternating twin pits with a junction chamber.",
    desc: "When one pit fills (approx. 3-5 years), divert flow to the second pit. The first pit safely turns into pathogen-free organic humus over 18-24 months."
  },
  {
    title: "Safe Household Water Storage",
    rule: "Store drinking water in vessels with a narrow mouth, secure lid, and dedicated dispense tap.",
    desc: "Never dip fingers or unwashed cups into drinking water containers. Clean storage vessels weekly with mild bleach solution."
  },
  {
    title: "Solid Waste & Greywater Drainage",
    rule: "Separate kitchen greywater into a soak pit or kitchen garden bed.",
    desc: "Eliminates standing puddle vectors for Aedes and Culex mosquito breeding (dengue, malaria, filariasis)."
  }
];

export const menstrualHygieneGuide = [
  {
    title: "Clean Absorbent Materials",
    tip: "Use sterile sanitary pads or thoroughly washed, sun-dried cotton cloths. Sun UV rays act as a natural sanitizer."
  },
  {
    title: "Changing Frequency",
    tip: "Change absorbent pads every 4 to 6 hours to prevent bacterial proliferation and Reproductive Tract Infections (RTI)."
  },
  {
    title: "Dignified Disposal",
    tip: "Wrap used products securely in paper and place in dedicated waste bins or eco-incinerators. Never flush pads down toilets to prevent catastrophic pipe blockages."
  },
  {
    title: "Safe Washing & Privacy",
    tip: "Wash reusable cloth pads with clean soap and water. Never dry them in dark or damp corners out of shame—proper sun drying is essential for disinfection."
  }
];

export const hygieneQuizQuestions = [
  {
    id: 1,
    question: "What is the minimum recommended duration for rubbing hands with soap according to the WHO?",
    options: ["5 seconds", "10 seconds", "20 seconds", "60 seconds"],
    correctIndex: 2,
    explanation: "Scrubbing hands with soap for at least 20 seconds (the time it takes to sing 'Happy Birthday' twice) ensures soap molecules break down bacterial and viral lipid envelopes."
  },
  {
    id: 2,
    question: "How far away should a pit latrine or septic tank be situated from a drinking water well?",
    options: ["5 meters", "10 meters", "At least 30 meters (100 feet)", "Distance does not matter"],
    correctIndex: 2,
    explanation: "A minimum separation of 30 meters (100 feet) protects the underground aquifer from fecal coliform bacteria and nitrogen infiltration."
  },
  {
    id: 3,
    question: "What is the standard ratio for preparing homemade Oral Rehydration Salts (ORS)?",
    options: [
      "1 tsp salt + 1 tsp sugar in 100ml water",
      "6 level teaspoons sugar + 1/2 level teaspoon salt in 1 Liter clean boiled water",
      "4 tablespoons salt + 1 tablespoon sugar in 2 Liters water",
      "Sugar only, no salt"
    ],
    correctIndex: 1,
    explanation: "This precise osmotic ratio allows the intestinal sodium-glucose co-transport mechanism to rapidly absorb water into the bloodstream, counteracting severe dehydration."
  },
  {
    id: 4,
    question: "Why should drinking water storage vessels have a narrow neck or a dispensing tap?",
    options: [
      "To keep the water chilled",
      "To prevent dirty hands and cups from contaminating the stored water",
      "To prevent evaporation",
      "For decorative appearance"
    ],
    correctIndex: 1,
    explanation: "Dipping hands or unwashed ladle cups into wide-mouth buckets is a primary cause of secondary re-contamination of purified drinking water in households."
  },
  {
    id: 5,
    question: "Which water purification method is best for killing 99.9% of biological pathogens at zero equipment cost?",
    options: ["Cloth straining", "Rolling boil for 1 minute", "Letting water sit overnight", "Freezing water"],
    correctIndex: 1,
    explanation: "Bringing water to a vigorous rolling boil for 1 full minute inactivates bacteria, viruses, and heat-resistant protozoan cysts like Giardia and Cryptosporidium."
  }
];
