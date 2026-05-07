import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Star, Target, CreditCard, ChevronRight, Check, ShieldCheck, Mail, MapPin, Hash, BarChart3, IndianRupee, Layers, Lock } from 'lucide-react';
import { Btn, Fld, Chip } from '../Primitives';
import { T } from '../../theme';
import { fmt } from '../../utils/helpers';

export default function ApplyForm({ onSuccess, onBackToLogin }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [F, setF] = useState({ 
    name: '', handle: '', email: '', password: '', confirm: '', 
    city: 'Bhilwara', state: 'Rajasthan', 
    niche: [], platform: [], followers: '', er: '', 
    rateMin: '', services: [] 
  });
  const [errors, setErrors] = useState({});

  const upF = (k, v) => setF(p => ({ ...p, [k]: v }));
  const toggleArr = (k, v) => setF(p => ({ ...p, [k]: p[k].includes(v) ? p[k].filter(x => x !== v) : [...p[k], v] }));

  const NICHES = ['Travel', 'Lifestyle', 'Fashion', 'Beauty', 'Tech', 'Gaming', 'Food', 'Fitness', 'Education', 'Finance', 'Comedy', 'Art'];
  const PLATFORMS = ['Instagram', 'YouTube', 'Twitter', 'LinkedIn'];
  const SERVICES = ['Sponsored Posts', 'Reels', 'YouTube Videos', 'Stories', 'Product Reviews', 'Event Attendance'];

  const validate = (s) => {
    let e = {};
    if (s === 1) {
      if (!F.name) e.name = 'Full name is required';
      if (!F.email || !/^\S+@\S+\.\S+$/.test(F.email)) e.email = 'Valid email is required';
      if (!F.password || F.password.length < 6) e.password = 'Min 6 chars';
      if (F.password !== F.confirm) e.confirm = 'Mismatched';
    }
    if (s === 2) {
      if (F.niche.length === 0) e.niche = 'Select niche';
      if (F.platform.length === 0) e.platform = 'Select platform';
      if (!F.followers) e.followers = 'Reach required';
    }
    if (s === 3 && !F.rateMin) e.rateMin = 'Required';
    
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate(step)) setStep(s => s + 1); };

  const submit = async () => {
    setLoading(true);
    setTimeout(() => {
      onSuccess({ ...F, id: 'u-' + Date.now(), role: 'creator', handle: F.handle || fmt.handle(F.name) });
      setLoading(false);
    }, 2000);
  };

  const steps = [
    { t: 'Identity', i: User },
    { t: 'Influence', i: Star },
    { t: 'Commercials', i: CreditCard },
    { t: 'Ready', i: Target }
  ];

  const sL = { display: 'block', fontSize: 13, fontWeight: 800, color: '#111', marginBottom: 12 };

  return (
    <div style={{ position: 'relative' }}>
      {/* Progress Bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 10, background: step > i ? T.saffron : '#f1f5f9', transition: 'all 0.4s' }} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div style={{ marginBottom: 32 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: T.saffron, marginBottom: 8 }}>
                {React.createElement(steps[step-1].i, { size: 18 })}
                <span style={{ fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Step {step} of 4</span>
             </div>
             <h3 style={{ fontSize: 24, fontWeight: 900, color: '#111', fontFamily: "'Outfit', sans-serif" }}>{steps[step-1].t}</h3>
          </div>

          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <Fld label="Full Name" value={F.name} icon={User} onChange={e => upF('name', e.target.value)} placeholder="Aman Deep" error={errors.name} sm required />
              <Fld label="Work Email" type="email" icon={Mail} value={F.email} onChange={e => upF('email', e.target.value)} placeholder="aman@bhilwara.me" error={errors.email} sm required />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Fld label="Password" type="password" icon={Lock} value={F.password} onChange={e => upF('password', e.target.value)} placeholder="••••" error={errors.password} sm required />
                <Fld label="Confirm" type="password" icon={Lock} value={F.confirm} onChange={e => upF('confirm', e.target.value)} placeholder="••••" error={errors.confirm} sm required />
              </div>
              <Fld label="City" value={F.city} icon={MapPin} onChange={e => upF('city', e.target.value)} options={['Bhilwara', 'Jaipur', 'Udaipur', 'Delhi', 'Mumbai']} sm required />
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <p style={sL}>Primary Niches *</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{NICHES.map(n => <Chip key={n} label={n} active={F.niche.includes(n)} onClick={() => toggleArr('niche', n)} sm />)}</div>
                {errors.niche && <p style={{ color: '#EF4444', fontSize: 11, marginTop: 6, fontWeight: 700 }}>{errors.niche}</p>}
              </div>
              <div>
                <p style={sL}>Social Platforms *</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{PLATFORMS.map(p => <Chip key={p} label={p} active={F.platform.includes(p)} onClick={() => toggleArr('platform', p)} sm />)}</div>
              </div>
              <Fld label="Total Followers" type="number" icon={Hash} value={F.followers} onChange={e => upF('followers', e.target.value)} placeholder="10k" error={errors.followers} sm required />
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <Fld label="Min Collaboration Rate (₹)" type="number" icon={IndianRupee} value={F.rateMin} onChange={e => upF('rateMin', e.target.value)} placeholder="5000" error={errors.rateMin} sm required />
              <div>
                <p style={sL}>Services Offered</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{SERVICES.map(s => <Chip key={s} label={s} active={F.services.includes(s)} onClick={() => toggleArr('services', s)} sm />)}</div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ padding: '24px', background: 'rgba(255,148,49,0.03)', borderRadius: 24, border: '1.5px dashed rgba(255,148,49,0.2)', textAlign: 'center' }}>
                 <div style={{ width: 64, height: 64, borderRadius: '50%', background: T.saffron, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 20px rgba(255,148,49,0.3)' }}>
                    <ShieldCheck size={32} />
                 </div>
                 <h4 style={{ fontSize: 18, fontWeight: 900, color: '#111', marginBottom: 8 }}>Identity Verified</h4>
                 <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>Aapka creator profile ready hai. "Launch" click karte hi aap premium brands ke liye visible ho jayenge.</p>
              </div>
              <div style={{ padding: '16px 20px', background: '#F8FAFC', borderRadius: 16, border: '1px solid #F1F5F9' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#CBD5E1' }} />
                    <div>
                       <p style={{ fontSize: 14, fontWeight: 800, color: '#111' }}>{F.name || 'Anonymous Creator'}</p>
                       <p style={{ fontSize: 12, color: T.saffron, fontWeight: 700 }}>{F.niche.length > 0 ? F.niche.slice(0,2).join(', ') : 'Influencer'}</p>
                    </div>
                 </div>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, marginTop: 40 }}>
            {step > 1 && <Btn variant="outline" onClick={() => setStep(s => s - 1)} style={{ borderRadius: 100, height: 54, padding: '0 24px' }}>Back</Btn>}
            {step < 4 ? (
              <Btn full lg onClick={next} style={{ borderRadius: 100, background: '#111', color: '#fff', border: 'none', height: 54, fontWeight: 800 }}>
                Continue <ChevronRight size={18} style={{ marginLeft: 8 }} />
              </Btn>
            ) : (
              <Btn full lg loading={loading} onClick={submit} style={{ borderRadius: 100, background: T.saffron, color: '#fff', border: 'none', height: 54, fontWeight: 900, boxShadow: '0 10px 20px rgba(255,148,49,0.3)' }}>
                Launch Profile 🚀
              </Btn>
            )}
          </div>

          <div style={{ marginTop: 32, textAlign: 'center' }}>
             <button onClick={onBackToLogin} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                Already a member? <span style={{ color: T.saffron, fontWeight: 900 }}>Login</span>
             </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

ApplyForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onBackToLogin: PropTypes.func.isRequired
};
