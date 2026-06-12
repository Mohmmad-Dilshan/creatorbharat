import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ShieldCheck, ArrowRight, AlertTriangle } from 'lucide-react';
import { useApp } from '@/core/context';
import { Btn, Fld } from '@/components/common/Primitives';
import { resetPassword } from '@/utils/authService';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { dsp } = useApp();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const token = new URLSearchParams(globalThis.location.search).get('token');

  const handleReset = async (e) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const errs = {};
    if (!password || password.length < 8) {
      errs.password = 'Password must be at least 8 characters long.';
    }
    if (password !== confirmPassword) {
      errs.confirm = 'Passwords do not match.';
    }

    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, password);
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Password updated successfully! Please sign in.' } });
      navigate('/login');
    } catch (err) {
      if (err.status === 400) {
        setError('This password reset link is invalid or has expired.');
      } else {
        setError(err.message || 'Failed to reset password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: '#fcfcfc',
        padding: '24px'
      }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ 
            maxWidth: '480px', 
            width: '100%', 
            background: '#fff', 
            padding: '48px', 
            borderRadius: '40px', 
            border: '1.5px solid #f1f5f9',
            boxShadow: '0 24px 64px rgba(0,0,0,0.03)',
            textAlign: 'center'
          }}
        >
          <div style={{ 
            width: '64px', 
            height: '64px', 
            background: '#FEF2F2', 
            color: '#EF4444',
            borderRadius: '20px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 24px' 
          }}>
            <AlertTriangle size={32} />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a', marginBottom: '12px' }}>Invalid Reset Link</h1>
          <p style={{ fontSize: '15px', color: '#64748b', fontWeight: 500, marginBottom: '32px', lineHeight: 1.6 }}>
            This password reset link is invalid or has expired. Please request a new link.
          </p>
          <Btn full lg onClick={() => navigate('/forgot-password')} style={{ background: '#0f172a', color: '#fff', borderRadius: '100px' }}>
            Request New Link
          </Btn>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: '#fcfcfc',
      padding: '24px'
    }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ 
          maxWidth: '480px', 
          width: '100%', 
          background: '#fff', 
          padding: '48px', 
          borderRadius: '40px', 
          border: '1.5px solid #f1f5f9',
          boxShadow: '0 24px 64px rgba(0,0,0,0.03)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            background: '#0f172a', 
            borderRadius: '20px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 24px' 
          }}>
            <Lock size={32} color="#fff" />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', marginBottom: '12px' }}>Reset Password</h1>
          <p style={{ fontSize: '15px', color: '#64748b', fontWeight: 500 }}>Choose a strong password to protect your elite account.</p>
        </div>

        <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {error && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8, 
              color: '#EF4444', 
              fontSize: 13, 
              fontWeight: 700, 
              background: '#FEF2F2', 
              padding: '12px 16px', 
              borderRadius: '12px', 
              border: '1px solid #FECACA' 
            }}>
              <span>⚠️</span> {error}
            </div>
          )}

          <div style={{ position: 'relative' }}>
            <Fld 
              label="New Password" 
              type={show ? "text" : "password"} 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldErrors(prev => ({ ...prev, password: null }));
              }}
              placeholder="••••••••" 
              error={fieldErrors.password}
              required
            />
            <button 
              type="button"
              onClick={() => setShow(!show)}
              style={{ position: 'absolute', right: '16px', bottom: '12px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Fld 
            label="Confirm New Password" 
            type="password" 
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setFieldErrors(prev => ({ ...prev, confirm: null }));
            }}
            placeholder="••••••••" 
            error={fieldErrors.confirm}
            required
          />

          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', marginBottom: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>Security Strength</div>
            <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ width: password.length >= 8 ? '100%' : `${password.length * 10}%`, height: '100%', background: password.length >= 8 ? '#10B981' : '#F59E0B' }} />
            </div>
          </div>

          <Btn full lg loading={loading} style={{ background: '#0f172a', color: '#fff', borderRadius: '100px' }}>
            Update Password <ArrowRight size={18} style={{ marginLeft: '8px' }} />
          </Btn>
        </form>

        <div style={{ 
          marginTop: '40px', 
          textAlign: 'center',
          padding: '16px', 
          borderTop: '1.5px solid #f1f5f9'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <ShieldCheck size={16} color="#10B981" />
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 700 }}>Encryption Standard: AES-256</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
