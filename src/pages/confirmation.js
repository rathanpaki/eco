import React from 'react';
import '../css/confirmation.css';

const Confirmation = () => {
  return (
    <div className="confirmation">
      <h2>Confirmation</h2>
      <p>Thank you for your purchase! Your order has been confirmed.</p>
      <div className="order-summary">
        <p>Subtotal (2 items): $60.80</p>
        <p>Home delivery cost: $5.50</p>
        <p>Total amount: $66.30</p>
      </div>
      <button className="home-button">Go to Homepage</button>
    </div>
  );
};

export default Confirmation;
