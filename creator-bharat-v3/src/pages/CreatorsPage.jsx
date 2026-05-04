import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context';
import { T } from '../theme';
import { W, scrollToTop, fmt, LS, ALL_STATES, INDIA_STATES } from '../utils/helpers';
import { apiCall } from '../utils/api';
import { Btn, SH, Bdg, SkeletonCard, Empty } from '../components/Primitives';
import { CreatorCard } from '../components/Cards';
import EliteHeader from '../components/layout/EliteHeader';
import IndiaMap3D from '../components/IndiaMap3D/IndiaMap3D';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const NICHES = ['Influencer', 'YouTuber', 'Content Creator', 'Vlogger', 'Lifestyle', 'Tech', 'Fashion', 'Beauty', 'Gaming', 'Finance', 'Travel', 'Comedy', 'Educational', 'Music', 'Fitness', 'Food'];
const PLATFORMS = ['Instagram', 'YouTube', 'Twitter', 'LinkedIn', 'Snapchat', 'Facebook'];

export default function CreatorsPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const { cf: f } = st;
  const [showFilters, setShowFilters] = useState(false);
  const [view, setView] = useState('grid');
  const [all, setAll] = useState([]);
  const [showMap, setShowMap] = useState(true);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(12);
  const scrollRef = useRef(null);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    setLoading(true);
    apiCall('/creators?limit=200').then(d => {
      const apiC = d.creators || d || [];
      const localC = LS.get('cb_creators', []);
      const merged = [...apiC];
      localC.forEach(lc => { if (!merged.find(ac => ac.id === lc.id)) merged.push(lc); });
      setAll(merged);
      setLoading(false);
    }).catch(() => {
      setAll(LS.get('cb_creators', []));
      setLoading(false);
    });
    return () => window.removeEventListener('resize', h);
  }, []);

  useEffect(() => {
    dsp({ t: 'UI', v: { hideNav: showFilters } });
    return () => dsp({ t: 'UI', v: { hideNav: false } });
  }, [showFilters]);

  const go = (p, sel) => { dsp({ t: 'GO', p, sel }); scrollToTop(); };

  const filtered = all.filter(c => {
    const q = (f.q || '').toLowerCase();
    const name = (c.name || '').toLowerCase();
    const handle = (c.handle || '').toLowerCase();
    const bio = (c.bio || '').toLowerCase();
    const city = (c.city || '').toLowerCase();
    
    if (q && !name.includes(q) && !handle.includes(q) && !bio.includes(q) && !city.includes(q)) return false;
    if (f.state && c.state !== f.state) return false;
    if (f.district && c.city !== f.district) return false;
    if (f.niche) {
      const cn = Array.isArray(c.niche) ? c.niche : [c.niche];
      if (!cn.includes(f.niche)) return false;
    }
    if (f.platform) {
      const cp = Array.isArray(c.platform) ? c.platform : [c.platform];
      if (!cp.includes(f.platform)) return false;
    }
    if (f.minFollowers && c.followers < Number(f.minFollowers)) return false;
    if (f.verified && !c.verified) return false;
    return true;
  }).sort((a, b) => {
    if (f.sort === 'followers') return Number(b.followers || 0) - Number(a.followers || 0);
    return (b.score || fmt.score(b)) - (a.score || fmt.score(a));
  });

  const visible = filtered.slice(0, limit);

  const stateCounts = all.reduce((acc, c) => {
    const s = c.state || 'Bharat';
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  const clearFilters = () => dsp({ t: 'CF', v: { q: '', niche: '', state: '', district: '', platform: '', verified: false, minFollowers: '', sort: 'score' } });

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <EliteHeader 
        eyebrow="Marketplace"
        title="Bharat's Top Creators"
        sub="Discover elite influencers, YouTubers, and content creators from 2,400+ handpicked talent across Bharat's Tier 2 & 3 cities."
        gradient="saffron"
        light={true}
        compact={true}
      />

      {/* Sticky Ultra-Premium Toolbar (Floating Glass Style) */}
      <div style={{ 
        position: 'sticky', top: 0, zIndex: 1000, 
        background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(30px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)', 
        padding: mob ? '12px 0 14px' : '16px 0',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <div style={{ ...W(1280), padding: mob ? '0 16px' : '0 24px', display: 'flex', flexDirection: 'column', gap: mob ? 14 : 12 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {/* Search + Category Combo */}
            {mob ? (
              <div style={{ flex: 1, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', opacity: 0.3, fontSize: 20 }}>🔍</span>
                <input 
                  value={f.q} 
                  onChange={e => dsp({ t: 'CF', v: { q: e.target.value } })} 
                  placeholder="Search creators..." 
                  style={{ 
                    width: '100%', padding: '15px 15px 15px 50px', borderRadius: 100, 
                    border: '1.5px solid rgba(0,0,0,0.04)', background: 'rgba(0,0,0,0.02)', 
                    fontSize: 15, fontWeight: 600, outline: 'none'
                  }} 
                />
              </div>
            ) : (
              <div style={{ display: 'flex', flex: 1, background: 'rgba(0,0,0,0.02)', borderRadius: 100, border: '1.5px solid rgba(0,0,0,0.04)', overflow: 'hidden', height: 48 }}>
                 <select 
                   value={f.niche} 
                   onChange={e => dsp({ t: 'CF', v: { niche: e.target.value } })} 
                   style={{ 
                     padding: '0 24px', border: 'none', borderRight: '1.5px solid rgba(0,0,0,0.06)', 
                     background: 'rgba(0,0,0,0.01)', fontSize: 13, fontWeight: 700, 
                     color: '#111', outline: 'none', cursor: 'pointer', minWidth: 160,
                     fontFamily: "'Inter', sans-serif"
                   }}
                 >
                   <option value="">All Categories</option>
                   {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
                 </select>
                 <div style={{ position: 'relative', flex: 1 }}>
                   <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', opacity: 0.3, fontSize: 20 }}>🔍</span>
                   <input 
                     value={f.q} 
                     onChange={e => dsp({ t: 'CF', v: { q: e.target.value } })}
                     placeholder="Find elite talent by niche, name or city..." 
                     style={{ width: '100%', height: '100%', padding: '0 24px 0 50px', border: 'none', background: 'transparent', fontSize: 14, fontWeight: 600, color: '#111', outline: 'none' }}
                   />
                 </div>
              </div>
            )}

            {!mob && (
              <React.Fragment>
                {/* Location Quick Select */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: 'rgba(0,0,0,0.02)', padding: '4px 12px', borderRadius: 100, border: '1.5px solid rgba(0,0,0,0.03)' }}>
                    <span style={{ fontSize: 11, fontWeight: 900, color: '#94a3b8', marginRight: 4 }}>📍</span>
                    <select 
                      value={f.state} 
                      onChange={e => dsp({ t: 'CF', v: { state: e.target.value, district: '' } })} 
                      style={{ 
                        background: 'transparent', border: 'none', fontSize: 13, fontWeight: 700, 
                        color: f.state ? '#FF9431' : '#475569', outline: 'none', cursor: 'pointer',
                        fontFamily: "'Inter', sans-serif"
                      }}
                    >
                      <option value="">All States</option>
                      {ALL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  {f.state && (
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: 'rgba(0,0,0,0.02)', padding: '4px 12px', borderRadius: 100, border: '1.5px solid rgba(0,0,0,0.03)' }}>
                    <select 
                        value={f.district} 
                        onChange={e => dsp({ t: 'CF', v: { district: e.target.value } })} 
                        style={{ 
                          background: 'transparent', border: 'none', fontSize: 13, fontWeight: 700, 
                          color: f.district ? '#FF9431' : '#475569', outline: 'none', cursor: 'pointer',
                          fontFamily: "'Inter', sans-serif"
                        }}
                      >
                        <option value="">All Districts</option>
                        {(INDIA_STATES[f.state] || []).map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                  )}
                </div>

                {/* View Toggles */}
                <div style={{ display: 'flex', gap: 4, background: '#f1f5f9', padding: 4, borderRadius: 100 }}>
                   <button onClick={() => setView('grid')} style={{ padding: '8px 16px', borderRadius: 100, border: 'none', background: view === 'grid' ? '#fff' : 'transparent', color: view === 'grid' ? '#111' : '#64748b', fontSize: 11, fontWeight: 900, cursor: 'pointer', boxShadow: view === 'grid' ? '0 4px 12px rgba(0,0,0,0.08)' : 'none', transition: '0.3s' }}>Grid</button>
                   <button onClick={() => setView('list')} style={{ padding: '8px 16px', borderRadius: 100, border: 'none', background: view === 'list' ? '#fff' : 'transparent', color: view === 'list' ? '#111' : '#64748b', fontSize: 11, fontWeight: 900, cursor: 'pointer', boxShadow: view === 'list' ? '0 4px 12px rgba(0,0,0,0.08)' : 'none', transition: '0.3s' }}>List</button>
                </div>
              </React.Fragment>
            )}

            {/* Map Toggle Button */}
            <button 
              onClick={() => setShowMap(!showMap)}
              style={{ 
                height: 48, padding: mob ? '0 12px' : '0 16px', borderRadius: 100, 
                background: showMap ? '#FF9431' : 'rgba(0,0,0,0.03)', 
                color: showMap ? '#fff' : '#475569', 
                border: '1.5px solid ' + (showMap ? '#FF9431' : 'rgba(0,0,0,0.05)'), 
                fontWeight: 900, fontSize: 13, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
                transition: 'all 0.2s'
              }}
            >
              <span style={{ fontSize: 16 }}>🗺️</span>
              {!mob && (showMap ? 'Hide Map' : 'Show Map')}
            </button>

            {/* Premium Filter Trigger */}
            <button 
              onClick={() => setShowFilters(true)}
              style={{ 
                height: 48, padding: mob ? '0 16px' : '0 24px', borderRadius: 100, 
                background: '#111', color: '#fff', border: 'none', 
                fontWeight: 900, fontSize: 13, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'all 0.2s',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
              }}
            >
              <span style={{ fontSize: 18 }}>⌥</span>
              {!mob && 'Advanced Filters'}
              {Object.values(f).filter(v => v && v !== 'score' && v !== '' && v !== false).length > 0 && (
                <span style={{ 
                  background: '#FF9431', color: '#fff', fontSize: 10, padding: '2px 6px', 
                  borderRadius: 100, border: '2px solid #111', fontWeight: 900, marginLeft: 4
                }}>
                  {Object.values(f).filter(v => v && v !== 'score' && v !== '' && v !== false).length}
                </span>
              )}
            </button>
          </div>

          {/* Quick Action Chips for Mobile */}
          {mob && (
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2, scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="no-scrollbar">
              {/* Reset Chip */}
              {(f.niche || f.state || f.district || f.q) && (
                <button 
                  onClick={clearFilters}
                  style={{ 
                    flexShrink: 0, padding: '10px 18px', borderRadius: 100, 
                    background: '#FEF2F2', color: '#EF4444', border: '1.5px solid rgba(239,68,68,0.1)',
                    fontSize: 13, fontWeight: 900, cursor: 'pointer'
                  }}
                >Reset</button>
              )}

              {/* Smart Location Chip */}
              <button 
                onClick={() => setShowFilters(true)}
                style={{ 
                  flexShrink: 0, padding: '10px 18px', borderRadius: 100, 
                  border: '1.5px solid ' + (f.state ? '#FF9431' : 'rgba(0,0,0,0.06)'),
                  background: f.state ? '#FF9431' : '#fff',
                  color: f.state ? '#fff' : '#64748b',
                  fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
                }}
              >
                <span>📍 {f.district || f.state || 'All India'}</span>
              </button>

              {/* Sort Chip (Compact) */}
              <button 
                onClick={() => dsp({ t: 'CF', v: { sort: f.sort === 'score' ? 'followers' : 'score' } })}
                style={{ 
                  flexShrink: 0, padding: '10px 18px', borderRadius: 100, 
                  border: '1.5px solid rgba(0,0,0,0.06)',
                  background: '#fff', color: '#64748b',
                  fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
                }}
              >
                <span>↕ {f.sort === 'score' ? 'Elite' : 'Reach'}</span>
              </button>

              <div style={{ width: 1, height: 20, background: 'rgba(0,0,0,0.05)', flexShrink: 0, alignSelf: 'center' }} />

              {/* Verified Toggle Chip */}
              <button 
                onClick={() => dsp({ t: 'CF', v: { verified: !f.verified } })}
                style={{ 
                  flexShrink: 0, padding: '10px 18px', borderRadius: 100, 
                  border: '1.5px solid ' + (f.verified ? '#3B82F6' : 'rgba(0,0,0,0.06)'),
                  background: f.verified ? '#3B82F6' : '#fff',
                  color: f.verified ? '#fff' : '#64748b',
                  fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
                }}
              >
                <span>{f.verified ? '✅' : '🛡️'} Verified</span>
              </button>

              {/* Platform Chips */}
              {PLATFORMS.map(p => (
                <button 
                  key={p}
                  onClick={() => dsp({ t: 'CF', v: { platform: f.platform === p ? '' : p } })}
                  style={{ 
                    flexShrink: 0, padding: '10px 18px', borderRadius: 100, 
                    border: '1.5px solid ' + (f.platform === p ? '#FF9431' : 'rgba(0,0,0,0.06)'),
                    background: f.platform === p ? '#FF9431' : '#fff',
                    color: f.platform === p ? '#fff' : '#64748b',
                    fontSize: 13, fontWeight: 800, cursor: 'pointer'
                  }}
                >{p}</button>
              ))}

              <div style={{ width: 1, height: 20, background: 'rgba(0,0,0,0.05)', flexShrink: 0, alignSelf: 'center' }} />

              {NICHES.map(n => (
                <button 
                  key={n}
                  onClick={() => dsp({ t: 'CF', v: { niche: f.niche === n ? '' : n } })}
                  style={{ 
                    flexShrink: 0, padding: '10px 20px', borderRadius: 100, 
                    border: '1.5px solid ' + (f.niche === n ? '#FF9431' : 'rgba(0,0,0,0.06)'),
                    background: f.niche === n ? '#FF9431' : '#fff',
                    color: f.niche === n ? '#fff' : '#64748b',
                    fontSize: 13, fontWeight: 800, cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >{n}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showMap && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden', background: '#fdfdfd', borderBottom: '1px solid rgba(0,0,0,0.05)' }}
          >
            <div style={{ padding: mob ? '20px' : '40px 0' }}>
               <IndiaMap3D 
                 mob={mob} 
                 stateCounts={stateCounts}
                 onSelectState={s => {
                   dsp({ t: 'CF', v: { state: s, district: '' } });
                   // Scroll to the results grid
                   const grid = document.getElementById('creators-grid-anchor');
                   if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                 }} 
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="creators-grid-anchor" style={{ padding: mob ? '12px 16px 32px' : '48px 24px', background: '#fdfdfd' }}>
        <div style={W(1280)}>
          {/* Header Row - Refined for Mobile */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: mob ? 20 : 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h2 style={{ fontSize: mob ? 20 : 28, fontWeight: 900, color: '#111', fontFamily: "'Fraunces', serif" }}>
                 Elite Talent Network <span style={{ color: '#94a3b8', fontSize: 16, fontWeight: 700, marginLeft: 8 }}>({filtered.length})</span>
              </h2>
            </div>
            
            {!mob && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 900, color: '#94a3b8', letterSpacing: '0.08em' }}>SORT BY:</span>
                <select 
                  value={f.sort} 
                  onChange={e => dsp({ t: 'CF', v: { sort: e.target.value } })} 
                  style={{ 
                    padding: '10px 20px', borderRadius: 100, border: '1.5px solid rgba(0,0,0,0.06)', 
                    background: '#fff', fontSize: 13, fontWeight: 700, color: '#111', 
                    outline: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif"
                  }}
                >
                  <option value="score">Elite Score</option>
                  <option value="followers">Followers</option>
                </select>
                {(f.q || f.niche || f.state || f.district || f.verified) && (
                   <button onClick={clearFilters} style={{ background: 'none', border: 'none', color: '#FF9431', fontWeight: 900, fontSize: 11, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Clear</button>
                )}
              </div>
            )}
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2, 1fr)' : (view === 'grid' ? 'repeat(auto-fill, minmax(340px, 1fr))' : '1fr'), gap: mob ? 12 : 32 }}>
              {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '80px 0' }}>
               <Empty icon="🔍" title="No matching creators" sub="Try adjusting your filters or search query to explore more talent." ctaLabel="Clear all filters" onCta={clearFilters} />
            </div>
          ) : view === 'grid' ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(340px, 1fr))', gap: mob ? 12 : 32 }}>
                {visible.map((c, i) => (
                  <motion.div 
                    key={c.id || i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (i % 8) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    layout
                  >
                    <CreatorCard creator={c} onView={cr => go('creator-profile', { creator: cr })} />
                  </motion.div>
                ))}
              </div>

              {visible.length < filtered.length && (
                <div style={{ marginTop: 60, textAlign: 'center' }}>
                  <button 
                    onClick={() => setLimit(prev => prev + 12)}
                    style={{ 
                      padding: '16px 48px', borderRadius: 100, background: '#111', color: '#fff', 
                      fontSize: 15, fontWeight: 900, border: 'none', cursor: 'pointer',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)', transition: 'all 0.3s'
                    }}
                    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    Explore More Creators
                  </button>
                  <p style={{ marginTop: 16, fontSize: 13, fontWeight: 700, color: '#94a3b8' }}>
                    Showing {visible.length} of {filtered.length} elite creators
                  </p>
                </div>
              )}
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {!mob && (
                <div style={{ display: 'flex', padding: '0 24px 12px', borderBottom: '1px solid rgba(0,0,0,0.05)', fontSize: 11, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  <span style={{ flex: 1.5 }}>Creator Profile</span>
                  <span style={{ flex: 1 }}>Location</span>
                  <span style={{ flex: 1 }}>Category</span>
                  <span style={{ flex: 1 }}>Reach</span>
                  <span style={{ width: 100, textAlign: 'right' }}>Score</span>
                </div>
              )}
              {filtered.map((c, i) => (
                <motion.div 
                  key={c.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: (i % 15) * 0.02 }}
                  onClick={() => go('creator-profile', { creator: c })}
                  style={{ 
                    padding: mob ? '16px' : '16px 24px', background: '#fff', borderRadius: 20, 
                    border: '1px solid rgba(0,0,0,0.04)', 
                    display: 'flex', alignItems: 'center', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                  }}
                  onMouseEnter={e => { if(!mob) { e.currentTarget.style.borderColor = '#FF9431'; e.currentTarget.style.transform = 'translateX(8px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.05)'; } }}
                  onMouseLeave={e => { if(!mob) { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)'; } }}
                >
                  <div style={{ flex: 1.5, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <img src={c.photo || c.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=FF9431&color=fff`} style={{ width: mob ? 48 : 56, height: mob ? 48 : 56, borderRadius: 16, objectFit: 'cover', background: '#f1f5f9' }} />
                    <div>
                      <p style={{ fontSize: mob ? 15 : 17, fontWeight: 800, color: '#111' }}>{c.name} {c.verified && '✅'}</p>
                      <p style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>@{c.handle || 'creator'}</p>
                    </div>
                  </div>
                  {!mob && (
                    <>
                      <span style={{ flex: 1, fontSize: 14, color: '#475569', fontWeight: 600 }}>📍 {typeof c.city === 'object' ? c.city.name : (c.city || 'Bharat')}</span>
                      <span style={{ flex: 1, fontSize: 14, color: '#475569', fontWeight: 600 }}>{(Array.isArray(c.niche) ? c.niche : [c.niche]).slice(0,1).join('')}</span>
                      <span style={{ flex: 1, fontSize: 14, color: '#1e293b', fontWeight: 800 }}>{fmt.num(c.followers || 0)}</span>
                      <div style={{ width: 100, textAlign: 'right' }}>
                         <Bdg color="saffron">{c.score || fmt.score(c)}</Bdg>
                      </div>
                    </>
                  )}
                  {mob && (
                    <div style={{ textAlign: 'right', flex: 1 }}>
                       <div style={{ fontSize: 14, fontWeight: 900, color: '#111' }}>{fmt.num(c.followers)}</div>
                       <div style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8' }}>REACH</div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Advanced Filter Bottom Sheet */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)', zIndex: 10001 }} 
            />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              style={{ 
                position: 'fixed', bottom: 0, left: 0, right: 0, 
                maxHeight: '92vh', background: '#fff', borderRadius: '40px 40px 0 0', 
                zIndex: 10002, overflowY: 'auto', padding: mob ? '24px 20px 40px' : '48px 48px 60px',
                boxShadow: '0 -20px 60px rgba(0,0,0,0.15)'
              }}
            >
              {/* Pull Handle */}
              <div style={{ width: 40, height: 4, background: '#e2e8f0', borderRadius: 10, margin: '0 auto 24px' }} />

              <div style={W(640)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                  <div>
                    <h3 style={{ fontSize: 28, fontWeight: 900, fontFamily: "'Fraunces', serif", color: '#111' }}>Refine Search</h3>
                    <p style={{ fontSize: 14, color: '#64748b', fontWeight: 600, marginTop: 4 }}>Find the perfect match for your brand</p>
                  </div>
                  <button onClick={() => setShowFilters(false)} style={{ background: '#f1f5f9', border: 'none', width: 40, height: 40, borderRadius: '50%', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>✕</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 16, letterSpacing: '1px' }}>Creator Niche</label>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      {NICHES.map(n => (
                        <button 
                          key={n} 
                          onClick={() => dsp({ t: 'CF', v: { niche: f.niche === n ? '' : n } })}
                          style={{ 
                            padding: '12px 22px', borderRadius: 100, 
                            border: '1.5px solid ' + (f.niche === n ? '#FF9431' : 'rgba(0,0,0,0.06)'), 
                            background: f.niche === n ? '#FF9431' : '#fff', 
                            color: f.niche === n ? '#fff' : '#475569', 
                            fontSize: 14, fontWeight: 800, cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 16, letterSpacing: '1px' }}>Primary Platform</label>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      {[
                        { name: 'Instagram', icon: '📸', color: '#E4405F' },
                        { name: 'YouTube', icon: '🎥', color: '#FF0000' },
                        { name: 'Twitter', icon: '🐦', color: '#1DA1F2' },
                        { name: 'LinkedIn', icon: '💼', color: '#0A66C2' },
                        { name: 'Facebook', icon: '👥', color: '#1877F2' }
                      ].map(p => (
                        <button 
                          key={p.name} 
                          onClick={() => dsp({ t: 'CF', v: { platform: f.platform === p.name ? '' : p.name } })}
                          style={{ 
                            padding: '12px 22px', borderRadius: 100, 
                            border: '1.5px solid ' + (f.platform === p.name ? p.color : 'rgba(0,0,0,0.06)'), 
                            background: f.platform === p.name ? p.color : '#fff', 
                            color: f.platform === p.name ? '#fff' : '#475569', 
                            fontSize: 14, fontWeight: 800, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: 8,
                            transition: 'all 0.2s',
                            boxShadow: f.platform === p.name ? `0 8px 16px ${p.color}20` : 'none'
                          }}
                        >
                          <span>{p.icon}</span>
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 24 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 12 }}>State</label>
                      <select 
                        value={f.state} 
                        onChange={e => dsp({ t: 'CF', v: { state: e.target.value, district: '' } })} 
                        style={{ 
                          width: '100%', padding: '18px 20px', borderRadius: 18, border: '1.5px solid rgba(0,0,0,0.06)', 
                          fontSize: 15, fontWeight: 700, background: '#f8fafc', outline: 'none',
                          fontFamily: "'Inter', sans-serif", color: '#111'
                        }}
                      >
                        <option value="">All India</option>
                        {ALL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 12 }}>District / City</label>
                      <select 
                        value={f.district} 
                        onChange={e => dsp({ t: 'CF', v: { district: e.target.value } })} 
                        disabled={!f.state} 
                        style={{ 
                          width: '100%', padding: '18px 20px', borderRadius: 18, border: '1.5px solid rgba(0,0,0,0.06)', 
                          fontSize: 15, fontWeight: 700, background: f.state ? '#f8fafc' : '#f1f5f9', 
                          opacity: f.state ? 1 : 0.6, outline: 'none',
                          fontFamily: "'Inter', sans-serif", color: '#111'
                        }}
                      >
                        <option value="">{f.state ? `All in ${f.state}` : 'Select State First'}</option>
                        {f.state && (INDIA_STATES[f.state] || []).map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 24 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 12 }}>Sort Order</label>
                      <div style={{ display: 'flex', background: '#f8fafc', padding: 4, borderRadius: 100, border: '1.5px solid rgba(0,0,0,0.04)' }}>
                        <button onClick={() => dsp({ t: 'CF', v: { sort: 'score' } })} style={{ flex: 1, padding: '12px', borderRadius: 100, border: 'none', background: f.sort === 'score' ? '#111' : 'transparent', color: f.sort === 'score' ? '#fff' : '#64748b', fontSize: 13, fontWeight: 800, cursor: 'pointer', transition: '0.3s' }}>Elite Score</button>
                        <button onClick={() => dsp({ t: 'CF', v: { sort: 'followers' } })} style={{ flex: 1, padding: '12px', borderRadius: 100, border: 'none', background: f.sort === 'followers' ? '#111' : 'transparent', color: f.sort === 'followers' ? '#fff' : '#64748b', fontSize: 13, fontWeight: 800, cursor: 'pointer', transition: '0.3s' }}>Followers</button>
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 12 }}>Minimum Reach</label>
                      <div style={{ position: 'relative' }}>
                        <input 
                          type="number" 
                          value={f.minFollowers} 
                          onChange={e => dsp({ t: 'CF', v: { minFollowers: e.target.value } })} 
                          placeholder="e.g. 10000"
                          style={{ width: '100%', padding: '16px 20px', borderRadius: 18, border: '1.5px solid rgba(0,0,0,0.06)', fontSize: 15, fontWeight: 700, background: '#f8fafc', outline: 'none' }}
                        />
                        <span style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', fontSize: 12, fontWeight: 800, color: '#94a3b8' }}>FOLLOWERS</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 16 }}>Trust & Verification</label>
                    <div 
                      onClick={() => dsp({ t: 'CF', v: { verified: !f.verified } })}
                      style={{ 
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', 
                        background: f.verified ? 'rgba(59,130,246,0.05)' : '#f8fafc', 
                        borderRadius: 24, border: '1.5px solid ' + (f.verified ? '#3B82F6' : 'rgba(0,0,0,0.04)'),
                        cursor: 'pointer', transition: 'all 0.3s'
                      }}
                    >
                      <div>
                        <p style={{ fontSize: 16, fontWeight: 900, color: '#1e293b' }}>Verified Creators Only</p>
                        <p style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Show only profiles manually verified by our team.</p>
                      </div>
                      <div style={{ width: 50, height: 28, background: f.verified ? '#3B82F6' : '#cbd5e1', borderRadius: 100, position: 'relative', transition: '0.3s' }}>
                        <motion.div 
                          animate={{ x: f.verified ? 24 : 3 }}
                          style={{ position: 'absolute', top: 3, left: 0, width: 22, height: 22, background: '#fff', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} 
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ 
                    display: 'flex', gap: 12, marginTop: 24, padding: '16px', 
                    background: '#fff', borderTop: '1px solid rgba(0,0,0,0.05)',
                    position: 'sticky', bottom: -40, margin: '0 -20px -40px',
                    zIndex: 10
                  }}>
                    <button 
                      onClick={clearFilters} 
                      style={{ 
                        flex: 1, padding: '18px', borderRadius: 100, 
                        background: '#f8fafc', color: '#64748b', fontSize: 15, 
                        fontWeight: 900, cursor: 'pointer', border: '1.5px solid rgba(0,0,0,0.04)',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                      onMouseLeave={e => e.currentTarget.style.background = '#f8fafc'}
                    >Reset</button>
                    
                    <button 
                      onClick={() => setShowFilters(false)} 
                      style={{ 
                        flex: 2, padding: '18px', borderRadius: 100, 
                        background: '#111', color: '#fff', fontSize: 15, 
                        fontWeight: 900, cursor: 'pointer', border: 'none', 
                        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        transition: 'all 0.2s'
                      }}
                      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.96)'}
                      onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      Show {filtered.length} Creators
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}

