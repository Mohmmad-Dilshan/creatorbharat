import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useApp } from '../../context';
import { Logo, Btn } from '../Primitives';
import { Menu, X, User as UserIcon } from 'lucide-react';

export default function Navbar() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
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

  const go = (path) => { 
    navigate(path); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dsp({ t: 'UI', v: { mobileMenu: false } }); 
  };

  const isCreator = st.role === 'creator', isBrand = st.role === 'brand';
  const links = isCreator
    ? [['/dashboard', 'Dashboard'], ['/campaigns', 'Deals'], ['/leaderboard', 'Top List'], ['/blog', 'Articles']]
    : isBrand
      ? [['/creators', 'Discover'], ['/campaigns', 'Campaigns'], ['/blog', 'Articles']]
      : [['/creators', 'Marketplace'], ['/campaigns', 'Opportunities'], ['/monetize', 'Monetize'], ['/blog', 'News']];

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999995,
      padding: mob ? '12px 16px' : (scroll ? '16px 40px' : '24px 40px'),
      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      pointerEvents: 'none'
    }}>
      <div style={{
        maxWidth: 1280, width: '100%', margin: '0 auto', position: 'relative',
        borderRadius: 100, padding: '1.5px', overflow: 'hidden', pointerEvents: 'auto',
        boxShadow: scroll ? '0 20px 50px rgba(0,0,0,0.1)' : '0 10px 30px rgba(0,0,0,0.05)',
        transition: 'all 0.5s ease'
      }}>
        {/* Subtler Animated Tiranga Border */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', width: '150%', height: '400%',
          background: 'conic-gradient(from 0deg, transparent 0%, #138808 10%, #FFFFFF 20%, #FF9933 30%, transparent 40%, transparent 100%)',
          animation: 'spinBorder 8s linear infinite',
          zIndex: 0, opacity: scroll ? 1 : 0.6
        }} />

        <nav style={{
          position: 'relative', zIndex: 1,
          background: scroll ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)',
          borderRadius: 100, padding: mob ? '0 12px 0 20px' : '0 32px',
          height: mob ? 54 : 72, display: 'flex', alignItems: 'center', gap: 24
        }}>
          <Logo onClick={() => go('/')} sm={mob} />

          {!mob && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, marginLeft: 40 }}>
              {links.map(([path, label]) => {
                const active = location.pathname === path;
                return (
                  <button
                    key={path}
                    onClick={() => go(path)}
                    className="nav-link"
                    style={{
                      padding: '10px 18px', borderRadius: 100, border: 'none',
                      background: active ? 'rgba(0,0,0,0.04)' : 'transparent',
                      color: active ? '#111' : 'rgba(0,0,0,0.5)',
                      fontWeight: 800, fontSize: 13, cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto' }}>
            {st.user ? (
              <button
                onClick={() => dsp({ t: 'UI', v: { mobileMenu: !st.ui.mobileMenu } })}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, background: '#fff',
                  border: '1px solid rgba(0,0,0,0.06)', borderRadius: 100,
                  padding: mob ? '4px' : '5px 16px 5px 5px', cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)', transition: '0.2s'
                }}
              >
                <img src={st.user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(st.user.name)}&background=FF9431&color=fff`} style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover' }} alt="" />
                {!mob && <span style={{ fontSize: 13, fontWeight: 900, color: '#111' }}>{st.user.name.split(' ')[0]}</span>}
              </button>
            ) : (
              <>
                {!mob && <button onClick={() => go('/login')} style={{ background: 'transparent', border: 'none', color: '#111', fontSize: 13, fontWeight: 800, cursor: 'pointer', padding: '0 16px' }}>Sign In</button>}
                <Btn lg onClick={() => go('/apply')} style={{ fontWeight: 900, borderRadius: 100, padding: mob ? '10px 20px' : '12px 32px', fontSize: 13, background: '#111', color: '#fff', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                  {mob ? 'Join' : 'Claim Your Profile'}
                </Btn>
                {mob && (
                  <button
                    onClick={() => dsp({ t: 'UI', v: { mobileMenu: !st.ui.mobileMenu } })}
                    style={{ background: '#f1f5f9', border: 'none', width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#111' }}
                  >
                    {st.ui.mobileMenu ? <X size={22} /> : <Menu size={22} />}
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

