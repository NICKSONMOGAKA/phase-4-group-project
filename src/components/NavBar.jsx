import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div>
      <div className="logo">
        <img src="https://i.ibb.co/XSVCNTP/logo.jpg" alt="logo" />
      </div>
      <br />
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/products" className="nav-link">Products</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
        {isAuthenticated ? (
          <button onClick={logout} className="nav-link">Logout</button>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
