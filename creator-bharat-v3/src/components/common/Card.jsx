import React from 'react';
import PropTypes from 'prop-types';
import { T } from '@/core/theme';

export function Card({ children, style: sx = {}, onClick, glass }) {
  const base = {
    background: glass ? 'rgba(255,255,255,0.03)' : '#fff',
    backdropFilter: glass ? 'blur(16px)' : 'none',
    border: glass ? '1px solid rgba(255,255,255,0.1)' : `1px solid ${T.bd}`,
    borderRadius: 20,
    boxShadow: T.sh1,
    overflow: 'hidden',
    textAlign: 'left',
    width: '100%',
    position: 'relative',
    ...sx
  };

  return (
    <div 
      className={`cb-card ${glass ? 'cb-card-glass' : ''}`}
      style={base}
    >
      {onClick && (
        <button 
          type="button"
          onClick={onClick}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            background: 'transparent',
            border: 'none',
            padding: 0,
            margin: 0,
            cursor: 'pointer',
            zIndex: 0,
            opacity: 0,
            outline: 'none'
          }}
          aria-label="View Details"
        />
      )}
      
      <div style={{ position: 'relative', zIndex: 1, pointerEvents: 'none', height: '100%' }}>
        <div style={{ pointerEvents: 'auto', height: '100%' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  onClick: PropTypes.func,
  glass: PropTypes.bool
};

export default Card;
