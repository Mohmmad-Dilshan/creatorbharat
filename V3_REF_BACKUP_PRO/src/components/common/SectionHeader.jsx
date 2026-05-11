import React from 'react';
import PropTypes from 'prop-types';
import { T } from '@/core/theme';

export function SectionHeader({ eyebrow, title, sub, center, light, mb = 56 }) {
  const alignment = center ? 'center' : 'left';
  const justify = center ? 'center' : 'flex-start';
  
  return (
    <div style={{ textAlign: alignment, marginBottom: mb, position: 'relative' }}>
      {eyebrow && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: justify, gap: 12, marginBottom: 16 }}>
          <div style={{ width: 32, height: 3, background: T.gd, borderRadius: 4 }} />
          <p style={{ fontSize: 12, fontWeight: 900, letterSpacing: '.15em', textTransform: 'uppercase', color: T.saffron }}>{eyebrow}</p>
        </div>
      )}
      <h2 style={{ 
        fontFamily: "'Outfit', sans-serif", 
        fontSize: 'clamp(32px, 6vw, 52px)', 
        fontWeight: 900, 
        color: light ? '#fff' : T.t1, 
        marginBottom: sub ? 20 : 0, 
        lineHeight: 1, 
        letterSpacing: '-0.03em' 
      }}>
        {title}
      </h2>
      {sub && (
        <p style={{ 
          fontSize: 18, 
          color: light ? 'rgba(255,255,255,0.6)' : T.t2, 
          maxWidth: center ? 640 : '100%', 
          margin: center ? '0 auto' : '0', 
          lineHeight: 1.6, 
          fontWeight: 500 
        }}>
          {sub}
        </p>
      )}
      {!center && <div style={{ width: 60, height: 4, background: T.ga, marginTop: 24, borderRadius: 2 }} />}
    </div>
  );
}

SectionHeader.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  sub: PropTypes.string,
  center: PropTypes.bool,
  light: PropTypes.bool,
  mb: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default SectionHeader;
