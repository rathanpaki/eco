import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/navbar.css";
import logo from "../img/logo.jpg";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <NavLink className="logo" to="/">
          <img src={logo} alt="Logo" />
        </NavLink>
        <div
          className={`menu-toggle ${isMobileMenuOpen ? "active" : ""}`}
          id="mobile-menu"
          onClick={toggleMobileMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul
          className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}
          id="nav-links"
        >
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/customize"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Customization
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
