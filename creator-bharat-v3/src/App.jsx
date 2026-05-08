import React from 'react';
import { useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardLayout from './components/layout/DashboardLayout';
import AppRoutes from './AppRoutes';

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

  if (isNoLayout) return <AppRoutes location={location} />;
  if (isDashboard) return <DashboardLayout><AppRoutes location={location} /></DashboardLayout>;

  return <Layout><AppRoutes location={location} /></Layout>;
}
