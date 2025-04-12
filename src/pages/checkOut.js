import React, { useState, useEffect } from "react";
import CustomerDetails from "./customerDetails";
import PaymentMethod from "./paymentMethode";
import Confirmation from "./confirmation";
import EcoOptions from "./ecoOptions";
import "../css/checkout.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../firebaseConfig"; // Use the existing Firebase configuration
import { collection, addDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ref, set } from "firebase/database";
import Loader from "../components/Loader"; // Import the Loader component

const Checkout = () => {
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false); // State to manage loader visibility
  const [orderDetails, setOrderDetails] = useState(() => {
    const initialOrderDetails = location.state?.orderDetails || {
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
    };
    return initialOrderDetails;
  });

  useEffect(() => {
    if (location.state?.orderDetails) {
      setOrderDetails(location.state.orderDetails);
    }
  }, [location.state]);

  const nextStep = () => setStep(step + 1);
  const previousStep = () => setStep(step - 1);

  const handleOrderDetails = async (details) => {
    setLoading(true); // Show loader
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
      const user = getAuth().currentUser;
      if (user) {
        const orderRef = ref(db, `orders/${user.uid}/${orderDetails.id}`);
        await set(orderRef, {
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
      } else {
        toast.error("User not authenticated.");
      }
    } catch (error) {
      toast.error("Failed to save order details to Firebase.");
      console.error("Firebase Error:", error);
    } finally {
      setLoading(false); // Hide loader
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
    setLoading(true); // Show loader
    const additionalAmount = options.treePlantingContribution > 0 ? 300 : 0;

    setOrderDetails((prevOrderDetails) => ({
      ...prevOrderDetails,
      details: {
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
      const user = getAuth().currentUser;
      if (user) {
        const orderRef = ref(db, `orders/${user.uid}/${orderDetails.id}`);
        await set(orderRef, {
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
      } else {
        toast.error("User not authenticated.");
      }
    } catch (error) {
      toast.error("Failed to save eco options to Firebase.");
      console.error("Firebase Error:", error);
    } finally {
      setLoading(false); // Hide loader
    }
    nextStep();
  };

  return (
    <div className="checkout-container">
      {loading && <Loader />} {/* Display loader when loading */}
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
