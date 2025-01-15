import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoutePage = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("authToken");
    
  if (token) {
    try {
      const decoded = jwtDecode(token);
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
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoutePage;
