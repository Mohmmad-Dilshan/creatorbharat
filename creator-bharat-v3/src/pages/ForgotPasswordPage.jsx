import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { Btn, Fld } from '../components/Primitives';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: Email, 2: Success/Instruction
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', padding: '20px' }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
         <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '40%', height: '40%', background: 'rgba(255,148,49,0.03)', borderRadius: '50%', filter: 'blur(80px)' }} />
         <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '40%', height: '40%', background: 'rgba(18,136,7,0.03)', borderRadius: '50%', filter: 'blur(80px)' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%', maxWidth: 440, background: '#fff', padding: '48px', borderRadius: 32, boxShadow: '0 40px 100px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.03)', position: 'relative', zIndex: 10 }}
      >
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '24px', background: 'rgba(255,148,49,0.08)', color: '#FF9431', marginBottom: 24 }}>
                   <RefreshCw size={32} />
                </div>
                <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, fontWeight: 900, color: '#111', marginBottom: 12 }}>Recover Account</h1>
                <p style={{ color: '#64748b', fontWeight: 500, lineHeight: 1.6 }}>Enter your registered email address and we'll send you recovery instructions.</p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <Fld 
                    label="Registered Email" 
                    type="email" 
                    icon={Mail}
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="name@company.com" 
                    required 
                  />

                <Btn 
                  full lg 
                  loading={loading}
                  style={{ height: 60, borderRadius: 100, fontSize: 17, background: '#111', color: '#fff', border: 'none', fontWeight: 900, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                >
                  Send Reset Link <ArrowRight size={20} style={{ marginLeft: 8 }} />
                </Btn>
              </form>

              <div style={{ textAlign: 'center', marginTop: 32 }}>
                <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 800, color: '#FF9431', textDecoration: 'none' }}>
                  <ArrowLeft size={16} /> Back to Login
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '24px', background: 'rgba(16,185,129,0.08)', color: '#10B981', marginBottom: 24 }}>
                 <ShieldCheck size={48} />
              </div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 900, color: '#111', marginBottom: 16 }}>Instructions Sent</h2>
              <p style={{ color: '#64748b', fontWeight: 500, lineHeight: 1.6, marginBottom: 40 }}>
                We've sent a secure recovery link to <strong>{email}</strong>. Please check your inbox and spam folder.
              </p>

              <Btn 
                full lg 
                onClick={() => setStep(1)}
                style={{ height: 60, borderRadius: 100, fontSize: 16, background: '#f8fafc', color: '#111', border: '1px solid #e2e8f0', fontWeight: 800 }}
              >
                Resend Link
              </Btn>

              <div style={{ textAlign: 'center', marginTop: 24 }}>
                <Link to="/login" style={{ fontSize: 14, fontWeight: 900, color: '#FF9431', textDecoration: 'none' }}>
                   Return to Login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
