import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop, fmt } from '../theme';
import { Btn, SH, Card, Fld } from '../components/Primitives';

export default function RateCalcPage() {
  const { st, dsp } = useApp();
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
    const pmult = { Instagram: 1.0, YouTube: 1.8, LinkedIn: 1.4, Twitter: 0.6 }[F.platform] || 1;
    const nmult = { Finance: 1.6, Tech: 1.5, Fashion: 1.2, Travel: 1.1, Gaming: 1.3, Beauty: 1.2 }[F.niche] || 1.0;
    const ebonus = er >= 8 ? 1.4 : er >= 5 ? 1.2 : 1.0;
    const base = f * 0.01;
    const post = Math.round(base * pmult * nmult * ebonus / 100) * 100;
    setResult({ post, reel: Math.round(post * 1.5 / 100) * 100, story: Math.round(post * 0.4 / 100) * 100, video: Math.round(post * 2.5 / 100) * 100, base: Math.round(base), pmult, nmult, ebonus });
  };

  return (
    <div style={{ background: '#fff' }}>
      <div style={{ background: T.n8, padding: mob ? '60px 20px' : '100px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.1) 0%, transparent 60%)' }} />
        <div style={W(800)}><SH eyebrow="Analytics Tool" title="Rate Calculator" sub="Know your worth. Calculate fair market rates based on real-world data." light center mb={0} /></div>
      </div>

      <div style={{ padding: mob ? '40px 20px' : '80px 20px', background: T.bg2 }}>
        <div style={{ ...W(900), display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1.2fr', gap: 32, alignItems: 'start' }}>
          <Card style={{ padding: 32 }}>
            <h3 style={{ fontSize: 18, fontWeight: 900, color: T.t1, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>📊 Your Stats</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <Fld label="Platform" value={F.platform} onChange={e => upF('platform', e.target.value)} options={['Instagram', 'YouTube', 'LinkedIn', 'Twitter']} />
              <Fld label="Niche" value={F.niche} onChange={e => upF('niche', e.target.value)} options={['Lifestyle', 'Fashion', 'Tech', 'Gaming', 'Travel', 'Food', 'Finance', 'Beauty', 'Fitness', 'Education']} />
              <Fld label="Followers" type="number" value={F.followers} onChange={e => upF('followers', e.target.value)} placeholder="e.g. 50000" required />
              <Fld label="Eng. Rate %" type="number" value={F.er} onChange={e => upF('er', e.target.value)} placeholder="e.g. 4.5" required />
            </div>
            <Btn full lg onClick={calc} style={{ height: 56, borderRadius: 16, fontSize: 16 }}>Estimate My Rate 🚀</Btn>
          </Card>

          <div>
            {result ? (
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: T.t1, marginBottom: 24 }}>Estimated Earnings</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
                  {[
                    { l: 'Static Post', v: result.post, i: '📸' },
                    { l: 'Reel / Short', v: result.reel, i: '🎬' },
                    { l: 'Story (Set)', v: result.story, i: '📱' },
                    { l: 'Long Video', v: result.video, i: '📺' }
                  ].map(item => (
                    <Card key={item.l} style={{ padding: 24, textAlign: 'center', border: `1px solid ${T.bd}` }}>
                      <div style={{ fontSize: 24, marginBottom: 8 }}>{item.i}</div>
                      <div style={{ fontSize: 28, fontWeight: 900, color: T.gd }}>{fmt.inr(item.v)}</div>
                      <div style={{ fontSize: 12, color: T.t4, fontWeight: 800, textTransform: 'uppercase', marginTop: 4 }}>{item.l}</div>
                    </Card>
                  ))}
                </div>
                <Card style={{ padding: 32, background: T.n8, color: '#fff', textAlign: 'center' }}>
                  <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 12 }}>Ready to get these deals?</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 24 }}>Brands are searching for creators like you. Get listed and start earning.</p>
                  <Btn lg variant="primary" onClick={() => go('apply')} style={{ borderRadius: 14 }}>Create Professional Portfolio</Btn>
                </Card>
              </div>
            ) : (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, background: 'rgba(0,0,0,0.02)', borderRadius: 32, border: `2px dashed ${T.bd}`, textAlign: 'center' }}>
                <div style={{ fontSize: 64, marginBottom: 24, opacity: 0.2 }}>🧮</div>
                <h3 style={{ fontSize: 20, color: T.t3, fontWeight: 700 }}>Enter your stats to see the magic.</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
