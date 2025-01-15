import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import * as jwt_decode from "jwt-decode";  // Use this if default import doesn't work

const PrivateRoutePage = ({ component: Component, ...rest }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");
    console.log()
    if (token) {
      try {
        
        const decoded = jwt_decode(token); // Accessing the decode function directly
        const isExpired = decoded.exp * 1000 < Date.now();
        return !isExpired;
      } catch (error) {
        console.log("is_authenticated : ",error)
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
