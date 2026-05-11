import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Briefcase, ArrowRight, Phone } from 'lucide-react';
import { Btn, Fld } from '@/components/common/Primitives';
import { useApp } from '@/core/context';
import { ModeButton } from '../AuthShared.jsx';
import MobileLoginView from './MobileLoginView.jsx';

const LoginView = ({ role, setRole, onLogin, loading, setView }) => {
  const { dsp } = useApp();
  const [method, setMethod] = useState('email'); // 'email' or 'mobile'
  const [googleLoading, setGoogleLoading] = useState(false);
  const isCreator = role === 'creator';
  const themeColor = isCreator ? '#FF9431' : '#10B981';

  const onGoogle = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      setGoogleLoading(false);
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Logged in with Google' } });
      onLogin({ preventDefault: () => {} }); // Trigger parent success
    }, 1500);
  };

  if (method === 'mobile') return <MobileLoginView themeColor={themeColor} onBack={() => setMethod('email')} onSuccess={() => onLogin({ preventDefault: () => {} })} />;

  return (
    <motion.div key="login" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <div style={{ marginBottom: 32, position: 'relative' }}>
        <button 
          onClick={() => setView('gateway')}
          style={{ position: 'absolute', top: 0, right: 0, border: 'none', background: 'rgba(0,0,0,0.04)', padding: '6px 12px', borderRadius: 10, fontSize: 11, fontWeight: 800, cursor: 'pointer', color: '#64748B' }}
        >
          ← BACK
        </button>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 950, color: '#111827', marginBottom: 6, letterSpacing: '-0.5px' }}>Welcome back!</h2>
        <p style={{ color: '#64748B', fontSize: 14, fontWeight: 650 }}>Enter your credentials to access your dashboard.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 22 }}>
        <ModeButton active={isCreator} icon={User} title="Creator" sub="Hub access" color="#FF9431" onClick={() => setRole('creator')} />
        <ModeButton active={!isCreator} icon={Briefcase} title="Brand" sub="Brand console" color="#10B981" onClick={() => setRole('brand')} />
      </div>

      <form onSubmit={onLogin}>
        <Fld label="Email address" type="email" icon={Mail} placeholder="name@domain.com" required />
        <Fld label="Password" type="password" icon={Lock} placeholder="Password" required />

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
            onClick={() => setMethod('mobile')}
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
      </form>
    </motion.div>
  );
};

LoginView.propTypes = {
  role: PropTypes.string.isRequired,
  setRole: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  setView: PropTypes.func.isRequired
};

export default LoginView;
