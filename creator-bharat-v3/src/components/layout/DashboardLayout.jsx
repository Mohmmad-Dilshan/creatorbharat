import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '@/core/context';
import { 
  LayoutDashboard, 
  User, 
  Megaphone, 
  BarChart3, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Bell,
  Search,
  Trophy,
  Activity,
  Zap,
  BookOpen,
  ShieldCheck as Shield
} from 'lucide-react';
import { Logo } from '@/components/common';

const SidebarItem = ({ icon: Icon, label, path, active, collapsed, onClick }) => (
  <button
    onClick={() => onClick(path)}
    className={`db-sidebar-item ${active ? 'active' : ''}`}
  >
    {active && (
      <motion.div 
        layoutId="sidebar-active-glow"
        className="db-sidebar-active-indicator"
        style={{ 
          position: 'absolute', 
          inset: 0, 
          borderRadius: 14, 
          border: '1.5px solid rgba(255, 148, 49, 0.3)',
          boxShadow: '0 4px 12px rgba(255, 148, 49, 0.08)'
        }}
      />
    )}
    <div className="db-sidebar-icon-wrap" style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon size={20} strokeWidth={active ? 2.5 : 2} />
    </div>
    {!collapsed && (
      <span className="db-sidebar-text" style={{ position: 'relative', zIndex: 1 }}>
        {label}
      </span>
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

import EliteMobileNav from './EliteMobileNav';

export default function DashboardLayout({ children }) {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(globalThis.innerWidth < 1200);
  const [mob, setMob] = useState(globalThis.innerWidth < 768);

  useEffect(() => {
    const h = () => {
      const isMobile = globalThis.innerWidth < 768;
      setMob(isMobile);
      if (globalThis.innerWidth < 1200) setCollapsed(true);
      else if (!isMobile) setCollapsed(false);
    };
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const role = st.role || 'creator';
  const isBrand = role === 'brand';
  
  const creatorLinks = [
    { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Identity', icon: User, path: '/settings' },
    { label: 'Deals', icon: Zap, path: '/applications' },
    { label: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
    { label: 'Score', icon: Activity, path: '/creator-score' },
    { label: 'Ecosystem', icon: Megaphone, path: '/creators' },
    { label: 'Guidelines', icon: BookOpen, path: '/creator-guidelines' }
  ];

  const brandLinks = [
    { label: 'Command', icon: LayoutDashboard, path: '/brand-dashboard' },
    { label: 'Missions', icon: Megaphone, path: '/campaigns' },
    { label: 'Discovery', icon: Search, path: '/creators' },
    { label: 'Trends', icon: BarChart3, path: '/brand-dashboard' },
    { label: 'Guidelines', icon: Shield, path: '/brand-guidelines' },
    { label: 'Settings', icon: Settings, path: '/settings' }
  ];

  const links = isBrand ? brandLinks : creatorLinks;

  const handleNav = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    dsp({ t: 'LOGOUT' });
    navigate('/');
  };

  return (
    <div className="db-layout">
      {/* Desktop Sidebar (Only for Desktop) */}
      {!mob && (
        <motion.aside
          animate={{ width: collapsed ? 100 : 280 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="db-sidebar"
        >
          <div className="db-sidebar-brand" style={{ marginBottom: 48, paddingLeft: collapsed ? 14 : 8 }}>
             <Logo sm={collapsed} onClick={() => navigate('/')} />
          </div>

          <nav style={{ flex: 1 }}>
            <div style={{ paddingLeft: 12, marginBottom: 12 }}>
               {!collapsed && <p className="db-sidebar-label">Main System</p>}
            </div>
            {links.map(link => (
              <SidebarItem 
                key={link.path}
                {...link}
                active={location.pathname === link.path}
                collapsed={collapsed}
                onClick={handleNav}
              />
            ))}
          </nav>

          <div className="db-sidebar-footer">
            <SidebarItem 
              icon={LogOut} 
              label="Log Out" 
              collapsed={collapsed} 
              onClick={handleLogout} 
            />
          </div>
        </motion.aside>
      )}

      {/* Main Content Area */}
      <main className="db-main-content">
        {/* Top Header */}
        <header className="db-header">
          <div className="db-header-left">
            {mob ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                 <Logo sm onClick={() => navigate('/')} />
                 <div className="header-v-divider" style={{ height: 20, width: 1, background: '#f1f5f9' }} />
                 <div style={{ 
                   background: 'rgba(255,148,49,0.1)', 
                   padding: '4px 12px', 
                   borderRadius: '100px',
                   border: '1px solid rgba(255,148,49,0.2)'
                 }}>
                   <p style={{ fontSize: 11, fontWeight: 900, color: '#FF9431', letterSpacing: '0.05em' }}>
                     {role.toUpperCase()} HUB
                   </p>
                 </div>
              </div>
            ) : (
              <button onClick={() => setCollapsed(!collapsed)} className="db-icon-btn">
                <ChevronRight size={18} style={{ transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.4s' }} />
              </button>
            )}
          </div>

          <div className="db-header-right">
            <button className="db-icon-btn">
              <Bell size={20} />
              <div className="db-notif-dot" style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, background: '#FF9431', borderRadius: '50%', border: '2px solid #fff' }} />
            </button>
            <div className="db-v-divider" style={{ width: 1, height: 28, background: '#f1f5f9', margin: '0 4px' }} />
            <button className="db-user-profile" onClick={() => navigate('/settings')}>
              {!mob && (
                <div style={{ textAlign: 'right' }}>
                  <p className="db-user-name">{st.user?.name || 'Partner Account'}</p>
                  <p className="db-user-role">{role} ELITE</p>
                </div>
              )}
              <div className="db-avatar">
                {st.user?.name?.[0] || 'U'}
              </div>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="db-page-body" style={{ paddingBottom: mob ? 100 : 40 }}>
          {children}
        </div>
      </main>

      {/* ELITE MOBILE NAV - UNIFIED EXPERIENCE */}
      {mob && <EliteMobileNav role={role} user={st.user} />}
    </div>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired
};
