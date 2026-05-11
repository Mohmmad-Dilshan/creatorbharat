import React from 'react';
import { useLocation } from 'react-router-dom';
import PublicLayout from '@/components/layout/PublicLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AppRoutes from '@/AppRoutes';
import { useApp } from '@/core/context';

export default function App() {
  const location = useLocation();
  const path = location.pathname;

  // Pages that skip the standard public layout (no navbar/footer)
  const noLayoutPaths = ['/apply', '/brand-register', '/login', '/forgot-password'];

  // Pages that use the internal dashboard layout
  const dashboardPrefixes = [
    '/dashboard',
    '/brand-dashboard',
    '/settings',
    '/wallet',
    '/applications',
    '/campaign-builder',
    '/creator-score',
    '/saved',
    '/monetize',
    '/monetization',
    '/compare',
  ];

  const isNoLayout = noLayoutPaths.includes(path);
  const isDashboard = dashboardPrefixes.some(p => path === p || path.startsWith(p + '/'));

  const { st } = useApp();

  if (isNoLayout) return <AppRoutes location={location} />;
  
  // Only use DashboardLayout if it's a dashboard path AND the user is logged in
  if (isDashboard && st.user) {
    return <DashboardLayout><AppRoutes location={location} /></DashboardLayout>;
  }

  // Otherwise, use the standard public layout (e.g., for home page or unauthenticated dashboard gatekeeper)
  return <PublicLayout><AppRoutes location={location} /></PublicLayout>;
}
