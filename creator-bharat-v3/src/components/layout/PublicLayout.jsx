import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Lenis from '@studio-freight/lenis';
import { useApp } from '@/core/context';
import Footer from '../home/Footer';
import Navbar from './Navbar';
import MobileMenu from './MobileMenu';
import ToastBar from './ToastBar';
import CompareBar from './CompareBar';
import DemoModal from './DemoModal';
import EliteMobileNav from './EliteMobileNav';

/**
 * PublicLayout: Modernized layout for all public-facing pages.
 * Integrates Lenis smooth scrolling (desktop) and EliteMobileNav (mobile).
 */
export default function PublicLayout({ children }) {
  const { st } = useApp();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);

  const isModalOpen = st.ui.demoModal || st.ui.mobileMenu;

  useEffect(() => {
    const isMobile = globalThis.innerWidth < 768;
    let lenis = null;

    if (!isMobile) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      function raf(time) {
        if (lenis) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
      }
      requestAnimationFrame(raf);
    }

    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => {
      globalThis.removeEventListener('resize', h);
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <div className="public-layout-root" style={{ minHeight: '100vh', width: '100%', overflowX: 'hidden', display: 'flex', flexDirection: 'column', background: '#fff', position: 'relative' }}>
      
      {/* Navbar stays OUTSIDE the transformed container to remain truly FIXED to viewport */}
      {!isModalOpen && <Navbar />}

      <div style={{ 
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        filter: isModalOpen ? 'blur(12px)' : 'none',
        transform: isModalOpen ? 'scale(0.98)' : 'none',
        opacity: isModalOpen ? 0.6 : 1,
        pointerEvents: isModalOpen ? 'none' : 'auto',
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }}>
        <main style={{ flex: 1, position: 'relative', paddingTop: mob ? 60 : 80 }}>
          {children}
        </main>
        <Footer mob={mob} />
      </div>

      {/* ELITE MOBILE NAV - GLOBAL EXPERIENCE */}
      {mob && !st.ui.hideNav && !isModalOpen && (
        <EliteMobileNav role="public" user={st.user} />
      )}

      <MobileMenu open={st.ui.mobileMenu} />
      <ToastBar />
      <CompareBar />
      {st.ui.demoModal && <DemoModal open={st.ui.demoModal} />}
    </div>
  );
}

PublicLayout.propTypes = {
  children: PropTypes.node.isRequired
};
