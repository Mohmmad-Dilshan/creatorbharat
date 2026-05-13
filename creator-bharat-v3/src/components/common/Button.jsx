import React from 'react';
import PropTypes from 'prop-types';

export function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  sm, 
  lg, 
  full, 
  disabled, 
  loading, 
  style: sx = {}, 
  href, 
  className, 
  // Omit custom props from spread to prevent prop-bleeding to DOM
  ...props 
}) {
  const Tag = href ? 'a' : 'button';
  
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    fontWeight: 800,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    borderRadius: 14,
    opacity: disabled || loading ? 0.6 : 1,
    width: full ? '100%' : 'auto',
    fontFamily: "'Outfit', sans-serif",
    textDecoration: 'none',
    boxSizing: 'border-box'
  };

  const variantStyles = {
    primary: { background: '#FF9431', color: '#fff', border: 'none' },
    secondary: { background: '#f8fafc', color: '#0f172a', border: '1.5px solid #f1f5f9' },
    outline: { background: 'transparent', color: '#FF9431', border: '1.5px solid #FF9431' },
    danger: { background: '#ef4444', color: '#fff', border: 'none' },
    success: { background: '#10b981', color: '#fff', border: 'none' }
  };

  const sizeStyles = {
    sm: { padding: '8px 16px', fontSize: 13 },
    md: { padding: '14px 28px', fontSize: 15 },
    lg: { padding: '20px 40px', fontSize: 17 }
  };

  let size = 'md';
  if (sm) size = 'sm';
  else if (lg) size = 'lg';

  return (
    <Tag
      onClick={!disabled && !loading ? onClick : undefined}
      href={href}
      className={`btn-primitive ${className || ''}`}
      style={{ 
        ...baseStyles, 
        ...variantStyles[variant] || variantStyles.primary, 
        ...sizeStyles[size],
        ...sx 
      }}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <div className="btn-spinner" style={{ width: 16, height: 16, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <span>Please wait...</span>
        </>
      ) : children}
    </Tag>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  sm: PropTypes.bool,
  lg: PropTypes.bool,
  full: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  style: PropTypes.object,
  href: PropTypes.string,
  className: PropTypes.string
};

export default Button;
