import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context';
import { Modal, Btn, Fld } from '../Primitives';
import { User, Briefcase, X, ArrowRight, Sparkles, ChevronLeft, Mail, Lock, ShieldCheck, CheckCircle, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ApplyForm from '../apply/ApplyForm';

const GatewayView = ({ onCreator, onBrand, onLogin, themeColor }) => (
  <motion.div 
    key="gateway"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <p style={{ fontSize: 15, color: '#64748b', marginBottom: 40, fontWeight: 500, lineHeight: 1.6 }}>Step into the most elite creator ecosystem in Bharat. Select your portal to begin.</p>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}>
       <motion.button 
         whileHover={{ y: -4, scale: 1.02 }}
         whileTap={{ scale: 0.98 }}
         onClick={onCreator}
         style={{ 
           padding: '28px', borderRadius: 24, border: '1.5px solid rgba(255,148,49,0.15)', 
           background: 'rgba(255,148,49,0.03)', textAlign: 'left', cursor: 'pointer', transition: 'border-color 0.3s',
           display: 'flex', alignItems: 'center', gap: 24, position: 'relative', overflow: 'hidden'
         }}
         onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF9431'; }}
         onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,148,49,0.15)'; }}
       >
          <div style={{ width: 60, height: 60, borderRadius: 18, background: '#FF9431', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 24px rgba(255,148,49,0.35)' }}>
             <User size={28} />
          </div>
          <div style={{ flex: 1 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <p style={{ fontSize: 11, fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Join as Creator</p>
                <div style={{ padding: '2px 8px', borderRadius: 100, background: 'rgba(255,148,49,0.1)', color: '#FF9431', fontSize: 10, fontWeight: 900 }}>HOT</div>
             </div>
             <h4 style={{ fontSize: 20, fontWeight: 900, color: '#111', fontFamily: "'Outfit', sans-serif" }}>Creator Marketplace</h4>
             <p style={{ fontSize: 13, color: '#64748b', fontWeight: 500, marginTop: 4 }}>Build your portfolio & get deals.</p>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
             <ArrowRight size={20} color="#FF9431" />
          </div>
       </motion.button>

       <motion.button 
         whileHover={{ y: -4, scale: 1.02 }}
         whileTap={{ scale: 0.98 }}
         onClick={onBrand}
         style={{ 
           padding: '28px', borderRadius: 24, border: '1.5px solid rgba(16,185,129,0.15)', 
           background: 'rgba(16,185,129,0.03)', textAlign: 'left', cursor: 'pointer', transition: 'border-color 0.3s',
           display: 'flex', alignItems: 'center', gap: 24, position: 'relative', overflow: 'hidden'
         }}
         onMouseEnter={e => { e.currentTarget.style.borderColor = '#10B981'; }}
         onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(16,185,129,0.15)'; }}
       >
          <div style={{ width: 60, height: 60, borderRadius: 18, background: '#10B981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 24px rgba(16,185,129,0.35)' }}>
             <Briefcase size={28} />
          </div>
          <div style={{ flex: 1 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <p style={{ fontSize: 11, fontWeight: 900, color: '#10B981', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Join as Brand</p>
                <div style={{ padding: '2px 8px', borderRadius: 100, background: 'rgba(16,185,129,0.1)', color: '#10B981', fontSize: 10, fontWeight: 900 }}>ENTERPRISE</div>
             </div>
             <h4 style={{ fontSize: 20, fontWeight: 900, color: '#111', fontFamily: "'Outfit', sans-serif" }}>Enterprise Console</h4>
             <p style={{ fontSize: 13, color: '#64748b', fontWeight: 500, marginTop: 4 }}>Discover & hire verified talent.</p>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
             <ArrowRight size={20} color="#10B981" />
          </div>
       </motion.button>
    </div>

    <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid #F1F5F9', textAlign: 'center' }}>
       <p style={{ fontSize: 15, color: '#64748b', fontWeight: 600 }}>
         Already have an elite account? {' '}
         <button onClick={onLogin} style={{ background: 'none', border: 'none', color: themeColor, fontWeight: 900, cursor: 'pointer', padding: 0, borderBottom: `2px solid ${themeColor}`, marginLeft: 4 }}>Login Now</button>
       </p>
       
       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 32, opacity: 0.6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#64748b' }}>
             <ShieldCheck size={14} /> Secured by CB-Auth
          </div>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#CBD5E1' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#64748b' }}>
             <CheckCircle size={14} /> 10k+ Verified Members
          </div>
       </div>
    </div>
  </motion.div>
);

GatewayView.propTypes = {
  onCreator: PropTypes.func.isRequired,
  onBrand: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  themeColor: PropTypes.string.isRequired
};

const LoginView = ({ role, setRole, onLogin, onRegister, onForgot, loading, themeColor }) => {
  const isCreator = role === 'creator';
  const isBrand = role === 'brand';
  return (
    <motion.div 
      key="login"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div style={{ display: 'flex', background: '#f8fafc', padding: '6px', borderRadius: '20px', marginBottom: 32, border: '1px solid #f1f5f9', position: 'relative' }}>
        <motion.div 
          layoutId="roleActive"
          style={{ 
            position: 'absolute', top: 6, bottom: 6, 
            left: isCreator ? 6 : 'calc(50% + 3px)', width: 'calc(50% - 9px)',
            background: '#fff', borderRadius: '14px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', zIndex: 0
          }}
        />
        <button onClick={() => setRole('creator')} style={{ flex: 1, padding: '14px', borderRadius: '14px', border: 'none', fontSize: 12, fontWeight: 900, position: 'relative', zIndex: 1, background: 'transparent', color: isCreator ? '#FF9431' : '#94a3b8', cursor: 'pointer', transition: 'all 0.3s', textTransform: 'uppercase', letterSpacing: '1px' }}>CREATOR</button>
        <button onClick={() => setRole('brand')} style={{ flex: 1, padding: '14px', borderRadius: '14px', border: 'none', fontSize: 12, fontWeight: 900, position: 'relative', zIndex: 1, background: 'transparent', color: isBrand ? '#10B981' : '#94a3b8', cursor: 'pointer', transition: 'all 0.3s', textTransform: 'uppercase', letterSpacing: '1px' }}>BRAND</button>
      </div>

      <form onSubmit={onLogin} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
         <Fld label="Account Email" type="email" icon={Mail} placeholder="name@company.com" required />
         <Fld label="Secure Password" type="password" icon={Lock} placeholder="••••••••" required />
         
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: -8 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#64748b', cursor: 'pointer', fontWeight: 600 }}>
               <input type="checkbox" style={{ accentColor: themeColor, width: 18, height: 18 }} /> Remember secure login
            </label>
            <button type="button" onClick={onForgot} style={{ background: 'none', border: 'none', color: themeColor, fontSize: 14, fontWeight: 800, cursor: 'pointer' }}>Forgot?</button>
         </div>

         <Btn full lg loading={loading} style={{ height: 64, borderRadius: 100, background: themeColor, color: '#fff', border: 'none', fontWeight: 900, boxShadow: `0 12px 32px ${themeColor}35`, fontSize: 17 }}>
            Sign In to {isCreator ? 'Creator Portal' : 'Brand Console'}
         </Btn>
      </form>

      <div style={{ margin: '32px 0', display: 'flex', alignItems: 'center', gap: 16 }}>
         <div style={{ flex: 1, height: 1, background: '#f1f5f9' }} />
         <span style={{ fontSize: 12, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Or continue with</span>
         <div style={{ flex: 1, height: 1, background: '#f1f5f9' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
         <button style={{ padding: '14px', borderRadius: 16, border: '1.5px solid #f1f5f9', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', transition: '0.3s' }} onMouseEnter={e => e.currentTarget.style.borderColor = '#e2e8f0'}>
            <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#111' }}>Google</span>
         </button>
         <button style={{ padding: '14px', borderRadius: 16, border: '1.5px solid #f1f5f9', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', transition: '0.3s' }} onMouseEnter={e => e.currentTarget.style.borderColor = '#e2e8f0'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#E4405F' }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#111' }}>Instagram</span>
         </button>
      </div>

      <div style={{ marginTop: 40, textAlign: 'center' }}>
         <button onClick={onRegister} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            New to the ecosystem? <span style={{ color: themeColor, fontWeight: 900, borderBottom: `2px solid ${themeColor}` }}>Join Now</span>
         </button>
      </div>
    </motion.div>
  );
};

LoginView.propTypes = {
  role: PropTypes.string.isRequired,
  setRole: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  onForgot: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  themeColor: PropTypes.string.isRequired
};

const ModalBackgroundBlobs = ({ isCreator, themeColor }) => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
    <motion.div 
      animate={{ x: isCreator ? [0, 50, 0] : [0, -50, 0], y: [0, -40, 0], scale: [1, 1.4, 1] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: 'absolute', top: '-40%', right: '-30%', width: '500px', height: '500px', background: `radial-gradient(circle, ${themeColor}30 0%, transparent 70%)`, filter: 'blur(90px)', transition: 'background 0.8s ease' }}
    />
    <motion.div 
      animate={{ x: isCreator ? [0, -40, 0] : [0, 40, 0], y: [0, 60, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      style={{ position: 'absolute', bottom: '-30%', left: '-20%', width: '450px', height: '450px', background: `radial-gradient(circle, ${isCreator ? '#10B98120' : '#FF943120'} 0%, transparent 70%)`, filter: 'blur(100px)' }}
    />
  </div>
);

const ModalHeader = ({ view, isCreator, themeColor, HeaderIcon, RoleLabel, setView, onClose }) => {
  const isGateway = view === 'gateway';
  
  let mainTitle = 'Join Ecosystem';
  if (view === 'login') mainTitle = 'Welcome Back';
  if (view === 'register') mainTitle = 'Start Journey';

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: view === 'register' ? 32 : 44 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {!isGateway && (
          <button onClick={() => setView('gateway')} style={{ background: '#F8FAFC', border: '1px solid #f1f5f9', width: 48, height: 48, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b', transition: '0.3s' }} onMouseEnter={e => e.currentTarget.style.background = '#fff'}>
            <ChevronLeft size={24} />
          </button>
        )}
        <div style={{ width: 52, height: 52, background: themeColor, borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'background 0.8s ease', boxShadow: `0 12px 24px ${themeColor}40` }}>
          <HeaderIcon size={26} />
        </div>
        <div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 900, color: '#111', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            {mainTitle}
          </h2>
          <p style={{ fontSize: 13, color: themeColor, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: 4, transition: 'color 0.8s ease' }}>
            {RoleLabel}
          </p>
        </div>
      </div>
      <button onClick={onClose} style={{ background: '#F8FAFC', border: '1px solid #f1f5f9', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b', transition: '0.3s' }} onMouseEnter={e => { e.currentTarget.style.color = '#111'; e.currentTarget.style.borderColor = '#e2e8f0'; }}>
        <X size={20} />
      </button>
    </div>
  );
};

export default function AuthModal() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [view, setView] = useState(st.ui.authView || 'gateway'); 
  const [role, setRole] = useState('creator'); 
  const [loading, setLoading] = useState(false);

  // Sync internal view with global authView if modal just opened
  React.useEffect(() => {
    if (st.ui.authModal && st.ui.authView) {
      setView(st.ui.authView);
    }
  }, [st.ui.authModal, st.ui.authView]);

  const isCreator = role === 'creator';
  const themeColor = isCreator ? '#FF9431' : '#10B981';

  let HeaderIcon = Sparkles;
  if (view === 'login') HeaderIcon = isCreator ? User : Briefcase;
  else if (view === 'register') HeaderIcon = Star;

  const onClose = () => dsp({ t: 'UI', v: { authModal: false, authView: 'gateway' } });

  const go = (p) => {
    onClose();
    navigate(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
       dsp({ t: 'LOGIN', u: { name: isCreator ? 'Aman' : 'Enterprise', id: '1' }, role });
       onClose();
       setLoading(false);
    }, 1500);
  };

  const handleRegisterSuccess = (user) => {
     dsp({ t: 'LOGIN', u: user, role: 'creator' });
     onClose();
     navigate('/dashboard');
  };

  let RoleLabel = "India's Elite Network";
  if (view === 'login') RoleLabel = isCreator ? 'Creator Access' : 'Brand Console';
  else if (view === 'register') RoleLabel = 'Creator Onboarding';

  return (
    <Modal 
      open={true} 
      onClose={onClose} 
      hideHeader 
      width={view === 'register' ? 600 : 540}
      style={{ 
        padding: 0, 
        overflow: 'hidden', 
        borderRadius: 40,
        background: '#fff',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: '0 40px 120px rgba(0,0,0,0.3)'
      }}
    >
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <ModalBackgroundBlobs isCreator={isCreator} themeColor={themeColor} />

        <div style={{ padding: view === 'register' ? '48px 40px' : '56px 48px 48px', position: 'relative', zIndex: 1 }}>
          <ModalHeader 
            view={view} 
            isCreator={isCreator} 
            themeColor={themeColor} 
            HeaderIcon={HeaderIcon} 
            RoleLabel={RoleLabel} 
            setView={setView} 
            onClose={onClose} 
          />

          <AnimatePresence mode="wait">
            {view === 'gateway' && (
              <GatewayView 
                onCreator={() => setView('register')} 
                onBrand={() => go('/brand-register')} 
                onLogin={() => setView('login')} 
                themeColor={themeColor} 
              />
            )}
            {view === 'login' && (
              <LoginView 
                role={role} 
                setRole={setRole} 
                onLogin={handleLogin} 
                onRegister={() => setView('register')} 
                onForgot={() => go('/forgot-password')} 
                loading={loading} 
                themeColor={themeColor} 
              />
            )}
            {view === 'register' && (
              <ApplyForm 
                onSuccess={handleRegisterSuccess}
                onBackToLogin={() => setView('login')}
              />
            )}
          </AnimatePresence>

          <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: 0.5 }}>
             <ShieldCheck size={14} color="#64748b" />
             <span style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>256-bit AES Secure Encryption</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

ModalBackgroundBlobs.propTypes = {
  isCreator: PropTypes.bool.isRequired,
  themeColor: PropTypes.string.isRequired
};

ModalHeader.propTypes = {
  view: PropTypes.string.isRequired,
  isCreator: PropTypes.bool.isRequired,
  themeColor: PropTypes.string.isRequired,
  HeaderIcon: PropTypes.elementType.isRequired,
  RoleLabel: PropTypes.string.isRequired,
  setView: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};
