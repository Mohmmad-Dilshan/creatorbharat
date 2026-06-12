import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Crown, ShieldCheck, MapPin, Star } from 'lucide-react';
import Sparkline from './Sparkline';

const THEME = {
  primary: '#FF9431',
  secondary: '#3b82f6',
  dark: '#050505',
  green: '#10b981'
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
  c: PropTypes.object.isRequired,
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
  c: PropTypes.object.isRequired,
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
  c: PropTypes.object.isRequired,
  mob: PropTypes.bool,
  navigate: PropTypes.func.isRequired
};

export default function ElitePodiumCard({ c, i, mob, navigate }) {
  if (i === 0) {
    return <GoldPodiumCard c={c} mob={mob} navigate={navigate} />;
  }
  if (i === 1) {
    return <SilverPodiumCard c={c} mob={mob} navigate={navigate} />;
  }
  return <BronzePodiumCard c={c} mob={mob} navigate={navigate} />;
}

ElitePodiumCard.propTypes = {
  c: PropTypes.object.isRequired,
  i: PropTypes.number.isRequired,
  mob: PropTypes.bool,
  navigate: PropTypes.func.isRequired
};
