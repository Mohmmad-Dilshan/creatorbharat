import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Btn, Fld } from '@/components/common/Primitives';

const ForgotView = ({ setView }) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setTimer(30);
      setLoading(false);
    }, 1500);
  };

  if (sent) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        style={{ textAlign: 'center', padding: '20px 0' }}
      >
        <div style={{ 
          width: 64, height: 64, borderRadius: 20, background: 'rgba(16,185,129,0.1)', 
          color: '#10B981', display: 'grid', placeItems: 'center', margin: '0 auto 24px' 
        }}>
          <CheckCircle2 size={32} />
        </div>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 26, fontWeight: 950, color: '#111827', marginBottom: 12 }}>Check your email</h2>
        <p style={{ color: '#64748B', fontSize: 15, fontWeight: 650, lineHeight: 1.6, marginBottom: 32 }}>
          We've sent a password reset link to <br/>
          <strong style={{ color: '#111827' }}>{email}</strong>
        </p>
        <Btn full lg onClick={() => setView('login')} style={{ height: 56, borderRadius: 16, background: '#111827', color: '#fff', border: 'none', fontWeight: 950, marginBottom: 12 }}>
          Back to Login
        </Btn>
        <button 
          onClick={handleSubmit}
          disabled={timer > 0 || loading}
          style={{ border: 'none', background: 'none', color: '#64748B', fontSize: 13, fontWeight: 800, cursor: timer > 0 ? 'not-allowed' : 'pointer' }}
        >
          {timer > 0 ? `Resend link in ${timer}s` : "Didn't receive? Resend"}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <div style={{ marginBottom: 32, position: 'relative' }}>
        <button 
          onClick={() => setView('login')}
          style={{ position: 'absolute', top: 0, right: 0, border: 'none', background: 'rgba(0,0,0,0.04)', padding: '6px 12px', borderRadius: 10, fontSize: 11, fontWeight: 800, cursor: 'pointer', color: '#64748B' }}
        >
          ← BACK
        </button>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 950, color: '#111827', marginBottom: 6, letterSpacing: '-0.5px' }}>Forgot Password?</h2>
        <p style={{ color: '#64748B', fontSize: 14, fontWeight: 650 }}>Enter your email to receive a reset link.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Fld 
          label="Email address" 
          type="email" 
          icon={Mail} 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@domain.com" 
          required 
        />

        <Btn full lg loading={loading} style={{ height: 56, borderRadius: 16, background: '#111827', color: '#fff', border: 'none', fontWeight: 900, marginTop: 12 }}>
          Send Reset Link <ArrowRight size={18} />
        </Btn>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: '#64748B', fontWeight: 650 }}>
            Remember your password?{' '}
            <button 
              type="button" 
              onClick={() => setView('login')} 
              style={{ border: 'none', background: 'none', color: '#111827', fontWeight: 950, cursor: 'pointer', padding: 0 }}
            >
              Sign in
            </button>
          </p>
        </div>
      </form>
    </motion.div>
  );
};

ForgotView.propTypes = {
  setView: PropTypes.func.isRequired
};

export default ForgotView;
