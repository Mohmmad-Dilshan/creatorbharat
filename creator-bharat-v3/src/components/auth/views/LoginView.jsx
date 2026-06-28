import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Briefcase, ArrowRight, Phone, ShieldCheck, AlertCircle } from 'lucide-react';
import { Btn, Fld } from '@/components/common/Primitives';
import { useApp } from '@/core/context';
import { ModeButton } from '../AuthShared.jsx';
import { sendOtp, loginWithOtp, isUsingDemoAuth, getDemoOtp } from '@/utils/authService';
import { useOtpTimer } from '@/hooks/useOtpTimer';
import { LS } from '@/utils/helpers';

const LoginView = ({ role, setRole, onLogin, onAuthSuccess, loading, setView, authError, setAuthError }) => {
  const { dsp } = useApp();
  const [googleLoading, setGoogleLoading] = useState(false);
  const isCreator = role === 'creator';
  const themeColor = isCreator ? '#FF9431' : '#10B981';

  // Mobile OTP login states
  const [isMobileView, setIsMobileView] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const { timer, startTimer, isActive: timerActive } = useOtpTimer(30);

  const onGoogle = () => {
    if (isUsingDemoAuth()) {
      const allCreators = LS.get('cb_creators', []);
      const matched = allCreators.find(cr => cr.email === 'google-mock-user@creatorbharat.com');
      
      const mockUser = {
        id: matched ? matched.id : 'c-google-mock',
        email: 'google-mock-user@creatorbharat.com',
        name: 'Google Dev User',
        role: 'creator',
        creator: matched || {
          id: 'c-google-mock',
          handle: 'googlemockuser',
          city: 'Delhi',
          state: 'Delhi',
          followers: 12000,
          score: 88,
          niche: ['Tech Influencer'],
          bio: 'Demo user logged in via Google Auth.',
          gallery: [],
          full_story: { p1: '', quote: '', p2: '', p3: '' },
          milestones: [],
          services: [],
          awards: [],
          collabs: [],
        }
      };
      onAuthSuccess(mockUser, 'mock-google-token-' + Date.now());
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Signed in with Google (Demo Mode) successfully!' } });
      return;
    }
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
    globalThis.location.href = `${apiBase}/auth/google?role=${role}&origin=${encodeURIComponent(globalThis.location.origin)}`;
  };

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      if (setAuthError) setAuthError('Please enter a valid 10-digit number.');
      dsp({ t: 'TOAST', d: { type: 'error', msg: 'Please enter a valid 10-digit number.' } });
      return;
    }
    setOtpLoading(true);
    if (setAuthError) setAuthError('');
    try {
      await sendOtp(phone);
      setOtpSent(true);
      startTimer(30);
      dsp({ 
        t: 'TOAST', 
        d: { 
          type: 'success', 
          msg: isUsingDemoAuth() ? `Demo OTP is ${getDemoOtp()}` : 'OTP sent successfully.' 
        } 
      });
    } catch (err) {
      if (setAuthError) setAuthError(err.message || 'Failed to send OTP.');
      dsp({ t: 'TOAST', d: { type: 'error', msg: err.message || 'Failed to send OTP.' } });
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtpAndLogin = async (e) => {
    e.preventDefault();
    if (!otp) {
      if (setAuthError) setAuthError('Please enter the OTP.');
      dsp({ t: 'TOAST', d: { type: 'error', msg: 'Please enter the OTP.' } });
      return;
    }
    setOtpLoading(true);
    if (setAuthError) setAuthError('');
    try {
      const { user, token } = await loginWithOtp(phone, otp);
      onAuthSuccess(user, token, phone);
      dsp({ t: 'TOAST', d: { type: 'success', msg: `Welcome back!` } });
    } catch (err) {
      if (setAuthError) setAuthError(err.message || 'Invalid OTP or login failed.');
      dsp({ t: 'TOAST', d: { type: 'error', msg: err.message || 'Invalid OTP or login failed.' } });
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <motion.div key="login" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <div style={{ marginBottom: 32, position: 'relative' }}>
        <button 
          onClick={() => setView('gateway')}
          style={{ position: 'absolute', top: 0, right: 0, border: 'none', background: 'rgba(0,0,0,0.04)', padding: '6px 12px', borderRadius: 10, fontSize: 11, fontWeight: 800, cursor: 'pointer', color: '#64748B' }}
        >
          ← BACK
        </button>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 950, color: '#111827', marginBottom: 6, letterSpacing: '-0.5px' }}>
          {isMobileView ? 'OTP Sign In' : 'Welcome back!'}
        </h2>
        <p style={{ color: '#64748B', fontSize: 14, fontWeight: 650 }}>
          {isMobileView ? 'Sign in securely using your mobile number.' : 'Enter your credentials to access your dashboard.'}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 22 }}>
        <ModeButton active={isCreator} icon={User} title="Creator" sub="Hub access" color="#FF9431" onClick={() => { setRole('creator'); if (setAuthError) setAuthError(''); }} />
        <ModeButton active={!isCreator} icon={Briefcase} title="Brand" sub="Brand console" color="#10B981" onClick={() => { setRole('brand'); if (setAuthError) setAuthError(''); }} />
      </div>

      {authError && (
        <div 
          className="shake"
          style={{
            background: 'rgba(239, 68, 68, 0.04)',
            border: '1.5px solid rgba(239, 68, 68, 0.15)',
            borderRadius: 14,
            padding: '12px 16px',
            marginBottom: 20,
            display: 'flex',
            gap: 10,
            alignItems: 'center'
          }}
        >
          <AlertCircle size={16} color="#EF4444" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: '#EF4444', fontWeight: 650 }}>{authError}</span>
        </div>
      )}

      {isMobileView ? (
        <form onSubmit={handleVerifyOtpAndLogin}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginBottom: 12 }}>
            <div style={{ flex: 1 }}>
              <Fld 
                label="Phone Number" 
                type="number" 
                name="phone" 
                icon={Phone} 
                placeholder="10-digit number" 
                value={phone} 
                onChange={e => {
                  const val = e.target.value.replace(/\D/g, '');
                  if (val.length <= 10) setPhone(val);
                }}
                disabled={otpSent}
                required 
              />
            </div>
            {!otpSent && (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={otpLoading || phone.length < 10}
                style={{
                  height: 52, padding: '0 16px', borderRadius: 14, border: 'none',
                  background: phone.length === 10 ? themeColor : '#E5E7EB',
                  color: phone.length === 10 ? '#fff' : '#9CA3AF',
                  fontWeight: 800, cursor: phone.length === 10 ? 'pointer' : 'not-allowed',
                  fontSize: 13, marginBottom: 18, transition: 'all .2s'
                }}
              >
                {otpLoading ? 'Sending...' : 'Send OTP'}
              </button>
            )}
          </div>

          {otpSent && (
            <>
              <Fld 
                label="Enter 4-digit OTP" 
                type="number" 
                name="otp" 
                placeholder="1234" 
                value={otp} 
                onChange={e => setOtp(e.target.value.substring(0, 4))}
                required 
              />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <span style={{ fontSize: 13, color: '#64748B', fontWeight: 650 }}>
                  OTP sent to +91 {phone}
                </span>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={timerActive || otpLoading}
                  style={{
                    border: 'none', background: 'transparent', 
                    color: timerActive ? '#94A3B8' : themeColor,
                    fontSize: 13, fontWeight: 900, cursor: timerActive ? 'not-allowed' : 'pointer'
                  }}
                >
                  {timerActive ? `Resend in ${timer}s` : 'Resend OTP'}
                </button>
              </div>

              <Btn full lg loading={otpLoading} style={{ height: 56, borderRadius: 16, background: '#111827', color: '#fff', border: 'none', fontWeight: 900 }}>
                Verify & Sign In <ArrowRight size={18} />
              </Btn>
            </>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
            {otpSent && (
              <button 
                type="button" 
                onClick={() => {
                  setOtpSent(false);
                  setOtp('');
                }}
                style={{ border: 'none', background: 'none', color: '#64748B', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}
              >
                Change Phone Number
              </button>
            )}
            <button 
              type="button"
              onClick={() => setIsMobileView(false)}
              style={{ border: 'none', background: 'none', color: themeColor, fontSize: 13, fontWeight: 950, cursor: 'pointer' }}
            >
              ← Back to Email Login
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={onLogin}>
          <Fld label="Email address" type="email" name="email" icon={Mail} placeholder="name@domain.com" required />
          <Fld label="Password" type="password" name="password" icon={Lock} placeholder="Password" required />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginTop: -2, marginBottom: 20, flexWrap: 'wrap' }}>
            <label htmlFor="remember-me" style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: '#64748B', fontWeight: 700, cursor: 'pointer' }}>
              <input 
                id="remember-me"
                name="remember_me"
                type="checkbox" 
                style={{ accentColor: themeColor, width: 16, height: 16 }} 
              /> Remember me
            </label>
            <button type="button" onClick={() => setView('forgot')} style={{ border: 'none', background: 'transparent', color: themeColor, fontSize: 13, fontWeight: 900, cursor: 'pointer' }}>
              Forgot password?
            </button>
          </div>

          <Btn full lg loading={loading} style={{ height: 56, borderRadius: 16, background: '#111827', color: '#fff', border: 'none', fontWeight: 900 }}>
            Sign in as {isCreator ? 'Creator' : 'Brand'} <ArrowRight size={18} />
          </Btn>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '24px 0' }}>
             <div style={{ flex: 1, height: 1, background: '#EEF2F7' }} />
             <span style={{ fontSize: 12, fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase' }}>Or continue with</span>
             <div style={{ flex: 1, height: 1, background: '#EEF2F7' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <button 
              type="button"
              disabled={googleLoading}
              onClick={onGoogle}
              style={{ 
                height: 52, borderRadius: 14, border: '1px solid #E5E7EB', background: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer',
                fontSize: 13, fontWeight: 800, color: '#1f2937', transition: 'all .2s'
              }}
            >
               {googleLoading ? (
                 <div className="loader-sm" />
               ) : (
                 <>
                   <svg width="18" height="18" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.83z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.83c.87-2.6 3.3-4.51 6.16-4.51z" fill="#EA4335"/>
                   </svg>
                   Google
                 </>
               )}
            </button>

            <button 
              type="button"
              onClick={() => setIsMobileView(true)}
              style={{ 
                height: 52, borderRadius: 14, border: '1px solid #E5E7EB', background: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer',
                fontSize: 13, fontWeight: 800, color: '#1f2937', transition: 'all .2s'
              }}
            >
               <Phone size={16} color="#111827" />
               Mobile
            </button>
          </div>
        </form>
      )}

      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <p style={{ fontSize: 14, color: '#64748B', fontWeight: 650 }}>
          Don't have an account?{' '}
          <button 
            type="button" 
            onClick={() => setView(isCreator ? 'register' : 'brand-register')} 
            style={{ border: 'none', background: 'none', color: themeColor, fontWeight: 900, cursor: 'pointer', padding: 0 }}
          >
            Sign up as {isCreator ? 'Creator' : 'Brand'}
          </button>
        </p>
      </div>
      <div style={{ marginTop: 12, textAlign: 'center', paddingBottom: 20 }}>
        <button 
          type="button"
          onClick={() => window.location.href = '/'}
          style={{ border: 'none', background: 'none', color: '#64748B', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}
        >
          ← Back to Homepage
        </button>
      </div>
    </motion.div>
  );
};

LoginView.propTypes = {
  role: PropTypes.string.isRequired,
  setRole: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onAuthSuccess: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  setView: PropTypes.func.isRequired,
  authError: PropTypes.string,
  setAuthError: PropTypes.func
};

export default LoginView;
