import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Show a loading screen while the auth status is being determined
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if the user is not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Allow access if the user is authenticated
  return children;
};

export default PrivateRoute;
