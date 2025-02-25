import React, { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { ref, set, get, update } from "firebase/database";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../css/confirmation.css";

const Confirmation = ({ orderDetails }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (user && orderDetails) {
      const orderRef = ref(db, `orders/${user.uid}/${orderDetails.id}`);
      set(orderRef, orderDetails);

      // Update product stock
      orderDetails.details.items.forEach(async (item) => {
        const productRef = ref(db, `produt/${item.id}`);
        const productSnapshot = await get(productRef);
        if (productSnapshot.exists()) {
          const productData = productSnapshot.val();
          const updatedStock = productData.stock - item.quantity;
          update(productRef, { stock: updatedStock });
        }
      });
    }
  }, [user, orderDetails]);

  const handleHomeButtonClick = () => {
    navigate("/");
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
