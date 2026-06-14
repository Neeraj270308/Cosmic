import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

/**
 * ProtectedRoute shields pages requiring authentication.
 * Redirects unauthenticated requests to the Login page while keeping track of where they came from.
 */
export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner message="Securing connection..." fullPage={true} />;
  }

  if (!user) {
    // Redirect to login, but keep the current location in state so we can return after login
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
