import React, { useState } from "react";
import { Route, Navigate } from "react-router-dom"; // Import Navigate instead of Redirect
import * as jwt_decode from "jwt-decode"; // Correct import for jwt-decode

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decoded = jwt_decode(token); 
        const isExpired = decoded.exp * 1000 < Date.now(); 
        return !isExpired;
      } catch (error) {
        console.error("Error decoding token:", error);
        return false;
      }
    }
    return false;
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
