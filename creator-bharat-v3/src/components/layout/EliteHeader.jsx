import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { W } from '../../utils/helpers';
import { SH } from '../Primitives';

/**
 * EliteHeader: A premium, reusable header component for internal pages.
 * Features glassmorphism, animated gradients, and high-fidelity typography.
 */
const EliteHeader = memo(({ 
  eyebrow, 
  title, 
  sub, 
  children, 
  gradient = 'saffron', 
  maxWidth = 1100,
  light = false,
  compact = false
}) => {
  const mob = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const gradients = {
    saffron: 'radial-gradient(circle at 50% 50%, rgba(255,148,49,0.1), transparent 70%)',
    green: 'radial-gradient(circle at 50% 50%, rgba(18,136,7,0.08), transparent 70%)',
    blue: 'radial-gradient(circle at 50% 50%, rgba(37,99,235,0.06), transparent 70%)',
    gold: 'radial-gradient(circle at 50% 50%, rgba(217,119,6,0.08), transparent 70%)'
  };

  const pt = mob ? (compact ? '80px' : '100px') : (compact ? '120px' : '160px');
  const pb = mob ? (compact ? '40px' : '60px') : (compact ? '60px' : '100px');

  return (
    <div style={{ 
      background: light ? '#fff' : '#050505', 
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

      {/* Modern Decorative Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: light ? [0.4, 0.6, 0.4] : [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ 
          position: 'absolute', top: '-10%', right: '5%', width: '500px', height: '500px', 
          background: gradients[gradient] || gradients.saffron, 
          borderRadius: '50%', filter: 'blur(100px)', zIndex: 2
        }} 
      />
      
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
            fontSize: 'clamp(40px, 6vw, 72px)', 
            fontWeight: 900, 
            color: light ? '#111' : '#fff', 
            fontFamily: "'Fraunces', serif",
            lineHeight: 1.05,
            marginBottom: 24,
            letterSpacing: '-0.02em'
          }}>
            {title}
          </h1>

          {sub && (
            <p style={{ 
              fontSize: 'clamp(17px, 1.3vw, 21px)', 
              color: light ? '#64748b' : 'rgba(255,255,255,0.6)', 
              maxWidth: 700, 
              margin: '0 auto 48px',
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

export default EliteHeader;
