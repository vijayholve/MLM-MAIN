import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/useAuth';
import { Heading } from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  
  if (loading) return <h1>loading</h1>;

  if (user) {
    return children
  }
  else {
    nav('/login')
  }

};

export default PrivateRoute;
