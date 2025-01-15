import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoutePage = ({ component: Component, ...rest }) => {
    const isAuthenticated = sessionStorage.getItem("authToken") !== null;
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
