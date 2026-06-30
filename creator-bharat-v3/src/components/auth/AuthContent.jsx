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

import { loginWithPassword, mergeRegistrationProfile } from '../../utils/authService';

const AuthContent = ({ initialView = 'gateway', isPage = false, onClose }) => {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [view, setView] = useState(initialView); 
  const [isMobile, setIsMobile] = useState(globalThis.innerWidth <= 768);
  const [showSplash, setShowSplash] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isVerifyingGoogle, setIsVerifyingGoogle] = useState(false);

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

  // Intercept Google OAuth callback redirect tokens
  useEffect(() => {
    const params = new URLSearchParams(globalThis.location.search);
    const urlToken = params.get('token');
    const urlError = params.get('error');
    const existingRole = params.get('existing_role');

    // ── Handle OAuth errors ────────────────────────────────────────────────
    if (urlError) {
      globalThis.history.replaceState({}, document.title, globalThis.location.pathname);
      let errorMsg = 'Google sign-in failed. Please try again.';

      if (urlError === 'email_role_mismatch') {
        const existingLabel = existingRole === 'creator' ? 'Creator' : 'Brand';
        const wrongLabel = existingRole === 'creator' ? 'Brand' : 'Creator';
        errorMsg = `This Google account is already registered as a ${existingLabel}. Please use the ${existingLabel} login, not ${wrongLabel} login.`;
      } else if (urlError === 'suspended') {
        errorMsg = 'Your account has been suspended. Contact support for help.';
      } else if (urlError === 'server_error') {
        errorMsg = 'A server error occurred during Google sign-in. Please try again.';
      }

      dsp({ t: 'TOAST', d: { type: 'error', msg: errorMsg } });
      setAuthError(errorMsg);
      return;
    }

    // ── Handle successful OAuth token ─────────────────────────────────────
    if (urlToken) {
      globalThis.history.replaceState({}, document.title, globalThis.location.pathname);
      setIsVerifyingGoogle(true);
      setLoading(true);
      
      localStorage.setItem('cb_token', urlToken);
      
      import('../../utils/authService').then(({ getCurrentUser }) => {
        getCurrentUser()
          .then(({ user }) => {
            onAuthSuccess(user, urlToken);
            dsp({ t: 'TOAST', d: { type: 'success', msg: 'Signed in with Google successfully!' } });
          })
          .catch(err => {
            localStorage.removeItem('cb_token');
            dsp({ t: 'TOAST', d: { type: 'error', msg: err.message || 'Google Auth verification failed.' } });
          })
          .finally(() => {
            setLoading(false);
            setIsVerifyingGoogle(false);
          });
      });
    }
  }, [navigate, dsp]);

  const handleSetView = (v) => {
    setAuthError('');
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

  const onAuthSuccess = (backendUser, token, formPhone) => {
    if (token) {
      localStorage.setItem('cb_token', token);
    }
    const role = (backendUser.role || 'CREATOR').toLowerCase();

    if (role === 'creator') {
      const allCreators = LS.get('cb_creators', []);
      const existingEntry = allCreators.find(cr => cr.email === backendUser.email) || {};

      // Build the form data object for merging — phone comes from the 3rd argument
      const formData = {
        name: backendUser.name,
        phone: formPhone || '',
        city: (backendUser.creator || backendUser.creatorProfile || {}).city || backendUser.city || '',
        state: (backendUser.creator || backendUser.creatorProfile || {}).state || backendUser.state || '',
        handle: (backendUser.creator || backendUser.creatorProfile || {}).handle || backendUser.handle || '',
        email: backendUser.email,
      };

      const mergedProfile = mergeRegistrationProfile(backendUser, formData, existingEntry);

      // Ensure required array/object fields are present
      const profileEntry = {
        ...mergedProfile,
        id: mergedProfile.id || existingEntry.id || backendUser.id || 'c-' + Date.now(),
        email: backendUser.email,
        followers: mergedProfile.followers || 0,
        score: mergedProfile.score || 85,
        niche: mergedProfile.niche || ['Digital Creator'],
        bio: (() => {
          const pb = localStorage.getItem('cb_pending_bio');
          if (pb) {
            localStorage.removeItem('cb_pending_bio');
            return pb;
          }
          return mergedProfile.bio || '';
        })(),
        gallery: mergedProfile.gallery || [],
        full_story: mergedProfile.full_story || mergedProfile.fullStory || { p1: '', quote: '', p2: '', p3: '' },
        milestones: mergedProfile.milestones || [],
        services: mergedProfile.services || [],
        awards: mergedProfile.awards || [],
        collabs: mergedProfile.collabs || [],
      };

      const updatedCreators = allCreators.filter(cr => cr.email !== backendUser.email);
      updatedCreators.push(profileEntry);
      LS.set('cb_creators', updatedCreators);

      const normalizedUser = {
        ...backendUser,
        role,
        creatorProfile: profileEntry,
      };

      dsp({ t: 'LOGIN', u: normalizedUser, role });
    } else {
      // Non-creator (brand, admin) — dispatch LOGIN with basic normalised user
      const normalizedUser = {
        ...backendUser,
        role,
        creatorProfile: backendUser.creator || backendUser.creatorProfile,
      };
      dsp({ t: 'LOGIN', u: normalizedUser, role });
    }
    
    const pendingApply = LS.get('cb_pending_apply');
    if (pendingApply) {
      localStorage.removeItem('cb_pending_apply');
      navigate(`/campaigns?apply=${pendingApply}`);
      return;
    }

    if (role === 'brand') {
      navigate('/brand-dashboard');
    } else if (role === 'creator') {
      setShowSplash(true);
      setTimeout(() => {
        setShowSplash(false);
        const hasPhone = profileEntry.phone && profileEntry.phone.trim().length >= 10;
        const hasLocation = profileEntry.state && profileEntry.city;
        const isProfileIncomplete = !hasPhone || !hasLocation;

        if (view === 'register' || isProfileIncomplete) {
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
    setAuthError('');
    try {
      const { user, token } = await loginWithPassword({ email, password, role });
      onAuthSuccess(user, token);
      dsp({ t: 'TOAST', d: { type: 'success', msg: `Welcome back!` } });
    } catch (err) {
      setAuthError(err.message || 'Login failed. Please try again.');
      dsp({ t: 'TOAST', d: { type: 'error', msg: err.message || 'Login failed. Please try again.' } });
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
                <Logo light sm onClick={() => navigate('/')} />
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
                {view === 'register' && (
                  <button
                    type="button"
                    onClick={() => handleSetView('gateway')}
                    className="auth-header-back-btn"
                  >
                    ← Back
                  </button>
                )}
              </div>
              <div className="auth-form-wrapper">
                {isVerifyingGoogle ? (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '280px',
                    width: '100%',
                    gap: '16px',
                    color: '#0f172a',
                    padding: '40px'
                  }}>
                    <div className="cb-spinner" style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '4px solid #f3f4f6',
                      borderTopColor: accent,
                      animation: 'spin 1s linear infinite'
                    }} />
                    <h3 style={{ fontSize: '18px', fontWeight: 900, margin: 0 }}>Logging in with Google...</h3>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: 0, textAlign: 'center' }}>Please wait while we verify your credentials.</p>
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    {view === 'gateway' && <GatewayView setView={handleSetView} setRole={setRole} mob={isMobile} />}
                    {view === 'login' && <LoginView role={role} setRole={setRole} onLogin={handleLogin} onAuthSuccess={onAuthSuccess} loading={loading} setView={handleSetView} mob={isMobile} authError={authError} setAuthError={setAuthError} />}
                    {view === 'register' && <ApplyForm onSuccess={onAuthSuccess} onBackToLogin={() => handleSetView('login')} mob={isMobile} />}
                    {view === 'brand-register' && <BrandRegisterView setView={handleSetView} onSuccess={onAuthSuccess} mob={isMobile} />}
                    {view === 'forgot' && <ForgotView setView={handleSetView} />}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
};

AuthContent.propTypes = {
  initialView: PropTypes.string,
  isPage: PropTypes.bool,
  onClose: PropTypes.func
};

export default AuthContent;
