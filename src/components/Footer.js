import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/footer.css";
import { getFunctions, httpsCallable } from "firebase/functions";
import app from "../firebaseConfig"; 

const functions = getFunctions(app);

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (email) {
      try {
        // Call the Cloud Function to send an email
        const sendEmail = httpsCallable(functions, "sendThankYouEmail");
        await sendEmail({ email });
        alert("Thank you for subscribing to our newsletter!");
        setEmail(""); // Clear the input field
      } catch (error) {
        console.error("Error subscribing:", error);
        alert("Failed to subscribe. Please try again later.");
      }
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <footer>
      <div className="footer-links">
        <Link to="/faq">FAQs</Link>
        <Link to="/privacy">Privacy Policy</Link>
      </div>
      <div className="newsletter">
        <h3>Subscribe to our Newsletter</h3>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>
      <p>EcoGifts &copy; 2025 - Sustainable Gifting</p>
    </footer>
  );
};

export default Footer;
