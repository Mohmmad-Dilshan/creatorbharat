import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop, LS } from '../theme';
import { Logo, Btn, Modal, Fld, Bdg, Bar } from './Primitives';

export default function Layout({ children }) {
  const { st, dsp } = useApp();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
      <ToastBar />
      <CompareBar />
      <AIChatbot />
      {st.ui.authModal && <AuthModal />}
    </div>
  );
}

export function Navbar() {
  const { st, dsp } = useApp();
  const [scroll, setScroll] = useState(false);
  const [mob, setMob] = useState(window.innerWidth < 768);

  useEffect(() => {
    const h = () => { setScroll(window.scrollY > 20); setMob(window.innerWidth < 768); };
    window.addEventListener('scroll', h);
    window.addEventListener('resize', h);
    return () => { window.removeEventListener('scroll', h); window.removeEventListener('resize', h); };
  }, []);

  const go = (p) => { dsp({ t: 'GO', p }); scrollToTop(); dsp({ t: 'UI', v: { mobileMenu: false } }); };

  const isCreator = st.role === 'creator', isBrand = st.role === 'brand';
  const links = isCreator
    ? [['dashboard', 'Dashboard'], ['monetize', 'Monetize 💰'], ['campaigns', 'Campaigns'], ['leaderboard', 'Leaderboard'], ['blog', 'Blog']]
    : isBrand
      ? [['creators', 'Find Creators'], ['campaigns', 'Campaigns'], ['brand-dashboard', 'Dashboard'], ['blog', 'Blog']]
      : [['creators', 'Creators'], ['campaigns', 'Campaigns'], ['monetize', 'Monetize 💰'], ['pricing', 'Pricing'], ['about', 'About']];

  const navBg = scroll ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)';
  const navText = '#111';
  const navTextDim = 'rgba(0, 0, 0, 0.6)';

  return (
    <>
      <style>{`
        @keyframes spinBorder {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes flagSweep {
          to { background-position: 200% center; }
        }
        .logo-text-animated {
          background: linear-gradient(90deg, #FF9431, #FFFFFF, #128807, #FF9431);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: flagSweep 3s linear infinite;
          filter: drop-shadow(0 1px 1px rgba(0,0,0,0.05));
        }
        .mobile-nav-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(8px); z-index: 6000;
          animation: fadeIn 0.3s ease;
        }
        .mobile-nav-sheet {
          position: fixed; left: 16px; right: 16px; bottom: 16px; background: #fff; border-radius: 32px;
          padding: 32px 24px; z-index: 6001; box-shadow: 0 -20px 40px rgba(0,0,0,0.1);
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: none; } }
      `}</style>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 5000, padding: mob ? '12px 16px' : (scroll ? '16px 40px' : '24px 40px'), transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', pointerEvents: 'none' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', borderRadius: mob ? 100 : 102, padding: 2, overflow: 'hidden', pointerEvents: 'auto', boxShadow: scroll ? '0 20px 40px -10px rgba(0,0,0,0.1)' : '0 10px 30px -10px rgba(0,0,0,0.05)', transition: 'all 0.4s ease' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: '200%', height: '500%', background: 'conic-gradient(from 0deg, #138808 0%, #FFFFFF 20%, #FF9933 40%, #FF9933 60%, #FFFFFF 80%, #138808 100%)', animation: 'spinBorder 5s linear infinite', zIndex: 0 }} />
          <nav style={{ position: 'relative', zIndex: 1, background: navBg, backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)', borderRadius: mob ? 100 : 100, padding: mob ? '0 12px 0 16px' : '0 24px', height: mob ? 60 : 72, display: 'flex', alignItems: 'center', gap: 24 }}>
            <Logo onClick={() => go('home')} sm={mob} />
            {!mob && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, marginLeft: 40 }}>
                {links.map(([p, l]) => (
                  <button key={p} onClick={() => go(p)} style={{ padding: '8px 16px', background: st.page === p ? 'rgba(255,148,49,0.08)' : 'transparent', border: 'none', color: st.page === p ? T.gd : navTextDim, fontWeight: st.page === p ? 700 : 600, fontSize: 14, cursor: 'pointer', borderRadius: 100, transition: 'all .2s' }}>{l}</button>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto' }}>
              {st.user ? (
                <button onClick={() => dsp({ t: 'UI', v: { mobileMenu: !st.ui.mobileMenu } })} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: `1px solid rgba(0,0,0,0.05)`, borderRadius: 100, padding: '4px 12px 4px 4px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <img src={st.user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(st.user.name)}&background=FF9431&color=fff`} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} alt="" />
                  {!mob && <span style={{ fontSize: 14, fontWeight: 700, color: navText }}>{st.user.name.split(' ')[0]}</span>}
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke={navTextDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              ) : (
                <>
                  {!mob && <button onClick={() => dsp({ t: 'UI', v: { authModal: true } })} style={{ background: 'transparent', border: 'none', color: navText, fontSize: 14, fontWeight: 700, cursor: 'pointer', padding: '0 8px' }}>Login</button>}
                  <Btn lg onClick={() => go('apply')} style={{ fontWeight: 800, borderRadius: 100, padding: mob ? '10px 16px' : '10px 24px', fontSize: mob ? 12 : 14, background: '#111', color: '#fff', border: 'none' }}>{mob ? 'Join' : 'Create Portfolio'}</Btn>
                </>
              )}
              {mob && (
                <button onClick={() => dsp({ t: 'UI', v: { mobileMenu: !st.ui.mobileMenu } })} style={{ background: '#fff', border: `1px solid rgba(0,0,0,0.05)`, cursor: 'pointer', width: 40, height: 40, borderRadius: '50%', display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', justifyContent: 'center', transition: 'all .2s', transform: st.ui.mobileMenu ? 'rotate(90deg)' : 'none' }}>
                  {st.ui.mobileMenu ? '×' : [0, 1, 2].map(i => <span key={i} style={{ display: 'block', width: 18, height: 2, background: navText, borderRadius: 1 }} />)}
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* MOBILE MENU SHEET */}
      {st.ui.mobileMenu && (
        <>
          <div className="mobile-nav-overlay" onClick={() => dsp({ t: 'UI', v: { mobileMenu: false } })} />
          <div className="mobile-nav-sheet">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
              <Logo sm />
              <button onClick={() => dsp({ t: 'UI', v: { mobileMenu: false } })} style={{ fontSize: 24, background: T.bg3, border: 'none', width: 40, height: 40, borderRadius: '50%', cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {links.map(([p, l]) => (
                <button key={p} onClick={() => go(p)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: st.page === p ? T.ga : T.bg2, border: 'none', borderRadius: 16, color: st.page === p ? T.gd : T.n8, fontSize: 16, fontWeight: 700, cursor: 'pointer', transition: 'all .2s' }}>
                  {l}
                  <span style={{ opacity: 0.3 }}>→</span>
                </button>
              ))}
              {st.user ? (
                <button onClick={() => { dsp({ t: 'LOGOUT' }); go('home'); }} style={{ marginTop: 12, padding: '16px 20px', background: T.ga, color: T.gd, border: 'none', borderRadius: 16, fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Logout Account</button>
              ) : (
                <Btn full lg onClick={() => { dsp({ t: 'UI', v: { authModal: true, mobileMenu: false } }); }} style={{ marginTop: 12 }}>Login to Account</Btn>
              )}
            </div>
            <p style={{ textAlign: 'center', fontSize: 12, color: T.t3, marginTop: 32, fontWeight: 600 }}>CreatorBharat • Proudly Made in 🇮🇳 Jaipur</p>
          </div>
        </>
      )}
    </>
  );
}

export function Footer() {
  const { dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  useEffect(() => { const h = () => setMob(window.innerWidth < 768); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);
  const go = (p) => { dsp({ t: 'GO', p }); scrollToTop(); };

  return (
    <footer style={{ background: '#050505', color: 'rgba(255,255,255,.6)', paddingTop: mob ? 48 : 80, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,#FF9431 33%,#fff 33%,#fff 66%,#128807 66%)', opacity: .3 }} />
      <div style={W()}>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '2fr 1fr 1fr 1fr', gap: mob ? 40 : 60, paddingBottom: 48 }}>
          <div style={{ maxWidth: 320 }}>
            <Logo light onClick={() => go('home')} />
            <p style={{ fontSize: 15, lineHeight: 1.7, marginTop: 24, color: 'rgba(255,255,255,.5)' }}>India's premier creator discovery ecosystem. Empowering local talent from Jaipur to the world.</p>
          </div>
          {[{ t: 'Platform', l: [['creators', 'Find Creators'], ['campaigns', 'Campaigns'], ['leaderboard', 'Leaderboard'], ['rate-calc', 'Calculator']] }, { t: 'Company', l: [['about', 'Our Story'], ['blog', 'Latest News'], ['contact', 'Contact Us']] }, { t: 'Resources', l: [['pricing', 'Pricing Plans'], ['apply', 'Join as Creator'], ['brand-register', 'For Brands']] }].map(col => (
            <div key={col.t}>
              <h4 style={{ fontSize: 13, fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 24 }}>{col.t}</h4>
              {col.l.map(([p, l]) => <button key={p} onClick={() => go(p)} style={{ display: 'block', background: 'none', border: 'none', color: 'rgba(255,255,255,.5)', fontSize: 15, cursor: 'pointer', marginBottom: 14, padding: 0, textAlign: 'left' }}>{l}</button>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', padding: '24px 0', textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.3)', fontWeight: 500 }}>© 2026 CreatorBharat Technologies. Proudly Made in 🇮🇳 Jaipur</p>
        </div>
      </div>
    </footer>
  );
}

export function ToastBar() {
  const { st, dsp } = useApp();
  if (st.toasts.length === 0) return null;
  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {st.toasts.map(t => (
        <div key={t.id} style={{ background: t.type === 'success' ? '#14532d' : '#7f1d1d', color: '#fff', borderRadius: 10, padding: '11px 16px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: T.sh3 }}>
          <span>{t.type === 'success' ? '✓' : '✗'}</span>
          <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{t.msg}</span>
          <button onClick={() => dsp({ t: 'RM_TOAST', id: t.id })} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,.6)', cursor: 'pointer' }}>×</button>
        </div>
      ))}
    </div>
  );
}

export function CompareBar() {
  const { st, dsp } = useApp();
  if (st.compared.length === 0) return null;
  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: `2px solid ${T.gd}`, zIndex: 6000, padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 -4px 20px rgba(0,0,0,.08)' }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: T.n8 }}>Compare ({st.compared.length}/3)</span>
      <Btn sm onClick={() => dsp({ t: 'GO', p: 'compare' })}>Compare</Btn>
    </div>
  );
}

export function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role: 'assistant', content: 'Namaste! 🇮🇳 Main CreatorBharat ka AI assistant hoon. Kuch bhi pucho!' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input.trim() };
    setMsgs([...msgs, userMsg]);
    setInput('');
    setLoading(true);
    // Mocking the AI response for now to ensure reliability, but keeping the logic shell
    setTimeout(() => {
      setMsgs(prev => [...prev, { role: 'assistant', content: 'Bahut badhiya sawal! Abhi hum development mein hain, par main jaldi hi aapki madad karunga. 🙏' }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 8500 }}>
        <button onClick={() => setOpen(!open)} style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,#FF9933,#138808)', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(255,153,51,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🤖</button>
      </div>
      {open && (
        <div className="si" style={{ position: 'fixed', bottom: 90, right: 28, width: 360, height: 520, background: '#fff', borderRadius: 20, boxShadow: T.sh4, zIndex: 8500, display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #E8E6E3' }}>
          <div style={{ padding: '14px 16px', background: 'linear-gradient(135deg,#0d0d0d,#1a0800)', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700 }}>CreatorBharat AI</span>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>×</button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 14, background: '#FAFAF9', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%', padding: '10px 14px', borderRadius: 14, background: m.role === 'user' ? T.gd : '#fff', color: m.role === 'user' ? '#fff' : T.n8, fontSize: 13, border: m.role === 'user' ? 'none' : '1px solid #E8E6E3' }}>{m.content}</div>
            ))}
            {loading && <div style={{ fontSize: 12, color: T.t3 }}>Typing...</div>}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding: 12, borderTop: '1px solid #E8E6E3', display: 'flex', gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Kuch pucho..." style={{ flex: 1, padding: '8px 12px', borderRadius: 10, border: '1px solid #E2E8F0', outline: 'none' }} />
            <button onClick={send} style={{ width: 36, height: 36, borderRadius: 10, background: T.gd, border: 'none', color: '#fff', cursor: 'pointer' }}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}

export function AuthModal() {
  const { st, dsp } = useApp();
  return (
    <Modal open={true} onClose={() => dsp({ t: 'UI', v: { authModal: false } })} title="Welcome Back">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Fld label="Email Address" type="email" placeholder="you@email.com" />
        <Fld label="Password" type="password" placeholder="••••••••" />
        <Btn full lg onClick={() => dsp({ t: 'LOGIN', u: { name: 'Demo User', id: '1' }, role: 'creator' })}>Sign In</Btn>
      </div>
    </Modal>
  );
}
