import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { T } from '@/core/theme';

const getBtnStyles = (variant, h) => {
  const vs = {
    primary: { background: T.gd, color: '#fff', boxShadow: h ? '0 8px 24px rgba(255,148,49,0.25)' : 'none', transform: h ? 'translateY(-1px)' : 'none' },
    outline: { background: 'transparent', color: T.t1, border: `1.5px solid ${T.bd2}`, boxShadow: h ? T.sh2 : 'none' },
    ghost: { background: h ? T.bg3 : 'transparent', color: T.t2 },
    dark: { background: T.n8, color: '#fff', boxShadow: h ? T.sh3 : 'none' },
    white: { background: '#fff', color: T.t1, boxShadow: T.sh2, transform: h ? 'translateY(-1px)' : 'none' },
    text: { background: 'none', color: T.t1, padding: '0', fontWeight: 700, fontSize: 'inherit' },
    success: { background: T.ok, color: '#fff', boxShadow: h ? '0 8px 24px rgba(16,185,129,0.25)' : 'none' }
  };
  return vs[variant] || vs.primary;
};

export function Button({ children, onClick, variant = 'primary', sm, lg, full, disabled, loading, style: sx = {}, href, className, ...props }) {
  const [isHovered, setIsHovered] = useState(false);
  
  let fontSize = 14;
  if (lg) fontSize = 16;
  else if (sm) fontSize = 12;

  let padding = '12px 24px';
  if (lg) padding = '16px 32px';
  else if (sm) padding = '8px 16px';
  
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    fontFamily: 'inherit', fontWeight: 700, cursor: disabled || loading ? 'not-allowed' : 'pointer',
    border: 'none', borderRadius: 12, transition: 'all .2s cubic-bezier(0.4,0,0.2,1)',
    textDecoration: 'none', fontSize, padding,
    opacity: disabled ? .55 : 1, width: full ? '100%' : 'auto', ...sx
  };

  const Tag = href ? 'a' : 'button';
  return (
    <Tag 
      className={`btn-int ${className || ''}`} 
      onClick={onClick} 
      disabled={disabled || loading} 
      href={href}
      style={{ ...getBtnStyles(variant, isHovered), ...base }}
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {loading ? (
        <span className="spin" style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%' }} />
      ) : children}
    </Tag>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  sm: PropTypes.bool,
  lg: PropTypes.bool,
  full: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  style: PropTypes.object,
  href: PropTypes.string,
  className: PropTypes.string
};

export default Button;
