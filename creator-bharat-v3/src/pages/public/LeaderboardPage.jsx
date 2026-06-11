import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, Search, ArrowUpRight, Globe, 
  MapPin, Layers, Filter, Star,
  Activity, ShieldCheck, Plus, BarChart3, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Btn, Card } from '@/components/common/Primitives';
import Seo from '@/components/common/SEO';
import { fetchCreators } from '@/utils/platformService';
import { fmt } from '@/utils/helpers';

// ----------------------------------------------------------------------
// 1. ADVANCED BRAND TOKENS & MOCK DATA
// ----------------------------------------------------------------------

const THEME = {
  primary: '#FF9431',
  secondary: '#3b82f6',
  dark: '#050505',
  glass: 'rgba(255, 255, 255, 0.7)',
  glassDark: 'rgba(15, 23, 42, 0.8)',
  border: '#f1f5f9',
  green: '#10b981',
  red: '#f43f5e',
  textSec: '#64748b'
};

const categories = ['Overall', 'Tech', 'Finance', 'Lifestyle', 'Gaming', 'Travel', 'Beauty', 'Fitness', 'Food'];

// creatorsData is now loaded dynamically via fetchCreators() in the component below.
// Transform function to normalize API/seed data into leaderboard format:
function transformToLeaderboard(creators) {
  return creators
    .map(c => {
      const score = c.score || fmt.score(c);
      const followers = c.followers || 0;
      const niche = Array.isArray(c.niche) ? c.niche[0] : (c.niche || 'Creator');
      const tier = followers >= 1000000 ? 'Mega' : followers >= 100000 ? 'Macro' : 'Micro';
      return {
        id: c.id || c.handle || c.slug,
        rank: 0,
        name: c.name || 'Creator',
        niche,
        followers: fmt.num(followers),
        followersRaw: followers,
        er: c.er ? `${Number(c.er).toFixed(1)}%` : `${(Math.random() * 8 + 3).toFixed(1)}%`,
        erRaw: c.er || (Math.random() * 8 + 3),
        score,
        trend: score > 80 ? 'up' : 'down',
        location: c.city || c.location || 'India',
        tier,
        velocity: score > 80 ? `+${(Math.random() * 12 + 1).toFixed(1)}%` : `-${(Math.random() * 3 + 0.5).toFixed(1)}%`,
        avatar: c.photo || c.image || c.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name || 'C')}&background=FF9431&color=fff`
      };
    })
    .sort((a, b) => b.score - a.score)
    .map((c, i) => ({ ...c, rank: i + 1 }));
}

// ----------------------------------------------------------------------
// 2. ADVANCED SUB-COMPONENTS
// ----------------------------------------------------------------------

const Sparkline = ({ color, points, id }) => {
  const gradId = useMemo(() => `sparkline-grad-${id || Math.floor(Math.random() * 1000000)}`, [id]);
  const pathD = `M 0 ${points[0]} L 15 ${points[1]} L 30 ${points[2]} L 45 ${points[3]} L 60 ${points[4]}`;
  const fillD = `${pathD} L 60 20 L 0 20 Z`;
  
  return (
    <svg width="60" height="20" viewBox="0 0 60 20" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={fillD}
        fill={`url(#${gradId})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </svg>
  );
};

Sparkline.propTypes = {
  color: PropTypes.string.isRequired,
  points: PropTypes.arrayOf(PropTypes.number).isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const LeaderboardHero = ({ mob }) => (
  <section style={{ 
    background: THEME.dark, padding: mob ? '140px 20px 100px' : '180px 24px 120px', 
    textAlign: 'center', position: 'relative', overflow: 'hidden'
  }}>
    {/* Immersive Background Particles (Abstract) */}
    <div style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
       {['p1', 'p2', 'p3', 'p4', 'p5', 'p6'].map((p, i) => (
         <motion.div
           key={p}
           animate={{ 
             y: [0, -20, 0], 
             opacity: [0.1, 0.3, 0.1],
             scale: [1, 1.1, 1]
           }}
           transition={{ duration: 4 + i, repeat: Infinity }}
           style={{ 
             position: 'absolute', 
             width: '300px', height: '300px', 
             background: 'radial-gradient(circle, rgba(255, 148, 49, 0.15) 0%, transparent 70%)',
             left: `${(i * 17) % 100}%`,
             top: `${(i * 23) % 100}%`,
             borderRadius: '50%'
           }}
         />
       ))}
     </div>

    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '160px', background: 'linear-gradient(to top, #fcfcfc, transparent)' }} />
    
    <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'rgba(255, 255, 255, 0.03)', padding: '12px 24px', borderRadius: '100px', marginBottom: '40px', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(12px)' }}
      >
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: THEME.primary, boxShadow: `0 0 10px ${THEME.primary}` }} />
        <span style={{ fontSize: '12px', fontWeight: 950, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.25em' }}>Verified Influence Intelligence</span>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        style={{ fontSize: mob ? '52px' : '110px', fontWeight: 950, color: '#fff', marginBottom: '32px', letterSpacing: '-0.07em', lineHeight: 0.85 }}
      >
        Bharat's <br />
        <span style={{ background: 'linear-gradient(135deg, #FF9431 0%, #fff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Top 100 Creators.</span>
      </motion.h1>
      
      <p style={{ fontSize: mob ? '18px' : '22px', color: 'rgba(255, 255, 255, 0.4)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.5, fontWeight: 500 }}>
        The definitive real-time index of Bharat's most powerful digital economy drivers.{' '}
        <span style={{ color: '#fff' }}>Ranked by proprietary AI metrics.</span>
      </p>
    </div>
  </section>
);

LeaderboardHero.propTypes = {
  mob: PropTypes.bool.isRequired
};

const GoldPodiumCard = ({ c, mob, navigate }) => {
  const mockPoints = [15, 5, 12, 2, 8];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -12, scale: 1.02 }}
      onClick={() => navigate(`/creator/${c.id}`)}
      style={{
        background: 'linear-gradient(165deg, #090d16 0%, #030408 100%)',
        padding: mob ? '32px' : '56px 48px', borderRadius: '48px', 
        border: '2px solid rgba(255, 148, 49, 0.45)',
        textAlign: 'center', position: 'relative', overflow: 'hidden', 
        boxShadow: '0 30px 80px rgba(255, 148, 49, 0.22)', 
        cursor: 'pointer',
        order: mob ? 0 : 2
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, transparent, ${THEME.primary}, transparent)` }} />
      
      <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 32px' }}>
         <div style={{ width: '100%', height: '100%', borderRadius: '40px', overflow: 'hidden', border: '4px solid #FF9431', boxShadow: '0 20px 40px rgba(255,148,49,0.25)' }}>
            {c.avatar ? (
              <img src={c.avatar} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', background: THEME.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', fontWeight: 950, color: '#fff' }}>
                {c.name.charAt(0)}
              </div>
            )}
         </div>
         <div style={{ position: 'absolute', bottom: -10, right: -10, width: '48px', height: '48px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
            <Crown size={24} color={THEME.primary} style={{ filter: 'drop-shadow(0 0 4px rgba(255, 148, 49, 0.4))' }} />
         </div>
      </div>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,148,49,0.12)', padding: '10px 20px', borderRadius: '100px', marginBottom: '24px', border: '1px solid rgba(255,148,49,0.2)' }}>
        <ShieldCheck size={14} color={THEME.primary} />
        <span style={{ fontSize: '12px', fontWeight: 950, color: THEME.primary, textTransform: 'uppercase', letterSpacing: '2px' }}>
          TOP ELITE #1
        </span>
      </div>

      <h3 style={{ fontSize: '32px', fontWeight: 950, color: '#fff', marginBottom: '12px', letterSpacing: '-0.03em' }}>{c.name}</h3>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '40px' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 600 }}>
            <MapPin size={14} /> {c.location}
         </div>
         <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#94a3b8' }} />
         <div style={{ color: THEME.primary, fontSize: '14px', fontWeight: 850 }}>{c.niche}</div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '10px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '4px' }}>Impact Score</div>
          <div style={{ fontSize: '24px', fontWeight: 950, color: '#fff' }}>{c.score}<span style={{ fontSize: '14px', color: THEME.green }}>.9</span></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
           <div style={{ fontSize: '10px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '6px' }}>Velocity</div>
           <Sparkline color={THEME.primary} points={mockPoints} id={c.id} />
        </div>
      </div>
    </motion.div>
  );
};

GoldPodiumCard.propTypes = {
  c: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    niche: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    avatar: PropTypes.string
  }).isRequired,
  mob: PropTypes.bool,
  navigate: PropTypes.func.isRequired
};

const SilverPodiumCard = ({ c, mob, navigate }) => {
  const mockPoints = [15, 8, 10, 3, 6];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -12, scale: 1.02 }}
      onClick={() => navigate(`/creator/${c.id}`)}
      style={{
        background: 'linear-gradient(165deg, #070b14 0%, #020306 100%)',
        padding: mob ? '32px' : '56px 48px', borderRadius: '48px', 
        border: '1.5px solid rgba(59, 130, 246, 0.35)',
        textAlign: 'center', position: 'relative', overflow: 'hidden', 
        boxShadow: '0 25px 60px rgba(59, 130, 246, 0.12)', 
        cursor: 'pointer',
        order: 1
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, transparent, ${THEME.secondary}, transparent)` }} />
      
      <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 32px' }}>
         <div style={{ width: '100%', height: '100%', borderRadius: '40px', overflow: 'hidden', border: '4px solid #3b82f6', boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)' }}>
            {c.avatar ? (
              <img src={c.avatar} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', background: THEME.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', fontWeight: 950, color: '#fff' }}>
                {c.name.charAt(0)}
              </div>
            )}
         </div>
         <div style={{ position: 'absolute', bottom: -10, right: -10, width: '48px', height: '48px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
            <span style={{ color: THEME.secondary, fontWeight: 950, fontSize: '18px' }}>#2</span>
         </div>
      </div>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(59, 130, 246, 0.12)', padding: '10px 20px', borderRadius: '100px', marginBottom: '24px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
        <ShieldCheck size={14} color={THEME.secondary} />
        <span style={{ fontSize: '12px', fontWeight: 950, color: THEME.secondary, textTransform: 'uppercase', letterSpacing: '2px' }}>
          {c.tier} Tier
        </span>
      </div>

      <h3 style={{ fontSize: '32px', fontWeight: 950, color: '#fff', marginBottom: '12px', letterSpacing: '-0.03em' }}>{c.name}</h3>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '40px' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 600 }}>
            <MapPin size={14} /> {c.location}
         </div>
         <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#94a3b8' }} />
         <div style={{ color: THEME.secondary, fontSize: '14px', fontWeight: 850 }}>{c.niche}</div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '10px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '4px' }}>Impact Score</div>
          <div style={{ fontSize: '24px', fontWeight: 950, color: '#fff' }}>{c.score}<span style={{ fontSize: '14px', color: THEME.green }}>.9</span></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
           <div style={{ fontSize: '10px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '6px' }}>Velocity</div>
           <Sparkline color={THEME.secondary} points={mockPoints} id={c.id} />
        </div>
      </div>
    </motion.div>
  );
};

SilverPodiumCard.propTypes = {
  c: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    niche: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    tier: PropTypes.string.isRequired,
    avatar: PropTypes.string
  }).isRequired,
  mob: PropTypes.bool,
  navigate: PropTypes.func.isRequired
};

const BronzePodiumCard = ({ c, mob, navigate }) => {
  const mockPoints = [15, 12, 10, 6, 2];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -12, scale: 1.02 }}
      onClick={() => navigate(`/creator/${c.id}`)}
      style={{
        background: 'linear-gradient(165deg, #090b12 0%, #030407 100%)',
        padding: mob ? '32px' : '56px 48px', borderRadius: '48px', 
        border: '1.5px solid rgba(234, 88, 12, 0.35)',
        textAlign: 'center', position: 'relative', overflow: 'hidden', 
        boxShadow: '0 20px 50px rgba(234, 88, 12, 0.12)', 
        cursor: 'pointer',
        order: mob ? 2 : 3
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, transparent, #EA580C, transparent)` }} />
      
      <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 32px' }}>
         <div style={{ width: '100%', height: '100%', borderRadius: '40px', overflow: 'hidden', border: '4px solid #EA580C', boxShadow: '0 20px 40px rgba(234, 88, 12, 0.2)' }}>
            {c.avatar ? (
              <img src={c.avatar} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', background: '#EA580C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', fontWeight: 950, color: '#fff' }}>
                {c.name.charAt(0)}
              </div>
            )}
         </div>
         <div style={{ position: 'absolute', bottom: -10, right: -10, width: '48px', height: '48px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
            <span style={{ color: '#EA580C', fontWeight: 950, fontSize: '18px' }}>#3</span>
         </div>
      </div>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(234, 88, 12, 0.12)', padding: '10px 20px', borderRadius: '100px', marginBottom: '24px', border: '1px solid rgba(234, 88, 12, 0.2)' }}>
        <ShieldCheck size={14} color="#EA580C" />
        <span style={{ fontSize: '12px', fontWeight: 950, color: '#EA580C', textTransform: 'uppercase', letterSpacing: '2px' }}>
          {c.tier} Tier
        </span>
      </div>

      <h3 style={{ fontSize: '32px', fontWeight: 950, color: '#fff', marginBottom: '12px', letterSpacing: '-0.03em' }}>{c.name}</h3>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '40px' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 600 }}>
            <MapPin size={14} /> {c.location}
         </div>
         <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#94a3b8' }} />
         <div style={{ color: '#EA580C', fontSize: '14px', fontWeight: 850 }}>{c.niche}</div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '10px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '4px' }}>Impact Score</div>
          <div style={{ fontSize: '24px', fontWeight: 950, color: '#fff' }}>{c.score}<span style={{ fontSize: '14px', color: THEME.green }}>.9</span></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
           <div style={{ fontSize: '10px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '6px' }}>Velocity</div>
           <Sparkline color="#EA580C" points={mockPoints} id={c.id} />
        </div>
      </div>
    </motion.div>
  );
};

BronzePodiumCard.propTypes = {
  c: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    niche: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    tier: PropTypes.string.isRequired,
    avatar: PropTypes.string
  }).isRequired,
  mob: PropTypes.bool,
  navigate: PropTypes.func.isRequired
};

const ElitePodiumCard = ({ c, i, mob, navigate }) => {
  if (i === 0) {
    return <GoldPodiumCard c={c} mob={mob} navigate={navigate} />;
  }
  if (i === 1) {
    return <SilverPodiumCard c={c} mob={mob} navigate={navigate} />;
  }
  return <BronzePodiumCard c={c} mob={mob} navigate={navigate} />;
};

ElitePodiumCard.propTypes = {
  c: PropTypes.object.isRequired,
  i: PropTypes.number.isRequired,
  mob: PropTypes.bool,
  navigate: PropTypes.func.isRequired
};

const MobileRankCard = ({ c, navigate }) => (
  <motion.div
    whileTap={{ scale: 0.98 }}
    onClick={() => navigate(`/creator/${c.id}`)}
    style={{
      background: '#fff', padding: '20px', borderRadius: '24px', border: '1px solid ' + THEME.border,
      marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
    }}
  >
    <div style={{ fontSize: '18px', fontWeight: 950, color: c.rank <= 3 ? THEME.primary : '#94a3b8', width: '32px' }}>#{c.rank}</div>
    <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 950, color: THEME.textSec, fontSize: '16px', overflow: 'hidden' }}>
      {c.avatar ? (
        <img src={c.avatar} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        c.name.charAt(0)
      )}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 900, color: THEME.dark, fontSize: '17px' }}>{c.name}</div>
      <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>{c.niche} • {c.followers} • ER: {c.er}</div>
    </div>
    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
       <div style={{ fontSize: '18px', fontWeight: 950, color: THEME.dark, lineHeight: 1 }}>{c.score}</div>
       <div style={{ fontSize: '9px', fontWeight: 900, color: c.trend === 'up' ? THEME.green : THEME.red, background: c.trend === 'up' ? THEME.green + '10' : THEME.red + '10', padding: '2px 6px', borderRadius: '100px', display: 'inline-block' }}>
          {c.velocity}
       </div>
    </div>
  </motion.div>
);

MobileRankCard.propTypes = {
  c: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    rank: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    niche: PropTypes.string.isRequired,
    followers: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    er: PropTypes.string.isRequired,
    trend: PropTypes.string.isRequired,
    velocity: PropTypes.string.isRequired,
    avatar: PropTypes.string
  }).isRequired,
  navigate: PropTypes.func.isRequired
};

const RankingsTable = ({ creators, mob, navigate }) => {
  if (mob) {
    return (
      <div style={{ padding: '0 4px' }}>
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <h4 style={{ fontSize: '18px', fontWeight: 950, color: THEME.dark }}>Verified Rankings</h4>
           <div style={{ fontSize: '12px', color: THEME.textSec, fontWeight: 700 }}>{creators.length} Found</div>
        </div>
        {creators.map(c => (
          <MobileRankCard key={c.id} c={c} navigate={navigate} />
        ))}
      </div>
    );
  }

  return (
    <div style={{ background: '#fff', borderRadius: '48px', border: '1px solid ' + THEME.border, overflow: 'hidden', boxShadow: '0 50px 120px rgba(0,0,0,0.04)' }}>
      <div style={{ padding: '40px', borderBottom: '1px solid ' + THEME.border, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: '#0f172a', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BarChart3 size={24} color="#fff" /></div>
          <div>
             <h4 style={{ fontSize: '24px', fontWeight: 950, color: THEME.dark, letterSpacing: '-0.02em' }}>Intelligence Index</h4>
             <p style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 600 }}>Deep-dive analysis of top 100 creators.</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
           <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '10px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>System Status</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: THEME.green, fontWeight: 900, fontSize: '14px' }}>
                 <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: THEME.green, animation: 'pulse 2s infinite' }} />
                 OPTIMAL
              </div>
           </div>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th style={{ padding: '24px 40px', textAlign: 'left', fontSize: '12px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Identity</th>
              <th style={{ padding: '24px 40px', textAlign: 'left', fontSize: '12px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Reach Tier</th>
              <th style={{ padding: '24px 40px', textAlign: 'left', fontSize: '12px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Intelligence</th>
              <th style={{ padding: '24px 40px', textAlign: 'left', fontSize: '12px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Growth Velocity</th>
              <th style={{ padding: '24px 40px', textAlign: 'right' }}></th>
            </tr>
          </thead>
          <tbody>
            {creators.map((c, i) => (
              <motion.tr 
                key={c.id} 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: i * 0.04 }} 
                style={{ borderBottom: '1px solid ' + THEME.border, cursor: 'pointer' }} 
                whileHover={{ background: '#fcfcfc' }} 
                onClick={() => navigate(`/creator/${c.id}`)}
              >
                <td style={{ padding: '28px 40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ fontSize: '18px', fontWeight: 950, color: i < 3 ? THEME.primary : '#94a3b8', width: '32px' }}>#{c.rank}</div>
                    <div style={{ width: '56px', height: '56px', borderRadius: '20px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 950, color: THEME.textSec, fontSize: '16px', position: 'relative', overflow: 'hidden' }}>
                      {c.avatar ? (
                        <img src={c.avatar} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        c.name.charAt(0)
                      )}
                      {c.rank === 1 && <div style={{ position: 'absolute', top: -8, right: -8, background: THEME.primary, borderRadius: '50%', padding: '4px' }}><Star size={10} color="#fff" fill="#fff" /></div>}
                    </div>
                    <div>
                      <div style={{ fontWeight: 900, color: THEME.dark, fontSize: '18px', marginBottom: '2px' }}>{c.name}</div>
                      <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>{c.niche} • {c.location}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '28px 40px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '10px', background: c.tier === 'Mega' ? '#eff6ff' : '#f0fdf4', color: c.tier === 'Mega' ? '#3b82f6' : '#16a34a', fontWeight: 900, fontSize: '12px' }}>
                     <Layers size={14} /> {c.tier}
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 700, marginTop: '6px', marginLeft: '4px' }}>{c.followers} followers</div>
                </td>
                <td style={{ padding: '28px 40px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <Activity size={18} color={THEME.primary} />
                      </div>
                      <div>
                         <div style={{ fontSize: '16px', fontWeight: 950, color: THEME.dark }}>{c.er}</div>
                         <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase' }}>Engagement</div>
                      </div>
                   </div>
                </td>
                <td style={{ padding: '28px 40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                     <div>
                        <div style={{ fontSize: '16px', fontWeight: 950, color: c.trend === 'up' ? THEME.green : THEME.red }}>{c.velocity}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase' }}>Weekly Delta</div>
                     </div>
                     <Sparkline color={c.trend === 'up' ? THEME.green : THEME.red} points={c.trend === 'up' ? [15, 10 + (c.id.codePointAt ? c.id.codePointAt(0) % 5 : c.id % 5), 12, 5, 2] : [5, 8 + (c.id.codePointAt ? c.id.codePointAt(0) % 5 : c.id % 5), 12, 15, 18]} id={c.id} />
                  </div>
                </td>
                <td style={{ padding: '28px 40px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
                     <button style={{ width: '44px', height: '44px', borderRadius: '14px', background: '#f8fafc', border: '1px solid ' + THEME.border, color: THEME.dark, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#fff'}>
                        <Plus size={18} />
                     </button>
                     <button style={{ width: '44px', height: '44px', borderRadius: '14px', background: THEME.dark, border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <ArrowUpRight size={18} />
                     </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

RankingsTable.propTypes = {
  creators: PropTypes.arrayOf(PropTypes.object).isRequired,
  mob: PropTypes.bool,
  navigate: PropTypes.func.isRequired
};

// ----------------------------------------------------------------------
// 3. MAIN PAGE
// ----------------------------------------------------------------------

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('Overall');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('Score'); // 'Score' | 'Followers' | 'Engagement'
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [creatorsData, setCreatorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const labelMap = {
    Score: 'Impact Score',
    Followers: 'Total Followers',
    Engagement: 'Engagement Rate'
  };

  useEffect(() => {
    const handle = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', handle);
    return () => globalThis.removeEventListener('resize', handle);
  }, []);

  // Fetch real creators and transform for leaderboard
  useEffect(() => {
    let cancelled = false;
    fetchCreators({ limit: 100 })
      .then(list => {
        if (!cancelled) {
          setCreatorsData(transformToLeaderboard(list));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const parseFollowers = (str) => {
    if (typeof str === 'number') return str;
    if (typeof str === 'string') {
      if (str.endsWith('M')) return Number.parseFloat(str) * 1000000;
      if (str.endsWith('K')) return Number.parseFloat(str) * 1000;
      if (str.endsWith('Cr')) return Number.parseFloat(str) * 10000000;
      if (str.endsWith('L')) return Number.parseFloat(str) * 100000;
    }
    return Number.parseFloat(str) || 0;
  };

  const parseER = (str) => Number.parseFloat(str) || 0;

  const sortedCreators = useMemo(() => {
    let list = creatorsData.filter(c => 
      (activeTab === 'Overall' || c.niche === activeTab) &&
      (c.name.toLowerCase().includes(search.toLowerCase()) || 
       c.niche.toLowerCase().includes(search.toLowerCase()) || 
       c.location.toLowerCase().includes(search.toLowerCase()))
    );

    if (sortBy === 'Score') {
      list.sort((a, b) => b.score - a.score);
    } else if (sortBy === 'Followers') {
      list.sort((a, b) => parseFollowers(b.followers) - parseFollowers(a.followers));
    } else if (sortBy === 'Engagement') {
      list.sort((a, b) => parseER(b.er) - parseER(a.er));
    }

    return list;
  }, [creatorsData, activeTab, search, sortBy]);

  const leaderboardJsonLd = useMemo(() => {
    if (!sortedCreators || sortedCreators.length === 0) return null;
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "CreatorBharat Top 100 Creators Leaderboard",
      "description": "Definitive real-time rankings of India's leading influencers, sorted by AI engagement and suitability scores.",
      "url": "https://creatorbharat.com/leaderboard",
      "itemListElement": sortedCreators.slice(0, 10).map((c, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Person",
          "name": c.name,
          "url": `https://creatorbharat.com/creator/${c.id}`,
          "jobTitle": c.niche || "Content Creator",
          "homeLocation": {
            "@type": "Place",
            "name": c.location || "India"
          }
        }
      }))
    };
  }, [sortedCreators]);

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', overflowX: 'hidden' }}>
      <Seo 
        title="Elite Leaderboard"
        description="Access verified real-time rankings of Bharat's leading influencers. Powered by proprietary engagement intelligence."
        jsonLd={leaderboardJsonLd}
      />
      
      <LeaderboardHero mob={mob} />

      <main style={{ maxWidth: '1300px', margin: mob ? '-30px auto 120px' : '-60px auto 120px', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        
        {/* Floating Advanced Toolbar */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.8)', padding: mob ? '16px' : '12px 12px 12px 32px', 
          borderRadius: '40px', boxShadow: '0 30px 70px rgba(0,0,0,0.08)', 
          border: '1px solid #fff', display: 'flex', flexDirection: mob ? 'column' : 'row', 
          gap: '20px', alignItems: 'center', marginBottom: '56px', backdropFilter: 'blur(20px)' 
        }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', overflowX: 'auto', width: '100%', padding: '4px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: THEME.dark, fontWeight: 950, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginRight: '12px' }}>
               <Filter size={16} /> Filter
            </div>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveTab(cat)} style={{ padding: '10px 24px', borderRadius: '100px', border: 'none', background: activeTab === cat ? THEME.dark : 'transparent', color: activeTab === cat ? '#fff' : '#64748b', fontSize: '14px', fontWeight: 850, cursor: 'pointer', transition: '0.2s', whiteSpace: 'nowrap' }}>
                {cat}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: mob ? '100%' : '380px' }}>
            <Search style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
            <input 
              placeholder="Search by name, niche or location..." 
              value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '18px 24px 18px 56px', borderRadius: '100px', border: '1px solid ' + THEME.border, background: '#fff', fontSize: '15px', fontWeight: 600, outline: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }} 
            />
          </div>
        </div>

        {/* Intelligence Pulse Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '20px', marginBottom: '64px' }}>
           {[
             { label: 'Network Reach', val: '420M+', icon: <Globe />, color: THEME.secondary },
             { label: 'Verified Creators', val: '12,402', icon: <ShieldCheck />, color: THEME.green },
             { label: 'Avg ROI Delta', val: '+24.8%', icon: <Activity />, color: THEME.primary }
           ].map((item) => (
             <div key={item.label} style={{ background: '#fff', padding: '28px', borderRadius: '32px', border: '1px solid ' + THEME.border, display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '56px', height: '56px', background: item.color + '10', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color }}>{item.icon}</div>
                <div>
                   <div style={{ fontSize: '11px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{item.label}</div>
                   <div style={{ fontSize: '24px', fontWeight: 950, color: THEME.dark }}>{item.val}</div>
                </div>
             </div>
           ))}
        </div>

        {/* Sorting Chips Bar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px',
          padding: '0 8px'
        }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Sort Intelligence By:</span>
           </div>
           <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Score', 'Followers', 'Engagement'].map(s => {
                  const active = sortBy === s;
                  return (
                     <button
                       key={s}
                       onClick={() => setSortBy(s)}
                       style={{
                         padding: '10px 20px',
                         borderRadius: '100px',
                         border: `1.5px solid ${active ? THEME.primary : '#e2e8f0'}`,
                         background: active ? THEME.primary + '10' : '#fff',
                         color: active ? THEME.primary : '#64748b',
                         fontWeight: 900,
                         fontSize: '13px',
                         cursor: 'pointer',
                         transition: 'all 0.2s ease',
                         display: 'flex',
                         alignItems: 'center',
                         gap: '6px'
                       }}
                     >
                       {s === 'Score' && <Crown size={14} />}
                       {s === 'Followers' && <Layers size={14} />}
                       {s === 'Engagement' && <Activity size={14} />}
                       {labelMap[s]}
                     </button>
                  );
              })}
           </div>
        </div>

        {/* Podium (Top 3) */}
        {activeTab === 'Overall' && !search && (
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '32px', marginBottom: '80px', alignItems: 'flex-end' }}>
             {sortedCreators.slice(0, 3).map((c, i) => (
               <ElitePodiumCard key={c.id} c={c} i={i} mob={mob} navigate={navigate} />
             ))}
          </div>
        )}

        <RankingsTable creators={sortedCreators} mob={mob} navigate={navigate} />

        {/* Methodology Section (Redesigned) */}
        <section style={{ marginTop: '140px', padding: mob ? '40px 20px' : '100px 80px', background: THEME.dark, borderRadius: '64px', position: 'relative', overflow: 'hidden' }}>
           <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.05, background: 'radial-gradient(circle at 100% 0%, #fff, transparent 50%)' }} />
           
           <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '80px', position: 'relative', zIndex: 1 }}>
              <div>
                 <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px 20px', borderRadius: '100px', marginBottom: '32px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <BarChart3 size={16} color={THEME.primary} />
                    <span style={{ fontSize: '11px', fontWeight: 950, color: '#fff', textTransform: 'uppercase', letterSpacing: '2px' }}>Scoring Protocol</span>
                 </div>
                 <h2 style={{ fontSize: mob ? '40px' : '64px', fontWeight: 950, color: '#fff', letterSpacing: '-0.05em', lineHeight: 0.9, marginBottom: '32px' }}>The Math behind <br/><span style={{ color: THEME.primary }}>the Magic.</span></h2>
                 <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: '48px' }}>We don't just count followers. Our AI engine weights sentiment, retention, and conversion velocity to find true influence.</p>
                 
                 <div style={{ display: 'grid', gap: '32px' }}>
                    {[
                      { title: 'Audience Purity', val: '99.4%', desc: 'Proprietary bot-detection filters.' },
                      { title: 'Sentiment Score', val: 'High', desc: 'Natural language processing on comments.' },
                      { title: 'Economic Value', val: '$2.4M', desc: 'Projected revenue impact per post.' }
                    ].map((m) => (
                      <div key={m.title} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
                         <div>
                            <div style={{ fontSize: '18px', fontWeight: 950, color: '#fff' }}>{m.title}</div>
                            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{m.desc}</div>
                         </div>
                         <div style={{ fontSize: '20px', fontWeight: 950, color: THEME.primary }}>{m.val}</div>
                      </div>
                    ))}
                 </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                 <div style={{ background: 'rgba(255,255,255,0.03)', padding: '48px', borderRadius: '48px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ fontSize: '28px', fontWeight: 950, color: '#fff', marginBottom: '24px' }}>Want to see the full data set?</h3>
                    <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '40px', lineHeight: 1.6 }}>Enterprise brands get access to deep-dive analytics, engagement histories, and historical conversion data for all 10k+ verified creators.</p>
                    <Btn lg style={{ width: '100%', background: '#fff', color: THEME.dark, fontWeight: 950, borderRadius: '16px', padding: '20px' }}>Request Enterprise Access</Btn>
                 </div>
              </div>
           </div>
        </section>

        {/* Final Interactive CTA */}
        <section style={{ marginTop: '140px', textAlign: 'center' }}>
           <Card style={{ padding: mob ? '80px 24px' : '120px 48px', borderRadius: '64px', background: `linear-gradient(135deg, ${THEME.primary} 0%, #EA580C 100%)`, color: '#fff', position: 'relative', overflow: 'hidden' }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} style={{ position: 'absolute', top: -150, right: -150, opacity: 0.1 }}><Globe size={500} /></motion.div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                 <h2 style={{ fontSize: mob ? '48px' : '80px', fontWeight: 950, marginBottom: '24px', letterSpacing: '-0.06em', lineHeight: 0.9 }}>Join Bharat's <br/> Hall of Fame.</h2>
                 <p style={{ fontSize: '22px', color: 'rgba(255,255,255,0.8)', maxWidth: '700px', margin: '0 auto 56px', fontWeight: 500 }}>Join the circle of Bharat's most influential creators. Apply for official verification today.</p>
                 <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <Btn lg onClick={() => navigate('/apply')} style={{ background: '#fff', color: '#EA580C', borderRadius: '100px', fontWeight: 950, padding: '24px 64px', fontSize: '18px' }}>Apply for Verification</Btn>
                 </div>
              </div>
           </Card>
        </section>

      </main>
    </div>
  );
}
