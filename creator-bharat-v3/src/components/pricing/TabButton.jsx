import React from 'react';
import PropTypes from 'prop-types';

export default function TabButton({ active, label, icon: Icon, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: '16px 32px',
        borderRadius: '100px',
        border: 'none',
        background: active ? '#fff' : 'transparent',
        color: active ? '#0f172a' : '#94a3b8',
        fontSize: '15px',
        fontWeight: 900,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: active ? '0 10px 25px rgba(0,0,0,0.1)' : 'none'
      }}
    >
      <Icon size={18} color={active ? '#FF9431' : '#94a3b8'} strokeWidth={2.5} />
      {label}
    </button>
  );
}

TabButton.propTypes = {
  active: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  onClick: PropTypes.func.isRequired
};
