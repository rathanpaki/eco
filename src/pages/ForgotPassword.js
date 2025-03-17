import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/login.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    if (!email) {
      toast.error("Please enter your email address first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (error) {
      toast.error("Error sending password reset email.");
    }
  };

  return (
    <div className="login-page-container">
      <form className="login-page-form" onSubmit={handlePasswordReset}>
        <h2>Reset Password</h2>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Email</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
