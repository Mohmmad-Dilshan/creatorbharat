import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  Zap, Search, X, Heart, Bookmark, CheckCircle2, Globe, Users, MapPin, Layers, Calendar
} from 'lucide-react';

// Custom Social Icons

import { useApp } from '@/core/context';
import { fmt, LS } from '../../utils/helpers';
import { fetchCampaigns } from '../../utils/platformService';
import { Btn, SkeletonCard, Modal, Fld } from '@/components/common/Primitives';
import EliteHeader from '../../components/layout/EliteHeader';

// ----------------------------------------------------------------------
// 1. BRAND TOKENS
// ----------------------------------------------------------------------

const THEME = {
  primary: '#FF9431',
  dark: '#0f172a',
  bg: '#f8fafc',
  surface: '#ffffff',
  border: '#e2e8f0',
  text: '#0f172a',
  textSec: '#64748b',
  accent: 'linear-gradient(135deg, #FF9431 0%, #FFB366 100%)',
  radius: '24px',
  shadow: '0 20px 50px rgba(15, 23, 42, 0.05)'
};

const COVERS = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'
];

// ----------------------------------------------------------------------
// 2. ELITE COMPONENTS
// ----------------------------------------------------------------------

const MarketplaceStats = ({ isMob }) => (
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: isMob ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
    gap: isMob ? '12px' : '24px', 
    marginBottom: isMob ? '32px' : '48px' 
  }}>
    {[
      { l: 'Active Deals', v: '1.2K+', c: '#3B82F6' },
      { l: 'Avg. Payout', v: '₹45K', c: '#10B981' },
      { l: 'Top Brands', v: '450+', c: '#6366F1' },
      { l: 'Success Rate', v: '98%', c: '#F59E0B' }
    ].map(s => (
      <div key={s.l} style={{ 
        background: '#fff', 
        padding: isMob ? '16px' : '24px', 
        borderRadius: '16px', 
        border: '1px solid #e2e8f0', 
        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03)' 
      }}>
        <div style={{ fontSize: '9px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{s.l}</div>
        <div style={{ fontSize: isMob ? '18px' : '24px', fontWeight: 900, color: '#0f172a' }}>{s.v}</div>
      </div>
    ))}
  </div>
);

const PublicLandingCard = ({ isMob }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
    style={{ 
      background: THEME.dark, borderRadius: THEME.radius, padding: isMob ? '32px 24px' : '60px', 
      gridColumn: isMob ? 'span 1' : 'span 2', position: 'relative', overflow: 'hidden', 
      display: 'flex', flexDirection: isMob ? 'column' : 'row', alignItems: 'center', gap: '40px',
      border: 'none', boxShadow: '0 40px 80px rgba(0,0,0,0.2)'
    }}
  >
    <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40%', background: `linear-gradient(90deg, transparent, rgba(255,148,49,0.05))`, pointerEvents: 'none' }} />
    <div style={{ zIndex: 1, flex: 1 }}>
       <div style={{ color: THEME.primary, fontWeight: 950, letterSpacing: '4px', fontSize: '11px', marginBottom: '16px' }}>FOR BRANDS & AGENCIES</div>
       <h2 style={{ fontSize: isMob ? '32px' : '56px', fontWeight: 950, color: '#fff', lineHeight: 1.05, marginBottom: '20px', letterSpacing: '-0.04em' }}>
         Scale Your <br/> <span style={{ color: THEME.primary }}>Brand Impact.</span>
       </h2>
       <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: isMob ? '16px' : '18px', lineHeight: 1.6, marginBottom: '40px', maxWidth: '500px' }}>Post your campaign and reach India's most influential creators. Start your discovery journey today.</p>
       <div style={{ display: 'flex', gap: '12px', flexDirection: isMob ? 'column' : 'row' }}>
          <Btn lg style={{ background: THEME.primary, color: '#fff', padding: '16px 32px', borderRadius: '12px', fontWeight: 950 }}>Create Campaign</Btn>
          <Btn lg style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '16px 32px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 950 }}>Partner with Us</Btn>
       </div>
    </div>
    {!isMob && (
      <div style={{ flex: 1, position: 'relative', height: '400px' }}>
         <img src={COVERS[3]} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '32px', filter: 'brightness(0.8)' }} alt="" />
         <div style={{ position: 'absolute', top: '-20px', right: '-20px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            <div style={{ fontSize: '10px', color: THEME.primary, fontWeight: 900, marginBottom: '8px' }}>MONTHLY REACH</div>
            <div style={{ fontSize: '24px', color: '#fff', fontWeight: 950 }}>2.4M+</div>
         </div>
         <div style={{ position: 'absolute', bottom: '20px', left: '-40px', background: '#fff', padding: '20px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: THEME.primary, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Zap size={20} color="#fff" />
            </div>
            <div>
               <div style={{ fontSize: '13px', fontWeight: 950, color: THEME.dark }}>Growth Accelerated</div>
               <div style={{ fontSize: '11px', color: THEME.textSec, fontWeight: 700 }}>AI Optimized Discovery</div>
            </div>
         </div>
      </div>
    )}
  </motion.div>
);

const FinalDiscoveryCard = ({ isMob }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
    style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: THEME.radius, padding: isMob ? '32px 24px' : '80px', 
      gridColumn: isMob ? 'span 1' : 'span 2', position: 'relative', overflow: 'hidden', 
      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
      border: 'none', boxShadow: '0 40px 100px rgba(0,0,0,0.3)', marginTop: '40px'
    }}
  >
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(255,148,49,0.1), transparent 50%)' }} />
    <div style={{ zIndex: 1 }}>
       <div style={{ color: THEME.primary, fontWeight: 950, letterSpacing: '6px', fontSize: '11px', marginBottom: '24px' }}>READY TO LAUNCH?</div>
       <h2 style={{ fontSize: isMob ? '36px' : '64px', fontWeight: 950, color: '#fff', lineHeight: 1.05, marginBottom: '32px', letterSpacing: '-0.04em' }}>
         Don't Just Discover. <br/> <span style={{ color: THEME.primary }}>Own the Conversation.</span>
       </h2>
       <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: isMob ? '16px' : '20px', lineHeight: 1.6, marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>Join 500+ elite brands already scaling with CreatorBharat. Your next viral campaign starts here.</p>
       <div style={{ display: 'flex', gap: '20px', flexDirection: isMob ? 'column' : 'row', justifyContent: 'center' }}>
          <Btn lg style={{ background: THEME.primary, color: '#fff', padding: '18px 48px', borderRadius: '16px', fontWeight: 950, fontSize: '18px' }}>Get Started Now</Btn>
          <Btn lg style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '18px 48px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 950, fontSize: '18px' }}>Talk to Expert</Btn>
       </div>
    </div>
  </motion.div>
);

const MarketplaceBenefits = ({ isMob }) => (
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: isMob ? '1fr' : 'repeat(4, 1fr)', 
    gap: '24px', 
    gridColumn: isMob ? 'span 1' : 'span 2',
    marginTop: '60px',
    marginBottom: '20px'
  }}>
    {[
      { t: 'Secure Escrow', d: 'Payments released only on milestone completion.', i: <CheckCircle2 size={24} /> },
      { t: 'AI Matching', d: 'Find creators that align perfectly with your brand DNA.', i: <Zap size={24} /> },
      { t: 'Live Analytics', d: 'Track every impression and conversion in real-time.', i: <Globe size={24} /> },
      { t: 'Legal Ready', d: 'Automated contracts and compliance for all deals.', i: <Users size={24} /> }
    ].map(b => (
      <div key={b.t} style={{ background: '#fff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
        <div style={{ color: THEME.primary, marginBottom: '20px' }}>{b.i}</div>
        <div style={{ fontSize: '16px', fontWeight: 950, color: THEME.dark, marginBottom: '8px' }}>{b.t}</div>
        <div style={{ fontSize: '13px', color: THEME.textSec, lineHeight: 1.5, fontWeight: 500 }}>{b.d}</div>
      </div>
    ))}
  </div>
);

const CategorySpotlightCard = ({ isMob }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
    style={{ 
      background: '#fff', borderRadius: THEME.radius, padding: isMob ? '32px 24px' : '60px', 
      gridColumn: isMob ? 'span 1' : 'span 2', position: 'relative', overflow: 'hidden', 
      display: 'flex', flexDirection: isMob ? 'column' : 'row', alignItems: 'center', gap: '40px',
      border: '1px solid #e2e8f0', boxShadow: '0 30px 60px rgba(0,0,0,0.05)', marginTop: '40px'
    }}
  >
    <div style={{ flex: 1 }}>
       <div style={{ color: THEME.primary, fontWeight: 950, letterSpacing: '4px', fontSize: '11px', marginBottom: '16px' }}>TRENDING NICHES</div>
       <h2 style={{ fontSize: isMob ? '32px' : '48px', fontWeight: 950, color: THEME.dark, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.03em' }}>
         Explore the <br/> <span style={{ color: THEME.primary }}>Creator Ecosystem.</span>
       </h2>
       <p style={{ color: THEME.textSec, fontSize: '17px', lineHeight: 1.6, marginBottom: '32px', fontWeight: 500 }}>From Tech-Geeks to Lifestyle-Gurus, discover creators who don't just post content, but build communities.</p>
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {['TECH', 'FASHION', 'AUTO', 'TRAVEL', 'FOOD', 'GAMING'].map(n => (
            <div key={n} style={{ background: '#f8fafc', padding: '10px', borderRadius: '12px', textAlign: 'center', fontSize: '10px', fontWeight: 950, color: THEME.dark, border: '1px solid #f1f5f9' }}>{n}</div>
          ))}
       </div>
    </div>
    {!isMob && (
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', height: '300px' }}>
         <img src={COVERS[0]} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} alt="" />
         <img src={COVERS[1]} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px', marginTop: '20px' }} alt="" />
      </div>
    )}
  </motion.div>
);

const EliteDealCard = ({ campaign, index, onApply, isMob, onDetails, isGuest, isSwipe = false, onSwipe }) => {
  const cover = COVERS[index % COVERS.length];
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 100) onSwipe?.('right', campaign);
    else if (info.offset.x < -100) onSwipe?.('left', campaign);
  };

  return (
    <motion.div 
      drag={isSwipe ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      style={{ 
        x, rotate, opacity, 
        background: '#fff', 
        borderRadius: THEME.radius, 
        overflow: 'hidden', 
        boxShadow: hovered ? '0 30px 60px rgba(0,0,0,0.12)' : '0 10px 30px rgba(0,0,0,0.04)', 
        border: `1px solid ${hovered ? THEME.primary : '#f1f5f9'}`, 
        display: 'flex', flexDirection: 'column', height: '100%', 
        position: 'relative', cursor: isSwipe ? 'grab' : 'pointer', 
        transition: isSwipe ? 'none' : 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' 
      }}
      onMouseEnter={() => !isSwipe && setHovered(true)} onMouseLeave={() => !isSwipe && setHovered(false)}
      onClick={() => !isSwipe && onDetails(campaign)}
    >
      <div style={{ position: 'relative', height: isMob ? '220px' : '280px', overflow: 'hidden' }}>
        <motion.img src={cover} animate={{ scale: hovered ? 1.1 : 1 }} transition={{ duration: 1.2 }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(15, 23, 42, 0.4) 100%)' }} />
        
        <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', gap: '8px' }}>
           <div style={{ background: '#fff', color: THEME.dark, padding: '6px 14px', borderRadius: '100px', fontSize: '10px', fontWeight: 900, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>{campaign.niche?.[0] || 'LIFESTYLE'}</div>
        </div>
      </div>

      <div style={{ padding: isMob ? '24px' : '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
           <div style={{ width: '40px', height: '40px', background: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 950, fontSize: '18px', color: THEME.dark, border: '1px solid #e2e8f0' }}>{campaign.brand?.companyName?.[0] || 'B'}</div>
           <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: THEME.dark }}>{campaign.brand?.companyName || 'Elite Brand'}</div>
              <div style={{ fontSize: isMob ? '10px' : '11px', color: '#10B981', fontWeight: 900, letterSpacing: '0.5px' }}>VERIFIED ADVERTISER</div>
           </div>
        </div>

        <h3 style={{ fontSize: isMob ? '18px' : '24px', fontWeight: 950, color: THEME.dark, lineHeight: 1.2, marginBottom: '24px', letterSpacing: '-0.02em' }}>{campaign.title}</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: isMob ? '10px' : '16px', marginBottom: '32px' }}>
           <div style={{ background: '#f8fafc', padding: isMob ? '12px' : '16px', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
             <div style={{ fontSize: '8px', color: '#94a3b8', fontWeight: 900, letterSpacing: '1px', marginBottom: '4px' }}>EST. PAYOUT</div>
             <div style={{ fontSize: isMob ? '14px' : '18px', fontWeight: 950, color: THEME.dark }}>{fmt.inr(campaign.budgetMax)}</div>
           </div>
           <div style={{ background: '#f8fafc', padding: isMob ? '12px' : '16px', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
             <div style={{ fontSize: '8px', color: '#94a3b8', fontWeight: 900, letterSpacing: '1px', marginBottom: '4px' }}>AVAILABILITY</div>
             <div style={{ fontSize: isMob ? '14px' : '18px', fontWeight: 950, color: THEME.primary }}>{campaign.slots || 10} SLOTS</div>
           </div>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
           <Btn full lg onClick={(e) => { e.stopPropagation(); onApply(campaign); }} style={{ background: THEME.dark, color: '#fff', border: 'none', fontWeight: 950, flex: 1, borderRadius: '14px' }}>View Campaign</Btn>
           <button style={{ width: '56px', height: '56px', borderRadius: '14px', border: '1px solid #e2e8f0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', cursor: 'pointer' }}><Bookmark size={20} /></button>
        </div>
      </div>
    </motion.div>
  );
};

// ----------------------------------------------------------------------
// 3. ELITE SUB-COMPONENTS
// ----------------------------------------------------------------------

const SearchBar = ({ mob, q, onSearch }) => (
  <div style={{ width: '100%', flex: 1, display: 'flex', alignItems: 'center', background: '#f8fafc', borderRadius: mob ? '12px' : '16px', padding: mob ? '10px 16px' : '12px 24px', border: '1px solid #e2e8f0' }}>
    <Search size={18} color={THEME.textSec} style={{ marginRight: '12px' }} />
    <input 
      value={q || ''} 
      onChange={e => onSearch(e.target.value)} 
      placeholder={mob ? 'Search...' : 'Search campaigns, brands, or niches...'} 
      style={{ flex: 1, border: 'none', background: 'none', outline: 'none', fontWeight: 600, fontSize: mob ? '14px' : '16px', color: THEME.dark }} 
    />
  </div>
);

const ViewModeToggle = ({ mob, viewMode, setViewMode }) => (
  <div style={{ width: mob ? '100%' : 'auto', display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: mob ? '12px' : '14px' }}>
    {['grid', 'swipe'].map(m => (
      <button 
        key={m}
        onClick={() => setViewMode(m)} 
        style={{ 
          flex: mob ? 1 : 'none', padding: mob ? '10px' : '10px 24px', borderRadius: mob ? '10px' : '11px', border: 'none', 
          background: viewMode === m ? '#fff' : 'transparent', fontWeight: 800, fontSize: '13px', color: THEME.dark, 
          cursor: 'pointer', transition: '0.3s', boxShadow: viewMode === m ? '0 4px 12px rgba(0,0,0,0.05)' : 'none' 
        }}
      >
        {m.charAt(0).toUpperCase() + m.slice(1)}
      </button>
    ))}
  </div>
);

const FilterBar = ({ mob, cpf, dsp, viewMode, setViewMode }) => (
  <div style={{ width: '100%', position: 'sticky', top: mob ? '10px' : '24px', zIndex: 1000, padding: mob ? '0 10px' : '0 20px' }}>
    <div style={{ 
      maxWidth: '1200px', margin: '0 auto', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)',
      borderRadius: mob ? '16px' : '24px', padding: mob ? '8px' : '12px', border: '1px solid #e2e8f0',
      display: 'flex', gap: mob ? '8px' : '16px', alignItems: 'center', flexDirection: mob ? 'column' : 'row',
      boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
    }}>
       <SearchBar mob={mob} q={cpf.q} onSearch={v => dsp({ t: 'CPF', v: { q: v } })} />
       <ViewModeToggle mob={mob} viewMode={viewMode} setViewMode={setViewMode} />
    </div>
  </div>
);

const CampaignDetailsModal = ({ open, campaign, onClose, onApply, isMob, isGuest }) => (
  <Modal open={open} title='Campaign Intelligence' onClose={onClose} width={800}>
    {campaign && (
      <div style={{ display: 'flex', flexDirection: isMob ? 'column' : 'row', gap: '40px', padding: '20px' }}>
        <div style={{ flex: 1 }}>
           <img src={COVERS[0]} alt="Campaign Cover" style={{ width: '100%', height: '200px', borderRadius: '24px', objectFit: 'cover', marginBottom: '24px' }} />
           <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
              <div style={{ flex: 1, background: '#f8fafc', padding: '16px', borderRadius: '20px', textAlign: 'center' }}><Users size={20} color={THEME.blue} style={{ marginBottom: '8px' }} /><div style={{ fontSize: '10px', opacity: 0.5 }}>TARGET</div><div style={{ fontWeight: 950 }}>18-35</div></div>
              <div style={{ flex: 1, background: '#f8fafc', padding: '16px', borderRadius: '20px', textAlign: 'center' }}><MapPin size={20} color={THEME.primary} style={{ marginBottom: '8px' }} /><div style={{ fontSize: '10px', opacity: 0.5 }}>REGION</div><div style={{ fontWeight: 950 }}>India</div></div>
              <div style={{ flex: 1, background: '#f8fafc', padding: '16px', borderRadius: '20px', textAlign: 'center' }}><Layers size={20} color={THEME.success} style={{ marginBottom: '8px' }} /><div style={{ fontSize: '10px', opacity: 0.5 }}>NICHE</div><div style={{ fontWeight: 950 }}>Tech</div></div>
           </div>
           <h3 style={{ fontSize: '24px', fontWeight: 950, marginBottom: '16px' }}>Campaign Brief</h3>
           <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '15px' }}>{campaign.title}. The brand is looking for authentic storytelling. Submission deadline is strict. Ensure high-quality lighting and clear audio for video deliverables.</p>
        </div>
        <div style={{ flex: 0.6, background: '#f8fafc', borderRadius: '24px', padding: '32px', border: '1px solid #f1f5f9' }}>
           <h4 style={{ fontWeight: 950, fontSize: '18px', marginBottom: '24px' }}>Deliverables</h4>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '8px', height: '8px', background: THEME.primary, borderRadius: '50%' }} /> <div style={{ fontSize: '14px', fontWeight: 700 }}>1x Instagram Reel</div></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '8px', height: '8px', background: THEME.primary, borderRadius: '50%' }} /> <div style={{ fontSize: '14px', fontWeight: 700 }}>2x Story Sets</div></div>
           </div>
           <div style={{ height: '1px', background: '#e2e8f0', margin: '32px 0' }} />
           <h4 style={{ fontWeight: 950, fontSize: '18px', marginBottom: '24px' }}>Timeline</h4>
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}><Calendar size={16} color={THEME.primary} /> <span style={{ fontSize: '14px', fontWeight: 700 }}>Starts: Next Week</span></div>
           <Btn full lg style={{ marginTop: '40px' }} onClick={() => onApply(campaign)}>{isGuest ? 'Unlock to Apply' : 'Apply Now'}</Btn>
        </div>
      </div>
    )}
  </Modal>
);

const CampaignApplyModal = ({ open, isDone, onClose, form, setForm, onSubmit, mob }) => (
  <Modal open={open} title='Submit Pitch' onClose={onClose} width={650}>
    {isDone ? (
      <div style={{ textAlign: 'center', padding: '80px 40px' }}>
        <div style={{ width: '100px', height: '100px', background: 'rgba(16,185,129,0.1)', color: THEME.success, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}><CheckCircle2 size={48} /></div>
        <h3 style={{ fontSize: '32px', fontWeight: 950, marginBottom: '16px' }}>Pitch Sent!</h3>
        <Btn full lg onClick={onClose}>Back to Discovery</Btn>
      </div>
    ) : (
      <div style={{ padding: '20px' }}>
         <Fld label='Elite Pitch Proposal *' value={form.pitch} onChange={e => setForm(p => ({ ...p, pitch: e.target.value }))} rows={5} placeholder='How will you add value?' />
         <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '32px', marginTop: '32px' }}>
            <Fld label='Proposed Rate (₹)' type='number' value={form.rate} onChange={e => setForm(p => ({ ...p, rate: e.target.value }))} />
            <Fld label='Portfolio' value={form.portfolio} onChange={e => setForm(p => ({ ...p, portfolio: e.target.value }))} />
         </div>
         <Btn full lg style={{ marginTop: '56px', height: '72px', borderRadius: '24px', fontSize: '18px' }} onClick={onSubmit}>Submit Pitch 🚀</Btn>
      </div>
    )}
  </Modal>
);

// ----------------------------------------------------------------------
// 4. PAGE MASTER
// ----------------------------------------------------------------------

const DiscoveryGridView = ({ mob, loading, filtered, isGuest, onApply, setDetailsModal }) => (
  <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill, minmax(380px, 1fr))', gap: mob ? '24px' : '40px' }}>
     <PublicLandingCard isMob={mob} />
     {loading ? [1, 2, 3].map(it => <SkeletonCard key={it} />) : 
      filtered.map((it, idx) => (
        <EliteDealCard key={it.id} campaign={it} index={idx} isGuest={isGuest} onApply={onApply} isMob={mob} onDetails={setDetailsModal} />
      ))}
     <MarketplaceBenefits isMob={mob} />
     <CategorySpotlightCard isMob={mob} />
     <FinalDiscoveryCard isMob={mob} />
  </div>
);

const DiscoverySwipeView = ({ mob, filtered, swipeIdx, setSwipeIdx, onApply, setDetailsModal, isGuest }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: mob ? '20px 0' : '40px 0' }}>
     <div style={{ position: 'relative', width: mob ? '100%' : '500px', height: '700px' }}>
        <AnimatePresence>
          {filtered.length > 0 && swipeIdx < filtered.length ? (
            filtered.slice(swipeIdx, swipeIdx + 2).reverse().map((it, idx) => (
              <motion.div 
                key={it.id} 
                style={{ position: 'absolute', width: '100%', height: '100%', zIndex: idx === 0 ? 2 : 1 }} 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: idx === 1 ? 1 : 0.95, opacity: 1, y: idx === 1 ? 0 : 20 }}
                exit={{ x: 500, opacity: 0, rotate: 45 }}
                transition={{ duration: 0.4 }}
              >
                <EliteDealCard 
                  campaign={it} 
                  index={swipeIdx + (1 - idx)} 
                  isGuest={isGuest} 
                  onApply={onApply} 
                  isMob={mob} 
                  onDetails={setDetailsModal} 
                  isSwipe={idx === 1}
                  onSwipe={(dir) => {
                    if (dir === 'right') onApply(it);
                    setSwipeIdx(p => p + 1);
                  }}
                />
              </motion.div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '100px 0', width: '100%' }}>
              <DiscoveryEmptyState mob={mob} />
            </div>
          )}
        </AnimatePresence>
     </div>
     
     {filtered.length > 0 && swipeIdx < filtered.length && (
       <div style={{ display: 'flex', gap: '32px', marginTop: '60px' }}>
          <button 
            onClick={() => setSwipeIdx(p => p + 1)}
            style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#fff', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer' }}
          >
            <X size={32} color={THEME.textSec} />
          </button>
          <button 
            onClick={() => onApply(filtered[swipeIdx])}
            style={{ width: '80px', height: '80px', borderRadius: '50%', background: THEME.primary, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(255,148,49,0.2)', cursor: 'pointer' }}
          >
            <Heart size={32} color='#fff' fill='#fff' />
          </button>
       </div>
     )}
  </div>
);

const DiscoveryEmptyState = ({ mob }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: mob ? '40px 20px' : '100px 0', textAlign: 'center' }}>
    <div style={{ width: '120px', height: '120px', background: '#f8fafc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}><Search size={48} color='#cbd5e1' /></div>
    <h3 style={{ fontSize: '24px', fontWeight: 950, color: THEME.dark }}>No deals found</h3>
    <p style={{ color: THEME.textSec, marginTop: '8px' }}>Try adjusting your filters to find elite opportunities.</p>
  </div>
);

export default function CampaignsPage() {
  const navigate = useNavigate();
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [viewMode, setViewMode] = useState('grid');
  const [swipeIdx, setSwipeIdx] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailsModal, setDetailsModal] = useState(null);
  const [applyModal, setApplyModal] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [form, setForm] = useState({ pitch: '', portfolio: '', rate: '' });

  const { cpf, user } = st;
  const isGuest = !user;

  useEffect(() => {
    const handle = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', handle);
    setLoading(true);
    fetchCampaigns({ limit: 100 }).then(res => { setData(res); setLoading(false); }).catch(() => setLoading(false));
    return () => globalThis.removeEventListener('resize', handle);
  }, []);

  const filtered = useMemo(() => {
    return data.filter(it => {
      const q = (cpf.q || '').toLowerCase();
      if (q && !(it.title || '').toLowerCase().includes(q) && !(typeof it.brand === 'object' ? it.brand.companyName : (it.brand || '')).toLowerCase().includes(q)) return false;
      if (cpf.niche && !(Array.isArray(it.niche) ? it.niche : [it.niche]).includes(cpf.niche)) return false;
      return true;
    });
  }, [data, cpf.q, cpf.niche]);

  const onApply = (it) => {
    if (isGuest) return navigate('/login');
    setApplyModal(it); setDetailsModal(null); setIsDone(false); setForm({ pitch: '', portfolio: '', rate: '' });
  };

  const onSubmit = (target) => {
    if (!user) return navigate('/login');
    LS.push('cb_applications', { id: `app-${Date.now()}`, campaignId: target?.id, date: new Date().toISOString() });
    dsp({ t: 'APPLY', id: target?.id }); setIsDone(true);
    dsp({ t: 'TOAST', d: { type: 'success', msg: `Applied for ${target?.title}` } });
  };

  return (
    <div style={{ background: THEME.bg, minHeight: '100vh', width: '100%', overflowX: 'hidden', color: THEME.text }}>
      <EliteHeader light compact={viewMode === 'swipe'} title={
        <div style={{ textAlign: 'center', padding: mob ? '40px 0' : '60px 0 40px' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '50%', boxShadow: '0 0 12px #10B981' }} />
            <div style={{ fontSize: '11px', fontWeight: 950, color: THEME.primary, letterSpacing: '4px' }}>LIVE INTELLIGENCE HUB</div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: mob ? '48px' : '80px', fontWeight: 950, color: THEME.dark, letterSpacing: '-0.05em', lineHeight: 1 }}>
            Campaign Marketplace
          </motion.h1>
          <p style={{ marginTop: '24px', color: THEME.textSec, fontSize: mob ? '16px' : '20px', fontWeight: 500, maxWidth: '700px', margin: '24px auto 0', lineHeight: 1.6 }}>
            The definitive gateway to premium influencer commerce. Access high-ticket collaborations, <span style={{ color: THEME.dark, fontWeight: 800 }}>verified brand deals</span>, and data-driven advertising opportunities across India.
          </p>
        </div>
      } />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <MarketplaceStats isMob={mob} />
      </div>

      <FilterBar mob={mob} cpf={cpf} dsp={dsp} viewMode={viewMode} setViewMode={setViewMode} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: mob ? '40px 20px 120px' : '60px 20px 120px', position: 'relative', zIndex: 1 }}>
        {viewMode === 'grid' ? (
          <DiscoveryGridView 
            mob={mob} loading={loading} filtered={filtered} isGuest={isGuest} onApply={onApply} setDetailsModal={setDetailsModal} 
          />
        ) : (
          <DiscoverySwipeView 
            mob={mob} filtered={filtered} swipeIdx={swipeIdx} setSwipeIdx={setSwipeIdx} onApply={onApply} setDetailsModal={setDetailsModal} isGuest={isGuest}
          />
        )}
      </div>

      <CampaignDetailsModal 
        open={!!detailsModal} 
        campaign={detailsModal} 
        onClose={() => setDetailsModal(null)} 
        onApply={onApply} 
        isMob={mob} 
        isGuest={isGuest} 
      />

      <CampaignApplyModal 
        open={!!applyModal} 
        isDone={isDone} 
        onClose={() => setApplyModal(null)} 
        form={form} 
        setForm={setForm} 
        onSubmit={() => onSubmit(applyModal)} 
        mob={mob} 
      />
    </div>
  );
}

EliteDealCard.propTypes = { campaign: PropTypes.object, index: PropTypes.number, onApply: PropTypes.func, isMob: PropTypes.bool, onDetails: PropTypes.func, isGuest: PropTypes.bool, isSwipe: PropTypes.bool, onSwipe: PropTypes.func };
PublicLandingCard.propTypes = { isMob: PropTypes.bool };
FilterBar.propTypes = { mob: PropTypes.bool, cpf: PropTypes.object, dsp: PropTypes.func, viewMode: PropTypes.string, setViewMode: PropTypes.func };
CampaignDetailsModal.propTypes = { open: PropTypes.bool, campaign: PropTypes.object, onClose: PropTypes.func, onApply: PropTypes.func, isMob: PropTypes.bool, isGuest: PropTypes.bool };
CampaignApplyModal.propTypes = { open: PropTypes.bool, isDone: PropTypes.bool, onClose: PropTypes.func, form: PropTypes.object, setForm: PropTypes.func, onSubmit: PropTypes.func, mob: PropTypes.bool };
FinalDiscoveryCard.propTypes = { isMob: PropTypes.bool };
CategorySpotlightCard.propTypes = { isMob: PropTypes.bool };
MarketplaceStats.propTypes = { isMob: PropTypes.bool };
MarketplaceBenefits.propTypes = { isMob: PropTypes.bool };
SearchBar.propTypes = { mob: PropTypes.bool, q: PropTypes.string, onSearch: PropTypes.func };
ViewModeToggle.propTypes = { mob: PropTypes.bool, viewMode: PropTypes.string, setViewMode: PropTypes.func };
DiscoveryGridView.propTypes = { mob: PropTypes.bool, loading: PropTypes.bool, filtered: PropTypes.array, isGuest: PropTypes.bool, onApply: PropTypes.func, setDetailsModal: PropTypes.func };
DiscoverySwipeView.propTypes = { mob: PropTypes.bool, filtered: PropTypes.array, swipeIdx: PropTypes.number, setSwipeIdx: PropTypes.func, onApply: PropTypes.func, setDetailsModal: PropTypes.func, isGuest: PropTypes.bool };
DiscoveryEmptyState.propTypes = { mob: PropTypes.bool };
