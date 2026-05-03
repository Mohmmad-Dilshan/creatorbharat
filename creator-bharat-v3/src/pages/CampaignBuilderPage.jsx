import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T } from '../theme';
import { W, scrollToTop, LS } from '../utils/helpers';
import { apiCall } from '../utils/api';
import { Btn, Fld, Card, Bdg, SH } from '../components/Primitives';

export default function CampaignBuilderPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const [loading, setLoading] = useState(false);
  const [F, setF] = useState({ title: '', desc: '', niche: '', budgetMin: '', budgetMax: '', slots: 5, urgent: false, status: 'live' });

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

  const submit = () => {
    if (!F.title || !F.desc || !F.budgetMin) { toast('Please fill all required fields', 'error'); return; }
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
    }, 1000);
  };

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ background: '#050505', padding: mob ? '120px 20px 60px' : '160px 20px 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.1), transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #10B981, #fff, #FF9431)' }} />
        
        <div style={W(800)}>
           <SH eyebrow="Deployment Center" title="Launch New Campaign" sub="Craft a compelling brief to attract Bharat's top creators." light center mb={0} />
        </div>
      </div>

      <div style={{ marginTop: -40 }}>
        <div style={W(800)}>
          <Card className="au" style={{ padding: mob ? '32px 24px' : '48px', background: '#fff' }}>
            <div className="ai" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
               
               <div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 900, color: '#111', marginBottom: 24 }}>Campaign Core Details</h3>
                  <Fld label="Campaign Title" value={F.title} onChange={e => upF('title', e.target.value)} placeholder="e.g. Summer Collection Launch 2026" required />
                  <Fld label="Creative Brief & Description" value={F.desc} onChange={e => upF('desc', e.target.value)} rows={6} placeholder="Describe your brand, the campaign goals, and what you expect from creators..." required />
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 24 }}>
                  <Fld label="Target Niche" value={F.niche} onChange={e => upF('niche', e.target.value)} options={['', 'Lifestyle', 'Fashion', 'Tech', 'Food', 'Beauty', 'Education', 'Finance', 'Travel']} />
                  <Fld label="Total Slots (Creators)" type="number" value={F.slots} onChange={e => upF('slots', e.target.value)} placeholder="5" />
               </div>

               <div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 900, color: '#111', marginBottom: 24 }}>Commercials & Urgency</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                     <Fld label="Min Budget per Creator (₹)" type="number" value={F.budgetMin} onChange={e => upF('budgetMin', e.target.value)} placeholder="5000" required />
                     <Fld label="Max Budget (₹)" type="number" value={F.budgetMax} onChange={e => upF('budgetMax', e.target.value)} placeholder="25000" />
                  </div>
                  
                  <div 
                    onClick={() => upF('urgent', !F.urgent)} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 12, 
                      padding: '20px', 
                      borderRadius: 20, 
                      background: F.urgent ? 'rgba(239,68,68,0.05)' : '#FAFAFA', 
                      border: `1px solid ${F.urgent ? 'rgba(239,68,68,0.2)' : 'rgba(0,0,0,0.05)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                     <div style={{ width: 24, height: 24, borderRadius: 6, border: '2px solid ' + (F.urgent ? '#EF4444' : '#ccc'), display: 'flex', alignItems: 'center', justifyContent: 'center', background: F.urgent ? '#EF4444' : 'transparent', color: '#fff' }}>
                        {F.urgent && '✓'}
                     </div>
                     <div>
                        <p style={{ fontSize: 16, fontWeight: 800, color: F.urgent ? '#EF4444' : '#111' }}>Urgent Requirement</p>
                        <p style={{ fontSize: 13, color: T.t3 }}>Mark this if you need content delivered within 7 days.</p>
                     </div>
                  </div>
               </div>

               <div style={{ marginTop: 24, paddingTop: 32, borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', gap: 16, flexDirection: mob ? 'column' : 'row' }}>
                  <Btn variant="outline" lg onClick={() => go('brand-dashboard')} style={{ flex: 1, borderRadius: 100 }}>Cancel</Btn>
                  <Btn lg loading={loading} onClick={submit} style={{ flex: 2, borderRadius: 100, height: 60, fontSize: 17 }}>Launch Campaign Now 🚀</Btn>
               </div>

            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
