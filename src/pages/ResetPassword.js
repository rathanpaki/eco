import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { confirmPasswordReset } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/login.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    const queryParams = new URLSearchParams(location.search);
    const oobCode = queryParams.get("oobCode");

    if (!oobCode) {
      toast.error("Invalid or expired action code.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      toast.success("Password has been reset successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Error resetting password.");
    }
  };

  return (
    <div className="login-page-container">
      <form className="login-page-form" onSubmit={handlePasswordReset}>
        <h2>Reset Password</h2>
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
