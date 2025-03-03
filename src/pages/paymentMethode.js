import React, { useState } from "react";
import "../css/paymentMethode.css";
import { getAuth } from "firebase/auth";
import { ref, set } from "firebase/database";
import { db } from "../firebaseConfig";

const PaymentMethod = ({ nextStep, previousStep }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardHolderName: "",
    expiryDate: "",
    cvc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const saveOrderToFirebase = (orderDetails) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const orderRef = ref(db, `orders/${user.uid}/${orderDetails.id}`);
      set(orderRef, orderDetails);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderDetails = JSON.parse(localStorage.getItem("orderDetails")) || {};
    const updatedOrderDetails = {
      ...orderDetails,
      payment: paymentDetails,
    };
    localStorage.setItem("orderDetails", JSON.stringify(updatedOrderDetails));
    nextStep(updatedOrderDetails);
  };

  return (
    <div className="payment-method">
      <h2>Payment Method</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="cardNumber"
          value={paymentDetails.cardNumber}
          onChange={handleChange}
          placeholder="Card Number"
          required
        />
        <input
          type="text"
          name="cardHolderName"
          value={paymentDetails.cardHolderName}
          onChange={handleChange}
          placeholder="Cardholder Name"
          required
        />
        <input
          type="text"
          name="expiryDate"
          value={paymentDetails.expiryDate}
          onChange={handleChange}
          placeholder="Expiry Date (MM/YY)"
          required
        />
        <input
          type="text"
          name="cvc"
          value={paymentDetails.cvc}
          onChange={handleChange}
          placeholder="CVC"
          required
        />
        <div className="checkbox">
          <input type="checkbox" id="saveDetails" />
          <label htmlFor="saveDetails">Save details for future purchases</label>
        </div>
        <div className="navigation-buttons">
          <button type="button" className="prev-button" onClick={previousStep}>
            Previous
          </button>
          <button type="submit" className="next-button">
            Confirm Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethod;
