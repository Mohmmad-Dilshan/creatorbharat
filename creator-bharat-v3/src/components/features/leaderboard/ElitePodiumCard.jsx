import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Crown, ShieldCheck, MapPin, Star } from 'lucide-react';
import Sparkline from './Sparkline';

const THEME = {
  primary: '#FF9431',
  secondary: '#3b82f6',
  dark: '#090d16',
  green: '#10b981',
  bronze: '#EA580C'
};

const GoldPodiumCard = ({ c, mob, navigate }) => {
  const mockPoints = [15, 5, 12, 2, 8];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onClick={() => navigate(`/creator/${c.id}`)}
      style={{
        background: 'linear-gradient(165deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.005) 100%)',
        backdropFilter: 'blur(16px)',
        padding: mob ? '32px' : '48px 36px', 
        borderRadius: '40px', 
        border: '2px solid rgba(255, 148, 49, 0.4)',
        textAlign: 'center', 
        position: 'relative', 
        overflow: 'hidden', 
        boxShadow: '0 30px 60px rgba(255, 148, 49, 0.15)', 
        cursor: 'pointer',
        order: mob ? 0 : 2
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, transparent, ${THEME.primary}, transparent)` }} />
      
      <div style={{ position: 'relative', width: '110px', height: '110px', margin: '0 auto 28px' }}>
         <div style={{ width: '100%', height: '100%', borderRadius: '36px', overflow: 'hidden', border: '4px solid #FF9431', boxShadow: '0 16px 32px rgba(255,148,49,0.2)' }}>
            {c.avatar ? (
               <img src={c.avatar} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
               <div style={{ width: '100%', height: '100%', background: THEME.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 950, color: '#fff' }}>
                 {c.name.charAt(0)}
               </div>
            )}
         </div>
         <div style={{ position: 'absolute', bottom: -8, right: -8, width: '42px', height: '42px', background: '#090d16', border: '2px solid #FF9431', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
            <Crown size={20} color={THEME.primary} style={{ filter: 'drop-shadow(0 0 3px rgba(255, 148, 49, 0.4))' }} />
         </div>
      </div>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,148,49,0.12)', padding: '8px 16px', borderRadius: '100px', marginBottom: '20px', border: '1px solid rgba(255,148,49,0.2)' }}>
        <ShieldCheck size={13} color={THEME.primary} />
        <span style={{ fontSize: '11px', fontWeight: 950, color: THEME.primary, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
          TOP ELITE #1
        </span>
      </div>

      <h3 style={{ fontSize: '28px', fontWeight: 950, color: '#fff', marginBottom: '8px', letterSpacing: '-0.5px' }}>{c.name}</h3>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 600 }}>
            <MapPin size={12} /> {c.location}
         </div>
         <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
         <div style={{ color: THEME.primary, fontSize: '13px', fontWeight: 850 }}>{c.niche}</div>
      </div>

      {/* Structured Telemetry Grid */}
      <div style={{ 
        background: 'rgba(255,255,255,0.02)', 
        padding: '20px', 
        borderRadius: '24px', 
        border: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '10px' }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '9px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Followers</div>
            <div style={{ fontSize: '15px', fontWeight: 950, color: '#fff', marginTop: '2px' }}>{c.followers}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '9px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Engagement</div>
            <div style={{ fontSize: '15px', fontWeight: 950, color: THEME.green, marginTop: '2px' }}>{c.er}</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', alignItems: 'center' }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '9px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Impact Score</div>
            <div style={{ fontSize: '22px', fontWeight: 950, color: '#fff', marginTop: '2px' }}>{c.score}<span style={{ fontSize: '12px', color: THEME.green }}>.9</span></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
             <div style={{ fontSize: '9px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>Velocity</div>
             <Sparkline color={THEME.primary} points={mockPoints} id={c.id} />
          </div>
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
      whileHover={{ y: -10, scale: 1.02 }}
      onClick={() => navigate(`/creator/${c.id}`)}
      style={{
        background: 'linear-gradient(165deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.005) 100%)',
        backdropFilter: 'blur(16px)',
        padding: mob ? '32px' : '48px 36px', 
        borderRadius: '40px', 
        border: '1.5px solid rgba(59, 130, 246, 0.3)',
        textAlign: 'center', 
        position: 'relative', 
        overflow: 'hidden', 
        boxShadow: '0 25px 50px rgba(59, 130, 246, 0.08)', 
        cursor: 'pointer',
        order: 1
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, transparent, ${THEME.secondary}, transparent)` }} />
      
      <div style={{ position: 'relative', width: '110px', height: '110px', margin: '0 auto 28px' }}>
         <div style={{ width: '100%', height: '100%', borderRadius: '36px', overflow: 'hidden', border: '4px solid #3b82f6', boxShadow: '0 16px 32px rgba(59, 130, 246, 0.15)' }}>
            {c.avatar ? (
               <img src={c.avatar} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
               <div style={{ width: '100%', height: '100%', background: THEME.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 950, color: '#fff' }}>
                 {c.name.charAt(0)}
               </div>
            )}
         </div>
         <div style={{ position: 'absolute', bottom: -8, right: -8, width: '42px', height: '42px', background: '#090d16', border: '2px solid #3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
            <span style={{ color: THEME.secondary, fontWeight: 950, fontSize: '15px' }}>#2</span>
         </div>
      </div>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(59, 130, 246, 0.12)', padding: '8px 16px', borderRadius: '100px', marginBottom: '20px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
        <ShieldCheck size={13} color={THEME.secondary} />
        <span style={{ fontSize: '11px', fontWeight: 950, color: THEME.secondary, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
          {c.tier} Tier
        </span>
      </div>

      <h3 style={{ fontSize: '28px', fontWeight: 950, color: '#fff', marginBottom: '8px', letterSpacing: '-0.5px' }}>{c.name}</h3>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 600 }}>
            <MapPin size={12} /> {c.location}
         </div>
         <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
         <div style={{ color: THEME.secondary, fontSize: '13px', fontWeight: 850 }}>{c.niche}</div>
      </div>

      {/* Structured Telemetry Grid */}
      <div style={{ 
        background: 'rgba(255,255,255,0.02)', 
        padding: '20px', 
        borderRadius: '24px', 
        border: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '10px' }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '9px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Followers</div>
            <div style={{ fontSize: '15px', fontWeight: 950, color: '#fff', marginTop: '2px' }}>{c.followers}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '9px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Engagement</div>
            <div style={{ fontSize: '15px', fontWeight: 950, color: THEME.green, marginTop: '2px' }}>{c.er}</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', alignItems: 'center' }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '9px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Impact Score</div>
            <div style={{ fontSize: '22px', fontWeight: 950, color: '#fff', marginTop: '2px' }}>{c.score}<span style={{ fontSize: '12px', color: THEME.green }}>.9</span></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
             <div style={{ fontSize: '9px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>Velocity</div>
             <Sparkline color={THEME.secondary} points={mockPoints} id={c.id} />
          </div>
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
      whileHover={{ y: -10, scale: 1.02 }}
      onClick={() => navigate(`/creator/${c.id}`)}
      style={{
        background: 'linear-gradient(165deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.005) 100%)',
        backdropFilter: 'blur(16px)',
        padding: mob ? '32px' : '48px 36px', 
        borderRadius: '40px', 
        border: '1.5px solid rgba(234, 88, 12, 0.3)',
        textAlign: 'center', 
        position: 'relative', 
        overflow: 'hidden', 
        boxShadow: '0 20px 40px rgba(234, 88, 12, 0.08)', 
        cursor: 'pointer',
        order: mob ? 2 : 3
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, transparent, ${THEME.bronze}, transparent)` }} />
      
      <div style={{ position: 'relative', width: '110px', height: '110px', margin: '0 auto 28px' }}>
         <div style={{ width: '100%', height: '100%', borderRadius: '36px', overflow: 'hidden', border: '4px solid #EA580C', boxShadow: '0 16px 32px rgba(234, 88, 12, 0.15)' }}>
            {c.avatar ? (
               <img src={c.avatar} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
               <div style={{ width: '100%', height: '100%', background: THEME.bronze, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 950, color: '#fff' }}>
                 {c.name.charAt(0)}
               </div>
            )}
         </div>
         <div style={{ position: 'absolute', bottom: -8, right: -8, width: '42px', height: '42px', background: '#090d16', border: '2px solid #EA580C', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
            <span style={{ color: THEME.bronze, fontWeight: 950, fontSize: '15px' }}>#3</span>
         </div>
      </div>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(234, 88, 12, 0.12)', padding: '8px 16px', borderRadius: '100px', marginBottom: '20px', border: '1px solid rgba(234, 88, 12, 0.2)' }}>
        <ShieldCheck size={13} color={THEME.bronze} />
        <span style={{ fontSize: '11px', fontWeight: 950, color: THEME.bronze, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
          {c.tier} Tier
        </span>
      </div>

      <h3 style={{ fontSize: '28px', fontWeight: 950, color: '#fff', marginBottom: '8px', letterSpacing: '-0.5px' }}>{c.name}</h3>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 600 }}>
            <MapPin size={12} /> {c.location}
         </div>
         <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
         <div style={{ color: THEME.bronze, fontSize: '13px', fontWeight: 850 }}>{c.niche}</div>
      </div>

      {/* Structured Telemetry Grid */}
      <div style={{ 
        background: 'rgba(255,255,255,0.02)', 
        padding: '20px', 
        borderRadius: '24px', 
        border: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '10px' }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '9px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Followers</div>
            <div style={{ fontSize: '15px', fontWeight: 950, color: '#fff', marginTop: '2px' }}>{c.followers}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '9px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Engagement</div>
            <div style={{ fontSize: '15px', fontWeight: 950, color: THEME.green, marginTop: '2px' }}>{c.er}</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', alignItems: 'center' }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '9px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Impact Score</div>
            <div style={{ fontSize: '22px', fontWeight: 950, color: '#fff', marginTop: '2px' }}>{c.score}<span style={{ fontSize: '12px', color: THEME.green }}>.9</span></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
             <div style={{ fontSize: '9px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>Velocity</div>
             <Sparkline color={THEME.bronze} points={mockPoints} id={c.id} />
          </div>
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
