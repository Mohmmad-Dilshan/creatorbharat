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
    if (f.minER && Number(c.er || 0) < Number(f.minER)) return false;
    return true;
  }).sort((a, b) => {
    if (f.sort === 'followers') return Number(b.followers || 0) - Number(a.followers || 0);
    if (f.sort === 'er') return Number(b.er || 0) - Number(a.er || 0);
    return (b.score || fmt.score(b)) - (a.score || fmt.score(a));
  });

  const hasFilters = f.state || f.district || f.niche || f.platform || f.verified || f.minER || f.minFollowers;
  const clearAll = () => { dsp({ t: 'CF', v: { state: '', district: '', niche: '', platform: '', verified: false, minER: '', minFollowers: '', sort: 'score' } }); };

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <EliteHeader 
        eyebrow="Talent Discovery"
        title="Bharat Ke Top Creators"
        sub="Search from 2,400+ handpicked local creators from Tier 2 & 3 cities."
        gradient="saffron"
      >
        <div style={{ display: 'flex', justifyContent: mob ? 'center' : 'flex-start' }}>
          <div className="au" style={{ position: 'relative', width: '100%', maxWidth: 500 }}>
            <input 
              value={f.q} 
              onChange={e => dsp({ t: 'CF', v: { q: e.target.value } })} 
              placeholder="Search by name, niche, or city..." 
              style={{ width: '100%', padding: '20px 24px 20px 60px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: 17, outline: 'none', backdropFilter: 'blur(10px)', boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }} 
            />
            <span style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', fontSize: 22 }}>🔍</span>
            {f.q && <button onClick={() => dsp({ t: 'CF', v: { q: '' } })} style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#fff', opacity: 0.5, cursor: 'pointer', fontSize: 18 }}>×</button>}
          </div>
        </div>
      </EliteHeader>

      <div style={{ display: 'flex', minHeight: '80vh', position: 'relative', background: '#FAFAFA' }}>
        {/* Sidebar - Elite Filter System */}
        <AnimatePresence>
          {(showFilters || !mob) && (
            <>
              {/* Mobile Backdrop */}
              {mob && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowFilters(false)}
                  style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 7000 }}
                />
              )}

              <motion.div 
                initial={mob ? { x: '-100%' } : { opacity: 0, x: -20 }}
                animate={{ x: 0, opacity: 1 }}
                exit={mob ? { x: '-100%' } : { opacity: 0, x: -20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                style={{ 
                  width: 320, flexShrink: 0, background: '#fff', borderRight: '1px solid rgba(0,0,0,0.05)', 
                  position: mob ? 'fixed' : 'sticky', top: mob ? 0 : 80, left: 0, bottom: 0, zIndex: 8000, 
                  maxHeight: mob ? '100vh' : 'calc(100vh - 80px)', padding: '32px 24px', overflowY: 'auto',
                  boxShadow: mob ? '20px 0 60px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                  <h3 style={{ fontWeight: 900, fontSize: 22, color: '#111', fontFamily: "'Fraunces', serif" }}>Filters</h3>
                  {mob && <button onClick={() => setShowFilters(false)} style={{ background: '#f1f5f9', border: 'none', width: 40, height: 40, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: '#64748b' }}>×</button>}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 900, color: T.t4, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Geography</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <select value={f.state} onChange={e => dsp({ t: 'CF', v: { state: e.target.value, district: '' } })} style={{ width: '100%', padding: '14px 16px', borderRadius: 16, border: '1.5px solid ' + (f.state ? '#FF9431' : 'rgba(0,0,0,0.05)'), fontSize: 14, fontWeight: 700, background: f.state ? 'rgba(255,148,49,0.03)' : '#fff', outline: 'none' }}>
                        <option value="">All States</option>
                        {ALL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <select value={f.district} onChange={e => dsp({ t: 'CF', v: { district: e.target.value } })} style={{ width: '100%', padding: '14px 16px', borderRadius: 16, border: '1.5px solid ' + (f.district ? '#FF9431' : 'rgba(0,0,0,0.05)'), fontSize: 14, fontWeight: 700, outline: 'none' }}>
                        <option value="">{f.state ? `All Districts in ${f.state}` : 'All Districts / Major Cities'}</option>
                        {(f.state && INDIA_STATES[f.state] ? INDIA_STATES[f.state] : ["Jaipur", "Mumbai", "New Delhi", "Bangalore", "Pune", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Indore", "Lucknow", "Chandigarh", "Guwahati", "Patna"]).map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 900, color: T.t4, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Category / Niche</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {['Travel', 'Fashion', 'Food', 'Tech', 'Beauty', 'Gaming', 'Fitness', 'Lifestyle', 'Education', 'Comedy'].map(n => (
                        <button key={n} onClick={() => dsp({ t: 'CF', v: { niche: f.niche === n ? '' : n } })} style={{ padding: '8px 16px', borderRadius: 100, border: '1.5px solid ' + (f.niche === n ? '#FF9431' : 'rgba(0,0,0,0.05)'), background: f.niche === n ? '#FF9431' : 'transparent', color: f.niche === n ? '#fff' : T.t2, fontSize: 12, fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s' }}>{n}</button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 900, color: T.t4, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Audience Size</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {[
                        ['', 'All Sizes'],
                        ['10000', '10K+ Followers'],
                        ['50000', '50K+ Followers'],
                        ['100000', '100K+ Followers'],
                        ['500000', '500K+ Followers'],
                      ].map(([v, l]) => (
                        <button key={v} onClick={() => dsp({ t: 'CF', v: { minFollowers: v } })} style={{ textAlign: 'left', padding: '12px 16px', borderRadius: 12, border: '1.5px solid ' + (f.minFollowers === v ? '#FF9431' : 'rgba(0,0,0,0.05)'), background: f.minFollowers === v ? 'rgba(255,148,49,0.05)' : 'transparent', color: f.minFollowers === v ? '#FF9431' : T.t2, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>{l}</button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 900, color: T.t4, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Engagement Quality</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {[3, 5, 7].map(er => (
                        <button key={er} onClick={() => dsp({ t: 'CF', v: { minER: f.minER == er ? '' : er } })} style={{ padding: '10px 18px', borderRadius: 12, border: '1.5px solid ' + (f.minER == er ? '#10B981' : 'rgba(0,0,0,0.05)'), background: f.minER == er ? 'rgba(16,185,129,0.05)' : 'transparent', color: f.minER == er ? '#10B981' : T.t2, fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>{er}%+ ER</button>
                      ))}
                    </div>
                  </div>

                  <div style={{ paddingTop: 20, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                      <input type="checkbox" checked={f.verified} onChange={e => dsp({ t: 'CF', v: { verified: e.target.checked } })} style={{ width: 20, height: 20, accentColor: '#3B82F6' }} />
                      <span style={{ fontSize: 14, fontWeight: 800, color: '#111' }}>Verified Pros Only</span>
                    </label>
                  </div>

                  {hasFilters && <Btn full variant="outline" onClick={clearAll} style={{ borderRadius: 100 }}>Clear All Filters</Btn>}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Results Area */}
        <div style={{ flex: 1, padding: mob ? '24px 20px' : '40px 48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {mob && (
                <button 
                  onClick={() => setShowFilters(true)}
                  style={{ 
                    padding: '10px 20px', borderRadius: 12, border: '1.5px solid #111', background: '#111', color: '#fff', fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8
                  }}
                >
                  <span>⚡ Filters</span>
                  {hasFilters && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF9431' }} />}
                </button>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <h2 style={{ fontSize: 18, fontWeight: 900, color: '#111', fontFamily: "'Fraunces', serif" }}>
                  Found {filtered.length} Creators
                </h2>
                {hasFilters && (
                  <button 
                    onClick={clearAll}
                    style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: 'none', padding: '6px 12px', borderRadius: 100, fontSize: 11, fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: T.t4 }}>SORT:</span>
              <select value={f.sort} onChange={e => dsp({ t: 'CF', v: { sort: e.target.value } })} style={{ padding: '10px 16px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.05)', background: '#fff', fontSize: 13, fontWeight: 800 }}>
                <option value="score">By Elite Score</option>
                <option value="followers">By Followers</option>
                <option value="er">By Engagement</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
              {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <Empty icon="🔍" title="No creators match" sub="Try adjusting your filters to find more talent." ctaLabel="Clear Filters" onCta={clearAll} />
          ) : (
            <motion.div 
              layout
              style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((c, i) => (
                  <motion.div 
                    key={c.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <CreatorCard creator={c} onView={cr => go('creator-profile', { creator: cr })} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
