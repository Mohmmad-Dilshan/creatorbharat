import React, { lazy, Suspense } from 'react';
import { useApp, AppProvider } from './context';
import { Navbar, Footer, AIChatbot } from './components/Layout';
import { Modal } from './components/Primitives';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const CreatorsPage = lazy(() => import('./pages/CreatorsPage'));
const CreatorProfilePage = lazy(() => import('./pages/CreatorProfilePage'));

function PageLoader() {
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAFA' }}>
      <div className="spin" style={{ width: 40, height: 40, border: '3px solid rgba(255,148,49,0.1)', borderTopColor: '#FF9431', borderRadius: '50%' }} />
    </div>
  );
}

function MainApp() {
  const { st, dsp } = useApp();

  const renderPage = () => {
    switch (st.page) {
      case 'home': return <HomePage />;
      case 'creators': return <CreatorsPage />;
      case 'creator-profile': return <CreatorProfilePage />;
      default: return <HomePage />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Suspense fallback={<PageLoader />}>
          {renderPage()}
        </Suspense>
      </main>
      <Footer />
      <AIChatbot />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
