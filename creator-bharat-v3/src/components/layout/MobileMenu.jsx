import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/core/context';
import { Btn, Logo } from '@/components/common/Primitives';
import { scrollToTop } from '../../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Megaphone, BookOpen, Heart, LogOut, LayoutDashboard, Briefcase, Bookmark, Settings, ChevronRight, User, LifeBuoy, MessageSquare, Sparkles, Search, Calculator, Trophy, ShieldCheck, Home, IndianRupee } from 'lucide-react';

export default function MobileMenu({ open }) {
  const { st, dsp } = useApp();
  const navigate = useNavigate();

  const go = (path) => {
    const protectedPaths = ['/dashboard', '/brand-dashboard', '/campaign-builder', '/settings', '/wallet', '/applications', '/messages', '/saved'];
    if (protectedPaths.includes(path) && !st.user) {
      navigate('/login');
    } else {
      navigate(path);
    }
    scrollToTop();
    dsp({ t: 'UI', v: { mobileMenu: false } });
  };

  const [search, setSearch] = React.useState('');
  const [results, setResults] = React.useState({ pages: [], creators: [] });

  // Top Creators for Search Results
  const FEATURED_CREATORS = [
    { id: 1, name: 'Mohit Sharma', handle: 'mohit.vlogs', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80' },
    { id: 2, name: 'Ananya Pandey', handle: 'ananya.style', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
    { id: 3, name: 'Raj Kumar', handle: 'raj.tech', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' }
  ];

  const links = [
    { path: '/', l: 'Home', i: Home },
    { path: '/creators', l: 'Creators', i: Users },
    { path: '/campaigns', l: 'Brand Deals', i: Megaphone },
    { path: '/leaderboard', l: 'Leaderboard', i: Trophy },
    { path: '/rate-calc', l: 'Rate Calculator', i: Calculator },
    { path: '/blog', l: 'Hub', i: BookOpen },
    { path: '/monetize', l: 'Monetization', i: IndianRupee },
    { path: '/official-profile', l: 'Official Identity', i: ShieldCheck },
    { path: '/about', l: 'Our Story', i: Heart },
    { path: '/pricing', l: 'Pricing', i: Sparkles }
  ];

  const supportLinks = [
    { path: '/faq', l: 'Help Center', i: LifeBuoy },
    { path: '/contact', l: 'Contact Support', i: MessageSquare },
    { path: '/creator-guidelines', l: 'Creator Rules', i: BookOpen },
    { path: '/brand-guidelines', l: 'Brand Rules', i: ShieldCheck },
    { path: '/privacy', l: 'Privacy Policy', i: ShieldCheck },
    { path: '/terms', l: 'Terms of Service', i: ShieldCheck }
  ];

  // Live Search Logic
  React.useEffect(() => {
    if (!search.trim()) {
      setResults({ pages: [], creators: [] });
      return;
    }

    const q = search.toLowerCase();
    
    // Filter Pages
    const filteredPages = [...links, ...supportLinks].filter(p => 
      p.l.toLowerCase().includes(q)
    ).slice(0, 4);

    // Filter Creators
    const filteredCreators = FEATURED_CREATORS.filter(c => 
      c.name.toLowerCase().includes(q) || c.handle.toLowerCase().includes(q)
    ).slice(0, 3);

    setResults({ pages: filteredPages, creators: filteredCreators });
  }, [search]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!search.trim()) return;
    dsp({ t: 'UI', v: { mobileMenu: false } });
    navigate(`/creators?q=${encodeURIComponent(search.trim())}`);
    setSearch('');
    scrollToTop();
  };

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
              zIndex: 2000000 
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
              zIndex: 2000001,
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
              
              {/* REAL CREATOR SEARCH & RESULTS */}
              <div style={{ position: 'relative' }}>
                <form 
                  onSubmit={handleSearch}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: 12, padding: '4px 14px', 
                    background: '#F9FAFB', borderRadius: 12, border: '1px solid rgba(0,0,0,0.05)',
                    width: '100%'
                  }}
                >
                  <button 
                    type="submit" 
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                    <Search size={18} color={search ? '#FF9431' : 'rgba(0,0,0,0.4)'} />
                  </button>
                  <input 
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search creators or pages..."
                    style={{ 
                      background: 'none', border: 'none', outline: 'none', 
                      fontSize: 14, color: '#111', fontWeight: 600, 
                      width: '100%', height: '44px'
                    }}
                  />
                  {search && (
                    <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', color: '#94a3b8' }}>
                      <X size={16} />
                    </button>
                  )}
                </form>

                {/* Live Search Dropdown */}
                <AnimatePresence>
                  {search.trim() && (results.pages.length > 0 || results.creators.length > 0) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      style={{
                        position: 'absolute', top: '110%', left: 0, right: 0,
                        background: '#fff', borderRadius: 16, 
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(0,0,0,0.05)',
                        zIndex: 100, overflow: 'hidden', padding: '12px'
                      }}
                    >
                      {results.pages.length > 0 && (
                        <div style={{ marginBottom: 12 }}>
                          <div style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', padding: '4px 8px' }}>Pages</div>
                          {results.pages.map(p => (
                            <button 
                              key={p.path} 
                              onClick={() => go(p.path)}
                              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 8px', background: 'none', border: 'none', borderRadius: 8, cursor: 'pointer', textAlign: 'left' }}
                              onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
                              onMouseLeave={e => e.currentTarget.style.background = 'none'}
                            >
                              <p.i size={14} color="#FF9431" />
                              <span style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{p.l}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {results.creators.length > 0 && (
                        <div>
                          <div style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', padding: '4px 8px' }}>Creators</div>
                          {results.creators.map(c => (
                            <button 
                              key={c.id} 
                              onClick={() => { go(`/creator/${c.handle || c.id}`); setSearch(''); }}
                              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 8px', background: 'none', border: 'none', borderRadius: 8, cursor: 'pointer', textAlign: 'left' }}
                              onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
                              onMouseLeave={e => e.currentTarget.style.background = 'none'}
                            >
                              <img src={c.photo || `https://ui-avatars.com/api/?name=${c.name}`} style={{ width: 24, height: 24, borderRadius: '50%' }} alt="" />
                              <span style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{c.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

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
                        <Icon size={18} color={isActive ? '#FF9431' : 'rgba(0,0,0,0.6)'} />
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
                  onClick={() => go('/pricing')}
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
                  <Btn full lg variant="outline" onClick={() => { navigate('/join'); dsp({ t: 'UI', v: { mobileMenu: false } }); }} style={{ padding: '14px', borderRadius: 10, fontSize: 14, background: '#fff', border: '1px solid rgba(0,0,0,0.1)', color: '#111' }}>Create Free Account</Btn>
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
