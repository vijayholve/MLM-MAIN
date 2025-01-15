import React from "react";
import { Route, Navigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';

const PrivateRoutePage = ({ component: Component, ...rest }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        return !isExpired;
      } catch (error) {
        return false; // Invalid or expired token
      }
    }
    return false; // No token found
  };

  return isAuthenticated() ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoutePage;
