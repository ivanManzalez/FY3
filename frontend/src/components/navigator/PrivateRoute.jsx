import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {useAuth} from '../../fireBase/AuthContext';

const PrivateRoute = () => {
  // {component: Component, ...rest}
  const { currentUser } = useAuth();
  const location = useLocation();

  return currentUser ? <Outlet /> : <Navigate to="/login" state={{ from: location.pathname }}/>;
};
export default PrivateRoute;

