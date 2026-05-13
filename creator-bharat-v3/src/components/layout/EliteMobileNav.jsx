import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '@/core/context';
import { 
  Home, 
  Search, 
  LayoutDashboard, 
  User, 
  Zap, 
  Trophy, 
  Plus,
  Newspaper,
  IndianRupee
} from 'lucide-react';

/**
 * EliteMobileNav: A premium, haptic-feedback mobile navigation dock.
 * Features: 
 * - Role-based dynamic links
 * - Framer Motion layoutId for sliding indicator
 * - Haptic bounce animations
 * - Glassmorphism aesthetic
 */
// Static Nav Definitions to prevent re-creation on every render
const NAV_SETS = {
  public: [
    { id: 'home', l: 'Home', icon: Home, p: '/' },
    { id: 'creators', l: 'Creators', icon: Search, p: '/creators' },
    { id: 'hub', l: 'Hub', icon: Newspaper, p: '/blog' },
    { id: 'login', l: 'Account', icon: User, p: 'AUTH' } // Dynamic path handled below
  ],
  creator: [
    { id: 'dash', l: 'Overview', icon: LayoutDashboard, p: '/dashboard' },
    { id: 'deals', l: 'Deals', icon: Zap, p: '/applications' },
    { id: 'monetize', l: 'Earn', icon: IndianRupee, p: '/monetize' },
    { id: 'score', l: 'Score', icon: Trophy, p: '/creator-score' },
    { id: 'profile', l: 'Identity', icon: User, p: '/settings' }
  ],
  brand: [
    { id: 'control', l: 'Control', icon: LayoutDashboard, p: '/brand-dashboard' },
    { id: 'scout', l: 'Scout', icon: Search, p: '/creators' },
    { id: 'camps', l: 'Missions', icon: Zap, p: '/campaigns' },
    { id: 'profile', l: 'Settings', icon: User, p: '/settings' }
  ]
};

export default function EliteMobileNav({ role, user }) {
  const { st } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  // Use the freshest role from Global State for security
  const activeRole = st.user ? st.role : 'public';

  // Haptic Feedback Helper
  const triggerHaptic = () => {
    navigator?.vibrate?.(5); // Ultra-short pulse
  };

  const handlePress = (path) => {
    triggerHaptic();
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic Path Resolver for Account
  const accountPath = React.useMemo(() => {
    if (!st.user) return '/login';
    return st.role === 'brand' ? '/brand-dashboard' : '/dashboard';
  }, [st.user, st.role]);

  // Memoized Nav Set Selection
  const currentSet = React.useMemo(() => {
    const rawSet = NAV_SETS[activeRole] || NAV_SETS.public;
    return rawSet.map(item => ({
      ...item,
      p: item.p === 'AUTH' ? accountPath : item.p
    }));
  }, [activeRole, accountPath]);

  return (
    <div className="elite-dock-wrapper">
      <motion.div 
        initial={{ y: 100, x: '-50%', opacity: 0 }}
        animate={{ 
          y: st.ui.mobileMenu ? 120 : 0, 
          x: '-50%', 
          opacity: st.ui.mobileMenu ? 0 : 1 
        }}
        className="elite-dock-container"
      >
        {currentSet.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.p;

          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePress(item.p)}
              className={`elite-dock-btn ${isActive ? 'active' : ''}`}
            >
              <div className="elite-icon-box">
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                
                {/* Magnetic Sliding Indicator */}
                {isActive && (
                  <motion.div 
                    layoutId="dock-indicator"
                    className="elite-indicator"
                    transition={{ type: 'spring', bounce: 0.35, duration: 0.6 }}
                  />
                )}
              </div>
              <span className="elite-dock-label">{item.l}</span>
            </motion.button>
          );
        })}

        {/* Dynamic Center Action Button (Protected) */}
        {st.user && (
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: 15 }}
            className="elite-center-action"
            onClick={() => handlePress(st.role === 'brand' ? '/campaign-builder' : '/monetize')}
          >
            <Plus size={24} color="#FFF" strokeWidth={3} />
          </motion.button>
        )}
      </motion.div>

      <style>{`
        .elite-dock-wrapper {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 0;
          z-index: 9999;
          pointer-events: none;
        }

        .elite-dock-container {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: 92vw;
          max-width: 440px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-radius: 32px;
          padding: 8px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.1),
            0 0 1px rgba(0, 0, 0, 0.1);
          pointer-events: auto;
        }

        .elite-dock-btn {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 8px 0;
          background: none;
          border: none;
          cursor: pointer;
          color: #94a3b8;
          transition: color 0.3s ease;
          position: relative;
        }

        .elite-dock-btn.active {
          color: #FF9431;
        }

        .elite-icon-box {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 32px;
        }

        .elite-indicator {
          position: absolute;
          bottom: -4px;
          width: 20px;
          height: 3px;
          background: #FF9431;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(255, 148, 49, 0.4);
        }

        .elite-dock-label {
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          opacity: 0.7;
        }

        .elite-dock-btn.active .elite-dock-label {
          opacity: 1;
        }

        .elite-center-action {
          width: 52px;
          height: 52px;
          background: linear-gradient(135deg, #FF9431 0%, #EA580C 100%);
          border-radius: 20px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 8px;
          margin-right: 8px;
          box-shadow: 0 10px 20px rgba(255, 148, 49, 0.3);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .elite-center-action:active {
          transform: scale(0.9) rotate(45deg);
        }

        @media (min-width: 769px) {
          .elite-dock-wrapper { display: none; }
        }
      `}</style>
    </div>
  );
}

EliteMobileNav.propTypes = {
  role: PropTypes.oneOf(['public', 'creator', 'brand']).isRequired,
  user: PropTypes.object
};
