import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRouter() {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/signin" />;

}

export default PrivateRouter
