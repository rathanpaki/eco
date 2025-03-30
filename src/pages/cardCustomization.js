import React, { useState } from "react";
import "../css/customization.css";

const CardCustomization = ({ onProceedToCheckout }) => {
  const [groomName, setGroomName] = useState("");
  const [brideName, setBrideName] = useState("");
  const [wishMessage, setWishMessage] = useState("");
  const [cardPhotos, setCardPhotos] = useState([]);
  const [groomColor, setGroomColor] = useState("#000000");
  const [brideColor, setBrideColor] = useState("#000000");
  const [wishColor, setWishColor] = useState("#000000");
  const [groomFont, setGroomFont] = useState("Arial");
  const [brideFont, setBrideFont] = useState("Arial");
  const [wishFont, setWishFont] = useState("Arial");

  const handleCardPhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const photoURLs = files.map((file) => URL.createObjectURL(file));
    setCardPhotos((prev) => [...prev, ...photoURLs]);
  };

  return (
    <div className="card-customization">
      <h3>Card Customization</h3>
      <div className="card-customization-container">
        <div className="card-inputs">
          <label>
            Groom's Name:
            <input
              type="text"
              value={groomName}
              onChange={(e) => setGroomName(e.target.value)}
              placeholder="Enter groom's name"
            />
          </label>
          <label>
            Bride's Name:
            <input
              type="text"
              value={brideName}
              onChange={(e) => setBrideName(e.target.value)}
              placeholder="Enter bride's name"
            />
          </label>
          <label>
            Wish Message:
            <textarea
              value={wishMessage}
              onChange={(e) => setWishMessage(e.target.value)}
              placeholder="Enter your wish message"
            />
          </label>
          <label>
            Upload Photos:
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleCardPhotoUpload}
            />
          </label>
        </div>
        <div className="card-live-preview">
          <div className="card-preview-container">
            {cardPhotos.length > 0 && (
              <img
                src={cardPhotos[0]}
                alt="Card Background"
                className="card-background"
              />
            )}
            <div className="card-text">
              <p style={{ color: groomColor, fontFamily: groomFont }}>
                {groomName}
              </p>
              <p style={{ color: brideColor, fontFamily: brideFont }}>
                {brideName}
              </p>
              <p style={{ color: wishColor, fontFamily: wishFont }}>
                {wishMessage}
              </p>
            </div>
          </div>
        </div>
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

export default CardCustomization;
