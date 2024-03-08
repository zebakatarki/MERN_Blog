import React from 'react';
import {useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'; //Navigate is a component and useNavigate is a hook

export default function PrivateRoute() {
    const {currentUser}= useSelector((state)=>state.user)
    //The Outlet component is used as a placeholder within parent route components to render nested child routes.
  return currentUser? <Outlet/> : <Navigate to='/signin' />;
}
