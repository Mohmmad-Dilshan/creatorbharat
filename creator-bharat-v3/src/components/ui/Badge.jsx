import React from 'react';
import PropTypes from 'prop-types';
import { T } from '../../theme';

export function Badge({ children, color = 'gray', sm }) {
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
    dark: { bg: T.n8, col: '#fff' }
  };
  
  const c = m[color] || m.gray;
  
  return (
    <span style={{ 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: 4, 
      padding: sm ? '2px 7px' : '3px 10px', 
      borderRadius: 20, 
      background: c.bg, 
      color: c.col, 
      fontSize: sm ? 10 : 11, 
      fontWeight: 700, 
      whiteSpace: 'nowrap' 
    }}>
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  sm: PropTypes.bool
};

export default Badge;
