import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../forms/LoginForm"
import SignupForm from "../forms/SignupForm"
import Dashboard from "../pages/Dashboard"
import Home from "../home/Home"
import PrivateRoute from "./PrivateRoute";

function NavRoutes({ login, register }) {

  return (
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/login" element={<LoginForm login={login}/>} />
        <Route exact path="/register" element={<SignupForm register={register} />}/>
        <Route exact path="/dashboard/*" element={<PrivateRoute /> } />
          <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Home />} />
      </Routes>
  )
}

export default NavRoutes;