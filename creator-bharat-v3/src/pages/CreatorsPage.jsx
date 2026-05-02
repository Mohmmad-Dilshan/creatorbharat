import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop, apiCall, fmt, LS, ALL_STATES, INDIA_STATES } from '../theme';
import { Btn, SH, Bdg, SkeletonCard, Empty } from '../components/Primitives';
import { CreatorCard } from '../components/Cards';

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
    // Simulate real API or use Seed Data if API fails
    apiCall('/creators?limit=100').then(d => {
      const apiC = d.creators || d || [];
      const localC = LS.get('cb_creators', []);
      const merged = [...apiC];
      localC.forEach(lc => {
        if (!merged.find(ac => ac.id === lc.id)) merged.push(lc);
      });
      setAll(merged);
      setLoading(false);
    }).catch(() => {
      const seed = LS.get('cb_creators', []);
      setAll(seed);
      setLoading(false);
    });
    return () => window.removeEventListener('resize', h);
  }, []);

  const go = (p, sel) => { dsp({ t: 'GO', p, sel }); scrollToTop(); };
  const districts = f.state && INDIA_STATES[f.state] ? INDIA_STATES[f.state] : [];

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
    if (f.minER && Number(c.er || 0) < Number(f.minER)) return false;
    return true;
  }).sort((a, b) => {
    if (f.sort === 'followers') return Number(b.followers || 0) - Number(a.followers || 0);
    if (f.sort === 'er') return Number(b.er || 0) - Number(a.er || 0);
    return (b.score || fmt.score(b)) - (a.score || fmt.score(a));
  });

  const hasFilters = f.q || f.state || f.district || f.niche || f.platform || f.verified || f.minER || f.minFollowers;
  const clearAll = () => { dsp({ t: 'CF', v: { q: '', state: '', district: '', niche: '', platform: '', verified: false, minER: '', minFollowers: '', sort: 'score' } }); };

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Search Header */}
      <div style={{ background: '#050505', padding: mob ? '120px 20px 48px' : '160px 20px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg,#FF9431 33%,#fff 33%,#fff 66%,#128807 66%)', opacity: 0.8 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 30%, rgba(255,148,49,0.1), transparent 50%), radial-gradient(circle at 80% 70%, rgba(18,136,7,0.08), transparent 50%)' }} />
        
        <div style={{ ...W(), position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', justifyContent: 'space-between', alignItems: mob ? 'center' : 'flex-end', gap: 32 }}>
            <div style={{ textAlign: mob ? 'center' : 'left' }}>
              <SH eyebrow="Talent Discovery" title="Bharat Ke Top Creators" sub="Search from 2,400+ handpicked local creators from Tier 2 & 3 cities." light mb={0} />
            </div>
            <div className="au" style={{ position: 'relative', width: mob ? '100%' : 500 }}>
              <input 
                value={f.q} 
                onChange={e => dsp({ t: 'CF', v: { q: e.target.value } })} 
                placeholder="Search by name, niche, or city..." 
                style={{ width: '100%', padding: '20px 24px 20px 60px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 17, outline: 'none', backdropFilter: 'blur(10px)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }} 
              />
              <span style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', fontSize: 22, opacity: 0.6 }}>🔍</span>
              {f.q && <button onClick={() => dsp({ t: 'CF', v: { q: '' } })} style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#fff', opacity: 0.5, cursor: 'pointer', fontSize: 18 }}>×</button>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', minHeight: '80vh', position: 'relative' }}>
        {/* Sidebar - Filter System */}
        <div style={{ 
          width: mob && !showFilters ? 0 : 300, 
          flexShrink: 0, 
          background: '#fff', 
          borderRight: '1px solid rgba(0,0,0,0.05)', 
          overflowY: 'auto', 
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
          position: mob ? 'fixed' : 'sticky', 
          top: mob ? 0 : 100, 
          left: 0, 
          bottom: 0, 
          zIndex: 8000, 
          maxHeight: mob ? '100vh' : 'calc(100vh - 100px)',
          padding: mob && !showFilters ? 0 : '32px 24px',
          visibility: mob && !showFilters ? 'hidden' : 'visible',
          boxShadow: mob ? '20px 0 60px rgba(0,0,0,0.1)' : 'none'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ fontWeight: 900, fontSize: 18, color: '#111', fontFamily: "'Fraunces', serif" }}>Filters</h3>
            <div style={{ display: 'flex', gap: 12 }}>
               {hasFilters && <button onClick={clearAll} style={{ background: 'none', border: 'none', color: '#FF9431', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Reset</button>}
               {mob && <button onClick={() => setShowFilters(false)} style={{ fontSize: 20 }}>×</button>}
            </div>
          </div>

          {/* Filter Groups */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: T.t3, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Geography</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <select value={f.state} onChange={e => dsp({ t: 'CF', v: { state: e.target.value, district: '' } })} style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1.5px solid ' + (f.state ? '#FF9431' : 'rgba(0,0,0,0.08)'), fontSize: 14, fontWeight: 700, outline: 'none', background: '#fff', cursor: 'pointer' }}>
                  <option value="">All States</option>
                  {ALL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                
                <select value={f.district} onChange={e => dsp({ t: 'CF', v: { district: e.target.value } })} style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1.5px solid ' + (f.district ? '#FF9431' : 'rgba(0,0,0,0.08)'), fontSize: 14, fontWeight: 700, outline: 'none', background: '#fff', cursor: 'pointer' }}>
                  <option value="">{f.state ? `All Districts in ${f.state}` : 'All Districts / Major Cities'}</option>
                  {(f.state && INDIA_STATES[f.state] ? INDIA_STATES[f.state] : ["Jaipur", "Mumbai", "New Delhi", "Bangalore", "Pune", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Indore", "Lucknow", "Chandigarh", "Guwahati", "Patna"]).map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: T.t3, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Category / Niche</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Travel', 'Fashion', 'Food', 'Tech', 'Beauty', 'Gaming', 'Fitness', 'Lifestyle', 'Education', 'Comedy'].map(n => (
                  <button 
                    key={n} 
                    onClick={() => dsp({ t: 'CF', v: { niche: f.niche === n ? '' : n } })} 
                    style={{ padding: '8px 16px', borderRadius: 100, border: '1.5px solid ' + (f.niche === n ? '#FF9431' : 'rgba(0,0,0,0.06)'), background: f.niche === n ? 'rgba(255,148,49,0.08)' : 'transparent', color: f.niche === n ? '#FF9431' : T.t2, fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: T.t3, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Audience Size</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  ['', 'All Sizes'],
                  ['10000', '10K+ Followers'],
                  ['50000', '50K+ Followers'],
                  ['100000', '100K+ Followers'],
                  ['500000', '500K+ Followers'],
                ].map(([v, l]) => (
                  <button 
                    key={v} 
                    onClick={() => dsp({ t: 'CF', v: { minFollowers: v } })} 
                    style={{ textAlign: 'left', padding: '10px 14px', borderRadius: 10, border: '1px solid ' + (f.minFollowers === v ? '#FF9431' : 'transparent'), background: f.minFollowers === v ? 'rgba(255,148,49,0.05)' : 'transparent', color: f.minFollowers === v ? '#FF9431' : T.t2, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: T.t3, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Engagement Quality</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {[3, 5, 7].map(er => (
                  <button 
                    key={er} 
                    onClick={() => dsp({ t: 'CF', v: { minER: f.minER == er ? '' : er } })} 
                    style={{ padding: '8px 16px', borderRadius: 10, border: '1.5px solid ' + (f.minER == er ? '#10B981' : 'rgba(0,0,0,0.06)'), background: f.minER == er ? 'rgba(16,185,129,0.08)' : 'transparent', color: f.minER == er ? '#10B981' : T.t2, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                  >
                    {er}%+ ER
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <input type="checkbox" checked={f.verified} onChange={e => dsp({ t: 'CF', v: { verified: e.target.checked } })} style={{ width: 18, height: 18, accentColor: '#2563EB' }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: T.n8 }}>Verified Profiles Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Results Main Area */}
        <div style={{ flex: 1, minWidth: 0, padding: mob ? '24px 20px' : '40px 48px', background: '#FAFAFA' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {mob && <Btn sm variant="outline" onClick={() => setShowFilters(true)}>Filters {hasFilters ? '• ' + (Object.keys(f).filter(k => f[k] && k !== 'sort').length) : ''}</Btn>}
              <h2 style={{ fontSize: 15, fontWeight: 800, color: T.t3 }}>Showing <span style={{ color: '#111' }}>{filtered.length}</span> Creators</h2>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: T.t3 }}>Sort By:</span>
              <select value={f.sort} onChange={e => dsp({ t: 'CF', v: { sort: e.target.value } })} style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid rgba(0,0,0,0.1)', background: '#fff', fontSize: 13, fontWeight: 700, outline: 'none' }}>
                <option value="score">Top Scored</option>
                <option value="followers">Most Followers</option>
                <option value="er">Highest Engagement</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ marginTop: 80 }}>
              <Empty 
                icon="🔍" 
                title="No Creators Found" 
                sub="Aapke current filters ke hisaab se koi creator nahi mila. Please try clearing some filters." 
                ctaLabel="Clear All Filters" 
                onCta={clearAll} 
              />
            </div>
          ) : (
            <div className="au" style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {filtered.map((c, i) => (
                <div key={c.id} className={`au d${(i % 5) + 1}`}>
                   <CreatorCard creator={c} onView={cr => go('creator-profile', { creator: cr })} />
                </div>
              ))}
            </div>
          )}

          {/* Pagination / Load More (Visual only for now) */}
          {filtered.length > 0 && (
            <div style={{ marginTop: 60, textAlign: 'center' }}>
               <Btn variant="outline" lg style={{ borderRadius: 100, padding: '16px 48px' }}>Load More Creators</Btn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
