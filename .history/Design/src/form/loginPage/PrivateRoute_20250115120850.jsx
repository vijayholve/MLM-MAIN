import React, { useState } from "react";
import jwt_decode from "jwt-decode";  // Make sure to import this

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");
    const jwt_decode = require("jwt-decode");

    if (token) {
      try {
        const decoded = jwt_decode(token);  // Decode the JWT token
        const isExpired = decoded.exp * 1000 < Date.now();  // Check if the token is expired
        return !isExpired;
      } catch (error) {
        console.error("Error decoding token:", error);
        return false;  // Token is invalid or expired
      }
    }
    return false;  // No token present
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

export default PrivateRoute;
