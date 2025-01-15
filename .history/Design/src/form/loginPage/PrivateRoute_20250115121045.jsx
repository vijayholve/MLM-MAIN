import React, { useState } from "react";
import { Route, Navigate } from "react-router-dom"; // Import Navigate instead of Redirect
import * as jwt_decode from "jwt-decode"; // Correct import for jwt-decode

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decoded = jwt_decode(token); // Decode the JWT token
        const isExpired = decoded.exp * 1000 < Date.now(); // Check if the token is expired
        return !isExpired;
      } catch (error) {
        console.error("Error decoding token:", error);
        return false; // Token is invalid or expired
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
          <Navigate to="/login" /> // Use Navigate instead of Redirect
        )
      }
    />
  );
};

export default PrivateRoute;
