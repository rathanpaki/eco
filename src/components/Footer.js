import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/footer.css";
import { getFunctions, httpsCallable } from "firebase/functions";
import app from "../firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const functions = getFunctions(app);

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (email) {
      try {
        // Call the Cloud Function to send an email
        const sendEmail = httpsCallable(functions, "sendThankYouEmail");
        await sendEmail({ email });
        toast.success("Thank you for subscribing to our newsletter!");
        setEmail(""); // Clear the input field
      } catch (error) {
        console.error("Error subscribing:", error);
        toast.error("Failed to subscribe. Please try again later.");
      }
    } else {
      toast.warn("Please enter a valid email address.");
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
      <ToastContainer />
    </footer>
  );
};

export default Footer;
