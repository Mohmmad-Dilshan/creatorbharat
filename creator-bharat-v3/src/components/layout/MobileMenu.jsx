import React from 'react';
import { useApp } from '../../context';
import { Btn, Logo } from '../Primitives';
import { scrollToTop } from '../../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Megaphone, Target, BookOpen, Heart, LogOut, LayoutDashboard, Briefcase, Bookmark, Settings, ChevronRight, User, LifeBuoy, MessageSquare, Sparkles, Search } from 'lucide-react';

export default function MobileMenu({ open }) {
  const { st, dsp } = useApp();

  const go = (p) => {
    dsp({ t: 'GO', p });
    scrollToTop();
    dsp({ t: 'UI', v: { mobileMenu: false } });
  };

  const links = [
    { id: 'creators', l: 'Find Creators', i: Users },
    { id: 'campaigns', l: 'Campaigns', i: Megaphone },
    { id: 'roadmap', l: 'Roadmap & Vision', i: Target },
    { id: 'blog', l: 'Creator Academy', i: BookOpen },
    { id: 'about', l: 'Our Story', i: Heart }
  ];

  const supportLinks = [
    { id: 'contact', l: 'Help & Support', i: LifeBuoy },
    { id: 'contact', l: 'Feedback', i: MessageSquare }
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
               <Logo onClick={() => go('home')} sm />
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
              <div 
                onClick={() => { dsp({ t: 'UI', v: { mobileMenu: false } }); go('creators'); }}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', 
                  background: '#F9FAFB', borderRadius: 12, border: '1px solid rgba(0,0,0,0.05)',
                  cursor: 'pointer'
                }}
              >
                <Search size={18} color="rgba(0,0,0,0.4)" />
                <span style={{ fontSize: 14, color: 'rgba(0,0,0,0.5)', fontWeight: 500 }}>Search creators, campaigns...</span>
              </div>

              {/* MAIN NAVIGATION */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16 }}>
                  Explore Platform
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {links.map((n, i) => {
                    const Icon = n.i;
                    const isActive = st.page === n.id;
                    return (
                      <motion.div
                        key={n.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 + 0.1 }}
                        onClick={() => go(n.id)}
                        onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'rgba(0,0,0,0.02)'; }}
                        onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                        style={{ 
                          padding: '14px 16px', borderRadius: 12, 
                          background: isActive ? 'rgba(0,0,0,0.05)' : 'transparent',
                          display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
                          transition: 'all 0.2s ease'
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
                      </motion.div>
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
                      isCreator && { l: 'Dashboard', p: 'dashboard', i: LayoutDashboard },
                      isCreator && { l: 'Applications', p: 'applications', i: Briefcase },
                      isBrand && { l: 'Brand Dashboard', p: 'brand-dashboard', i: LayoutDashboard },
                      isBrand && { l: 'Post Campaign', p: 'campaign-builder', i: Megaphone },
                      { l: 'Saved Items', p: 'saved', i: Bookmark },
                      { l: 'Settings', p: 'settings', i: Settings }
                    ].filter(Boolean).map((n) => {
                      const Icon = n.i;
                      const isActive = st.page === n.p;
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
                  {supportLinks.map((n, i) => {
                    const Icon = n.i;
                    return (
                      <button 
                        key={n.l} 
                        onClick={() => go(n.id)} 
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
                  onClick={() => { dsp({ t: 'UI', v: { mobileMenu: false } }); go('pricing'); }}
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
              
              {/* SOCIAL LINKS */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 28 }}>
                <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Join the Community</span>
                <div style={{ display: 'flex', gap: 16 }}>
                  {[
                    { l: 'Twitter', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1DA1F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg> },
                    { l: 'Instagram', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="url(#ig-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><defs><linearGradient id="ig-grad" x1="2" y1="2" x2="22" y2="22"><stop offset="0%" stopColor="#f09433"/><stop offset="25%" stopColor="#e6683c"/><stop offset="50%" stopColor="#dc2743"/><stop offset="75%" stopColor="#cc2366"/><stop offset="100%" stopColor="#bc1888"/></linearGradient></defs><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                    { l: 'LinkedIn', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> }
                  ].map((s, idx) => {
                    return (
                      <a key={idx} href="#" aria-label={s.l} style={{ 
                        width: 38, height: 38, borderRadius: '50%', background: 'rgba(0,0,0,0.03)', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', border: '1px solid rgba(0,0,0,0.05)'
                      }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'scale(1.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.03)'; e.currentTarget.style.transform = 'scale(1)'; }}>
                        {s.svg}
                      </a>
                    )
                  })}
                </div>
              </div>

              {!st.user ? (
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
                  <Btn full lg onClick={() => { dsp({ t: 'UI', v: { authModal: true, mobileMenu: false } }); }} style={{ padding: '14px', borderRadius: 10, fontSize: 14, background: '#111', color: '#fff', border: 'none' }}>Sign In to Portal</Btn>
                  <Btn full lg variant="outline" onClick={() => { go('apply'); dsp({ t: 'UI', v: { mobileMenu: false } }); }} style={{ padding: '14px', borderRadius: 10, fontSize: 14, background: '#fff', border: '1px solid rgba(0,0,0,0.1)', color: '#111' }}>Create Free Account</Btn>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <img 
                      src={(st.creatorProfile?.photo || st.creatorProfile?.avatarUrl) || `https://ui-avatars.com/api/?name=${encodeURIComponent(st.user?.name || 'U')}&background=111111&color=fff`} 
                      style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(0,0,0,0.1)' }} 
                      alt=""
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{st.user?.name || st.user?.companyName}</div>
                      <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)' }}>{isCreator ? 'Creator Account' : isBrand ? 'Brand Account' : 'User'}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => { dsp({ t: 'LOGOUT' }); dsp({ t: 'UI', v: { mobileMenu: false } }); }} 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '14px', background: 'rgba(239,68,68,0.1)', border: 'none', fontSize: 14, color: '#DC2626', cursor: 'pointer', fontWeight: 600, borderRadius: 10 }}
                  >
                    <LogOut size={16} />
                    Log Out securely
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}