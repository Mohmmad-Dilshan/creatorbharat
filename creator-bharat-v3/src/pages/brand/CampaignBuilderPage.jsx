import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context';
import { W, scrollToTop, LS, fmt } from '../../utils/helpers';
import { Fld, Card, Empty, Btn, Bdg, Bar } from '../../components/Primitives';
import { CampCard } from '../../components/Cards';
import { 
  Rocket, 
  Target, 
  Wallet, 
  Eye, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Zap, 
  Users, 
  Globe,
  Sparkles,
  Layout
} from 'lucide-react';

const StepIndicator = ({ step, n, label, icon: Icon }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1, position: 'relative' }}>
    <div style={{ 
      width: '40px', 
      height: '40px', 
      borderRadius: '12px', 
      background: step >= n ? '#10B981' : '#f1f5f9', 
      color: step >= n ? '#fff' : '#94a3b8', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      border: step === n ? '2px solid #10B981' : 'none',
      boxShadow: step === n ? '0 0 0 4px rgba(16, 185, 129, 0.1)' : 'none',
      zIndex: 2
    }}>
       {step > n ? <CheckCircle2 size={20} /> : <Icon size={20} />}
    </div>
    <span style={{ fontSize: '11px', fontWeight: 900, color: step >= n ? '#0f172a' : '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
    {n < 4 && (
      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        left: '50%', 
        width: '100%', 
        height: '2px', 
        background: step > n ? '#10B981' : '#f1f5f9', 
        zIndex: 1 
      }} />
    )}
  </div>
);

export default function CampaignBuilderPage() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [F, setF] = useState({ 
    title: '', 
    desc: '', 
    niche: '', 
    budgetMin: '', 
    budgetMax: '', 
    slots: 10, 
    urgent: false, 
    status: 'live',
    platform: 'Instagram',
    deadline: ''
  });

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const upF = (k, v) => setF(p => ({ ...p, [k]: v }));
  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type, msg } });
  const go = (p) => { dsp({ t: 'GO', p }); navigate(`/${p}`); scrollToTop(); };

  if (!st.user || st.role !== 'brand') return (
    <div style={{ ...W(), padding: '120px 20px', textAlign: 'center' }}>
       <Empty icon="🔒" title="Brand Login Required" sub="Campaign launch karne ke liye brand account se login karein." ctaLabel="Join as Brand" onCta={() => go('brand-register')} />
    </div>
  );

  const nextStep = () => {
    if (step === 1 && (!F.title || !F.desc || !F.niche)) { toast('Please complete all basic details', 'error'); return; }
    if (step === 2 && (!F.slots || !F.platform)) { toast('Targeting metrics are required', 'error'); return; }
    if (step === 3 && (!F.budgetMin)) { toast('Budget logic must be defined', 'error'); return; }
    
    if (step < 4) {
      setStep(step + 1);
      scrollToTop();
    } else {
      submit();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      scrollToTop();
    }
  };

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      const camp = { 
        ...F, 
        id: 'c-' + Date.now(), 
        brand: st.user.companyName || st.user.name, 
        brandEmail: st.user.email,
        filled: 0,
        date: new Date().toISOString() 
      };
      
      const allC = LS.get('cb_campaigns', []);
      LS.set('cb_campaigns', [camp, ...allC]);
      
      setDone(true);
      setLoading(false);
      toast('Campaign launched successfully!', 'success');
    }, 2000);
  };

  const previewCampaign = {
    ...F,
    brand: st.user.companyName || 'Your Brand',
    filled: 0,
    deadline: F.deadline || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  };

  if (done) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fcfcfc', padding: '20px' }}>
       <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
          <Card style={{ padding: '80px 40px', borderRadius: '40px', background: '#fff' }}>
             <div style={{ width: '100px', height: '100px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
                <CheckCircle2 size={50} />
             </div>
             <h2 style={{ fontSize: '32px', fontWeight: 950, marginBottom: '16px' }}>Mission Deployed!</h2>
             <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.6, marginBottom: '40px' }}>
                Your campaign <strong>"{F.title}"</strong> is now live on the marketplace. Creators in Bharat are being notified.
             </p>
             <div style={{ display: 'flex', gap: '16px' }}>
                <Btn full lg variant="outline" onClick={() => { setDone(false); setStep(1); setF({ title: '', desc: '', niche: '', budgetMin: '', budgetMax: '', slots: 10, urgent: false, status: 'live', platform: 'Instagram', deadline: '' }); }}>Launch Another</Btn>
                <Btn full lg onClick={() => go('brand-dashboard')}>Go to Dashboard</Btn>
             </div>
          </Card>
       </motion.div>
    </div>
  );

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', padding: mob ? '100px 20px 100px' : '120px 40px 100px' }}>
      
      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
           <Layout size={14} fill="#10B981" /> ARCHITECT STUDIO
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.04em' }}>New Mission</h1>
        <p style={{ fontSize: '16px', color: '#64748b', marginTop: '4px', fontWeight: 500 }}>Engineer your campaign parameters and attract high-impact talent.</p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 400px', gap: '48px', alignItems: 'start' }}>
         
         {/* Form Panel */}
         <div>
            <Card style={{ padding: mob ? '32px 24px' : '48px', borderRadius: '40px', background: '#fff', border: '1px solid #f1f5f9' }}>
               
               {/* Stepper */}
               <div style={{ display: 'flex', gap: '8px', marginBottom: '48px' }}>
                  <StepIndicator step={step} n={1} label="Profile" icon={Target} />
                  <StepIndicator step={step} n={2} label="Logistics" icon={Globe} />
                  <StepIndicator step={step} n={3} label="Budget" icon={Wallet} />
                  <StepIndicator step={step} n={4} label="Launch" icon={Rocket} />
               </div>

               <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                       <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '32px' }}>Step 1: Mission Profile</h3>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                          <Fld label="Campaign Title" value={F.title} onChange={e => upF('title', e.target.value)} placeholder="Summer Essentials 2026" />
                          <Fld 
                            label="Target Niche" 
                            value={F.niche} 
                            onChange={e => upF('niche', e.target.value)} 
                            options={['', 'Lifestyle', 'Fashion', 'Tech', 'Food', 'Beauty', 'Travel', 'Education', 'Entertainment']} 
                          />
                          <Fld label="Creative Brief" value={F.desc} onChange={e => upF('desc', e.target.value)} rows={5} placeholder="What are the key deliverables and message for this campaign?" />
                       </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                       <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '32px' }}>Step 2: Logistics & Reach</h3>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px' }}>
                             <Fld label="Primary Platform" value={F.platform} onChange={e => upF('platform', e.target.value)} options={['Instagram', 'YouTube', 'LinkedIn', 'Twitter']} />
                             <Fld label="Total Creator Slots" type="number" value={F.slots} onChange={e => upF('slots', e.target.value)} placeholder="10" />
                          </div>
                          
                          <div style={{ marginTop: '12px' }}>
                             <p style={{ fontSize: '13px', fontWeight: 900, color: '#475569', marginBottom: '16px', textTransform: 'uppercase' }}>Mission Urgency</p>
                             <label style={{ 
                               display: 'flex', alignItems: 'center', gap: '16px', padding: '24px', borderRadius: '24px',
                               background: F.urgent ? '#FEF2F2' : '#f8fafc', border: `1.5px solid ${F.urgent ? '#FECACA' : '#f1f5f9'}`,
                               cursor: 'pointer', transition: 'all 0.3s'
                             }}>
                                <input type="checkbox" checked={F.urgent} onChange={e => upF('urgent', e.target.checked)} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                                <div>
                                   <div style={{ fontSize: '16px', fontWeight: 900, color: F.urgent ? '#B91C1C' : '#0f172a' }}>Mark as High Priority</div>
                                   <p style={{ fontSize: '13px', color: F.urgent ? '#EF4444' : '#64748b', marginTop: '4px' }}>Campaigns closing within 7 days get 3x more visibility.</p>
                                </div>
                             </label>
                          </div>
                       </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                       <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '32px' }}>Step 3: Commercial Logic</h3>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px' }}>
                             <Fld label="Min. Budget per Creator (₹)" type="number" value={F.budgetMin} onChange={e => upF('budgetMin', e.target.value)} placeholder="5000" />
                             <Fld label="Max. Budget per Creator (₹)" type="number" value={F.budgetMax} onChange={e => upF('budgetMax', e.target.value)} placeholder="20000" />
                          </div>
                          
                          <div style={{ background: '#F0FDF4', borderRadius: '28px', padding: '32px', border: '1px solid #DCFCE7' }}>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                <Zap size={20} color="#16a34a" fill="#16a34a" />
                                <h4 style={{ fontSize: '15px', fontWeight: 900, color: '#166534', textTransform: 'uppercase' }}>Deployment Forecast</h4>
                             </div>
                             <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                   <span style={{ fontSize: '14px', color: '#166534', opacity: 0.8 }}>Potential Reach:</span>
                                   <span style={{ fontSize: '15px', fontWeight: 900, color: '#166534' }}>~{(F.slots * 12500).toLocaleString()} Impressions</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px dashed #BBF7D0' }}>
                                   <span style={{ fontSize: '14px', color: '#166534', opacity: 0.8 }}>Total Budget Commitment:</span>
                                   <span style={{ fontSize: '18px', fontWeight: 950, color: '#15803D' }}>{fmt.inr(F.slots * F.budgetMin)} - {fmt.inr(F.slots * (F.budgetMax || F.budgetMin))}</span>
                                </div>
                             </div>
                          </div>
                       </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                       <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '32px' }}>Step 4: Final Review</h3>
                       <div style={{ padding: '32px', background: '#f8fafc', borderRadius: '32px', border: '1px solid #f1f5f9' }}>
                          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6 }}>
                             Review your campaign parameters. Once launched, this mission will be instantly visible to our network of {fmt.num(5000)}+ creators.
                          </p>
                          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                <span style={{ fontWeight: 700, color: '#94a3b8' }}>Objective:</span>
                                <span style={{ fontWeight: 800, color: '#0f172a' }}>{F.title}</span>
                             </div>
                             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                <span style={{ fontWeight: 700, color: '#94a3b8' }}>Platform:</span>
                                <span style={{ fontWeight: 800, color: '#0f172a' }}>{F.platform}</span>
                             </div>
                             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                <span style={{ fontWeight: 700, color: '#94a3b8' }}>Reach Target:</span>
                                <span style={{ fontWeight: 800, color: '#0f172a' }}>{F.slots} Creators</span>
                             </div>
                          </div>
                       </div>
                    </motion.div>
                  )}
               </AnimatePresence>

               {/* Actions */}
               <div style={{ marginTop: '48px', display: 'flex', gap: '16px' }}>
                  {step > 1 && (
                    <button 
                      onClick={prevStep} 
                      style={{ height: '60px', padding: '0 32px', borderRadius: '100px', background: '#f8fafc', border: '1px solid #f1f5f9', color: '#64748b', fontWeight: 800, fontSize: '14px', cursor: 'pointer' }}
                    >
                       <ChevronLeft size={20} />
                    </button>
                  )}
                  <button 
                    onClick={nextStep} 
                    disabled={loading}
                    style={{ 
                      flex: 1, height: '60px', borderRadius: '100px', 
                      background: step === 4 ? '#10B981' : '#0f172a', 
                      color: '#fff', border: 'none', cursor: 'pointer', 
                      fontWeight: 950, fontSize: '15px', transition: 'all 0.3s',
                      boxShadow: step === 4 ? '0 10px 30px rgba(16, 185, 129, 0.3)' : '0 10px 30px rgba(0,0,0,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'
                    }}
                  >
                    {loading ? 'DEPLOYING MISSION...' : (step === 4 ? 'LAUNCH CAMPAIGN 🚀' : 'NEXT STEP')}
                    {step < 4 && !loading && <ChevronRight size={18} />}
                  </button>
               </div>

            </Card>
         </div>

         {/* Preview Panel (Desktop) */}
         {!mob && (
            <div style={{ position: 'sticky', top: '140px' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', color: '#FF9431', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase' }}>
                  <Eye size={16} fill="#FF9431" /> Live Preview
               </div>
               <div style={{ opacity: F.title ? 1 : 0.5, transition: 'all 0.5s' }}>
                  <CampCard campaign={previewCampaign} onApply={() => {}} />
               </div>
               <div style={{ marginTop: '32px', padding: '32px', background: '#EEF2FF', borderRadius: '32px', border: '1px solid #C7D2FE' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                     <Sparkles size={18} color="#4F46E5" fill="#4F46E5" />
                     <h4 style={{ fontSize: '15px', fontWeight: 900, color: '#3730A3' }}>Optimization Engine</h4>
                  </div>
                  <p style={{ fontSize: '13px', color: '#4F46E5', lineHeight: 1.6, fontWeight: 600 }}>
                    Adding a detailed creative brief increases application quality by <strong>45%</strong>. Ensure your goals are clear.
                  </p>
               </div>
            </div>
         )}

      </div>
    </div>
  );
}
