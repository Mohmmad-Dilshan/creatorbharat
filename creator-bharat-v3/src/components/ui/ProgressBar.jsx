import React from 'react';
import PropTypes from 'prop-types';
import { T } from '../../theme';

export function ProgressBar({ value, max = 100, color, label, showPct, height = 8 }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const barColor = color || T.gd;
  const labelColor = color || T.saffron;

  return (
    <div>
      {(label || showPct) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          {label && <span style={{ fontSize: 12, color: T.t2 }}>{label}</span>}
          {showPct && <span style={{ fontSize: 12, color: labelColor, fontWeight: 700 }}>{pct}%</span>}
        </div>
      )}
      <div style={{ height, background: T.bg3, borderRadius: height, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: pct + '%', background: barColor, borderRadius: height, transition: 'width .6s' }} />
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
  color: PropTypes.string,
  label: PropTypes.string,
  showPct: PropTypes.bool,
  height: PropTypes.number
};

export default ProgressBar;
