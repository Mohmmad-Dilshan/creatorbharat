import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Lenis from '@studio-freight/lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '@/core/context';
import Footer from '../home/Footer';
import Navbar from './Navbar';
import MobileMenu from './MobileMenu';
import ToastBar from './ToastBar';
import CompareBar from './CompareBar';
import DemoModal from './DemoModal';
import { Home, Users, BookOpen, Target } from 'lucide-react';

function FloatingMobileNav({ hide }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { st, dsp } = useApp();

  const go = (path) => { 
    if (path === '/dashboard') {
      if (st.user) {
        const targetPath = st.role === 'brand' ? '/brand-dashboard' : '/dashboard';
        navigate(targetPath);
      } else {
        navigate('/login');
      }
    } else {
      navigate(path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
    dsp({ t: 'UI', v: { mobileMenu: false } });
  };

  const navs = [
    { path: '/', l: 'Home', i: Home },
    { path: '/creators', l: 'Marketplace', i: Users },
    { path: '/blog', l: 'Hub', i: BookOpen },
    { path: '/dashboard', l: 'Profile', i: Target }
  ];

  return (
    <AnimatePresence>
      {!hide && (
        <motion.div 
          initial={{ y: 100, x: '-50%', opacity: 0 }}
          animate={{ y: 0, x: '-50%', opacity: 1 }}
          exit={{ y: 100, x: '-50%', opacity: 0 }}
          className="apple-nav-container" 
        >
          {navs.map(n => {
            const Icon = n.i;
            const active = location.pathname === n.path;
            return (
              <button
                key={n.path}
                onClick={() => go(n.path)}
                className={`apple-nav-btn ${active ? 'active' : ''}`}
              >
                <div className="apple-nav-icon-wrap">
                  <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                </div>
                <span className="apple-nav-label">{n.l}</span>
                {active && <div className="apple-nav-dot" />}
              </button>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

FloatingMobileNav.propTypes = {
  hide: PropTypes.bool
};

export default function Layout({ children }) {
  const { st } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);

  const isModalOpen = st.ui.demoModal || st.ui.mobileMenu;

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
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

    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => {
      window.removeEventListener('resize', h);
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <div className="public-layout-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff', position: 'relative' }}>
      
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

      {mob && <FloatingMobileNav hide={st.ui.hideNav || isModalOpen} />}

      <MobileMenu open={st.ui.mobileMenu} />

      <ToastBar />
      <CompareBar />

      {st.ui.demoModal && <DemoModal open={st.ui.demoModal} />}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
