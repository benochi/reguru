import React, { useContext } from "react";
import "./Navigation.css";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, NavItem, NavbarBrand } from "reactstrap";
import UserContext from "../UserContext";


function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);
  
  function loggedInNav() {
    return (
      <nav className="Nav border border-white">
        <NavLink to="/dashboard">Dashboard</NavLink>                              
        <Link to="/" onClick={logout}>
          Log out {currentUser.username}
        </Link>
      </nav>
    );
  }
  
  function loggedOutNav() {
    return (  
      <nav className="Nav border border-white">
      <Navbar expand="md" sticky="top">
        <Nav className="mx-auto" navbar>
          <NavItem>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login" className="mr-5">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </NavItem>  
        </Nav>
      </Navbar>
      </nav> 
    );
  }

  return (
    <nav className="Nav">
      <NavbarBrand className="NavBrand" href="/">Real Estate GURU</NavbarBrand>
        {currentUser ? loggedInNav() : loggedOutNav()}
      </nav>
  );
  
}

export default Navigation;
