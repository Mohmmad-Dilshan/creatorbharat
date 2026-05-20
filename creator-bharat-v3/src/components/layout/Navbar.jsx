import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '@/core/context';
import { Logo, Btn } from '@/components/common/Primitives';
import { T } from '@/core/theme';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavDropdown = ({ label, items, go, location }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 200); // 200ms grace period to bridge mouse movements
  };

  const handleTriggerClick = (e) => {
    e.stopPropagation();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const anyActive = items.some(item => location.pathname === item.path);

  return (
    <div 
      ref={dropdownRef} 
      style={{ position: 'relative' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="none"
    >
      <button
        onClick={handleTriggerClick}
        className="nav-link dropdown-trigger"
        style={{
          padding: '10px 18px', borderRadius: 100, border: 'none',
          background: anyActive ? 'rgba(0,0,0,0.04)' : 'transparent',
          color: anyActive ? '#111' : 'rgba(0,0,0,0.5)',
          fontWeight: 800, fontSize: 13, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 4,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {label}
        <ChevronDown size={14} style={{ 
          transform: open ? 'rotate(180deg)' : 'none', 
          transition: 'transform 0.2s ease',
          opacity: 0.7
        }} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, y: 15, x: '-50%' }}
            animate={{ opacity: 1, y: 8, x: '-50%' }}
            exit={{ opacity: 0, y: 15, x: '-50%' }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: 16,
              padding: '8px',
              minWidth: 160,
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              zIndex: 999999
            }}
          >
            {items.map(item => {
              const active = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    setOpen(false);
                    go(item.path);
                  }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: 'none',
                    background: active ? 'rgba(0,0,0,0.04)' : 'transparent',
                    color: active ? '#FF9431' : 'rgba(0,0,0,0.7)',
                    fontWeight: 700,
                    fontSize: 12,
                    textAlign: 'left',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => {
                    e.target.style.background = 'rgba(0,0,0,0.03)';
                    if (!active) e.target.style.color = '#111';
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = active ? 'rgba(0,0,0,0.04)' : 'transparent';
                    e.target.style.color = active ? '#FF9431' : 'rgba(0,0,0,0.7)';
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

NavDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  go: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

const NavLinks = ({ links, location, go }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, justifyContent: 'center' }}>
    {links.map((link) => {
      if (link.items) {
        return (
          <NavDropdown 
            key={link.label} 
            label={link.label} 
            items={link.items} 
            go={go} 
            location={location} 
          />
        );
      }
      
      const active = location.pathname === link.path;
      return (
        <button
          key={link.path}
          onClick={() => go(link.path)}
          className="nav-link"
          style={{
            padding: '10px 18px', borderRadius: 100, border: 'none',
            background: active ? 'rgba(0,0,0,0.04)' : 'transparent',
            color: active ? '#111' : 'rgba(0,0,0,0.5)',
            fontWeight: 800, fontSize: 13, cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {link.label}
        </button>
      );
    })}
  </div>
);

NavLinks.propTypes = {
  links: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  go: PropTypes.func.isRequired
};

const UserActions = ({ st, dsp, go, mob }) => {
  if (st.user) {
    return (
      <button
        onClick={() => dsp({ t: 'UI', v: { mobileMenu: !st.ui.mobileMenu } })}
        style={{
          display: 'flex', alignItems: 'center', gap: 10, background: '#fff',
          border: '1px solid rgba(0,0,0,0.06)', borderRadius: 100,
          padding: mob ? '4px' : '5px 16px 5px 5px', cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)', transition: '0.2s'
        }}
      >
        <img src={st.user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(st.user.name || 'User')}&background=FF9431&color=fff`} style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover' }} alt={st.user.name || 'User'} />
        {!mob && <span style={{ fontSize: 13, fontWeight: 900, color: '#111' }}>{(st.user.name || '').split(' ')[0] || 'User'}</span>}
      </button>
    );
  }

  return (
    <>
      {!mob && <button onClick={() => go('/login')} style={{ background: 'transparent', border: 'none', color: '#111', fontSize: 13, fontWeight: 800, cursor: 'pointer', padding: '0 16px' }}>Sign In</button>}
      <Btn lg onClick={() => go('/join')} style={{ fontWeight: 900, borderRadius: 100, padding: mob ? '10px 20px' : '12px 32px', fontSize: 13, background: T.gd, color: '#fff', border: 'none', boxShadow: `0 8px 24px rgba(255,148,49,0.2)` }}>
        {mob ? 'Join' : 'Claim Your Profile'}
      </Btn>
      {mob && (
        <button
          onClick={() => dsp({ t: 'UI', v: { mobileMenu: !st.ui.mobileMenu } })}
          style={{ background: '#f1f5f9', border: 'none', width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#111' }}
        >
          {st.ui.mobileMenu ? <X size={22} /> : <Menu size={22} />}
        </button>
      )}
    </>
  );
};

UserActions.propTypes = {
  st: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string,
      photo: PropTypes.string
    }),
    ui: PropTypes.shape({
      mobileMenu: PropTypes.bool
    })
  }).isRequired,
  dsp: PropTypes.func.isRequired,
  go: PropTypes.func.isRequired,
  mob: PropTypes.bool
};

export default function Navbar() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [scroll, setScroll] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const [mob, setMob] = useState(window.innerWidth < 768);
  const [compactNav, setCompactNav] = useState(window.innerWidth < 1180);

  useEffect(() => {
    const handleScroll = () => {
      const curY = window.scrollY;
      const isMob = window.innerWidth < 768;
      const isCompact = window.innerWidth < 1180;
      setScroll(curY > 20);
      setMob(isMob);
      setCompactNav(isCompact);
      
      const diff = curY - lastY.current;
      if (curY < 50) setVisible(true);
      else if (diff > 10) setVisible(false);
      else if (diff < -10) setVisible(true);
      lastY.current = curY;
    };

    const handleResize = () => {
      const isMob = window.innerWidth < 768;
      const isCompact = window.innerWidth < 1180;
      setMob(isMob);
      setCompactNav(isCompact);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const go = (path) => {
    const protectedPaths = ['/dashboard', '/brand-dashboard', '/campaign-builder', '/settings', '/wallet', '/applications', '/messages', '/saved'];
    if (protectedPaths.includes(path) && !st.user) {
      navigate('/login', { state: { from: location } });
    } else {
      navigate(path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dsp({ t: 'UI', v: { mobileMenu: false } });
  };

  const links = [
    { path: '/creators', label: 'Creators' },
    { path: '/campaigns', label: 'Campaigns' },
    { 
      label: 'Explore', 
      items: [
        { path: '/leaderboard', label: 'Leaderboard' },
        { path: '/rate-calc', label: 'Rate Calculator' },
        { path: '/pricing', label: 'Pricing Plans' }
      ]
    },
    { 
      label: 'Resources', 
      items: [
        { path: '/stories', label: 'Success Stories' },
        { path: '/blog', label: 'Creator Hub' },
        { path: '/faq', label: 'Help & FAQ' },
        { path: '/contact', label: 'Contact Us' }
      ]
    },
    { path: '/about', label: 'About' }
  ];

  const getPadding = () => {
    if (mob) return '12px 16px';
    if (compactNav) return scroll ? '14px 24px' : '20px 24px';
    return scroll ? '16px 40px' : '24px 40px';
  };

  const navTransform = (!visible || st.ui.hideNav) ? 'translateY(-120%)' : 'none';

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999995,
      padding: getPadding(),
      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      transform: navTransform,
      pointerEvents: 'none'
    }}>
      <div style={{
        maxWidth: 1200, width: '100%', margin: '0 auto', position: 'relative',
        borderRadius: 102, padding: '2px', pointerEvents: 'auto',
        boxShadow: scroll ? '0 20px 50px rgba(0,0,0,0.1)' : '0 10px 30px rgba(0,0,0,0.05)',
        transition: 'all 0.5s ease',
        background: 'rgba(255, 255, 255, 0.1)'
      }}>
        {/* Animated Border Container to clip the spinning flag gradient safely without clipping dropdowns */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 102, overflow: 'hidden', zIndex: 0
        }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%', width: '200%', height: '500%',
            background: 'conic-gradient(rgb(19, 136, 8) 0%, rgb(255, 255, 255) 20%, rgb(255, 153, 51) 40%, rgb(255, 153, 51) 60%, rgb(255, 255, 255) 80%, rgb(19, 136, 8) 100%)',
            animation: 'spinBorder 5s linear infinite',
            transform: 'translate(-50%, -50%)'
          }} />
        </div>

        <style>{`
          @keyframes spinBorder {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
          .nav-logo-text {
            background: linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #138808 100%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: flagSweep 3s linear infinite;
          }
          @keyframes flagSweep { to { background-position: 200% center; } }
        `}</style>

        <nav style={{
          position: 'relative', zIndex: 1,
          background: scroll ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
          borderRadius: 100, padding: mob ? '0 12px 0 20px' : compactNav ? '0 18px' : '0 32px',
          height: mob ? 54 : compactNav ? 64 : 72, display: 'flex', alignItems: 'center', gap: compactNav ? 14 : 24
        }}>
          <Logo onClick={() => go('/')} sm={compactNav} />
          {!compactNav && <NavLinks links={links} location={location} go={go} />}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto' }}>
            <UserActions st={st} dsp={dsp} go={go} mob={compactNav} />
          </div>
        </nav>
      </div>
    </div>
  );
}

