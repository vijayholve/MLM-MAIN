import React from "react";
import { Route, Navigate } from "react-router-dom";
import { decode } from "jwt-decode"; // Use named import

const PrivateRoutePage = ({ component: Component, ...rest }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decoded = decode(token); // Use decode instead of jwt_decode
        const isExpired = decoded.exp * 1000 < Date.now();
        return !isExpired;
      } catch (error) {
        return false; // Invalid token or expired token
      }
    }
    return false; // No token present
  };

  return (
    <Route
      {...rest}
      element={
        isAuthenticated() ? (
          <Component {...rest} />
        ) : (
          <Navigate to="/login" /> // Use Navigate for redirection
        )
      }
    />
  );
};

export default PrivateRoutePage;
