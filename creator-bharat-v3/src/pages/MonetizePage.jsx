import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop } from '../theme';
import { Btn, SH, Bdg } from '../components/Primitives';

export default function MonetizePage() {
  const { dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const go = (p) => { dsp({ t: 'GO', p }); scrollToTop(); };

  return (
    <div style={{ background: '#0F172A', color: '#fff', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Hero */}
      <section style={{ padding: mob ? '100px 20px 60px' : '140px 20px 100px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '30%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        <div style={{ ...W(900), textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Bdg color="green">Coming Soon</Bdg>
          <h1 className="au" style={{ fontSize: mob ? 48 : 72, fontWeight: 900, marginTop: 24, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Turn Your Influence <br />
            Into <span style={{ color: '#10B981' }}>Monthly Income.</span>
          </h1>
          <p className="au d1" style={{ fontSize: 18, color: '#94A3B8', marginTop: 24, maxWidth: 600, margin: '24px auto 40px' }}>
            We're building the first direct-monetization engine for Bharat's creators. Get exclusive access to brand sponsorships, subscription tools, and premium analytics.
          </p>
          <div className="au d2" style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Btn lg onClick={() => go('apply')} style={{ borderRadius: 100, background: '#10B981', color: '#fff' }}>Join Waitlist</Btn>
            <Btn lg variant="ghost" style={{ borderRadius: 100, color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }} onClick={() => go('pricing')}>View Pricing</Btn>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 20px', background: 'rgba(255,255,255,0.02)' }}>
        <div style={W()}>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { t: 'Direct Brand Deals', d: 'Skip the agencies. Get notified when brands like Nykaa or boAt want to work with you specifically.', i: '🏢' },
              { t: 'Rate Calculator', d: 'Know exactly how much to charge based on your real-time engagement and follower demographics.', i: '💰' },
              { t: 'Creator Score', d: 'Boost your visibility with our proprietary scoring system that ranks you based on content quality.', i: '📈' }
            ].map((f, i) => (
              <div key={i} style={{ padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: 32, marginBottom: 20 }}>{f.i}</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>{f.t}</h3>
                <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
