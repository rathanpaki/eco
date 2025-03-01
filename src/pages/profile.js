import React, { useState, useEffect } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { ref, get, update } from "firebase/database";
import { db, storage } from "../firebaseConfig"; // Import storage
import { useNavigate } from "react-router-dom";
import { uploadBytes, getDownloadURL } from "firebase/storage"; // Import uploadBytes and getDownloadURL
import "../css/profile.css";
import Navbar from "../components/Navbar";
import Loading from "../components/Loader";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    profilePic: "",
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setProfile((prev) => ({ ...prev, email: currentUser.email }));
        fetchUserData(currentUser.uid);
        fetchOrders(currentUser.uid);
        fetchLoyaltyPoints(currentUser.uid);
        fetchWishlist(currentUser.uid);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserData = (uid) => {
    const userRef = ref(db, `users/${uid}`);
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProfile((prev) => ({ ...prev, ...snapshot.val() }));
        }
      })
      .finally(() => setLoading(false));
  };

  const fetchOrders = (uid) => {
    const ordersRef = ref(db, `orders/${uid}`);
    get(ordersRef).then((snapshot) => {
      if (snapshot.exists()) {
        const ordersData = snapshot.val();
        setOrders(Array.isArray(ordersData) ? ordersData : Object.values(ordersData));
      } else {
        setOrders([]);
      }
    });
  };

  const fetchLoyaltyPoints = (uid) => {
    const pointsRef = ref(db, `loyaltyPoints/${uid}`);
    get(pointsRef).then((snapshot) => {
      if (snapshot.exists()) {
        setLoyaltyPoints(snapshot.val());
      }
    });
  };

  const fetchWishlist = (uid) => {
    const wishlistRef = ref(db, `wishlist/${uid}`);
    get(wishlistRef).then((snapshot) => {
      if (snapshot.exists()) {
        setWishlist(snapshot.val());
      }
    });
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && user) {
      const storageRef = ref(storage, `profilePics/${user.uid}`);
      uploadBytes(storageRef, file).then(() => {
        getDownloadURL(storageRef).then((url) => {
          setProfile((prev) => ({ ...prev, profilePic: url }));
        });
      });
    }
  };

  const handleSave = () => {
    if (user) {
      const userRef = ref(db, `users/${user.uid}`);
      update(userRef, {
        name: profile.name,
        phoneNumber: profile.phoneNumber,
        profilePic: profile.profilePic,
      }).then(() => setEditing(false));
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      navigate("/login");
    });
  };

  if (loading) return
  <div className="profile-loading"> <Loading /></div>;
  return (
    <>
      <Navbar />
      <div className="profile-container">
        {user ? (
          <>
            <h2 className="profile-title">Profile</h2>
            <div className="profile-card">
              <div className="profile-pic-wrapper">
                <img
                  src={profile.profilePic || "https://via.placeholder.com/100"}
                  alt="Profile"
                  className="profile-pic"
                />
                {editing && (
                  <input
                    type="file"
                    className="profile-file-input"
                    onChange={handleFileChange}
                  />
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
                    name="phone"
                    value={profile.phoneNumber}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="profile-text">{profile.phoneNumber || "N/A"}</p>
                )}
              </div>
              {editing ? (
                <button className="btn-primary-profile" onClick={handleSave}>
                  Save Changes
                </button>
              ) : (
                <button
                  className="btn-secondary-profile"
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </button>
              )}
              <button className="btn-danger-profile" onClick={handleLogout}>
                Logout
              </button>
            </div>
            <div className="profile-section">
              <h3 className="profile-section-title">Order History</h3>
              <ul className="profile-list">
                {orders.map((order, index) => (
                  <li key={index} className="profile-list-item">
                  <div>
                    <strong>Order #{order.id}</strong> - {order.date}
                  </div>
                  <div>
                    <strong>Tracking Number:</strong> {order.trackingNumber}
                  </div>
                  <div>
                    <strong>Status:</strong> {order.status}
                  </div>
                </li>
                ))}
              </ul>
            </div>
            <div className="profile-section">
              <h3 className="profile-section-title">Loyalty Points</h3>
              <p className="profile-text">You have {loyaltyPoints} points.</p>
            </div>
            <div className="profile-section">
              <h3 className="profile-section-title">Wishlist</h3>
              <ul className="profile-list">
                {wishlist.map((item, index) => (
                  <li key={index} className="profile-list-item">
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="profile-login-wrapper">
            <h3 className="profile-login-text">Please login or register</h3>
            <button
              className="btn-primary-profile"
              onClick={() => navigate("/login")}
            >
              Login / Register
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
