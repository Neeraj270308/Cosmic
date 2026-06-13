import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

/**
 * RouteGuard secures paths in the multi-step form booking flow.
 * If prerequisite steps are not met, redirects the client to the furthest valid page.
 */
export const RouteGuard = ({ children, requiredStep }) => {
  const { isStepComplete, bookingStatus } = useBooking();
  const location = useLocation();

  if (requiredStep === 'bike' && !isStepComplete('service')) {
    return <Navigate to="/select-service" replace state={{ from: location }} />;
  }

  if (requiredStep === 'customer' && !isStepComplete('bike')) {
    return <Navigate to="/select-bike" replace state={{ from: location }} />;
  }

  if (requiredStep === 'date' && !isStepComplete('customer')) {
    return <Navigate to="/customer-details" replace state={{ from: location }} />;
  }

  if (requiredStep === 'time' && !isStepComplete('date')) {
    return <Navigate to="/select-date" replace state={{ from: location }} />;
  }

  if (requiredStep === 'summary' && !isStepComplete('time')) {
    return <Navigate to="/select-time" replace state={{ from: location }} />;
  }

  if (requiredStep === 'status') {
    if (bookingStatus === 'idle') {
      return <Navigate to="/select-service" replace state={{ from: location }} />;
    }
  }

  return children;
};
