import React, { useState, useEffect } from 'react';
import { useApp } from '@/core/context';
import { fmt } from '../../utils/helpers';
import { Card, Ring, Btn, Bdg, Bar } from '@/components/common/Primitives';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Zap, 
  Target, 
  TrendingUp, 
  Info,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export default function CreatorScorePage() {
  const { st } = useApp();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const c = st.creatorProfile;
  const score = c ? (c.score || fmt.score(c)) : 78;
  const tier = fmt.tier(score);
  const comp = c ? fmt.completeness(c) : { pct: 85, missing: ['Verify Phone', 'Add Portfolio Link'] };

  const metrics = [
    { 
      t: 'Profile Authority', 
      d: 'Completeness of portfolio, niche clarity, and verification status.', 
      v: 88, 
      c: '#FF9431', 
      i: ShieldCheck,
      desc: 'Based on your 100% verified documentation and consistent niche posting.'
    },
    { 
      t: 'Engagement Velocity', 
      d: 'Real-time interaction trends and audience sentiment analysis.', 
      v: 72, 
      c: '#10B981', 
      i: Zap,
      desc: 'Your average engagement rate is 4.2%, which is 1.5x higher than category average.'
    },
    { 
      t: 'Milestone Achievement', 
      d: 'Historical growth patterns and platform consistency.', 
      v: 65, 
      c: '#3B82F6', 
      i: Target,
      desc: 'You have completed 12 brand missions with a 4.9/5 creator rating.'
    }
  ];

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* SaaS Style Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 800, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>Algorithmic Reputation</p>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: '#111', fontFamily: "'Outfit', sans-serif" }}>Creator Insights (CS)</h1>
            <p style={{ fontSize: 15, color: '#64748b', marginTop: 4, fontWeight: 500 }}>The industry-standard benchmark for Bharat's digital influence.</p>
          </div>
          <Btn variant="outline" style={{ borderRadius: 12, fontSize: 12, fontWeight: 800 }}>
            <Info size={14} style={{ marginRight: 8 }} /> Download Score Certificate
          </Btn>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1.8fr', gap: 32 }}>
        {/* Left Column: The Big Score */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Card style={{ padding: '48px 32px', textAlign: 'center', background: '#fff', borderRadius: 32, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, background: '#FF9431', borderRadius: '50%', opacity: 0.05, filter: 'blur(30px)' }} />
            
            <p style={{ fontSize: 11, color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 32 }}>CURRENT STANDING</p>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
               <Ring score={score} size={180} strokeWidth={14} />
            </div>
            
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, color: '#111', fontWeight: 900 }}>{c ? c.name : 'Elite Creator'}</h3>
            <div style={{ marginTop: 12 }}>
               <Bdg color="saffron" lg>{tier.label.toUpperCase()} TIER</Bdg>
            </div>

            <div style={{ marginTop: 40, padding: '24px', background: '#f8fafc', borderRadius: 24, textAlign: 'left', border: '1px solid rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <TrendingUp size={16} color="#10B981" />
                <span style={{ fontSize: 13, fontWeight: 800, color: '#10B981' }}>+4 points this month</span>
              </div>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>Your score is in the <strong>top 5%</strong> of creators in your category. Keep up the high engagement!</p>
            </div>
          </Card>

          {/* Critical Actions Card */}
          <Card style={{ padding: '32px', background: '#fff', borderRadius: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <AlertCircle size={20} color="#FF9431" />
              <h3 style={{ fontSize: 16, fontWeight: 900, fontFamily: "'Outfit', sans-serif" }}>Boost Your Score</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {comp.missing.map((m) => (
                <button 
                  key={m}
                  style={{ 
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', 
                    background: '#FAFAFA', border: '1px solid rgba(0,0,0,0.02)', borderRadius: 16, cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                  onMouseLeave={e => e.currentTarget.style.background = '#FAFAFA'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF9431' }} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{m}</span>
                  </div>
                  <ChevronRight size={14} color="#94a3b8" />
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Detailed Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Card style={{ padding: '40px', background: '#fff', borderRadius: 32 }}>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 900, color: '#111', marginBottom: 24 }}>Reputation Breakdown</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {metrics.map((m, i) => (
                <motion.div 
                  key={m.t}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{ padding: '24px', background: '#f8fafc', borderRadius: 24, border: '1px solid rgba(0,0,0,0.02)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: m.c + '10', display: 'flex', alignItems: 'center', justifyContent: 'center', color: m.c }}>
                        <m.i size={20} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: 15, fontWeight: 800, color: '#111' }}>{m.t}</h4>
                        <p style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>Algorithm Weight: {i === 0 ? '40%' : '30%'}</p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: 20, fontWeight: 900, color: m.c }}>{m.v}/100</span>
                    </div>
                  </div>
                  
                  <Bar value={m.v} color={m.c} height={8} />
                  <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, marginTop: 16, fontWeight: 500 }}>{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </Card>

          <Card style={{ padding: '40px', background: '#111', color: '#fff', borderRadius: 32, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, background: '#FF9431', borderRadius: '50%', opacity: 0.1, filter: 'blur(50px)' }} />
            
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 900, marginBottom: 24, position: 'relative', zIndex: 2 }}>Official Tiering System</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 16, position: 'relative', zIndex: 2 }}>
              {[
                { t: 'Rising Star', r: '0-50', c: '#94A3B8', d: 'New talent building their initial footprint.' },
                { t: 'Silver Elite', r: '51-75', c: '#64748B', d: 'Consistent content with verified stats.' },
                { t: 'Gold Partner', r: '76-90', c: '#FF9431', d: 'High trust, reliable brand results.' },
                { t: 'Platinum Pro', r: '91-100', c: '#FFD700', d: 'Top 1% of Bharat\'s creator elite.' }
              ].map(item => (
                <div key={item.t} style={{ padding: '20px', borderRadius: 20, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <p style={{ fontWeight: 900, color: item.c, fontSize: 15, fontFamily: "'Outfit', sans-serif" }}>{item.t}</p>
                    <Bdg color="white" sm>{item.r}</Bdg>
                  </div>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, fontWeight: 500 }}>{item.d}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
