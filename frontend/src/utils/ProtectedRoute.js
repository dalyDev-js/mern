import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("Token");
  const user = JSON.parse(localStorage.getItem("User"));

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  if (role && user && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
