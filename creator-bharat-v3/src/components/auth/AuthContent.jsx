import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import './auth.css';
import { ShieldCheck } from 'lucide-react';
import { useApp } from '@/core/context';
import { Logo } from '@/components/common';
import WelcomeSplash from '@/components/common/WelcomeSplash';
import ApplyForm from '../apply/ApplyForm.jsx';
import { sanitize } from '@/utils/security';
import { LS } from '@/utils/helpers';


// Views
import GatewayView from './views/GatewayView.jsx';
import LoginView from './views/LoginView.jsx';
import BrandRegisterView from './views/BrandRegisterView.jsx';
import ForgotView from './views/ForgotView.jsx';

import { useNavigate } from 'react-router-dom';

import { apiCall } from '../../utils/api';

const AuthContent = ({ initialView = 'gateway', isPage = false, onClose }) => {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [view, setView] = useState(initialView); 
  const [isMobile, setIsMobile] = useState(globalThis.innerWidth <= 768);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    if (st.user) {
      if (st.role === 'brand') {
        navigate('/brand-dashboard', { replace: true });
      } else if (st.role === 'creator') {
        navigate('/creator/dashboard', { replace: true });
      }
    }
  }, [st.user, st.role, navigate]);

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

  const onAuthSuccess = (backendUser, token) => {
    if (token) {
      localStorage.setItem('cb_token', token);
    }
    const role = (backendUser.role || 'CREATOR').toLowerCase();
    
    const normalizedUser = {
      ...backendUser,
      role: role,
      creatorProfile: backendUser.creator || backendUser.creatorProfile
    };

    if (role === 'creator') {
      const allCreators = LS.get('cb_creators', []);
      const profile = normalizedUser.creatorProfile || {};
      if (!allCreators.some(cr => cr.email === normalizedUser.email)) {
        allCreators.push({
          id: profile.id || normalizedUser.id || 'c-' + Date.now(),
          name: profile.name || normalizedUser.name || normalizedUser.email.split('@')[0],
          handle: profile.handle || normalizedUser.email.split('@')[0],
          email: normalizedUser.email,
          city: profile.city || 'Jaipur Hub',
          state: profile.state || 'Rajasthan',
          phone: profile.phone || '',
          followers: profile.followers || 0,
          score: profile.score || 85,
          niche: profile.niche || ['Digital Creator'],
          bio: profile.bio || '',
          gallery: profile.gallery || [],
          full_story: profile.fullStory || { p1: '', quote: '', p2: '', p3: '' },
          milestones: profile.milestones || [],
          services: profile.services || [],
          awards: profile.awards || [],
          collabs: profile.collabs || []
        });
        LS.set('cb_creators', allCreators);
      }
    }

    dsp({ t: 'LOGIN', u: normalizedUser, role: role });
    
    const pendingApply = LS.get('cb_pending_apply');
    if (pendingApply) {
      LS.remove('cb_pending_apply', null);
      navigate(`/campaigns?apply=${pendingApply}`);
      return;
    }

    if (role === 'brand') {
      navigate('/brand-dashboard');
    } else if (role === 'creator') {
      setShowSplash(true);
      setTimeout(() => {
        setShowSplash(false);
        if (view === 'register') {
          navigate('/creator/onboarding');
        } else {
          navigate('/creator/dashboard');
        }
      }, 2500);
    } else {
      navigate('/');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = sanitize(e.target.email?.value);
    const password = e.target.password?.value;

    setLoading(true);
    try {
      const res = await apiCall('/auth/login', {
        method: 'POST',
        body: { email, password }
      });
      onAuthSuccess(res.user, res.token);
      dsp({ t: 'TOAST', d: { type: 'success', msg: `Welcome back!` } });
    } catch (err) {
      dsp({ t: 'TOAST', d: { type: 'error', msg: err.message || 'Incorrect credentials' } });
    } finally {
      setLoading(false);
    }
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
    <>
      {showSplash && <WelcomeSplash />}
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
    </>
  );
};

AuthContent.propTypes = {
  initialView: PropTypes.string,
  isPage: PropTypes.bool,
  onClose: PropTypes.func
};

export default AuthContent;
