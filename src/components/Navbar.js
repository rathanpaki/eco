import React from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";
import logo from "../img/logo.jpg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link className="logo" to="/">
          <img src={logo} alt="Logo" />
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
            <Link to="/customize">Personalization</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
