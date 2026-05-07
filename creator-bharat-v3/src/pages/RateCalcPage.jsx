import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T } from '../theme';
import { W, scrollToTop, fmt } from '../utils/helpers';
import { Btn, SH as Sh, Card, Fld } from '../components/Primitives';

export default function RateCalcPage() {
  const { dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const [F, setF] = useState({ platform: 'Instagram', followers: '', niche: 'Lifestyle', er: '' });
  const [result, setResult] = useState(null);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const upF = (k, v) => setF(p => ({ ...p, [k]: v }));
  const go = (p) => { dsp({ t: 'GO', p }); scrollToTop(); };

  const calc = () => {
    const f = Number(F.followers) || 0, er = Number(F.er) || 0;
    if (!f || !er) { dsp({ t: 'TOAST', d: { type: 'error', msg: 'Enter followers and engagement rate' } }); return; }
    const pmult = { Instagram: 1, YouTube: 1.8, LinkedIn: 1.4, Twitter: 0.6 }[F.platform] || 1;
    const nmult = { Finance: 1.6, Tech: 1.5, Fashion: 1.2, Travel: 1.1, Gaming: 1.3, Beauty: 1.2 }[F.niche] || 1;
    
    let ebonus = 1;
    if (er >= 8) ebonus = 1.4;
    else if (er >= 5) ebonus = 1.2;
    const base = f * 0.01;
    const post = Math.round(base * pmult * nmult * ebonus / 100) * 100;
    setResult({ 
      post, 
      reel: Math.round(post * 1.5 / 100) * 100, 
      story: Math.round(post * 0.4 / 100) * 100, 
      video: Math.round(post * 2.5 / 100) * 100, 
      base: Math.round(base), 
      pmult, 
      nmult, 
      ebonus 
    });
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: '#050505', padding: mob ? '120px 20px 60px' : '160px 20px 100px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.1), transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #3B82F6, #fff, #128807)' }} />
        
        <div style={W(900)}>
           <Sh eyebrow="Commercial Intelligence" title="Predict Your Worth" sub="Use data-driven benchmarks to negotiate fair brand deals. No more under-quoting." light center mb={0} />
        </div>
      </div>

      <div style={{ padding: mob ? '40px 20px' : '80px 20px', background: '#FAFAFA' }}>
        <div style={{ ...W(1000), display: 'grid', gridTemplateColumns: mob ? '1fr' : '400px 1fr', gap: 40, alignItems: 'start' }}>
          
          <Card className="au" style={{ padding: '32px', background: '#fff' }}>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 900, color: '#111', marginBottom: 32 }}>Input Your Metrics</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <Fld label="Primary Platform" value={F.platform} onChange={e => upF('platform', e.target.value)} options={['Instagram', 'YouTube', 'LinkedIn', 'Twitter']} />
              <Fld label="Content Niche" value={F.niche} onChange={e => upF('niche', e.target.value)} options={['Lifestyle', 'Fashion', 'Tech', 'Gaming', 'Travel', 'Food', 'Finance', 'Beauty', 'Fitness', 'Education']} />
              <Fld label="Total Followers" type="number" value={F.followers} onChange={e => upF('followers', e.target.value)} placeholder="e.g. 50000" />
              <Fld label="Eng. Rate (%)" type="number" value={F.er} onChange={e => upF('er', e.target.value)} placeholder="e.g. 4.5" />
              
              <div style={{ marginTop: 12 }}>
                 <Btn full lg onClick={calc} style={{ height: 60, borderRadius: 100, fontSize: 16 }}>Calculate Rate 🚀</Btn>
              </div>
            </div>
          </Card>

          <div className="ai">
            {result ? (
              <div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 900, color: '#111', marginBottom: 32 }}>Estimated Market Rates</h3>
                <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 24, marginBottom: 48 }}>
                  {[
                    { l: 'Static Post', v: result.post, i: '📸', d: 'Standard feed photo with caption' },
                    { l: 'Reel / Short', v: result.reel, i: '🎬', d: '60s video with trending audio' },
                    { l: 'Story (Set of 3)', v: result.story, i: '📱', d: 'Series of stories with link' },
                    { l: 'Integration', v: result.video, i: '📺', d: 'In-depth review or vlog' }
                  ].map((item, i) => (
                    <div key={item.l} className={`au d${i+1}`} style={{ padding: '32px', background: '#fff', borderRadius: 32, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 10px 20px rgba(0,0,0,0.02)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                         <div style={{ width: 48, height: 48, borderRadius: 12, background: T.bg2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{item.i}</div>
                         <div style={{ fontSize: 32, fontWeight: 900, color: '#111' }}>{fmt.inr(item.v)}</div>
                      </div>
                      <p style={{ fontSize: 16, fontWeight: 800, color: '#111' }}>{item.l}</p>
                      <p style={{ fontSize: 13, color: T.t3, marginTop: 4, fontWeight: 600 }}>{item.d}</p>
                    </div>
                  ))}
                </div>
                
                <Card style={{ padding: '40px', background: '#111', color: '#fff', textAlign: 'center', borderRadius: 40, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: '#3B82F6', borderRadius: '50%', filter: 'blur(50px)', opacity: 0.3 }} />
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 900, marginBottom: 12 }}>Unlock These Deals.</h3>
                  <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>Aapka rate calculate ho gaya hai. Ab brands se seedha connect karein aur inhi rates par deals paayein.</p>
                  <Btn lg onClick={() => go('apply')} style={{ borderRadius: 100, padding: '18px 60px', background: '#fff', color: '#111', border: 'none' }}>Create Portfolio Now</Btn>
                </Card>
              </div>
            ) : (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 40px', background: 'rgba(0,0,0,0.01)', borderRadius: 40, border: `2px dashed rgba(0,0,0,0.05)`, textAlign: 'center' }}>
                <div style={{ fontSize: 80, marginBottom: 32, opacity: 0.1 }}>🧮</div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, color: T.t3, fontWeight: 900 }}>Ready to calculate?</h3>
                <p style={{ fontSize: 16, color: T.t4, marginTop: 12, maxWidth: 300 }}>Enter your statistics in the form to see your estimated market value.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
