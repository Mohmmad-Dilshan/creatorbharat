import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/core/context';
import { W, scrollToTop, LS, fmt } from '../../utils/helpers';
import { Btn, Empty, Bdg } from '@/components/common/Primitives';
import EliteHeader from '../../components/layout/EliteHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info, Trash2, X, Star, Activity, TrendingUp, DollarSign, Award, Target } from 'lucide-react';
import { SEED_CREATORS } from '../../data/seedData';

export default function ComparePage() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [creators, setCreators] = useState([]);
  
  useEffect(() => {
    // robust extraction: local storage + seed data fallback
    const localC = LS.get('cb_creators', []);
    const resolved = st.compared.map(id => {
      let found = localC.find(c => String(c.id) === String(id));
      if (!found) found = SEED_CREATORS.find(c => String(c.id) === String(id));
      return found;
    }).filter(Boolean);
    setCreators(resolved);
  }, [st.compared]);

  const go = (p, sel) => {
    if (sel) dsp({ t: 'GO', p, sel });
    if (p === 'creator-profile') {
      const creator = sel?.creator;
      navigate(`/creator/${creator?.handle || creator?.id || ''}`);
    } else {
      navigate(`/${p}`);
    }
    scrollToTop();
  };

  const removeCreator = (id) => {
    dsp({ t: 'COMPARE_TOGGLE', id });
  };

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
            sub={creators.length === 1 ? `You have selected ${creators[0].name}. Please add at least one more creator to compare.` : "Go back to the creators marketplace and select 'Compare' on multiple profiles."}
            ctaLabel="Browse Creators" 
            onCta={() => go('creators')} 
          />
        </div>
      </div>
    );
  }

  const fields = [
    { 
      group: 'Core Metrics',
      items: [
        { label: 'Elite Trust Score', icon: <Award size={16}/>, getValue: c => c.score || fmt.score(c), key: 'score', desc: 'Weighted platform reputation', format: 'number' },
        { label: 'Follower Base', icon: <Target size={16}/>, getValue: c => c.followers, key: 'followers', desc: 'Total cross-platform reach', format: 'abbreviated' },
        { label: 'Engagement Rate', icon: <Activity size={16}/>, getValue: c => c.er || 4.2, key: 'er', desc: 'Average interaction per post', format: 'percent' },
        { label: 'Base Rate', icon: <DollarSign size={16}/>, getValue: c => c.rateMin, key: 'rateMin', desc: 'Starting collaboration fee', format: 'currency' }
      ]
    },
    {
      group: 'Demographics & Niche',
      items: [
        { label: 'Primary Location', icon: <Info size={16}/>, getValue: c => c.city || 'Bharat', key: 'city', desc: 'Base geographic influence', format: 'string' },
        { label: 'Languages', icon: <Info size={16}/>, getValue: c => (c.languages || ['Hindi']).join(', '), key: 'langs', desc: 'Content delivery languages', format: 'string' },
        { label: 'Main Categories', icon: <Star size={16}/>, getValue: c => Array.isArray(c.niche) ? c.niche.join(', ') : c.niche, key: 'niche', desc: 'Content pillars', format: 'badges' }
      ]
    }
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

  const formatValue = (val, type) => {
    if (val == null) return 'N/A';
    if (type === 'abbreviated') return fmt.num(val);
    if (type === 'percent') return `${Number(val).toFixed(1)}%`;
    if (type === 'currency') return fmt.inr(val);
    return val;
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
           <Btn variant="white" onClick={() => dsp({ t: 'CLEAR_COMPARE' })} style={{ borderRadius: 100, padding: '12px 32px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <Trash2 size={16} style={{ marginRight: 8 }} /> Clear All Selections
           </Btn>
        </div>
      </EliteHeader>

      <div style={{ marginTop: -80, position: 'relative', zIndex: 10 }}>
        <div style={W(1200)}>
          <div style={{ overflowX: 'auto', padding: '0 20px', paddingBottom: 40 }}>
            <div style={{ minWidth: 900, background: '#fff', borderRadius: 32, boxShadow: '0 40px 100px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ position: 'sticky', top: 0, zIndex: 50, background: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                  <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                    <th style={{ width: 280, padding: '40px 32px', textAlign: 'left', background: '#FAFAFA' }}>
                      <p style={{ fontSize: 11, fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 8 }}>COMPARISON GRID</p>
                      <h4 style={{ fontSize: 22, fontWeight: 950, color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>Creator Profiles</h4>
                    </th>
                    <AnimatePresence>
                      {creators.map(c => (
                        <th key={c.id} style={{ padding: '40px 32px', textAlign: 'center', minWidth: 240, position: 'relative' }}>
                          <button 
                            onClick={() => removeCreator(c.id)}
                            style={{ position: 'absolute', top: 20, right: 20, background: '#f1f5f9', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b', transition: 'all 0.2s' }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.color = '#ef4444'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#64748b'; }}
                            title="Remove from comparison"
                          >
                            <X size={16} strokeWidth={3} />
                          </button>
                          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                            <div style={{ position: 'relative' }}>
                              <div style={{ padding: 4, borderRadius: 36, background: (c.score || 90) > 90 ? 'linear-gradient(135deg, #FF9431, #f97316)' : '#e2e8f0' }}>
                                <img src={c.photo || c.avatarUrl || c.profile_pic || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=FF9431&color=fff`} style={{ width: 110, height: 110, borderRadius: 32, objectFit: 'cover', border: '4px solid #fff' }} alt="" />
                              </div>
                              {c.verified && <div style={{ position: 'absolute', bottom: -5, right: -5, background: '#10B981', color: '#fff', padding: 6, borderRadius: '50%', border: '4px solid #fff', boxShadow: '0 4px 10px rgba(16,185,129,0.3)' }}><Check size={14} strokeWidth={4} /></div>}
                            </div>
                            <div>
                              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 950, color: '#0f172a', marginBottom: 4 }}>{c.name}</h3>
                              <p style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>@{c.handle || c.slug || 'creator'}</p>
                            </div>
                            <Btn onClick={() => go('creator-profile', { creator: c })} style={{ borderRadius: 100, height: 40, fontSize: 13, fontWeight: 800, padding: '0 24px' }}>
                               View Full Profile
                            </Btn>
                          </motion.div>
                        </th>
                      ))}
                    </AnimatePresence>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((group, gIdx) => (
                    <React.Fragment key={group.group}>
                      {/* Group Header */}
                      <tr>
                        <td colSpan={creators.length + 1} style={{ padding: '24px 32px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', borderTop: gIdx > 0 ? '1px solid #e2e8f0' : 'none' }}>
                          <h5 style={{ fontSize: 14, fontWeight: 900, color: '#475569', textTransform: 'uppercase', letterSpacing: '1px' }}>{group.group}</h5>
                        </td>
                      </tr>
                      {/* Group Items */}
                      {group.items.map((f, rowIdx) => {
                        const values = creators.map(c => f.getValue(c));
                        const bestValue = getBest(f.key, values);
                        
                        return (
                          <tr key={f.key} style={{ borderBottom: rowIdx === group.items.length - 1 ? 'none' : '1px solid #f1f5f9', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#fafafa'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                            <td style={{ padding: '32px', background: '#FAFAFA' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                                <div style={{ color: '#FF9431' }}>{f.icon}</div>
                                <span style={{ fontSize: 15, fontWeight: 900, color: '#0f172a' }}>{f.label}</span>
                              </div>
                              <p style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>{f.desc}</p>
                            </td>
                            {creators.map((c) => {
                              const rawVal = f.getValue(c);
                              const isBest = bestValue !== null && (Number.parseFloat(rawVal) === bestValue || rawVal === bestValue);
                              
                              return (
                                <td key={c.id} style={{ padding: '32px', textAlign: 'center', position: 'relative' }}>
                                  {isBest && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: 3, background: '#10B981', borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }} />}
                                  
                                  <motion.div 
                                    initial={isBest ? { scale: 0.95, opacity: 0 } : false}
                                    animate={{ scale: 1, opacity: 1 }}
                                    style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}
                                  >
                                    {f.format === 'badges' ? (
                                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
                                        {String(rawVal).split(',').map(b => (
                                          <span key={b} style={{ padding: '6px 12px', background: '#f1f5f9', color: '#475569', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>{b.trim()}</span>
                                        ))}
                                      </div>
                                    ) : (
                                      <span style={{ fontSize: 20, fontWeight: 950, color: isBest ? '#10B981' : '#0f172a' }}>
                                        {formatValue(rawVal, f.format)}
                                      </span>
                                    )}
                                    
                                    {isBest && f.format !== 'string' && f.format !== 'badges' && (
                                      <div style={{ marginTop: 12 }}>
                                        <Bdg sm color="green" style={{ padding: '4px 12px', background: '#ecfdf5', border: '1px solid #10b98130' }}>TOP CHOICE</Bdg>
                                      </div>
                                    )}
                                  </motion.div>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  ))}
                  
                  {/* Action Row */}
                  <tr style={{ background: '#f8fafc', borderTop: '2px solid #e2e8f0' }}>
                    <td style={{ padding: '40px 32px' }}>
                      <p style={{ fontSize: 16, fontWeight: 900, color: '#0f172a' }}>Ready to proceed?</p>
                      <p style={{ fontSize: 13, color: '#64748b', marginTop: 4, fontWeight: 600 }}>Move forward with your chosen creator.</p>
                    </td>
                    {creators.map(c => (
                      <td key={c.id} style={{ padding: '40px 32px', textAlign: 'center' }}>
                         <Btn full onClick={() => go('creator-profile', { creator: c })} style={{ borderRadius: 16, height: 56, fontSize: 15, fontWeight: 900, background: '#0f172a', color: '#fff', border: 'none', boxShadow: '0 10px 25px rgba(15,23,42,0.2)' }}>
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
