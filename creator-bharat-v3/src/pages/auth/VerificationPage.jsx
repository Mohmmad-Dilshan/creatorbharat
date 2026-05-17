import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '@/core/context';
import { Btn } from '@/components/common/Primitives';

export default function VerificationPage() {
  const navigate = useNavigate();
  const { dsp } = useApp();
  const [status, setStatus] = useState('pending'); // pending, success, error

  // Simulate verification for UI demo
  const handleVerify = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Email Verified Successfully!' } });
    }, 2000);
  };

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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          maxWidth: '480px', 
          width: '100%', 
          background: '#fff', 
          padding: '48px', 
          borderRadius: '40px', 
          border: '1.5px solid #f1f5f9',
          textAlign: 'center',
          boxShadow: '0 24px 64px rgba(0,0,0,0.03)'
        }}
      >
        <div style={{ 
          width: '80px', 
          height: '80px', 
          background: status === 'success' ? '#13880810' : '#FF943110', 
          borderRadius: '24px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 32px' 
        }}>
          {status === 'success' ? (
            <CheckCircle2 size={40} color="#138808" />
          ) : (
            <Mail size={40} color="#FF9431" />
          )}
        </div>

        <h1 style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', marginBottom: '16px' }}>
          {status === 'success' ? 'Elite Access Granted' : 'Check your Email'}
        </h1>
        
        <p style={{ fontSize: '16px', color: '#64748b', fontWeight: 500, lineHeight: 1.6, marginBottom: '32px' }}>
          {status === 'success' 
            ? 'Your email has been verified. You are now part of the CreatorBharat Elite ecosystem.' 
            : 'We sent a verification link to your email. Please click it to activate your account and unlock professional tools.'
          }
        </p>

        {status === 'pending' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Btn full lg onClick={handleVerify} style={{ background: '#0f172a', color: '#fff', borderRadius: '100px' }}>
              I've Clicked the Link <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </Btn>
            <button 
              style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
              onClick={() => dsp({ t: 'TOAST', d: { type: 'info', msg: 'Resending link...' } })}
            >
              Didn't receive it? Resend Link
            </button>
          </div>
        )}

        {status === 'success' && (
          <Btn full lg onClick={() => navigate('/login')} style={{ background: '#138808', color: '#fff', borderRadius: '100px' }}>
            Proceed to Login <ArrowRight size={18} style={{ marginLeft: '8px' }} />
          </Btn>
        )}

        <div style={{ 
          marginTop: '48px', 
          padding: '16px', 
          background: '#f8fafc', 
          borderRadius: '16px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          border: '1px solid #f1f5f9'
        }}>
          <ShieldCheck size={18} color="#94a3b8" />
          <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Secure Verification Protocol v3.1
          </span>
        </div>
      </motion.div>
    </div>
  );
}
