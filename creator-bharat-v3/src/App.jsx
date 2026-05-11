import React from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from '@/AppRoutes';

export default function App() {
  const location = useLocation();
  return <AppRoutes location={location} />;
}
