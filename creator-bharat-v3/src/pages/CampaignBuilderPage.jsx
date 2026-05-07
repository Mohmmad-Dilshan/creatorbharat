import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context';
import { W, scrollToTop, LS } from '../utils/helpers';
import { Fld, Card, Empty } from '../components/Primitives';

export default function CampaignBuilderPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [step, setStep] = useState(1);
  const [F, setF] = useState({ 
    title: '', 
    desc: '', 
    niche: '', 
    budgetMin: '', 
    budgetMax: '', 
    slots: 5, 
    urgent: false, 
    status: 'live',
    platform: 'Instagram'
  });

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const upF = (k, v) => setF(p => ({ ...p, [k]: v }));
  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type, msg } });
  const go = (p) => { dsp({ t: 'GO', p }); scrollToTop(); };

  if (!st.user || st.role !== 'brand') return (
    <div style={{ ...W(), padding: '120px 20px', textAlign: 'center' }}>
       <Empty icon="🔒" title="Brand Login Required" sub="Campaign launch karne ke liye brand account se login karein." ctaLabel="Join as Brand" onCta={() => go('brand-register')} />
    </div>
  );

  const nextStep = () => {
    if (step === 1 && (!F.title || !F.desc || !F.niche)) { toast('Pehle basic details bhar dein', 'error'); return; }
    if (step === 2 && (!F.slots)) { toast('Slots batana zaroori hai', 'error'); return; }
    if (step < 3) setStep(step + 1);
    else submit();
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const submit = () => {
    if (!F.budgetMin) { toast('Budget specify kerna zaroori hai', 'error'); return; }
    setLoading(true);
    setTimeout(() => {
      const camp = { 
        ...F, 
        id: 'c-' + Date.now(), 
        brand: st.user.companyName || st.user.name, 
        brandEmail: st.user.email,
        date: new Date().toISOString() 
      };
      
      const allC = LS.get('cb_campaigns', []);
      LS.set('cb_campaigns', [camp, ...allC]);
      
      toast('Campaign launched successfully!', 'success');
      go('brand-dashboard');
      setLoading(false);
    }, 1500);
  };

  const steps = [
    { n: 1, l: 'Basics', i: '📝' },
    { n: 2, l: 'Targeting', i: '🎯' },
    { n: 3, l: 'Review', i: '✨' }
  ];

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* Builder Top Section */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 800, color: '#10B981', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>Architect Mode</p>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: '#111', fontFamily: "'Outfit', sans-serif" }}>Create New Campaign</h1>
            <p style={{ fontSize: 15, color: '#64748b', marginTop: 4, fontWeight: 500 }}>Define your mission and find the perfect creators in Bharat.</p>
          </div>
          
          {/* Progress Indicator */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', background: '#fff', padding: '12px 24px', borderRadius: 20, border: '1px solid rgba(0,0,0,0.05)' }}>
            {steps.map(s => (
              <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ 
                  width: 28, height: 28, borderRadius: 8, 
                  background: step >= s.n ? '#10B981' : '#f1f5f9', 
                  color: step >= s.n ? '#fff' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontSize: 12, fontWeight: 900, transition: 'all 0.3s',
                  border: step === s.n ? '2px solid #10B981' : 'none'
                }}>
                  {step > s.n ? '✓' : s.i}
                </div>
                {!mob && <span style={{ color: step >= s.n ? '#111' : '#94a3b8', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>{s.l}</span>}
                {s.n < 3 && <div style={{ width: 12, height: 2, background: step > s.n ? '#10B981' : '#f1f5f9' }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <div>
          <Card style={{ padding: mob ? '32px 20px' : '48px', background: '#fff', borderRadius: 32, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 30px 70px rgba(0,0,0,0.04)' }}>
            
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 style={{ fontSize: 22, fontWeight: 900, color: '#111', marginBottom: 32, fontFamily: "'Outfit', sans-serif" }}>Primary Intelligence</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <Fld 
                      label="Campaign Title" 
                      value={F.title} 
                      onChange={e => upF('title', e.target.value)} 
                      placeholder="e.g. Summer Collection 2026" 
                      required 
                    />
                    <Fld 
                      label="Category / Niche" 
                      value={F.niche} 
                      onChange={e => upF('niche', e.target.value)} 
                      options={['', 'Lifestyle', 'Fashion', 'Tech', 'Food', 'Beauty', 'Education', 'Finance', 'Travel', 'Entertainment']} 
                      required
                    />
                    <Fld 
                      label="Creative Brief" 
                      value={F.desc} 
                      onChange={e => upF('desc', e.target.value)} 
                      rows={5} 
                      placeholder="Define your campaign goals and creator expectations..." 
                      required 
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 style={{ fontSize: 22, fontWeight: 900, color: '#111', marginBottom: 32, fontFamily: "'Outfit', sans-serif" }}>Targeting & Reach</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 20 }}>
                    <Fld 
                      label="Primary Platform" 
                      value={F.platform} 
                      onChange={e => upF('platform', e.target.value)} 
                      options={['Instagram', 'YouTube', 'Twitter', 'LinkedIn', 'Mixed']} 
                    />
                    <Fld 
                      label="Total Slots" 
                      type="number" 
                      value={F.slots} 
                      onChange={e => upF('slots', e.target.value)} 
                      placeholder="5" 
                      required
                    />
                  </div>

                  <div style={{ marginTop: 24 }}>
                    <p style={{ fontSize: 13, fontWeight: 800, color: '#475569', marginBottom: 12, display: 'block' }}>PRIORITY LEVEL</p>
                    <label 
                      style={{ 
                        display: 'flex', alignItems: 'center', gap: 16, padding: '20px', width: '100%',
                        borderRadius: 20, background: F.urgent ? '#FEF2F2' : '#F8FAFC', 
                        border: `1.5px solid ${F.urgent ? '#FECACA' : 'rgba(0,0,0,0.03)'}`,
                        cursor: 'pointer', transition: 'all 0.3s', textAlign: 'left'
                      }}
                    >
                      <input 
                        type="checkbox"
                        checked={F.urgent}
                        onChange={() => upF('urgent', !F.urgent)}
                        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                      />
                      <div style={{ 
                        width: 24, height: 24, borderRadius: 8, 
                        border: '2px solid ' + (F.urgent ? '#EF4444' : '#cbd5e1'), 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        background: F.urgent ? '#EF4444' : 'transparent', color: '#fff', fontSize: 14,
                        flexShrink: 0
                      }}>
                        {F.urgent && '✓'}
                      </div>
                      <div>
                        <p style={{ fontSize: 16, fontWeight: 800, color: F.urgent ? '#B91C1C' : '#1e293b' }}>Urgent Deployment</p>
                        <p style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Need content within 7 days? Mark as urgent for higher visibility.</p>
                      </div>
                    </label>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 style={{ fontSize: 22, fontWeight: 900, color: '#111', marginBottom: 32, fontFamily: "'Outfit', sans-serif" }}>Commercial Logic</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
                    <Fld 
                      label="Min Budget (₹ / Creator)" 
                      type="number" 
                      value={F.budgetMin} 
                      onChange={e => upF('budgetMin', e.target.value)} 
                      placeholder="5000" 
                      required 
                    />
                    <Fld 
                      label="Max Budget (₹ / Creator)" 
                      type="number" 
                      value={F.budgetMax} 
                      onChange={e => upF('budgetMax', e.target.value)} 
                      placeholder="25000" 
                    />
                  </div>

                  <div style={{ background: '#F0FDF4', borderRadius: 24, padding: '28px', border: '1px solid #DCFCE7' }}>
                     <p style={{ fontSize: 11, fontWeight: 900, color: '#166534', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16 }}>Deployment Forecast</p>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                           <span style={{ fontSize: 14, color: '#166534', opacity: 0.7 }}>Campaign Name:</span>
                           <span style={{ fontSize: 14, fontWeight: 800, color: '#166534' }}>{F.title || 'Draft'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                           <span style={{ fontSize: 14, color: '#166534', opacity: 0.7 }}>Potential Reach:</span>
                           <span style={{ fontSize: 14, fontWeight: 800, color: '#166534' }}>~{((F.slots || 0) * 15000).toLocaleString()}+ Viewers</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px dashed #BBF7D0' }}>
                           <span style={{ fontSize: 14, color: '#166534', opacity: 0.7 }}>Estimated Payout:</span>
                           <span style={{ fontSize: 15, fontWeight: 900, color: '#15803D' }}>₹{((F.slots || 0) * (F.budgetMin || 0)).toLocaleString()} - ₹{((F.slots || 0) * (F.budgetMax || F.budgetMin || 0)).toLocaleString()}</span>
                        </div>
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div style={{ marginTop: 40, display: 'flex', gap: 12 }}>
              {step > 1 && (
                <button 
                  onClick={prevStep} 
                  style={{ flex: 1, height: 56, borderRadius: 16, background: '#f8fafc', border: '1px solid #e2e8f0', color: '#1e293b', fontWeight: 800, cursor: 'pointer', fontSize: 14 }}
                >
                  BACK
                </button>
              )}
              
              <button 
                onClick={nextStep} 
                style={{ 
                  flex: 2, height: 56, borderRadius: 16, 
                  background: step === 3 ? '#10B981' : '#111', 
                  color: '#fff', border: 'none', cursor: 'pointer', 
                  fontWeight: 900, fontSize: 15, transition: 'all 0.3s',
                  boxShadow: step === 3 ? '0 10px 20px rgba(16,185,129,0.2)' : '0 10px 20px rgba(0,0,0,0.1)'
                }}
              >
                {step === 3 ? 'LAUNCH CAMPAIGN 🚀' : 'CONTINUE'}
              </button>
            </div>

          </Card>
        </div>
      </div>
    </div>
  );
}
