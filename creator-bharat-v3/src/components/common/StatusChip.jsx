import React from 'react';
import PropTypes from 'prop-types';
import { T } from '@/core/theme';

export function StatusChip({ label, active, onClick }) {
  return (
    <button 
      onClick={onClick} 
      style={{ 
        padding: '6px 14px', 
        borderRadius: 20, 
        border: `1.5px solid ${active ? T.gd : T.bd}`, 
        background: active ? T.ga : 'transparent', 
        color: active ? T.gd : T.t2, 
        fontSize: 12, 
        fontWeight: 700, 
        cursor: 'pointer', 
        transition: 'all .2s' 
      }}
    >
      {label}
    </button>
  );
}

StatusChip.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func
};

export default StatusChip;
