import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Check for admin credentials
      if (email === "admin@gmail.com" && password === "admin@123") {
        localStorage.setItem("user", JSON.stringify({ email: "admin" }));
        toast.success("Admin login successful!");
        navigate("/admin-dashboard");
      } else {
        // Regular user login
        await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem("user", JSON.stringify({ email }));
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="login-page-container">
      <form className="login-page-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
