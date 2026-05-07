import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context';
import { 
  LayoutDashboard, 
  User, 
  Megaphone, 
  Wallet, 
  BarChart3, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Menu,
  X,
  Bell,
  Search,
  Trophy
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, path, active, collapsed, onClick }) => (
  <button
    onClick={() => onClick(path)}
    style={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 16px',
      borderRadius: 16,
      border: 'none',
      background: active ? 'rgba(255, 148, 49, 0.1)' : 'transparent',
      color: active ? '#FF9431' : '#64748b',
      cursor: 'pointer',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      marginBottom: 4,
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    {active && (
      <motion.div 
        layoutId="sidebar-active"
        style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 4, background: '#FF9431', borderRadius: '0 4px 4px 0' }}
      />
    )}
    <Icon size={20} strokeWidth={active ? 2.5 : 2} />
    {!collapsed && (
      <span style={{ fontSize: 14, fontWeight: active ? 800 : 600 }}>{label}</span>
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
      setMob(globalThis.innerWidth < 768);
      if (globalThis.innerWidth < 1200) setCollapsed(true);
      else setCollapsed(false);
    };
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const role = st.role || 'creator';
  
  const creatorLinks = [
    { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'My Identity', icon: User, path: '/settings' },
    { label: 'Deals & Apps', icon: Megaphone, path: '/applications' },
    { label: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
    { label: 'Insights', icon: BarChart3, path: '/creator-score' },
    { label: 'Wallet', icon: Wallet, path: '/saved' },
    { label: 'Settings', icon: Settings, path: '/settings' }
  ];

  const brandLinks = [
    { label: 'Mission Control', icon: LayoutDashboard, path: '/brand-dashboard' },
    { label: 'Campaigns', icon: Megaphone, path: '/campaigns' },
    { label: 'Talent Bench', icon: User, path: '/creators' },
    { label: 'Analytics', icon: BarChart3, path: '/brand-dashboard' },
    { label: 'Settings', icon: Settings, path: '/settings' }
  ];

  const links = role === 'brand' ? brandLinks : creatorLinks;

  const handleNav = (path) => {
    navigate(path);
    if (mob) setMobOpen(false);
  };

  const handleLogout = () => {
    dsp({ t: 'LOGOUT' });
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      {/* Desktop Sidebar */}
      {!mob && (
        <motion.aside
          animate={{ width: collapsed ? 88 : 280 }}
          style={{
            background: '#fff',
            borderRight: '1px solid rgba(0,0,0,0.05)',
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            position: 'sticky',
            top: 0,
            height: '100vh',
            zIndex: 100,
            boxShadow: '10px 0 30px rgba(0,0,0,0.02)'
          }}
        >
          {/* Logo Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48, paddingLeft: 8 }}>
             <div style={{ width: 40, height: 40, background: '#111', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900 }}>CB</div>
             {!collapsed && (
               <motion.span 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }} 
                 style={{ fontWeight: 900, fontSize: 18, color: '#111' }}
               >
                 CreatorBharat
               </motion.span>
             )}
          </div>

          <nav style={{ flex: 1 }}>
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

          <div style={{ paddingTop: 20, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <SidebarItem 
              icon={LogOut} 
              label="Logout" 
              collapsed={collapsed} 
              onClick={handleLogout} 
            />
          </div>
        </motion.aside>
      )}

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header */}
        <header style={{ 
          height: 72, 
          borderBottom: '1px solid rgba(0,0,0,0.05)', 
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 90,
          backdropFilter: 'blur(12px)',
          background: 'rgba(255,255,255,0.8)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {mob ? (
              <button onClick={() => setMobOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#111' }}>
                <Menu size={24} />
              </button>
            ) : (
              <button onClick={() => setCollapsed(!collapsed)} style={{ background: '#f1f5f9', border: 'none', padding: 8, borderRadius: 8, cursor: 'pointer', color: '#64748b' }}>
                <ChevronRight size={18} style={{ transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'all 0.3s' }} />
              </button>
            )}
            {!mob && (
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  placeholder="Search in ecosystem..." 
                  style={{ background: '#f1f5f9', border: 'none', padding: '10px 16px 10px 40px', borderRadius: 10, fontSize: 13, width: 260, fontWeight: 600, outline: 'none' }}
                />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', position: 'relative', padding: 8 }}>
              <Bell size={20} />
              <div style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, background: '#ef4444', borderRadius: '50%', border: '2px solid #fff' }} />
            </button>
            <div style={{ width: 1, height: 24, background: 'rgba(0,0,0,0.05)', margin: '0 8px' }} />
            <button 
              style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', background: 'none', border: 'none', padding: 4, borderRadius: 14, transition: 'background 0.2s' }} 
              onClick={() => navigate('/settings')}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
            >
              {!mob && (
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: '#111', lineHeight: 1 }}>{st.user?.name || 'User'}</p>
                  <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 4, textTransform: 'uppercase', fontWeight: 700 }}>{role}</p>
                </div>
              )}
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #FF9431, #FFB471)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 900 }}>
                {st.user?.name?.[0] || 'U'}
              </div>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div style={{ padding: mob ? '24px 16px' : '32px', flex: 1 }}>
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
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 1000 }}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed', top: 0, left: 0, bottom: 0, width: 280,
                background: '#fff', zIndex: 1001, padding: '24px 20px',
                display: 'flex', flexDirection: 'column'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                <div style={{ fontWeight: 900, fontSize: 18, color: '#111' }}>CreatorBharat</div>
                <button onClick={() => setMobOpen(false)} style={{ background: '#f1f5f9', border: 'none', padding: 8, borderRadius: 8 }}>
                  <X size={20} />
                </button>
              </div>

              <nav style={{ flex: 1 }}>
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

              <div style={{ paddingTop: 20, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                <SidebarItem 
                  icon={LogOut} 
                  label="Logout" 
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
