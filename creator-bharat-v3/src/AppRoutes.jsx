import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Routes, Route, Outlet } from 'react-router-dom';

// Layouts
import PublicLayout from '@/components/layout/PublicLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useApp } from '@/core/context';
import PremiumLock from '@/components/auth/PremiumLock';
import PageLoader from '@/components/common/PageLoader';

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
const BrandGuidelinesPage = lazy(() => import('./pages/legal/BrandGuidelinesPage'));

// Auth
import ProtectedRoute from '@/core/ProtectedRoute';
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const ApplyPage = lazy(() => import('./pages/auth/ApplyPage'));
const BrandRegisterPage = lazy(() => import('./pages/auth/BrandRegisterPage'));
const JoinPage = lazy(() => import('./pages/auth/JoinPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));
const VerificationPage = lazy(() => import('./pages/auth/VerificationPage'));
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPasswordPage'));
const NotFoundPage = lazy(() => import('./pages/public/NotFoundPage'));

// Blog
const BlogPage = lazy(() => import('./pages/blog/BlogPage'));
const BlogArticlePage = lazy(() => import('./pages/blog/BlogArticlePage'));

const Fallback = () => <PageLoader message="Entering Elite Ecosystem..." fullScreen darkTheme={false} />;

const AuthLock = ({ children }) => {
  const { st } = useApp();
  if (!st.user) return <PremiumLock>{children}</PremiumLock>;
  return children;
};

AuthLock.propTypes = {
  children: PropTypes.node.isRequired
};

export default function AppRoutes({ location }) {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes location={location}>
        
        {/* Auth & No-Layout Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/brand-register" element={<BrandRegisterPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Public Layout Group */}
        <Route element={<PublicLayout><Outlet /></PublicLayout>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/rate-calc" element={<AuthLock><RateCalcPage /></AuthLock>} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/official-profile" element={<OfficialProfilePage />} />
          <Route path="/creators" element={<CreatorsPage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/compare" element={<ProtectedRoute allowedRole="brand"><ComparePage /></ProtectedRoute>} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogArticlePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/creator-guidelines" element={<CreatorGuidelinesPage />} />
          <Route path="/brand-guidelines" element={<BrandGuidelinesPage />} />
          <Route path="/creator/:id" element={<CreatorProfilePage />} />
        </Route>

        {/* Dashboard Layout Group - Unified Protection */}
        <Route element={<ProtectedRoute><DashboardLayout><Outlet /></DashboardLayout></ProtectedRoute>}>
          
          {/* Creator ONLY Routes */}
          <Route element={<ProtectedRoute allowedRole="creator"><Outlet /></ProtectedRoute>}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/creator-score" element={<CreatorScorePage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/monetize" element={<MonetizationPage />} />
            <Route path="/monetization" element={<MonetizationPage />} />
            <Route path="/messages" element={<MessagesPage />} />
          </Route>
          
          {/* Brand ONLY Routes */}
          <Route element={<ProtectedRoute allowedRole="brand"><Outlet /></ProtectedRoute>}>
            <Route path="/brand-dashboard" element={<BrandDashboardPage />} />
            <Route path="/campaign-builder" element={<CampaignBuilderPage />} />
          </Route>

          {/* Shared Dashboard Routes (Settings) */}
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

AppRoutes.propTypes = {
  location: PropTypes.object
};

