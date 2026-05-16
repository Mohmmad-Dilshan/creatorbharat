import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import './auth.css';
import { ShieldCheck } from 'lucide-react';
import { useApp } from '@/core/context';
import { Logo } from '@/components/common';
import ApplyForm from '../apply/ApplyForm.jsx';
import { sanitize } from '@/utils/security';
import { LS } from '@/utils/helpers';


// Views
import GatewayView from './views/GatewayView.jsx';
import LoginView from './views/LoginView.jsx';
import BrandRegisterView from './views/BrandRegisterView.jsx';
import ForgotView from './views/ForgotView.jsx';

import { useNavigate } from 'react-router-dom';

const AuthContent = ({ initialView = 'gateway', isPage = false, onClose }) => {
  const { dsp } = useApp();
  const navigate = useNavigate();
  const [view, setView] = useState(initialView); 
  const [isMobile, setIsMobile] = useState(globalThis.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(globalThis.innerWidth <= 768);
    globalThis.addEventListener('resize', handleResize);
    return () => globalThis.removeEventListener('resize', handleResize);
  }, []);

  const handleSetView = (v) => {
    if (isPage) {
      if (v === 'register') { navigate('/apply'); return; }
      if (v === 'brand-register') { navigate('/brand-register'); return; }
      if (v === 'login') { navigate('/login'); return; }
      if (v === 'gateway') { 
        // If we are already on a register/login page, back goes to Gateway (/join)
        // If we are on Gateway (/join), back goes to Home (/)
        if (initialView === 'gateway') navigate('/');
        else navigate('/join');
        return; 
      }
      if (v === 'forgot') { navigate('/forgot-password'); return; }
    }
    setView(v);
  };
  const [role, setRole] = useState('creator');
  const [loading, setLoading] = useState(false);

  const onAuthSuccess = (user) => {
    dsp({ t: 'LOGIN', u: user, role: user.role });
    const pendingApply = LS.get('cb_pending_apply');
    if (pendingApply) {
      LS.remove('cb_pending_apply', null); // clear it
      navigate(`/campaigns?apply=${pendingApply}`);
    } else {
      navigate('/dashboard');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = sanitize(e.target.email?.value);
    const password = e.target.password?.value; // Password shouldn't be HTML-sanitized usually, but kept safe by backend

    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      // Simulation logic
      if (email === 'error@test.com') {
        dsp({ t: 'TOAST', d: { type: 'error', msg: 'User does not exist. Please sign up first.' } });
        return;
      }
      if (password === 'wrong') {
        dsp({ t: 'TOAST', d: { type: 'error', msg: 'Incorrect password. Please try again.' } });
        return;
      }

      onAuthSuccess({ email: email || 'user@example.com', role, id: 'u-' + Date.now() });
      dsp({ t: 'TOAST', d: { type: 'success', msg: `Welcome back, ${role === 'brand' ? 'Partner' : 'Creator'}!` } });
    }, 1200);
  };

  const isBrand = view === 'brand-register' || (view === 'login' && role === 'brand');
  const accent = isBrand ? '#10B981' : '#FF9431';

  const getHeroContent = () => {
    if (view === 'brand-register') return {
      title: "Scale Your Brand with Bharat's Best",
      sub: "Access 50,000+ verified creators and manage campaigns with data-driven ROI tracking."
    };
    if (view === 'register') return {
      title: "Turn Your Influence into a Legacy",
      sub: "Join the elite 1% of creators and collaborate with top brands in India."
    };
    return {
      title: view === 'gateway' ? "Join Bharat's Elite Ecosystem" : "Welcome to the Creator Hub",
      sub: "Verified discovery, transparent pricing, and local impact for every creator and brand."
    };
  };

  const hero = getHeroContent();

  return (
    <div className={`auth-container ${isPage ? 'is-standalone-page' : 'is-modal'}`}>
      <div className="auth-modal-grid">
        <aside className="auth-aside" style={{ 
          background: `linear-gradient(165deg, ${accent} 0%, ${isBrand ? '#065F46' : '#9A3412'} 100%)` 
        }}>
          <div className="auth-aside-content">
            <div className="auth-brand" style={{ animation: 'float 4s ease-in-out infinite' }}>
              <Logo light sm />
            </div>
            
            <div className="auth-hero-text">
              <h2 className="auth-hero-title">
                {hero.title}
              </h2>
              <p className="auth-hero-sub">
                {hero.sub}
              </p>
              
              <div className="auth-stats-grid">
                {[
                  [isBrand ? '1.2K+' : '50K+', isBrand ? 'Active Brands' : 'Creators'],
                  ['98%', 'Verified'],
                  ['₹45Cr+', 'Paid Out']
                ].map(([num, label]) => (
                  <div key={label} className="auth-stat-card">
                    <p className="auth-stat-num">{num}</p>
                    <p className="auth-stat-label">{label}</p>
                  </div>
                ))}
              </div>
              
              <div className="auth-security-badge">
                <ShieldCheck size={18} color="#fff" />
                <p>
                  {isBrand ? "ISO 27001 Certified Security" : "Verified Local Identity Protocol"}
                </p>
              </div>
            </div>
          </div>
        </aside>

        <main className="auth-main">
          {!isPage && onClose && (
            <button onClick={onClose} className="auth-close-btn" aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          )}
          
          <div className="auth-scroll-area">
            <div className="auth-mobile-header">
               <Logo sm onClick={() => navigate('/')} />
            </div>
            <div className="auth-form-wrapper">
              <AnimatePresence mode="wait">
                {view === 'gateway' && <GatewayView setView={handleSetView} setRole={setRole} mob={isMobile} />}
                {view === 'login' && <LoginView role={role} setRole={setRole} onLogin={handleLogin} loading={loading} setView={handleSetView} mob={isMobile} />}
                {view === 'register' && <ApplyForm onSuccess={onAuthSuccess} onBackToLogin={() => handleSetView('login')} mob={isMobile} />}
                {view === 'brand-register' && <BrandRegisterView setView={handleSetView} onSuccess={onAuthSuccess} mob={isMobile} />}
                {view === 'forgot' && <ForgotView setView={handleSetView} />}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

AuthContent.propTypes = {
  initialView: PropTypes.string,
  isPage: PropTypes.bool,
  onClose: PropTypes.func
};

export default AuthContent;
