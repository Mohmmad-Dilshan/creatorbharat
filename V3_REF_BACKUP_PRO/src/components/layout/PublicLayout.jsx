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
  const { dsp } = useApp();

  const go = (path) => { 
    navigate(path);
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
          style={{
            position: 'fixed', bottom: 24, left: '50%',
            zIndex: 999990, width: '90%', maxWidth: 400, 
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)',
            borderRadius: 32, padding: '6px 12px', display: 'flex', 
            justifyContent: 'space-around', alignItems: 'center',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 20px 48px rgba(0,0,0,0.12)'
          }}
        >
          {navs.map(n => {
            const Icon = n.i;
            const active = location.pathname === n.path;
            return (
              <button
                key={n.path}
                onClick={() => go(n.path)}
                style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  padding: '10px 0', borderRadius: 24, border: 'none', cursor: 'pointer',
                  background: 'transparent',
                  color: active ? '#FF9431' : 'rgba(0,0,0,0.4)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative'
                }}
              >
                <div style={{
                  transform: active ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}>
                  <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                </div>
                <span style={{ 
                  fontSize: 10, fontWeight: 800, 
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                  opacity: active ? 1 : 0.6
                }}>{n.l}</span>
                {active && (
                   <div style={{ 
                     position: 'absolute', bottom: -2, width: 4, height: 4, 
                     borderRadius: '50%', background: '#FF9431',
                     boxShadow: '0 0 10px rgba(255,148,49,0.5)'
                   }} />
                )}
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <style>{`
        @keyframes spinBorder {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes flagSweep {
          to { background-position: 200% center; }
        }
        .logo-text-animated {
          background: linear-gradient(90deg, #FF9431, #FFFFFF, #128807, #FF9431);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: flagSweep 3s linear infinite;
        }
        .nav-link {
          position: relative;
          transition: all 0.3s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          width: 0;
          height: 2px;
          background: #FF9431;
          transition: all 0.3s;
          transform: translateX(-50%);
        }
        .nav-link:hover::after {
          width: 20px;
        }
        .mobile-nav-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(12px); z-index: 999991;
        }
        .mobile-nav-sheet {
          position: fixed; left: 12px; right: 12px; bottom: 12px; background: rgba(255, 255, 255, 0.95); 
          backdrop-filter: blur(200px); -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(0,0,0,0.05); border-radius: 40px;
          padding: 40px 24px; z-index: 999992; box-shadow: 0 -20px 60px rgba(0,0,0,0.15);
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .mobile-menu-item {
          padding: 16px 24px; border-radius: 20px; color: #111; font-weight: 800; font-size: 18px;
          display: flex; alignItems: center; gap: 16px; transition: all 0.2s; cursor: pointer;
        }
        .mobile-menu-item:active { background: rgba(0,0,0,0.05); transform: scale(0.98); }
        .hamburger-bar {
          width: 24px; height: 2px; background: #111; border-radius: 10px; transition: all 0.3s;
        }
        .floating-nav-bar {
          position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
          background: rgba(17, 17, 17, 0.9); backdrop-filter: blur(12px);
          padding: 8px; border-radius: 100px; display: flex; gap: 4px; z-index: 5500;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);
        }
        @keyframes slideUp { from { transform: translateY(120%); } to { transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

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
        <main style={{ flex: 1, position: 'relative', paddingTop: mob ? 64 : 80 }}>
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
