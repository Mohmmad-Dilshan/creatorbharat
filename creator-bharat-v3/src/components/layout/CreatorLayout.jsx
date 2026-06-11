import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '@/core/context';
import { 
  LayoutDashboard, 
  User, 
  Briefcase,
  Eye,
  Inbox,
  Bookmark,
  Wallet,
  CalendarDays,
  BadgeCheck,
  LifeBuoy,
  IndianRupee,
  Megaphone, 
  BarChart3, 
  Settings, 
  LogOut, 
  ChevronRight,
  ChevronLeft,
  Bell,
  Activity,
  Zap,
  Award,
  Trophy,
  Search,
  PanelLeft,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { Logo } from '@/components/common';
import EliteMobileNav from './EliteMobileNav';
import NotificationDropdown from './NotificationDropdown';

// ─── Sidebar Item ────────────────────────────────────────────────────────────
const SidebarItem = ({ icon: Icon, label, path, active, collapsed, onClick }) => (
  <button
    onClick={() => onClick(path)}
    title={collapsed ? label : undefined}
    className={`db-sidebar-item ${active ? 'active' : ''}`}
  >
    <div className="db-sidebar-icon-wrap">
      <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
    </div>
    {!collapsed && (
      <span className="db-sidebar-text">{label}</span>
    )}
  </button>
);

SidebarItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  path: PropTypes.string,
  active: PropTypes.bool,
  collapsed: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

// ─── Sidebar Group ───────────────────────────────────────────────────────────
const SidebarGroup = ({ title, links, collapsed, location, onClick }) => (
  <div style={{ marginBottom: collapsed ? 8 : 4 }}>
    {!collapsed && (
      <span className="db-sidebar-label">{title}</span>
    )}
    {collapsed && <div style={{ height: 12 }} />}
    {links.map(link => (
      <SidebarItem
        key={link.path}
        {...link}
        active={location.pathname === link.path || location.pathname.startsWith(`${link.path}/`)}
        collapsed={collapsed}
        onClick={onClick}
      />
    ))}
  </div>
);

SidebarGroup.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  collapsed: PropTypes.bool,
  location: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

// ─── Profile Dropdown Item ───────────────────────────────────────────────────
const DropdownItem = ({ icon: Icon, label, onClick, danger }) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 12px',
        borderRadius: 10,
        border: 'none',
        background: hover ? (danger ? 'rgba(239,68,68,0.08)' : '#F8FAFC') : 'transparent',
        color: danger ? '#EF4444' : '#475569',
        fontSize: '13px',
        fontWeight: 700,
        cursor: 'pointer',
        textAlign: 'left',
        transition: '0.15s',
        fontFamily: 'inherit'
      }}
    >
      <Icon size={15} color={danger ? '#EF4444' : '#94A3B8'} />
      {label}
    </button>
  );
};

DropdownItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  danger: PropTypes.bool
};

// ─── Page label map ──────────────────────────────────────────────────────────
const PAGE_LABELS = {
  '/creator/dashboard': 'Dashboard',
  '/creator/profile': 'Profile Builder',
  '/creator/public-preview': 'Public Preview',
  '/creator/verification': 'Verification',
  '/creator/opportunities': 'Opportunities',
  '/creator/applications': 'Applications',
  '/creator/brand-requests': 'Brand Requests',
  '/creator/achievements': 'Achievements',
  '/creator/calendar': 'Calendar',
  '/creator/events': 'Events 2027',
  '/creator/community': 'Community',
  '/creator/messages': 'Messages',
  '/creator/saved': 'Saved',
  '/creator/wallet': 'Wallet',
  '/creator/monetization': 'Monetization',
  '/creator/analytics': 'Analytics',
  '/creator/score': 'Creator Score',
  '/creator/settings': 'Settings',
  '/creator/help': 'Help & Support',
};

// ─── Main Layout ─────────────────────────────────────────────────────────────
export default function CreatorLayout({ children }) {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(globalThis.innerWidth < 1280);
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const profileRef = useRef(null);

  const pageLabel = PAGE_LABELS[location.pathname] || 'Creator Hub';
  const isVerified = localStorage.getItem('cb_verification_status') === 'APPROVED';

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const h = () => {
      const isMobile = globalThis.innerWidth < 768;
      setMob(isMobile);
      if (globalThis.innerWidth < 1280) setCollapsed(true);
      else setCollapsed(false);
    };
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const creatorGroups = [
    {
      title: 'Overview',
      links: [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/creator/dashboard' },
        { label: 'Profile Builder', icon: User, path: '/creator/profile' },
        { label: 'Public Preview', icon: Eye, path: '/creator/public-preview' },
        { label: 'Verification', icon: BadgeCheck, path: '/creator/verification' }
      ]
    },
    {
      title: 'Work',
      links: [
        { label: 'Opportunities', icon: Zap, path: '/creator/opportunities' },
        { label: 'Applications', icon: Briefcase, path: '/creator/applications' },
        { label: 'Brand Requests', icon: Inbox, path: '/creator/brand-requests' },
        { label: 'Achievements', icon: Trophy, path: '/creator/achievements' },
        { label: 'Calendar', icon: CalendarDays, path: '/creator/calendar' },
        { label: 'Events 2027', icon: Award, path: '/creator/events' }
      ]
    },
    {
      title: 'Network',
      links: [
        { label: 'Community', icon: Megaphone, path: '/creator/community' },
        { label: 'Messages', icon: MessageSquare, path: '/creator/messages' },
        { label: 'Saved', icon: Bookmark, path: '/creator/saved' }
      ]
    },
    {
      title: 'Revenue',
      links: [
        { label: 'Wallet', icon: Wallet, path: '/creator/wallet' },
        { label: 'Monetization', icon: IndianRupee, path: '/creator/monetization' },
        { label: 'Analytics', icon: BarChart3, path: '/creator/analytics' },
        { label: 'Creator Score', icon: Activity, path: '/creator/score' }
      ]
    },
    {
      title: 'Account',
      links: [
        { label: 'Settings', icon: Settings, path: '/creator/settings' },
        { label: 'Help', icon: LifeBuoy, path: '/creator/help' }
      ]
    }
  ];

  const handleNav = (path) => navigate(path);

  const handleLogout = () => {
    dsp({ t: 'LOGOUT' });
    navigate('/');
  };

  const userName = st.user?.name || 'Creator';
  const userInitial = userName[0]?.toUpperCase() || 'C';

  return (
    <div className="db-layout creator-isolated-layout">
      {/* ── Desktop Sidebar ────────────────────────────────────────────── */}
      {!mob && (
        <motion.aside
          animate={{ width: collapsed ? 72 : 260 }}
          transition={{ type: 'spring', damping: 25, stiffness: 180 }}
          className="db-sidebar"
        >
          {/* Brand / Logo */}
          <div className="db-sidebar-brand" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            justifyContent: collapsed ? 'center' : 'flex-start',
            overflow: 'hidden'
          }}>
            {/* Flag icon — always shown, icon-only (text handled manually below) */}
            <div onClick={() => navigate('/creator/dashboard')} style={{ cursor: 'pointer', flexShrink: 0 }}>
              <Logo sm iconOnly />
            </div>

            {/* Name + "CREATOR HUB" badge — stacked, only when expanded */}
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 4, overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => navigate('/creator/dashboard')}
              >
                <span style={{
                  fontFamily: "'Outfit', 'Inter', sans-serif",
                  fontSize: 15,
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                  whiteSpace: 'nowrap',
                  lineHeight: 1,
                }}>
                  CreatorBharat
                </span>
                <span style={{
                  fontSize: 8,
                  fontWeight: 900,
                  color: '#FF9431',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  background: 'rgba(255,148,49,0.12)',
                  border: '1px solid rgba(255,148,49,0.22)',
                  borderRadius: 4,
                  padding: '2px 6px',
                  width: 'fit-content',
                  lineHeight: 1.2,
                }}>
                  Creator Hub
                </span>
              </motion.div>
            )}
          </div>

          {/* Navigation */}
          <div className="db-sidebar-nav-area">
            {creatorGroups.map(group => (
              <SidebarGroup
                key={group.title}
                title={group.title}
                links={group.links}
                collapsed={collapsed}
                location={location}
                onClick={handleNav}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="db-sidebar-footer">
            {!collapsed && (
              <div style={{
                margin: '0 0 10px',
                padding: '12px 14px',
                background: 'linear-gradient(135deg, rgba(255,148,49,0.12), rgba(255,148,49,0.04))',
                borderRadius: 12,
                border: '1px solid rgba(255,148,49,0.18)',
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,148,49,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Sparkles size={15} color="#FF9431" />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2 }}>Go Pro Creator</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>Unlock all features</div>
                </div>
              </div>
            )}
            <SidebarItem
              icon={LogOut}
              label="Log Out"
              collapsed={collapsed}
              onClick={handleLogout}
            />
          </div>
        </motion.aside>
      )}

      {/* ── Main Content Area ─────────────────────────────────────────── */}
      <main className="db-main-content">
        {/* Top Header */}
        <header className="db-header">
          <div className="db-header-left">
            {mob ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Logo sm onClick={() => navigate('/creator/dashboard')} />
                <span style={{
                  fontSize: 10, fontWeight: 900, color: '#FF9431',
                  background: 'rgba(255,148,49,0.1)', padding: '3px 8px',
                  borderRadius: 6, border: '1px solid rgba(255,148,49,0.2)',
                  letterSpacing: '0.08em', textTransform: 'uppercase'
                }}>HUB</span>
              </div>
            ) : (
              <>
                {/* Collapse Toggle */}
                <button
                  onClick={() => setCollapsed(!collapsed)}
                  className="db-icon-btn"
                  title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                  {collapsed
                    ? <PanelLeft size={16} />
                    : <ChevronLeft size={16} />
                  }
                </button>

                {/* Divider */}
                <div style={{ width: 1, height: 20, background: '#E2E8F0' }} />

                {/* Breadcrumb */}
                <div className="db-header-breadcrumb">
                  <span>Creator Hub</span>
                  <ChevronRight size={13} />
                  <span className="db-header-breadcrumb-current">{pageLabel}</span>
                </div>
              </>
            )}

            {/* Search Bar */}
            {!mob && (
              <div className="db-header-search" style={{ marginLeft: 8 }}>
                <Search size={14} className="db-header-search-icon" />
                <input
                  className="db-header-search-input"
                  placeholder="Search anything..."
                  value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="db-header-right">
            <NotificationDropdown />

            <div style={{ width: 1, height: 24, background: '#E2E8F0', flexShrink: 0 }} />

            {/* Profile Dropdown */}
            <div ref={profileRef} style={{ position: 'relative' }}>
              <button
                className="db-user-profile"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <div className="db-avatar">{userInitial}</div>
                {!mob && (
                  <div style={{ textAlign: 'left' }}>
                    <p className="db-user-name">{userName.split(' ')[0]}</p>
                    <p className="db-user-role">
                      {isVerified ? '✓ Verified' : 'Creator'}
                    </p>
                  </div>
                )}
                {!mob && <ChevronRight size={14} style={{ color: '#94A3B8', transform: profileDropdownOpen ? 'rotate(90deg)' : 'rotate(0)', transition: '0.2s', marginLeft: 2 }} />}
              </button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 10px)',
                      right: 0,
                      width: 230,
                      background: '#FFFFFF',
                      borderRadius: 16,
                      border: '1.5px solid #E8EDF5',
                      boxShadow: '0 20px 60px rgba(15,23,42,0.12), 0 4px 16px rgba(15,23,42,0.06)',
                      padding: '6px',
                      zIndex: 999999,
                    }}
                  >
                    {/* Header */}
                    <div style={{ padding: '10px 12px 10px', borderBottom: '1px solid #F1F5F9', marginBottom: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 38, height: 38, borderRadius: 10,
                          background: 'linear-gradient(135deg, #FF9431, #EA580C)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#fff', fontSize: 15, fontWeight: 900, flexShrink: 0
                        }}>
                          {userInitial}
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                          <p style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {userName}
                          </p>
                          <p style={{ fontSize: 10, fontWeight: 700, color: isVerified ? '#10B981' : '#FF9431', margin: '2px 0 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            {isVerified ? '✓ Verified Creator' : 'Creator'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <DropdownItem
                        icon={User}
                        label="View Public Profile"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          const allC = JSON.parse(localStorage.getItem('cb_creators') || '[]');
                          const c = st.user?.creatorProfile || allC.find(cr => cr.email === st.user?.email) || {};
                          const profileId = c.id || 'creatorbharat-official';
                          navigate(`/creator/c/${profileId}`);
                        }}
                      />
                      <DropdownItem
                        icon={Settings}
                        label="Account Settings"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          navigate('/creator/settings');
                        }}
                      />
                      <DropdownItem
                        icon={BarChart3}
                        label="Analytics"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          navigate('/creator/analytics');
                        }}
                      />
                      <div style={{ height: 1, background: '#F1F5F9', margin: '4px 0' }} />
                      <DropdownItem
                        icon={LogOut}
                        label="Log Out"
                        danger
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          handleLogout();
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="db-page-body" style={{ paddingBottom: mob ? 100 : 0 }}>
          {children}
        </div>
      </main>

      {/* DEDICATED CREATOR MOBILE NAV */}
      {mob && <EliteMobileNav role="creator" user={st.user} />}
    </div>
  );
}

CreatorLayout.propTypes = {
  children: PropTypes.node.isRequired
};
