import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
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
  Bell,
  Search,
  Trophy,
  Activity,
  Zap,
  BookOpen,
  Map,
  ShieldCheck as Shield
} from 'lucide-react';
import { Logo } from '@/components/common';
import EliteMobileNav from './EliteMobileNav';
import NotificationDropdown from './NotificationDropdown';

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

const SidebarGroup = ({ title, links, collapsed, location, onClick }) => (
  <div style={{ marginBottom: collapsed ? 10 : 18 }}>
    {!collapsed && (
      <p className="db-sidebar-label" style={{ paddingLeft: 12, marginBottom: 8 }}>
        {title}
      </p>
    )}
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

  const role = st.role || 'brand';
  
  const links = [
    { label: 'Command', icon: LayoutDashboard, path: '/brand-dashboard' },
    { label: 'Applications', icon: Briefcase, path: '/brand-applications' },
    { label: 'Missions', icon: Megaphone, path: '/campaigns' },
    { label: 'Discovery', icon: Search, path: '/creators' },
    { label: 'Density Map', icon: Map, path: '/brand/creator-density' },
    { label: 'Trends', icon: BarChart3, path: '/brand-analytics' },
    { label: 'Guidelines', icon: Shield, path: '/brand-guidelines' },
    { label: 'Settings', icon: Settings, path: '/settings' }
  ];

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
             <Logo sm={collapsed} onClick={() => navigate('/brand-dashboard')} />
          </div>

          <nav style={{ flex: 1, overflowY: 'auto', paddingRight: collapsed ? 0 : 4 }}>
            <div style={{ paddingLeft: 12, marginBottom: 12 }}>
              {!collapsed && <p className="db-sidebar-label">Brand System</p>}
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
                 <Logo sm onClick={() => navigate('/brand-dashboard')} />
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
            <NotificationDropdown />
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
