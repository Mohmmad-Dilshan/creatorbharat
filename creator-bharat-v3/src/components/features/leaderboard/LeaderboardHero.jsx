import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const THEME = {
  primary: '#FF9431',
  dark: '#090d16'
};

export default function LeaderboardHero({ mob }) {
  return (
    <section style={{ 
      background: THEME.dark, padding: mob ? '140px 20px 90px' : '180px 24px 110px', 
      textAlign: 'center', position: 'relative', overflow: 'hidden',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }}>
      {/* Immersive Background Particles (Abstract Saffron/Emerald) */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }}>
        {['p1', 'p2', 'p3', 'p4', 'p5', 'p6'].map((p, i) => (
          <motion.div
            key={p}
            animate={{ 
              y: [0, -25, 0], 
              opacity: [0.12, 0.35, 0.12],
              scale: [1, 1.15, 1]
            }}
            transition={{ duration: 5 + i, repeat: Infinity }}
            style={{ 
              position: 'absolute', 
              width: '400px', height: '400px', 
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(255, 148, 49, 0.12) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
              left: `${(i * 18) % 100}%`,
              top: `${(i * 22) % 100}%`,
              borderRadius: '50%'
            }}
          />
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '160px', background: 'linear-gradient(to top, #090d16, transparent)', pointerEvents: 'none' }} />
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'rgba(255, 255, 255, 0.03)', padding: '12px 24px', borderRadius: '100px', marginBottom: '32px', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(12px)' }}
        >
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: THEME.primary, boxShadow: `0 0 10px ${THEME.primary}` }} />
          <span style={{ fontSize: '12px', fontWeight: 950, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.25em' }}>Verified Influence Intelligence</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          style={{ fontSize: mob ? '52px' : '100px', fontWeight: 950, color: '#fff', marginBottom: '28px', letterSpacing: '-0.06em', lineHeight: 0.9 }}
        >
          Bharat's <br />
          <span style={{ background: 'linear-gradient(135deg, #FF9431 0%, #fff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Top 100 Creators.</span>
        </motion.h1>

        {/* Live Ticker Telemetry Node */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '11px',
            fontFamily: 'monospace',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: '36px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            background: 'rgba(255,255,255,0.02)',
            padding: '8px 20px',
            borderRadius: '100px',
            border: '1px solid rgba(255,255,255,0.06)',
            backdropFilter: 'blur(4px)'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 6px #10B981' }} />
            SYS_SYNC: <span style={{ color: '#10B981', fontWeight: 800 }}>ONLINE</span>
          </span>
          <span style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.15)' }} />
          <span>DB_CONSENSUS: <span style={{ color: '#FF9431', fontWeight: 800 }}>100% SECURE</span></span>
          <span style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.15)' }} />
          <span>NODE: <span style={{ color: '#3b82f6', fontWeight: 800 }}>BHA-T1-09</span></span>
        </motion.div>
        
        <p style={{ fontSize: mob ? '17px' : '20px', color: 'rgba(255, 255, 255, 0.4)', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6, fontWeight: 550 }}>
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
