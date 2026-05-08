import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Public Pages
const HomePage = lazy(() => import('./pages/public/HomePage'));
const AboutPage = lazy(() => import('./pages/public/AboutPage'));
const ContactPage = lazy(() => import('./pages/public/ContactPage'));
const PricingPage = lazy(() => import('./pages/public/PricingPage'));
const FAQPage = lazy(() => import('./pages/public/FAQPage'));
const RateCalcPage = lazy(() => import('./pages/public/RateCalcPage'));
const LeaderboardPage = lazy(() => import('./pages/public/LeaderboardPage'));

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
const MonetizePage = lazy(() => import('./pages/creator/MonetizePage'));
const MonetizationPage = lazy(() => import('./pages/creator/MonetizationPage'));

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

export default function AppRoutes({ location }) {
  return (
    <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050505', color: '#fff', fontFamily: 'system-ui' }}>Loading...</div>}>
      <Routes location={location}>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/rate-calc" element={<RateCalcPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        
        {/* Brand/Marketplace */}
        <Route path="/creators" element={<CreatorsPage />} />
        <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="/campaign-builder" element={<CampaignBuilderPage />} />
        <Route path="/brand-dashboard" element={<BrandDashboardPage />} />
        <Route path="/compare" element={<ComparePage />} />

        {/* Creator Routes */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/creator-score" element={<CreatorScorePage />} />
        <Route path="/creator/:id" element={<CreatorProfilePage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/monetize" element={<MonetizePage />} />
        <Route path="/monetization" element={<MonetizationPage />} />

        {/* Legal */}
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/creator-guidelines" element={<CreatorGuidelinesPage />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/brand-register" element={<BrandRegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Blog */}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogArticlePage />} />

        {/* Fallback */}
        <Route path="*" element={<div style={{ padding: '100px', textAlign: 'center', background: '#050505', color: '#fff', minHeight: '100vh' }}><h1>404 - Page Not Found</h1><p>The page you are looking for does not exist.</p></div>} />
      </Routes>
    </Suspense>
  );
}
