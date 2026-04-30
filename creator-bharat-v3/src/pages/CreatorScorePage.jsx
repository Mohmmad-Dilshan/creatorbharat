import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop, fmt } from '../theme';
import { SH, Card, Ring, Btn } from '../components/Primitives';

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
  const score = c ? (c.score || fmt.score(c)) : 85;
  const tier = fmt.tier(score);
  const comp = c ? fmt.completeness(c) : { pct: 0, missing: [] };

  return (
    <div style={{ background: '#fff' }}>
      <div style={{ background: T.n8, padding: mob ? '60px 20px' : '100px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.1) 0%, transparent 60%)' }} />
        <div style={W(800)}><SH eyebrow="Algorithms" title="Creator Score (CS)" sub="The industry standard for measuring creator influence in Bharat." light center mb={0} /></div>
      </div>

      <div style={{ padding: mob ? '40px 20px' : '80px 20px', background: T.bg2 }}>
        <div style={W(900)}>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1.5fr', gap: 32, alignItems: 'start' }}>
            <div style={{ position: 'sticky', top: 100 }}>
              <Card style={{ padding: 40, textAlign: 'center', background: '#fff', boxShadow: '0 10px 40px rgba(0,0,0,.05)' }}>
                <p style={{ fontSize: 12, color: T.t4, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 24 }}>Algorithm Output</p>
                <Ring score={score} size={140} />
                <h3 style={{ fontSize: 24, color: T.t1, marginTop: 20, fontWeight: 900 }}>{c ? c.name : 'Demo Creator'}</h3>
                <p style={{ fontSize: 15, color: T.t3, marginBottom: 24, fontWeight: 600 }}>{tier.label} Tier</p>
                
                {c && comp.missing.length > 0 && (
                  <div style={{ background: T.ga, borderRadius: 20, padding: 20, textAlign: 'left', border: `1px solid ${T.gab}` }}>
                    <p style={{ fontSize: 13, fontWeight: 900, color: T.gd, marginBottom: 12 }}>BOOST YOUR SCORE</p>
                    {comp.missing.map(m => <p key={m} style={{ fontSize: 13, color: T.t2, marginBottom: 6, display: 'flex', gap: 8 }}><span>•</span>{m}</p>)}
                  </div>
                )}
                
                {!c && <Btn full lg onClick={() => go('apply')} style={{ marginTop: 24, borderRadius: 14 }}>Calculate My Real Score</Btn>}
              </Card>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <Card style={{ padding: 32 }}>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: T.t1, marginBottom: 20 }}>How it works</h3>
                <p style={{ fontSize: 15, color: T.t2, lineHeight: 1.7, marginBottom: 24 }}>The CS Score is a dynamic metric that evaluates your professional standing as a creator. It is not just about followers; it is about how much brands can trust your results.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {[
                    { t: 'Profile Authority', d: 'Completeness of your portfolio, bio, and verified social links.', v: '40%' },
                    { t: 'Growth & Reach', d: 'Follower milestones across all platforms.', v: '30%' },
                    { t: 'Engagement Velocity', d: 'Interaction rates and audience sentiment analysis.', v: '30%' }
                  ].map(item => (
                    <div key={item.t} style={{ padding: '20px', background: T.bg2, borderRadius: 16, border: `1px solid ${T.bd}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontWeight: 800, color: T.t1 }}>{item.t}</span>
                        <span style={{ fontSize: 13, fontWeight: 900, color: T.gd }}>{item.v}</span>
                      </div>
                      <p style={{ fontSize: 13, color: T.t3, lineHeight: 1.5 }}>{item.d}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card style={{ padding: 32 }}>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: T.t1, marginBottom: 20 }}>Score Tiers</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[
                    { t: 'Rising', r: '0-50', c: '#94A3B8', d: 'Building foundational presence.' },
                    { t: 'Silver', r: '51-75', c: '#64748B', d: 'Established consistent content.' },
                    { t: 'Gold', r: '76-90', c: '#D97706', d: 'Strong engagement and brand trust.' },
                    { t: 'Platinum', r: '91-100', c: '#1E293B', d: 'Elite status with high ROI.' }
                  ].map(item => (
                    <div key={item.t} style={{ padding: 20, borderRadius: 20, border: `2px solid ${item.c}20`, background: `${item.c}05` }}>
                      <p style={{ fontWeight: 900, color: item.c, fontSize: 18 }}>{item.t}</p>
                      <p style={{ fontSize: 13, fontWeight: 800, color: T.t1, margin: '4px 0' }}>{item.r} Points</p>
                      <p style={{ fontSize: 12, color: T.t3, lineHeight: 1.4 }}>{item.d}</p>
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
