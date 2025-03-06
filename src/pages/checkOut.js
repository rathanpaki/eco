import React, { useState } from "react";
import CustomerDetails from "./customerDetails";
import PaymentMethod from "./paymentMethode";
import Confirmation from "./confirmation";
import "../css/checkout.css"; 

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [orderDetails, setOrderDetails] = useState({
    id: new Date().getTime().toString(),
    details: {
      items: [],
      subtotal: 0,
      deliveryCost: 0,
    },
    payment: {},
    total: 0,
    status: "pending",
  });

  const nextStep = () => setStep(step + 1);
  const previousStep = () => setStep(step - 1);

  const handleOrderDetails = (details) => {
    setOrderDetails({
      ...orderDetails,
      details: {
        ...orderDetails.details,
        ...details.details,
      },
      payment: details.payment,
      total: details.details.subtotal + details.details.deliveryCost,
    });
    nextStep();
  };

  return (
    <div className="checkout-container">
      <div className="checkout-steps">
        <div className={`step ${step === 1 ? "active" : ""}`}>
          Customer Details
        </div>
        <div className={`step ${step === 2 ? "active" : ""}`}>
          Payment Method
        </div>
        <div className={`step ${step === 3 ? "active" : ""}`}>Confirmation</div>
      </div>
      <div className="checkout-content">
        {step === 1 && <CustomerDetails nextStep={nextStep} />}
        {step === 2 && (
          <PaymentMethod
            nextStep={handleOrderDetails}
            previousStep={previousStep}
          />
        )}
        {step === 3 && <Confirmation orderDetails={orderDetails} />}
      </div>
    </div>
  );
};

export default Checkout;
