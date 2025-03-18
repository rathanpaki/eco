import React from "react";
import { Link } from "react-router-dom";
import "../css/footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-links">
        <Link to="/faq">FAQs</Link>
        <Link to="/privacy">Privacy Policy</Link>
      </div>
      <div className="newsletter">
        <h3>Subscribe to our Newsletter</h3>
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </div>
      <p>EcoGifts &copy; 2025 - Sustainable Gifting</p>
    </footer>
  );
};

export default Footer;
