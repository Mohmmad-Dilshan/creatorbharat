import React, { useState, useEffect } from 'react';
import { useApp } from '../../context';
import { T } from '../../theme';
import { Logo, Btn } from '../Primitives';
import { scrollToTop } from '../../utils/helpers';

export default function Navbar() {
  const { st, dsp } = useApp();
  const [scroll, setScroll] = useState(false);
  const [mob, setMob] = useState(window.innerWidth < 768);

  useEffect(() => {
    const h = () => { 
      setScroll(window.scrollY > 20); 
      setMob(window.innerWidth < 768); 
    };
    window.addEventListener('scroll', h);
    window.addEventListener('resize', h);
    return () => { 
      window.removeEventListener('scroll', h); 
      window.removeEventListener('resize', h); 
    };
  }, []);

  const go = (p) => { 
    dsp({ t: 'GO', p }); 
    scrollToTop(); 
    dsp({ t: 'UI', v: { mobileMenu: false } }); 
  };

  const isCreator = st.role === 'creator', isBrand = st.role === 'brand';
  const links = isCreator
    ? [['dashboard', 'Dashboard'], ['campaigns', 'Deals'], ['leaderboard', 'Leaderboard'], ['blog', 'Articles']]
    : isBrand
      ? [['creators', 'Discover'], ['campaigns', 'My Ads'], ['blog', 'Articles']]
      : [['creators', 'Creators'], ['campaigns', 'Campaigns'], ['monetize', 'Monetize 💰'], ['blog', 'Articles'], ['about', 'About']];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 5000,
      padding: mob ? '12px 16px' : (scroll ? '16px 40px' : '24px 40px'),
      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      pointerEvents: 'none'
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        position: 'relative',
        borderRadius: 100,
        padding: 2,
        overflow: 'hidden',
        pointerEvents: 'auto',
        boxShadow: scroll ? '0 20px 40px -10px rgba(0,0,0,0.1)' : '0 10px 30px -10px rgba(0,0,0,0.05)',
        transition: 'all 0.5s ease',
        maxWidth: '100vw',
        boxSizing: 'border-box'
      }}>
        {/* Animated Indian Flag Border */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '200%',
          height: '500%',
          background: 'conic-gradient(from 0deg, #138808 0%, #FFFFFF 20%, #FF9933 40%, #FF9933 60%, #FFFFFF 80%, #138808 100%)',
          animation: 'spinBorder 5s linear infinite',
          zIndex: 0
        }} />

        <nav style={{
          position: 'relative',
          zIndex: 1,
          background: scroll ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderRadius: 100,
          padding: mob ? '0 10px 0 16px' : '0 24px',
          height: mob ? 52 : 76,
          display: 'flex',
          alignItems: 'center',
          gap: mob ? 8 : 24
        }}>
          <Logo onClick={() => go('home')} sm={mob} />

          {!mob && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, marginLeft: 48 }}>
              {links.map(([p, l]) => (
                <button
                  key={p}
                  onClick={() => go(p)}
                  className="nav-link"
                  style={{
                    padding: '8px 16px',
                    background: st.page === p ? 'rgba(0,0,0,0.05)' : 'transparent',
                    border: 'none',
                    color: st.page === p ? '#111' : 'rgba(0,0,0,0.5)',
                    fontWeight: 800,
                    fontSize: 12.5,
                    cursor: 'pointer',
                    borderRadius: 100
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto' }}>
            {st.user ? (
              <button
                onClick={() => dsp({ t: 'UI', v: { mobileMenu: !st.ui.mobileMenu } })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  background: '#fff',
                  border: '1.5px solid rgba(0,0,0,0.04)',
                  borderRadius: 100,
                  padding: mob ? '4px' : '6px 16px 6px 6px',
                  cursor: 'pointer',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.03)'
                }}
              >
                <img src={st.user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(st.user.name)}&background=FF9431&color=fff`} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} alt="" />
                {!mob && <span style={{ fontSize: 13, fontWeight: 900, color: '#111' }}>{st.user.name.split(' ')[0]}</span>}
              </button>
            ) : (
              <>
                {!mob && <button onClick={() => dsp({ t: 'UI', v: { authModal: true } })} style={{ background: 'transparent', border: 'none', color: '#111', fontSize: 13, fontWeight: 800, cursor: 'pointer', padding: '0 12px' }}>Login</button>}
                <Btn lg onClick={() => go('apply')} style={{ fontWeight: 900, borderRadius: 100, padding: mob ? '10px 18px' : '10px 28px', fontSize: 12.5, background: '#111', color: '#fff', border: 'none' }}>
                  {mob ? 'Join' : 'Start My Journey'}
                </Btn>
                {mob && (
                  <button
                    onClick={() => dsp({ t: 'UI', v: { mobileMenu: !st.ui.mobileMenu } })}
                    style={{ background: '#F3F4F6', border: 'none', width: 44, height: 44, borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'pointer' }}
                  >
                    <div className="hamburger-bar" style={{ transform: st.ui.mobileMenu ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
                    <div className="hamburger-bar" style={{ opacity: st.ui.mobileMenu ? 0 : 1 }} />
                    <div className="hamburger-bar" style={{ transform: st.ui.mobileMenu ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
                  </button>
                )}
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
