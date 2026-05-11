import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Routes, Route, Outlet } from 'react-router-dom';

// Layouts
import PublicLayout from '@/components/layout/PublicLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Public Pages
const HomePage = lazy(() => import('./pages/public/HomePage'));
const AboutPage = lazy(() => import('./pages/public/AboutPage'));
const ContactPage = lazy(() => import('./pages/public/ContactPage'));
const PricingPage = lazy(() => import('./pages/public/PricingPage'));
const FAQPage = lazy(() => import('./pages/public/FAQPage'));
const RateCalcPage = lazy(() => import('./pages/public/RateCalcPage'));
const LeaderboardPage = lazy(() => import('./pages/public/LeaderboardPage'));
const OfficialProfilePage = lazy(() => import('./pages/public/OfficialProfilePage'));

// Brand/Marketplace Pages
const CreatorsPage = lazy(() => import('./pages/brand/CreatorsPage'));
const CampaignsPage = lazy(() => import('./pages/brand/CampaignsPage'));
const CampaignBuilderPage = lazy(() => import('./pages/brand/CampaignBuilderPage'));
const BrandDashboardPage = lazy(() => import('./pages/brand/BrandDashboardPage'));
const ComparePage = lazy(() => import('./pages/brand/ComparePage'));

// Creator Pages
const DashboardPage = lazy(() => import('./pages/creator/DashboardPage'));
const SettingsPage = lazy(() => import('./pages/creator/SettingsPage'));
const WalletPage = lazy(() => import('./pages/creator/WalletPage'));
const ApplicationsPage = lazy(() => import('./pages/creator/ApplicationsPage'));
const CreatorScorePage = lazy(() => import('./pages/creator/CreatorScorePage'));
const CreatorProfilePage = lazy(() => import('./pages/creator/CreatorProfilePage'));
const SavedPage = lazy(() => import('./pages/creator/SavedPage'));
const MonetizationPage = lazy(() => import('./pages/creator/MonetizationPage'));
const MessagesPage = lazy(() => import('./pages/creator/MessagesPage'));

// Legal
const PrivacyPage = lazy(() => import('./pages/legal/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/legal/TermsPage'));
const CreatorGuidelinesPage = lazy(() => import('./pages/legal/CreatorGuidelinesPage'));

// Auth
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const ApplyPage = lazy(() => import('./pages/auth/ApplyPage'));
const BrandRegisterPage = lazy(() => import('./pages/auth/BrandRegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));

// Blog
const BlogPage = lazy(() => import('./pages/blog/BlogPage'));
const BlogArticlePage = lazy(() => import('./pages/blog/BlogArticlePage'));

const Fallback = () => (
  <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050505', color: '#fff', fontFamily: 'system-ui' }}>
    <div style={{ textAlign: 'center' }}>
       <h1 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '12px' }}>LOADING ELITE EXPERIENCE</h1>
       <p style={{ opacity: 0.5, fontSize: '14px' }}>Bharat's Creator Ecosystem is warming up...</p>
    </div>
  </div>
);

export default function AppRoutes({ location }) {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes location={location}>
        
        {/* Auth & No-Layout Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/brand-register" element={<BrandRegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Public Layout Group */}
        <Route element={<PublicLayout><Outlet /></PublicLayout>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/rate-calc" element={<RateCalcPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/official-profile" element={<OfficialProfilePage />} />
          <Route path="/creators" element={<CreatorsPage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogArticlePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/creator-guidelines" element={<CreatorGuidelinesPage />} />
          <Route path="/creator/:id" element={<CreatorProfilePage />} />
        </Route>

        {/* Dashboard Layout Group */}
        <Route element={<DashboardLayout><Outlet /></DashboardLayout>}>
          {/* Creator Dash */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/creator-score" element={<CreatorScorePage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/monetize" element={<MonetizationPage />} />
          <Route path="/monetization" element={<MonetizationPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          
          {/* Brand Dash */}
          <Route path="/brand-dashboard" element={<BrandDashboardPage />} />
          <Route path="/campaign-builder" element={<CampaignBuilderPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<div style={{ padding: '100px', textAlign: 'center', background: '#050505', color: '#fff', minHeight: '100vh' }}><h1>404 - Page Not Found</h1><p>The page you are looking for does not exist.</p></div>} />
      </Routes>
    </Suspense>
  );
}

AppRoutes.propTypes = {
  location: PropTypes.object
};

