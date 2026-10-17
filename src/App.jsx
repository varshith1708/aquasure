import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Breadcrumbs from './components/Breadcrumbs';
import Chatbot from './components/Chatbot';
import GlobalSearch from './components/GlobalSearch';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';

import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import MapPage from './pages/MapPage';
import ReportPage from './pages/ReportPage';
import TestingGuidePage from './pages/TestingGuidePage';
import PurificationPage from './pages/PurificationPage';
import EducationPage from './pages/EducationPage';
import CalculatorPage from './pages/CalculatorPage';
import AlertsPage from './pages/AlertsPage';
import CommunityPage from './pages/CommunityPage';
import AdminPage from './pages/AdminPage';
import ResourcesPage from './pages/ResourcesPage';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// Scroll to top automatically on route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      <ScrollToTop />
      
      {/* Top Main Navigation */}
      <Navbar />

      {/* Breadcrumbs for inner pages */}
      <Breadcrumbs />

      {/* Main Page Routing */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/testing-guide" element={<TestingGuidePage />} />
          <Route path="/purification" element={<PurificationPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Global Interactive Elements */}
      <Footer />
      <Chatbot />
      <GlobalSearch />
      <AuthModal />
      <Toast />
    </div>
  );
}
