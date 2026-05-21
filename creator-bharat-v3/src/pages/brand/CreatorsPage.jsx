import React, { useState, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../core/context';
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
  Filter,
  Video,
  Camera
} from 'lucide-react';
import { InstagramIcon } from '../../components/icons/SocialIcons';
import { Btn, Bdg } from '../../components/common/Primitives';
import Seo from '../../components/common/SEO';
import SearchToolbar from '../../components/creators/SearchToolbar';
import FilterSidebar from '../../components/creators/FilterSidebar';
import CreatorGrid from '../../components/creators/CreatorGrid';

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
  
  // Handle both 'niche' and 'category' keys for cross-compatibility
  let cn;
  if (Array.isArray(c.niche)) {
    cn = c.niche;
  } else if (Array.isArray(c.category)) {
    cn = c.category;
  } else {
    cn = [c.niche || c.category];
  }
  
  return niche.some(n => cn.filter(Boolean).includes(n));
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
      src={creator.photo || creator.avatarUrl || creator.profile_pic || `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name)}&background=FF9431&color=fff`} 
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
          Best suited for <b>{creator.niche || creator.category || 'Premium'}</b> brands. High conversion potential for product launches in {creator.city || 'Tier-1'} cities. 
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
          id="marketplace-sort-select"
          name="marketplace_sort"
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

const SKEL_S = {
  mob: { width: '240px', height: '340px', borderRadius: '24px', scrollSnapAlign: 'center' },
  desk: { width: '340px', height: '460px', borderRadius: '48px', scrollSnapAlign: 'none' }
};

const SpotlightSkeleton = ({ mob }) => {
  const v = mob ? SKEL_S.mob : SKEL_S.desk;
  return (
    <div 
      className="skeleton-pulse"
      style={{
        flexShrink: 0,
        background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
        position: 'relative',
        overflow: 'hidden',
        ...v
      }}
    >
      <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px' }}>
         <div style={{ width: '40%', height: '12px', background: 'rgba(0,0,0,0.05)', borderRadius: '100px', marginBottom: '16px' }} />
         <div style={{ width: '80%', height: '24px', background: 'rgba(0,0,0,0.05)', borderRadius: '100px', marginBottom: '12px' }} />
         <div style={{ width: '60%', height: '14px', background: 'rgba(0,0,0,0.05)', borderRadius: '100px' }} />
      </div>
    </div>
  );
};

SpotlightSkeleton.propTypes = { mob: PropTypes.bool };

const CARD_S = {
  mob: {
    card: { width: '240px', height: '340px', borderRadius: '24px', scrollSnapAlign: 'center' },
    badge: { top: '20px', right: '20px' },
    badgeInner: { padding: '8px 16px', fontSize: '10px' },
    content: { bottom: '24px', left: '24px', right: '24px' },
    icon: 14,
    verified: '10px',
    name: '22px',
    meta: '13px'
  },
  desk: {
    card: { width: '340px', height: '460px', borderRadius: '48px', scrollSnapAlign: 'none' },
    badge: { top: '28px', right: '28px' },
    badgeInner: { padding: '10px 20px', fontSize: '12px' },
    content: { bottom: '40px', left: '40px', right: '40px' },
    icon: 18,
    verified: '12px',
    name: '30px',
    meta: '15px'
  }
};

const SpotlightCard = ({ creator, mob, onClick }) => {
  const v = mob ? CARD_S.mob : CARD_S.desk;
  const photo = creator.photo || creator.avatarUrl || creator.profile_pic || `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name)}&background=FF9431&color=fff`;
  const primaryNiche = Array.isArray(creator.niche) ? creator.niche[0] : (creator.niche || creator.category || 'Creator');

  return (
    <motion.div
      whileHover={mob ? {} : { y: -16, scale: 1.02 }}
      onClick={() => onClick(creator)}
      style={{
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#050505',
        boxShadow: '0 25px 50px -12px rgba(255, 148, 49, 0.15), 0 0 24px rgba(255, 148, 49, 0.05)',
        border: '1.5px solid rgba(255, 148, 49, 0.12)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        ...v.card
      }}
    >
      {/* Floating Niche Category Chip (Top Left) */}
      <div style={{ position: 'absolute', top: mob ? '20px' : '28px', left: mob ? '20px' : '28px', zIndex: 10 }}>
        <div style={{
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(10px)',
          padding: mob ? '6px 12px' : '8px 16px',
          borderRadius: '100px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          color: '#FF9431',
          fontSize: mob ? '9px' : '11px',
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          {primaryNiche}
        </div>
      </div>

      <motion.img 
        src={photo} 
        alt={creator.name}
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.6 }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }} />
      
      <div style={{ position: 'absolute', ...v.badge }}>
        <div style={{ 
          background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', 
          borderRadius: '100px', 
          border: '1px solid rgba(255,255,255,0.15)', color: '#fff', 
          fontWeight: 950, letterSpacing: '1px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          ...v.badgeInner
        }}>
          {creator.score || '98'} SCORE
        </div>
      </div>

      <div style={{ position: 'absolute', ...v.content }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <CheckCircle size={v.icon} color="#FF9431" fill="#FF9431" />
          <span style={{ fontSize: v.verified, fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px' }}>Elite Verified</span>
        </div>
        <h3 style={{ fontSize: v.name, fontWeight: 950, color: '#fff', marginBottom: '6px', letterSpacing: '-0.03em' }}>{creator.name}</h3>
        <p style={{ fontSize: v.meta, color: 'rgba(255,255,255,0.6)', fontWeight: 650 }}>{creator.city} • {fmt.num(creator.followers)} Reach</p>
      </div>
    </motion.div>
  );
};

SpotlightCard.propTypes = {
  creator: PropTypes.object.isRequired,
  mob: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

const SpotlightHeader = ({ mob, onAction }) => (
  <div style={{ 
    display: 'flex', 
    alignItems: mob ? 'center' : 'flex-end', 
    flexDirection: mob ? 'column' : 'row', 
    textAlign: mob ? 'center' : 'left', 
    justifyContent: 'space-between', 
    marginBottom: mob ? '28px' : '36px',
    gap: 16
  }}>
    <div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
        <Bdg color="orange" sm>HANDPICKED TALENT</Bdg>
        <span className="live-pulse-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444', display: 'inline-block' }} />
      </div>
      <h2 style={{ fontSize: mob ? '26px' : '36px', fontWeight: 950, color: '#0f172a', marginTop: '8px', letterSpacing: '-0.04em', lineHeight: 1.1 }}>Elite Spotlight</h2>
    </div>
    {!mob && <Btn outline sm onClick={onAction} style={{ borderRadius: '16px', padding: '12px 28px' }}>View All Verified</Btn>}
  </div>
);

SpotlightHeader.propTypes = {
  mob: PropTypes.bool,
  onAction: PropTypes.func.isRequired
};

const SpotlightList = ({ loading, skeletons, spotlightCreators, mob, onSelect }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div 
      ref={scrollRef}
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
        skeletons.map(i => <SpotlightSkeleton key={i} mob={mob} />)
      ) : (
        spotlightCreators.map((creator) => (
          <SpotlightCard 
            key={creator.id} 
            creator={creator} 
            mob={mob} 
            onClick={onSelect} 
          />
        ))
      )}
    </div>
  );
};

SpotlightList.propTypes = {
  loading: PropTypes.bool,
  skeletons: PropTypes.array.isRequired,
  spotlightCreators: PropTypes.array.isRequired,
  mob: PropTypes.bool,
  onSelect: PropTypes.func.isRequired
};

const EliteSpotlight = ({ mob, all, setSelectedCreator, dsp, loading }) => {
  const skeletons = [1, 2, 3, 4];
  const spotlightCreators = useMemo(() => all.filter(c => c.verified).slice(0, 5), [all]);

  return (
    <section style={{ 
      padding: mob ? '40px 0 20px' : '65px 0 45px', 
      background: 'radial-gradient(circle at top right, rgba(255, 148, 49, 0.05) 0%, #fcfcfc 70%)', 
      borderBottom: '1px solid #f1f5f9', 
      overflow: 'hidden' 
    }}>
      <div style={{ ...W(1280), padding: mob ? '0 16px' : '0 24px' }}>
        <SpotlightHeader mob={mob} onAction={() => dsp({ t: 'CF', v: { verified: true } })} />
        <SpotlightList 
          loading={loading} 
          skeletons={skeletons} 
          spotlightCreators={spotlightCreators} 
          mob={mob} 
          onSelect={setSelectedCreator} 
        />
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
        .live-pulse-dot {
          animation: livePulse 1.8s infinite;
        }
        @keyframes livePulse {
          0% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { transform: scale(1.1); box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
          100% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        @media (max-width: 1200px) {
          .creators-floating-icons-container {
            display: none !important;
          }
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

const CREATORS_HEADER_ICONS = [
  // Left Side
  { Icon: Sparkles, size: 28, top: '20%', left: '1.5%', color: '#FF9431', delay: 0, rotate: -15 },
  { Icon: Camera, size: 24, top: '55%', left: '4%', color: '#10B981', delay: 1.5, rotate: 12 },
  { Icon: TrendingUp, size: 26, top: '75%', left: '2.5%', color: '#3B82F6', delay: 0.8, rotate: -8 },

  // Right Side
  { Icon: InstagramIcon, size: 28, top: '22%', right: '1.5%', color: '#E1306C', delay: 2.2, rotate: 20 },
  { Icon: Video, size: 26, top: '50%', right: '4%', color: '#FF9431', delay: 1.2, rotate: 8 },
  { Icon: ShieldCheck, size: 28, top: '72%', right: '2.5%', color: '#10B981', delay: 2.5, rotate: -18 }
];

const CreatorsFloatingIcons = ({ mob }) => {
  if (mob) return null;

  return (
    <div className="creators-floating-icons-container" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 11 }}>
      {CREATORS_HEADER_ICONS.map((ico, index) => {
        const { Icon, size, top, left, right, color, delay, rotate } = ico;
        const style = {
          position: 'absolute',
          top,
          left,
          right,
          pointerEvents: 'none'
        };

        return (
          <motion.div
            key={`creators-bg-icon-${index}`}
            style={style}
            initial={{ y: 0, rotate }}
            animate={{
              y: [0, -10, 0],
              rotate: [rotate, rotate + 3, rotate],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay,
            }}
          >
            <div 
              style={{
                width: size + 24,
                height: size + 24,
                background: 'rgba(255, 255, 255, 0.75)',
                border: '1.5px solid rgba(0, 0, 0, 0.04)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
                backdropFilter: 'blur(12px)',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="floating-creator-btn"
            >
              <Icon size={size} color={color} strokeWidth={1.8} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

CreatorsFloatingIcons.propTypes = {
  mob: PropTypes.bool
};

const SearchLimitModal = ({ isOpen, onClose, onUnlock }) => {
  if (!isOpen) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(5, 5, 5, 0.85)',
        backdropFilter: 'blur(20px)', zIndex: 1000000,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '480px',
          background: '#fff', borderRadius: '32px', padding: '40px 32px',
          boxShadow: '0 50px 100px rgba(0,0,0,0.5)', textAlign: 'center',
          position: 'relative', border: '1px solid rgba(0, 0, 0, 0.05)'
        }}
      >
        <button 
          onClick={onClose} 
          style={{ 
            position: 'absolute', top: '20px', right: '20px', 
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#64748b', fontSize: '20px', fontWeight: 'bold'
          }}
        >
          ✕
        </button>

        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(255, 148, 49, 0.1) 0%, rgba(234, 88, 12, 0.1) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#EA580C',
          margin: '0 auto 24px',
          border: '1.5px solid rgba(234, 88, 12, 0.1)'
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" strokeWidth="3" />
          </svg>
        </div>

        <h3 style={{ fontSize: '22px', fontWeight: 950, color: '#0f172a', marginBottom: '12px', letterSpacing: '-0.02em' }}>
          Search Limit Reached
        </h3>
        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, fontWeight: 550, marginBottom: '32px' }}>
          You have reached the limit of 5 free searches as a guest. Sign in as a verified Brand to unlock unlimited searches, advanced filters, and direct creator access.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button 
            onClick={onUnlock}
            style={{
              background: 'linear-gradient(90deg, #FF9431, #EA580C)',
              color: '#fff', border: 'none', padding: '14px 28px',
              borderRadius: '100px', fontSize: '14px', fontWeight: 850,
              cursor: 'pointer', boxShadow: '0 12px 24px rgba(234, 88, 12, 0.25)',
              width: '100%'
            }}
          >
            Unlock as Brand
          </button>
          <button 
            onClick={onClose}
            style={{
              background: 'none', border: 'none', color: '#64748b',
              fontSize: '13px', fontWeight: 750, cursor: 'pointer', padding: '8px'
            }}
          >
            Close & Reset Filters
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

SearchLimitModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUnlock: PropTypes.func.isRequired
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
  const [searchCount, setSearchCount] = useState(() => {
    return Number(sessionStorage.getItem('cb_guest_search_count') || 0);
  });
  const [searchLimitModalOpen, setSearchLimitModalOpen] = useState(false);

  const safeDsp = (action) => {
    if (action.t === 'CF') {
      if (!st.user) {
        const isClear = action.v && (
          action.v.q === '' && 
          (action.v.niche === '' || (Array.isArray(action.v.niche) && action.v.niche.length === 0)) &&
          (action.v.platform === '' || (Array.isArray(action.v.platform) && action.v.platform.length === 0)) &&
          action.v.state === '' &&
          action.v.district === '' &&
          (action.v.minFollowers === 0 || action.v.minFollowers === '')
        );
        
        if (!isClear && searchCount >= 5) {
          setSearchLimitModalOpen(true);
          return;
        }
        
        if (!isClear) {
          const filterKeys = ['q', 'niche', 'platform', 'state', 'district', 'minFollowers', 'minER'];
          const hasFilterKeys = Object.keys(action.v).some(key => filterKeys.includes(key));
          
          if (hasFilterKeys) {
            const nextCount = searchCount + 1;
            setSearchCount(nextCount);
            sessionStorage.setItem('cb_guest_search_count', nextCount.toString());
            
            if (nextCount > 5) {
              setSearchLimitModalOpen(true);
              return;
            }
          }
        }
      }
    }
    dsp(action);
  };

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    
    // Parse URL Search Query
    const params = new URLSearchParams(globalThis.location.search);
    const q = params.get('q');
    if (q) {
      safeDsp({ t: 'CF', v: { q } });
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

  const visible = !st.user ? filtered.slice(0, Math.min(limit, 6)) : filtered.slice(0, limit);
  const stateCounts = useMemo(() => {
    return all.filter(Boolean).reduce((acc, c) => {
      const s = c?.state || 'Bharat';
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {});
  }, [all]);

  return (
    <div style={{ background: '#fff', minHeight: '100vh', width: '100%' }}>
      <Seo 
        title="Verified Creators Marketplace"
        description="Browse and connect with thousands of verified content creators across Bharat. Filter by niche, location, and impact scores."
        keywords="creator marketplace, hire influencers india, verified creators, brand collaborations india"
      />
      <div style={{ position: 'relative', width: '100%' }}>
        <EliteHeader
          eyebrow="Marketplace Hub"
          title={
            <>
              Discover the{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #FF9431, #EA580C)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Elite
              </span>{' '}
              Talent of{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #FF9431, #128807)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  paddingRight: mob ? 4 : 12,
                }}
              >
                Bharat
              </span>
            </>
          }
          sub={<>Unlock the power of authentic regional influence with India’s premier verified creator directory. Partner with {fmt.num(all.length)}+ leading digital stars across Tier-1, Tier-2, and Tier-3 cities to drive high-impact campaigns with complete price transparency and real-time metric scorecards.</>}
          gradient="saffron"
          light={true}
          compact={true}
        >
          <Btn
            lg
            active
            onClick={() => {
              const grid = document.getElementById('creators-grid-anchor');
              if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            style={{
              borderRadius: 999,
              padding: mob ? '0 24px' : '0 34px',
              height: mob ? 54 : 62,
              background: '#0f172a',
              color: '#fff',
              boxShadow: '0 18px 38px rgba(15, 23, 42, 0.18)'
            }}
          >
            Explore Verified Creators <ChevronRight size={20} />
          </Btn>
        </EliteHeader>
        <CreatorsFloatingIcons mob={mob} />
      </div>

      <EliteSpotlight mob={mob} all={all} setSelectedCreator={setSelectedCreator} dsp={safeDsp} loading={loading} />

      <SearchToolbar 
        mob={mob} f={f} dsp={safeDsp} setView={setView} view={view} 
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
                  safeDsp({ t: 'CF', v: { state: s, district: '' } });
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
            onSortChange={val => safeDsp({ t: 'CF', v: { sort: val } })}
            hasFilters={hasFilters}
          />

          {/* ACTIVE FILTER PILLS */}
          <ActiveFilters f={f} hasFilters={hasFilters} />

          <CreatorGrid 
            loading={loading} filtered={filtered} visible={visible} 
            view={view} mob={mob} limit={limit} setLimit={setLimit} 
            clearFilters={clearFilters}
            onCardView={c => setSelectedCreator(c)}
            isGated={!st.user}
            onUnlock={() => navigate('/login')}
          />
        </div>
      </div>

      <FilterSidebar 
        show={showFilters} onClose={() => setShowFilters(false)} 
        f={f} dsp={safeDsp} mob={mob} niches={NICHES} platforms={PLATFORMS} 
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

      <AnimatePresence>
        {searchLimitModalOpen && (
          <SearchLimitModal 
            isOpen={searchLimitModalOpen} 
            onClose={() => { setSearchLimitModalOpen(false); clearFilters(); }} 
            onUnlock={() => { setSearchLimitModalOpen(false); navigate('/login'); }} 
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
