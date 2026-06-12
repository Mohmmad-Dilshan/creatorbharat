import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const THEME = {
  primary: '#FF9431',
  dark: '#050505'
};

export default function LeaderboardHero({ mob }) {
  return (
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
}

LeaderboardHero.propTypes = {
  mob: PropTypes.bool.isRequired
};
