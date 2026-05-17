import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from '@/AppRoutes';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <AppRoutes location={location} />;
}
