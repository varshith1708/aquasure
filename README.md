# 🌊 AquaSure — Clean Water & Sanitation Platform (UN SDG 6)

AquaSure is a modern, responsive civic-tech and public health platform engineered to monitor water quality, empower community hazard reporting, map safe public taps, and provide decentralized sanitation education aligned with **United Nations Sustainable Development Goal 6 (SDG 6)**.

---

## 🌟 Key Features & Pages

| # | Feature / Page | Highlights |
|---|---|---|
| 1 | **Landing Page (`/`)** | Hero with ripple motif, live impact counters, core feature cards, real-time alert ticker, testimonials, and global partner logos. |
| 2 | **Water Quality Dashboard (`/dashboard`)** | Interactive Recharts analytics for pH, Turbidity, TDS, Free Chlorine, and Bacteria; regional filters, status benchmarks (Safe/Caution/Unsafe), and single-click CSV export. |
| 3 | **Interactive Safe Tap Map (`/map`)** | Leaflet map with colored markers for borewells, treatment plants, public standposts, sanitation hubs, and reported hazards; "Find Nearest Safe Tap" using geolocation with distance and walk-time estimates. |
| 4 | **Report an Issue (`/report`)** | Photo upload with instant preview, location picker, severity levels, ticket ID generation (e.g. `AQ-2026-XXXX`), and an interactive 4-stage Status Tracker (Submitted → In Review → In Progress → Resolved). |
| 5 | **Water Testing Guide (`/testing-guide`)** | 5-step interactive home water testing checklist and an interactive "Is My Water Safe?" diagnostic quiz with scoring and custom recommendations. |
| 6 | **Purification Encyclopedia (`/purification`)** | In-depth comparative guide for Boiling, Chlorination, Ceramic Filters, SODIS, and Reverse Osmosis (RO) with an interactive situation recommender wizard. |
| 7 | **Sanitation & Hygiene Education (`/education`)** | Multilingual WASH center supporting **English, Hindi (हिंदी), Gujarati (ગુજરાતી), and Telugu (తెలుగు)**; WHO 6-step handwashing with a 20-second practice timer, disease prevention center (Cholera, Typhoid, Diarrhea, Hepatitis A with emergency ORS recipe), and interactive knowledge quiz. |
| 8 | **Water Usage Calculator (`/calculator`)** | Household water consumption simulator with sliders, Recharts breakdown donut/bar charts, WHO baseline comparisons, and personalized savings tips. |
| 9 | **Alerts Center (`/alerts`)** | Boil-water advisories, maintenance notices, and emergency supply schedules with SMS/email subscription simulation. |
| 10 | **Community & Volunteers (`/community`)** | Clean-up drives, volunteer registration, active contributor leaderboard, and a crowdfunding donation portal with mock payment UI and printable contribution certificates. |
| 11 | **Admin Dashboard (`/admin`)** | Role-based login (Field Admin demo), ticket lifecycle status management, new water point registry, and complete JSON/CSV data export. |
| 12 | **AquaBot Assistant (Floating Widget)** | 24/7 AI chatbot with preset chips and intelligent query matching for instant boiling guidelines, testing protocols, and reporting assistance. |
| 13 | **Resources & Blog (`/resources`)** | Evidence-based articles on hydrology and sanitation, downloadable printable PDF toolkits, and comprehensive FAQ accordions. |
| 14 | **Emergency Contact & Helplines (`/contact`)** | 24/7 regional water crisis hotlines and civic inquiry submission form. |
| 15 | **User Profile (`/profile`)** | Bookmarked water points with direct map navigation and personal incident filing history. |

---

## 🛠 Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS + PostCSS + Custom Themes (Water-themed palette: Deep Blue `#0A4D8C`, Aqua/Teal `#14B8A6`, Slate Gray)
- **Routing:** React Router v6
- **Data Visualizations:** Recharts (Area, Bar, Pie charts)
- **Maps:** Leaflet + Custom SVG DivIcons
- **Icons:** Lucide React
- **Persistence:** Local-first architecture using Browser LocalStorage (zero backend required, easy API plug-in)
- **PWA:** Web App Manifest and Service Worker for offline asset caching
- **Accessibility:** WCAG 2.1 AA compliant colors, semantic HTML, and keyboard navigation (⌘K global search)

---

## 🚀 Setup & Running Locally

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation & Run

1. Navigate to the `aquasure` directory:
   ```bash
   cd aquasure
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://127.0.0.1:5173/
   ```

5. To build for production:
   ```bash
   npm run build
   ```

---

## 👥 Demo Accounts & Roles

AquaSure features instant one-click demo logins via the **Sign In** modal:
- **Field Admin:** `Dr. Alok Verma` (Access to Admin Console, status updates, and source additions)
- **Citizen Volunteer:** `Aarav Sharma` (Report filing, saving favorite taps, leaderboard)

---

## 📜 License
Open-source under the MIT License. Developed for humanitarian access to clean water and sanitation.
