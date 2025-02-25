import React, { useState } from "react";
import CustomerDetails from "./customerDetails";
import PaymentMethod from "./paymentMethode";
import Confirmation from "./confirmation";

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

  switch (step) {
    case 1:
      return <CustomerDetails nextStep={nextStep} />;
    case 2:
      return (
        <PaymentMethod
          nextStep={handleOrderDetails}
          previousStep={previousStep}
        />
      );
    case 3:
      return <Confirmation orderDetails={orderDetails} />;
    default:
      return <CustomerDetails nextStep={nextStep} />;
  }
};

export default Checkout;
