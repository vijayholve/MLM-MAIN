import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'; // Correct default import

const PrivateRoutePage = ({ component: Component, ...rest }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decoded = jwt_decode(token); // Correct usage of jwt_decode
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
      element={isAuthenticated() ? (
        <Component {...rest} />
      ) : (
        <Navigate to="/login" /> // Correct usage of Navigate in v6
      )}
    />
  );
};

export default PrivateRoutePage;
