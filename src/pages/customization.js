import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/customization.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

const CO2_SAVINGS = {
  engravedText: 50, // 50g of CO₂ saved by choosing engraved text over printed plastic stickers
  woodenMaterial: 0.3, // 30% CO₂ saved by choosing wooden material over plastic
};

const Customization = () => {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#000000");
  const [font, setFont] = useState("Arial");
  const [image, setImage] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [price, setPrice] = useState(0);
  const [basePrice, setBasePrice] = useState(50);
  const [drawingData, setDrawingData] = useState([]); // Store drawing data
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 }); // Text position
  const [isDragging, setIsDragging] = useState(false); // Track text dragging
  const [textSize, setTextSize] = useState(20); // Text size
  const [drawingSize, setDrawingSize] = useState(2); // Drawing brush size
  const [isEngravedText, setIsEngravedText] = useState(false);
  const [isWoodenMaterial, setIsWoodenMaterial] = useState(false);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};

  // Set initial product image and base price
  useEffect(() => {
    if (product) {
      setImage(product.image);
      setBasePrice(product.price || 50);
    }
  }, [product]);

  // Update canvas and price whenever changes are made
  useEffect(() => {
    drawCanvas();
    calculatePrice();
  }, [
    text,
    color,
    font,
    image,
    drawingData,
    textPosition,
    textSize,
    drawingSize,
  ]);

  // Handle text input change
  const handleTextChange = (e) => setText(e.target.value);

  // Handle color picker change
  const handleColorChange = (e) => setColor(e.target.value);

  // Handle font selection change
  const handleFontChange = (e) => setFont(e.target.value);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle text size change
  const handleTextSizeChange = (e) => setTextSize(parseInt(e.target.value, 10));

  // Handle drawing size change
  const handleDrawingSizeChange = (e) =>
    setDrawingSize(parseInt(e.target.value, 10));

  // Start drawing on the canvas
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setDrawingData((prevData) => [
      ...prevData,
      { type: "beginPath", x, y, color, lineWidth: drawingSize },
    ]);
    setDrawing(true);
  };

  // Draw on the canvas
  const draw = (e) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Draw the line immediately
    ctx.strokeStyle = color;
    ctx.lineWidth = drawingSize;
    ctx.lineTo(x, y);
    ctx.stroke();

    // Save the drawing action
    setDrawingData((prevData) => [
      ...prevData,
      { type: "lineTo", x, y, color, lineWidth: drawingSize },
    ]);
  };

  // Stop drawing
  const stopDrawing = () => {
    setDrawing(false);
  };

  // Handle text dragging
  const startTextDrag = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if the mouse is near the text position
    const textWidth = canvas.getContext("2d").measureText(text).width;
    if (
      x >= textPosition.x &&
      x <= textPosition.x + textWidth &&
      y >= textPosition.y - textSize &&
      y <= textPosition.y
    ) {
      setIsDragging(true);
    }
  };

  const dragText = (e) => {
    if (!isDragging) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setTextPosition({ x, y });
  };

  const stopTextDrag = () => {
    setIsDragging(false);
  };

  // Draw the canvas with text, image, and drawings
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the image (if any)
    if (image) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = image;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        redrawDrawing(ctx);
        drawText(ctx);
      };
      img.onerror = (error) => {
        console.error("Failed to load image:", error);
      };
    } else {
      // If no image, draw on a blank canvas
      redrawDrawing(ctx);
      drawText(ctx);
    }
  };

  // Redraw the drawing from saved data
  const redrawDrawing = (ctx) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = drawingSize;

    drawingData.forEach((action) => {
      ctx.strokeStyle = action.color;
      ctx.lineWidth = action.lineWidth;

      if (action.type === "beginPath") {
        ctx.beginPath();
        ctx.moveTo(action.x, action.y);
      } else if (action.type === "lineTo") {
        ctx.lineTo(action.x, action.y);
        ctx.stroke();
      }
    });
  };

  // Draw text on the canvas
  const drawText = (ctx) => {
    ctx.fillStyle = color;
    ctx.font = `${textSize}px ${font}`;
    ctx.fillText(text, textPosition.x, textPosition.y);
  };

  // Calculate the total price based on customization
  const calculatePrice = () => {
    let additionalCost = 0;

    if (text.length > 0) additionalCost += 5;
    if (image) additionalCost += 10;
    if (drawingData.length > 0) additionalCost += 15;

    setPrice(basePrice + additionalCost);
  };

  // Function to clear drawing and text
  const handleClearCanvas = () => {
    setText("");
    setDrawingData([]);
    setTextPosition({ x: 50, y: 50 });
    setTextSize(20);
    setDrawingSize(2);
    drawCanvas();
  };

  // Navigate to the checkout page
  const handleProceedToCheckout = () => {
    navigate("/checkout", { state: { price } });
    toast.success("Proceeding to checkout!");
  };

  // Calculate CO₂ savings
  const calculateCO2Savings = () => {
    let savings = 0;

    if (isEngravedText) {
      savings += CO2_SAVINGS.engravedText;
    }

    if (isWoodenMaterial) {
      savings += CO2_SAVINGS.woodenMaterial * basePrice; // Assuming basePrice is related to material cost
    }

    return savings;
  };

  // Display CO₂ savings
  const CO2SavingsDisplay = () => {
    const savings = calculateCO2Savings();

    return (
      <div className="co2-savings-display">
        <h3>Environmental Impact</h3>
        <p>
          {savings > 0
            ? `Your choices save ${savings}g of CO₂ emissions!`
            : "Make eco-friendly choices to reduce your carbon footprint."}
        </p>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="customization-page-eco">
        <h1>Customize Your Gift</h1>
        <div className="customization-content-eco">
          <div className="customization-tools-eco">
            <input
              type="text"
              placeholder="Add text"
              value={text}
              onChange={handleTextChange}
            />
            <input type="color" value={color} onChange={handleColorChange} />
            <select value={font} onChange={handleFontChange}>
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>
            <input
              type="number"
              placeholder="Text Size"
              value={textSize}
              onChange={handleTextSizeChange}
              min="10"
              max="100"
            />
            <input
              type="number"
              placeholder="Drawing Size"
              value={drawingSize}
              onChange={handleDrawingSizeChange}
              min="1"
              max="20"
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <label>
              <input
                type="checkbox"
                checked={isEngravedText}
                onChange={(e) => setIsEngravedText(e.target.checked)}
              />
              Use Engraved Text (Eco-friendly)
            </label>
            <label>
              <input
                type="checkbox"
                checked={isWoodenMaterial}
                onChange={(e) => setIsWoodenMaterial(e.target.checked)}
              />
              Use Wooden Material (Eco-friendly)
            </label>
            <button
              className="customization-btn-eco"
              onClick={handleClearCanvas}
            >
              Clear Drawing and Text
            </button>
          </div>
          <div className="customization-canvas-container-eco">
            <canvas
              ref={canvasRef}
              width="500"
              height="500"
              className="customization-canvas-eco"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseOut={stopDrawing}
              onMouseDownCapture={startTextDrag}
              onMouseMoveCapture={dragText}
              onMouseUpCapture={stopTextDrag}
            />
            <div className="price-display-eco">
              <h3>Total Price: LKR {price}</h3>
            </div>
            <CO2SavingsDisplay />
            <button
              className="customization-btn-eco"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customization;
