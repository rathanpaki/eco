import React, { useState } from "react";
import "../css/paymentMethode.css";
import { getAuth } from "firebase/auth";
import { ref, set } from "firebase/database";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentMethod = ({ nextStep, previousStep }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardType: "visa",
    cardNumber: "",
    cardHolderName: "",
    expiryDate: "",
    cvc: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cardNumber") {
      // Format card number with spaces
      const formattedCardNumber = formatCardNumber(value);
      setPaymentDetails({ ...paymentDetails, [name]: formattedCardNumber });
    } else {
      setPaymentDetails({ ...paymentDetails, [name]: value });
    }
  };

  const formatCardNumber = (cardNumber) => {
    // Remove all non-digit characters
    const digitsOnly = cardNumber.replace(/\D/g, "");
    // Add spaces every 4 digits
    return digitsOnly.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const validateCardNumber = (cardNumber, cardType) => {
    // Remove spaces for validation
    const digitsOnly = cardNumber.replace(/\D/g, "");

    // Luhn algorithm for card number validation
    let sum = 0;
    for (let i = 0; i < digitsOnly.length; i++) {
      let digit = parseInt(digitsOnly[i]);
      if ((digitsOnly.length - i) % 2 === 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }

    // Check if the card number matches the selected card type
    if (cardType === "visa" && !/^4[0-9]{12,15}$/.test(digitsOnly)) {
      return "Visa cards start with 4 and have 13, 16, or 19 digits.";
    }
    if (cardType === "mastercard" && !/^5[1-5][0-9]{14}$/.test(digitsOnly)) {
      return "Mastercard numbers start with 51-55 and have 16 digits.";
    }

    return sum % 10 === 0 ? "" : "Invalid card number";
  };

  const validateExpiryDate = (expiryDate) => {
    const [month, year] = expiryDate.split("/");
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (
      !/^\d{2}\/\d{2}$/.test(expiryDate) ||
      parseInt(month) < 1 ||
      parseInt(month) > 12 ||
      parseInt(year) < currentYear ||
      (parseInt(year) === currentYear && parseInt(month) < currentMonth)
    ) {
      return "Invalid expiry date";
    }
    return "";
  };

  const validateCVC = (cvc) => {
    return /^\d{3,4}$/.test(cvc) ? "" : "Invalid CVC";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate card number based on card type
    const cardNumberError = validateCardNumber(
      paymentDetails.cardNumber,
      paymentDetails.cardType
    );
    if (cardNumberError) {
      newErrors.cardNumber = cardNumberError;
    }

    const expiryDateError = validateExpiryDate(paymentDetails.expiryDate);
    if (expiryDateError) {
      newErrors.expiryDate = expiryDateError;
    }

    const cvcError = validateCVC(paymentDetails.cvc);
    if (cvcError) {
      newErrors.cvc = cvcError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please correct the errors in the form.");
      return;
    }

    const orderDetails = JSON.parse(localStorage.getItem("orderDetails")) || {};
    const updatedOrderDetails = {
      ...orderDetails,
      payment: paymentDetails,
    };
    localStorage.setItem("orderDetails", JSON.stringify(updatedOrderDetails));
    toast.success("Payment details saved successfully!");
    nextStep(updatedOrderDetails);
  };

  return (
    <div className="payment-method">
      <h2>Payment Method</h2>
      <form onSubmit={handleSubmit}>
        <div className="card-type">
          <label>
            <input
              type="radio"
              name="cardType"
              value="visa"
              checked={paymentDetails.cardType === "visa"}
              onChange={handleChange}
            />
            Visa
          </label>
          <label>
            <input
              type="radio"
              name="cardType"
              value="mastercard"
              checked={paymentDetails.cardType === "mastercard"}
              onChange={handleChange}
            />
            Mastercard
          </label>
        </div>
        <input
          type="text"
          name="cardNumber"
          value={paymentDetails.cardNumber}
          onChange={handleChange}
          placeholder="Card Number"
          required
        />
        {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
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
        {errors.expiryDate && <p className="error">{errors.expiryDate}</p>}
        <input
          type="text"
          name="cvc"
          value={paymentDetails.cvc}
          onChange={handleChange}
          placeholder="CVC"
          required
        />
        {errors.cvc && <p className="error">{errors.cvc}</p>}
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
