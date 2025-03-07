import React, { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { ref, set, get, update } from "firebase/database";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../css/confirmation.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Confirmation = ({ orderDetails }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (user && orderDetails) {
      const orderRef = ref(db, `orders/${user.uid}/${orderDetails.id}`);
      set(orderRef, orderDetails);

      // Update product stock
      const updateProductStock = async () => {
        for (const item of orderDetails.details.items) {
          try {
            const productRef = ref(db, `products/${item.id}`);
            const productSnapshot = await get(productRef);
            if (productSnapshot.exists()) {
              const productData = productSnapshot.val();
              const updatedStock = productData.stock - item.quantity;
              await update(productRef, { stock: updatedStock });
            }
          } catch (error) {
            console.error("Error updating product stock:", error);
          }
        }
      };
      updateProductStock();

      // Update user loyalty points
      const updateUserLoyaltyPoints = async () => {
        try {
          const userRef = ref(db, `users/${user.uid}`);
          const userSnapshot = await get(userRef);
          if (userSnapshot.exists()) {
            const userData = userSnapshot.val();
            const newLoyaltyPoints =
              userData.loyaltyPoints + orderDetails.details.subtotal * 0.1;
            await update(userRef, { loyaltyPoints: newLoyaltyPoints });
          }
        } catch (error) {
          console.error("Error updating user loyalty points:", error);
        }
      };
      updateUserLoyaltyPoints();
    }
  }, [user, orderDetails, db]);

  const handleHomeButtonClick = () => {
    navigate("/");
    toast.success("Redirecting to homepage!");
  };

  return (
    <div className="confirmation">
      <h2>Confirmation</h2>
      <p>Thank you for your purchase! Your order has been confirmed.</p>
      <div className="order-summary">
        <p>
          Subtotal ({orderDetails.details.items.length} items): LKR
          {orderDetails.details.subtotal.toFixed(2)}
        </p>
        <p>
          Home delivery cost: LKR {orderDetails.details.deliveryCost.toFixed(2)}
        </p>
        <p>Total amount: LKR {orderDetails.total.toFixed(2)}</p>
      </div>
      <button className="home-button" onClick={handleHomeButtonClick}>
        Go to Homepage
      </button>
    </div>
  );
};

export default Confirmation;
