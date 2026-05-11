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
    style={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '12px 16px',
      borderRadius: 14,
      border: 'none',
      background: active ? 'linear-gradient(135deg, rgba(255, 148, 49, 0.12), rgba(255, 148, 49, 0.05))' : 'transparent',
      color: active ? '#FF9431' : '#64748b',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      marginBottom: 6,
      position: 'relative',
      outline: 'none'
    }}
    onMouseEnter={(e) => !active && (e.currentTarget.style.background = 'rgba(0,0,0,0.02)')}
    onMouseLeave={(e) => !active && (e.currentTarget.style.background = 'transparent')}
  >
    {active && (
      <motion.div 
        layoutId="sidebar-active-glow"
        style={{ 
          position: 'absolute', 
          inset: 0, 
          borderRadius: 14, 
          border: '1.5px solid rgba(255, 148, 49, 0.3)',
          boxShadow: '0 4px 12px rgba(255, 148, 49, 0.08)'
        }}
      />
    )}
    <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon size={20} strokeWidth={active ? 2.5 : 2} />
    </div>
    {!collapsed && (
      <span style={{ position: 'relative', zIndex: 1, fontSize: 14, fontWeight: active ? 800 : 600, letterSpacing: '-0.01em' }}>
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
    <div style={{ display: 'flex', minHeight: '100vh', background: '#fcfcfd' }}>
      {/* Desktop Sidebar */}
      {!mob && (
        <motion.aside
          animate={{ width: collapsed ? 100 : 280 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          style={{
            background: '#fff',
            borderRight: '1px solid #f1f5f9',
            padding: '32px 16px',
            display: 'flex',
            flexDirection: 'column',
            position: 'sticky',
            top: 0,
            height: '100vh',
            zIndex: 100,
            boxShadow: '4px 0 24px rgba(0,0,0,0.02)'
          }}
        >
          {/* Logo Section */}
          <div style={{ marginBottom: 48, paddingLeft: collapsed ? 14 : 8, transition: 'all 0.3s' }}>
             <Logo sm={collapsed} onClick={() => navigate('/')} />
          </div>

          <nav style={{ flex: 1 }}>
            <div style={{ paddingLeft: 12, marginBottom: 12 }}>
               {!collapsed && <p style={{ fontSize: 10, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Main Menu</p>}
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

          <div style={{ paddingTop: 24, borderTop: '1px solid #f1f5f9' }}>
            <SidebarItem 
              icon={LogOut} 
              label="Sign Out" 
              collapsed={collapsed} 
              onClick={handleLogout} 
            />
            {!collapsed && (
              <div style={{ 
                marginTop: 20, 
                padding: '16px', 
                background: 'linear-gradient(135deg, #1e293b, #0f172a)', 
                borderRadius: 16, 
                color: '#fff',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: -10, right: -10, width: 60, height: 60, background: 'rgba(255,148,49,0.2)', borderRadius: '50%', filter: 'blur(20px)' }} />
                <p style={{ fontSize: 12, fontWeight: 800, marginBottom: 4 }}>Elite Support</p>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>Get 24/7 priority assistance for your campaigns.</p>
              </div>
            )}
          </div>
        </motion.aside>
      )}

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header */}
        <header style={{ 
          height: 80, 
          borderBottom: '1px solid #f1f5f9', 
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 90,
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.01)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {mob ? (
              <button 
                onClick={() => setMobOpen(true)} 
                style={{ 
                  background: '#f8fafc', 
                  border: '1px solid #e2e8f0', 
                  cursor: 'pointer', 
                  color: '#1e293b',
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Menu size={22} />
              </button>
            ) : (
              <button 
                onClick={() => setCollapsed(!collapsed)} 
                style={{ 
                  background: '#f8fafc', 
                  border: '1px solid #e2e8f0', 
                  padding: 8, 
                  borderRadius: 10, 
                  cursor: 'pointer', 
                  color: '#64748b',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#f8fafc'}
              >
                <ChevronRight size={18} style={{ transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />
              </button>
            )}
            {!mob && (
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  placeholder="Search campaigns, talent..." 
                  style={{ 
                    background: '#f8fafc', 
                    border: '1px solid #e2e8f0', 
                    padding: '12px 16px 12px 42px', 
                    borderRadius: 12, 
                    fontSize: 14, 
                    width: 320, 
                    fontWeight: 500, 
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.width = '380px';
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.style.borderColor = '#FF9431';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,148,49,0.06)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.width = '320px';
                    e.currentTarget.style.background = '#f8fafc';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button style={{ 
              background: '#f8fafc', 
              border: '1px solid #e2e8f0', 
              cursor: 'pointer', 
              color: '#64748b', 
              position: 'relative', 
              width: 44,
              height: 44,
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}>
              <Bell size={20} />
              <div style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, background: '#FF9431', borderRadius: '50%', border: '2px solid #fff' }} />
            </button>
            <div style={{ width: 1, height: 28, background: '#f1f5f9', margin: '0 4px' }} />
            <button 
              style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', background: 'none', border: 'none', padding: 4, borderRadius: 16, transition: 'all 0.2s' }} 
              onClick={() => navigate('/settings')}
            >
              {!mob && (
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 14, fontWeight: 900, color: '#1e293b', lineHeight: 1.2 }}>{st.user?.name || 'User Account'}</p>
                  <p style={{ fontSize: 11, color: '#FF9431', marginTop: 2, textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>{role} PRO</p>
                </div>
              )}
              <div style={{ 
                width: 44, 
                height: 44, 
                borderRadius: 12, 
                background: 'linear-gradient(135deg, #1e293b, #334155)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: '#fff', 
                fontSize: 16, 
                fontWeight: 900,
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
              }}>
                {st.user?.name?.[0] || 'U'}
              </div>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div style={{ padding: mob ? '24px 16px' : '40px', flex: 1 }}>
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
              style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)', zIndex: 1000 }}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed', top: 0, left: 0, bottom: 0, width: 300,
                background: '#fff', zIndex: 1001, padding: '32px 24px',
                display: 'flex', flexDirection: 'column',
                boxShadow: '20px 0 60px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
                <Logo sm onClick={() => { navigate('/'); setMobOpen(false); }} />
                <button onClick={() => setMobOpen(false)} style={{ background: '#f8fafc', border: 'none', width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={20} />
                </button>
              </div>

              <nav style={{ flex: 1 }}>
                <p style={{ fontSize: 10, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16, paddingLeft: 12 }}>Menu</p>
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

              <div style={{ paddingTop: 24, borderTop: '1px solid #f1f5f9' }}>
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
