import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode'; // Correct import for jwt-decode

const PrivateRoutePage = ({ component: Component, ...rest }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");
    
    if (token) {
      try {
        const decoded = jwt_decode(token); // Decode the JWT token
        const isExpired = decoded.exp * 1000 < Date.now(); // Check expiration
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
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoutePage;
