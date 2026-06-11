import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from '@/AppRoutes';
import PWAInstallPrompt from '@/components/common/PWAInstallPrompt';
import PWAUpdatePrompt from '@/components/common/PWAUpdatePrompt';
import ErrorBoundary from '@/components/common/ErrorBoundary';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ErrorBoundary>
      <AppRoutes location={location} />
      <PWAInstallPrompt />
      <PWAUpdatePrompt />
    </ErrorBoundary>
  );
}
