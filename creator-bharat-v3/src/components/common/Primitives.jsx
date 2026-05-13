import React from 'react';
import PropTypes from 'prop-types';

/**
 * Backward compatibility exports with legacy names.
 * This allows the old code to keep using 'Btn', 'Fld', etc.
 * while pointing to the new, modularized components.
 */
export { 
  Modal, 
  Logo, 
  SectionHeader as SH, 
  Ring, 
  ProgressBar as Bar, 
  Skeleton, 
  SkeletonCard, 
  EmptyState as Empty, 
  StatusChip as Chip 
} from './index';

import { Button, Input, Badge } from './index';

// Page Layout (PL) remains here for now as it's more of a layout primitive
export function Btn({ children, style: sx = {}, className, sm, lg, full, outline, active, loading, disabled, ...props }) {
  let variant = 'secondary';
  if (outline) variant = 'outline';
  else if (active) variant = 'primary';
  
  return (
    <Button 
      variant={variant}
      sm={sm}
      lg={lg}
      full={full}
      loading={loading}
      disabled={disabled}
      style={sx}
      className={className}
      {...props}
    >
      {children}
    </Button>
  );
}

Btn.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
  sm: PropTypes.bool,
  lg: PropTypes.bool,
  full: PropTypes.bool,
  outline: PropTypes.bool,
  active: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool
};

export function Fld({ label, sm, full, error, icon, ...props }) {
  return (
    <Input 
      label={label}
      sm={sm}
      full={full}
      error={error}
      icon={icon}
      {...props}
    />
  );
}

Fld.propTypes = {
  label: PropTypes.string,
  sm: PropTypes.bool,
  full: PropTypes.bool,
  error: PropTypes.string,
  icon: PropTypes.elementType
};

export function Bdg({ children, style: sx = {}, className, color = 'blue', sm, lg, dot, ...props }) {
  return (
    <Badge 
      color={color} 
      sm={sm} 
      lg={lg} 
      dot={dot}
      style={sx}
      className={className}
      {...props}
    >
      {children}
    </Badge>
  );
}

Bdg.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
  color: PropTypes.string,
  sm: PropTypes.bool,
  lg: PropTypes.bool,
  dot: PropTypes.bool
};

export function Card({ children, style: sx = {}, className, ...props }) {
  return (
    <div 
      className={className} 
      style={{ background: '#fff', borderRadius: 24, padding: 32, border: '1px solid rgba(0,0,0,0.06)', ...sx }}
      {...props}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string
};

export function PL({ children }) {
  return (
    <div className="page-layout">
      {children}
    </div>
  );
}

PL.propTypes = {
  children: PropTypes.node.isRequired
};

// Stars component remains here for now as it's a specific utility
export function Stars({ rating, sm }) {
  const sz = sm ? 12 : 16;
  const roundedRating = Math.round(rating);
  
  return (
    <span style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg 
          key={i} 
          width={sz} 
          height={sz} 
          viewBox="0 0 20 20" 
          fill={i <= roundedRating ? '#F59E0B' : '#E5E7EB'}
        >
          <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.44.91-5.32L2.27 6.62l5.34-.78z" />
        </svg>
      ))}
      {rating > 0 && (
        <span style={{ fontSize: sm ? '11px' : '13px', color: '#64748B', marginLeft: '3px', fontWeight: 600 }}>
          {Number(rating).toFixed(1)}
        </span>
      )}
    </span>
  );
}

Stars.propTypes = {
  rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sm: PropTypes.bool
};
