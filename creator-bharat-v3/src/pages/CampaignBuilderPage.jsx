import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop, LS, Auth, fmt } from '../theme';
import { Btn, Card, Fld, Chip, Bdg, Empty } from '../components/Primitives';

export default function CampaignBuilderPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [F, setF] = useState({ title: '', niche: [], goal: '', platform: [], description: '', minFollowers: '', budgetMin: '', budgetMax: '', slots: 5, deadline: '', deliverables: [] });

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const upF = (k, v) => setF(p => ({ ...p, [k]: v }));
  const toggleArr = (k, v) => setF(p => ({ ...p, [k]: p[k].includes(v) ? p[k].filter(x => x !== v) : [...p[k], v] }));
  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type, msg } });
  const go = (p) => { dsp({ t: 'GO', p }); scrollToTop(); };

  if (!st.user || st.role !== 'brand') return <div style={{ ...W(), padding: '80px 20px' }}><Empty icon="🔒" title="Brand login required" ctaLabel="Register" onCta={() => go('brand-register')} /></div>;

  const NICHES = ['Travel', 'Lifestyle', 'Fashion', 'Beauty', 'Tech', 'Gaming', 'Food', 'Fitness', 'Education'];
  const PLATFORMS = ['Instagram', 'YouTube', 'Twitter', 'LinkedIn'];
  const DELIVERABLES = ['Instagram Reels', 'Stories', 'Static Posts', 'YouTube Video', 'YouTube Shorts'];

  const next = () => {
    if (step === 1 && (!F.title || !F.niche.length || !F.platform.length)) { toast('Fill title, niche and platform', 'error'); return; }
    if (step === 2 && (!F.budgetMin || !F.budgetMax || !F.deadline)) { toast('Fill budget and deadline', 'error'); return; }
    if (step === 3 && !F.deliverables.length) { toast('Add deliverables', 'error'); return; }
    setStep(s => s + 1); scrollToTop();
  };

  const saveCampaign = () => {
    const camp = { ...F, id: 'cp-' + Date.now(), brandEmail: st.user.email, brand: Auth.getBrand(st.user.email)?.companyName || st.user.name, status: 'live', createdAt: new Date().toISOString() };
    LS.push('cb_campaigns', camp);
    setDone(true);
    toast('Campaign live!', 'success');
  };

  const steps = [['Basics', 'Title, niche'], ['Budget', 'Fees, schedule'], ['Deliverables', 'Creator tasks'], ['Review', '₹49 listing']];

  return (
    <div style={{ background: '#fff', minHeight: '80vh' }}>
      {done ? (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <div style={{ fontSize: 60, marginBottom: 20 }}>🎉</div>
          <h2 style={{ fontSize: 28, color: T.n8, marginBottom: 12 }}>Campaign is Live!</h2>
          <Btn onClick={() => go('brand-dashboard')}>Go to Dashboard</Btn>
        </div>
      ) : (
        <div style={{ padding: mob ? '24px 20px' : '40px 20px' }}>
          <div style={W(640)}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>{steps.map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i < step ? T.gd : T.bg3 }} />)}</div>
            <h2 style={{ fontSize: 22, color: T.n8, marginBottom: 6 }}>{steps[step - 1][0]}</h2>
            <p style={{ fontSize: 14, color: T.t3, marginBottom: 28 }}>Step {step} of 4</p>
            
            {step === 1 && (
              <div>
                <Fld label="Campaign Title *" value={F.title} onChange={e => upF('title', e.target.value)} placeholder="Diwali Fashion" required />
                <div style={{ marginBottom: 14 }}><label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: T.t2, marginBottom: 8, textTransform: 'uppercase' }}>Niche *</label><div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{NICHES.map(n => <Chip key={n} label={n} active={F.niche.includes(n)} onClick={() => toggleArr('niche', n)} />)}</div></div>
                <div style={{ marginBottom: 14 }}><label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: T.t2, marginBottom: 8, textTransform: 'uppercase' }}>Platform *</label><div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{PLATFORMS.map(p => <Chip key={p} label={p} active={F.platform.includes(p)} onClick={() => toggleArr('platform', p)} />)}</div></div>
              </div>
            )}

            {step === 2 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Fld label="Min Budget ₹ *" type="number" value={F.budgetMin} onChange={e => upF('budgetMin', e.target.value)} placeholder="20000" required />
                <Fld label="Max Budget ₹ *" type="number" value={F.budgetMax} onChange={e => upF('budgetMax', e.target.value)} placeholder="60000" required />
                <Fld label="Deadline *" type="date" value={F.deadline} onChange={e => upF('deadline', e.target.value)} required />
                <Fld label="Creator Slots" type="number" value={F.slots} onChange={e => upF('slots', Number(e.target.value))} />
              </div>
            )}

            {step === 3 && (
              <div style={{ marginBottom: 14 }}><label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: T.t2, marginBottom: 8, textTransform: 'uppercase' }}>Deliverables *</label><div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{DELIVERABLES.map(d => <Chip key={d} label={d} active={F.deliverables.includes(d)} onClick={() => toggleArr('deliverables', d)} />)}</div></div>
            )}

            {step === 4 && (
              <div>
                <Card style={{ padding: '22px', marginBottom: 20 }}>
                  <h3 style={{ fontSize: 18, color: T.n8, marginBottom: 16 }}>Campaign Summary</h3>
                  <p style={{ fontSize: 14, color: T.t2 }}>{F.title} • {F.niche.join(', ')}</p>
                  <p style={{ fontSize: 14, color: T.t2 }}>Budget: ₹{F.budgetMin} - ₹{F.budgetMax}</p>
                </Card>
                <div style={{ background: T.ga, borderRadius: 14, padding: '20px', marginBottom: 20, textAlign: 'center' }}>
                  <p style={{ fontSize: 28, fontWeight: 900, color: T.gd }}>₹49</p>
                  <p style={{ fontSize: 14, color: T.n8, fontWeight: 600 }}>One-time listing fee</p>
                </div>
                <Btn full lg onClick={saveCampaign}>Pay ₹49 & Launch</Btn>
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {step > 1 && <Btn variant="ghost" onClick={() => setStep(s => s - 1)}>Back</Btn>}
              {step < 4 && <Btn full lg onClick={next}>Continue →</Btn>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
