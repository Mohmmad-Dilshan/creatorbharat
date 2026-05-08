import React from 'react';
import PropTypes from 'prop-types';
import { T } from '../../theme';
import { Button } from './Button';

export function EmptyState({ icon, title, sub, ctaLabel, onCta }) {
  return (
    <div style={{ 
      padding: '60px 20px', 
      textAlign: 'center', 
      background: '#fff', 
      borderRadius: 24, 
      border: `1px dashed ${T.bd}` 
    }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontSize: 20, fontWeight: 800, color: T.n8, marginBottom: 8 }}>{title}</h3>
      <p style={{ 
        fontSize: 14, 
        color: T.t3, 
        marginBottom: 24, 
        maxWidth: 300, 
        margin: '0 auto 24px' 
      }}>
        {sub}
      </p>
      {ctaLabel && <Button onClick={onCta}>{ctaLabel}</Button>}
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
