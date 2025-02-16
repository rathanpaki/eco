import React from "react";
import"../css/footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-links">
        <a href="faq.html">FAQs</a>
        <a href="privacy.html">Privacy Policy</a>
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
