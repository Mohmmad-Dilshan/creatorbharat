import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './Button';

export function EmptyState({ icon, title, sub, ctaLabel, onCta }) {
  return (
    <div style={{ 
      padding: '80px 40px', 
      textAlign: 'center', 
      background: '#fff', 
      borderRadius: 40, 
      border: '1px solid #f1f5f9',
      boxShadow: '0 20px 50px rgba(0,0,0,0.04)',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      <div style={{ fontSize: 64, marginBottom: 24, display: 'inline-block', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }}>{icon}</div>
      <h3 style={{ fontSize: 24, fontWeight: 950, color: '#0f172a', marginBottom: 12, letterSpacing: '-0.02em' }}>{title}</h3>
      <p style={{ 
        fontSize: 15, 
        color: '#64748b', 
        marginBottom: 32, 
        lineHeight: 1.6,
        fontWeight: 500
      }}>
        {sub}
      </p>
      {ctaLabel && (
        <Button 
          onClick={onCta}
          style={{ borderRadius: 100, padding: '14px 40px', fontWeight: 900, fontSize: 14 }}
        >
          {ctaLabel}
        </Button>
      )}
    </div>
  );
}

EmptyState.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  sub: PropTypes.string,
  ctaLabel: PropTypes.string,
  onCta: PropTypes.func
};

export default EmptyState;
