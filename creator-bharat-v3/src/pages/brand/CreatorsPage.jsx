import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/core/context';
import { fetchCreators } from '../../utils/platformService';
import { W, scrollToTop, fmt } from '../../utils/helpers';
import EliteHeader from '../../components/layout/EliteHeader';
import IndiaMap3D from '../../components/IndiaMap3D/IndiaMap3D';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CheckCircle, 
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { Btn, Bdg } from '@/components/common/Primitives';
import Seo from '@/components/common/SEO';

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

import SearchToolbar from '../../components/creators/SearchToolbar';
import FilterSidebar from '../../components/creators/FilterSidebar';
import CreatorGrid from '../../components/creators/CreatorGrid';

// Filter logic
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

const QuickViewModal = ({ creator, onClose, onFullView }) => {
  if (!creator) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(10px)', zIndex: 3000,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, scale: 0.9, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 50, scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '600px', background: '#fff',
          borderRadius: '40px', overflow: 'hidden', position: 'relative',
          boxShadow: '0 40px 100px rgba(0,0,0,0.2)'
        }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: '24px', right: '24px', background: '#f1f5f9', border: 'none', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
          <X size={20} color="#0f172a" />
        </button>

        <div style={{ height: '200px', background: 'linear-gradient(135deg, #FF9431, #0f172a)', position: 'relative' }}>
           <div style={{ position: 'absolute', bottom: '-40px', left: '40px' }}>
              <img 
                src={creator.photo || creator.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name)}&background=FF9431&color=fff`} 
                alt={creator.name}
                style={{ width: '120px', height: '120px', borderRadius: '32px', border: '6px solid #fff', objectFit: 'cover', background: '#f1f5f9' }}
              />
           </div>
        </div>

        <div style={{ padding: '60px 40px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
             <div>
                <h3 style={{ fontSize: '32px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.04em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {creator.name} {creator.verified && <CheckCircle size={24} color="#FF9431" fill="#FF943110" />}
                </h3>
                <p style={{ fontSize: '16px', color: '#64748b', fontWeight: 700 }}>@{creator.handle || 'creator'}</p>
             </div>
             <Bdg color="orange" lg>{creator.score || fmt.score(creator)} SCORE</Bdg>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
             {(Array.isArray(creator.niche) ? creator.niche : [creator.niche]).map(n => (
                <span key={n} style={{ background: '#f8fafc', color: '#475569', padding: '6px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 800, border: '1px solid #e2e8f0' }}>{n}</span>
             ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
             <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '4px' }}>Followers</div>
                <div style={{ fontSize: '20px', fontWeight: 950, color: '#0f172a' }}>{fmt.num(creator.followers)}</div>
             </div>
             <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '4px' }}>Engagement</div>
                <div style={{ fontSize: '20px', fontWeight: 950, color: '#10b981' }}>{creator.er || '4.2'}%</div>
             </div>
             <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '4px' }}>Location</div>
                <div style={{ fontSize: '16px', fontWeight: 950, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{creator.city || 'Delhi'}</div>
             </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
             <Btn lg style={{ flex: 1, borderRadius: '20px' }} onClick={onFullView}>View Full Portfolio</Btn>
             <Btn lg outline style={{ width: '60px', padding: 0, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ExternalLink size={20} />
             </Btn>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

QuickViewModal.propTypes = {
  creator: PropTypes.shape({
    name: PropTypes.string,
    handle: PropTypes.string,
    photo: PropTypes.string,
    avatarUrl: PropTypes.string,
    verified: PropTypes.bool,
    score: PropTypes.number,
    niche: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    followers: PropTypes.number,
    er: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    city: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  onClose: PropTypes.func.isRequired,
  onFullView: PropTypes.func.isRequired
};

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
  const [selectedCreator, setSelectedCreator] = useState(null);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    
    // Parse URL Search Query
    const params = new URLSearchParams(globalThis.location.search);
    const q = params.get('q');
    if (q) {
      dsp({ t: 'CF', v: { q } });
    }

    setLoading(true);
    fetchCreators({ limit: 200 })
      .then(list => {
        setAll(list);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    
    return () => globalThis.removeEventListener('resize', h);
  }, [dsp]);

  // Sync Global Nav with Filters (Z-index management)
  useEffect(() => {
    dsp({ t: 'UI', v: { hideNav: showFilters } });
    return () => dsp({ t: 'UI', v: { hideNav: false } });
  }, [showFilters, dsp]);

  const filtered = filterCreators(all.filter(Boolean), f).sort((a, b) => {
    if (!a || !b) return 0;
    if (f.sort === 'followers') return Number(b.followers || 0) - Number(a.followers || 0);
    return (b.score || fmt.score(b)) - (a.score || fmt.score(a));
  });

  const visible = filtered.slice(0, limit);
  const stateCounts = all.filter(Boolean).reduce((acc, c) => {
    const s = c?.state || 'Bharat';
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  const clearFilters = () => dsp?.({ t: 'CF', v: { q: '', niche: [], state: '', district: '', platform: [], verified: false, minFollowers: '', sort: 'score', gender: '', language: '', minER: '' } });

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <Seo 
        title="Verified Creators Marketplace"
        description="Browse and connect with thousands of verified content creators across Bharat. Filter by niche, location, and impact scores."
        keywords="creator marketplace, hire influencers india, verified creators, brand collaborations india"
      />
      <EliteHeader
        eyebrow="Marketplace Hub"
        title={<>Discover the <span style={{ color: '#FF9431' }}>Elite</span> Talent of Bharat</>}
        sub={<>Access {fmt.num(all.length)}+ verified creators. Filter by location, niche, and impact scores to find your perfect brand match.</>}
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
            style={{ overflow: 'hidden', background: '#fcfcfc', borderBottom: '1px solid #f1f5f9' }}
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
            <h2 style={{ fontSize: mob ? 20 : 32, fontWeight: 950, letterSpacing: '-0.04em' }}>
              Elite Talent Pool <span style={{ color: '#94a3b8', fontSize: 16, fontWeight: 700, marginLeft: 8 }}>({filtered.length})</span>
            </h2>
            
            {!mob && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 11, fontWeight: 900, color: '#94a3b8', letterSpacing: '0.1em' }}>SORT BY:</span>
                <select
                  value={f.sort}
                  onChange={e => dsp({ t: 'CF', v: { sort: e.target.value } })}
                  style={{
                    padding: '10px 24px', borderRadius: 100, border: '1.5px solid #f1f5f9',
                    background: '#fff', fontSize: 13, fontWeight: 800, color: '#0f172a',
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
            onCardView={c => setSelectedCreator(c)}
          />
        </div>
      </div>

      <FilterSidebar 
        show={showFilters} onClose={() => setShowFilters(false)} 
        f={f} dsp={dsp} mob={mob} niches={NICHES} platforms={PLATFORMS} 
      />

      <AnimatePresence>
        {selectedCreator && (
          <QuickViewModal 
            creator={selectedCreator} 
            onClose={() => setSelectedCreator(null)} 
            onFullView={() => { 
              navigate(`/creator/${selectedCreator.handle || selectedCreator.id}`); 
              scrollToTop(); 
              setSelectedCreator(null);
            }} 
          />
        )}
      </AnimatePresence>

      {/* Floating Comparison Bench */}
      <AnimatePresence>
        {st.compared.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            style={{
              position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
              width: mob ? '90%' : 'auto', minWidth: mob ? 0 : 450,
              background: '#0f172a', borderRadius: '32px', padding: '16px 32px',
              display: 'flex', alignItems: 'center', gap: 24, zIndex: 1000,
              boxShadow: '0 30px 60px rgba(0,0,0,0.4)', color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
               <div style={{ background: '#FF9431', width: 44, height: 44, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 950, fontSize: '18px' }}>
                  {st.compared.length}
               </div>
               <div>
                  <h4 style={{ fontSize: 15, fontWeight: 900 }}>Talent Analysis Bench</h4>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>{st.compared.length} creators selected</p>
               </div>
            </div>

            <div style={{ height: 40, width: 1, background: 'rgba(255,255,255,0.1)' }} />

            <div style={{ display: 'flex', gap: 16, marginLeft: 'auto' }}>
               <button 
                 onClick={() => dsp({ t: 'CLEAR_COMPARE' })}
                 style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 900, cursor: 'pointer' }}
               >
                 Reset
               </button>
               <Btn 
                 sm 
                 onClick={() => { navigate('/compare'); scrollToTop(); }}
                 style={{ borderRadius: '16px', background: '#FF9431', color: '#fff', fontSize: 13, fontWeight: 950, padding: '12px 24px' }}
               >
                 Compare Side-by-Side <ChevronRight size={16} />
               </Btn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
