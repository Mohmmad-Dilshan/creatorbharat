import React from 'react';
import PropTypes from 'prop-types';
import { T } from '@/core/theme';

export function Ring({ score, size = 80 }) {
  const r = 32;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  
  let label = 'Rising';
  let color = T.rising;
  
  if (score >= 91) { label = 'Platinum'; color = T.platinum; }
  else if (score >= 76) { label = 'Gold'; color = T.gold; }
  else if (score >= 51) { label = 'Silver'; color = T.silver; }

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
        <circle cx="40" cy="40" r={r} fill="none" stroke={T.bg3} strokeWidth="6" />
        <circle cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="6" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset .6s' }} />
      </svg>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: size * 0.28, fontWeight: 900, color: color, lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: size * 0.11, color: T.t3, fontWeight: 600, marginTop: 1 }}>{label}</div>
      </div>
    </div>
  );
}

Ring.propTypes = {
  score: PropTypes.number.isRequired,
  size: PropTypes.number
};

export default Ring;
