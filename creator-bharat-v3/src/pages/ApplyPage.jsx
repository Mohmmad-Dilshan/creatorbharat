import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop, fmt, LS, apiCall, CITIES, ALL_STATES, INDIA_STATES } from '../theme';
import { Btn, Fld, Bdg, Chip, SH } from '../components/Primitives';

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

  const NICHES = ['Travel', 'Lifestyle', 'Fashion', 'Beauty', 'Tech', 'Gaming', 'Food', 'Fitness', 'Education', 'Finance', 'Comedy', 'Art'];
  const PLATFORMS = ['Instagram', 'YouTube', 'Twitter', 'LinkedIn'];
  const SERVICES = ['Sponsored Posts', 'Reels', 'YouTube Videos', 'Stories', 'Product Reviews', 'Event Attendance'];

  const next = () => {
    if (step === 1) {
      if (!F.name || !F.email || !F.password || !F.city) { toast('Please fill all required fields', 'error'); return; }
      if (F.password !== F.confirm) { toast('Passwords do not match', 'error'); return; }
      if (F.password.length < 6) { toast('Password must be 6+ characters', 'error'); return; }
    }
    if (step === 2) { if (!F.niche.length || !F.platform.length || !F.followers) { toast('Niche, platform, and followers are required', 'error'); return; } }
    if (step === 3) { if (!F.rateMin) { toast('Please set your minimum rate', 'error'); return; } }
    setStep(s => s + 1); scrollToTop();
  };

  const submit = async () => {
    const handle = F.handle || fmt.handle(F.name);
    try {
      // Simulate or real register
      const data = await apiCall('/auth/register/creator', { method: 'POST', body: { ...F, handle } }).catch(() => ({
          user: { ...F, id: 'u-'+Date.now(), role: 'creator', score: 45 },
          token: 'mock-token'
      }));
      
      localStorage.setItem('cb_token', data.token);
      dsp({ t: 'LOGIN', u: data.user, role: 'creator' });
      dsp({ t: 'SET_CP', p: data.user });
      
      // Save to local storage for persistence in demo
      const existing = LS.get('cb_creators', []);
      LS.set('cb_creators', [...existing, { ...data.user, handle }]);
      
      toast(`Welcome to CreatorBharat! Your profile is live.`, 'success');
      dsp({ t: 'GO', p: 'dashboard' }); scrollToTop();
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  const steps = [
    ['Identity', 'Basic credentials'],
    ['Influence', 'Your niche & reach'],
    ['Commercials', 'Rates & services'],
    ['Review', 'Final preview']
  ];
  
  const article = step === 4 ? fmt.article({ ...F, handle: F.handle || fmt.handle(F.name) }) : null;

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: mob ? '1fr' : '480px 1fr', background: '#fff' }}>
      {/* Sidebar Onboarding */}
      {!mob && (
        <div style={{ background: '#050505', padding: '60px 48px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 100% 0%, rgba(255,148,49,0.1), transparent 70%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #FF9431, #fff, #128807)', opacity: 0.8 }} />
          
          <div style={{ marginBottom: 60, position: 'relative', zIndex: 2 }}>
             <h1 style={{ fontSize: 24, fontWeight: 900, color: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 40, height: 40, background: T.gd, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>CB</span>
                CreatorBharat
             </h1>
          </div>

          <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, color: '#fff', marginBottom: 16, fontWeight: 900, lineHeight: 1.2 }}>Join the Local Elite.</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 48 }}>India's first platform dedicated to creators from Tier 2 & 3 cities. Get discovered by national brands.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {steps.map(([t, d], i) => {
                const active = step === i + 1;
                const done = step > i + 1;
                return (
                  <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'center', opacity: active || done ? 1 : 0.3, transition: 'all 0.3s' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid ' + (done ? '#10B981' : active ? '#FF9431' : 'rgba(255,255,255,0.1)'), background: done ? '#10B981' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 14 }}>
                       {done ? '✓' : i + 1}
                    </div>
                    <div>
                       <p style={{ fontSize: 16, fontWeight: 700, color: active ? '#fff' : 'rgba(255,255,255,0.5)' }}>{t}</p>
                       {active && <p style={{ fontSize: 13, color: '#FF9431', marginTop: 2, fontWeight: 600 }}>{d}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div style={{ position: 'relative', zIndex: 2 }}>
             <div style={{ padding: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>"CreatorBharat helped me get my first deal from a Jaipur-based fashion brand. Highly recommended!"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
                   <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#ccc' }} />
                   <div>
                      <p style={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>Ananya Singh</p>
                      <p style={{ fontSize: 10, color: '#FF9431', fontWeight: 700 }}>Fashion Creator, Udaipur</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Form Area */}
      <div style={{ padding: mob ? '100px 24px 48px' : '80px 80px', overflowY: 'auto', background: '#fff' }}>
        <div style={{ maxWidth: 520 }}>
          {mob && (
            <div style={{ marginBottom: 32 }}>
               <h1 style={{ fontSize: 20, fontWeight: 900, color: '#111', marginBottom: 16 }}>Join CreatorBharat</h1>
               <div style={{ display: 'flex', gap: 6 }}>{steps.map((_, i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < step ? '#FF9431' : '#EEE' }} />)}</div>
            </div>
          )}
          
          <div className="au">
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, color: '#111', fontWeight: 900, marginBottom: 8 }}>{steps[step - 1][0]}</h2>
            <p style={{ fontSize: 15, color: T.t3, marginBottom: 40, fontWeight: 500 }}>{steps[step - 1][1]}</p>

            {step === 1 && (
              <div className="ai">
                <Fld label="Full Legal Name *" value={F.name} onChange={e => { upF('name', e.target.value); if (!F.handle) upF('handle', fmt.handle(e.target.value)) }} placeholder="e.g. Rahul Sharma" required />
                <Fld label="Unique Handle *" value={F.handle} onChange={e => upF('handle', fmt.handle(e.target.value))} placeholder="rahul-sharma" helper={`Profile Link: creatorbharat.in/c/${F.handle || 'your-handle'}`} required />
                <Fld label="Work Email *" type="email" value={F.email} onChange={e => upF('email', e.target.value)} placeholder="hello@rahul.com" required />
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16 }}>
                  <Fld label="Current City *" value={F.city} onChange={e => upF('city', e.target.value)} options={['', ...CITIES]} required />
                  <Fld label="State" value={F.state} onChange={e => upF('state', e.target.value)} placeholder="Rajasthan" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <Fld label="Set Password *" type="password" value={F.password} onChange={e => upF('password', e.target.value)} placeholder="••••••••" required />
                  <Fld label="Confirm *" type="password" value={F.confirm} onChange={e => upF('confirm', e.target.value)} placeholder="••••••••" required />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="ai">
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 800, color: '#111', marginBottom: 12 }}>Primary Niches *</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{NICHES.map(n => <Chip key={n} label={n} active={F.niche.includes(n)} onClick={() => toggleArr('niche', n)} />)}</div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 800, color: '#111', marginBottom: 12 }}>Active Platforms *</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{PLATFORMS.map(p => <Chip key={p} label={p} active={F.platform.includes(p)} onClick={() => toggleArr('platform', p)} />)}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <Fld label="Total Followers *" type="number" value={F.followers} onChange={e => upF('followers', e.target.value)} placeholder="50000" required />
                  <Fld label="Avg. Monthly Views" type="number" value={F.monthlyViews} onChange={e => upF('monthlyViews', e.target.value)} placeholder="200000" />
                </div>
                <Fld label="Short Professional Bio *" value={F.bio} onChange={e => upF('bio', e.target.value)} rows={4} placeholder="Briefly describe your content and audience..." required />
              </div>
            )}

            {step === 3 && (
              <div className="ai">
                <div style={{ background: 'rgba(16,185,129,0.05)', borderRadius: 20, padding: '24px', marginBottom: 32, border: '1px solid rgba(16,185,129,0.1)' }}>
                   <p style={{ fontSize: 14, color: '#10B981', fontWeight: 700, lineHeight: 1.5 }}>Setting transparent rates helps brands book you faster. You can always change these later.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <Fld label="Min Collab Rate (₹) *" type="number" value={F.rateMin} onChange={e => upF('rateMin', e.target.value)} placeholder="5000" required />
                  <Fld label="Max Collab Rate (₹)" type="number" value={F.rateMax} onChange={e => upF('rateMax', e.target.value)} placeholder="25000" />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 800, color: '#111', marginBottom: 12 }}>Services Offered</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{SERVICES.map(s => <Chip key={s} label={s} active={F.services.includes(s)} onClick={() => toggleArr('services', s)} />)}</div>
                </div>
              </div>
            )}

            {step === 4 && article && (
              <div className="ai">
                <div style={{ background: '#111', borderRadius: 24, padding: '24px', marginBottom: 24, color: '#fff' }}>
                   <p style={{ fontSize: 12, fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', marginBottom: 8 }}>Your Creator SEO Article</p>
                   <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 900, marginBottom: 12 }}>{article.title}</h3>
                   <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{article.p1.substring(0, 180)}...</p>
                </div>
                <div style={{ padding: '20px', background: T.bg2, borderRadius: 20, border: '1px solid rgba(0,0,0,0.05)' }}>
                   <p style={{ fontSize: 13, color: '#111', fontWeight: 800 }}>Confirm details:</p>
                   <p style={{ fontSize: 14, color: T.t3, marginTop: 8 }}>{F.name} • {F.niche.join(', ')} • {fmt.num(F.followers)} Followers</p>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
              {step > 1 && <Btn variant="outline" lg onClick={() => setStep(s => s - 1)} style={{ borderRadius: 100, padding: '16px 32px' }}>Back</Btn>}
              {step < 4 ? (
                <Btn full lg onClick={next} style={{ borderRadius: 100, background: '#111', color: '#fff', border: 'none' }}>Continue to Next Step</Btn>
              ) : (
                <Btn full lg onClick={submit} style={{ borderRadius: 100, background: T.gd, color: '#fff', border: 'none', boxShadow: '0 10px 30px rgba(255,148,49,0.3)' }}>Launch My Profile 🚀</Btn>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
