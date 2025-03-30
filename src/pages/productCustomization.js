import React, { useState, useRef, useEffect } from "react";
import "../css/customization.css";
import { toast } from "react-toastify";

const ProductCustomization = ({ product, onProceedToCheckout }) => {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#000000");
  const [font, setFont] = useState("Arial");
  const [image, setImage] = useState(null);
  const [drawingData, setDrawingData] = useState([]);
  const [textSize, setTextSize] = useState(20);
  const [drawingSize, setDrawingSize] = useState(2);
  const [price, setPrice] = useState(0);
  const [basePrice, setBasePrice] = useState(50);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (product) {
      setImage(product.image);
      setBasePrice(product.price || 50);
    }
  }, [product]);

  useEffect(() => {
    calculatePrice();
  }, [text, image, drawingData]);

  const handleTextChange = (e) => setText(e.target.value);
  const handleColorChange = (e) => setColor(e.target.value);
  const handleFontChange = (e) => setFont(e.target.value);
  const handleTextSizeChange = (e) => setTextSize(parseInt(e.target.value, 10));
  const handleDrawingSizeChange = (e) =>
    setDrawingSize(parseInt(e.target.value, 10));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const calculatePrice = () => {
    let additionalCost = 0;
    if (text.length > 0) additionalCost += 5;
    if (image) additionalCost += 10;
    if (drawingData.length > 0) additionalCost += 15;
    setPrice(basePrice + additionalCost);
  };

  const handleClearCanvas = () => {
    setText("");
    setDrawingData([]);
    setTextSize(20);
    setDrawingSize(2);
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <div className="product-customization">
      <h1 className="product-name-header">
        {product?.name || "Custom Product"}
      </h1>
      <div className="customization-content-eco">
        <div className="customization-tools-eco">
          <div className="tool-section">
            <h3>Basic Customization</h3>
            <input
              type="text"
              placeholder="Add text"
              value={text}
              onChange={handleTextChange}
            />
            <div className="color-picker-eco">
              <label>Text Color:</label>
              <input type="color" value={color} onChange={handleColorChange} />
            </div>
            <div className="text-options-eco">
              <select value={font} onChange={handleFontChange}>
                <option value="Arial">Arial</option>
                <option value="Verdana">Verdana</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
              </select>
              <input
                type="number"
                placeholder="Text Size"
                value={textSize}
                onChange={handleTextSizeChange}
                min="10"
                max="100"
              />
            </div>
            <div className="drawing-options-eco">
              <label>Drawing Tool Size:</label>
              <input
                type="range"
                value={drawingSize}
                onChange={handleDrawingSizeChange}
                min="1"
                max="20"
              />
              <span>{drawingSize}px</span>
            </div>
            <div className="image-upload-eco">
              <label>Upload Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className="customization-buttons-eco">
            <button
              className="customization-btn-eco clear-drawing-btn"
              onClick={handleClearCanvas}
            >
              Clear Drawing and Text
            </button>
            <button
              className="customization-btn-eco remove-image-btn"
              onClick={handleRemoveImage}
            >
              Remove Image
            </button>
          </div>
        </div>
        <div className="customization-canvas-container-eco">
          <canvas
            ref={canvasRef}
            width="500"
            height="500"
            className="customization-canvas-eco"
          />
          <div className="price-display-eco">
            <h3>Total Price: LKR {price}</h3>
          </div>
          <button
            className="customization-btn-eco checkout-btn"
            onClick={onProceedToCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCustomization;
