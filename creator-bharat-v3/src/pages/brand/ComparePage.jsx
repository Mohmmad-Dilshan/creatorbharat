import React from 'react';
import { useApp } from '../../context';
import { W, scrollToTop, LS, fmt } from '../../utils/helpers';
import { Btn, Empty, Bdg } from '../../components/Primitives';
import EliteHeader from '../../components/layout/EliteHeader';
import { motion } from 'framer-motion';
import { Check, Info, Trash2 } from 'lucide-react';

export default function ComparePage() {
  const { st, dsp } = useApp();

  const go = (p, sel) => { dsp({ t: 'GO', p, sel }); scrollToTop(); };
  
  const allC = LS.get('cb_creators', []);
  const creators = st.compared.map(id => allC.find(c => c.id === id)).filter(Boolean);

  if (creators.length < 2) {
    return (
      <div style={{ background: '#fff', minHeight: '100vh' }}>
        <EliteHeader 
          eyebrow="Benchmarking"
          title="Creator Comparison"
          sub="At least 2 creators are required for a side-by-side analysis."
          gradient="gold"
          compact
        />
        <div style={{ ...W(), padding: '80px 20px', textAlign: 'center' }}>
          <Empty 
            icon="⚖️" 
            title="Comparison Bench Empty" 
            sub="Go back to the creators marketplace and select 'Compare' on multiple profiles." 
            ctaLabel="Browse Creators" 
            onCta={() => go('creators')} 
          />
        </div>
      </div>
    );
  }

  const fields = [
    { label: 'Elite Trust Score', getValue: c => c.score || fmt.score(c), key: 'score', desc: 'Weighted influence metric' },
    { label: 'Follower Base', getValue: c => fmt.num(c.followers), key: 'followers', desc: 'Total cross-platform reach' },
    { label: 'Engagement Rate', getValue: c => (c.er || 4.2).toFixed(1) + '%', key: 'er', desc: 'Interaction per post' },
    { label: 'Base Rate', getValue: c => fmt.inr(c.rateMin), key: 'rateMin', desc: 'Starting collaboration fee' },
    { label: 'Primary Location', getValue: c => c.city || 'Bharat', key: 'city', desc: 'Base geographic influence' }
  ];

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
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: 100 }}>
      <EliteHeader 
        eyebrow="Precision Analysis"
        title={<>Side-by-Side <span style={{ background: 'linear-gradient(90deg, #FF9431 20%, #475569 50%, #138808 80%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Benchmarking</span></>}
        sub="The data-driven way to choose the perfect face for your brand's mission."
        gradient="dark"
      >
        <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
           <Btn variant="white" onClick={() => dsp({ t: 'COMPARE_CLEAR' })} style={{ borderRadius: 100, padding: '12px 32px' }}>
              <Trash2 size={16} style={{ marginRight: 8 }} /> Clear All Selections
           </Btn>
        </div>
      </EliteHeader>

      <div style={{ marginTop: -80, position: 'relative', zIndex: 10 }}>
        <div style={W(1200)}>
          <div style={{ overflowX: 'auto', padding: '0 20px', paddingBottom: 40 }}>
            <div style={{ minWidth: 800, background: '#fff', borderRadius: 32, boxShadow: '0 40px 100px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <th style={{ width: 300, padding: '40px 32px', textAlign: 'left', background: '#FAFAFA' }}>
                      <p style={{ fontSize: 11, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 8 }}>COMPARISON GRID</p>
                      <h4 style={{ fontSize: 18, fontWeight: 900, color: '#111', fontFamily: "'Outfit', sans-serif" }}>Creator Profiles</h4>
                    </th>
                    {creators.map(c => (
                      <th key={c.id} style={{ padding: '40px 32px', textAlign: 'center', minWidth: 200 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                          <div style={{ position: 'relative' }}>
                            <img src={c.photo || c.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=FF9431&color=fff`} style={{ width: 100, height: 100, borderRadius: 28, objectFit: 'cover', boxShadow: '0 15px 35px rgba(0,0,0,0.1)' }} alt="" />
                            {c.verified && <div style={{ position: 'absolute', bottom: -5, right: -5, background: '#10B981', color: '#fff', padding: 4, borderRadius: '50%', border: '3px solid #fff' }}><Check size={12} strokeWidth={4} /></div>}
                          </div>
                          <div>
                            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 900, color: '#111', marginBottom: 4 }}>{c.name}</h3>
                            <p style={{ fontSize: 12, color: '#94a3b8', fontWeight: 700 }}>@{c.handle || 'creator'}</p>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fields.map((f, rowIdx) => {
                    const values = creators.map(c => f.getValue(c));
                    const bestValue = getBest(f.key, values);
                    
                    return (
                      <tr key={f.key} style={{ borderBottom: rowIdx === fields.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                        <td style={{ padding: '32px', background: '#FAFAFA' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                            <span style={{ fontSize: 14, fontWeight: 900, color: '#111' }}>{f.label}</span>
                            <div title={f.desc} style={{ color: '#cbd5e1', cursor: 'help' }}><Info size={14} /></div>
                          </div>
                          <p style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>{f.desc}</p>
                        </td>
                        {creators.map((c) => {
                          const val = f.getValue(c);
                          const isBest = bestValue !== null && (Number.parseFloat(val) === bestValue || val === bestValue);
                          return (
                            <td key={c.id} style={{ padding: '32px', textAlign: 'center' }}>
                              <motion.div 
                                initial={isBest ? { scale: 0.9, opacity: 0 } : false}
                                animate={{ scale: 1, opacity: 1 }}
                                style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}
                              >
                                <span style={{ fontSize: 18, fontWeight: 900, color: isBest ? '#10B981' : '#111' }}>{val}</span>
                                {isBest && (
                                  <div style={{ marginTop: 8 }}>
                                    <Bdg sm color="green">TOP PERFORMER</Bdg>
                                  </div>
                                )}
                              </motion.div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                  
                  {/* Action Row */}
                  <tr style={{ background: '#f8fafc' }}>
                    <td style={{ padding: '40px 32px' }}>
                      <p style={{ fontSize: 14, fontWeight: 900, color: '#111' }}>Ready to proceed?</p>
                    </td>
                    {creators.map(c => (
                      <td key={c.id} style={{ padding: '40px 32px', textAlign: 'center' }}>
                         <Btn full onClick={() => go('creator-profile', { creator: c })} style={{ borderRadius: 12, height: 48, fontSize: 13, fontWeight: 900 }}>
                            Secure Booking
                         </Btn>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
