import React from 'react';
import PropTypes from 'prop-types';
import { T } from '@/core/theme';

export function Badge({ children, color = 'gray', sm, lg, dot, style: sx = {}, className, ...props }) {
  const m = {
    red: { bg: T.ga, col: T.gd },
    green: { bg: T.okl, col: T.ok },
    yellow: { bg: T.wnl, col: T.wn },
    blue: { bg: T.infol, col: T.info },
    purple: { bg: 'rgba(124,58,237,.1)', col: '#7C3AED' },
    gray: { bg: T.bg3, col: T.t2 },
    gold: { bg: 'rgba(217,119,6,.1)', col: T.gold },
    platinum: { bg: 'rgba(124,58,237,.1)', col: T.platinum },
    silver: { bg: 'rgba(156,163,175,.15)', col: '#6B7280' },
    rising: { bg: 'rgba(107,114,128,.1)', col: '#6B7280' },
    dark: { bg: T.n8, col: '#fff' },
    orange: { bg: 'rgba(255,148,49,0.1)', col: '#FF9431' }
  };
  
  const c = m[color] || m.gray;
  
  let fontSize = 11;
  if (lg) fontSize = 13;
  else if (sm) fontSize = 10;

  let padding = '4px 12px';
  if (lg) padding = '6px 16px';
  else if (sm) padding = '2px 8px';

  return (
    <span 
      className={className}
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: 6, 
        padding, 
        borderRadius: 100, 
        background: c.bg, 
        color: c.col, 
        fontSize, 
        fontWeight: 800, 
        whiteSpace: 'nowrap',
        fontFamily: "'Outfit', sans-serif",
        ...sx 
      }}
      {...props}
    >
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />}
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  sm: PropTypes.bool,
  lg: PropTypes.bool,
  dot: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string
};

export default Badge;
