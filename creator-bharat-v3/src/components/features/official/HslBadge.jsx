import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle2, Award, Zap } from 'lucide-react';

export default function HslBadge({ type }) {
  const styles = {
    verified: {
      bg: 'hsla(210, 100%, 50%, 0.1)',
      border: '1px solid hsla(210, 100%, 50%, 0.25)',
      color: 'hsl(210, 100%, 45%)',
      shadow: '0 4px 12px hsla(210, 100%, 50%, 0.15)',
      label: 'Verified'
    },
    elite: {
      bg: 'hsla(35, 100%, 50%, 0.1)',
      border: '1px solid hsla(35, 100%, 50%, 0.25)',
      color: 'hsl(35, 100%, 40%)',
      shadow: '0 4px 12px hsla(35, 100%, 50%, 0.15)',
      label: 'Elite'
    },
    enterprise: {
      bg: 'hsla(260, 100%, 60%, 0.1)',
      border: '1px solid hsla(260, 100%, 60%, 0.25)',
      color: 'hsl(260, 100%, 55%)',
      shadow: '0 4px 12px hsla(260, 100%, 60%, 0.15)',
      label: 'Enterprise'
    }
  };

  const current = styles[type] || styles.verified;

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      background: current.bg,
      border: current.border,
      color: current.color,
      boxShadow: current.shadow,
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '0.8px',
      fontFamily: "'Outfit', sans-serif",
      userSelect: 'none'
    }}>
      {type === 'verified' && <CheckCircle2 size={12} style={{ fill: current.color, color: '#fff' }} />}
      {type === 'elite' && <Award size={12} />}
      {type === 'enterprise' && <Zap size={12} />}
      <span>{current.label}</span>
    </div>
  );
}

HslBadge.propTypes = {
  type: PropTypes.oneOf(['verified', 'elite', 'enterprise']).isRequired
};
