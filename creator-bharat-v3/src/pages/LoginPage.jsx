/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context';
import { Btn, Fld } from '../components/Primitives';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ChevronLeft, Sparkles, User, Briefcase, Globe } from 'lucide-react';

const LoginBranding = ({ role, themeColor }) => {
  const isCreator = role === 'creator';
  return (
    <div style={{ background: '#050505', padding: '80px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
        <motion.div 
          animate={{ x: isCreator ? [0, 40, 0] : [0, -40, 0], y: [0, -30, 0], scale: isCreator ? [1, 1.2, 1] : [1, 1.3, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', top: '-10%', left: '5%', width: '600px', height: '600px', background: `radial-gradient(circle, ${themeColor}30 0%, transparent 70%)`, filter: 'blur(100px)', transition: 'background 0.8s ease' }}
        />
        <motion.div 
          animate={{ x: isCreator ? [0, -40, 0] : [0, 40, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ position: 'absolute', bottom: '-15%', right: '5%', width: '500px', height: '500px', background: `radial-gradient(circle, ${isCreator ? '#10B98120' : '#FF943120'} 0%, transparent 70%)`, filter: 'blur(120px)', transition: 'background 0.8s ease' }}
        />
      </div>
      
      <div style={{ position: 'relative', zIndex: 2, marginBottom: 80 }}>
         <Link to="/" style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: 0, textDecoration: 'none' }}>
            <div style={{ width: 48, height: 48, background: '#fff', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
               <div style={{ width: 24, height: 24, background: `linear-gradient(135deg, ${themeColor}, #fff)`, borderRadius: 6 }} />
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: '#fff', fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.02em' }}>CreatorBharat</h1>
         </Link>
      </div>

      <div style={{ flex: 1, position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
           <div style={{ padding: '8px 16px', borderRadius: 100, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', color: themeColor, fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>
              Elite Access Portal
           </div>
        </div>
        <motion.h2 
          key={role}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: 64, color: '#fff', marginBottom: 24, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em' }}
        >
          Master Your <br/>
          <span style={{ color: themeColor, transition: 'color 0.8s' }}>{isCreator ? 'Influence.' : 'Campaigns.'}</span>
        </motion.h2>
        <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: 480, fontWeight: 500 }}>
           {isCreator 
             ? "Access high-ticket deals, track your engagement metrics, and join India's most authentic marketplace."
             : "Deploy data-driven campaigns, discover verified talent, and scale your brand awareness across Bharat."}
        </p>
      </div>

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 24 }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Globe size={16} color="rgba(255,255,255,0.3)" />
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 800, letterSpacing: '1px' }}>GLOBAL ECOSYSTEM</span>
         </div>
         <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
         <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 800, letterSpacing: '1px' }}>EST. 2024</span>
      </div>
    </div>
  );
};

export default function LoginPage() {
  const { dsp } = useApp();
  const navigate = useNavigate();
  const [F, setF] = useState({ email: '', password: '' });
  const [role, setRole] = useState('creator'); 
  const [loading, setLoading] = useState(false);
  const [mob, setMob] = useState(window.innerWidth < 768);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const isCreator = role === 'creator';
  const isBrand = role === 'brand';
  const themeColor = isCreator ? '#FF9431' : '#10B981';

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const mockUser = { 
        id: isCreator ? 'u1' : 'b1', 
        name: isCreator ? 'Aman Deep' : 'Brand Admin', 
        companyName: isBrand ? 'Nykaa' : null,
        email: F.email, 
        photo: null 
      };
      dsp({ t: 'LOGIN', u: mockUser, role: role });
      dsp({ t: 'TOAST', d: { type: 'success', msg: `Welcome back to CreatorBharat!` } });
      if (isCreator) navigate('/dashboard');
      else navigate('/brand-dashboard');
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', background: '#fff' }}>
      {!mob && <LoginBranding role={role} themeColor={themeColor} />}

      <div style={{ padding: mob ? '100px 24px' : '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', position: 'relative' }}>
        <button 
           onClick={() => navigate('/')}
           style={{ position: 'absolute', top: 40, left: 40, background: '#F8FAFC', border: '1px solid #f1f5f9', width: 44, height: 44, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b', transition: '0.2s' }}
           onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }}
           onMouseLeave={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.boxShadow = 'none'; }}
        >
           <ChevronLeft size={20} />
        </button>

        <div style={{ width: '100%', maxWidth: 440 }}>
          <div style={{ marginBottom: 48 }}>
             <div style={{ width: 56, height: 56, background: `${themeColor}15`, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', color: themeColor, marginBottom: 24, transition: 'all 0.6s' }}>
                {isCreator ? <User size={28} /> : <Briefcase size={28} />}
             </div>
             <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 40, fontWeight: 900, color: '#111', marginBottom: 12, lineHeight: 1, letterSpacing: '-0.02em' }}>Welcome Back</h2>
             <p style={{ color: '#64748b', fontSize: 16, fontWeight: 600 }}>Elite portal access for {isCreator ? 'Creators' : 'Brands'}</p>
          </div>

          <div style={{ display: 'flex', background: '#f8fafc', padding: '6px', borderRadius: '20px', marginBottom: 40, border: '1px solid #f1f5f9', position: 'relative' }}>
            <motion.div 
              layoutId="roleActiveDesktop"
              style={{ position: 'absolute', top: 6, bottom: 6, left: isCreator ? 6 : 'calc(50% + 3px)', width: 'calc(50% - 9px)', background: '#fff', borderRadius: '14px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', zIndex: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            <button onClick={() => setRole('creator')} style={{ flex: 1, padding: '16px', borderRadius: '14px', border: 'none', fontSize: 13, fontWeight: 900, position: 'relative', zIndex: 1, background: 'transparent', color: isCreator ? '#FF9431' : '#94a3b8', cursor: 'pointer', transition: 'all 0.3s', textTransform: 'uppercase', letterSpacing: '1px' }}>CREATOR PORTAL</button>
            <button onClick={() => setRole('brand')} style={{ flex: 1, padding: '16px', borderRadius: '14px', border: 'none', fontSize: 13, fontWeight: 900, position: 'relative', zIndex: 1, background: 'transparent', color: isBrand ? '#10B981' : '#94a3b8', cursor: 'pointer', transition: 'all 0.3s', textTransform: 'uppercase', letterSpacing: '1px' }}>BRAND CONSOLE</button>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Fld label="Login Email" icon={Mail} value={F.email} onChange={e => setF({...F, email: e.target.value})} placeholder="name@company.com" required />
            <Fld label="Secret Password" type="password" icon={Lock} value={F.password} onChange={e => setF({...F, password: e.target.value})} placeholder="••••••••" required />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: -8 }}>
               <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#64748b', cursor: 'pointer', fontWeight: 600 }}>
                  <input type="checkbox" style={{ accentColor: themeColor, width: 18, height: 18 }} /> Remember secure login
               </label>
               <Link to="/forgot-password" style={{ fontSize: 14, fontWeight: 800, color: themeColor, textDecoration: 'none' }}>Lost Password?</Link>
            </div>

            <Btn full lg loading={loading} style={{ height: 64, borderRadius: 100, fontSize: 18, background: themeColor, color: '#fff', border: 'none', fontWeight: 900, boxShadow: `0 12px 40px ${themeColor}35`, marginTop: 12, transition: 'all 0.6s' }}>
              Sign In to Portal <ArrowRight size={20} style={{ marginLeft: 12 }} />
            </Btn>
          </form>

          <div style={{ marginTop: 48, textAlign: 'center' }}>
             <p style={{ fontSize: 15, color: '#64748b', fontWeight: 600, marginBottom: 24 }}>Or sign in with elite credentials</p>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                <button style={{ height: 60, borderRadius: 20, border: '1.5px solid #f1f5f9', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontSize: 14, fontWeight: 900, color: '#111', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.borderColor = themeColor} onMouseLeave={e => e.currentTarget.style.borderColor = '#f1f5f9'}>
                   <Sparkles size={20} color={themeColor} /> Google
                </button>
                <button style={{ height: 60, borderRadius: 20, border: '1.5px solid #f1f5f9', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontSize: 14, fontWeight: 900, color: '#111', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.borderColor = themeColor} onMouseLeave={e => e.currentTarget.style.borderColor = '#f1f5f9'}>
                   <Globe size={20} color={themeColor} /> Instagram
                </button>
             </div>
          </div>

          <p style={{ textAlign: 'center', marginTop: 48, fontSize: 15, color: '#64748b', fontWeight: 600 }}>
             New member of the ecosystem? <br/>
             <Link to={isCreator ? "/apply" : "/brand-register"} style={{ color: themeColor, fontWeight: 900, textDecoration: 'none', display: 'inline-block', marginTop: 8, borderBottom: `2px solid ${themeColor}` }}>
               {isCreator ? 'Create Creator Identity' : 'Register Enterprise Account'}
             </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
