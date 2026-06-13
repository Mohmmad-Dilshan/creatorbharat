import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '@/core/context';
import { Logo, Btn } from '@/components/common/Primitives';
import { T } from '@/core/theme';
import { Menu, X, ChevronDown, Languages, LogOut, LayoutDashboard, Settings, Bookmark, Zap, Briefcase, User, Wallet, Trophy, Calendar, Users } from 'lucide-react';
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

  // Close dropdown when route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

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
          color: anyActive ? '#111' : '#334155',
          fontWeight: 800, fontSize: 14, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 4,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onMouseEnter={e => {
          if(!anyActive) e.target.style.color = '#111';
        }}
        onMouseLeave={e => {
          if(!anyActive) e.target.style.color = '#334155';
        }}
      >
        {label}
        <ChevronDown size={14} style={{ 
          transform: open ? 'rotate(180deg)' : 'none', 
          transition: 'transform 0.2s ease',
          opacity: open ? 1 : 0.7
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
            color: active ? '#111' : '#334155',
            fontWeight: 800, fontSize: 14, cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseEnter={e => {
            if(!active) e.target.style.color = '#111';
          }}
          onMouseLeave={e => {
            if(!active) e.target.style.color = '#334155';
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
  const [lang, setLang] = useState('EN');
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const langRef = useRef(null);
  const profileRef = useRef(null);

  const LANGS = [
    { code: 'EN', id: 'en', label: 'English' },
    { code: 'HI', id: 'hi', label: 'Hindi' },
    { code: 'MR', id: 'mr', label: 'Marathi' },
    { code: 'TE', id: 'te', label: 'Telugu' },
    { code: 'TA', id: 'ta', label: 'Tamil' },
    { code: 'BN', id: 'bn', label: 'Bengali' },
    { code: 'GU', id: 'gu', label: 'Gujarati' },
    { code: 'KN', id: 'kn', label: 'Kannada' },
    { code: 'ML', id: 'ml', label: 'Malayalam' },
    { code: 'PA', id: 'pa', label: 'Punjabi' },
    { code: 'OR', id: 'or', label: 'Odia' }
  ];

  const handleLangChange = (l) => {
    setLang(l.code);
    setLangOpen(false);
    
    // Set cookies first as a backup and for persistence
    document.cookie = `googtrans=/en/${l.id}; path=/`;
    document.cookie = `googtrans=/en/${l.id}; path=/; domain=${window.location.hostname}`;
    
    // Attempt to trigger the hidden Google Translate dropdown directly
    const gtCombo = document.querySelector('.goog-te-combo');
    if (gtCombo) {
      gtCombo.value = l.id;
      // Google translate requires a bubbling event
      gtCombo.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
      dsp({ t: 'TOAST', d: { type: 'success', msg: `Translating to ${l.label}...` } });
    } else {
      // Fallback if the element hasn't loaded
      dsp({ t: 'TOAST', d: { type: 'success', msg: `Language changed to ${l.label}. Reloading...` } });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    
    // Check active language on load
    const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
    if (match && match[1]) {
      const found = LANGS.find(l => l.id === match[1]);
      if (found) setLang(found.code);
    }
    
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleLogout = () => {
    setProfileOpen(false);
    dsp({ t: 'LOGOUT' });
    go('/');
  };

  const isCreator = st.role === 'creator';
  const isBrand = st.role === 'brand';

  const LangButton = () => (
    <div ref={langRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setLangOpen(!langOpen)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6, background: 'transparent',
          border: '1px solid rgba(0,0,0,0.1)', borderRadius: 100,
          padding: '6px 12px', cursor: 'pointer', color: '#111',
          fontWeight: 800, fontSize: 13, transition: '0.2s', marginRight: 8
        }}
        title="Toggle Language"
      >
        <Languages size={16} /> {lang}
      </button>
      <AnimatePresence>
        {langOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              position: 'absolute', top: '100%', right: 8, marginTop: 8,
              background: '#fff', border: '1px solid #f1f5f9', borderRadius: 12,
              padding: 8, boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              display: 'flex', flexDirection: 'column', gap: 4, zIndex: 999999,
              maxHeight: '300px', overflowY: 'auto'
            }}
          >
            {LANGS.map(l => (
              <button
                key={l.code}
                onClick={() => handleLangChange(l)}
                style={{
                  padding: '8px 16px', background: lang === l.code ? '#FF943110' : 'transparent',
                  color: lang === l.code ? '#FF9431' : '#475569',
                  border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700,
                  cursor: 'pointer', textAlign: 'left', whiteSpace: 'nowrap'
                }}
              >
                {l.label} ({l.code})
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (st.user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <LangButton />
        <div ref={profileRef} style={{ position: 'relative' }}>
          <button
            onClick={() => {
              if (mob) {
                dsp({ t: 'UI', v: { mobileMenu: !st.ui.mobileMenu } });
              } else {
                setProfileOpen(!profileOpen);
              }
            }}
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
          
          <AnimatePresence>
            {profileOpen && !mob && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: 8,
                  background: '#fff', border: '1px solid #f1f5f9', borderRadius: 16,
                  padding: 8, boxShadow: '0 20px 45px rgba(0,0,0,0.1)',
                  display: 'flex', flexDirection: 'column', gap: 4, zIndex: 999999,
                  minWidth: 220
                }}
              >
                {/* User Info Header */}
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', marginBottom: 4 }}>
                  <div style={{ fontSize: 14, fontWeight: 900, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {st.user.name || 'User'}
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 850, color: '#FF9431', textTransform: 'uppercase', marginTop: 4, display: 'inline-block', background: 'rgba(255,148,49,0.08)', padding: '2px 8px', borderRadius: 100 }}>
                    {isCreator ? 'Creator Account' : isBrand ? 'Brand Partner' : 'User'}
                  </div>
                </div>

                {/* Role Specific Quick Links */}
                {isCreator && (
                  <>
                    <button onClick={() => { setProfileOpen(false); go('/creator/dashboard'); }} className="profile-menu-item">
                      <LayoutDashboard size={14} /> Dashboard
                    </button>
                    <button onClick={() => { setProfileOpen(false); go('/creator/opportunities'); }} className="profile-menu-item">
                      <Zap size={14} /> Opportunities
                    </button>
                    <button onClick={() => { setProfileOpen(false); go('/creator/wallet'); }} className="profile-menu-item">
                      <Wallet size={14} /> My Wallet
                    </button>
                    <button onClick={() => { setProfileOpen(false); go('/creator/profile'); }} className="profile-menu-item">
                      <User size={14} /> Profile Builder
                    </button>
                  </>
                )}

                {isBrand && (
                  <>
                    <button onClick={() => { setProfileOpen(false); go('/brand-dashboard'); }} className="profile-menu-item">
                      <LayoutDashboard size={14} /> Command Center
                    </button>
                    <button onClick={() => { setProfileOpen(false); go('/campaign-builder'); }} className="profile-menu-item">
                      <Briefcase size={14} /> Post Campaign
                    </button>
                    <button onClick={() => { setProfileOpen(false); go('/brand-applications'); }} className="profile-menu-item">
                      <Users size={14} /> Applicants
                    </button>
                    <button onClick={() => { setProfileOpen(false); go('/compare'); }} className="profile-menu-item">
                      <Users size={14} /> Compare Tool
                    </button>
                  </>
                )}

                <button onClick={() => { setProfileOpen(false); go(isCreator ? '/creator/settings' : '/settings'); }} className="profile-menu-item">
                  <Settings size={14} /> Account Settings
                </button>

                <div style={{ height: 1, background: '#f1f5f9', margin: '4px 0' }} />

                <button onClick={handleLogout} className="profile-menu-item" style={{ color: '#ef4444' }}>
                  <LogOut size={14} /> Log Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Hamburger menu next to avatar for logged in users */}
        {mob && (
          <button
            onClick={() => dsp({ t: 'UI', v: { mobileMenu: !st.ui.mobileMenu } })}
            style={{ background: '#f1f5f9', border: 'none', width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#111' }}
          >
            {st.ui.mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <LangButton />
      <div className="nav-signin-btn-wrap">
        <Btn lg onClick={() => go('/login')} style={{ fontWeight: 900, borderRadius: 100, padding: mob ? '10px 20px' : '12px 32px', fontSize: 13, background: T.gd, color: '#fff', border: 'none', boxShadow: `0 8px 24px rgba(255,148,49,0.2)` }}>
          {mob ? 'Sign In' : 'Sign In Account'}
        </Btn>
      </div>
      {mob && (
        <button
          onClick={() => dsp({ t: 'UI', v: { mobileMenu: !st.ui.mobileMenu } })}
          style={{ background: '#f1f5f9', border: 'none', width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#111', marginLeft: 8 }}
        >
          {st.ui.mobileMenu ? <X size={22} /> : <Menu size={22} />}
        </button>
      )}
    </div>
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
    }),
    role: PropTypes.string
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
    const protectedPaths = ['/dashboard', '/brand-dashboard', '/campaign-builder', '/settings', '/wallet', '/applications', '/messages', '/saved', '/creator/dashboard', '/creator/profile', '/creator/wallet', '/creator/opportunities', '/creator/analytics', '/creator/messages'];
    if (protectedPaths.includes(path) && !st.user) {
      navigate('/login', { state: { from: location } });
    } else if (st.user && st.role === 'creator') {
      if (path === '/' || path === '/join' || path === '/login' || path === '/apply' || path === '/brand' || path === '/creator-hub') {
        navigate('/creator/dashboard');
      } else if (path === '/creators' || path === '/campaigns') {
        navigate('/creator/opportunities');
      } else if (path === '/stories') {
        navigate('/creator/stories');
      } else if (path === '/blog') {
        navigate('/creator/blog');
      } else if (path.startsWith('/blog/')) {
        navigate(`/creator/blog/${path.slice(6)}`);
      } else if (path === '/creator-guidelines') {
        navigate('/creator/guidelines');
      } else if (path === '/brand-guidelines') {
        navigate('/creator/dashboard');
      } else if (path.startsWith('/creator/')) {
        const creatorProfileMatch = path.match(/^\/creator\/([^/]+)$/);
        if (creatorProfileMatch) {
          const id = creatorProfileMatch[1];
          const knownSubRoutes = ['dashboard', 'onboarding', 'profile', 'public-preview', 'opportunities', 'applications', 'brand-requests', 'community', 'wallet', 'analytics', 'monetization', 'score', 'verification', 'calendar', 'messages', 'saved', 'settings', 'help', 'events', 'achievements', 'blog', 'official-profile', 'verify-guide', 'stories', 'rate-calc', 'leaderboard', 'guidelines', 'pricing', 'about', 'contact', 'faq', 'privacy', 'terms', 'cookies', 'refunds'];
          if (!knownSubRoutes.includes(id)) {
            navigate(`/creator/c/${id}`);
          } else {
            navigate(path);
          }
        } else {
          navigate(path);
        }
      } else if (path.startsWith('/')) {
        navigate(`/creator${path}`);
      } else {
        navigate(path);
      }
    } else {
      navigate(path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dsp({ t: 'UI', v: { mobileMenu: false } });
  };

  const linksPublic = [
    { path: '/creators', label: 'Creators' },
    { path: '/campaigns', label: 'Campaigns' },
    { 
      label: 'Explore', 
      items: [
        { path: '/brand', label: 'For Brands' },
        { path: '/creator-hub', label: 'For Creators' },
        { path: '/verify-guide', label: 'Verification Guide' },
        { path: '/leaderboard', label: 'Leaderboard' },
        { path: '/rate-calc', label: 'Rate Calculator' },
        { path: '/pricing', label: 'Pricing Plans' },
        { path: '/ai-knowledge', label: 'AI Knowledge' },
        { path: '/official-profile', label: 'Official Profile' }
      ]
    },
    { 
      label: 'Resources', 
      items: [
        { path: '/stories', label: 'Success Stories' },
        { path: '/blog', label: 'Creator Hub' },
        { path: '/ambassador', label: 'Campus Ambassador' },
        { path: '/press', label: 'Press Kit' },
        { path: '/faq', label: 'Help & FAQ' },
        { path: '/contact', label: 'Contact Us' }
      ]
    },
    { path: '/about', label: 'About' }
  ];

  const linksCreator = [
    { path: '/creator/dashboard', label: 'Dashboard' },
    { path: '/creator/opportunities', label: 'Opportunities' },
    { path: '/creator/applications', label: 'Applications' },
    { path: '/creator/monetization', label: 'Monetization' },
    {
      label: 'Ecosystem',
      items: [
        { path: '/creator/wallet', label: 'Wallet' },
        { path: '/creator/score', label: 'Creator Score' },
        { path: '/creator/public-preview', label: 'Public Profile' },
        { path: '/creator/verification', label: 'Verification Desk' },
        { path: '/creator/community', label: 'Community' },
        { path: '/creator/events', label: 'Events' },
        { path: '/creator/messages', label: 'Messages & Alerts' },
        { path: '/creator/official-profile', label: 'Official Profile' }
      ]
    },
    {
      label: 'Resources',
      items: [
        { path: '/creator/stories', label: 'Success Stories' },
        { path: '/creator/blog', label: 'Platform Blog' },
        { path: '/creator/help', label: 'Support & Help' }
      ]
    }
  ];

  const linksBrand = [
    { path: '/brand-dashboard', label: 'Dashboard' },
    { path: '/campaign-builder', label: 'Post Campaign' },
    { path: '/creators', label: 'Scout Creators' },
    {
      label: 'Manage',
      items: [
        { path: '/brand-applications', label: 'Applicants' },
        { path: '/compare', label: 'Compare Tool' },
        { path: '/brand-analytics', label: 'Analytics' },
        { path: '/official-profile', label: 'Official Profile' }
      ]
    },
    {
      label: 'Resources',
      items: [
        { path: '/stories', label: 'Success Stories' },
        { path: '/blog', label: 'Platform Blog' },
        { path: '/brand-guidelines', label: 'Brand Guidelines' },
        { path: '/faq', label: 'Help & FAQ' }
      ]
    }
  ];

  const getNavLinks = () => {
    if (!st.user) return linksPublic;
    if (st.role === 'creator') return linksCreator;
    if (st.role === 'brand') return linksBrand;
    return linksPublic;
  };

  const activeLinks = getNavLinks();

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
          
          .profile-menu-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 14px;
            background: none;
            border: none;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 700;
            color: #475569;
            cursor: pointer;
            text-align: left;
            width: 100%;
            transition: all 0.2s;
          }
          .profile-menu-item:hover {
            background: #f8fafc;
            color: #0f172a;
          }
          @media (max-width: 520px) {
            .nav-signin-btn-wrap {
              display: none !important;
            }
          }
        `}</style>

        <nav style={{
          position: 'relative', zIndex: 1,
          background: scroll ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
          borderRadius: 100, padding: mob ? '0 12px 0 20px' : compactNav ? '0 18px' : '0 32px',
          height: mob ? 54 : compactNav ? 64 : 72, display: 'flex', alignItems: 'center', gap: compactNav ? 14 : 24
        }}>
          <Logo onClick={() => go('/')} sm={compactNav} />
          {!compactNav && <NavLinks links={activeLinks} location={location} go={go} />}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto' }}>
            <UserActions st={st} dsp={dsp} go={go} mob={compactNav} />
          </div>
        </nav>
      </div>
    </div>
  );
}

