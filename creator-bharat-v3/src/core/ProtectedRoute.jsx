import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../context';

/**
 * ProtectedRoute: Ensures only authenticated users can access specific routes.
 * Redirects to /login if no user is found in context.
 * 
 * @param {React.ReactNode} children - The component to render if authenticated
 * @param {string} allowedRole - Optional. Only allow 'creator' or 'brand'
 */
const ProtectedRoute = ({ children, allowedRole }) => {
  const { st } = useApp();
  const location = useLocation();

  // If no user is logged in, redirect to login page
  if (!st.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If a specific role is required and user role doesn't match
  if (allowedRole && st.role !== allowedRole) {
    // Redirect creators to their dashboard and brands to theirs
    const fallbackPath = st.role === 'brand' ? '/brand-dashboard' : '/dashboard';
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRole: PropTypes.string
};

export default ProtectedRoute;
