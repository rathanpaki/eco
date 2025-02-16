/* Profile.js */
import React, { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="profile-container">
      {user ? (
        <div>
          <h2>Welcome, {user.email}</h2>
          <h3>Your Orders</h3>
          <ul>
            <li>Order 1</li>
            <li>Order 2</li>
            <li>Order 3</li>
          </ul>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>You are not logged in</h2>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
