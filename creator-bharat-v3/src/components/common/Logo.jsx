import React from 'react';
import PropTypes from 'prop-types';
import { useApp } from '@/core/context';

export function Logo({ sm, light, onClick, iconOnly, size }) {
  const sz = size || (sm ? 34 : 44);
  const Tag = onClick ? 'button' : 'div';
  
  // Safe extraction for context-less environments (like tests)
  const context = useApp();
  const settings = context?.st?.settings || { siteName: 'CreatorBharat', logoUrl: '' };
  
  return (
    <Tag 
      onClick={onClick} 
      className="logo-container" 
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: sm ? 10 : 14, 
        cursor: onClick ? 'pointer' : 'default', 
        userSelect: 'none', 
        position: 'relative',
        background: 'none', 
        border: 'none', 
        padding: 0, 
        textAlign: 'left'
      }}
    >
      {settings.logoUrl ? (
        <div style={{ width: sz, height: sz, borderRadius: '50%', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={settings.logoUrl} alt={settings.siteName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ) : (
        <div style={{ position: 'relative', width: sz, height: sz, borderRadius: '50%', padding: 2, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: '200%', height: '200%', background: 'conic-gradient(from 0deg, #FF9431, #fff, #128807, #fff, #FF9431)', animation: 'spinBorder 4s linear infinite', zIndex: 0 }} />
          <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '33.33%', background: '#FF9431' }} />
            <div style={{ position: 'absolute', top: '33.33%', left: 0, right: 0, height: '33.34%', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '25%', height: '25%', borderRadius: '50%', border: sz > 100 ? '2px solid #000080' : '1px solid #000080', position: 'relative' }}>
                {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165].map(deg => (
                  <div key={deg} style={{ position: 'absolute', top: '50%', left: '50%', width: '100%', height: sz > 100 ? 1.5 : 1, background: '#000080', transform: `translate(-50%,-50%) rotate(${deg}deg)` }} />
                ))}
              </div>
            </div>
            <div style={{ position: 'absolute', top: '66.67%', left: 0, right: 0, height: '33.33%', background: '#128807' }} />
          </div>
        </div>
      )}
      {!iconOnly && (
        <span className="logo-text-animated" style={{ fontFamily: "'Inter', sans-serif", fontSize: sm ? 19 : 28, fontWeight: 900, letterSpacing: '-0.04em', display: 'flex', alignItems: 'center', color: light ? '#fff' : 'inherit' }}>
          {settings.siteName}
        </span>
      )}
    </Tag>
  );
}

Logo.propTypes = {
  sm: PropTypes.bool,
  light: PropTypes.bool,
  onClick: PropTypes.func,
  iconOnly: PropTypes.bool,
  size: PropTypes.number
};

export default Logo;
