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
    apiCall('/creators?limit=100').then(d => {
      setAll(d.creators || []);
      setLoading(false);
    }).catch(() => setLoading(false));
    return () => window.removeEventListener('resize', h);
  }, []);

  const go = (p, sel) => { dsp({ t: 'GO', p, sel }); scrollToTop(); };
  const districts = f.state && INDIA_STATES[f.state] ? INDIA_STATES[f.state] : [];

  const filtered = all.filter(c => {
    const q = (f.q || '').toLowerCase();
    const name = (c.name || '').toLowerCase();
    const handle = (c.handle || '').toLowerCase();
    if (q && !name.includes(q) && !handle.includes(q)) return false;
    if (f.state && c.state !== f.state) return false;
    if (f.city && c.city !== f.city) return false;
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
    <div style={{ background: '#fff' }}>
      <div style={{ background: T.n9, padding: mob ? '48px 20px 32px' : '72px 20px 48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg,#FF9431 33%,#fff 33%,#fff 66%,#128807 66%)' }} />
        <div style={{ ...W() }}>
          <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', justifyContent: 'space-between', alignItems: mob ? 'flex-start' : 'center', gap: 24 }}>
            <SH eyebrow="Ecosystem" title="Bharat Ke Top Creators" sub="Search from 2,400+ handpicked local creators." light mb={0} />
            <div style={{ position: 'relative', width: mob ? '100%' : 400 }}>
              <input value={f.q} onChange={e => dsp({ t: 'CF', v: { q: e.target.value } })} placeholder="Name, city, or niche..." style={{ width: '100%', padding: '16px 20px 16px 48px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 15, outline: 'none' }} />
              <span style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', fontSize: 18, opacity: 0.6 }}>🔍</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', minHeight: 500 }}>
        {/* Sidebar */}
        <div style={{ width: mob && !showFilters ? 0 : 240, flexShrink: 0, background: '#fff', borderRight: '1px solid ' + T.bd, overflowY: 'auto', transition: 'width .2s', position: mob ? 'fixed' : 'sticky', top: mob ? 0 : 112, left: 0, bottom: mob ? 0 : 'auto', zIndex: mob ? 7000 : 10, maxHeight: mob ? '100vh' : 'calc(100vh - 112px)' }}>
          {(!mob || showFilters) && (
            <div style={{ padding: 16, minWidth: 220 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: T.n8 }}>Filters</span>
                {hasFilters && <button onClick={clearAll} style={{ background: 'none', border: 'none', color: '#FF9933', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Clear All</button>}
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 800, color: T.t3, marginBottom: 6, textTransform: 'uppercase' }}>State</label>
                <select value={f.state} onChange={e => dsp({ t: 'CF', v: { state: e.target.value, district: '' } })} style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1.5px solid ' + (f.state ? '#FF9933' : T.bd), fontSize: 13 }}>
                  <option value="">All States</option>
                  {ALL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {f.state && districts.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 800, color: '#FF9933', marginBottom: 6, textTransform: 'uppercase' }}>{f.state} Districts</label>
                  <div style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid ' + T.bd, borderRadius: 8, padding: 6 }}>
                    <button onClick={() => dsp({ t: 'CF', v: { district: '' } })} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '6px 8px', borderRadius: 6, background: !f.district ? '#FF9933' : 'transparent', color: !f.district ? '#fff' : T.t2, border: 'none', fontSize: 12 }}>All Districts</button>
                    {districts.map(d => <button key={d} onClick={() => dsp({ t: 'CF', v: { district: d } })} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '6px 8px', borderRadius: 6, background: f.district === d ? '#FF9933' : 'transparent', color: f.district === d ? '#fff' : T.t2, border: 'none', fontSize: 12 }}>{d}</button>)}
                  </div>
                </div>
              )}

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 800, color: T.t3, marginBottom: 6, textTransform: 'uppercase' }}>Niche</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {['Travel', 'Fashion', 'Food', 'Tech', 'Beauty', 'Gaming', 'Fitness', 'Lifestyle'].map(n => <button key={n} onClick={() => dsp({ t: 'CF', v: { niche: f.niche === n ? '' : n } })} style={{ padding: '4px 10px', borderRadius: 14, border: '1.5px solid ' + (f.niche === n ? '#FF9933' : T.bd), background: f.niche === n ? 'rgba(255,153,51,.1)' : 'transparent', color: f.niche === n ? '#FF9933' : T.t2, fontSize: 11 }}>{n}</button>)}
                </div>
              </div>

              <div style={{ marginBottom: 8 }}>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 800, color: T.t3, marginBottom: 6, textTransform: 'uppercase' }}>Sort By</label>
                {[['score', 'CS Score'], ['followers', 'Followers'], ['er', 'Engagement']].map(item => (
                  <button key={item[0]} onClick={() => dsp({ t: 'CF', v: { sort: item[0] } })} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '7px 10px', borderRadius: 8, border: '1.5px solid ' + (f.sort === item[0] ? '#FF9933' : T.bd), background: f.sort === item[0] ? 'rgba(255,153,51,.08)' : 'transparent', color: f.sort === item[0] ? '#FF9933' : T.t2, fontSize: 12, marginBottom: 4 }}>{item[1]}</button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main */}
        <div style={{ flex: 1, minWidth: 0, padding: mob ? '16px' : '24px', background: T.bg2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              {mob && <button onClick={() => setShowFilters(true)} style={{ padding: '7px 12px', borderRadius: 8, border: '1.5px solid ' + (hasFilters ? '#FF9933' : T.bd), background: hasFilters ? 'rgba(255,153,51,.08)' : '#fff', color: hasFilters ? '#FF9933' : T.t2, fontSize: 12 }}>Filters {hasFilters ? '(On)' : ''}</button>}
              {f.state && <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', background: 'rgba(255,153,51,.1)', borderRadius: 8, border: '1px solid rgba(255,153,51,.3)', fontSize: 12, color: '#FF9933' }}>📍 {f.state} <span onClick={() => dsp({ t: 'CF', v: { state: '', district: '' } })} style={{ cursor: 'pointer' }}>x</span></div>}
            </div>
            <span style={{ fontSize: 13, color: T.t3 }}>{filtered.length} creators</span>
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill,minmax(270px,1fr))', gap: 18 }}>
              {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <Empty icon="🔍" title="Koi creator nahi mila" sub="Aapke current filters ke hisaab se koi creator nahi mila." ctaLabel="Clear Filters" onCta={clearAll} />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill,minmax(270px,1fr))', gap: 18 }}>
              {filtered.map(c => <CreatorCard key={c.id} creator={c} onView={cr => go('creator-profile', { creator: cr })} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
