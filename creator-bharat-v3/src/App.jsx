import React from 'react';
import { useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardLayout from './components/layout/DashboardLayout';
import AppRoutes from './AppRoutes';

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

  if (isNoLayout) return <AppRoutes location={location} />;
  if (isDashboard) return <DashboardLayout><AppRoutes location={location} /></DashboardLayout>;
  
  return <Layout><AppRoutes location={location} /></Layout>;
}
