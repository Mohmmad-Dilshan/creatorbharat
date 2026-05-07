import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T } from '../theme';
import { W, scrollToTop, LS, fmt } from '../utils/helpers';
import { Btn, SH as Sh, Empty, Bdg } from '../components/Primitives';

export default function ComparePage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const go = (p, sel) => { dsp({ t: 'GO', p, sel }); scrollToTop(); };
  
  // Get creators from the compared list in state
  const allC = LS.get('cb_creators', []);
  const creators = st.compared.map(id => allC.find(c => c.id === id)).filter(Boolean);

  if (creators.length < 2) {
    return (
      <div style={{ ...W(), padding: '120px 20px', textAlign: 'center' }}>
        <Empty 
          icon="⚖️" 
          title="Comparison Bench Empty" 
          sub="At least 2 creators ko compare karne ke liye select karein. Search page par 'Compare' button use karein." 
          ctaLabel="Browse Creators" 
          onCta={() => go('creators')} 
        />
      </div>
    );
  }

  const fields = [
    ['Reach / Followers', c => fmt.num(c.followers), 'followers'],
    ['Engagement Rate', c => (c.er || 4.2).toFixed(1) + '%', 'er'],
    ['Creator Score', c => c.score || fmt.score(c), 'score'],
    ['Min Collaboration', c => fmt.inr(c.rateMin), 'rateMin'],
    ['Location', c => c.city, 'city'],
    ['Niches', c => (Array.isArray(c.niche) ? c.niche : [c.niche]).join(', '), 'niche']
  ];

  // Helper to find the "best" in a row
  const getBest = (fieldKey, values) => {
    if (['followers', 'er', 'score'].includes(fieldKey)) {
       return Math.max(...values.map(v => Number.parseFloat(v) || 0));
    }
    if (fieldKey === 'rateMin') {
       return Math.min(...values.map(v => Number.parseFloat(v) || 9999999));
    }
    return null;
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ background: '#050505', padding: mob ? '120px 20px 48px' : '160px 20px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,148,49,0.1), transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #FF9431, #fff, #128807)' }} />
        
        <div style={W()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
             <Sh eyebrow="Benchmarking" title="Side-by-Side Analysis" sub="Compare creator metrics and commercials to find the perfect fit for your campaign." light mb={0} />
             <Btn variant="white" onClick={() => dsp({ t: 'COMPARE_CLEAR' })}>Clear Bench</Btn>
          </div>
        </div>
      </div>

      <div style={{ padding: mob ? '40px 0' : '60px 0', overflowX: 'auto' }}>
        <div style={W()}>
          <div style={{ minWidth: 800, padding: '0 20px' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '12px 0' }}>
              <thead>
                <tr>
                  <th style={{ width: 200, padding: '24px', textAlign: 'left', background: '#FAFAFA', borderRadius: '24px 24px 0 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                     <span style={{ fontSize: 13, fontWeight: 800, color: T.t3, textTransform: 'uppercase' }}>Feature Comparison</span>
                  </th>
                  {creators.map(c => (
                    <th key={c.id} style={{ padding: '24px', background: '#fff', borderRadius: '24px 24px 0 0', border: '1.5px solid rgba(0,0,0,0.05)', borderBottom: 'none' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                        <img src={c.photo || c.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=FF9431&color=fff`} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid #fff', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }} alt="" />
                        <div>
                          <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 900, color: '#111', marginBottom: 4 }}>{c.name}</h3>
                          <Bdg sm color="blue">Verified</Bdg>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fields.map(([label, getValue, key], rowIdx) => {
                  const values = creators.map(c => getValue(c));
                  const bestValue = getBest(key, values);
                  
                  return (
                    <tr key={key}>
                      <td style={{ padding: '24px', background: '#FAFAFA', borderBottom: '1px solid rgba(0,0,0,0.03)', borderRight: '1px solid rgba(0,0,0,0.03)', fontWeight: 800, fontSize: 14, color: T.t2 }}>{label}</td>
                      {creators.map((c) => {
                        const val = getValue(c);
                        const isBest = bestValue !== null && (Number.parseFloat(val) === bestValue || val === bestValue);
                        return (
                          <td key={c.id} style={{ 
                            padding: '24px', 
                            textAlign: 'center', 
                            background: isBest ? 'rgba(16,185,129,0.02)' : '#fff', 
                            borderLeft: '1.5px solid rgba(0,0,0,0.05)', 
                            borderRight: '1.5px solid rgba(0,0,0,0.05)', 
                            borderBottom: rowIdx === fields.length - 1 ? '1.5px solid rgba(0,0,0,0.05)' : '1px solid rgba(0,0,0,0.03)',
                            borderRadius: rowIdx === fields.length - 1 ? '0 0 24px 24px' : '0'
                          }}>
                            <span style={{ fontSize: 16, fontWeight: 900, color: isBest ? '#10B981' : '#111' }}>{val}</span>
                            {isBest && <div style={{ fontSize: 10, fontWeight: 900, color: '#10B981', marginTop: 4 }}>BEST IN CLASS</div>}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
                {/* Final Row: CTA */}
                <tr>
                   <td style={{ padding: '24px' }}></td>
                   {creators.map(c => (
                     <td key={c.id} style={{ padding: '24px', textAlign: 'center' }}>
                        <Btn full onClick={() => go('creator-profile', { creator: c })}>Book Creator</Btn>
                     </td>
                   ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
