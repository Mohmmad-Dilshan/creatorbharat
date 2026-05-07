import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { W } from '../../utils/helpers';

/**
 * BackgroundBlobs: Animated 'Tiranga' background effect
 */
const BackgroundBlobs = memo(() => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 2 }}>
    {/* Saffron Blob */}
    <motion.div 
      animate={{ 
        x: [0, 40, -20, 0],
        y: [0, -30, 20, 0],
        scale: [1, 1.2, 0.9, 1],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      style={{ 
        position: 'absolute', top: '-20%', left: '10%', width: '600px', height: '600px', 
        background: 'radial-gradient(circle, rgba(255,148,49,0.35) 0%, transparent 70%)', 
        borderRadius: '50%', filter: 'blur(80px)'
      }} 
    />
    
    {/* White Glow Blob */}
    <motion.div 
      animate={{ 
        x: [0, -20, 0],
        y: [0, 20, 0],
        opacity: [0.3, 0.5, 0.3]
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      style={{ 
        position: 'absolute', top: '10%', left: '30%', width: '400px', height: '400px', 
        background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)', 
        borderRadius: '50%', filter: 'blur(60px)'
      }} 
    />

    {/* Green Blob */}
    <motion.div 
      animate={{ 
        x: [0, -50, 30, 0],
        y: [0, 40, -20, 0],
        scale: [1, 1.3, 1],
        rotate: [0, -8, 8, 0]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      style={{ 
        position: 'absolute', bottom: '-20%', right: '10%', width: '600px', height: '600px', 
        background: 'radial-gradient(circle, rgba(18,136,7,0.25) 0%, transparent 70%)', 
        borderRadius: '50%', filter: 'blur(90px)'
      }} 
    />
  </div>
));

BackgroundBlobs.displayName = 'BackgroundBlobs';

/**
 * EliteHeader: A premium, reusable header component for internal pages.
 * Features glassmorphism, animated gradients, and high-fidelity typography.
 */
const EliteHeader = memo(({ 
  eyebrow, 
  title, 
  sub, 
  children, 
  maxWidth = 1100,
  light = false,
  compact = false
}) => {
  const isServer = globalThis.window === undefined;
  const mob = isServer ? false : globalThis.window.innerWidth < 768;

  const getPadding = () => {
    if (mob) {
      return {
        pt: compact ? '100px' : '130px',
        pb: compact ? '50px' : '70px'
      };
    }
    return {
      pt: compact ? '120px' : '160px',
      pb: compact ? '60px' : '100px'
    };
  };

  const { pt, pb } = getPadding();

  return (
    <div style={{ 
      background: light ? 'linear-gradient(180deg, #fff 0%, #f8fafc 100%)' : '#050505', 
      padding: `${pt} 20px ${pb}`, 
      position: 'relative', 
      overflow: 'hidden',
      borderBottom: light ? '1px solid rgba(0,0,0,0.05)' : 'none'
    }}>
      {/* SaaS Dot Grid Background */}
      {light && (
        <div style={{ 
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundImage: 'radial-gradient(#e2e8f0 1.2px, transparent 1.2px)', 
          backgroundSize: '32px 32px', 
          opacity: 0.5,
          zIndex: 1
        }} />
      )}

      {/* Animated 'Tiranga' Lehrata Background Effect */}
      <BackgroundBlobs />
      
      <div style={{ ...W(maxWidth), position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {eyebrow && (
            <motion.div 
              style={{ 
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', 
                background: light ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)', 
                borderRadius: 100, marginBottom: 28, border: `1px solid ${light ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)'}` 
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF9431' }} />
              <span style={{ fontSize: 12, fontWeight: 900, color: light ? '#64748b' : '#fff', textTransform: 'uppercase', letterSpacing: '2px' }}>{eyebrow}</span>
            </motion.div>
          )}

          <h1 style={{ 
            fontSize: mob ? '36px' : 'clamp(40px, 6vw, 72px)', 
            fontWeight: 900, 
            color: light ? '#111' : '#fff', 
            fontFamily: "'Outfit', sans-serif",
            lineHeight: 1.05,
            marginBottom: 24,
            letterSpacing: '-0.02em'
          }}>
            {title}
          </h1>

          {sub && (
            <p style={{ 
              fontSize: mob ? '15px' : 'clamp(17px, 1.3vw, 21px)', 
              color: light ? '#64748b' : 'rgba(255,255,255,0.6)', 
              maxWidth: 700, 
              margin: mob ? '0 auto 32px' : '0 auto 48px',
              lineHeight: 1.6,
              fontWeight: 500
            }}>
              {sub}
            </p>
          )}
          
          {children && (
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              {children}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
});

EliteHeader.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.node.isRequired,
  sub: PropTypes.string,
  children: PropTypes.node,
  maxWidth: PropTypes.number,
  light: PropTypes.bool,
  compact: PropTypes.bool
};

EliteHeader.displayName = 'EliteHeader';

export default EliteHeader;
