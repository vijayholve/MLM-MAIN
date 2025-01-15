import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoutePage = ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem("authToken") !== null;

  
};

export default PrivateRoutePage;
