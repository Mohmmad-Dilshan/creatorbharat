import React from 'react';
import PropTypes from 'prop-types';

export const ModeButton = ({ active, icon: Icon, title, sub, color, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      border: `1.5px solid ${active ? color : '#E5E7EB'}`,
      background: active ? `${color}0F` : '#fff',
      borderRadius: 18,
      padding: 16,
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      textAlign: 'left',
      cursor: 'pointer',
      minHeight: 82,
      transition: 'all .2s ease'
    }}
  >
    <div
      style={{
        width: 42,
        height: 42,
        borderRadius: 14,
        display: 'grid',
        placeItems: 'center',
        background: active ? color : '#F8FAFC',
        color: active ? '#fff' : color,
        flex: '0 0 auto'
      }}
    >
      <Icon size={20} />
    </div>
    <div>
      <p style={{ fontSize: 14, fontWeight: 900, color: '#111827', marginBottom: 3 }}>{title}</p>
      <p style={{ fontSize: 12, lineHeight: 1.45, color: '#64748B', fontWeight: 600 }}>{sub}</p>
    </div>
  </button>
);

ModeButton.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export const ViewTabs = ({ view, setView }) => {
  const tabs = [
    ['login', 'Sign in'],
    ['register', 'Creator signup'],
    ['brand-register', 'Brand register']
  ];

  return (
    <div style={{ display: 'flex', gap: 6, padding: 5, borderRadius: 16, background: '#F8FAFC', border: '1px solid #EEF2F7', marginBottom: 26 }}>
      {tabs.map(([id, label]) => {
        const active = view === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => setView(id)}
            style={{
              flex: 1,
              border: 'none',
              background: active ? '#fff' : 'transparent',
              color: active ? '#111827' : '#64748B',
              boxShadow: active ? '0 8px 20px rgba(15,23,42,0.08)' : 'none',
              borderRadius: 12,
              minHeight: 42,
              fontSize: 12,
              fontWeight: 900,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

ViewTabs.propTypes = {
  view: PropTypes.string.isRequired,
  setView: PropTypes.func.isRequired
};
