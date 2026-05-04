import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T } from '../theme';
import { W, scrollToTop, fmt } from '../utils/helpers';
import { SH, Card, Ring, Btn, Bdg, Bar } from '../components/Primitives';
import EliteHeader from '../components/layout/EliteHeader';

export default function CreatorScorePage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const go = (p) => { dsp({ t: 'GO', p }); scrollToTop(); };
  const c = st.creatorProfile;
  const score = c ? (c.score || fmt.score(c)) : 78;
  const tier = fmt.tier(score);
  const comp = c ? fmt.completeness(c) : { pct: 85, missing: ['Verify Phone', 'Add Portfolio Link'] };

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Elite Score Header */}
      <EliteHeader 
        eyebrow="Algorithmic Trust"
        title="Creator Score (CS)"
        sub="The industry-standard benchmark for measuring influence, reliability, and reach in Bharat."
        gradient="saffron"
        maxWidth={900}
      />

      <div style={{ padding: mob ? '40px 20px' : '80px 20px', background: '#FAFAFA' }}>
        <div style={W(1000)}>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '380px 1fr', gap: 40, alignItems: 'start' }}>
            
            <div style={{ position: mob ? 'static' : 'sticky', top: 120 }}>
              <Card className="au" style={{ padding: '48px 32px', textAlign: 'center', background: '#fff', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}>
                <p style={{ fontSize: 13, color: T.t4, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 32 }}>LIVE ANALYSIS</p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                   <Ring score={score} size={160} />
                </div>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, color: '#111', marginTop: 24, fontWeight: 900 }}>{c ? c.name : 'Sample Creator'}</h3>
                <div style={{ marginTop: 8 }}>
                   <Bdg color="yellow">{tier.label.toUpperCase()} TIER</Bdg>
                </div>
                
                <div style={{ background: '#F8FAFC', borderRadius: 24, padding: '24px', textAlign: 'left', marginTop: 32, border: '1px solid rgba(0,0,0,0.03)' }}>
                   <p style={{ fontSize: 13, fontWeight: 900, color: '#111', marginBottom: 16 }}>SCORE OPTIMIZATION</p>
                   {comp.missing.map(m => (
                      <div key={m} style={{ display: 'flex', gap: 10, fontSize: 13, color: T.t3, marginBottom: 10, fontWeight: 600 }}>
                         <span style={{ color: '#FF9431' }}>+</span> {m}
                      </div>
                   ))}
                </div>
                
                {!c && <Btn full lg onClick={() => go('apply')} style={{ marginTop: 32, borderRadius: 100 }}>Calculate My Real Score</Btn>}
              </Card>
            </div>

            <div className="ai" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <Card style={{ padding: '40px' }}>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 900, color: '#111', marginBottom: 20 }}>How We Calculate Trust</h3>
                <p style={{ fontSize: 16, color: T.t2, lineHeight: 1.8, marginBottom: 32, fontWeight: 500 }}>The CS Score is not a vanity metric. It uses proprietary AI to analyze your professional footprint across Bharat's digital ecosystem.</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { t: 'Profile Authority', d: 'Completeness of portfolio, niche clarity, and verification status.', v: 40, c: '#FF9431' },
                    { t: 'Engagement Velocity', d: 'Real-time interaction trends and audience sentiment analysis.', v: 30, c: '#10B981' },
                    { t: 'Milestone Achievement', d: 'Historical growth patterns and platform consistency.', v: 30, c: '#3B82F6' }
                  ].map(item => (
                    <div key={item.t} style={{ padding: '24px', background: '#FAFAFA', borderRadius: 24, border: '1px solid rgba(0,0,0,0.02)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <span style={{ fontWeight: 800, color: '#111', fontSize: 15 }}>{item.t}</span>
                        <span style={{ fontSize: 14, fontWeight: 900, color: item.c }}>{item.v}% Weight</span>
                      </div>
                      <Bar value={item.v} color={item.c} height={6} />
                      <p style={{ fontSize: 13, color: T.t3, lineHeight: 1.6, marginTop: 12, fontWeight: 500 }}>{item.d}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card style={{ padding: '40px' }}>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 900, color: '#111', marginBottom: 32 }}>Official Tiering System</h3>
                <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 20 }}>
                  {[
                    { t: 'Rising Star', r: '0-50', c: '#94A3B8', d: 'New talent building their initial footprint.' },
                    { t: 'Silver Elite', r: '51-75', c: '#64748B', d: 'Consistent content with verified stats.' },
                    { t: 'Gold Partner', r: '76-90', c: '#FF9431', d: 'High trust, reliable brand results.' },
                    { t: 'Platinum Pro', r: '91-100', c: '#111', d: 'Top 1% of Bharat\'s creator elite.' }
                  ].map(item => (
                    <div key={item.t} style={{ padding: '24px', borderRadius: 24, border: `2px solid ${item.c}10`, background: `${item.c}03` }}>
                      <p style={{ fontWeight: 900, color: item.c, fontSize: 18, fontFamily: "'Fraunces', serif" }}>{item.t}</p>
                      <p style={{ fontSize: 14, fontWeight: 900, color: '#111', margin: '6px 0' }}>{item.r} CS Points</p>
                      <p style={{ fontSize: 13, color: T.t3, lineHeight: 1.5, fontWeight: 500 }}>{item.d}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
