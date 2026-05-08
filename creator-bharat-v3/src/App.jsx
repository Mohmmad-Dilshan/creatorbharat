import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

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

const AppRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
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
  </Suspense>
);

export default function App() {
  const location = useLocation();

  // Pages that should not use the standard layout (Auth/Landing focus)
  const noLayoutPaths = ['/apply', '/brand-register', '/login', '/forgot-password'];
  
  // Pages that should use the dashboard layout (Internal focus)
  const dashboardPaths = [
    '/dashboard', 
    '/brand-dashboard', 
    '/settings', 
    '/wallet', 
    '/applications', 
    '/campaign-builder',
    '/creator-score'
  ];

  const isNoLayout = noLayoutPaths.includes(location.pathname);
  const isDashboard = dashboardPaths.includes(location.pathname);

  if (isNoLayout) return <AppRoutes />;
  if (isDashboard) return <DashboardLayout><AppRoutes /></DashboardLayout>;
  
  return <Layout><AppRoutes /></Layout>;
}
