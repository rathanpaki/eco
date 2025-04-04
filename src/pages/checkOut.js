import React, { useState } from "react";
import CustomerDetails from "./customerDetails";
import PaymentMethod from "./paymentMethode";
import Confirmation from "./confirmation";
import EcoOptions from "./ecoOptions";
import "../css/checkout.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../firebaseConfig"; // Use the existing Firebase configuration
import { collection, addDoc } from "firebase/firestore";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [orderDetails, setOrderDetails] = useState({
    id: new Date().getTime().toString(),
    details: {
      items: [],
      subtotal: 0,
      deliveryCost: 0,
      ecoFriendlyPackaging: false,
      treePlantingContribution: 0,
    },
    customizationDetails: {
      productName: "",
      finalDesign: "",
      ecoFriendlyChoices: {},
      previewMode: "",
      viewAngle: "",
      sustainabilityScore: 0,
      co2Savings: 0,
    },
    payment: {},
    total: 0,
    status: "pending",
    date: new Date().toLocaleDateString(),
  });

  const nextStep = () => setStep(step + 1);
  const previousStep = () => setStep(step - 1);

  const handleOrderDetails = async (details) => {
    const treePlantingContribution =
      details.details.treePlantingContribution || 0;
    const additionalAmount = treePlantingContribution > 0 ? 300 : 0;

    setOrderDetails({
      ...orderDetails,
      details: {
        ...orderDetails.details,
        ...details.details,
        subtotal: details.details.subtotal,
      },
      payment: details.payment,
      total:
        details.details.subtotal +
        details.details.deliveryCost +
        additionalAmount,
    });

    try {
      await addDoc(collection(db, "orders"), {
        ...orderDetails,
        details: {
          ...orderDetails.details,
          ...details.details,
        },
        payment: details.payment,
        total:
          details.details.subtotal +
          details.details.deliveryCost +
          additionalAmount,
      });
      toast.success("Order details saved to Firebase!");
    } catch (error) {
      toast.error("Failed to save order details to Firebase.");
      console.error("Firebase Error:", error);
    }
    nextStep();
  };

  const handleCustomizationDetails = (customization) => {
    setOrderDetails((prevOrderDetails) => ({
      ...prevOrderDetails,
      customizationDetails: {
        ...customization,
      },
    }));
    toast.success("Customization details updated successfully!");
  };

  const handleEcoOptions = async (options) => {
    const additionalAmount = options.treePlantingContribution > 0 ? 300 : 0;

    setOrderDetails((prevOrderDetails) => ({
      ...prevOrderDetails,
      details: {
        ...prevOrderDetails.details,
        ecoFriendlyPackaging: options.ecoFriendlyPackaging,
        treePlantingContribution: options.treePlantingContribution,
        subtotal: prevOrderDetails.details.subtotal,
      },
      total:
        prevOrderDetails.details.subtotal +
        prevOrderDetails.details.deliveryCost +
        additionalAmount,
    }));

    try {
      await addDoc(collection(db, "orders"), {
        ...orderDetails,
        details: {
          ...orderDetails.details,
          ecoFriendlyPackaging: options.ecoFriendlyPackaging,
          treePlantingContribution: options.treePlantingContribution,
        },
        total:
          orderDetails.details.subtotal +
          orderDetails.details.deliveryCost +
          additionalAmount,
      });
      toast.success("Eco options saved to Firebase!");
    } catch (error) {
      toast.error("Failed to save eco options to Firebase.");
      console.error("Firebase Error:", error);
    }
    nextStep();
  };

  return (
    <div className="checkout-container">
      <div className="checkout-steps">
        <div className={`checkout-step ${step === 1 ? "active" : ""}`}>
          Customer Details
        </div>
        <div className={`checkout-step ${step === 2 ? "active" : ""}`}>
          Payment Method
        </div>
        <div className={`checkout-step ${step === 3 ? "active" : ""}`}>
          Eco-Friendly Options
        </div>
        <div className={`checkout-step ${step === 4 ? "active" : ""}`}>
          Confirmation
        </div>
      </div>
      <div className="checkout-content">
        {step === 1 && <CustomerDetails nextStep={nextStep} />}
        {step === 2 && (
          <PaymentMethod
            nextStep={handleOrderDetails}
            previousStep={previousStep}
          />
        )}
        {step === 3 && (
          <EcoOptions
            nextStep={nextStep}
            previousStep={previousStep}
            updateOrderDetails={handleEcoOptions}
          />
        )}
        {step === 4 && <Confirmation orderDetails={orderDetails} />}
      </div>
    </div>
  );
};

export default Checkout;
