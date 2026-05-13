import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/core/context';
import { fetchCreators } from '../../utils/platformService';
import { W, scrollToTop, fmt } from '../../utils/helpers';
import EliteHeader from '../../components/layout/EliteHeader';
import IndiaMap3D from '../../components/IndiaMap3D/IndiaMap3D';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Heart,
  Scale,
  X, 
  CheckCircle, 
  ChevronRight,
  Filter
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

const VisualPortal = ({ creator, mob }) => (
  <div style={{ width: mob ? '100%' : '45%', height: mob ? '300px' : 'auto', position: 'relative', background: '#050505' }}>
    <img 
      src={creator.photo || creator.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name)}&background=FF9431&color=fff`} 
      alt={creator.name}
      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
    />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)' }} />
    <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
         <CheckCircle size={20} color="#FF9431" fill="#FF9431" />
         <span style={{ fontSize: '12px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px' }}>Verified Elite Partner</span>
      </div>
      <h2 style={{ fontSize: '40px', fontWeight: 950, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1 }}>{creator.name}</h2>
      <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', fontWeight: 700, marginTop: '8px' }}>@{creator.handle || 'elite_creator'}</p>
    </div>
  </div>
);

VisualPortal.propTypes = {
  creator: PropTypes.object.isRequired,
  mob: PropTypes.bool
};

const DataHub = ({ creator, mob, saved, compared, requireBrand, dsp, onFullView, navigate }) => (
  <div style={{ flex: 1, padding: mob ? '32px 24px' : '50px 60px', overflowY: 'auto' }} className="no-scrollbar">
    {/* TOP STATS & ACTIONS */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
         <Bdg color="orange" lg style={{ padding: '12px 24px', fontSize: '14px', borderRadius: '16px' }}>{creator.score || 98} ELITE SCORE</Bdg>
         {!mob && <span style={{ fontSize: '12px', fontWeight: 900, color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px', background: '#f0fdf4', padding: '6px 12px', borderRadius: '100px' }}>
           <TrendingUp size={14} /> +12.4% Momentum
         </span>}
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
         <button 
           onClick={() => requireBrand() && dsp({ t: 'SAVE', id: creator.id })}
           style={{ width: '48px', height: '48px', borderRadius: '16px', border: '1.5px solid #f1f5f9', background: saved ? '#EF444410' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.3s' }}
         >
           <Heart size={20} fill={saved ? '#EF4444' : 'none'} color={saved ? '#EF4444' : '#64748b'} />
         </button>
         <button 
           onClick={() => requireBrand() && dsp({ t: 'COMPARE', id: creator.id })}
           style={{ width: '48px', height: '48px', borderRadius: '16px', border: '1.5px solid #f1f5f9', background: compared ? '#FF943110' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.3s' }}
         >
           <Scale size={20} color={compared ? '#FF9431' : '#64748b'} />
         </button>
      </div>
    </div>

    {/* AI STRATEGIC RECOMMENDATION */}
    <div style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
      padding: '24px', borderRadius: '24px', marginBottom: '40px',
      border: '1px solid rgba(255,148,49,0.2)', position: 'relative', overflow: 'hidden'
    }}>
       <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', background: 'rgba(255,148,49,0.1)', borderRadius: '50%', filter: 'blur(30px)' }} />
       <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FF9431', fontSize: '11px', fontWeight: 950, textTransform: 'uppercase', marginBottom: '8px' }}>
          <Sparkles size={14} /> AI Recommendation
       </div>
       <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', fontWeight: 700, lineHeight: 1.5 }}>
          Best suited for <b>Lifestyle & Premium Tech</b> brands. High conversion potential for product launches in Tier-1 cities. 
       </p>
    </div>

    {/* PERFORMANCE PULSE */}
    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
       {[
         { l: 'Authenticity', v: '98%', c: '#10B981' },
         { l: 'Avg Engagement', v: '4.8%', c: '#FF9431' },
         { l: 'Response Time', v: '2.4 hrs', c: '#6366f1' },
         { l: 'Repeat Rate', v: '85%', c: '#f59e0b' }
       ].map(s => (
         <div key={s.l} style={{ background: '#f8fafc', padding: '16px', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
            <div style={{ color: '#94a3b8', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '4px' }}>{s.l}</div>
            <div style={{ fontSize: '18px', fontWeight: 950, color: s.c }}>{s.v}</div>
         </div>
       ))}
    </div>

    {/* CREATOR BIOGRAPHY / LOCAL INSIGHT */}
    <div style={{ marginBottom: '40px' }}>
       <h4 style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>Expertise & Local Context</h4>
       <div style={{ 
         borderLeft: '4px solid #FF9431', padding: '16px 24px', 
         borderRadius: '0 24px 24px 0', background: 'rgba(255,148,49,0.03)' 
       }}>
          <p style={{ fontSize: '15px', color: '#334155', fontWeight: 650, lineHeight: 1.6, fontStyle: 'italic' }}>
            "{creator.name || 'This creator'} is a dominant force in the <b>{creator.city || 'local'} {creator.niche || 'creative'} scene</b>. Known for their high-retention storytelling and authentic connection with the {creator.niche || 'digital'} community, they specialize in bridging the gap between premium brand identity and relatable local aesthetics for maximum campaign impact."
          </p>
       </div>
    </div>

    {/* AUDIENCE INTERESTS */}
    <div style={{ marginBottom: '40px' }}>
       <h4 style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>Audience Interest Breakdown</h4>
       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {[
            { t: 'Fashion', p: 45 }, { t: 'Luxury', p: 30 }, 
            { t: 'Tech', p: 15 }, { t: 'Travel', p: 10 }
          ].map(i => (
            <div key={i.t} style={{ 
              padding: '8px 16px', background: '#fff', border: '1.5px solid #f1f5f9', 
              borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px'
            }}>
               <span style={{ fontSize: '13px', fontWeight: 850, color: '#0f172a' }}>{i.t}</span>
               <span style={{ fontSize: '12px', fontWeight: 900, color: '#FF9431' }}>{i.p}%</span>
            </div>
          ))}
       </div>
    </div>

    {/* RECENT CONTENT TEASER */}
    <div style={{ marginBottom: '40px' }}>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Top Performing Content</h4>
          <button style={{ fontSize: '11px', fontWeight: 900, color: '#FF9431', background: 'none', border: 'none', cursor: 'pointer' }} onClick={onFullView}>Audit All Posts</button>
       </div>
       <div style={{ display: 'flex', gap: '12px' }}>
          {[1, 2, 3].map(i => (
             <div key={i} style={{ flex: 1, height: '120px', borderRadius: '20px', background: '#f1f5f9', overflow: 'hidden', position: 'relative' }}>
                <img src={`https://picsum.photos/seed/${creator.id + i * 10}/300/400`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="content" />
                <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', padding: '4px 8px', borderRadius: '6px', color: '#fff', fontSize: '10px', fontWeight: 900 }}>
                   {fmt.num(creator.followers / (i + 1))} Views
                </div>
             </div>
          ))}
       </div>
    </div>

    {/* STRATEGIC INSIGHTS */}
    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
       <div>
          <h4 style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px' }}>Audience Age</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
             <div style={{ flex: 1, height: '6px', background: '#f1f5f9', borderRadius: '100px', overflow: 'hidden' }}>
                <div style={{ width: '75%', height: '100%', background: '#0f172a' }} />
             </div>
             <span style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a' }}>18-34 (75%)</span>
          </div>
       </div>
       <div>
          <h4 style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px' }}>Brand Safety</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontWeight: 900, fontSize: '14px' }}>
             <ShieldCheck size={18} /> High (99.8%)
          </div>
       </div>
    </div>

    {/* CALL TO ACTION */}
    <div style={{ display: 'flex', gap: '20px', marginTop: 'auto' }}>
       <Btn lg style={{ flex: 1, borderRadius: '24px', height: '64px', fontSize: '16px' }} onClick={onFullView}>
          View Full Portfolio & Analytics <ChevronRight size={20} />
       </Btn>
       {!mob && (
         <Btn lg outline style={{ borderRadius: '24px', height: '64px', padding: '0 32px' }} onClick={() => requireBrand() && navigate('/campaign-builder')}>
            Shortlist for Campaign
         </Btn>
       )}
    </div>
  </div>
);

DataHub.propTypes = {
  creator: PropTypes.object.isRequired,
  mob: PropTypes.bool,
  saved: PropTypes.bool,
  compared: PropTypes.bool,
  requireBrand: PropTypes.func.isRequired,
  dsp: PropTypes.func.isRequired,
  onFullView: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired
};

const QuickViewModal = ({ creator, onClose, onFullView }) => {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const mob = globalThis.innerWidth < 768;

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!creator) return null;

  const saved = st.saved.includes(creator.id);
  const compared = st.compared.includes(creator.id);

  const requireBrand = () => {
    if (!st.user || st.user?.role !== 'brand') {
      dsp?.({ t: 'TOAST', d: { type: 'error', msg: 'Only Brands can perform this action. Please login as a Brand.' } });
      navigate?.('/login');
      return false;
    }
    return true;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(5, 5, 5, 0.85)',
        backdropFilter: 'blur(20px)', zIndex: 1000000,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: mob ? '0' : '40px'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: mob ? '100%' : '1100px', height: mob ? '100%' : 'auto', maxHeight: mob ? '100%' : '85vh',
          background: '#fff', borderRadius: mob ? '0' : '48px', overflow: 'hidden', position: 'relative',
          boxShadow: '0 50px 100px rgba(0,0,0,0.5)', display: 'flex', flexDirection: mob ? 'column' : 'row'
        }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: '24px', right: '24px', background: 'rgba(0,0,0,0.05)', backdropFilter: 'blur(10px)', border: 'none', width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 100 }}>
          <X size={22} color="#000" />
        </button>

        <VisualPortal creator={creator} mob={mob} />
        <DataHub 
          creator={creator} mob={mob} saved={saved} compared={compared} 
          requireBrand={requireBrand} dsp={dsp} onFullView={onFullView} navigate={navigate} 
        />
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

const ActiveFilters = ({ f, hasFilters }) => {
  if (!hasFilters) return null;
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
       {f.search && <div style={{ background: '#f8fafc', padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 800, color: '#64748b', border: '1px solid #e2e8f0' }}>Search: "{f.search}"</div>}
       {f.niche && <div style={{ background: '#f8fafc', padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 800, color: '#64748b', border: '1px solid #e2e8f0' }}>Category: {f.niche}</div>}
       {f.platform && <div style={{ background: '#f8fafc', padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 800, color: '#64748b', border: '1px solid #e2e8f0' }}>Platform: {f.platform}</div>}
       {f.state && <div style={{ background: '#f8fafc', padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 800, color: '#64748b', border: '1px solid #e2e8f0' }}>State: {f.state}</div>}
    </div>
  );
};

ActiveFilters.propTypes = {
  f: PropTypes.object.isRequired,
  hasFilters: PropTypes.bool.isRequired
};

const MarketplaceHeader = ({ mob, setShowFilters, clearFilters, count, sort, onSortChange, hasFilters }) => (
  <div style={{ display: 'flex', justifyContent: mob ? 'center' : 'space-between', alignItems: 'center', marginBottom: mob ? 24 : 40, flexWrap: 'wrap', gap: 16 }}>
    <h2 style={{ fontSize: mob ? 20 : 32, fontWeight: 950, letterSpacing: '-0.04em' }}>
      Elite Talent Pool <span style={{ color: '#94a3b8', fontSize: 16, fontWeight: 700, marginLeft: 8 }}>({count})</span>
    </h2>

    {hasFilters && (
      <button 
        onClick={clearFilters}
        style={{ 
          background: 'rgba(255,148,49,0.1)', color: '#FF9431', border: 'none', 
          padding: '8px 16px', borderRadius: '100px', fontSize: 12, fontWeight: 900,
          display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
          transition: 'all 0.2s'
        }}
      >
        <span>✕</span> Clear Filters
      </button>
    )}
    
    {!mob && (
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 11, fontWeight: 900, color: '#94a3b8', letterSpacing: '0.1em' }}>SORT BY:</span>
        <select
          value={sort}
          onChange={e => onSortChange(e.target.value)}
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
    <Btn variant="outline" onClick={() => setShowFilters(true)} style={{ borderRadius: 16, padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
       <Filter size={18} /> {mob ? '' : 'Advanced Filters'}
    </Btn>
  </div>
);

MarketplaceHeader.propTypes = {
  mob: PropTypes.bool,
  setShowFilters: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
  count: PropTypes.number,
  sort: PropTypes.string,
  onSortChange: PropTypes.func.isRequired,
  hasFilters: PropTypes.bool
};

const EliteConversion = ({ mob, navigate }) => (
  <section style={{ padding: mob ? '80px 20px' : '120px 20px', background: '#fff', borderTop: '1px solid #f1f5f9' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
        borderRadius: mob ? 32 : 56, padding: mob ? '48px 24px' : '80px',
        textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '100%', height: '200%', background: 'radial-gradient(circle, rgba(255,148,49,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: mob ? 32 : 56, fontWeight: 950, color: '#fff', marginBottom: 24, letterSpacing: '-0.04em' }}>
            Ready to Scale your <span style={{ color: '#FF9431' }}>Influence?</span>
          </h2>
          <p style={{ fontSize: mob ? 16 : 20, color: '#94a3b8', maxWidth: 700, margin: '0 auto 48px', lineHeight: 1.6 }}>
            Whether you're a brand looking for elite talent or a creator building your sovereign identity, CreatorBharat is your protocol for growth.
          </p>

          <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: 20, justifyContent: 'center' }}>
            <button 
              onClick={() => navigate('/brand-register')}
              style={{ 
                padding: '20px 48px', borderRadius: 100, background: '#FF9431', color: '#fff',
                border: 'none', fontSize: 16, fontWeight: 900, cursor: 'pointer',
                boxShadow: '0 20px 40px rgba(255,148,49,0.25)', transition: 'all 0.3s'
              }}
            >
              Start a Campaign
            </button>
            <button 
              onClick={() => navigate('/apply')}
              style={{ 
                padding: '20px 48px', borderRadius: 100, background: 'rgba(255,255,255,0.05)', color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)', fontSize: 16, fontWeight: 900, cursor: 'pointer',
                backdropFilter: 'blur(10px)', transition: 'all 0.3s'
              }}
            >
              Join as a Creator
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

EliteConversion.propTypes = {
  mob: PropTypes.bool,
  navigate: PropTypes.func.isRequired
};

const EliteSpotlight = ({ mob, all, setSelectedCreator, dsp, loading }) => {
  const skeletons = [1, 2, 3, 4];
  
  return (
    <section style={{ padding: mob ? '40px 0 20px' : '60px 0 40px', background: '#fcfcfc', borderBottom: '1px solid #f1f5f9', overflow: 'hidden' }}>
      <div style={{ ...W(1280), padding: mob ? '0 16px' : '0 24px' }}>
        <div style={{ display: 'flex', alignItems: mob ? 'center' : 'flex-start', flexDirection: mob ? 'column' : 'row', textAlign: mob ? 'center' : 'left', justifyContent: 'space-between', marginBottom: mob ? '24px' : '32px' }}>
          <div>
            <Bdg color="orange" sm>HANDPICKED TALENT</Bdg>
            <h2 style={{ fontSize: mob ? '24px' : '32px', fontWeight: 950, color: '#0f172a', marginTop: '8px', letterSpacing: '-0.04em' }}>Elite Spotlight</h2>
          </div>
          {mob ? null : <Btn outline sm onClick={() => dsp({ t: 'CF', v: { verified: true } })}>View All Verified</Btn>}
        </div>

        <div 
          onWheel={(e) => {
            if (e.deltaY !== 0) {
              e.preventDefault();
              e.currentTarget.scrollLeft += e.deltaY;
            }
          }}
          style={{ 
            display: 'flex', 
            gap: mob ? '16px' : '24px', 
            overflowX: 'auto', 
            paddingBottom: '20px', 
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: mob ? 'x mandatory' : 'none',
            scrollPadding: mob ? '0 24px' : '0'
          }} 
          className="no-scrollbar"
        >
          {loading ? (
            skeletons.map(i => (
              <div 
                key={i} 
                className="skeleton-pulse"
                style={{
                  flexShrink: 0,
                  width: mob ? '240px' : '340px',
                  height: mob ? '340px' : '460px',
                  borderRadius: mob ? '24px' : '48px',
                  background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                  position: 'relative',
                  overflow: 'hidden',
                  scrollSnapAlign: mob ? 'center' : 'none'
                }}
              >
                <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px' }}>
                   <div style={{ width: '40%', height: '12px', background: 'rgba(0,0,0,0.05)', borderRadius: '100px', marginBottom: '16px' }} />
                   <div style={{ width: '80%', height: '24px', background: 'rgba(0,0,0,0.05)', borderRadius: '100px', marginBottom: '12px' }} />
                   <div style={{ width: '60%', height: '14px', background: 'rgba(0,0,0,0.05)', borderRadius: '100px' }} />
                </div>
              </div>
            ))
          ) : (
            all.filter(c => c.verified).slice(0, 5).map((creator) => (
              <motion.div
                key={creator.id}
                whileHover={mob ? {} : { y: -16, scale: 1.02 }}
                onClick={() => setSelectedCreator(creator)}
                style={{
                  flexShrink: 0,
                  width: mob ? '240px' : '340px',
                  height: mob ? '340px' : '460px',
                  borderRadius: mob ? '24px' : '48px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: '#050505',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  transition: 'box-shadow 0.3s',
                  scrollSnapAlign: mob ? 'center' : 'none'
                }}
              >
                <motion.img 
                  src={creator.photo || creator.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name)}&background=FF9431&color=fff`} 
                  alt={creator.name}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }} />
                
                <div style={{ position: 'absolute', top: mob ? '20px' : '28px', right: mob ? '20px' : '28px' }}>
                  <div style={{ 
                    background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', 
                    padding: mob ? '8px 16px' : '10px 20px', borderRadius: '100px', 
                    border: '1px solid rgba(255,255,255,0.1)', color: '#fff', 
                    fontSize: mob ? '10px' : '12px', fontWeight: 950, letterSpacing: '1px',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                  }}>
                    {creator.score || '98'} SCORE
                  </div>
                </div>

                <div style={{ position: 'absolute', bottom: mob ? '24px' : '40px', left: mob ? '24px' : '40px', right: mob ? '24px' : '40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <CheckCircle size={mob ? 14 : 18} color="#FF9431" fill="#FF9431" />
                    <span style={{ fontSize: mob ? '10px' : '12px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px' }}>Elite Verified</span>
                  </div>
                  <h3 style={{ fontSize: mob ? '22px' : '30px', fontWeight: 950, color: '#fff', marginBottom: '6px', letterSpacing: '-0.03em' }}>{creator.name}</h3>
                  <p style={{ fontSize: mob ? '13px' : '15px', color: 'rgba(255,255,255,0.6)', fontWeight: 650 }}>{creator.city} • {fmt.num(creator.followers)} Reach</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
      <style>{`
        .skeleton-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

EliteSpotlight.propTypes = {
  mob: PropTypes.bool,
  all: PropTypes.array.isRequired,
  setSelectedCreator: PropTypes.func.isRequired,
  dsp: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

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
      .catch(() => setLoading(false));
    
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const hasFilters = !!(f.search || (f.niche && f.niche.length > 0) || (f.platform && f.platform.length > 0) || f.state || f.district || f.minFollowers > 0 || f.maxFollowers > 0);
  
  const clearFilters = () => {
    dsp({ t: 'CF', v: { search: '', niche: '', platform: '', state: '', district: '', minFollowers: 0, maxFollowers: 0, q: '', verified: false, sort: 'score' } });
  };

  // Sync Global Nav with Modals/Filters (Z-index management)
  useEffect(() => {
    dsp({ t: 'UI', v: { hideNav: showFilters || !!selectedCreator } });
    return () => dsp({ t: 'UI', v: { hideNav: false } });
  }, [showFilters, selectedCreator, dsp]);

  // Auto-hide filters on mobile after selection
  useEffect(() => {
    if (mob && showFilters) {
      setShowFilters(false);
    }
  }, [f.niche, f.platform, f.state, mob]);

  const filtered = filterCreators(all.filter(Boolean), f).sort((a, b) => {
    if (!a || !b) return 0;
    if (f.sort === 'followers') return Number(b.followers || 0) - Number(a.followers || 0);
    return (b.score || fmt.score(b)) - (a.score || fmt.score(a));
  });

  const visible = filtered.slice(0, limit);
  const stateCounts = useMemo(() => {
    return all.filter(Boolean).reduce((acc, c) => {
      const s = c?.state || 'Bharat';
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {});
  }, [all]);

  return (
    <div style={{ background: '#fff', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
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

      <EliteSpotlight mob={mob} all={all} setSelectedCreator={setSelectedCreator} dsp={dsp} loading={loading} />

      <SearchToolbar 
        mob={mob} f={f} dsp={dsp} setView={setView} view={view} 
        setShowMap={setShowMap} showMap={showMap} setShowFilters={setShowFilters} 
        niches={NICHES} 
      />

      {/* MAP & DISCOVERY SECTIONS - CENTERED */}
      <section style={{ background: '#fff', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ ...W(1280), padding: mob ? '0 16px' : '0 24px' }}>
          {showMap && (
            <div style={{ marginBottom: mob ? '40px' : '60px' }}>
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
          )}
        </div>
      </section>

      <div id="creators-grid-anchor" style={{ padding: mob ? '24px 0 80px' : '60px 24px 100px', background: '#fdfdfd' }}>
        <div style={{ ...W(1280), padding: mob ? '0 8px' : '0 24px', width: 'auto' }}>
          <MarketplaceHeader 
            mob={mob} setShowFilters={setShowFilters} 
            clearFilters={clearFilters} 
            count={filtered.length}
            sort={f.sort}
            onSortChange={val => dsp({ t: 'CF', v: { sort: val } })}
            hasFilters={hasFilters}
          />

          {/* ACTIVE FILTER PILLS */}
          <ActiveFilters f={f} hasFilters={hasFilters} />

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

      <EliteConversion mob={mob} navigate={navigate} />

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
