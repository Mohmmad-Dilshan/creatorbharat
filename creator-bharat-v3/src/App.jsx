import React from 'react';
import { useApp } from './context';
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

export default function App() {
  const { st } = useApp();

  const pages = {
    'home': <HomePage />,
    'creators': <CreatorsPage />,
    'creator-profile': <CreatorProfilePage />,
    'campaigns': <CampaignsPage />,
    'blog': <BlogPage />,
    'blog-article': <BlogArticlePage />,
    'monetize': <MonetizationPage />,
    'pricing': <PricingPage />,
    'leaderboard': <LeaderboardPage />,
    'rate-calc': <RateCalcPage />,
    'creator-score': <CreatorScorePage />,
    'about': <AboutPage />,
    'contact': <ContactPage />,
    'apply': <ApplyPage />,
    'dashboard': <DashboardPage />,
    'settings': <SettingsPage />,
    'saved': <SavedPage />,
    'applications': <ApplicationsPage />,
    'brand-register': <BrandRegisterPage />,
    'brand-dashboard': <BrandDashboardPage />,
    'campaign-builder': <CampaignBuilderPage />,
    'compare': <ComparePage />,
  };

  const currentPage = pages[st.page] || <HomePage />;

  // Some pages might not want the standard layout (like Apply or Register)
  const noLayoutPages = ['apply', 'brand-register'];
  const useLayout = !noLayoutPages.includes(st.page);

  return useLayout ? <Layout>{currentPage}</Layout> : currentPage;
}
