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
import SavedPage from './pages/SavedPage';
import ApplicationsPage from './pages/ApplicationsPage';
import BrandRegisterPage from './pages/BrandRegisterPage';
import BrandDashboardPage from './pages/BrandDashboardPage';
import CampaignBuilderPage from './pages/CampaignBuilderPage';
import ComparePage from './pages/ComparePage';
import LoginPage from './pages/LoginPage';

export default function App() {
  const location = useLocation();

  // Pages that should not use the standard layout
  const noLayoutPaths = ['/apply', '/brand-register', '/login'];
  const useLayout = !noLayoutPaths.includes(location.pathname);

  const AppRoutes = () => (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
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
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/saved" element={<SavedPage />} />
      <Route path="/applications" element={<ApplicationsPage />} />
      <Route path="/brand-register" element={<BrandRegisterPage />} />
      <Route path="/brand-dashboard" element={<BrandDashboardPage />} />
      <Route path="/campaign-builder" element={<CampaignBuilderPage />} />
      <Route path="/compare" element={<ComparePage />} />
      {/* Fallback */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );

  return useLayout ? <Layout><AppRoutes /></Layout> : <AppRoutes />;
}
