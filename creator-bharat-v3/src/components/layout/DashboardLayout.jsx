import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
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
  Menu,
  X,
  Bell,
  Search,
  Trophy,
  Activity,
  Zap
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

export default function DashboardLayout({ children }) {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(globalThis.innerWidth < 1200);
  const [mobOpen, setMobOpen] = useState(false);
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
    { label: 'My Identity', icon: User, path: '/settings' },
    { label: 'Brand Deals', icon: Zap, path: '/applications' },
    { label: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
    { label: 'Creator Score', icon: Activity, path: '/creator-score' },
    { label: 'Ecosystem', icon: Megaphone, path: '/creators' },
    { label: 'Settings', icon: Settings, path: '/settings' }
  ];

  const brandLinks = [
    { label: 'Control Center', icon: LayoutDashboard, path: '/brand-dashboard' },
    { label: 'Campaigns', icon: Megaphone, path: '/campaigns' },
    { label: 'Talent Discovery', icon: Search, path: '/creators' },
    { label: 'Performance', icon: BarChart3, path: '/brand-dashboard' },
    { label: 'Settings', icon: Settings, path: '/settings' }
  ];

  const links = isBrand ? brandLinks : creatorLinks;

  const handleNav = (path) => {
    navigate(path);
    if (mob) setMobOpen(false);
  };

  const handleLogout = () => {
    dsp({ t: 'LOGOUT' });
    navigate('/');
  };

  return (
    <div className="db-layout">
      {/* Desktop Sidebar */}
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
               {!collapsed && <p className="db-sidebar-label">Main Menu</p>}
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
              label="Sign Out" 
              collapsed={collapsed} 
              onClick={handleLogout} 
            />
            {!collapsed && (
              <div className="db-sidebar-promo">
                <div className="promo-glow" />
                <p className="promo-title">Elite Support</p>
                <p className="promo-sub">Get 24/7 priority assistance for your campaigns.</p>
              </div>
            )}
          </div>
        </motion.aside>
      )}

      {/* Main Content Area */}
      <main className="db-main-content">
        {/* Top Header */}
        <header className="db-header">
          <div className="db-header-left">
            {mob ? (
              <button onClick={() => setMobOpen(true)} className="db-icon-btn">
                <Menu size={22} />
              </button>
            ) : (
              <button onClick={() => setCollapsed(!collapsed)} className="db-icon-btn">
                <ChevronRight size={18} style={{ transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />
              </button>
            )}
            {!mob && (
              <div className="db-search-wrap">
                <Search size={16} className="db-search-icon" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  placeholder="Search campaigns, talent..." 
                  className="db-search-input"
                />
              </div>
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
                  <p className="db-user-name">{st.user?.name || 'User Account'}</p>
                  <p className="db-user-role">{role} PRO</p>
                </div>
              )}
              <div className="db-avatar">
                {st.user?.name?.[0] || 'U'}
              </div>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="db-page-body">
          {children}
        </div>
      </main>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setMobOpen(false)}
              className="db-mob-overlay"
              style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)', zIndex: 1000 }}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="db-mob-sidebar"
              style={{
                position: 'fixed', top: 0, left: 0, bottom: 0, width: 300,
                background: '#fff', zIndex: 1001, padding: '32px 24px',
                display: 'flex', flexDirection: 'column',
                boxShadow: '20px 0 60px rgba(0,0,0,0.1)'
              }}
            >
              <div className="db-mob-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
                <Logo sm onClick={() => { navigate('/'); setMobOpen(false); }} />
                <button onClick={() => setMobOpen(false)} className="db-icon-btn">
                  <X size={20} />
                </button>
              </div>

              <nav style={{ flex: 1 }}>
                <p className="db-sidebar-label" style={{ paddingLeft: 12, marginBottom: 16 }}>Menu</p>
                {links.map(link => (
                  <SidebarItem 
                    key={link.path}
                    {...link}
                    active={location.pathname === link.path}
                    collapsed={false}
                    onClick={handleNav}
                  />
                ))}
              </nav>

              <div className="db-sidebar-footer" style={{ paddingTop: 24, borderTop: '1px solid #f1f5f9' }}>
                <SidebarItem 
                  icon={LogOut} 
                  label="Sign Out" 
                  collapsed={false} 
                  onClick={handleLogout} 
                />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired
};
