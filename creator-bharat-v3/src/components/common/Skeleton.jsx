import React from 'react';
import PropTypes from 'prop-types';
import { T } from '@/core/theme';

export function Skeleton(props) {
  const { width = '100%', height = 20, borderRadius = 12, style = {} } = props;
  return (
    <div style={{ 
      width, 
      height, 
      borderRadius, 
      background: 'linear-gradient(90deg, #f9f9f9 25%, #ececec 50%, #f9f9f9 75%)', 
      backgroundSize: '200% 100%', 
      animation: 'shimmer 1.5s infinite', 
      ...style 
    }} />
  );
}

Skeleton.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object
};

export function SkeletonCard() {
  const cardStyle = { 
    background: '#fff', 
    borderRadius: 20, 
    border: '1px solid ' + T.bd, 
    padding: 20, 
    display: 'flex', 
    flexDirection: 'column', 
    gap: 12 
  };
  
  return (
    <div style={cardStyle}>
      <div style={{ height: 100, background: T.bg3, borderRadius: 12 }} />
      <div style={{ height: 20, width: '70%', background: T.bg3, borderRadius: 4 }} />
      <div style={{ height: 14, width: '40%', background: T.bg3, borderRadius: 4 }} />
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ height: 30, flex: 1, background: T.bg3, borderRadius: 8 }} />
        <div style={{ height: 30, flex: 1, background: T.bg3, borderRadius: 8 }} />
      </div>
    </div>
  );
}

export default Skeleton;
