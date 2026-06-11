import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);

  // Redirect logged-in creators to their isolated private workspace
  useEffect(() => {
    if (st.user && st.role === 'creator') {
      const path = location.pathname;

      if (path.startsWith('/creator/')) {
        const creatorProfileMatch = path.match(/^\/creator\/([^/]+)$/);
        if (creatorProfileMatch) {
          const id = creatorProfileMatch[1];
          const knownSubRoutes = ['dashboard', 'onboarding', 'profile', 'public-preview', 'opportunities', 'applications', 'brand-requests', 'community', 'wallet', 'analytics', 'monetization', 'score', 'verification', 'calendar', 'messages', 'saved', 'settings', 'help', 'events', 'achievements', 'blog', 'official-profile', 'verify-guide', 'stories', 'rate-calc', 'leaderboard', 'guidelines', 'pricing', 'about', 'contact', 'faq', 'privacy', 'terms', 'cookies', 'refunds'];
          if (!knownSubRoutes.includes(id)) {
            navigate(`/creator/c/${id}`, { replace: true });
          }
        }
        return;
      }

      if (path === '/' || path === '/brand' || path === '/creator-hub') {
        navigate('/creator/dashboard', { replace: true });
      } else if (path === '/creators' || path === '/campaigns') {
        navigate('/creator/opportunities', { replace: true });
      } else if (path === '/creator-guidelines') {
        navigate('/creator/guidelines', { replace: true });
      } else if (path === '/brand-guidelines') {
        navigate('/creator/dashboard', { replace: true });
      } else if (path.startsWith('/blog/')) {
        navigate(`/creator/blog/${path.slice(6)}`, { replace: true });
      } else {
        const targetPath = `/creator${path}`;
        navigate(targetPath, { replace: true });
      }
    }
  }, [st.user, st.role, location.pathname, navigate]);

  const isModalOpen = st.ui.demoModal || st.ui.mobileMenu;
  const isBlogRoute = location.pathname.startsWith('/blog');
  const showFooter = !mob || location.pathname === '/' || isBlogRoute;

  useEffect(() => {
    const isMobile = globalThis.innerWidth < 768;
    let lenis = null;

    // Disable Lenis on creator profile pages — sticky tab bar needs native scroll
    const isCreatorProfile = location.pathname.startsWith('/creator/');
    const isCreatorProfilePublic = /^\/creator\/[^/]+$/.test(location.pathname);

    if (!isMobile && !isCreatorProfilePublic) {
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
  }, [location.pathname]);

  return (
    <div className="public-layout-root" style={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', background: '#fff', position: 'relative' }}>
      
      {/* Navbar stays OUTSIDE the transformed container to remain truly FIXED to viewport */}
      {!isModalOpen && <Navbar />}

      <div style={{ 
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        filter: isModalOpen ? 'blur(12px)' : undefined,
        transform: isModalOpen ? 'scale(0.98)' : undefined,
        opacity: isModalOpen ? 0.6 : 1,
        pointerEvents: isModalOpen ? 'none' : 'auto',
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }}>
        <main style={{ flex: 1, position: 'relative', paddingTop: mob ? 60 : 80 }}>
          {children}
        </main>
        {showFooter && <Footer mob={mob} />}
      </div>

      {/* ELITE MOBILE NAV - GLOBAL EXPERIENCE */}
      {mob && !st.ui.hideNav && !isModalOpen && (
        <EliteMobileNav role={st.user ? st.role : 'public'} user={st.user} />
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
