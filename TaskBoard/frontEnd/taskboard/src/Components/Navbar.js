import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
        <Link to="/" className="navbar-title">
        Task Board
      </Link>
      <div className="navbar-buttons">
       <Link to="/LoginForm" className="login-link">
        <button className="login-button">Login</button>
        </Link> 
        <Link to="/RegisterForm" className="register-link">
        <button className="register-button">Register</button>
        </Link> 
      </div>
    </nav>
  );
};

export default Navbar;
