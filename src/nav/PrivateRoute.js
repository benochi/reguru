import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import UserContext from "../UserContext";
import Dashboard from "../pages/Dashboard";

//In routing component, instead of <Route ...> for logged in user. 
//This component will check logged in status
function PrivateRoute() {
  const { currentUser } = useContext(UserContext);

  return (
    currentUser ? <Outlet /> : <Navigate to="/login"/>
  );
}

export default PrivateRoute;
