import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop, fmt, LS, apiCall, CITIES } from '../theme';
import { Btn, Fld, Bdg, Chip } from '../components/Primitives';

export default function ApplyPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const [step, setStep] = useState(1);
  const [F, setF] = useState({ name: '', handle: '', email: '', password: '', confirm: '', phone: '', city: '', state: '', niche: [], platform: [], followers: '', er: '', monthlyViews: '', bio: '', instagram: '', youtube: '', rateMin: '', rateMax: '', services: [], languages: [], photo: null });

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const upF = (k, v) => setF(p => ({ ...p, [k]: v }));
  const toggleArr = (k, v) => setF(p => ({ ...p, [k]: p[k].includes(v) ? p[k].filter(x => x !== v) : [...p[k], v] }));
  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type, msg } });

  const NICHES = ['Travel', 'Lifestyle', 'Fashion', 'Beauty', 'Tech', 'Gaming', 'Food', 'Cooking', 'Fitness', 'Education', 'Finance', 'Entertainment', 'Comedy', 'Music', 'Art', 'Photography'];
  const PLATFORMS = ['Instagram', 'YouTube', 'Twitter', 'LinkedIn'];
  const SERVICES = ['Sponsored Posts', 'Instagram Reels', 'YouTube Videos', 'Stories', 'Unboxing', 'Product Reviews', 'GRWM', 'Travel Vlogs', 'Tech Reviews', 'Recipe Videos', 'Food Photography'];
  const LANGUAGES = ['Hindi', 'English', 'Tamil', 'Telugu', 'Marathi', 'Bengali', 'Kannada', 'Malayalam', 'Punjabi'];

  const next = () => {
    if (step === 1) {
      if (!F.name || !F.email || !F.password || !F.city) { toast('Fill all required fields', 'error'); return; }
      if (F.password !== F.confirm) { toast('Passwords do not match', 'error'); return; }
      if (F.password.length < 6) { toast('Password must be 6+ characters', 'error'); return; }
    }
    if (step === 2) { if (!F.niche.length || !F.platform.length || !F.followers) { toast('Fill niche, platform and followers', 'error'); return; } }
    if (step === 3) { if (!F.rateMin) { toast('Set your minimum rate', 'error'); return; } }
    setStep(s => s + 1); scrollToTop();
  };

  const submit = async () => {
    const handle = F.handle || fmt.handle(F.name);
    try {
      const data = await apiCall('/auth/register/creator', { method: 'POST', body: { ...F, handle } });
      localStorage.setItem('cb_token', data.token);
      dsp({ t: 'LOGIN', u: data.user, role: 'creator' });
      dsp({ t: 'SET_CP', p: data.user });
      toast(`Welcome to CreatorBharat! Your profile is live.`, 'success');
      dsp({ t: 'GO', p: 'dashboard' }); scrollToTop();
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  const steps = [['Basic Info', 'Name, email, city'], ['Creator Details', 'Niche, platform, stats'], ['Rates & Services', 'What you offer'], ['Preview', 'Review & launch']];
  const article = step === 4 ? fmt.article({ ...F, handle: F.handle || fmt.handle(F.name) }) : null;

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: mob ? '1fr' : '400px 1fr', background: '#fff' }}>
      {!mob && (
        <div style={{ background: T.n9, padding: '48px 40px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 48 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: T.gd, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: '#fff' }}>CB</div>
            <span style={{ fontSize: 16, fontWeight: 900, color: '#fff' }}>Creator<span style={{ color: T.gd }}>Bharat</span></span>
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 28, color: '#fff', marginBottom: 12, lineHeight: 1.2 }}>Apni Creator Identity Banao</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,.55)', lineHeight: 1.7, marginBottom: 40 }}>Professional portfolio + Auto SEO article + Shareable link — Free</p>
            {steps.map(([t, d], i) => (
              <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 24, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: i < step - 1 ? '#10B981' : i === step - 1 ? T.gd : 'rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: '#fff', flexShrink: 0 }}>{i < step - 1 ? '✓' : i + 1}</div>
                <div><p style={{ fontSize: 13, fontWeight: 700, color: i === step - 1 ? '#fff' : 'rgba(255,255,255,.5)' }}>{t}</p><p style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', marginTop: 2 }}>{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{ padding: mob ? '32px 20px' : '48px 56px', overflowY: 'auto' }}>
        <div style={{ maxWidth: 480 }}>
          {mob && <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>{steps.map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i < step ? T.gd : T.bg3 }} />)}</div>}
          <h2 style={{ fontSize: 22, color: T.n8, marginBottom: 6 }}>{steps[step - 1][0]}</h2>
          <p style={{ fontSize: 14, color: T.t3, marginBottom: 28 }}>Step {step} of 4</p>

          {step === 1 && (
            <div>
              <Fld label="Full Name *" value={F.name} onChange={e => { upF('name', e.target.value); if (!F.handle) upF('handle', fmt.handle(e.target.value)) }} placeholder="Rahul Sharma" required />
              <Fld label="Creator Handle *" value={F.handle} onChange={e => upF('handle', fmt.handle(e.target.value))} placeholder="rahul-sharma" helper={`Your link: creatorbharat.in/c/${F.handle || 'your-handle'}`} required />
              <Fld label="Email *" type="email" value={F.email} onChange={e => upF('email', e.target.value)} placeholder="you@email.com" required />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Fld label="City *" value={F.city} onChange={e => upF('city', e.target.value)} options={['', ...CITIES]} required />
                <Fld label="State" value={F.state} onChange={e => upF('state', e.target.value)} placeholder="Rajasthan" />
              </div>
              <Fld label="Password *" type="password" value={F.password} onChange={e => upF('password', e.target.value)} placeholder="Min 6 characters" required />
              <Fld label="Confirm Password *" type="password" value={F.confirm} onChange={e => upF('confirm', e.target.value)} placeholder="Repeat password" required />
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: T.t2, marginBottom: 8, textTransform: 'uppercase' }}>Niche *</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{NICHES.map(n => <Chip key={n} label={n} active={F.niche.includes(n)} onClick={() => toggleArr('niche', n)} />)}</div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: T.t2, marginBottom: 8, textTransform: 'uppercase' }}>Platform *</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{PLATFORMS.map(p => <Chip key={p} label={p} active={F.platform.includes(p)} onClick={() => toggleArr('platform', p)} />)}</div>
              </div>
              <Fld label="Followers *" type="number" value={F.followers} onChange={e => upF('followers', e.target.value)} placeholder="e.g. 50000" required />
              <Fld label="Bio *" value={F.bio} onChange={e => upF('bio', e.target.value)} rows={4} placeholder="Tell brands about yourself..." required />
            </div>
          )}

          {step === 3 && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Fld label="Min Rate ₹ *" type="number" value={F.rateMin} onChange={e => upF('rateMin', e.target.value)} placeholder="e.g. 10000" required />
                <Fld label="Max Rate ₹" type="number" value={F.rateMax} onChange={e => upF('rateMax', e.target.value)} placeholder="e.g. 40000" />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: T.t2, marginBottom: 8, textTransform: 'uppercase' }}>Services</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{SERVICES.map(s => <Chip key={s} label={s} active={F.services.includes(s)} onClick={() => toggleArr('services', s)} />)}</div>
              </div>
            </div>
          )}

          {step === 4 && article && (
            <div>
              <div style={{ background: T.ga, border: `1px solid ${T.gab}`, borderRadius: 12, padding: '14px 18px', marginBottom: 20 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: T.gd, marginBottom: 4 }}>YOUR PROFILE LINK WILL BE:</p>
                <p style={{ fontSize: 14, fontFamily: 'monospace', color: T.n8, fontWeight: 600 }}>creatorbharat.in/c/{F.handle || fmt.handle(F.name)}</p>
              </div>
              <div style={{ background: T.bg2, borderRadius: 14, padding: '20px', marginBottom: 20, border: `1px solid ${T.bd}` }}>
                <Bdg sm color="blue">Auto-Generated Article Preview</Bdg>
                <h3 style={{ fontSize: 18, color: T.n8, margin: '12px 0 12px', lineHeight: 1.3 }}>{article.title}</h3>
                <p style={{ fontSize: 13, color: T.t2, lineHeight: 1.7 }}>{article.p1.substring(0, 200)}...</p>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            {step > 1 && <Btn variant="ghost" onClick={() => setStep(s => s - 1)}>Back</Btn>}
            {step < 4 ? <Btn full lg onClick={next}>Continue →</Btn> : <Btn full lg onClick={submit}>Launch My Profile 🚀</Btn>}
          </div>
        </div>
      </div>
    </div>
  );
}
