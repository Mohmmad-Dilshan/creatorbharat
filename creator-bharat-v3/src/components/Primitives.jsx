import React from 'react';
import PropTypes from 'prop-types';
// Backward compatibility exports with legacy names
export { 
  Button as Btn, 
  Input as Fld, 
  Modal, 
  Badge as Bdg, 
  Logo, 
  SectionHeader as SH, 
  Card, 
  Ring, 
  ProgressBar as Bar, 
  Skeleton, 
  SkeletonCard, 
  EmptyState as Empty, 
  StatusChip as Chip 
} from './ui';

// Page Layout (PL) remains here for now as it's more of a layout primitive than an atomic UI component
export function PL({ children, noFooter }) {
  return <div className="page-layout">{children}</div>;
}

PL.propTypes = {
  children: PropTypes.node.isRequired,
  noFooter: PropTypes.bool
};

// Stars component remains here for now as it's a specific utility
export function Stars({ rating, sm }) {
  const sz = sm ? 12 : 16;
  const roundedRating = Math.round(rating);
  
  return (
    <span style={{ display: 'inline-flex', gap: 2, alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width={sz} height={sz} viewBox="0 0 20 20" fill={i <= roundedRating ? '#F59E0B' : '#E5E7EB'}>
          <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.44.91-5.32L2.27 6.62l5.34-.78z" />
        </svg>
      ))}
      {rating > 0 && (
        <span style={{ fontSize: sm ? 11 : 13, color: '#64748B', marginLeft: 3, fontWeight: 600 }}>{Number(rating).toFixed(1)}</span>
      )}
    </span>
  );
}

Stars.propTypes = {
  rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sm: PropTypes.bool
};
