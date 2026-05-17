import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '@/core/context';
import { Btn, Fld } from '@/components/common/Primitives';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { dsp } = useApp();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Password updated successfully!' } });
      navigate('/login');
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
          <div style={{ position: 'relative' }}>
            <Fld 
              label="New Password" 
              type={show ? "text" : "password"} 
              placeholder="••••••••" 
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
            placeholder="••••••••" 
            required
          />

          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', marginBottom: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>Security Strength</div>
            <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ width: '70%', height: '100%', background: '#138808' }} />
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
