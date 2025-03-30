import React, { useState } from "react";
import "../css/customization.css";

const BagCustomization = ({ onProceedToCheckout }) => {
  const [bagText, setBagText] = useState("");
  const [bagColor, setBagColor] = useState("#000000");
  const [bagFont, setBagFont] = useState("Arial");

  return (
    <div className="bag-customization">
      <h3>Bag Customization</h3>
      <div className="bag-customization-container">
        <label>
          Bag Text:
          <input
            type="text"
            value={bagText}
            onChange={(e) => setBagText(e.target.value)}
            placeholder="Enter text for the bag"
          />
        </label>
        <label>
          Bag Text Color:
          <input
            type="color"
            value={bagColor}
            onChange={(e) => setBagColor(e.target.value)}
          />
        </label>
        <label>
          Bag Font:
          <select value={bagFont} onChange={(e) => setBagFont(e.target.value)}>
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
          </select>
        </label>
      </div>
      <button
        className="customization-btn-eco checkout-btn"
        onClick={onProceedToCheckout}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default BagCustomization;
