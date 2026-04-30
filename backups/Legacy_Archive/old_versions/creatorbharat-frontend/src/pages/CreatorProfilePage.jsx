import React, { useState } from 'react';
import { useApp } from '../context';
import { T, W, fmt, scrollToTop } from '../theme';
import { Btn, Bdg, Ring } from '../components/Primitives';

export default function CreatorProfilePage() {
  const { st, dsp } = useApp();
  const c = st.sel.creator;
  
  if (!c) {
    return (
      <div style={{ ...W(), padding: '120px 20px', textAlign: 'center' }}>
        <h2>Creator not found</h2>
        <Btn onClick={() => dsp({ t: 'GO', p: 'creators' })}>Browse Creators</Btn>
      </div>
    );
  }

  const score = c.score || fmt.score(c);
  const tier = fmt.tier(score);
  const niches = Array.isArray(c.niche) ? c.niche : [c.niche].filter(Boolean);

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh' }}>
      <div style={{ height: 300, background: T.n8, position: 'relative', overflow: 'hidden' }}>
        {c.coverUrl && <img src={c.coverUrl} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} alt="" />}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))' }} />
      </div>

      <div style={W()}>
        <div style={{ background: '#fff', borderRadius: 24, border: `1px solid ${T.bd}`, padding: 40, marginTop: -80, position: 'relative', zIndex: 10, boxShadow: T.sh3 }}>
          <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <img src={c.photo || c.avatarUrl} style={{ width: 140, height: 140, borderRadius: 32, objectFit: 'cover', border: '6px solid #fff', boxShadow: T.sh2 }} alt={c.name} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                {c.verified && <Bdg color="blue">Verified</Bdg>}
                <Bdg color={tier.bc}>{tier.label}</Bdg>
              </div>
              <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 36, fontWeight: 900, color: T.n8, marginBottom: 8 }}>{c.name}</h1>
              <p style={{ fontSize: 16, color: T.t3 }}>📍 {c.city}, {c.state} • {niches.join(', ')}</p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', background: T.bg2, borderRadius: 20 }}>
              <Ring score={score} size={100} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginTop: 40, paddingTop: 40, borderTop: `1px solid ${T.bd}` }}>
            {[
              { l: 'Followers', v: fmt.num(c.followers), i: '👥' },
              { l: 'Engagement', v: (c.er || 0) + '%', i: '📈' },
              { l: 'Avg Views', v: fmt.num(c.monthlyViews || 0), i: '👁' },
              { l: 'Starting From', v: fmt.inr(c.rateMin), i: '💰' }
            ].map(s => (
              <div key={s.l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{s.i}</div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 24, fontWeight: 900, color: T.n1 }}>{s.v}</div>
                <div style={{ fontSize: 12, color: T.t4, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em', marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40, paddingBottom: 100 }}>
          <div style={{ background: '#fff', padding: 40, borderRadius: 24, border: `1px solid ${T.bd}` }}>
            <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 24, fontWeight: 900, marginBottom: 20 }}>About</h3>
            <p style={{ fontSize: 16, color: T.t2, lineHeight: 1.8 }}>{c.bio}</p>
          </div>
          
          <div style={{ background: T.n8, padding: 32, borderRadius: 24, color: '#fff' }}>
            <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 20, fontWeight: 900, marginBottom: 20 }}>Book Collaboration</h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>Directly connect with {c.name.split(' ')[0]} for your brand campaign.</p>
            <Btn full lg onClick={() => dsp({ t: 'UI', v: { authModal: true } })}>Connect Now</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
