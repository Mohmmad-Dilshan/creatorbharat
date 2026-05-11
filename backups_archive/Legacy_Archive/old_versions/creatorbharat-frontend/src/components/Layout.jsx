import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context';
import { T, scrollToTop, W } from '../theme';
import { Logo, Btn, Bdg } from './Primitives';

export function Navbar() {
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
    dsp({ t: 'UI', v: { mobileMenu: false, notifPanel: false } });
  };

  const isCreator = st.role === 'creator', isBrand = st.role === 'brand';
  const links = isCreator ? [['dashboard', 'Dashboard'], ['monetize', 'Monetize 💰'], ['campaigns', 'Campaigns'], ['leaderboard', 'Leaderboard'], ['blog', 'Blog']] : isBrand ? [['creators', 'Find Creators'], ['campaigns', 'Campaigns'], ['brand-dashboard', 'Dashboard'], ['blog', 'Blog']] : [['creators', 'Creators'], ['campaigns', 'Campaigns'], ['monetize', 'Monetize 💰'], ['pricing', 'Pricing'], ['about', 'About']];

  const navBg = scroll ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)';
  const navText = '#111';
  const navTextDim = 'rgba(0, 0, 0, 0.6)';

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 5000, padding: mob ? '12px 16px' : (scroll ? '16px 40px' : '24px 40px'), transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', pointerEvents: 'none' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', borderRadius: mob ? 22 : 102, padding: 2, overflow: 'hidden', pointerEvents: 'auto', boxShadow: scroll ? '0 20px 40px -10px rgba(0,0,0,0.1)' : '0 10px 30px -10px rgba(0,0,0,0.05)', transition: 'all 0.4s ease' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: '200%', height: '500%', background: 'conic-gradient(from 0deg, #138808 0%, #FFFFFF 20%, #FF9933 40%, #FF9933 60%, #FFFFFF 80%, #138808 100%)', animation: 'spinBorder 5s linear infinite', zIndex: 0 }} />
        <nav style={{ position: 'relative', zIndex: 1, background: navBg, backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)', borderRadius: mob ? 20 : 100, padding: mob ? '0 16px' : '0 24px', height: mob ? 60 : 72, display: 'flex', alignItems: 'center', gap: 24 }}>
          <Logo onClick={() => go('home')} sm={mob} />
          {!mob && <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, marginLeft: 40 }}>
            {links.map(([p, l]) => <button key={p} onClick={() => go(p)} style={{ padding: '8px 16px', background: st.page === p ? 'rgba(255,148,49,0.08)' : 'transparent', border: 'none', color: st.page === p ? T.gd : navTextDim, fontWeight: st.page === p ? 700 : 600, fontSize: 14, cursor: 'pointer', borderRadius: 100, fontFamily: "'Inter',sans-serif", transition: 'all .2s', letterSpacing: '0.2px' }} onMouseEnter={e => e.target.style.color = T.gd} onMouseLeave={e => e.target.style.color = st.page === p ? T.gd : navTextDim}>{l}</button>)}
          </div>}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginLeft: 'auto' }}>
            {st.user ? (
              <Btn sm onClick={() => dsp({ t: 'LOGOUT' })}>Logout</Btn>
            ) : (
              <Btn sm onClick={() => dsp({ t: 'UI', v: { authModal: true } })}>Login</Btn>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}

export function Footer() {
  const { dsp } = useApp();
  const go = (p) => { dsp({ t: 'GO', p }); scrollToTop() };
  return (
    <footer style={{ background: '#050505', color: 'rgba(255,255,255,.6)', paddingTop: 80, position: 'relative', overflow: 'hidden' }}>
      <div style={W()}>
        <div style={{ paddingBottom: 48, textAlign: 'center' }}>
          <Logo light onClick={() => go('home')} />
          <p style={{ marginTop: 24 }}>India's premier creator discovery ecosystem. Made with ❤️ in Jaipur.</p>
        </div>
      </div>
    </footer>
  );
}

export function AIChatbot() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 8500 }}>
      <button onClick={() => setOpen(!open)} style={{ width: 56, height: 56, borderRadius: '50%', background: T.gd, border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer' }}>🤖</button>
      {open && <div style={{ position: 'absolute', bottom: 70, right: 0, width: 300, height: 400, background: '#fff', borderRadius: 20, boxShadow: T.sh4, padding: 20 }}>
        <h4>CreatorBharat AI</h4>
        <p>Namaste! How can I help you today?</p>
      </div>}
    </div>
  );
}
