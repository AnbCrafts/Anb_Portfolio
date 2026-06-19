import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.adminAuth.isAuthenticated);

  // If not authenticated, redirect to the login page immediately
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // If authenticated, render the child routes dynamically
  return <Outlet />;
};

export default ProtectedRoute;