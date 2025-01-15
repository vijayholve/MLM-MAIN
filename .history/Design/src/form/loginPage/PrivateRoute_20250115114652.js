import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode'; // Make sure jwt-decode is imported

const PrivateRoutePage = ({ component: Component, ...rest }) => {
    const isAuthenticated = () => {
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
                isAuthenticated() ? ( // Add parentheses to invoke the function
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoutePage;
