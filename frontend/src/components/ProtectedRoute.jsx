// src/components/common/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Case 1: Not logged in → go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Case 2: Logged in but role not allowed → go to NotFound page
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/notfound" replace />;
  }

  // Case 3: Access allowed
  return children;
};

export default ProtectedRoute;
