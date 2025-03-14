import React, { useState, useEffect } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { ref as databaseRef, get, update } from "firebase/database";
import { db, storage } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import {
  uploadBytes,
  getDownloadURL,
  ref as storageRef,
} from "firebase/storage";
import "../css/profile.css";
import Navbar from "../components/Navbar";
import Loading from "../components/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUser,
  FaShoppingCart,
  FaGift,
  FaHeart,
  FaEdit,
  FaSave,
  FaSignOutAlt,
} from "react-icons/fa";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profilePic: "",
    loyaltyPoints: 0,
    wishlist: [],
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [orders, setOrders] = useState([]);

  const handleOrderClick = (order) => {
    console.log("Navigating to order details with:", order);
    navigate("/order-details", { state: { order } });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setProfile((prev) => ({ ...prev, email: currentUser.email }));
        fetchUserData(currentUser.uid);
        fetchOrders(currentUser.uid);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserData = (uid) => {
    const userRef = databaseRef(db, `users/${uid}`);
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setProfile((prev) => ({
            ...prev,
            name: userData.name || "",
            phoneNumber: userData.phoneNumber || "",
            profilePic: userData.profilePic || "",
            loyaltyPoints: userData.loyaltyPoints || 0,
            wishlist: userData.wishlist || [],
          }));
        }
      })
      .finally(() => setLoading(false));
  };

  const fetchOrders = (uid) => {
    const ordersRef = databaseRef(db, `orders/${uid}`);
    get(ordersRef).then((snapshot) => {
      if (snapshot.exists()) {
        const ordersData = snapshot.val();
        const ordersArray = Object.entries(ordersData).map(
          ([orderId, orderDetails]) => ({
            id: orderId,
            ...orderDetails,
          })
        );
        setOrders(ordersArray);
      } else {
        setOrders([]);
      }
    });
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && user) {
      const storageReference = storageRef(storage, `profilePics/${user.uid}`);
      uploadBytes(storageReference, file)
        .then(() => getDownloadURL(storageReference))
        .then((url) => {
          setProfile((prev) => ({ ...prev, profilePic: url }));
          toast.success("Profile picture uploaded successfully!");
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          toast.error("Error uploading profile picture.");
        });
    }
  };

  const handleSave = () => {
    if (user) {
      const userRef = databaseRef(db, `users/${user.uid}`);
      update(userRef, {
        name: profile.name,
        phoneNumber: profile.phoneNumber,
        profilePic: profile.profilePic,
      })
        .then(() => {
          setEditing(false);
          toast.success("Profile updated successfully!");
        })
        .catch((error) => {
          toast.error("Error updating profile.");
        });
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/login");
        toast.success("Logged out successfully!");
      })
      .catch((error) => {
        toast.error("Error logging out.");
      });
  };

  if (loading)
    return (
      <div className="profile-loading">
        <Loading />
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="profile-container">
        {user ? (
          <>
            <h2 className="profile-title">
              <FaUser /> Welcome, {profile.name}
            </h2>
            <div className="profile-card">
              <div className="profile-pic-wrapper">
                <img
                  src={profile.profilePic || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="profile-pic"
                />
                {editing && (
                  <label className="profile-file-input-label">
                    <input type="file" onChange={handleFileChange} />
                    Change Photo
                  </label>
                )}
              </div>
              <div className="profile-info">
                <label className="profile-label">Name:</label>
                {editing ? (
                  <input
                    type="text"
                    className="profile-input"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="profile-text">{profile.name || "N/A"}</p>
                )}
              </div>
              <div className="profile-info">
                <label className="profile-label">Email:</label>
                <p className="profile-text">{profile.email}</p>
              </div>
              <div className="profile-info">
                <label className="profile-label">Phone:</label>
                {editing ? (
                  <input
                    type="text"
                    className="profile-input"
                    name="phoneNumber"
                    value={profile.phoneNumber}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="profile-text">{profile.phoneNumber || "N/A"}</p>
                )}
              </div>
              <div className="profile-info">
                <label className="profile-label">Loyalty Points:</label>
                <p className="profile-text">
                  <FaGift /> {profile.loyaltyPoints}
                </p>
              </div>
              <div className="profile-actions">
                {editing ? (
                  <button className="btn-primary-profile" onClick={handleSave}>
                    <FaSave /> Save Changes
                  </button>
                ) : (
                  <button
                    className="btn-secondary-profile"
                    onClick={() => setEditing(true)}
                  >
                    <FaEdit /> Edit Profile
                  </button>
                )}
                <button
                  className="btn-wishlist-profile"
                  onClick={() => navigate("/wishlist")}
                >
                  <FaHeart /> Wishlist
                </button>
                <button className="btn-danger-profile" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </div>

            <div className="profile-section">
              <h3 className="profile-section-title">
                <FaShoppingCart /> Order History
              </h3>
              <div className="orders-horizontal">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="order-card"
                    onClick={() => handleOrderClick(order)}
                  >
                    <div>
                      <strong>Order #{order.id}</strong>
                    </div>
                    <div>
                      <strong>Status:</strong> {order.Status}
                    </div>
                    <div>
                      <strong>Total:</strong> LKR {order.total.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="profile-login-wrapper">
            <h3 className="profile-login-text">Please login or register</h3>
            <div className="login-button-wrapper">
              <button
                className="btn-green-profile"
                onClick={() => navigate("/login")}
              >
                Login / Register
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
