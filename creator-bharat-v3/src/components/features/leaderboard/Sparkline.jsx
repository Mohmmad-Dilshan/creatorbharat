import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export default function Sparkline({ color, points, id }) {
  const gradId = useMemo(() => `sparkline-grad-${id || Math.floor(Math.random() * 1000000)}`, [id]);
  const pathD = `M 0 ${points[0]} L 15 ${points[1]} L 30 ${points[2]} L 45 ${points[3]} L 60 ${points[4]}`;
  const fillD = `${pathD} L 60 20 L 0 20 Z`;
  
  return (
    <svg width="60" height="20" viewBox="0 0 60 20" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.path
        d={fillD}
        fill={`url(#${gradId})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      {/* Glowing pulse dot at the end of the sparkline */}
      <motion.circle
        cx="60"
        cy={points[4]}
        r="3"
        fill={color}
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ 
          scale: [1, 1.8, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  );
}

Sparkline.propTypes = {
  color: PropTypes.string.isRequired,
  points: PropTypes.arrayOf(PropTypes.number).isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
