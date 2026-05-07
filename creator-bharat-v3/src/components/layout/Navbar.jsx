import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context';
import { Logo, Btn } from '../Primitives';
import { Menu, X } from 'lucide-react';

const NavLinks = ({ links, location, go }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, justifyContent: 'center' }}>
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
);

NavLinks.propTypes = {
  links: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
  go: PropTypes.func.isRequired
};

const UserActions = ({ st, dsp, go, mob }) => {
  if (st.user) {
    return (
      <button
        onClick={() => dsp({ t: 'UI', v: { mobileMenu: !st.ui.mobileMenu } })}
        style={{
          display: 'flex', alignItems: 'center', gap: 10, background: '#fff',
          border: '1px solid rgba(0,0,0,0.06)', borderRadius: 100,
          padding: mob ? '4px' : '5px 16px 5px 5px', cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)', transition: '0.2s'
        }}
      >
        <img src={st.user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(st.user.name)}&background=FF9431&color=fff`} style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover' }} alt={st.user.name} />
        {!mob && <span style={{ fontSize: 13, fontWeight: 900, color: '#111' }}>{st.user.name.split(' ')[0]}</span>}
      </button>
    );
  }

  return (
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
  );
};

UserActions.propTypes = {
  st: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string,
      photo: PropTypes.string
    }),
    ui: PropTypes.shape({
      mobileMenu: PropTypes.bool
    })
  }).isRequired,
  dsp: PropTypes.func.isRequired,
  go: PropTypes.func.isRequired,
  mob: PropTypes.bool
};

export default function Navbar() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [scroll, setScroll] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const [mob, setMob] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleScroll = () => {
      const curY = window.scrollY;
      const isMob = window.innerWidth < 768;
      setScroll(curY > 20);
      setMob(isMob);
      
      if (isMob) {
        const diff = curY - lastY.current;
        if (curY < 50) setVisible(true);
        else if (diff > 10) setVisible(false);
        else if (diff < -10) setVisible(true);
      } else {
        setVisible(true);
      }
      lastY.current = curY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const go = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dsp({ t: 'UI', v: { mobileMenu: false } });
  };

  const links = (() => {
    if (st.role === 'creator') return [['/dashboard', 'Dashboard'], ['/campaigns', 'Deals'], ['/leaderboard', 'Top List'], ['/blog', 'Articles']];
    if (st.role === 'brand') return [['/creators', 'Discover'], ['/campaigns', 'Campaigns'], ['/blog', 'Articles']];
    return [['/creators', 'Marketplace'], ['/campaigns', 'Opportunities'], ['/monetize', 'Monetize'], ['/blog', 'News']];
  })();

  const getPadding = () => {
    if (mob) return '12px 16px';
    return scroll ? '16px 40px' : '24px 40px';
  };

  const navTransform = (mob && !visible) ? 'translateY(-120%)' : 'none';

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999995,
      padding: getPadding(),
      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      transform: navTransform,
      pointerEvents: 'none'
    }}>
      <div style={{
        maxWidth: 1200, width: '100%', margin: '0 auto', position: 'relative',
        borderRadius: 102, padding: '2px', overflow: 'hidden', pointerEvents: 'auto',
        boxShadow: scroll ? '0 20px 50px rgba(0,0,0,0.1)' : '0 10px 30px rgba(0,0,0,0.05)',
        transition: 'all 0.5s ease',
        background: 'rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', width: '200%', height: '500%',
          background: 'conic-gradient(rgb(19, 136, 8) 0%, rgb(255, 255, 255) 20%, rgb(255, 153, 51) 40%, rgb(255, 153, 51) 60%, rgb(255, 255, 255) 80%, rgb(19, 136, 8) 100%)',
          animation: 'spinBorder 5s linear infinite',
          transform: 'translate(-50%, -50%)',
          zIndex: 0
        }} />

        <style>{`
          @keyframes spinBorder {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
          .nav-logo-text {
            background: linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #138808 100%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: flagSweep 3s linear infinite;
          }
          @keyframes flagSweep { to { background-position: 200% center; } }
        `}</style>

        <nav style={{
          position: 'relative', zIndex: 1,
          background: scroll ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
          borderRadius: 100, padding: mob ? '0 12px 0 20px' : '0 32px',
          height: mob ? 54 : 72, display: 'flex', alignItems: 'center', gap: 24
        }}>
          <Logo onClick={() => go('/')} sm={mob} />
          {!mob && <NavLinks links={links} location={location} go={go} />}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto' }}>
            <UserActions st={st} dsp={dsp} go={go} mob={mob} />
          </div>
        </nav>
      </div>
    </div>
  );
}

