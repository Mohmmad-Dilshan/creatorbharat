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
  gradient = 'saffron', // 'saffron', 'green', 'blue', 'gold'
  maxWidth = 900,
  light = true
}) => {
  const gradients = {
    saffron: 'radial-gradient(circle at 50% 50%, rgba(255,148,49,0.12), transparent 70%)',
    green: 'radial-gradient(circle at 50% 50%, rgba(18,136,7,0.1), transparent 70%)',
    blue: 'radial-gradient(circle at 50% 50%, rgba(37,99,235,0.08), transparent 70%)',
    gold: 'radial-gradient(circle at 50% 50%, rgba(217,119,6,0.1), transparent 70%)'
  };

  const accents = {
    saffron: 'linear-gradient(90deg, #FF9431, #fff, #128807)',
    green: 'linear-gradient(90deg, #128807, #fff, #FF9431)',
    blue: 'linear-gradient(90deg, #2563EB, #fff, #10B981)',
    gold: 'linear-gradient(90deg, #D97706, #fff, #FF9431)'
  };

  return (
    <div style={{ 
      background: '#050505', 
      padding: '140px 20px 100px', 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      {/* Decorative Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ 
          position: 'absolute', 
          top: '-10%', 
          right: '5%', 
          width: '400px', 
          height: '400px', 
          background: gradients[gradient] || gradients.saffron, 
          borderRadius: '50%', 
          filter: 'blur(60px)',
          zIndex: 1
        }} 
      />
      
      {/* Top Accent Bar */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        height: 4, 
        background: accents[gradient] || accents.saffron,
        opacity: 0.8,
        zIndex: 2
      }} />
      
      <div style={{ ...W(maxWidth), position: 'relative', zIndex: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <SH 
            eyebrow={eyebrow} 
            title={title} 
            sub={sub} 
            light={light} 
            mb={children ? 32 : 0} 
          />
          {children && (
            <div style={{ marginTop: 24 }}>
              {children}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
});

export default EliteHeader;
