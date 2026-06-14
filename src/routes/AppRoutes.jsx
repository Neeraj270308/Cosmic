import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RouteGuard } from './RouteGuard';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

// Lazy loading all pages for optimal code splitting
const Home = lazy(() => import('../pages/Home/Home'));
const Blog = lazy(() => import('../pages/Blog/Blog'));
const BlogDetails = lazy(() => import('../pages/Blog/BlogDetails'));
const BlogLayout = lazy(() => import('../pages/Blog/BlogLayout'));
const Gallery = lazy(() => import('../pages/Gallery/Gallery'));
const SelectService = lazy(() => import('../pages/SelectService/SelectService'));
const SelectBike = lazy(() => import('../pages/SelectBike/SelectBike'));
const CustomerDetails = lazy(() => import('../pages/CustomerDetails/CustomerDetails'));
const SelectDate = lazy(() => import('../pages/SelectDate/SelectDate'));
const SelectTime = lazy(() => import('../pages/SelectTime/SelectTime'));
const Summary = lazy(() => import('../pages/Summary/Summary'));
const Status = lazy(() => import('../pages/Status/Status'));
const Appointments = lazy(() => import('../pages/Appointments/Appointments'));
const Auth = lazy(() => import('../pages/Auth/Auth'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading track..." fullPage={true} />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        
        {/* Nested Blog Routes */}
        <Route path="/blog" element={<BlogLayout />}>
          <Route index element={<Blog />} />
          <Route path=":id" element={<BlogDetails />} />
        </Route>

        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Auth />} />
        <Route 
          path="/appointments" 
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          } 
        />
        
        {/* Booking Wizard Steps with Route Guards */}
        <Route 
          path="/select-service" 
          element={<SelectService />} 
        />
        
        <Route 
          path="/select-bike" 
          element={
            <RouteGuard requiredStep="bike">
              <SelectBike />
            </RouteGuard>
          } 
        />
        
        <Route 
          path="/customer-details" 
          element={
            <RouteGuard requiredStep="customer">
              <CustomerDetails />
            </RouteGuard>
          } 
        />
        
        <Route 
          path="/select-date" 
          element={
            <RouteGuard requiredStep="date">
              <SelectDate />
            </RouteGuard>
          } 
        />
        
        <Route 
          path="/select-time" 
          element={
            <RouteGuard requiredStep="time">
              <SelectTime />
            </RouteGuard>
          } 
        />
        
        <Route 
          path="/summary" 
          element={
            <RouteGuard requiredStep="summary">
              <Summary />
            </RouteGuard>
          } 
        />
        
        <Route 
          path="/status" 
          element={
            <RouteGuard requiredStep="status">
              <Status />
            </RouteGuard>
          } 
        />

        {/* Fallback 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
export default AppRoutes;
