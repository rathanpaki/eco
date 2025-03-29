import React from "react";
import { Link } from "react-router-dom";
import "../css/footer.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-links">
        <Link to="/faq">FAQs</Link>
        <Link to="/privacy">Privacy Policy</Link>
      </div>
      <p>EcoGifts &copy; 2025 - Sustainable Gifting</p>
      <ToastContainer />
    </footer>
  );
};

export default Footer;
