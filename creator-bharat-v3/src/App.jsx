import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';

// Pages
import HomePage from './pages/HomePage';
import CreatorsPage from './pages/CreatorsPage';
import CreatorProfilePage from './pages/CreatorProfilePage';
import CampaignsPage from './pages/CampaignsPage';
import BlogPage from './pages/BlogPage';
import BlogArticlePage from './pages/BlogArticlePage';
import MonetizationPage from './pages/MonetizationPage';
import PricingPage from './pages/PricingPage';
import LeaderboardPage from './pages/LeaderboardPage';
import RateCalcPage from './pages/RateCalcPage';
import CreatorScorePage from './pages/CreatorScorePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ApplyPage from './pages/ApplyPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import ApplicationsPage from './pages/ApplicationsPage';
import BrandRegisterPage from './pages/BrandRegisterPage';
import BrandDashboardPage from './pages/BrandDashboardPage';
import CampaignBuilderPage from './pages/CampaignBuilderPage';
import ComparePage from './pages/ComparePage';
import LoginPage from './pages/LoginPage';
import WalletPage from './pages/WalletPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/privacy" element={<PrivacyPage />} />
    <Route path="/terms" element={<TermsPage />} />
    <Route path="/creators" element={<CreatorsPage />} />
    <Route path="/creator/:id" element={<CreatorProfilePage />} />
    <Route path="/campaigns" element={<CampaignsPage />} />
    <Route path="/blog" element={<BlogPage />} />
    <Route path="/blog/:slug" element={<BlogArticlePage />} />
    <Route path="/monetize" element={<MonetizationPage />} />
    <Route path="/pricing" element={<PricingPage />} />
    <Route path="/leaderboard" element={<LeaderboardPage />} />
    <Route path="/rate-calc" element={<RateCalcPage />} />
    <Route path="/creator-score" element={<CreatorScorePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/apply" element={<ApplyPage />} />
    
    {/* Protected Creator Routes */}
    <Route path="/dashboard" element={<ProtectedRoute allowedRole="creator"><DashboardPage /></ProtectedRoute>} />
    <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
    <Route path="/wallet" element={<ProtectedRoute allowedRole="creator"><WalletPage /></ProtectedRoute>} />
    <Route path="/applications" element={<ProtectedRoute allowedRole="creator"><ApplicationsPage /></ProtectedRoute>} />
    
    {/* Protected Brand Routes */}
    <Route path="/brand-register" element={<BrandRegisterPage />} />
    <Route path="/brand-dashboard" element={<ProtectedRoute allowedRole="brand"><BrandDashboardPage /></ProtectedRoute>} />
    <Route path="/campaign-builder" element={<ProtectedRoute allowedRole="brand"><CampaignBuilderPage /></ProtectedRoute>} />
    
    <Route path="/compare" element={<ComparePage />} />
    {/* Fallback */}
    <Route path="*" element={<HomePage />} />
  </Routes>
);

export default function App() {
  const location = useLocation();

  // Pages that should not use the standard layout
  const noLayoutPaths = ['/apply', '/brand-register', '/login'];
  
  // Pages that should use the dashboard layout
  const dashboardPaths = [
    '/dashboard', 
    '/brand-dashboard', 
    '/settings', 
    '/wallet', 
    '/applications', 
    '/campaign-builder'
  ];

  const isNoLayout = noLayoutPaths.includes(location.pathname);
  const isDashboard = dashboardPaths.includes(location.pathname);

  if (isNoLayout) return <AppRoutes />;
  if (isDashboard) return <DashboardLayout><AppRoutes /></DashboardLayout>;
  
  return <Layout><AppRoutes /></Layout>;
}
