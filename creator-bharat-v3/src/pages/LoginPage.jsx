/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context';
import { T } from '../theme';
import { Btn, Fld } from '../components/Primitives';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight } from 'lucide-react';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const GoogleIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function LoginPage() {
  const { dsp } = useApp();
  const navigate = useNavigate();
  const [F, setF] = useState({ email: '', password: '' });
  const [role, setRole] = useState('creator'); // 'creator' or 'brand'
  const [loading, setLoading] = useState(false);
  const [mob, setMob] = useState(globalThis.innerWidth < 768);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    
    // Simulate Login Logic
    setTimeout(() => {
      const mockUser = { 
        id: role === 'creator' ? 'u1' : 'b1', 
        name: role === 'creator' ? 'Aman Deep' : 'Brand Admin', 
        companyName: role === 'brand' ? 'Nykaa' : null,
        email: F.email, 
        photo: null 
      };
      
      dsp({ t: 'LOGIN', u: mockUser, role: role });
      dsp({ t: 'TOAST', d: { type: 'success', msg: `Welcome back to CreatorBharat!` } });
      
      if (role === 'creator') navigate('/dashboard');
      else navigate('/brand-dashboard');
      
      setLoading(false);
    }, 1200);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.1fr 0.9fr', background: '#fff' }}>
      
      {/* Left Side: Visual/Branding (Desktop Only) */}
      {!mob && (
        <div style={{ background: '#050505', padding: '60px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          {/* Animated Background */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 100% 0%, rgba(255,148,49,0.1), transparent 70%)' }} />
          <div style={{ position: 'absolute', bottom: -50, left: -50, width: 300, height: 300, background: 'rgba(18,136,7,0.05)', filter: 'blur(100px)', borderRadius: '50%' }} />
          
          <div style={{ position: 'relative', zIndex: 2, marginBottom: 80 }}>
             <Link to="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
               <h1 style={{ fontSize: 28, fontWeight: 900, color: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 44, height: 44, background: T.gd, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>CB</span>{' '}
                  CreatorBharat
               </h1>
             </Link>
          </div>

          <div style={{ flex: 1, position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: 56, color: '#fff', marginBottom: 24, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em' }}
            >
              Gateway to <br/>
              <span style={{ background: 'linear-gradient(90deg, #FF9431, #fff, #128807)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Bharat's Influence.</span>
            </motion.h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: 480 }}>
              Access India's most authentic creator network. Log in to manage your campaigns or your digital identity.
            </p>
          </div>

          <div style={{ position: 'relative', zIndex: 2 }}>
             <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>© 2026 CreatorBharat. Built with ❤️ in Bhilwara.</p>
          </div>
        </div>
      )}

      {/* Right Side: Login Form */}
      <div style={{ padding: mob ? '80px 24px' : '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ display: 'inline-flex', padding: '14px', borderRadius: '24px', background: 'rgba(255,148,49,0.08)', color: '#FF9431', marginBottom: 24 }}>
               <Lock size={32} />
            </div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, fontWeight: 900, color: '#111', marginBottom: 8 }}>Welcome Back</h2>
            <p style={{ color: T.t3, fontWeight: 600 }}>Login to access your mission control</p>
          </div>

          {/* Role Toggle */}
          <div style={{ display: 'flex', background: '#f8fafc', padding: '6px', borderRadius: '20px', marginBottom: 32, border: '1px solid #f1f5f9' }}>
            <button 
              onClick={() => setRole('creator')}
              style={{ 
                flex: 1, padding: '14px', borderRadius: '16px', border: 'none', fontSize: 14, fontWeight: 800,
                background: role === 'creator' ? '#fff' : 'transparent',
                color: role === 'creator' ? '#FF9431' : T.t3,
                boxShadow: role === 'creator' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                cursor: 'pointer', transition: 'all 0.3s'
              }}
            >
              I'm a Creator
            </button>
            <button 
              onClick={() => setRole('brand')}
              style={{ 
                flex: 1, padding: '14px', borderRadius: '16px', border: 'none', fontSize: 14, fontWeight: 800,
                background: role === 'brand' ? '#fff' : 'transparent',
                color: role === 'brand' ? '#128807' : T.t3,
                boxShadow: role === 'brand' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                cursor: 'pointer', transition: 'all 0.3s'
              }}
            >
              I'm a Brand
            </button>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ position: 'relative' }}>
               <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: 16, top: 46 }} />
               <Fld 
                 label="Email Address" 
                 value={F.email} 
                 onChange={e => setF({...F, email: e.target.value})} 
                 placeholder="aman@creator.com" 
                 style={{ paddingLeft: 48 }}
                 required 
               />
            </div>
            <div style={{ position: 'relative' }}>
               <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: 16, top: 46 }} />
               <Fld 
                 label="Password" 
                 type="password" 
                 value={F.password} 
                 onChange={e => setF({...F, password: e.target.value})} 
                 placeholder="••••••••" 
                 style={{ paddingLeft: 48 }}
                 required 
               />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: -8 }}>
               <Link to="/forgot-password" style={{ fontSize: 13, fontWeight: 700, color: '#FF9431', textDecoration: 'none' }}>Forgot Password?</Link>
            </div>

            <Btn 
              full lg 
              loading={loading}
              style={{ height: 60, borderRadius: 100, fontSize: 17, background: '#111', color: '#fff', border: 'none', fontWeight: 900, boxShadow: '0 10px 30px rgba(0,0,0,0.1)', marginTop: 12 }}
            >
              Login to Dashboard <ArrowRight size={20} style={{ marginLeft: 8 }} />
            </Btn>
          </form>

          {/* Social Login Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '32px 0' }}>
             <div style={{ flex: 1, height: 1, background: '#f1f5f9' }} />
             <span style={{ fontSize: 12, fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '1px' }}>Or Continue With</span>
             <div style={{ flex: 1, height: 1, background: '#f1f5f9' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
             <button style={{ height: 54, borderRadius: 16, border: '1.5px solid #f1f5f9', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 13, fontWeight: 800, color: '#111', cursor: 'pointer' }}>
                <GoogleIcon size={18} /> Google
             </button>
             <button style={{ height: 54, borderRadius: 16, border: '1.5px solid #f1f5f9', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 13, fontWeight: 800, color: '#111', cursor: 'pointer' }}>
                <InstagramIcon size={18} /> Instagram
             </button>
             <button style={{ height: 54, borderRadius: 16, border: '1.5px solid #f1f5f9', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 13, fontWeight: 800, color: '#111', cursor: 'pointer' }}>
                <GithubIcon size={18} /> Github
             </button>
          </div>

          <p style={{ textAlign: 'center', marginTop: 40, fontSize: 14, color: T.t3, fontWeight: 600 }}>
             New to CreatorBharat? <br/>
             {role === 'creator' ? (
               <Link to="/apply" style={{ color: '#FF9431', fontWeight: 900, textDecoration: 'none' }}>Create Creator Identity</Link>
             ) : (
               <Link to="/brand-register" style={{ color: '#128807', fontWeight: 900, textDecoration: 'none' }}>Register as Brand</Link>
             )}
          </p>
        </div>
      </div>
    </div>
  );
}
