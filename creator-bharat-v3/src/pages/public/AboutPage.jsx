import React, { useState, useEffect } from 'react';
import { T } from '../../theme';
import { W } from '../../utils/helpers';
import { SH as Sh } from '../../components/Primitives';

export default function AboutPage() {
  const [mob, setMob] = useState(globalThis.innerWidth < 768);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);



  return (
    <div style={{ background: '#fff' }}>
      <div style={{ background: T.n8, padding: mob ? '100px 20px' : '160px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,148,49,0.2) 0%, transparent 70%)' }} />
        <div style={{ ...W(900), position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 14, fontWeight: 900, letterSpacing: '.2em', textTransform: 'uppercase', color: T.saffron, marginBottom: 24 }}>Our Vision</p>
          <h1 style={{ fontSize: mob ? 40 : 72, fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 32 }}>Chhote Creators Ki<br /><span style={{ background: T.gd, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Badi Awaaz</span></h1>
          <p style={{ fontSize: mob ? 18 : 22, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, maxWidth: 800, margin: '0 auto', fontWeight: 500 }}>Empowering Bharat's authentic voices. From Tier 2 towns to national recognition, we are building the definitive infrastructure for the next generation of influence.</p>
        </div>
      </div>

      <div style={{ padding: mob ? '80px 20px' : '120px 20px', background: '#fff' }}>
        <div style={W()}>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1.2fr', gap: 64, alignItems: 'center', marginBottom: 100 }}>
            <div>
              <Sh eyebrow="The Problem" title="Bridging the Gap" mb={32} />
              <p style={{ fontSize: 17, color: T.t2, lineHeight: 1.8, marginBottom: 24, fontWeight: 500 }}>India's creator economy is massive, but it is deeply unequal. While metro creators get all the attention, <strong>70% of Bharat's talent</strong> resides in smaller cities, creating content in regional languages for hyper-local audiences.</p>
              <p style={{ fontSize: 17, color: T.t2, lineHeight: 1.8, fontWeight: 500 }}>Brands want to reach these audiences but don't know how to find trusted, professional creators in cities like Bhilwara, Indore, or Kanpur. We are here to fix that.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {[
                { v: '2026', l: 'Founded in Bhilwara', i: '🏛️' },
                { v: '2,400+', l: 'Creators Verified', i: '💎' },
                { v: '340+', l: 'Brand Partners', i: '🤝' },
                { v: '50+', l: 'Cities Mapped', i: '📍' }
              ].map(item => (
                <div key={item.l} style={{ textAlign: 'center', padding: '40px 24px', background: T.bg2, borderRadius: 32, border: `1px solid ${T.bd}`, transition: 'all .3s' }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{item.i}</div>
                  <div style={{ fontSize: 36, fontWeight: 900, color: T.gd }}>{item.v}</div>
                  <div style={{ fontSize: 14, color: T.t3, fontWeight: 800, textTransform: 'uppercase', marginTop: 8 }}>{item.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', background: T.n8, borderRadius: 48, padding: mob ? '48px 24px' : '100px 48px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
            <Sh eyebrow="Values" title="What Drives Us" center light mb={64} />
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3,1fr)', gap: 40 }}>
              {[
                { t: 'Authenticity First', d: 'We prioritize real influence over vanity metrics. Every creator on our platform is verified for quality.' },
                { t: 'Hyper-Local Reach', d: 'We believe the future of marketing is local. We make it easy for brands to enter every corner of India.' },
                { t: 'Creator Prosperity', d: 'Our tools are designed to help creators professionalize and earn more.' }
              ].map(v => (
                <div key={v.t}>
                  <h4 style={{ fontSize: 24, fontWeight: 900, marginBottom: 16, color: T.gd }}>{v.t}</h4>
                  <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
