import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export default function TimelineStep({ year, title, desc, stats, isActive, onSelect }) {
  return (
    <motion.div
      onClick={onSelect}
      style={{ 
        position: 'relative', 
        paddingLeft: '48px', 
        marginBottom: '32px', 
        cursor: 'pointer',
        zIndex: 2
      }}
    >
      {/* Circle Indicator */}
      <div style={{ 
        position: 'absolute', 
        left: '3px', 
        top: '6px', 
        width: '12px', 
        height: '12px', 
        borderRadius: '50%', 
        background: isActive ? '#FF9431' : '#fff', 
        border: isActive ? '3.5px solid #fff' : '2px solid #cbd5e1', 
        boxShadow: isActive ? '0 0 0 8px rgba(255, 148, 49, 0.2)' : 'none', 
        zIndex: 3,
        transition: 'all 0.3s ease'
      }} />
      
      {/* Content Card */}
      <div style={{
        background: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
        border: isActive ? '1.5px solid rgba(0,0,0,0.05)' : '1.5px solid transparent',
        borderRadius: '24px',
        padding: '24px',
        boxShadow: isActive ? '0 20px 40px rgba(0,0,0,0.03)' : 'none',
        transition: 'all 0.3s ease',
        transform: isActive ? 'scale(1.01)' : 'scale(1)'
      }}>
        <div style={{ fontSize: '11px', fontWeight: 900, color: isActive ? '#FF9431' : '#94a3b8', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.15em', transition: 'all 0.3s ease' }}>{year}</div>
        <h4 style={{ fontSize: isActive ? '24px' : '20px', fontWeight: 900, color: isActive ? '#0f172a' : '#64748b', marginBottom: '12px', transition: 'all 0.3s ease' }}>{title}</h4>
        
        {/* Collapsible Details */}
        <div style={{ 
          maxHeight: isActive ? '500px' : '0px', 
          opacity: isActive ? 1 : 0, 
          overflow: 'hidden', 
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' 
        }}>
          <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.7, margin: '0 0 20px 0', maxWidth: '540px' }}>{desc}</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {stats.map(s => (
              <div key={s.label} style={{ background: '#f8fafc', padding: '12px 20px', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '18px', fontWeight: 950, color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>{s.value}</div>
                <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.2px', marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

TimelineStep.propTypes = {
  year: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  stats: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })).isRequired,
  isActive: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};
