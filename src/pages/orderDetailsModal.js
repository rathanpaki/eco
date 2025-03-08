import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/orderDetails.css";
import { getDatabase, ref, update } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const OrderDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { order } = location.state || {};

  const [cancelReason, setCancelReason] = useState("");
  const [showCancelReason, setShowCancelReason] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleReorder = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...cart, ...order.details.items];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Items added to cart for reorder!");
    navigate("/cart");
  };

  const handleCancelOrder = async () => {
    if (!cancelReason.trim()) {
      toast.error("Please provide a valid reason for cancellation.");
      return;
    }
    try {
      const db = getDatabase();
      const orderRef = ref(db, `orders/${userId}/${order.id}`);
      await update(orderRef, {
        Status: "Cancelled",
        cancelReason: cancelReason.trim(),
      });
      toast.success("Order cancelled successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error("Failed to cancel the order. Please try again.");
      console.error("Error cancelling order: ", error);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  if (!order) {
    return (
      <div className="page-container">
        <h3>No Order Selected</h3>
        <button className="btn-secondary-profile" onClick={goBack}>
          <FaTimes /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-content">
        <div>
          <strong>Order ID:</strong> {order?.id || "N/A"}
        </div>
        <div>
          <strong>Status:</strong> {order?.Status || "N/A"}
        </div>
        <div>
          <strong>Customer:</strong>{" "}
          {order?.details?.customer?.fullName || "N/A"}
        </div>
        <div>
          <strong>Email:</strong> {order?.details?.customer?.email || "N/A"}
        </div>
        <div>
          <strong>Address:</strong> {order?.details?.customer?.address || "N/A"}
          , {order?.details?.customer?.city || "N/A"},{" "}
          {order?.details?.customer?.postalCode || "N/A"}
        </div>
        <div>
          <strong>Delivery Cost:</strong>{" "}
          {order?.details?.deliveryCost !== undefined
            ? `LKR ${order.details.deliveryCost.toFixed(2)}`
            : "N/A"}
        </div>
        <div>
          <strong>Subtotal:</strong>{" "}
          {order?.details?.subtotal !== undefined
            ? `LKR ${order.details.subtotal.toFixed(2)}`
            : "N/A"}
        </div>
        <div>
          <strong>Total:</strong>{" "}
          {order?.total !== undefined ? `LKR ${order.total.toFixed(2)}` : "N/A"}
        </div>

        <h4>Items:</h4>
        <ul className="order-items-list">
          {order?.details?.items?.length ? (
            order.details.items.map((item, index) => (
              <li key={index} className="order-item">
                {item?.image && (
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="item-image"
                    />
                  </div>
                )}
                <div className="item-details">
                  <strong>{item?.name || "N/A"}</strong> -{" "}
                  {item?.price !== undefined
                    ? `LKR ${item.price.toFixed(2)}`
                    : "N/A"}{" "}
                  x {item?.quantity || "N/A"}
                  <div>{item?.description || "N/A"}</div>
                </div>
              </li>
            ))
          ) : (
            <li>No items available</li>
          )}
        </ul>

        <div className="page-actions">
          <button className="btn-primary-profile" onClick={handleReorder}>
            <FaSave /> Reorder
          </button>
          <button
            className="btn-danger-profile"
            onClick={() => setShowCancelReason(true)}
          >
            Cancel Order
          </button>
          <button className="btn-secondary-profile" onClick={goBack}>
            <FaTimes /> Go Back
          </button>
        </div>

        {/* Inline Cancel Reason Form */}
        {showCancelReason && (
          <div className="cancel-reason-section">
            <h4>Reason for Cancellation</h4>
            <textarea
              placeholder="Enter your reason for cancellation..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              rows={5}
            />
            <div className="cancel-reason-actions">
              <button
                className="btn-primary-profile"
                onClick={handleCancelOrder}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsPage;
