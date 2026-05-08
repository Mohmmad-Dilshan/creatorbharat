import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import ProtectedRoute from './components/ProtectedRoute';
import PageTransition from './components/layout/PageTransition';

// Loading Fallback
const PageLoader = () => (
  <div style={{ 
    height: '100vh', 
    width: '100%', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    background: '#fff'
  }}>
    <div className="spin" style={{ 
      width: 40, 
      height: 40, 
      border: '3px solid rgba(255,148,49,0.1)', 
      borderTopColor: '#FF9431', 
      borderRadius: '50%' 
    }} />
  </div>
);

// Lazy Loaded Pages
const HomePage = lazy(() => import('./pages/public/HomePage'));
const CreatorsPage = lazy(() => import('./pages/brand/CreatorsPage'));
const CreatorProfilePage = lazy(() => import('./pages/creator/CreatorProfilePage'));
const CampaignsPage = lazy(() => import('./pages/brand/CampaignsPage'));
const BlogPage = lazy(() => import('./pages/blog/BlogPage'));
const BlogArticlePage = lazy(() => import('./pages/blog/BlogArticlePage'));
const MonetizationPage = lazy(() => import('./pages/creator/MonetizationPage'));
const PricingPage = lazy(() => import('./pages/public/PricingPage'));
const LeaderboardPage = lazy(() => import('./pages/public/LeaderboardPage'));
const RateCalcPage = lazy(() => import('./pages/public/RateCalcPage'));
const CreatorScorePage = lazy(() => import('./pages/creator/CreatorScorePage'));
const AboutPage = lazy(() => import('./pages/public/AboutPage'));
const ContactPage = lazy(() => import('./pages/public/ContactPage'));
const ApplyPage = lazy(() => import('./pages/auth/ApplyPage'));
const DashboardPage = lazy(() => import('./pages/creator/DashboardPage'));
const SettingsPage = lazy(() => import('./pages/creator/SettingsPage'));
const ApplicationsPage = lazy(() => import('./pages/creator/ApplicationsPage'));
const BrandRegisterPage = lazy(() => import('./pages/auth/BrandRegisterPage'));
const BrandDashboardPage = lazy(() => import('./pages/brand/BrandDashboardPage'));
const CampaignBuilderPage = lazy(() => import('./pages/brand/CampaignBuilderPage'));
const ComparePage = lazy(() => import('./pages/brand/ComparePage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const WalletPage = lazy(() => import('./pages/creator/WalletPage'));
const PrivacyPage = lazy(() => import('./pages/legal/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/legal/TermsPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));

const AppRoutes = ({ location }) => {
  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
          <Route path="/forgot-password" element={<PageTransition><ForgotPasswordPage /></PageTransition>} />
          <Route path="/privacy" element={<PageTransition><PrivacyPage /></PageTransition>} />
          <Route path="/terms" element={<PageTransition><TermsPage /></PageTransition>} />
          <Route path="/creators" element={<PageTransition><CreatorsPage /></PageTransition>} />
          <Route path="/creator/:id" element={<PageTransition><CreatorProfilePage /></PageTransition>} />
          <Route path="/campaigns" element={<PageTransition><CampaignsPage /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
          <Route path="/blog/:slug" element={<PageTransition><BlogArticlePage /></PageTransition>} />
          <Route path="/monetize" element={<PageTransition><MonetizationPage /></PageTransition>} />
          <Route path="/pricing" element={<PageTransition><PricingPage /></PageTransition>} />
          <Route path="/leaderboard" element={<PageTransition><LeaderboardPage /></PageTransition>} />
          <Route path="/rate-calc" element={<PageTransition><RateCalcPage /></PageTransition>} />
          <Route path="/creator-score" element={<PageTransition><CreatorScorePage /></PageTransition>} />
          <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
          <Route path="/apply" element={<PageTransition><ApplyPage /></PageTransition>} />
          
          <Route path="/dashboard" element={<ProtectedRoute allowedRole="creator"><PageTransition><DashboardPage /></PageTransition></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><PageTransition><SettingsPage /></PageTransition></ProtectedRoute>} />
          <Route path="/wallet" element={<ProtectedRoute allowedRole="creator"><PageTransition><WalletPage /></PageTransition></ProtectedRoute>} />
          <Route path="/applications" element={<ProtectedRoute allowedRole="creator"><PageTransition><ApplicationsPage /></PageTransition></ProtectedRoute>} />
          
          <Route path="/brand-register" element={<PageTransition><BrandRegisterPage /></PageTransition>} />
          <Route path="/brand-dashboard" element={<ProtectedRoute allowedRole="brand"><PageTransition><BrandDashboardPage /></PageTransition></ProtectedRoute>} />
          <Route path="/campaign-builder" element={<ProtectedRoute allowedRole="brand"><PageTransition><CampaignBuilderPage /></PageTransition></ProtectedRoute>} />
          
          <Route path="/compare" element={<PageTransition><ComparePage /></PageTransition>} />
          <Route path="*" element={<PageTransition><HomePage /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

AppRoutes.propTypes = {
  location: PropTypes.object.isRequired
};

export default AppRoutes;
