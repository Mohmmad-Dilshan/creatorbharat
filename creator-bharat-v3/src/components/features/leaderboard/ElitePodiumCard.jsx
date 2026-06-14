import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Crown, ShieldCheck, MapPin, Plus, Check } from 'lucide-react';
import Sparkline from './Sparkline';
import { useApp } from '@/core/context';

const THEME = {
  primary: '#FF9431',
  secondary: '#3b82f6',
  green: '#10b981',
  bronze: '#EA580C',
  gold: '#F59E0B'
};

const MetricBox = ({ label, value, color }) => (
  <div style={{ textAlign: 'left' }}>
    <div style={{ fontSize: '9px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
    <div style={{ fontSize: '15px', fontWeight: 950, color: color || '#0f172a', marginTop: '2px' }}>{value}</div>
  </div>
);

MetricBox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string
};

// Pedestal Card template for the podium
const PedestalColumn = ({ c, rank, height, border, background, shadow, glowColor, badgeBg, badgeText, navigate, onScoreClick }) => {
  const { st, dsp } = useApp();
  const isCompared = st.compared.includes(c.id);
  const mockPoints = rank === 1 ? [15, 5, 12, 2, 8] : rank === 2 ? [15, 8, 10, 3, 6] : [15, 12, 10, 6, 2];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, boxShadow: `0 30px 60px ${glowColor}25` }}
      onClick={() => navigate(`/creator/${c.id}`)}
      style={{
        background,
        border,
        borderRadius: '36px',
        padding: '36px 28px',
        textAlign: 'center',
        width: '320px',
        position: 'relative',
        boxShadow: shadow,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: height
      }}
    >
      <div>
        {/* Floating Compare Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            dsp({ t: 'COMPARE', id: c.id });
          }}
          style={{ 
            position: 'absolute', 
            top: 20, 
            right: 20, 
            width: '32px', 
            height: '32px', 
            background: isCompared ? THEME.primary : 'rgba(15,23,42,0.04)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            border: isCompared ? 'none' : '1px solid rgba(15,23,42,0.08)',
            color: isCompared ? '#fff' : '#64748b',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: isCompared ? `0 4px 10px ${THEME.primary}30` : 'none',
            zIndex: 5
          }}
          title={isCompared ? "Remove from comparison" : "Add to comparison"}
        >
          {isCompared ? <Check size={14} strokeWidth={3} /> : <Plus size={14} />}
        </button>

        {/* Crown / Rank Indicator */}
        <div style={{ position: 'relative', width: '90px', height: '90px', margin: '0 auto 20px' }}>
          <div style={{ 
            width: '100%', 
            height: '100%', 
            borderRadius: '28px', 
            overflow: 'hidden', 
            border: `3px solid ${glowColor}`, 
            boxShadow: `0 10px 20px ${glowColor}20` 
          }}>
            {c.avatar ? (
              <img src={c.avatar} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', background: glowColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 950, color: '#fff' }}>
                {c.name.charAt(0)}
              </div>
            )}
          </div>
          
          <div style={{ 
            position: 'absolute', 
            bottom: -6, 
            right: -6, 
            width: '36px', 
            height: '36px', 
            background: '#ffffff', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            border: `2px solid ${glowColor}`,
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)' 
          }}>
            {rank === 1 ? (
              <Crown size={16} color={THEME.gold} fill={THEME.gold} />
            ) : (
              <span style={{ color: glowColor, fontWeight: 950, fontSize: '13px' }}>#{rank}</span>
            )}
          </div>
        </div>

        {/* Verification Tag */}
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '4px', 
          background: badgeBg, 
          padding: '6px 12px', 
          borderRadius: '100px', 
          marginBottom: '16px', 
          border: `1px solid ${glowColor}25` 
        }}>
          <ShieldCheck size={12} color={glowColor} />
          <span style={{ fontSize: '10px', fontWeight: 950, color: glowColor, textTransform: 'uppercase', letterSpacing: '1px' }}>
            {badgeText}
          </span>
        </div>

        {/* Creator Identity */}
        <h3 style={{ fontSize: '22px', fontWeight: 950, color: '#0f172a', marginBottom: '6px', letterSpacing: '-0.5px' }}>{c.name}</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>
            <MapPin size={12} /> {c.location}
          </div>
          <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#cbd5e1' }} />
          <span style={{ color: glowColor, fontSize: '12px', fontWeight: 850 }}>{c.niche}</span>
        </div>
      </div>

      {/* Telemetry Grid */}
      <div style={{ 
        background: 'rgba(15,23,42,0.02)', 
        padding: '18px', 
        borderRadius: '24px', 
        border: '1px solid rgba(15,23,42,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', borderBottom: '1px solid rgba(15,23,42,0.04)', paddingBottom: '8px' }}>
          <MetricBox label="Followers" value={c.followers} />
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '9px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Engagement</div>
            <div style={{ fontSize: '15px', fontWeight: 950, color: THEME.green, marginTop: '2px' }}>{c.er}</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', alignItems: 'center' }}>
          <div 
            onClick={(e) => {
              e.stopPropagation();
              onScoreClick(c);
            }}
            style={{ textAlign: 'left', cursor: 'pointer' }}
            title="Click to view Pehchan breakdown"
          >
            <div style={{ fontSize: '9px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', textDecoration: 'underline' }}>Impact Score</div>
            <div style={{ fontSize: '20px', fontWeight: 950, color: '#0f172a', marginTop: '2px' }}>{c.score}<span style={{ fontSize: '12px', color: THEME.green }}>.9</span></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <Sparkline color={glowColor} points={mockPoints} id={c.id} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

PedestalColumn.propTypes = {
  c: PropTypes.object.isRequired,
  rank: PropTypes.number.isRequired,
  height: PropTypes.string.isRequired,
  border: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  shadow: PropTypes.string.isRequired,
  glowColor: PropTypes.string.isRequired,
  badgeBg: PropTypes.string.isRequired,
  badgeText: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
  onScoreClick: PropTypes.func.isRequired
};

// Mobile Fallback Card
const MobileEliteCard = ({ c, rank, glowColor, badgeText, navigate, onScoreClick }) => {
  const { st, dsp } = useApp();
  const isCompared = st.compared.includes(c.id);

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/creator/${c.id}`)}
      style={{
        background: '#ffffff',
        border: `1.5px solid ${glowColor}30`,
        padding: '20px',
        borderRadius: '24px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      <div style={{ fontSize: '20px', fontWeight: 950, color: glowColor, width: '32px' }}>#{rank}</div>
      <div style={{ width: '60px', height: '60px', borderRadius: '18px', border: `2px solid ${glowColor}`, overflow: 'hidden', flexShrink: 0 }}>
        {c.avatar ? <img src={c.avatar} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : c.name.charAt(0)}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 900, color: '#0f172a', fontSize: '16px', display: 'flex', alignItems: 'center', gap: 4 }}>
          {c.name}
          {rank === 1 && <Crown size={14} color={THEME.gold} fill={THEME.gold} />}
        </div>
        <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{c.niche} • {c.followers} • ER: {c.er}</div>
      </div>
      
      {/* Metrics & Click Trigger */}
      <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div 
          onClick={(e) => {
            e.stopPropagation();
            onScoreClick(c);
          }}
          style={{ cursor: 'pointer' }}
        >
          <div style={{ fontSize: '18px', fontWeight: 950, color: '#0f172a' }}>{c.score}</div>
          <div style={{ fontSize: '9px', fontWeight: 900, color: glowColor, textTransform: 'uppercase', letterSpacing: '0.5px', textDecoration: 'underline' }}>Score</div>
        </div>

        {/* Plus Button inside Mobile Elite Card */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            dsp({ t: 'COMPARE', id: c.id });
          }}
          style={{
            background: isCompared ? THEME.primary : 'rgba(15,23,42,0.04)',
            border: isCompared ? 'none' : '1px solid rgba(15,23,42,0.1)',
            color: isCompared ? '#fff' : '#64748b',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isCompared ? <Check size={12} strokeWidth={3} /> : <Plus size={12} />}
        </button>
      </div>
    </motion.div>
  );
};

MobileEliteCard.propTypes = {
  c: PropTypes.object.isRequired,
  rank: PropTypes.number.isRequired,
  glowColor: PropTypes.string.isRequired,
  badgeText: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
  onScoreClick: PropTypes.func.isRequired
};

export default function ElitePodiumCard({ creators, mob, navigate, onScoreClick }) {
  if (!creators || creators.length === 0) return null;
  const first = creators[0];
  const second = creators[1];
  const third = creators[2];

  if (mob) {
    return (
      <div style={{ padding: '0 4px', marginBottom: '32px' }}>
        <h4 style={{ fontSize: '18px', fontWeight: 950, color: '#0f172a', marginBottom: '16px' }}>Elite Top 3</h4>
        {first && <MobileEliteCard c={first} rank={1} glowColor={THEME.gold} badgeText="Top Elite #1" navigate={navigate} onScoreClick={onScoreClick} />}
        {second && <MobileEliteCard c={second} rank={2} glowColor={THEME.secondary} badgeText="Elite Rank #2" navigate={navigate} onScoreClick={onScoreClick} />}
        {third && <MobileEliteCard c={third} rank={3} glowColor={THEME.bronze} badgeText="Elite Rank #3" navigate={navigate} onScoreClick={onScoreClick} />}
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'flex-end', 
      justifyContent: 'center', 
      gap: '24px', 
      margin: '20px 0 64px',
      flexWrap: 'wrap'
    }}>
      {/* 2nd Place (Silver) Pedestal Column */}
      {second && (
        <PedestalColumn
          c={second}
          rank={2}
          height="390px"
          border="1px solid #e2e8f0"
          background="linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)"
          shadow="0 15px 35px rgba(59, 130, 246, 0.05)"
          glowColor={THEME.secondary}
          badgeBg="rgba(59, 130, 246, 0.08)"
          badgeText="Elite Rank #2"
          navigate={navigate}
          onScoreClick={onScoreClick}
        />
      )}

      {/* 1st Place (Gold) Pedestal Column */}
      {first && (
        <PedestalColumn
          c={first}
          rank={1}
          height="450px"
          border="2px solid rgba(245, 158, 11, 0.3)"
          background="linear-gradient(135deg, #ffffff 0%, #fffdf5 100%)"
          shadow="0 25px 55px rgba(245, 158, 11, 0.12)"
          glowColor={THEME.gold}
          badgeBg="rgba(245, 158, 11, 0.08)"
          badgeText="TOP ELITE #1"
          navigate={navigate}
          onScoreClick={onScoreClick}
        />
      )}

      {/* 3rd Place (Bronze) Pedestal Column */}
      {third && (
        <PedestalColumn
          c={third}
          rank={3}
          height="360px"
          border="1px solid #e2e8f0"
          background="linear-gradient(135deg, #ffffff 0%, #fffaf5 100%)"
          shadow="0 15px 35px rgba(234, 88, 12, 0.05)"
          glowColor={THEME.bronze}
          badgeBg="rgba(234, 88, 12, 0.08)"
          badgeText="Elite Rank #3"
          navigate={navigate}
          onScoreClick={onScoreClick}
        />
      )}
    </div>
  );
}

ElitePodiumCard.propTypes = {
  creators: PropTypes.array.isRequired,
  mob: PropTypes.bool,
  navigate: PropTypes.func.isRequired,
  onScoreClick: PropTypes.func.isRequired
};
