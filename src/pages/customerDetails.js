import React, { useState } from "react";
import "../css/customerDetails.css";
import { getAuth } from "firebase/auth";
import { ref, set } from "firebase/database";
import { db } from "../firebaseConfig";

const CustomerDetails = ({ nextStep }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      details: {
        ...orderDetails.details,
        customer: formData,
      },
    };
    localStorage.setItem("orderDetails", JSON.stringify(updatedOrderDetails));
    nextStep();
  };

  return (
    <div className="customer-details">
      <h2>Customer Details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
        />
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          placeholder="Postal Code"
          required
        />
        <button type="submit" className="next-button">
          Next
        </button>
      </form>
    </div>
  );
};

export default CustomerDetails;
