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

const ActivityTicker = () => {
  const activities = [
    "🔥 @iam_ritik just applied to Nike Summer Campaign",
    "✨ @prio_sharma secured a deal with Mamaearth",
    "🚀 New High-Ticket campaign live: Coca-Cola India",
    "💎 @karan_vlogs joined the Verified Network",
    "📈 @shrutii_fash reached Platinum Tier",
  ];
  const isBrowser = globalThis.window !== undefined;
  const mob = isBrowser && globalThis.window.innerWidth < 768;
  
  return (
    <div style={{ 
      width: '100%', 
      background: 'rgba(15,23,42,0.02)', 
      borderBottom: '1px solid rgba(15,23,42,0.05)',
      padding: mob ? '10px 0' : '8px 0',
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 100,
      maxWidth: '100vw'
    }}>
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: mob ? 25 : 40, repeat: Infinity, ease: "linear" }}
        style={{ display: 'flex', gap: mob ? '40px' : '60px', whiteSpace: 'nowrap', width: 'fit-content', maxWidth: 'none' }}
      >
        {[...activities, ...activities].map((a, i) => (
          <span key={i} style={{ fontSize: mob ? '10px' : '11px', fontWeight: 900, color: '#64748b', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            {a}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const BrandScroller = () => {
  const brands = ["Nike", "CocaCola", "Adidas", "Samsung", "Apple", "Puma", "RedBull"];
  const isBrowser = globalThis.window !== undefined;
  const mob = isBrowser && globalThis.window.innerWidth < 768;

  return (
    <div style={{ marginTop: mob ? '40px' : '60px', opacity: 0.4, padding: '20px 0' }}>
      <p style={{ textAlign: 'center', fontSize: mob ? '9px' : '10px', fontWeight: 900, color: '#64748b', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: mob ? '16px' : '24px' }}>Trusted by Industry Leaders</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: mob ? '24px' : '48px', flexWrap: 'wrap' }}>
        {brands.slice(0, mob ? 4 : 7).map((b, i) => (
          <div key={i} style={{ fontSize: mob ? '18px' : '24px', fontWeight: 950, color: '#0f172a', letterSpacing: '-1px' }}>
            {b}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * EliteHeader: A premium, reusable header component for internal pages.
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
      overflowX: 'hidden',
      overflowY: 'visible',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
      borderBottom: light ? '1px solid rgba(0,0,0,0.05)' : 'none'
    }}>
      {!compact && <ActivityTicker />}

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
      
      <div style={{ 
        width: '100%', 
        maxWidth: maxWidth + 'px', 
        margin: '0 auto',
        position: 'relative', 
        zIndex: 10, 
        textAlign: 'center', 
        boxSizing: 'border-box'
      }}>
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

          <div style={{ 
            fontSize: mob ? '36px' : 'clamp(40px, 6vw, 72px)', 
            fontWeight: 900, 
            color: light ? '#111' : '#fff', 
            fontFamily: "'Outfit', sans-serif",
            lineHeight: 1.05,
            marginBottom: 24,
            letterSpacing: '-0.02em',
            textAlign: 'center'
          }}>
            {title}
          </div>

          {sub && (
            <div style={{ 
              fontSize: mob ? '15px' : 'clamp(17px, 1.3vw, 21px)', 
              color: light ? '#64748b' : 'rgba(255,255,255,0.6)', 
              maxWidth: 700, 
              margin: mob ? '0 auto 32px' : '0 auto 48px',
              lineHeight: 1.6,
              fontWeight: 500
            }}>
              {sub}
            </div>
          )}
          
          {children && (
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              {children}
            </div>
          )}

          {!compact && <BrandScroller />}
        </motion.div>
      </div>
    </div>
  );
});

EliteHeader.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.node.isRequired,
  sub: PropTypes.node,
  children: PropTypes.node,
  maxWidth: PropTypes.number,
  light: PropTypes.bool,
  compact: PropTypes.bool
};

EliteHeader.displayName = 'EliteHeader';

export default EliteHeader;
