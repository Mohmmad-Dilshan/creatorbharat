import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T } from '../theme';
import { W, scrollToTop, fmt, LS, ALL_STATES, INDIA_STATES } from '../utils/helpers';
import { apiCall } from '../utils/api';
import { Btn, SH, Bdg, SkeletonCard, Empty } from '../components/Primitives';
import { CreatorCard } from '../components/Cards';
import EliteHeader from '../components/layout/EliteHeader';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreatorsPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const { cf: f } = st;
  const [showFilters, setShowFilters] = useState(false);
  const [view, setView] = useState('grid');
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    setLoading(true);
    apiCall('/creators?limit=100').then(d => {
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
    if (f.minFollowers && c.followers < Number(f.minFollowers)) return false;
    if (f.verified && !c.verified) return false;
    return true;
  }).sort((a, b) => {
    if (f.sort === 'followers') return Number(b.followers || 0) - Number(a.followers || 0);
    return (b.score || fmt.score(b)) - (a.score || fmt.score(a));
  });

  const clearFilters = () => dsp({ t: 'CF', v: { q: '', niche: '', state: '', district: '', verified: false, minFollowers: '', sort: 'score' } });

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <EliteHeader 
        eyebrow="Marketplace"
        title="Bharat's Top Creators"
        sub="Discover elite talent from 2,400+ handpicked local creators from Tier 2 & 3 cities across India."
        gradient="saffron"
        light={true}
      />

      {/* Sticky Pro Toolbar (SaaS Style) */}
      <div style={{ 
        position: 'sticky', top: 0, zIndex: 1000, 
        background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)', padding: '16px 0'
      }}>
        <div style={{ ...W(1280), padding: '0 20px', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Search Box */}
          <div style={{ flex: 1, minWidth: 280, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }}>🔍</span>
            <input 
              value={f.q} 
              onChange={e => dsp({ t: 'CF', v: { q: e.target.value } })} 
              placeholder="Search creators..." 
              style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: 14, border: '1.5px solid rgba(0,0,0,0.04)', background: '#fff', fontSize: 15, fontWeight: 500, outline: 'none' }} 
            />
          </div>

          {!mob && (
            <>
              {/* Niche Dropdown */}
              <select value={f.niche} onChange={e => dsp({ t: 'CF', v: { niche: e.target.value } })} style={{ padding: '14px 20px', borderRadius: 14, border: '1.5px solid rgba(0,0,0,0.04)', background: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', outline: 'none' }}>
                <option value="">All Categories</option>
                {['YouTuber', 'Content Creator', 'Vlogger', 'Lifestyle', 'Tech', 'Fashion', 'Gaming', 'Finance', 'Travel', 'Comedy', 'Educational', 'Music'].map(n => <option key={n} value={n}>{n}</option>)}
              </select>

              {/* State Dropdown */}
              <select value={f.state} onChange={e => dsp({ t: 'CF', v: { state: e.target.value, district: '' } })} style={{ padding: '14px 20px', borderRadius: 14, border: '1.5px solid rgba(0,0,0,0.04)', background: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', outline: 'none' }}>
                <option value="">All States</option>
                {ALL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>

              {/* View Toggle */}
              <div style={{ display: 'flex', gap: 4, background: '#f1f5f9', padding: 4, borderRadius: 12 }}>
                 <button onClick={() => setView('grid')} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: view === 'grid' ? '#fff' : 'transparent', color: view === 'grid' ? '#111' : '#64748b', fontSize: 12, fontWeight: 900, cursor: 'pointer', boxShadow: view === 'grid' ? '0 4px 10px rgba(0,0,0,0.05)' : 'none' }}>Grid</button>
                 <button onClick={() => setView('list')} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: view === 'list' ? '#fff' : 'transparent', color: view === 'list' ? '#111' : '#64748b', fontSize: 12, fontWeight: 900, cursor: 'pointer', boxShadow: view === 'list' ? '0 4px 10px rgba(0,0,0,0.05)' : 'none' }}>List</button>
              </div>
            </>
          )}

          <button 
            onClick={() => setShowFilters(true)}
            style={{ padding: '14px 24px', borderRadius: 14, background: '#111', color: '#fff', border: 'none', fontWeight: 900, fontSize: 13, cursor: 'pointer' }}
          >
            {mob ? 'Filters' : 'More Filters'}
          </button>
        </div>
      </div>

      <div style={{ padding: mob ? '40px 16px' : '60px 20px', background: '#fdfdfd' }}>
        <div style={W(1280)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
            <h2 style={{ fontSize: mob ? 20 : 26, fontWeight: 900, color: '#111', fontFamily: "'Fraunces', serif" }}>
               Elite Influence Network <span style={{ color: '#94a3b8', fontSize: 15, fontWeight: 700, marginLeft: 12 }}>({filtered.length} Results)</span>
            </h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 900, color: '#94a3b8', letterSpacing: '0.05em' }}>SORT BY:</span>
              <select value={f.sort} onChange={e => dsp({ t: 'CF', v: { sort: e.target.value } })} style={{ padding: '10px 20px', borderRadius: 12, border: '1.5px solid rgba(0,0,0,0.05)', background: '#fff', fontSize: 13, fontWeight: 800, outline: 'none', cursor: 'pointer' }}>
                <option value="score">Elite Score</option>
                <option value="followers">Followers</option>
              </select>
              {(f.q || f.niche || f.state || f.district || f.verified) && (
                 <button onClick={clearFilters} style={{ background: 'none', border: 'none', color: '#FF9431', fontWeight: 900, fontSize: 12, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em', marginLeft: 10 }}>Clear All</button>
              )}
            </div>
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : (view === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : '1fr'), gap: 32 }}>
              {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '100px 0' }}>
               <Empty icon="🔍" title="No Creators Found" sub="Try adjusting your filters to find creators in different categories or locations." ctaLabel="Reset Search" onCta={clearFilters} />
            </div>
          ) : view === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))', gap: 32 }}>
              {filtered.map((c, i) => (
                <motion.div 
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 12) * 0.04 }}
                >
                  <CreatorCard creator={c} onView={cr => go('creator-profile', { creator: cr })} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', padding: '0 24px 12px', borderBottom: '1px solid rgba(0,0,0,0.04)', fontSize: 11, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>
                <span style={{ flex: 1.5 }}>Creator Profile</span>
                <span style={{ flex: 1 }}>Location</span>
                <span style={{ flex: 1 }}>Category</span>
                <span style={{ flex: 1 }}>Reach</span>
                <span style={{ width: 100, textAlign: 'right' }}>Score</span>
              </div>
              {filtered.map((c, i) => (
                <motion.div 
                  key={c.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: (i % 15) * 0.02 }}
                  onClick={() => go('creator-profile', { creator: c })}
                  style={{ 
                    padding: '16px 24px', background: '#fff', borderRadius: 16, border: '1px solid rgba(0,0,0,0.03)', 
                    display: 'flex', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF9431'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.03)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ flex: 1.5, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <img src={c.photo || c.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=FF9431&color=fff`} style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover' }} />
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 800, color: '#111' }}>{c.name} {c.verified && '✅'}</p>
                      <p style={{ fontSize: 12, color: '#64748b' }}>@{c.handle || 'creator'}</p>
                    </div>
                  </div>
                  <span style={{ flex: 1, fontSize: 14, color: '#475569', fontWeight: 600 }}>📍 {typeof c.city === 'object' ? c.city.name : (c.city || 'Bharat')}</span>
                  <span style={{ flex: 1, fontSize: 14, color: '#475569', fontWeight: 600 }}>{(Array.isArray(c.niche) ? c.niche : [c.niche]).slice(0,1).join('')}</span>
                  <span style={{ flex: 1, fontSize: 14, color: '#1e293b', fontWeight: 800 }}>{fmt.num(c.followers || 0)}</span>
                  <div style={{ width: 100, textAlign: 'right' }}>
                     <Bdg color="saffron">{c.score || fmt.score(c)}</Bdg>
                  </div>
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
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', zIndex: 10001 }} 
            />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ 
                position: 'fixed', bottom: 0, left: 0, right: 0, 
                maxHeight: '90vh', background: '#fff', borderRadius: '40px 40px 0 0', 
                zIndex: 10002, overflowY: 'auto', padding: mob ? '32px 20px' : '48px'
              }}
            >
              <div style={W(600)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                  <h3 style={{ fontSize: 26, fontWeight: 900, fontFamily: "'Fraunces', serif" }}>Advanced Filters</h3>
                  <button onClick={() => setShowFilters(false)} style={{ background: '#f1f5f9', border: 'none', width: 44, height: 44, borderRadius: '50%', fontSize: 24, cursor: 'pointer' }}>×</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 16, letterSpacing: '1px' }}>Category</label>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      {['YouTuber', 'Content Creator', 'Vlogger', 'Lifestyle', 'Tech', 'Fashion', 'Gaming', 'Finance', 'Travel', 'Comedy', 'Educational', 'Music'].map(n => (
                        <button 
                          key={n} 
                          onClick={() => dsp({ t: 'CF', v: { niche: f.niche === n ? '' : n } })}
                          style={{ padding: '12px 24px', borderRadius: 100, border: '1.5px solid ' + (f.niche === n ? '#FF9431' : 'rgba(0,0,0,0.06)'), background: f.niche === n ? '#FF9431' : '#fff', color: f.niche === n ? '#fff' : '#1e293b', fontSize: 14, fontWeight: 800, cursor: 'pointer' }}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 16 }}>State</label>
                      <select value={f.state} onChange={e => dsp({ t: 'CF', v: { state: e.target.value, district: '' } })} style={{ width: '100%', padding: '18px 20px', borderRadius: 16, border: '1.5px solid rgba(0,0,0,0.06)', fontSize: 15, fontWeight: 700, background: '#f8fafc' }}>
                        <option value="">All States</option>
                        {ALL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 16 }}>District</label>
                      <select value={f.district} onChange={e => dsp({ t: 'CF', v: { district: e.target.value } })} disabled={!f.state} style={{ width: '100%', padding: '18px 20px', borderRadius: 16, border: '1.5px solid rgba(0,0,0,0.06)', fontSize: 15, fontWeight: 700, background: '#f8fafc' }}>
                        <option value="">{f.state ? `All in ${f.state}` : 'Select State First'}</option>
                        {f.state && (INDIA_STATES[f.state] || []).map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div 
                    onClick={() => dsp({ t: 'CF', v: { verified: !f.verified } })}
                    style={{ 
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', 
                      background: f.verified ? 'rgba(59,130,246,0.05)' : '#f8fafc', 
                      borderRadius: 20, border: '1px solid ' + (f.verified ? '#3B82F6' : 'rgba(0,0,0,0.04)'),
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <p style={{ fontSize: 16, fontWeight: 900, color: '#1e293b' }}>Verified Creators Only</p>
                      <p style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>Filter profiles verified by CreatorBharat.</p>
                    </div>
                    <div style={{ width: 44, height: 24, background: f.verified ? '#3B82F6' : '#cbd5e1', borderRadius: 100, position: 'relative', transition: '0.3s' }}>
                      <div style={{ position: 'absolute', top: 3, left: f.verified ? 22 : 3, width: 18, height: 18, background: '#fff', borderRadius: '50%', transition: '0.3s' }} />
                    </div>
                  </div>

                  <button onClick={() => setShowFilters(false)} style={{ width: '100%', padding: '20px', borderRadius: 100, background: '#111', color: '#fff', fontSize: 16, fontWeight: 900, cursor: 'pointer' }}>Apply Filters</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
