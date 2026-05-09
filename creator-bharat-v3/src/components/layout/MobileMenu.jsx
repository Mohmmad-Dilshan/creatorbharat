import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context';
import { Btn, Logo } from '../Primitives';
import { scrollToTop } from '../../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Megaphone, BookOpen, Heart, LogOut, LayoutDashboard, Briefcase, Bookmark, Settings, ChevronRight, User, LifeBuoy, MessageSquare, Sparkles, Search, Calculator } from 'lucide-react';

export default function MobileMenu({ open }) {
  const { st, dsp } = useApp();
  const navigate = useNavigate();

  const go = (path) => {
    navigate(path);
    scrollToTop();
    dsp({ t: 'UI', v: { mobileMenu: false } });
  };

  const links = [
    { path: '/creators', l: 'Elite Marketplace', i: Users },
    { path: '/campaigns', l: 'Brand Deals', i: Megaphone },
    { path: '/leaderboard', l: 'Leaderboard', i: Sparkles },
    { path: '/rate-calc', l: 'Rate Calculator', i: Calculator },
    { path: '/blog', l: 'News & Hub', i: BookOpen },
    { path: '/about', l: 'Our Story', i: Heart }
  ];

  const supportLinks = [
    { path: '/faq', l: 'Help Center', i: LifeBuoy },
    { path: '/contact', l: 'Contact Support', i: MessageSquare }
  ];

  const isCreator = st.role === 'creator';
  const isBrand = st.role === 'brand';

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* PREMIUM BLUR OVERLAY */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dsp({ t: 'UI', v: { mobileMenu: false } })}
            style={{ 
              position: 'fixed', inset: 0, 
              background: 'rgba(0,0,0,0.4)', 
              backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              zIndex: 9500 
            }} 
          />

          {/* FULL HEIGHT PRO SAAS SIDEBAR */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
            style={{ 
              position: 'fixed', top: 0, right: 0, bottom: 0, 
              width: '100%', maxWidth: 360, 
              background: '#ffffff', 
              zIndex: 9600,
              display: 'flex', flexDirection: 'column',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.15)',
              borderLeft: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            {/* HEADER WITH LOGO & CLOSE */}
            <div style={{ 
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
              padding: '24px 28px', borderBottom: '1px solid rgba(0,0,0,0.05)'
            }}>
               <Logo onClick={() => go('/')} sm />
               <button 
                  onClick={() => dsp({ t: 'UI', v: { mobileMenu: false } })}
                  style={{ 
                    width: 36, height: 36, borderRadius: '10px', border: '1px solid rgba(0,0,0,0.05)', 
                    background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
                    transition: 'all 0.2s ease'
                  }}
               >
                  <X size={18} color="#111" />
               </button>
            </div>

            {/* SCROLLABLE CONTENT */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '28px', display: 'flex', flexDirection: 'column', gap: 32 }}>
              
              {/* QUICK SEARCH (MOCKUP) */}
              <button 
                onClick={() => { dsp({ t: 'UI', v: { mobileMenu: false } }); go('/creators'); }}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', 
                  background: '#F9FAFB', borderRadius: 12, border: '1px solid rgba(0,0,0,0.05)',
                  cursor: 'pointer', width: '100%', textAlign: 'left'
                }}
              >
                <Search size={18} color="rgba(0,0,0,0.4)" />
                <span style={{ fontSize: 14, color: 'rgba(0,0,0,0.5)', fontWeight: 500 }}>Search creators, campaigns...</span>
              </button>

              {/* MAIN NAVIGATION */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16 }}>
                  Explore Platform
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {links.map((n, i) => {
                    const Icon = n.i;
                    const isActive = location.pathname === n.path;
                    return (
                      <motion.button
                        key={n.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 + 0.1 }}
                        onClick={() => go(n.path)}
                        onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'rgba(0,0,0,0.02)'; }}
                        onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                        style={{ 
                          padding: '14px 16px', borderRadius: 12, 
                          background: isActive ? 'rgba(0,0,0,0.05)' : 'transparent',
                          display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
                          transition: 'all 0.2s ease', border: 'none', width: '100%', textAlign: 'left'
                        }}
                      >
                        <Icon size={18} color={isActive ? '#111' : 'rgba(0,0,0,0.6)'} />
                        <span style={{ 
                          fontWeight: isActive ? 700 : 500, 
                          fontSize: 15, 
                          color: isActive ? '#111' : 'rgba(0,0,0,0.7)',
                          flex: 1 
                        }}>{n.l}</span>
                        {isActive && <ChevronRight size={16} color="#111" style={{ opacity: 0.5 }} />}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* LOGGED IN USER DASHBOARD SECTION */}
              {st.user && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16 }}>
                    Your Workspace
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {[
                      isCreator && { l: 'Dashboard', p: '/dashboard', i: LayoutDashboard },
                      isCreator && { l: 'Applications', p: '/applications', i: Briefcase },
                      isBrand && { l: 'Brand Dashboard', p: '/brand-dashboard', i: LayoutDashboard },
                      isBrand && { l: 'Post Campaign', p: '/campaign-builder', i: Megaphone },
                      { l: 'Saved Items', p: '/saved', i: Bookmark },
                      { l: 'Settings', p: '/settings', i: Settings }
                    ].filter(Boolean).map((n) => {
                      const Icon = n.i;
                      const isActive = location.pathname === n.p;
                      return (
                        <button 
                          key={n.p} 
                          onClick={() => go(n.p)} 
                          onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'rgba(0,0,0,0.02)'; }}
                          onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                          style={{ 
                            display: 'flex', alignItems: 'center', gap: 14, width: '100%', padding: '14px 16px', 
                            background: isActive ? 'rgba(0,0,0,0.05)' : 'transparent',
                            border: 'none', textAlign: 'left', fontSize: 15, 
                            color: isActive ? '#111' : 'rgba(0,0,0,0.7)', 
                            cursor: 'pointer', fontWeight: isActive ? 700 : 500, 
                            borderRadius: 12, transition: 'all 0.2s'
                          }}
                        >
                          <Icon size={18} color={isActive ? '#111' : 'rgba(0,0,0,0.5)'} />
                          {n.l}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SUPPORT & RESOURCES */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16 }}>
                  Resources
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {supportLinks.map((n) => {
                    const Icon = n.i;
                    return (
                      <button 
                        key={n.l} 
                        onClick={() => go(n.path)} 
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.02)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                        style={{ 
                          display: 'flex', alignItems: 'center', gap: 14, width: '100%', padding: '14px 16px', 
                          background: 'transparent',
                          border: 'none', textAlign: 'left', fontSize: 15, 
                          color: '#111', cursor: 'pointer', fontWeight: 500, 
                          borderRadius: 12, transition: 'all 0.2s'
                        }}
                      >
                        <Icon size={18} color="rgba(0,0,0,0.5)" />
                        {n.l}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* PRO PROMO CARD */}
              <div style={{ 
                padding: '20px', borderRadius: 16, 
                background: 'linear-gradient(135deg, #FFF9F2 0%, #FFF2E5 100%)', 
                border: '1px solid rgba(255,148,49,0.2)',
                color: '#111', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.05 }}>
                  <Sparkles size={80} color="#FF9431" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Sparkles size={16} color="#FF9431" />
                  <span style={{ fontSize: 12, fontWeight: 800, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1px' }}>CreatorBharat Pro</span>
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>Unlock premium tools & analytics</h4>
                <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.6)', marginBottom: 16, lineHeight: 1.4 }}>Get verified, access elite campaigns, and grow faster.</p>
                <button 
                  onClick={() => { dsp({ t: 'UI', v: { mobileMenu: false } }); go('/pricing'); }}
                  style={{ 
                    padding: '10px 16px', background: '#FF9431', color: '#fff', 
                    border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, 
                    cursor: 'pointer', width: '100%', transition: 'all 0.2s',
                    boxShadow: '0 4px 12px rgba(255,148,49,0.2)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  Upgrade Now
                </button>
              </div>

            </div>

            {/* FOOTER ACTION AREA */}
            <div style={{ 
              padding: '24px 28px', 
              borderTop: '1px solid rgba(0,0,0,0.05)',
              background: '#FAFAFA'
            }}>
              
              {st.user ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <img 
                      src={(st.creatorProfile?.photo || st.creatorProfile?.avatarUrl) || `https://ui-avatars.com/api/?name=${encodeURIComponent(st.user?.name || 'U')}&background=111111&color=fff`} 
                      style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(0,0,0,0.1)' }} 
                      alt=""
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{st.user?.name || st.user?.companyName}</div>
                      <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)' }}>
                        {(() => {
                          if (isCreator) return 'Creator Account';
                          if (isBrand) return 'Brand Account';
                          return 'User';
                        })()}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => { dsp({ t: 'LOGOUT' }); dsp({ t: 'UI', v: { mobileMenu: false } }); navigate('/'); }} 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '14px', background: 'rgba(239,68,68,0.1)', border: 'none', fontSize: 14, color: '#DC2626', cursor: 'pointer', fontWeight: 600, borderRadius: 10 }}
                  >
                    <LogOut size={16} />
                    Log Out securely
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User size={20} color="#111" />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>Guest User</div>
                      <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)' }}>Sign in to access features</div>
                    </div>
                  </div>
                  <Btn full lg onClick={() => { navigate('/login'); dsp({ t: 'UI', v: { mobileMenu: false } }); }} style={{ padding: '14px', borderRadius: 10, fontSize: 14, background: '#111', color: '#fff', border: 'none' }}>Sign In to Portal</Btn>
                  <Btn full lg variant="outline" onClick={() => { navigate('/apply'); dsp({ t: 'UI', v: { mobileMenu: false } }); }} style={{ padding: '14px', borderRadius: 10, fontSize: 14, background: '#fff', border: '1px solid rgba(0,0,0,0.1)', color: '#111' }}>Create Free Account</Btn>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

MobileMenu.propTypes = {
  open: PropTypes.bool.isRequired
};