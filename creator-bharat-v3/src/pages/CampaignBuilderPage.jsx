import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context';
import { T } from '../theme';
import { W, scrollToTop, LS } from '../utils/helpers';
import { apiCall } from '../utils/api';
import { Btn, Fld, Card, Bdg, Empty } from '../components/Primitives';
import EliteHeader from '../components/layout/EliteHeader';

export default function CampaignBuilderPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const [loading, setLoading] = useState(false);
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
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
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
    { n: 1, l: 'Basics' },
    { n: 2, l: 'Requirements' },
    { n: 3, l: 'Budget' }
  ];

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh', paddingBottom: 100 }}>
      <EliteHeader 
        eyebrow="Deployment Center"
        title="Launch New Campaign"
        sub="Bharat ke top creators tak pahunchne ke liye apni campaign brief taiyaar karein."
        gradient="green"
        maxWidth={800}
      >
        {/* Progress Indicator */}
        <div style={{ display: 'flex', gap: 12, marginTop: 40 }}>
           {steps.map(s => (
             <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ 
                  width: 32, 
                  height: 32, 
                  borderRadius: '50%', 
                  background: step >= s.n ? '#10B981' : 'rgba(255,255,255,0.1)', 
                  color: '#fff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: 14, 
                  fontWeight: 900,
                  transition: 'all 0.3s',
                  border: step === s.n ? '2px solid #fff' : 'none'
                }}>
                  {step > s.n ? '✓' : s.n}
                </div>
                {!mob && <span style={{ color: step >= s.n ? '#fff' : 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{s.l}</span>}
                {s.n < 3 && <div style={{ width: mob ? 20 : 40, height: 2, background: step > s.n ? '#10B981' : 'rgba(255,255,255,0.1)' }} />}
             </div>
           ))}
        </div>
      </EliteHeader>

      <div style={{ marginTop: -60, position: 'relative', zIndex: 10 }}>
        <div style={W(800)}>
          <Card className="au" style={{ padding: mob ? '32px 24px' : '48px', background: '#fff', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 20px 60px rgba(0,0,0,0.05)' }}>
            
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                >
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 900, color: '#111', marginBottom: 32 }}>1. Campaign Core Details</h3>
                  <Fld 
                    label="Campaign Title" 
                    value={F.title} 
                    onChange={e => upF('title', e.target.value)} 
                    placeholder="e.g. Summer Collection Launch 2026" 
                    required 
                  />
                  <Fld 
                    label="Target Niche" 
                    value={F.niche} 
                    onChange={e => upF('niche', e.target.value)} 
                    options={['', 'Lifestyle', 'Fashion', 'Tech', 'Food', 'Beauty', 'Education', 'Finance', 'Travel', 'Entertainment']} 
                    required
                  />
                  <Fld 
                    label="Creative Brief & Description" 
                    value={F.desc} 
                    onChange={e => upF('desc', e.target.value)} 
                    rows={6} 
                    placeholder="Apne brand aur campaign goals ke baare mein batayein..." 
                    required 
                    helper="Brief jitna accha hoga, utne acche creators apply karenge."
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                >
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 900, color: '#111', marginBottom: 32 }}>2. Execution & Requirements</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 24 }}>
                    <Fld 
                      label="Primary Platform" 
                      value={F.platform} 
                      onChange={e => upF('platform', e.target.value)} 
                      options={['Instagram', 'YouTube', 'Twitter', 'LinkedIn', 'Mixed']} 
                    />
                    <Fld 
                      label="Total Slots (No. of Creators)" 
                      type="number" 
                      value={F.slots} 
                      onChange={e => upF('slots', e.target.value)} 
                      placeholder="5" 
                      required
                    />
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: T.n8, marginBottom: 12 }}>Timeline & Urgency</p>
                    <div 
                      onClick={() => upF('urgent', !F.urgent)} 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 16, 
                        padding: '24px', 
                        borderRadius: 20, 
                        background: F.urgent ? 'rgba(239,68,68,0.04)' : '#F9F9F9', 
                        border: `1.5px solid ${F.urgent ? '#EF4444' : 'rgba(0,0,0,0.05)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                    >
                      <div style={{ 
                        width: 28, 
                        height: 28, 
                        borderRadius: 8, 
                        border: '2px solid ' + (F.urgent ? '#EF4444' : '#ccc'), 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        background: F.urgent ? '#EF4444' : 'transparent', 
                        color: '#fff',
                        fontSize: 16
                      }}>
                        {F.urgent && '✓'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 17, fontWeight: 900, color: F.urgent ? '#EF4444' : '#111' }}>Urgent Requirement</p>
                        <p style={{ fontSize: 13, color: T.t3, marginTop: 4 }}>Ager aapko content 7 days ke andar chahiye, toh ise mark karein. (Higher reach guaranteed)</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                >
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 900, color: '#111', marginBottom: 32 }}>3. Commercials & Review</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
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

                  <div style={{ background: 'rgba(16,185,129,0.05)', borderRadius: 24, padding: '32px', border: '1px solid rgba(16,185,129,0.1)' }}>
                     <h4 style={{ fontSize: 14, fontWeight: 900, color: '#10B981', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16 }}>Campaign Preview</h4>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                           <span style={{ fontSize: 14, color: T.t3 }}>Campaign:</span>
                           <span style={{ fontSize: 14, fontWeight: 800, color: '#111' }}>{F.title || 'Untitled'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                           <span style={{ fontSize: 14, color: T.t3 }}>Est. Reach:</span>
                           <span style={{ fontSize: 14, fontWeight: 800, color: '#111' }}>~{((F.slots || 0) * 25000).toLocaleString()}+ People</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                           <span style={{ fontSize: 14, color: T.t3 }}>Total Payout:</span>
                           <span style={{ fontSize: 14, fontWeight: 900, color: '#10B981' }}>₹{((F.slots || 0) * (F.budgetMin || 0)).toLocaleString()} - ₹{((F.slots || 0) * (F.budgetMax || F.budgetMin || 0)).toLocaleString()}</span>
                        </div>
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', gap: 16, flexDirection: mob ? 'column' : 'row' }}>
              {step > 1 ? (
                <Btn variant="outline" lg onClick={prevStep} style={{ flex: 1, borderRadius: 100 }}>Previous Step</Btn>
              ) : (
                <Btn variant="outline" lg onClick={() => go('brand-dashboard')} style={{ flex: 1, borderRadius: 100 }}>Cancel</Btn>
              )}
              
              <Btn 
                lg 
                loading={loading} 
                onClick={nextStep} 
                style={{ flex: 2, borderRadius: 100, height: 60, fontSize: 17 }}
              >
                {step === 3 ? 'Confirm & Launch Campaign 🚀' : 'Save & Continue'}
              </Btn>
            </div>

          </Card>
        </div>
      </div>
    </div>
  );
}
