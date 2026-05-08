import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context';
import { W, scrollToTop, LS, fmt } from '../../utils/helpers';
import { apiCall } from '../../utils/api';
import EliteHeader from '../../components/layout/EliteHeader';
import IndiaMap3D from '../../components/IndiaMap3D/IndiaMap3D';
import { motion, AnimatePresence } from 'framer-motion';

const checkSearchQuery = (c, q) => {
  if (!q) return true;
  const sq = q.toLowerCase();
  return (c.name || '').toLowerCase().includes(sq) || 
         (c.handle || '').toLowerCase().includes(sq) || 
         (c.bio || '').toLowerCase().includes(sq) || 
         (c.city || '').toLowerCase().includes(sq);
};

const checkNiche = (c, niche) => {
  if (!niche || niche.length === 0) return true;
  const cn = Array.isArray(c.niche) ? c.niche : [c.niche];
  return niche.some(n => cn.includes(n));
};

const checkPlatform = (c, platform) => {
  if (!platform || platform.length === 0) return true;
  const cp = Array.isArray(c.platform) ? c.platform : [c.platform];
  return platform.some(p => cp.includes(p));
};

const checkMetrics = (c, f) => {
  if (f.minFollowers && c.followers < Number(f.minFollowers)) return false;
  if (f.verified && !c.verified) return false;
  if (f.gender && f.gender !== 'Any' && c.gender !== f.gender) return false;
  if (f.language && c.language && !c.language.includes(f.language)) return false;
  if (f.minER && (c.er || 0) < Number(f.minER)) return false;
  return true;
};

const filterCreators = (all, f) => {
  return all.filter(c => {
    if (!checkSearchQuery(c, f.q)) return false;
    if (f.state && c.state !== f.state) return false;
    if (f.district && c.city !== f.district) return false;
    if (!checkNiche(c, f.niche)) return false;
    if (!checkPlatform(c, f.platform)) return false;
    return checkMetrics(c, f);
  });
};

const mergeCreators = (apiC, localC) => {
  const merged = [...apiC];
  localC.forEach(lc => { 
    if (!merged.some(ac => ac.id === lc.id)) {
      merged.push(lc);
    }
  });
  return merged;
};

// Modular Components
import SearchToolbar from '../../components/creators/SearchToolbar';
import FilterSidebar from '../../components/creators/FilterSidebar';
import CreatorGrid from '../../components/creators/CreatorGrid';

const NICHES = ['Influencer', 'YouTuber', 'Lifestyle', 'Tech', 'Fashion', 'Beauty', 'Gaming', 'Finance', 'Travel', 'Comedy', 'Educational', 'Fitness', 'Food'];
const PLATFORMS = ['Instagram', 'YouTube', 'Twitter', 'LinkedIn', 'Snapchat', 'Facebook'];

export default function CreatorsPage() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const { cf: f } = st;
  
  const [showFilters, setShowFilters] = useState(false);
  const [view, setView] = useState('grid');
  const [all, setAll] = useState([]);
  const [showMap, setShowMap] = useState(true);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    
    setLoading(true);
    apiCall('/creators?limit=200').then(d => {
      const apiC = d.creators || d || [];
      const localC = LS.get('cb_creators', []);
      setAll(mergeCreators(apiC, localC));
      setLoading(false);
    }).catch(() => {
      setAll(LS.get('cb_creators', []));
      setLoading(false);
    });
    
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  // Sync Global Nav with Filters (Z-index management)
  useEffect(() => {
    dsp({ t: 'UI', v: { hideNav: showFilters } });
    return () => dsp({ t: 'UI', v: { hideNav: false } });
  }, [showFilters, dsp]);

  const filtered = filterCreators(all, f).sort((a, b) => {
    if (f.sort === 'followers') return Number(b.followers || 0) - Number(a.followers || 0);
    return (b.score || fmt.score(b)) - (a.score || fmt.score(a));
  });

  const visible = filtered.slice(0, limit);
  const stateCounts = all.reduce((acc, c) => {
    const s = c.state || 'Bharat';
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  const clearFilters = () => dsp({ t: 'CF', v: { q: '', niche: [], state: '', district: '', platform: [], verified: false, minFollowers: '', sort: 'score', gender: '', language: '', minER: '' } });

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <EliteHeader
        eyebrow="Talent Discovery"
        title={<>Find the <span style={{ background: 'linear-gradient(90deg, #FF9431 20%, #475569 50%, #138808 80%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Faces</span> That Build Bharat</>}
        sub={<>The ultimate creator marketplace for brands. Access <strong style={{ color: '#111' }}>{fmt.num(all.length)}+</strong> handpicked, verified influencers from Bhilwara and across India.</>}
        gradient="saffron"
        light={true}
        compact={true}
      />

      <SearchToolbar 
        mob={mob} f={f} dsp={dsp} setView={setView} view={view} 
        setShowMap={setShowMap} showMap={showMap} setShowFilters={setShowFilters} 
        niches={NICHES} 
      />

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
                  const grid = document.getElementById('creators-grid-anchor');
                  if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="creators-grid-anchor" style={{ padding: mob ? '24px 16px 80px' : '60px 24px 100px', background: '#fdfdfd' }}>
        <div style={W(1280)}>
          <div style={{ display: 'flex', justifyContent: mob ? 'center' : 'space-between', alignItems: 'center', marginBottom: mob ? 24 : 40, flexWrap: 'wrap', gap: 16 }}>
            <h2 style={{ fontSize: mob ? 20 : 32, fontWeight: 900, color: '#111', fontFamily: "'Outfit', sans-serif" }}>
              Elite Network <span style={{ color: '#94a3b8', fontSize: 16, fontWeight: 700, marginLeft: 8 }}>({filtered.length})</span>
            </h2>
            
            {!mob && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 11, fontWeight: 900, color: '#94a3b8', letterSpacing: '0.1em' }}>SORT RESULTS:</span>
                <select
                  value={f.sort}
                  onChange={e => dsp({ t: 'CF', v: { sort: e.target.value } })}
                  style={{
                    padding: '10px 24px', borderRadius: 100, border: '1.5px solid rgba(0,0,0,0.06)',
                    background: '#fff', fontSize: 13, fontWeight: 700, color: '#111',
                    outline: 'none', cursor: 'pointer'
                  }}
                >
                  <option value="score">Elite Score</option>
                  <option value="followers">Reach (Followers)</option>
                </select>
              </div>
            )}
          </div>

          <CreatorGrid 
            loading={loading} filtered={filtered} visible={visible} 
            view={view} mob={mob} limit={limit} setLimit={setLimit} 
            clearFilters={clearFilters}
            onCardView={c => { navigate(`/creator/${c.handle || c.id}`); scrollToTop(); }}
          />
        </div>
      </div>

      <FilterSidebar 
        show={showFilters} onClose={() => setShowFilters(false)} 
        f={f} dsp={dsp} mob={mob} niches={NICHES} platforms={PLATFORMS} 
      />

      {/* Floating Comparison Bench */}
      <AnimatePresence>
        {st.compared.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            style={{
              position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
              width: mob ? '90%' : 'auto', minWidth: mob ? 0 : 400,
              background: '#0f172a', borderRadius: 24, padding: '16px 24px',
              display: 'flex', alignItems: 'center', gap: 24, zIndex: 1000000,
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)', color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
               <div style={{ background: '#FF9431', width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900 }}>
                  {st.compared.length}
               </div>
               <div>
                  <h4 style={{ fontSize: 14, fontWeight: 900 }}>Comparison Bench</h4>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>Talent selected for analysis</p>
               </div>
            </div>

            <div style={{ height: 32, width: 1, background: 'rgba(255,255,255,0.1)' }} />

            <div style={{ display: 'flex', gap: 12 }}>
               <button 
                 onClick={() => dsp({ t: 'CLEAR_COMPARE' })}
                 style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}
               >
                 Clear
               </button>
               <Btn 
                 sm 
                 onClick={() => { navigate('/compare'); scrollToTop(); }}
                 style={{ borderRadius: 12, background: '#FF9431', color: '#fff', fontSize: 12, fontWeight: 900, padding: '10px 20px' }}
               >
                 Analyze Side-by-Side →
               </Btn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
