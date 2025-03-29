import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/customization.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

// Enhanced CO2 savings with additional eco-friendly options
const CO2_SAVINGS = {
  engravedText: 50, // 50g CO₂ saved by engraving over printing
  woodenMaterial: 0.3, // 30% CO₂ saved by choosing wood over plastic
  biodegradableMaterial: 0.2, // CO₂ savings for biodegradable material
  plantBasedInk: 0.1, // CO₂ savings for using plant-based ink
  bambooMaterial: 0.35, // 35% CO₂ saved by choosing bamboo over plastic
  recycledMaterial: 0.25, // 25% CO₂ saved by choosing recycled materials
};

const Customization = () => {
  // Basic customization states
  const [text, setText] = useState("");
  const [color, setColor] = useState("#000000");
  const [font, setFont] = useState("Arial");
  const [image, setImage] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [price, setPrice] = useState(0);
  const [basePrice, setBasePrice] = useState(50);
  const [drawingData, setDrawingData] = useState([]);
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [textSize, setTextSize] = useState(20);
  const [drawingSize, setDrawingSize] = useState(2);

  // Eco-friendly option states
  const [isEngravedText, setIsEngravedText] = useState(false);
  const [isWoodenMaterial, setIsWoodenMaterial] = useState(false);
  const [isBiodegradableMaterial, setIsBiodegradableMaterial] = useState(false);
  const [isPlantBasedInk, setIsPlantBasedInk] = useState(false);
  const [isBambooMaterial, setIsBambooMaterial] = useState(false);
  const [isRecycledMaterial, setIsRecycledMaterial] = useState(false);

  // Modal state for eco-friendly feedback
  const [showEcoModal, setShowEcoModal] = useState(false);

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
    ctx.font = `${textSize}px ${font}`; // Fixed template literal syntax
    ctx.fillText(text, textPosition.x, textPosition.y);
  };

  // Calculate the total price based on customization
  const calculatePrice = () => {
    let additionalCost = 0;

    if (text.length > 0) additionalCost += 5;
    if (image) additionalCost += 10;
    if (drawingData.length > 0) additionalCost += 15;

    // Small premium for eco-friendly options
    if (isEngravedText) additionalCost += 2;
    if (isWoodenMaterial || isBambooMaterial) additionalCost += 5;
    if (isBiodegradableMaterial || isRecycledMaterial) additionalCost += 3;
    if (isPlantBasedInk) additionalCost += 1;

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

  // Function to remove the uploaded image
  const handleRemoveImage = () => {
    setImage(null);
    drawCanvas();
  };

  // Navigate to the checkout page
  const handleProceedToCheckout = () => {
    // Show eco-friendly modal first before checkout
    setShowEcoModal(true);
  };

  // Continue to checkout after seeing eco modal
  const continueToCheckout = () => {
    // Close the modal
    setShowEcoModal(false);

    // Save the customization data with eco-friendly choices
    const customizationData = {
      price,
      ecoFriendlyChoices: {
        isEngravedText,
        isWoodenMaterial,
        isBiodegradableMaterial,
        isPlantBasedInk,
        isBambooMaterial,
        isRecycledMaterial,
      },
      sustainabilityScore: calculateSustainabilityScore(),
      co2Savings: calculateCO2Savings(),
    };

    // Navigate to checkout with the data
    navigate("/checkout", { state: customizationData });
    toast.success("Proceeding to checkout!");
  };

  // Calculate CO₂ savings
  const calculateCO2Savings = () => {
    let savings = 0;

    if (isEngravedText) {
      savings += CO2_SAVINGS.engravedText;
    }

    if (isWoodenMaterial) {
      savings += CO2_SAVINGS.woodenMaterial * basePrice;
    }

    if (isBiodegradableMaterial) {
      savings += CO2_SAVINGS.biodegradableMaterial * basePrice;
    }

    if (isPlantBasedInk) {
      savings += CO2_SAVINGS.plantBasedInk * basePrice;
    }

    if (isBambooMaterial) {
      savings += CO2_SAVINGS.bambooMaterial * basePrice;
    }

    if (isRecycledMaterial) {
      savings += CO2_SAVINGS.recycledMaterial * basePrice;
    }

    return savings.toFixed(2);
  };

  // Calculate sustainability score
  const calculateSustainabilityScore = () => {
    let score = 0;

    // Base score of 40 - can reach 100 with all eco-friendly options
    if (isEngravedText) score += 15;
    if (isWoodenMaterial) score += 10;
    if (isBiodegradableMaterial) score += 10;
    if (isPlantBasedInk) score += 10;
    if (isBambooMaterial) score += 15;
    if (isRecycledMaterial) score += 10;

    return Math.min(score, 100);
  };

  // Get eco-friendly icons for display
  const getEcoFriendlyIcons = () => {
    const ecoIcons = [];
    if (isEngravedText) ecoIcons.push("✓ Engraved Text");
    if (isWoodenMaterial) ecoIcons.push("♻ Recycled Wood");
    if (isBiodegradableMaterial) ecoIcons.push("🌱 Biodegradable");
    if (isPlantBasedInk) ecoIcons.push("🌍 Plant-Based Inks");
    if (isBambooMaterial) ecoIcons.push("🎋 Bamboo Material");
    if (isRecycledMaterial) ecoIcons.push("♻ Recycled Material");

    return ecoIcons;
  };

  // Display CO₂ savings
  const CO2SavingsDisplay = () => {
    const savings = calculateCO2Savings();
    const sustainabilityScore = calculateSustainabilityScore();
    const ecoIcons = getEcoFriendlyIcons();

    return (
      <div className="co2-savings-display">
        <h3>Environmental Impact</h3>
        <div className="sustainability-score">
          <div className="score-meter">
            <div
              className="score-fill"
              style={{ width: `${sustainabilityScore}%` }} // Fixed template literal syntax
            ></div>
          </div>
          <p>Sustainability Score: {sustainabilityScore}%</p>
        </div>
        <p>
          {savings > 0
            ? `Your eco-friendly choices save ${savings}g of CO₂ emissions!` // Fixed template literal syntax
            : "Make eco-friendly choices to reduce your carbon footprint."}
        </p>
        {ecoIcons.length > 0 && (
          <div className="eco-icons">
            <h4>Your Eco-Friendly Choices:</h4>
            <ul>
              {ecoIcons.map((icon, index) => (
                <li key={index}>{icon}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  // Eco-friendly educational modal
  const EcoFriendlyModal = () => {
    const savings = calculateCO2Savings();
    const sustainabilityScore = calculateSustainabilityScore();

    return (
      showEcoModal && (
        <div className="eco-modal-overlay">
          <div className="eco-modal">
            <h2>Your Environmental Impact</h2>
            <div className="sustainability-score-modal">
              <h3>Sustainability Score: {sustainabilityScore}%</h3>
              <div className="score-meter-modal">
                <div
                  className="score-fill-modal"
                  style={{ width: `${sustainabilityScore}%` }}
                ></div>
              </div>
            </div>

            <p className="co2-impact">
              {savings > 0
                ? `By making eco-friendly choices, you've saved ${savings}g of CO₂ emissions!`
                : "You haven't selected any eco-friendly options yet."}
            </p>

            {sustainabilityScore > 0 ? (
              <div className="eco-explanation">
                <h3>Your Sustainable Choices:</h3>
                <ul>
                  {isEngravedText && (
                    <li>
                      Engraved text saves approximately 50g of CO₂ compared to
                      plastic stickers.
                    </li>
                  )}
                  {isWoodenMaterial && (
                    <li>
                      Using wooden materials reduces CO₂ emissions by 30%
                      compared to plastic alternatives.
                    </li>
                  )}
                  {isBiodegradableMaterial && (
                    <li>
                      Biodegradable materials help reduce landfill waste and CO₂
                      emissions.
                    </li>
                  )}
                  {isPlantBasedInk && (
                    <li>
                      Plant-based inks are renewable and produce fewer VOCs when
                      compared to petroleum-based inks.
                    </li>
                  )}
                  {isBambooMaterial && (
                    <li>
                      Bamboo is highly renewable, grows quickly, and absorbs
                      more CO₂ than many trees.
                    </li>
                  )}
                  {isRecycledMaterial && (
                    <li>
                      Recycled materials reduce waste and require less energy to
                      produce than virgin materials.
                    </li>
                  )}
                </ul>
              </div>
            ) : (
              <div className="eco-explanation">
                <h3>Eco-Friendly Options:</h3>
                <p>
                  Consider selecting eco-friendly options to reduce the
                  environmental impact of your gift!
                </p>
                <ul>
                  <li>Engraved text instead of printed stickers</li>
                  <li>Wooden or bamboo materials</li>
                  <li>Biodegradable components</li>
                  <li>Plant-based inks</li>
                </ul>
              </div>
            )}

            <div className="eco-modal-buttons">
              <button
                className="eco-back-btn"
                onClick={() => setShowEcoModal(false)}
              >
                Back to Customization
              </button>
              <button className="eco-continue-btn" onClick={continueToCheckout}>
                Continue to Checkout
              </button>
            </div>
          </div>
        </div>
      )
    );
  };

  return (
    <>
      <Navbar />
      <div className="customization-page-eco">
        <h1>Customize Your Wedding Gift</h1>
        <div className="customization-content-eco">
          {/* Basic Customization Section */}
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
                <input
                  type="color"
                  value={color}
                  onChange={handleColorChange}
                />
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

          {/* Whiteboard Section */}
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
              className="customization-btn-eco checkout-btn"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </div>

          {/* Eco-Friendly Options Section */}
          <div className="eco-options">
            <div className="tool-section">
              <h3>Eco-Friendly Options</h3>
              <div className="eco-option">
                <label>
                  <input
                    type="checkbox"
                    checked={isEngravedText}
                    onChange={(e) => setIsEngravedText(e.target.checked)}
                  />
                  Use Engraved Text
                  <span className="eco-badge">Eco-friendly</span>
                </label>
              </div>
              <div className="eco-option">
                <label>
                  <input
                    type="checkbox"
                    checked={isPlantBasedInk}
                    onChange={(e) => setIsPlantBasedInk(e.target.checked)}
                  />
                  Use Plant-Based Ink
                  <span className="eco-badge">Eco-friendly</span>
                </label>
              </div>
              <div className="eco-material-section">
                <h4>Sustainable Materials:</h4>
                <div className="eco-option">
                  <label>
                    <input
                      type="checkbox"
                      checked={isWoodenMaterial}
                      onChange={(e) => {
                        setIsWoodenMaterial(e.target.checked);
                        if (e.target.checked) {
                          setIsBambooMaterial(false);
                          setIsBiodegradableMaterial(false);
                          setIsRecycledMaterial(false);
                        }
                      }}
                    />
                    Recycled Wood
                    <span className="eco-badge">Eco-friendly</span>
                  </label>
                </div>
                <div className="eco-option">
                  <label>
                    <input
                      type="checkbox"
                      checked={isBambooMaterial}
                      onChange={(e) => {
                        setIsBambooMaterial(e.target.checked);
                        if (e.target.checked) {
                          setIsWoodenMaterial(false);
                          setIsBiodegradableMaterial(false);
                          setIsRecycledMaterial(false);
                        }
                      }}
                    />
                    Bamboo Material
                    <span className="eco-badge">Eco-friendly</span>
                  </label>
                </div>
                <div className="eco-option">
                  <label>
                    <input
                      type="checkbox"
                      checked={isBiodegradableMaterial}
                      onChange={(e) => {
                        setIsBiodegradableMaterial(e.target.checked);
                        if (e.target.checked) {
                          setIsWoodenMaterial(false);
                          setIsBambooMaterial(false);
                          setIsRecycledMaterial(false);
                        }
                      }}
                    />
                    Biodegradable Material
                    <span className="eco-badge">Eco-friendly</span>
                  </label>
                </div>
                <div className="eco-option">
                  <label>
                    <input
                      type="checkbox"
                      checked={isRecycledMaterial}
                      onChange={(e) => {
                        setIsRecycledMaterial(e.target.checked);
                        if (e.target.checked) {
                          setIsWoodenMaterial(false);
                          setIsBambooMaterial(false);
                          setIsBiodegradableMaterial(false);
                        }
                      }}
                    />
                    Recycled Material
                    <span className="eco-badge">Eco-friendly</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EcoFriendlyModal />
    </>
  );
};

export default Customization;
