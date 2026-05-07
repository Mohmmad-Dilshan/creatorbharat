import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context';
import { T } from '../theme';
import { scrollToTop, fmt, LS } from '../utils/helpers';
import { Btn, Fld, Chip } from '../components/Primitives';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Star, Target, CreditCard, ChevronRight, Check, ShieldCheck } from 'lucide-react';

export default function ApplyPage() {
  const { dsp } = useApp();
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [step, setStep] = useState(1);
  const [F, setF] = useState({ name: '', handle: '', email: '', password: '', confirm: '', phone: '', city: 'Bhilwara', state: 'Rajasthan', niche: [], platform: [], followers: '', er: '', monthlyViews: '', bio: '', instagram: '', youtube: '', rateMin: '', rateMax: '', services: [], languages: [], photo: null });

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const upF = (k, v) => setF(p => ({ ...p, [k]: v }));
  const toggleArr = (k, v) => setF(p => ({ ...p, [k]: p[k].includes(v) ? p[k].filter(x => x !== v) : [...p[k], v] }));
  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type, msg } });

  const NICHES = ['Travel', 'Lifestyle', 'Fashion', 'Beauty', 'Tech', 'Gaming', 'Food', 'Fitness', 'Education', 'Finance', 'Comedy', 'Art'];
  const PLATFORMS = ['Instagram', 'YouTube', 'Twitter', 'LinkedIn'];
  const SERVICES = ['Sponsored Posts', 'Reels', 'YouTube Videos', 'Stories', 'Product Reviews', 'Event Attendance'];

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = (s) => {
    let e = {};
    const f1 = () => {
      if (!F.name) e.name = 'Full name is required';
      if (!F.email || !/^\S+@\S+\.\S+$/.test(F.email)) e.email = 'Valid email is required';
      if (!F.password || F.password.length < 6) e.password = 'Password must be at least 6 characters';
      if (F.password !== F.confirm) e.confirm = 'Passwords do not match';
      if (!F.city) e.city = 'City is required';
    };
    const f2 = () => {
      if (F.niche.length === 0) e.niche = 'Select niche';
      if (F.platform.length === 0) e.platform = 'Select platform';
      if (!F.followers) e.followers = 'Followers required';
    };
    
    if (s === 1) f1();
    if (s === 2) f2();
    if (s === 3 && !F.rateMin) e.rateMin = 'Min rate required';
    
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validate(step)) {
      setStep(s => s + 1); 
      scrollToTop();
    }
  };

  const submit = async () => {
    if (!validate(4)) return;
    setLoading(true);
    
    try {
      const handle = F.handle || fmt.handle(F.name);
      const user = { ...F, id: 'u-' + Date.now(), role: 'creator', score: 45, handle };
      
      const existing = LS.get('cb_creators', []);
      LS.set('cb_creators', [...existing, user]);
      
      dsp({ t: 'LOGIN', u: user, role: 'creator' });
      toast(`Swagat hai! Your profile is live.`, 'success');
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration Error:', err);
      toast('Registration failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { t: 'Identity', d: 'Basic credentials', i: User },
    { t: 'Influence', d: 'Your niche & reach', i: Star },
    { t: 'Commercials', d: 'Rates & services', i: CreditCard },
    { t: 'Review', d: 'Final preview', i: Target }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: mob ? '1fr' : '480px 1fr', background: '#fff' }}>
      {/* Sidebar Onboarding */}
      {!mob && (
        <div style={{ background: '#050505', padding: '60px 48px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          {/* Animated Background Blobs */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
            <motion.div 
              animate={{ x: [0, 20, 0], y: [0, -20, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: 'absolute', top: '-15%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255,148,49,0.2) 0%, transparent 70%)', filter: 'blur(80px)' }}
            />
            <motion.div 
              animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(18,136,7,0.15) 0%, transparent 70%)', filter: 'blur(100px)' }}
            />
          </div>
          
          <div style={{ marginBottom: 60, position: 'relative', zIndex: 2 }}>
             <Link to="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
               <h1 style={{ fontSize: 24, fontWeight: 900, color: '#fff', display: 'flex', alignItems: 'center', gap: 12, fontFamily: "'Outfit', sans-serif" }}>
                  <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #FF9431, #fff)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#FF9431' }}>CB</div>
                  <span>Creator Portal</span>
               </h1>
             </Link>
          </div>

          <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, color: '#fff', marginBottom: 16, fontWeight: 900, lineHeight: 1.2, letterSpacing: '-0.02em' }}>Build Your Digital <br/>Identity in Bharat.</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 48, fontWeight: 500 }}>Join 2,400+ elite creators. Get discovered by premium brands looking for authentic influence.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {steps.map((s, i) => {
                const Icon = s.i;
                const active = step === i + 1;
                const done = step > i + 1;
                
                let borderColor = 'rgba(255,255,255,0.1)';
                if (done) borderColor = '#10B981';
                else if (active) borderColor = '#FF9431';

                return (
                  <div key={s.t} style={{ display: 'flex', gap: 20, alignItems: 'center', opacity: active || done ? 1 : 0.3, transition: 'all 0.3s' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '14px', border: '1.5px solid ' + borderColor, background: done ? '#10B981' : 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                       {done ? <Check size={20} /> : <Icon size={20} />}
                    </div>
                    <div>
                       <p style={{ fontSize: 15, fontWeight: 800, color: active ? '#fff' : 'rgba(255,255,255,0.4)' }}>{s.t}</p>
                       {active && <p style={{ fontSize: 12, color: '#FF9431', marginTop: 2, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.d}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div style={{ position: 'relative', zIndex: 2 }}>
             <div style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                   <ShieldCheck size={20} color="#10B981" />
                   <span style={{ color: '#fff', fontSize: 14, fontWeight: 800 }}>Verified Network</span>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, fontWeight: 500 }}>"The most professional onboarding I've experienced. My profile was live and receiving brand inquiries within 48 hours."</p>
             </div>
          </div>
        </div>
      )}

      {/* Form Area */}
      <div style={{ padding: mob ? '100px 24px 48px' : '80px 80px', overflowY: 'auto', background: '#fff' }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          {mob && (
            <div style={{ marginBottom: 32 }}>
               <h1 style={{ fontSize: 24, fontWeight: 900, color: '#111', marginBottom: 8 }}>Creator Identity</h1>
               <p style={{ fontSize: 14, color: T.t3, marginBottom: 20 }}>Step {step} of 4</p>
               <div style={{ display: 'flex', gap: 6 }}>{steps.map((s) => <div key={s.t} style={{ flex: 1, height: 4, borderRadius: 2, background: steps.indexOf(s) < step ? '#FF9431' : '#EEE' }} />)}</div>
            </div>
          )}
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="au"
            >
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, color: '#111', fontWeight: 900, marginBottom: 8 }}>{steps[step - 1].t}</h2>
              <p style={{ fontSize: 16, color: T.t3, marginBottom: 40, fontWeight: 500 }}>{steps[step - 1].d}</p>

              {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <Fld label="Full Name" value={F.name} onChange={e => { upF('name', e.target.value); if (!F.handle) upF('handle', fmt.handle(e.target.value)) }} placeholder="Aman Deep" error={errors.name} required />
                  <Fld label="Work Email" type="email" value={F.email} onChange={e => upF('email', e.target.value)} placeholder="aman@bhilwara.me" error={errors.email} required />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <Fld label="City" value={F.city} onChange={e => upF('city', e.target.value)} options={['Bhilwara', 'Jaipur', 'Udaipur', 'Jodhpur', 'Delhi', 'Mumbai']} error={errors.city} required />
                    <Fld label="State" value={F.state} onChange={e => upF('state', e.target.value)} placeholder="Rajasthan" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <Fld label="Password" type="password" value={F.password} onChange={e => upF('password', e.target.value)} placeholder="••••••••" error={errors.password} required />
                    <Fld label="Confirm" type="password" value={F.confirm} onChange={e => upF('confirm', e.target.value)} placeholder="••••••••" error={errors.confirm} required />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <div>
                    <p style={{ display: 'block', fontSize: 13, fontWeight: 800, color: '#111', marginBottom: 12 }}>Primary Niches *</p>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{NICHES.map(n => <Chip key={n} label={n} active={F.niche.includes(n)} onClick={() => toggleArr('niche', n)} />)}</div>
                    {errors.niche && <p style={{ color: '#EF4444', fontSize: 12, marginTop: 8, fontWeight: 600 }}>{errors.niche}</p>}
                  </div>
                  <div>
                    <p style={{ display: 'block', fontSize: 13, fontWeight: 800, color: '#111', marginBottom: 12 }}>Active Platforms *</p>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{PLATFORMS.map(p => <Chip key={p} label={p} active={F.platform.includes(p)} onClick={() => toggleArr('platform', p)} />)}</div>
                    {errors.platform && <p style={{ color: '#EF4444', fontSize: 12, marginTop: 8, fontWeight: 600 }}>{errors.platform}</p>}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <Fld label="Total Followers" type="number" value={F.followers} onChange={e => upF('followers', e.target.value)} placeholder="10000" error={errors.followers} required />
                    <Fld label="Monthly Views" type="number" value={F.monthlyViews} onChange={e => upF('monthlyViews', e.target.value)} placeholder="50000" />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <Fld label="Min Rate (₹)" type="number" value={F.rateMin} onChange={e => upF('rateMin', e.target.value)} placeholder="2000" error={errors.rateMin} required />
                    <Fld label="Max Rate (₹)" type="number" value={F.rateMax} onChange={e => upF('rateMax', e.target.value)} placeholder="10000" />
                  </div>
                  <div>
                    <p style={{ display: 'block', fontSize: 13, fontWeight: 800, color: '#111', marginBottom: 12 }}>Services Offered</p>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{SERVICES.map(s => <Chip key={s} label={s} active={F.services.includes(s)} onClick={() => toggleArr('services', s)} />)}</div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <div style={{ padding: '32px', background: '#F9FAFB', borderRadius: 24, border: '1px solid #E5E7EB' }}>
                     <h4 style={{ fontSize: 18, fontWeight: 800, color: '#111', marginBottom: 8 }}>Ready to Launch?</h4>
                     <p style={{ fontSize: 15, color: T.t3, lineHeight: 1.5 }}>Aapka profile ready hai. "Launch" par click karte hi aap CreatorBharat marketplace par live ho jayenge.</p>
                     <div style={{ marginTop: 24, padding: '16px', background: '#fff', borderRadius: 16, border: '1px solid #eee' }}>
                        <p style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>{F.name} • {F.city}</p>
                        <p style={{ fontSize: 13, color: '#FF9431', fontWeight: 800, marginTop: 4 }}>{F.niche.join(', ')}</p>
                     </div>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: 12, marginTop: 48 }}>
                {step > 1 && <Btn variant="outline" lg onClick={() => setStep(s => s - 1)} style={{ borderRadius: 100, padding: '16px 32px' }}>Back</Btn>}
                {step < 4 ? (
                  <Btn full lg onClick={next} style={{ borderRadius: 100, background: '#111', color: '#fff', border: 'none', height: 60, fontSize: 17 }}>
                    Next Step <ChevronRight size={20} style={{ marginLeft: 8 }} />
                  </Btn>
                ) : (
                  <Btn full lg loading={loading} onClick={submit} style={{ borderRadius: 100, background: '#FF9431', color: '#fff', border: 'none', height: 60, fontSize: 17, fontWeight: 900, boxShadow: '0 10px 30px rgba(255,148,49,0.3)' }}>
                    Launch My Profile 🚀
                  </Btn>
                )}
              </div>
              
              <p style={{ textAlign: 'center', marginTop: 32, fontSize: 14, color: T.t3, fontWeight: 500 }}>
                 Already a member? <Link to="/login" style={{ color: '#FF9431', fontWeight: 800, textDecoration: 'none' }}>Login here</Link>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
