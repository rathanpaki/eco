import React from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link className="logo" to="/">
          <img src="assets/img/logo.jpg" alt="Logo" />
        </Link>
        <div className="menu-toggle" id="mobile-menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className="nav-links" id="nav-links">
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/personalization">Personalization</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/cart">Cart 🛒</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
