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
  Camera,
  Star
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
  if (f.minRating) {
    const totalReviews = c.reviews?.length || 0;
    const avgRating = totalReviews > 0
      ? c.reviews.reduce((sum, r) => sum + r.r, 0) / totalReviews
      : 4.8;
    if (avgRating < Number(f.minRating)) return false;
  }
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
      src={creator.photo || creator.image || creator.avatarUrl || creator.profile_pic || `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name)}&background=FF9431&color=fff`} 
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

const DataHub = ({ creator, mob, saved, compared, requireBrand, dsp, onFullView, navigate }) => {
  const score = creator.score || fmt.score(creator);
  const cityLabel = typeof creator.city === 'object' ? creator.city.name : (creator.city || 'Bharat');
  const nicheLabel = Array.isArray(creator.niche) ? creator.niche.join(' & ') : (creator.niche || creator.category || 'Premium');
  const erRate = creator.er || 4.8;
  const followersCount = creator.followers || 125000;
  const authenticityScore = creator.authenticity || 98.2;
  const responseTimeVal = creator.responseTime || creator.response_time || '2.4 hrs';
  const repeatRateVal = creator.repeatRate || creator.repeat_rate || '85%';
  const bioText = creator.bio || `An elite storyteller, digital creator dedicated to high-impact content and cultural narratives across Bharat.`;
  const aiSummary = creator.ai_intel?.summary || creator.aiIntel?.summary || `Best suited for ${nicheLabel} brands. High conversion potential for product launches in ${cityLabel} cities.`;
  
  const rawLangs = creator.languages || creator.regional_dialects || 'Hindi';
  const cl = Array.isArray(rawLangs) ? rawLangs : (typeof rawLangs === 'string' ? rawLangs.split(',').map(x => x.trim()).filter(Boolean) : []);

  const audienceHubs = creator.audience_hubs || creator.audienceHubs || [
    { l: 'Fashion', p: 45 }, { l: 'Luxury', p: 30 }, 
    { l: 'Tech', p: 15 }, { l: 'Travel', p: 10 }
  ];
  const recentContent = creator.viral_content || creator.viralContent || [
    { views: fmt.num(followersCount / 2), img: `https://picsum.photos/seed/${creator.id}1/300/400` },
    { views: fmt.num(followersCount / 3), img: `https://picsum.photos/seed/${creator.id}2/300/400` },
    { views: fmt.num(followersCount / 4), img: `https://picsum.photos/seed/${creator.id}3/300/400` }
  ];
  const brandSafety = creator.ai_intel?.stats?.find(s => s.l.toLowerCase().includes('safety'))?.v || 'High (99.8%)';

  return (
    <div style={{ flex: 1, padding: mob ? '32px 24px' : '50px 60px', overflowY: 'auto' }} className="no-scrollbar">
      {/* TOP STATS & ACTIONS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
           <Bdg color="orange" lg style={{ padding: '12px 24px', fontSize: '14px', borderRadius: '16px' }}>{score} ELITE SCORE</Bdg>
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
            {aiSummary}
         </p>
      </div>

      {/* PERFORMANCE PULSE */}
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
         {[
           { l: 'Authenticity', v: authenticityScore + '%', c: '#10B981' },
           { l: 'Avg Engagement', v: erRate + '%', c: '#FF9431' },
           { l: 'Response Time', v: responseTimeVal, c: '#6366f1' },
           { l: 'Repeat Rate', v: repeatRateVal, c: '#f59e0b' }
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
              "{bioText}"
            </p>
         </div>
      </div>

      {/* LANGUAGES & AUDIENCE INTERESTS */}
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
         <div>
            <h4 style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>Languages Spoken</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
               {cl.length > 0 ? cl.map(l => (
                 <div key={l} style={{ 
                   padding: '8px 16px', background: 'rgba(79, 70, 229, 0.05)', border: '1.5px solid rgba(79, 70, 229, 0.15)', 
                   borderRadius: '100px', fontSize: '13px', fontWeight: 800, color: '#4f46e5'
                 }}>
                   🗣️ {l}
                 </div>
               )) : (
                 <div style={{ padding: '8px 16px', background: '#f8fafc', border: '1.5px solid #f1f5f9', borderRadius: '100px', fontSize: '13px', color: '#64748b', fontWeight: 650 }}>
                   Hindi
                 </div>
               )}
            </div>
         </div>
         <div>
            <h4 style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>Audience Hub breakdown</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
               {audienceHubs.map(i => (
                 <div key={i.l} style={{ 
                   padding: '8px 16px', background: '#fff', border: '1.5px solid #f1f5f9', 
                   borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px'
                 }}>
                    <span style={{ fontSize: '13px', fontWeight: 850, color: '#0f172a' }}>{i.l}</span>
                    <span style={{ fontSize: '12px', fontWeight: 900, color: '#FF9431' }}>{i.p}%</span>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* RECENT CONTENT TEASER */}
      <div style={{ marginBottom: '40px' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Top Performing Content</h4>
            <button style={{ fontSize: '11px', fontWeight: 900, color: '#FF9431', background: 'none', border: 'none', cursor: 'pointer' }} onClick={onFullView}>Audit All Posts</button>
         </div>
         <div style={{ display: 'flex', gap: '12px' }}>
            {recentContent.slice(0, 3).map((item, idx) => (
               <div key={idx} style={{ flex: 1, height: '120px', borderRadius: '20px', background: '#f1f5f9', overflow: 'hidden', position: 'relative' }}>
                  <img src={item.img || item.image || item.photo || `https://picsum.photos/seed/${creator.id + idx * 10}/300/400`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="content" />
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', padding: '4px 8px', borderRadius: '6px', color: '#fff', fontSize: '10px', fontWeight: 900 }}>
                     {item.views || fmt.num(followersCount / (idx + 2))} Views
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
               <ShieldCheck size={18} /> {brandSafety}
            </div>
         </div>
      </div>

      {/* VERIFIED BRAND REVIEWS PREVIEW */}
      <div style={{ marginBottom: '40px' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px', margin: 0 }}>Verified Brand Reviews</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 148, 49, 0.08)', padding: '6px 12px', borderRadius: '100px', border: '1px solid rgba(255, 148, 49, 0.15)' }}>
               <Star size={12} fill="#FF9431" color="#FF9431" />
               <span style={{ fontSize: '13px', fontWeight: 950, color: '#0f172a' }}>
                 {creator.reviews && creator.reviews.length > 0 
                   ? (creator.reviews.reduce((sum, r) => sum + r.r, 0) / creator.reviews.length).toFixed(1) 
                   : '5.0'}
               </span>
               <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>
                 ({creator.reviews && creator.reviews.length > 0 ? creator.reviews.length : 3})
               </span>
            </div>
         </div>
         
         <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {(creator.reviews || [
               { b: 'OYO Rooms', r: 5, t: 'Absolute professional. The Jaipur heritage campaign delivered 4x the expected engagement.', u: 'Brand Manager', d: '2 weeks ago', type: 'brand', id: 'oyo' },
               { b: 'Rohan Sharma', r: 5, t: 'The cultural storytelling in the summer drop was raw and authentic. Highly recommended!', u: 'Travel Creator', d: '1 month ago', type: 'creator', id: 'rohan' }
            ]).slice(0, 2).map((rev, idx) => (
              <div key={rev.id || idx} style={{ background: '#f8fafc', padding: '16px', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                     <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#fff', fontSize: '10px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       {rev.b ? rev.b[0] : 'B'}
                     </div>
                     <div>
                       <span style={{ fontSize: '12.5px', fontWeight: 850, color: '#0f172a' }}>{rev.b}</span>
                       <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 650, marginLeft: '6px' }}>{rev.u}</span>
                     </div>
                  </div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1,2,3,4,5].map(s => <Star key={s} size={10} fill={s <= rev.r ? '#FF9431' : 'none'} color={s <= rev.r ? '#FF9431' : '#e2e8f0'} />)}
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: '#475569', fontWeight: 550, margin: 0, lineHeight: 1.5, fontStyle: 'italic' }}>
                  "{rev.t}"
                </p>
              </div>
            ))}
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
}

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
    if (!st.user || st.role !== 'brand') {
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
  <section style={{ padding: mob ? '60px 16px' : '100px 24px', background: '#f8fafc' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>

      {/* ── Section label ── */}
      <div style={{ textAlign: 'center', marginBottom: mob ? 32 : 56 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '8px 20px', borderRadius: 100,
          background: 'rgba(255,148,49,0.06)', border: '1.5px solid rgba(255,148,49,0.15)',
          fontSize: 11, fontWeight: 950, color: '#FF9431', letterSpacing: '3px', textTransform: 'uppercase',
          marginBottom: 20
        }}>
          ✦ Your Next Move
        </div>
        <h2 style={{
          fontSize: mob ? 32 : 56, fontWeight: 950, color: '#0f172a',
          letterSpacing: '-0.04em', lineHeight: 1,
        }}>
          Ready to Scale your{' '}
          <span style={{ background: 'linear-gradient(135deg,#FF9431,#EA580C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Influence?
          </span>
        </h2>
        {!mob && (
          <p style={{ fontSize: 18, color: '#64748b', maxWidth: 600, margin: '16px auto 0', lineHeight: 1.65, fontWeight: 600 }}>
            Whether you're a brand hunting elite talent or a creator building your sovereign identity — CreatorBharat is your protocol for growth.
          </p>
        )}
      </div>

      {/* ── Split Card Row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 16 : 24 }}>

        {/* ─── BRAND CARD ─── */}
        <motion.div
          whileHover={mob ? {} : { y: -8, scale: 1.01 }}
          transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
          style={{
            position: 'relative', overflow: 'hidden',
            borderRadius: mob ? 28 : 40,
            background: '#0f172a',
            boxShadow: '0 32px 64px rgba(15,23,42,0.18)',
            cursor: 'pointer',
            minHeight: mob ? 340 : 460,
          }}
          onClick={() => navigate('/brand-register')}
        >
          {/* Real background photo — brand/advertising scene */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=900)',
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.35,
          }} />
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(160deg, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.92) 70%)',
          }} />
          {/* Saffron glow orb */}
          <div style={{
            position: 'absolute', top: -60, right: -60,
            width: 250, height: 250, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,148,49,0.2) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }} />

          {/* Floating stat chips */}
          <div style={{ position: 'absolute', top: mob ? 24 : 32, right: mob ? 20 : 32, display: 'flex', flexDirection: 'column', gap: 10, zIndex: 4 }}>
            {[
              { label: 'Avg Campaign ROI', value: '4.2x', color: '#10B981' },
              { label: 'Active Brands', value: '1,200+', color: '#FF9431' },
            ].map(s => (
              <div key={s.label} style={{
                background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14,
                padding: mob ? '8px 14px' : '10px 18px', textAlign: 'right',
              }}>
                <div style={{ fontSize: mob ? 16 : 20, fontWeight: 950, color: s.color, letterSpacing: '-0.03em' }}>{s.value}</div>
                <div style={{ fontSize: mob ? 9 : 10, fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Content */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: mob ? '28px 24px' : '44px 44px', zIndex: 4 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,148,49,0.12)', border: '1px solid rgba(255,148,49,0.25)',
              borderRadius: 100, padding: '6px 16px', marginBottom: 16
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF9431', display: 'block' }} />
              <span style={{ fontSize: 11, fontWeight: 950, color: '#FF9431', letterSpacing: '2px', textTransform: 'uppercase' }}>For Brands</span>
            </div>
            <h3 style={{ fontSize: mob ? 24 : 36, fontWeight: 950, color: '#fff', letterSpacing: '-0.04em', marginBottom: 10, lineHeight: 1.05 }}>
              Launch Campaigns<br />with Elite Creators
            </h3>
            <p style={{ fontSize: mob ? 13 : 15, color: 'rgba(255,255,255,0.55)', fontWeight: 600, lineHeight: 1.6, marginBottom: 28, maxWidth: 380 }}>
              Access India's most verified creator intelligence platform. Filter by niche, city, reach, and engagement — with AI matching and escrow payments.
            </p>
            <button
              onClick={e => { e.stopPropagation(); navigate('/brand-register'); }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: '#FF9431', color: '#fff', border: 'none',
                padding: mob ? '14px 28px' : '16px 36px', borderRadius: 14,
                fontSize: mob ? 14 : 15, fontWeight: 950, cursor: 'pointer',
                boxShadow: '0 16px 36px rgba(255,148,49,0.35)', transition: 'all 0.3s',
              }}
            >
              Start a Campaign
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* ─── CREATOR CARD ─── */}
        <motion.div
          whileHover={mob ? {} : { y: -8, scale: 1.01 }}
          transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
          style={{
            position: 'relative', overflow: 'hidden',
            borderRadius: mob ? 28 : 40,
            background: '#fff',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 20px 48px rgba(15,23,42,0.06)',
            cursor: 'pointer',
            minHeight: mob ? 340 : 460,
          }}
          onClick={() => navigate('/apply')}
        >
          {/* Real background photo — creator/studio scene */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=900)',
            backgroundSize: 'cover', backgroundPosition: 'center top',
            opacity: 0.12,
          }} />
          {/* Light gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(160deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.97) 65%)',
          }} />
          {/* Saffron glow orb top-right */}
          <div style={{
            position: 'absolute', top: -40, right: -40,
            width: 220, height: 220, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,148,49,0.08) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }} />

          {/* Floating stat chips */}
          <div style={{ position: 'absolute', top: mob ? 24 : 32, right: mob ? 20 : 32, display: 'flex', flexDirection: 'column', gap: 10, zIndex: 4 }}>
            {[
              { label: 'Avg Brand Deals/mo', value: '₹48K', color: '#0f172a' },
              { label: 'Verified Creators', value: '2,400+', color: '#FF9431' },
            ].map(s => (
              <div key={s.label} style={{
                background: '#f8fafc', border: '1px solid #e2e8f0',
                borderRadius: 14, padding: mob ? '8px 14px' : '10px 18px', textAlign: 'right',
              }}>
                <div style={{ fontSize: mob ? 16 : 20, fontWeight: 950, color: s.color, letterSpacing: '-0.03em' }}>{s.value}</div>
                <div style={{ fontSize: mob ? 9 : 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Content */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: mob ? '28px 24px' : '44px 44px', zIndex: 4 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: 100, padding: '6px 16px', marginBottom: 16
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'block' }} />
              <span style={{ fontSize: 11, fontWeight: 950, color: '#10B981', letterSpacing: '2px', textTransform: 'uppercase' }}>For Creators</span>
            </div>
            <h3 style={{ fontSize: mob ? 24 : 36, fontWeight: 950, color: '#0f172a', letterSpacing: '-0.04em', marginBottom: 10, lineHeight: 1.05 }}>
              Build Your Sovereign<br />Creator Identity
            </h3>
            <p style={{ fontSize: mob ? 13 : 15, color: '#64748b', fontWeight: 600, lineHeight: 1.6, marginBottom: 28, maxWidth: 380 }}>
              Get AI-generated media kits, live analytics dashboards, and direct access to India's top brand deals — all in one place. Zero commission. Full control.
            </p>
            <button
              onClick={e => { e.stopPropagation(); navigate('/apply'); }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: '#0f172a', color: '#fff', border: 'none',
                padding: mob ? '14px 28px' : '16px 36px', borderRadius: 14,
                fontSize: mob ? 14 : 15, fontWeight: 950, cursor: 'pointer',
                boxShadow: '0 16px 36px rgba(15,23,42,0.15)', transition: 'all 0.3s',
              }}
            >
              Join as a Creator
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom trust row ── */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
        gap: mob ? 12 : 24, marginTop: mob ? 32 : 48,
      }}>
        {[
          { icon: '🔒', text: 'Escrow-Secured Payments' },
          { icon: '⚡', text: 'Live Campaign Analytics' },
          { icon: '✅', text: 'AI-Verified Profiles' },
          { icon: '🇮🇳', text: 'Made for Bharat' },
          { icon: '🚫', text: 'Zero Hidden Commission' },
        ].map(t => (
          <div key={t.text} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontSize: 13, fontWeight: 700, color: '#475569',
          }}>
            <span style={{ fontSize: 16 }}>{t.icon}</span>
            {t.text}
          </div>
        ))}
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
  const photo = creator.photo || creator.image || creator.avatarUrl || creator.profile_pic || `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name)}&background=FF9431&color=fff`;
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

const SpotlightHeader = ({ mob, onAction, count }) => (
  <div style={{ 
    display: 'flex', 
    alignItems: mob ? 'flex-start' : 'center', 
    flexDirection: mob ? 'column' : 'row', 
    textAlign: 'left', 
    justifyContent: 'space-between', 
    marginBottom: mob ? '24px' : '36px',
    gap: 16
  }}>
    <div>
      {/* Row: badge + live dot */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: 10 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,148,49,0.07)', border: '1.5px solid rgba(255,148,49,0.18)',
          borderRadius: 100, padding: '5px 14px',
          fontSize: 10, fontWeight: 950, color: '#FF9431', letterSpacing: '2px', textTransform: 'uppercase'
        }}>
          <span className="live-pulse-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#EF4444', display: 'inline-block', flexShrink: 0 }} />
          LIVE HANDPICKED TALENT
        </div>
        {count > 0 && (
          <div style={{ fontSize: 13, fontWeight: 800, color: '#64748b', background: '#f1f5f9', padding: '4px 12px', borderRadius: 100 }}>
            {count} verified
          </div>
        )}
      </div>
      <h2 style={{ fontSize: mob ? '26px' : '40px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.05em', lineHeight: 1.0, marginBottom: 6 }}>Elite Spotlight</h2>
      {!mob && <p style={{ fontSize: 14, color: '#94a3b8', fontWeight: 600, maxWidth: 440 }}>India's most followed and campaign-ready verified creators — handpicked by our AI talent engine.</p>}
    </div>
    <button
      onClick={onAction}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        background: '#0f172a', color: '#fff', border: 'none',
        padding: mob ? '12px 24px' : '14px 30px', borderRadius: 14,
        fontSize: mob ? 13 : 14, fontWeight: 950, cursor: 'pointer',
        boxShadow: '0 12px 28px rgba(15,23,42,0.14)', transition: 'all 0.3s',
        whiteSpace: 'nowrap', flexShrink: 0,
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#FF9431'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(255,148,49,0.3)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = '#0f172a'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(15,23,42,0.14)'; }}
    >
      View All Verified
      <ChevronRight size={16} />
    </button>
  </div>
);

SpotlightHeader.propTypes = {
  mob: PropTypes.bool,
  onAction: PropTypes.func.isRequired,
  count: PropTypes.number
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
  const verifiedCount = useMemo(() => all.filter(c => c.verified).length, [all]);

  const handleViewAll = () => {
    dsp({ t: 'CF', v: { verified: true } });
    const grid = document.getElementById('creators-grid-anchor');
    if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section style={{ 
      padding: mob ? '40px 0 20px' : '65px 0 45px', 
      background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)', 
      borderBottom: '1px solid #f1f5f9', 
      overflow: 'hidden' 
    }}>
      <div style={{ ...W(1280), padding: mob ? '0 16px' : '0 24px' }}>
        <SpotlightHeader mob={mob} onAction={handleViewAll} count={verifiedCount} />
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

const FREE_SEARCH_LIMIT = 5;

const SearchLimitModal = ({ isOpen, onClose, onUnlock, usedSearches }) => {
  if (!isOpen) return null;
  const dots = Array.from({ length: FREE_SEARCH_LIMIT });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(5,5,5,0.88)',
        backdropFilter: 'blur(24px)', zIndex: 1000000,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '480px',
          background: '#fff', borderRadius: '36px', padding: '44px 36px',
          boxShadow: '0 60px 120px rgba(0,0,0,0.45)', textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Close */}
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: '#f1f5f9', border: 'none', cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#64748b' }}>✕</button>

        {/* Icon */}
        <div style={{ width: 72, height: 72, borderRadius: 24, background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 20px 40px rgba(15,23,42,0.2)' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF9431" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <div style={{ fontSize: 11, fontWeight: 950, color: '#FF9431', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 12 }}>Free Limit Reached</div>
        <h3 style={{ fontSize: 26, fontWeight: 950, color: '#0f172a', marginBottom: 12, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          You've used all<br />{FREE_SEARCH_LIMIT} free searches
        </h3>
        <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65, fontWeight: 600, marginBottom: 28, maxWidth: 360, margin: '0 auto 28px' }}>
          Sign in as a verified Brand to unlock unlimited searches, advanced filters, AI creator matching, and direct campaign tools.
        </p>

        {/* Search usage dots */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 32 }}>
          {dots.map((_, i) => (
            <div key={i} style={{
              width: i < (usedSearches || FREE_SEARCH_LIMIT) ? 32 : 10,
              height: 10, borderRadius: 100, transition: 'all 0.4s',
              background: i < (usedSearches || FREE_SEARCH_LIMIT) ? '#FF9431' : '#f1f5f9',
            }} />
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            onClick={onUnlock}
            style={{
              background: '#0f172a', color: '#fff', border: 'none',
              padding: '16px 28px', borderRadius: 16,
              fontSize: 15, fontWeight: 950, cursor: 'pointer',
              boxShadow: '0 16px 36px rgba(15,23,42,0.18)', width: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            }}
          >
            Login as Brand — Unlock All
            <ChevronRight size={18} />
          </button>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: 13, fontWeight: 750, cursor: 'pointer', padding: '8px' }}>
            Continue Browsing (View Only)
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

SearchLimitModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUnlock: PropTypes.func.isRequired,
  usedSearches: PropTypes.number
};

const SPOTLIGHT_CREATORS = [
  {
    name: 'Anjali Sharma',
    handle: '@anjali_style',
    niche: 'Fashion & Lifestyle',
    followers: '840K',
    engagement: '5.2%',
    city: 'Mumbai',
    score: 96,
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
    color: '#FF9431'
  },
  {
    name: 'Rohan Mehra',
    handle: '@rohan_tech',
    niche: 'Tech & Gadgets',
    followers: '1.2M',
    engagement: '4.8%',
    city: 'Delhi',
    score: 95,
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    color: '#10B981'
  },
  {
    name: 'Kabir Sen',
    handle: '@kabir_vlogs',
    niche: 'Travel & Vlogs',
    followers: '680K',
    engagement: '6.1%',
    city: 'Kolkata',
    score: 92,
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    color: '#3B82F6'
  }
];

const MobileCreatorDeck = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % SPOTLIGHT_CREATORS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      width: '280px',
      height: '380px',
      position: 'relative',
      margin: '24px auto 36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2,
    }}>
      {/* Smartphone Outer Shell Wrapper */}
      <div style={{
        width: '100%',
        height: '100%',
        background: '#0f172a',
        borderRadius: '36px',
        padding: '10px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 10px rgba(15, 23, 42, 0.95)',
        border: '2px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Notch */}
        <div style={{
          width: '110px',
          height: '18px',
          background: '#000',
          borderRadius: '0 0 14px 14px',
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }} />

        {/* Screen Content */}
        <div style={{
          flex: 1,
          background: '#f8fafc',
          borderRadius: '28px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 14px 14px',
          position: 'relative',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '10px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Spotlight</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
              <span style={{ fontSize: '8px', fontWeight: 900, color: '#10b981', textTransform: 'uppercase' }}>Online</span>
            </div>
          </div>

          {/* Cards Stack */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              {SPOTLIGHT_CREATORS.map((c, idx) => {
                if (idx !== activeIdx) return null;
                return (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -15 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: '#fff',
                      borderRadius: '20px',
                      border: '1.5px solid #e2e8f0',
                      boxShadow: '0 10px 25px rgba(15, 23, 42, 0.05)',
                      padding: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxSizing: 'border-box',
                    }}
                  >
                    {/* Profile Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                      <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: `2.5px solid ${c.color}`,
                        boxShadow: `0 4px 10px ${c.color}25`,
                        marginBottom: '8px',
                      }}>
                        <img src={c.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <h4 style={{ fontSize: '13px', fontWeight: 950, color: '#0f172a', margin: 0 }}>{c.name}</h4>
                        <CheckCircle size={12} color="#fff" fill="#10B981" />
                      </div>
                      <span style={{ fontSize: '9px', color: '#64748b', fontWeight: 700, marginTop: '1px' }}>{c.handle}</span>
                      
                      {/* Niche Badge */}
                      <span style={{
                        fontSize: '8px',
                        fontWeight: 900,
                        background: `${c.color}15`,
                        color: c.color,
                        padding: '3px 8px',
                        borderRadius: '100px',
                        marginTop: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}>
                        {c.niche}
                      </span>
                    </div>

                    {/* Stats Grid */}
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(2, 1fr)', 
                      gap: '6px',
                      background: '#f8fafc',
                      padding: '8px',
                      borderRadius: '10px',
                      marginTop: '8px',
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '7px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Followers</div>
                        <div style={{ fontSize: '11px', fontWeight: 950, color: '#0f172a' }}>{c.followers}</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '7px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Engagement</div>
                        <div style={{ fontSize: '11px', fontWeight: 950, color: '#10B981' }}>{c.engagement}</div>
                      </div>
                    </div>

                    {/* Bharat Score and Location Footer */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '6px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>Bharat Score</div>
                        <div style={{ fontSize: '11px', fontWeight: 950, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '2px' }}>
                          <Sparkles size={10} color="#FF9431" /> {c.score}
                        </div>
                      </div>
                      <span style={{ fontSize: '9px', fontWeight: 800, color: '#475569' }}>{c.city}</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
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
  const [searchLimitModalOpen, setSearchLimitModalOpen] = useState(false);

  // Track how many searches a guest has used (session only, resets on refresh)
  const guestSearchCount = useRef(0);

  // Guest users: 5 free filter/search actions, then login prompt
  const safeDsp = (action) => {
    if (action.t === 'CF' && !st.user) {
      // Determine if this action is a real filter (not a reset/clear)
      const isClear = action.v && (
        action.v.q === '' &&
        (action.v.niche === '' || (Array.isArray(action.v.niche) && action.v.niche.length === 0)) &&
        (action.v.platform === '' || (Array.isArray(action.v.platform) && action.v.platform.length === 0)) &&
        action.v.state === '' &&
        action.v.district === '' &&
        (action.v.minFollowers === 0 || action.v.minFollowers === '')
      );

      if (!isClear) {
        guestSearchCount.current += 1;
        if (guestSearchCount.current > FREE_SEARCH_LIMIT) {
          // Limit exceeded — show premium gate
          setSearchLimitModalOpen(true);
          return;
        }
        // Still within free limit — allow, but update so UI can show counter
      }
    }
    dsp(action);
  };

  // Remaining free searches (only relevant for guests)
  const remainingSearches = Math.max(0, FREE_SEARCH_LIMIT - guestSearchCount.current);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    
    // Parse URL Search Query
    const params = new URLSearchParams(globalThis.location.search);
    const q = params.get('q');
    if (q) {
      safeDsp({ t: 'CF', v: { q } });
    }
    
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    
    const activeFilters = {};
    if (f.q) activeFilters.q = f.q;
    if (f.state) activeFilters.state = f.state;
    if (f.niche && f.niche.length > 0) activeFilters.niche = f.niche;
    if (f.platform && f.platform.length > 0) activeFilters.platform = f.platform;
    if (f.verified) activeFilters.verified = f.verified;
    if (f.minFollowers) activeFilters.minFollowers = f.minFollowers;
    if (f.sort && f.sort !== 'score') activeFilters.sort = f.sort;

    const timer = setTimeout(() => {
      fetchCreators({ limit: 500, filters: activeFilters })
        .then(list => {
          if (active) {
            setAll(list);
            setLoading(false);
          }
        })
        .catch(() => {
          if (active) setLoading(false);
        });
    }, 300); // 300ms debounce

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [f]);

  const hasFilters = !!(f.search || (f.niche && f.niche.length > 0) || (f.platform && f.platform.length > 0) || f.state || f.district || f.minFollowers > 0 || f.maxFollowers > 0 || f.minRating);
  
  const clearFilters = () => {
    dsp({ t: 'CF', v: { search: '', niche: '', platform: '', state: '', district: '', minFollowers: 0, maxFollowers: 0, q: '', verified: false, sort: 'score', minRating: '' } });
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
      {/* ═══════════════════════════════════════════════
          WORLD-CLASS CINEMATIC CREATORS HERO
      ═══════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        minHeight: mob ? 'auto' : '620px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        borderBottom: '1px solid #e2e8f0',
        padding: mob ? '100px 20px 60px' : '140px 24px 90px',
      }}>

        {/* ── Full-bleed creator photo on right ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/creator_landing_hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: mob ? 'center top' : 'right center',
          opacity: mob ? 0.15 : 0.9,
          zIndex: 0,
        }} />

        {/* ── White → transparent gradient mask (left to right) ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: mob
            ? 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.96) 100%)'
            : 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 30%, rgba(255,255,255,0.6) 58%, rgba(255,255,255,0) 80%)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />

        {/* Ambient Glowing Blobs on Mobile */}
        {mob && (
          <>
            <div style={{
              position: 'absolute',
              top: '-10%',
              right: '-10%',
              width: '280px',
              height: '280px',
              background: 'radial-gradient(circle, rgba(255, 148, 49, 0.12) 0%, transparent 70%)',
              filter: 'blur(40px)',
              zIndex: 1,
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-10%',
              left: '-10%',
              width: '280px',
              height: '280px',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
              filter: 'blur(40px)',
              zIndex: 1,
              pointerEvents: 'none'
            }} />
          </>
        )}

        {/* ── Top accent stripe (Tricolor) ── */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #FF9431 0%, #ffffff 50%, #128807 100%)',
          zIndex: 10,
        }} />

        {/* ── Content Layer ── */}
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
          padding: mob ? '0 4px' : '0 24px',
          position: 'relative',
          zIndex: 5,
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: mob ? 'center' : 'flex-start',
            maxWidth: mob ? '100%' : '640px',
            textAlign: mob ? 'center' : 'left',
          }}>

            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 20px',
                background: 'rgba(255,148,49,0.06)',
                border: '1.5px solid rgba(255,148,49,0.15)',
                borderRadius: '100px',
                marginBottom: '28px',
              }}
            >
              <span style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'block' }} />
                <span style={{
                  position: 'absolute',
                  inset: '-4px',
                  borderRadius: '50%',
                  border: '2px solid #10B981',
                  opacity: 0.5,
                  animation: 'creatorPulse 2s infinite ease-in-out',
                }} />
              </span>
              <span style={{ fontSize: '11px', fontWeight: 950, color: '#FF9431', letterSpacing: '3px', textTransform: 'uppercase' }}>
                {fmt.num(all.length || 2400)}+ Verified Creators Live
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: mob ? '40px' : '74px',
                fontWeight: 950,
                color: '#0f172a',
                letterSpacing: '-0.05em',
                lineHeight: 0.94,
                marginBottom: '28px',
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              Find Bharat's{' '}
              <span style={{
                background: 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Elite
              </span>
              <br />
              Creator{' '}
              <span style={{
                background: 'linear-gradient(135deg, #FF9431 0%, #128807 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Network.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontSize: mob ? '15px' : '18px',
                color: '#475569',
                maxWidth: '560px',
                marginBottom: '40px',
                fontWeight: 600,
                lineHeight: 1.65,
                letterSpacing: '0.01em',
              }}
            >
              India's most trusted creator intelligence platform. Discover, verify, and collaborate with <span style={{ color: '#0f172a', fontWeight: 800 }}>authentic regional voices</span> across Tier-1, Tier-2, and Tier-3 cities — with real-time metric scorecards and secure escrow payments.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                display: 'flex',
                gap: '14px',
                flexDirection: mob ? 'column' : 'row',
                width: mob ? '100%' : 'auto',
                marginBottom: '48px',
              }}
            >
              <Btn
                lg
                onClick={() => {
                  const grid = document.getElementById('creators-grid-anchor');
                  if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                style={{
                  background: '#0f172a',
                  color: '#fff',
                  padding: '16px 32px',
                  borderRadius: '14px',
                  fontWeight: 950,
                  fontSize: '15px',
                  width: mob ? '100%' : 'auto',
                  boxShadow: '0 16px 36px rgba(15,23,42,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                Explore Creators <ChevronRight size={18} />
              </Btn>
              <Btn
                lg
                onClick={() => navigate('/brand-register')}
                style={{
                  background: '#fff',
                  color: '#0f172a',
                  padding: '16px 32px',
                  borderRadius: '14px',
                  border: '1.5px solid #e2e8f0',
                  fontWeight: 950,
                  fontSize: '15px',
                  width: mob ? '100%' : 'auto',
                }}
              >
                Post a Campaign
              </Btn>
            </motion.div>

            {/* Mobile-only Graphic: Smartphone verified creators carousel */}
            {mob && <MobileCreatorDeck />}

            {/* Trust Badge Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                justifyContent: mob ? 'center' : 'flex-start',
              }}
            >
              {[
                { icon: <ShieldCheck size={14} />, label: 'AI-Verified Profiles', color: '#10B981' },
                { icon: <TrendingUp size={14} />, label: 'Real-time Analytics', color: '#3B82F6' },
                { icon: <Sparkles size={14} />, label: 'Zero Commission', color: '#FF9431' },
                { icon: <CheckCircle size={14} />, label: 'Secure Escrow', color: '#8B5CF6' },
              ].map(b => (
                <div key={b.label} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '100px',
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#475569',
                }}>
                  <span style={{ color: b.color }}>{b.icon}</span>
                  {b.label}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Floating live stat cards (desktop only) ── */}
        {!mob && (
          <>
            {/* Top-right floating card: Creators Today */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              style={{
                position: 'absolute',
                top: '120px',
                right: '80px',
                zIndex: 8,
                background: '#0f172a',
                borderRadius: '20px',
                padding: '18px 24px',
                boxShadow: '0 24px 48px rgba(15,23,42,0.2)',
                border: '1px solid rgba(255,255,255,0.08)',
                minWidth: '200px',
              }}
            >
              <div style={{ fontSize: '10px', fontWeight: 900, color: '#FF9431', letterSpacing: '2px', marginBottom: '8px', textTransform: 'uppercase' }}>New This Week</div>
              <div style={{ fontSize: '32px', fontWeight: 950, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>+247</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 700, marginTop: '6px' }}>Verified creators joined</div>
              <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
                {[1,2,3,4,5].map(i => (
                  <div key={i} style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: `hsl(${i * 40}, 60%, 55%)`,
                    border: '2px solid #0f172a',
                    marginLeft: i > 1 ? '-10px' : 0,
                    backgroundImage: `url(https://picsum.photos/seed/${i * 77}/60/60)`,
                    backgroundSize: 'cover',
                  }} />
                ))}
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#FF9431', border: '2px solid #0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '-10px', fontSize: '9px', fontWeight: 900, color: '#fff' }}>+242</div>
              </div>
            </motion.div>

            {/* Mid-right floating card: Avg Engagement */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: '330px',
                right: '48px',
                zIndex: 8,
                background: '#fff',
                borderRadius: '20px',
                padding: '16px 22px',
                boxShadow: '0 20px 40px rgba(15,23,42,0.08)',
                border: '1px solid #e2e8f0',
                minWidth: '180px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TrendingUp size={16} color="#10B981" />
                </div>
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Avg. Engagement</span>
              </div>
              <div style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.03em' }}>4.8%</div>
              <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 800, marginTop: '4px' }}>↑ 2.1x vs industry avg</div>
            </motion.div>

            {/* Bottom-right floating card: ROI */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 1 }}
              style={{
                position: 'absolute',
                bottom: '60px',
                right: '140px',
                zIndex: 8,
                background: 'rgba(255,148,49,0.95)',
                borderRadius: '16px',
                padding: '14px 20px',
                boxShadow: '0 16px 36px rgba(255,148,49,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={18} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 900, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '1px' }}>Avg Campaign ROI</div>
                <div style={{ fontSize: '20px', fontWeight: 950, color: '#fff', letterSpacing: '-0.02em' }}>4.2x Return</div>
              </div>
            </motion.div>
          </>
        )}

        <style>{`
          @keyframes creatorPulse {
            0%   { transform: scale(0.8); opacity: 0.7; }
            50%  { transform: scale(1.5); opacity: 0.1; }
            100% { transform: scale(0.8); opacity: 0.7; }
          }
        `}</style>
      </section>



      <SearchToolbar 
        mob={mob} f={f} dsp={safeDsp} setView={setView} view={view} 
        setShowMap={setShowMap} showMap={showMap} setShowFilters={setShowFilters} 
        niches={NICHES} platforms={PLATFORMS}
      />

      {/* ── Guest free-search quota indicator ── */}
      {!st.user && (
        <div style={{
          background: remainingSearches <= 2 ? 'rgba(255,148,49,0.04)' : '#fafafa',
          borderBottom: '1px solid #f1f5f9',
          padding: mob ? '10px 16px' : '10px 24px',
        }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: remainingSearches <= 1 ? '#EA580C' : '#64748b' }}>
                {remainingSearches > 0 ? `${remainingSearches} free search${remainingSearches !== 1 ? 'es' : ''} remaining` : 'Free search limit reached'}
              </span>
              <div style={{ display: 'flex', gap: 4 }}>
                {Array.from({ length: FREE_SEARCH_LIMIT }).map((_, i) => (
                  <div key={i} style={{
                    width: 20, height: 6, borderRadius: 100,
                    background: i < guestSearchCount.current ? '#FF9431' : '#e2e8f0',
                    transition: 'background 0.3s',
                  }} />
                ))}
              </div>
            </div>
            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'none', border: '1px solid #e2e8f0',
                padding: '6px 16px', borderRadius: 100,
                fontSize: 12, fontWeight: 800, color: '#0f172a', cursor: 'pointer',
              }}
            >
              Login as Brand — Unlimited Access
            </button>
          </div>
        </div>
      )}

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
            onClose={() => setSearchLimitModalOpen(false)} 
            onUnlock={() => { setSearchLimitModalOpen(false); navigate('/login'); }}
            usedSearches={guestSearchCount.current}
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
