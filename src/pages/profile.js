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
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [showCancelReason, setShowCancelReason] = useState(false);

  const handleOrderClick = (order) => {
    console.log("Order clicked:", order); // Debug log
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setCancelReason(""); // Reset cancel reason
  };
  console.log(orders);
  console.log(selectedOrder);
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

  const handleReorder = (order) => {
    // Logic to reorder (e.g., add items to cart)
    toast.success("Items added to cart for reorder!");
    closeModal();
  };

  const handleCancelOrder = (orderId, reason) => {
    if (!reason) {
      toast.error("Please provide a reason for cancellation.");
      return;
    }

    // Logic to cancel the order (e.g., update order status in Firebase)
    const orderRef = databaseRef(db, `orders/${user.uid}/${orderId}`);
    update(orderRef, { Status: "Cancelled", cancelReason: reason })
      .then(() => {
        toast.success("Order cancelled successfully!");
        closeModal();
      })
      .catch((error) => {
        toast.error("Error cancelling order.");
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
              <div className="profile-info">
                <label className="profile-label">Wishlist:</label>
                <ul className="wishlist-list">
                  {profile.wishlist.map((item, index) => (
                    <li key={index} className="wishlist-item">
                      <FaHeart /> {item}
                    </li>
                  ))}
                </ul>
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
                    onClick={() => handleOrderClick(order)} // Open modal on click
                  >
                    <div>
                      <strong>Order #{order.id}</strong>
                    </div>
                    <div>
                      <strong>Status:</strong> {order.Status}
                    </div>
                    <div>
                      <strong>Total:</strong> ${order.total.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              {isModalOpen && selectedOrder && (
                <div className="modal-overlay">
                  <div className="modal">
                    <h3>Order Details</h3>
                    <div className="modal-content">
                      {selectedOrder.details ? ( // Ensure selectedOrder details are loaded
                        <>
                          <div>
                            <strong>Order ID:</strong> {selectedOrder.id}
                          </div>
                          <div>
                            <strong>Status:</strong> {selectedOrder.Status}
                          </div>
                          <div>
                            <strong>Customer:</strong>{" "}
                            {selectedOrder.details.customer.fullName}
                          </div>
                          <div>
                            <strong>Email:</strong>{" "}
                            {selectedOrder.details.customer.email}
                          </div>
                          <div>
                            <strong>Address:</strong>{" "}
                            {selectedOrder.details.customer.address},{" "}
                            {selectedOrder.details.customer.city},{" "}
                            {selectedOrder.details.customer.postalCode}
                          </div>
                          <div>
                            <strong>Delivery Cost:</strong> $
                            {selectedOrder.details.deliveryCost.toFixed(2)}
                          </div>
                          <div>
                            <strong>Subtotal:</strong> $
                            {selectedOrder.details.subtotal.toFixed(2)}
                          </div>
                          <div>
                            <strong>Total:</strong> $
                            {selectedOrder.total.toFixed(2)}
                          </div>

                          <h4>Items:</h4>
                          <ul className="order-items-list">
                            {selectedOrder.details.items.map((item, index) => (
                              <li key={index} className="order-item">
                                <div>
                                  <strong>{item.name}</strong> - $
                                  {item.price.toFixed(2)} x {item.quantity}
                                </div>
                                <div>{item.description}</div>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <p>Loading order details...</p>
                      )}
                      <div className="modal-actions">
                        <button
                          className="btn-primary-profile"
                          onClick={() => handleReorder(selectedOrder)}
                        >
                          Reorder
                        </button>
                        <button
                          className="btn-danger-profile"
                          onClick={() => setShowCancelReason(true)}
                        >
                          Cancel Order
                        </button>
                        <button
                          className="btn-secondary-profile"
                          onClick={closeModal}
                        >
                          Close
                        </button>
                      </div>

                      {showCancelReason && (
                        <div className="cancel-reason">
                          <textarea
                            placeholder="Reason for cancellation"
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                          />
                          <button
                            className="btn-primary-profile"
                            onClick={() =>
                              handleCancelOrder(selectedOrder.id, cancelReason)
                            }
                          >
                            Submit
                          </button>
                          <button
                            className="btn-secondary-profile"
                            onClick={() => setShowCancelReason(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
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
