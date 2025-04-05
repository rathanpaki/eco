import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/customization.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import bag1 from "../img/bag1.jpg";
import bag2 from "../img/bag2.jpg";
import bag3 from "../img/bag3.jpg";
import bag4 from "../img/bag4.jpg";
import bag5 from "../img/bag5.jpg";
import { db } from "../firebaseConfig"; // Use the existing Firebase configuration
import { collection, addDoc } from "firebase/firestore";

// Enhanced CO2 savings with additional eco-friendly options
const CO2_SAVINGS = {
  engravedText: 50, // 50g CO₂ saved by engraving over printing
  woodenMaterial: 0.3, // 30% CO₂ saved by choosing wood over plastic
  biodegradableMaterial: 0.2, // CO₂ savings for biodegradable material
  plantBasedInk: 0.1, // CO₂ savings for using plant-based ink
  bambooMaterial: 0.35, // 35% CO₂ saved by choosing bamboo over plastic
  recycledMaterial: 0.25, // 25% CO₂ saved by choosing recycled materials
};

const FONT_OPTIONS = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Courier New",
  "Georgia",
  "Dancing Script",
  "Pacifico",
  "Montserrat",
  "Playfair Display",
  "Roboto",
];

const CARD_SHAPES = [
  "Square",
  "Circle",
  "Heart",
  "Scalloped Top Edge",
  "Beveled Top Edge",
  "Rectangle",
  "Oval Flower Tag",
  "Flower Tag",
];

// Predefined bag images
const BAG_IMAGES = [bag1, bag2, bag3, bag4, bag5];

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
  const [productName, setProductName] = useState("Custom Wedding Gift");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [previewMode, setPreviewMode] = useState("default");

  // Eco-friendly option states
  const [isEngravedText, setIsEngravedText] = useState(false);
  const [isWoodenMaterial, setIsWoodenMaterial] = useState(false);
  const [isBiodegradableMaterial, setIsBiodegradableMaterial] = useState(false);
  const [isPlantBasedInk, setIsPlantBasedInk] = useState(false);
  const [isBambooMaterial, setIsBambooMaterial] = useState(false);
  const [isRecycledMaterial, setIsRecycledMaterial] = useState(false);

  // New state for 3D view toggle
  const [show3DView, setShow3DView] = useState(false);

  // New state for saved design snapshots
  const [designHistory, setDesignHistory] = useState([]);

  // New state for customization view
  const [viewAngle, setViewAngle] = useState("front");

  // Modal state for eco-friendly feedback
  const [showEcoModal, setShowEcoModal] = useState(false);

  // New state to track the user-uploaded image separately
  const [uploadedImage, setUploadedImage] = useState(null);

  // Function to generate random price increments
  const getRandomPriceIncrement = () => Math.floor(Math.random() * 10) + 1;

  // Modal for personalization templates
  const [showPersonalizationModal, setShowPersonalizationModal] =
    useState(false);

  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { product, price: initialPrice } = location.state || {};

  // New state for customization mode
  const [customizationMode, setCustomizationMode] = useState("product");

  // New states for card customization
  const [groomName, setGroomName] = useState("");
  const [brideName, setBrideName] = useState("");
  const [wishMessage, setWishMessage] = useState("");
  const [cardPhotos, setCardPhotos] = useState([]);

  // New states for card customization colors and fonts
  const [groomColor, setGroomColor] = useState("#000000");
  const [brideColor, setBrideColor] = useState("#000000");
  const [wishColor, setWishColor] = useState("#000000");
  const [groomFont, setGroomFont] = useState("Arial");
  const [brideFont, setBrideFont] = useState("Arial");
  const [wishFont, setWishFont] = useState("Arial");

  // New states for font size and card shape
  const [fontSize, setFontSize] = useState(24);
  const [cardShape, setCardShape] = useState("Square");

  // New state for bag customization
  const [bagImage, setBagImage] = useState(null);
  const [bagText, setBagText] = useState("");
  const [bagTextColor, setBagTextColor] = useState("#000000");
  const [bagTextFont, setBagTextFont] = useState("Arial");
  const [bagTextSize, setBagTextSize] = useState(20);

  // New state for selected bag image
  const [selectedBagImage, setSelectedBagImage] = useState(null);

  // New state to track if the image is from the shop page
  const [isShopImage, setIsShopImage] = useState(false);

  // Handle file input click programmatically
  const triggerFileInput = (inputRef) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // Create refs for file inputs
  const cardPhotoInputRef = useRef(null);
  const bagImageInputRef = useRef(null);
  const productImageInputRef = useRef(null);

  // Handle photo uploads for card customization
  const handleCardPhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const photoURLs = files.map((file) => URL.createObjectURL(file));
    setCardPhotos((prev) => [...prev, ...photoURLs]);
  };

  // Handle bag image upload
  const handleBagImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBagImage(event.target.result);
        toast.success("Bag image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image upload with enhanced preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result); // Set the uploaded image separately
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  // Render card customization UI
  const renderCardCustomization = () => (
    <div className="card-customization">
      <h3>Tag Customization</h3>
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
          <div className="side-by-side">
            <label>
              Groom's Name Color:
              <input
                type="color"
                value={groomColor}
                onChange={(e) => setGroomColor(e.target.value)}
              />
            </label>
            <label>
              Groom's Name Font:
              <select
                value={groomFont}
                onChange={(e) => setGroomFont(e.target.value)}
              >
                {FONT_OPTIONS.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label>
            Bride's Name:
            <input
              type="text"
              value={brideName}
              onChange={(e) => setBrideName(e.target.value)}
              placeholder="Enter bride's name"
            />
          </label>
          <div className="side-by-side">
            <label>
              Bride's Name Color:
              <input
                type="color"
                value={brideColor}
                onChange={(e) => setBrideColor(e.target.value)}
              />
            </label>
            <label>
              Bride's Name Font:
              <select
                value={brideFont}
                onChange={(e) => setBrideFont(e.target.value)}
              >
                {FONT_OPTIONS.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label>
            Wish Message:
            <textarea
              value={wishMessage}
              onChange={(e) => setWishMessage(e.target.value)}
              placeholder="Enter your wish message"
            />
          </label>
          <div className="side-by-side">
            <label>
              Wish Message Color:
              <input
                type="color"
                value={wishColor}
                onChange={(e) => setWishColor(e.target.value)}
              />
            </label>
            <label>
              Wish Message Font:
              <select
                value={wishFont}
                onChange={(e) => setWishFont(e.target.value)}
              >
                {FONT_OPTIONS.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label>
            Font Size:
            <input
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
              min="10"
              max="50"
            />
          </label>
          <label>
            Tag Shape:
            <select
              value={cardShape}
              onChange={(e) => setCardShape(e.target.value)}
            >
              {CARD_SHAPES.map((shape) => (
                <option key={shape} value={shape}>
                  {shape}
                </option>
              ))}
            </select>
          </label>
          <label>
            Upload Photos:
            <button
              type="button"
              onClick={() => triggerFileInput(cardPhotoInputRef)}
              className="upload-btn"
            >
              Select Photos
            </button>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={cardPhotoInputRef}
              style={{ display: "none" }}
              onChange={handleCardPhotoUpload}
            />
          </label>
        </div>
        <div className="card-live-preview">
          <div
            className={`card-preview-container card-shape-${cardShape
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            {cardPhotos.length > 0 && (
              <img
                src={cardPhotos[0]}
                alt="Card Background"
                className="card-background"
              />
            )}
            <div className="card-text">
              <p
                style={{
                  color: groomColor,
                  fontFamily: groomFont,
                  fontSize: `${fontSize}px`,
                }}
              >
                {groomName}
              </p>
              <p
                style={{
                  color: brideColor,
                  fontFamily: brideFont,
                  fontSize: `${fontSize}px`,
                }}
              >
                {brideName}
              </p>
              <p
                style={{
                  color: wishColor,
                  fontFamily: wishFont,
                  fontSize: `${fontSize - 4}px`,
                }}
              >
                {wishMessage}
              </p>
            </div>
          </div>
        </div>
        <div className="price-display">
          <h3>Total Price: LKR {price}</h3>
        </div>
      </div>
    </div>
  );

  const [bagColor, setBagColor] = useState("#ffffff");

  const renderBagCustomization = () => (
    <div className="bag-customization">
      <h3>Package Customization</h3>
      <div className="bag-customization-container">
        <div className="bag-selection">
          <h4>Choose a Pack:</h4>
          <div className="bag-options">
            {BAG_IMAGES.map((bag, index) => (
              <img
                key={index}
                src={bag}
                alt={`Bag ${index + 1}`}
                className={`bag-option ${
                  selectedBagImage === bag ? "selected" : ""
                }`}
                onClick={() => setSelectedBagImage(bag)}
              />
            ))}
          </div>
        </div>
        <div className="bag-color-picker">
          <h4>Choose Pack Color:</h4>
          <input
            type="color"
            value={bagColor}
            onChange={(e) => setBagColor(e.target.value)}
          />
        </div>
        <div className="bag-live-preview">
          <h4>Preview:</h4>
          {selectedBagImage ? (
            <div
              className="bag-preview-container"
              style={{ backgroundColor: bagColor }}
            >
              <img
                src={selectedBagImage}
                alt="Selected Bag"
                className="bag-preview-image"
              />
            </div>
          ) : (
            <div className="bag-placeholder">Select a bag to preview</div>
          )}
          <div className="price-display">
            <h3>Total Price: LKR {price}</h3>
          </div>
        </div>
      </div>
    </div>
  );

  // Set initial product image, base price, and name
  useEffect(() => {
    if (product) {
      setImage(product.image);
      setIsShopImage(true); // Mark as shop image
      setBasePrice(initialPrice || product.price || 50);
      setPrice(initialPrice || product.price || 50);
      setProductName(product.name || "Custom Wedding Gift");
    }
  }, [product, initialPrice]);

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
    groomName,
    brideName,
    wishMessage,
    cardPhotos,
    cardShape,
    selectedBagImage,
    bagText,
    bagImage,
    show3DView, // Add show3DView as a dependency
    viewAngle, // Add viewAngle as a dependency
  ]);

  useEffect(() => {
    if (location.state?.savedDesign) {
      const savedDesign = location.state.savedDesign;

      setProductName(savedDesign.productName);
      setPrice(savedDesign.price);
      setText(savedDesign.text || "");
      setColor(savedDesign.color || "#000000");
      setFont(savedDesign.font || "Arial");
      setTextSize(savedDesign.textSize || 20);
      setDrawingData(savedDesign.drawingData || []);
      setImage(savedDesign.savedDesign);
      setIsEngravedText(savedDesign.ecoFriendlyChoices.isEngravedText || false);
      setIsWoodenMaterial(
        savedDesign.ecoFriendlyChoices.isWoodenMaterial || false
      );
      setIsBiodegradableMaterial(
        savedDesign.ecoFriendlyChoices.isBiodegradableMaterial || false
      );
      setIsPlantBasedInk(
        savedDesign.ecoFriendlyChoices.isPlantBasedInk || false
      );
      setIsBambooMaterial(
        savedDesign.ecoFriendlyChoices.isBambooMaterial || false
      );
      setIsRecycledMaterial(
        savedDesign.ecoFriendlyChoices.isRecycledMaterial || false
      );
      setPreviewMode(savedDesign.previewMode || "default");
      setViewAngle(savedDesign.viewAngle || "front");
      setSelectedTemplate(savedDesign.selectedTemplate?.id || null);
    }
  }, [location.state]);

  // Handle text input change
  const handleTextChange = (e) => setText(e.target.value);

  // Handle product name change
  const handleProductNameChange = (e) => setProductName(e.target.value);

  // Handle color picker change
  const handleColorChange = (e) => setColor(e.target.value);

  // Handle font selection change
  const handleFontChange = (e) => setFont(e.target.value);

  // Save current design as a snapshot
  const saveDesignSnapshot = () => {
    const canvas = canvasRef.current;
    if (canvasRef.current) {
      const snapshot = canvas.toDataURL("image/png");
      setDesignHistory((prev) => [
        ...prev,
        {
          id: Date.now(),
          snapshot,
          text,
          color,
          font,
          textSize,
        },
      ]);
      toast.info("Design snapshot saved!");
    }
  };

  // Restore design from history
  const restoreDesign = (historyItem) => {
    setText(historyItem.text);
    setColor(historyItem.color);
    setFont(historyItem.font);
    setTextSize(historyItem.textSize);
    // Use the snapshot as background
    const img = new Image();
    img.src = historyItem.snapshot;
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    toast.success("Previous design restored!");
  };

  // Handle text size change
  const handleTextSizeChange = (e) => setTextSize(parseInt(e.target.value, 10));

  // Handle drawing size change
  const handleDrawingSizeChange = (e) =>
    setDrawingSize(parseInt(e.target.value, 10));

  // Toggle 3D view
  const toggle3DView = () => {
    setShow3DView((prev) => !prev); // Ensure state updates correctly
    drawCanvas(); // Force canvas redraw immediately
    if (!show3DView) {
      toast.info(
        "3D view enabled! Rotate the product to see different angles."
      );
    }
  };

  // Change view angle in 3D mode
  const changeViewAngle = (angle) => {
    setViewAngle(angle);
    drawCanvas(); // Force canvas redraw immediately
    toast.info(`Viewing from ${angle} angle`);
  };

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

  // Draw the canvas with text, shop image, and drawings
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvasRef.current) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Always draw the shop image on the canvas if available
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
      // If no shop image, draw on a blank canvas
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
    if (!text) return;

    ctx.fillStyle = color;
    ctx.font = `${textSize}px ${font}`;

    // Apply engraved text effect when selected
    if (isEngravedText) {
      // Shadow for engraved effect
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.shadowBlur = 2;
      ctx.shadowColor = "rgba(0,0,0,0.5)";

      // First draw the text in a lighter color for the "carved out" effect
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.fillText(text, textPosition.x + 1, textPosition.y + 1);

      // Then draw the main text
      ctx.fillStyle = color;
      ctx.fillText(text, textPosition.x, textPosition.y);

      // Reset shadow
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 0;
    } else {
      // Regular text
      ctx.fillText(text, textPosition.x, textPosition.y);
    }

    // If plant-based ink is selected, add a subtle organic texture
    if (isPlantBasedInk) {
      const originalComposite = ctx.globalCompositeOperation;
      ctx.globalCompositeOperation = "overlay";
      ctx.fillStyle = "rgba(0,100,0,0.1)";
      ctx.fillRect(
        textPosition.x,
        textPosition.y - textSize,
        ctx.measureText(text).width,
        textSize
      );
      ctx.globalCompositeOperation = originalComposite;
    }
  };

  const calculatePrice = () => {
    let additionalCost = 0; // Start with no additional cost

    if (customizationMode === "product") {
      if (text.length > 0) additionalCost += getRandomPriceIncrement();
      if (image) additionalCost += getRandomPriceIncrement();
      if (drawingData.length > 0) additionalCost += getRandomPriceIncrement();

      // Small premium for eco-friendly options
      if (isEngravedText) additionalCost += getRandomPriceIncrement();
      if (isWoodenMaterial || isBambooMaterial)
        additionalCost += getRandomPriceIncrement();
      if (isBiodegradableMaterial || isRecycledMaterial)
        additionalCost += getRandomPriceIncrement();
      if (isPlantBasedInk) additionalCost += getRandomPriceIncrement();

      // Add personalization template premium if used
      if (selectedTemplate) additionalCost += getRandomPriceIncrement();
    } else if (customizationMode === "card") {
      if (groomName || brideName) additionalCost += getRandomPriceIncrement();
      if (wishMessage) additionalCost += getRandomPriceIncrement();
      if (cardPhotos.length > 0) additionalCost += getRandomPriceIncrement();
      if (cardShape !== "Square") additionalCost += getRandomPriceIncrement();

      // Add a base price for card customization
      additionalCost += 20; // Example base price for card customization
    } else if (customizationMode === "bag") {
      if (selectedBagImage) additionalCost += getRandomPriceIncrement();
      if (bagText) additionalCost += getRandomPriceIncrement();
      if (bagImage) additionalCost += getRandomPriceIncrement();

      // Add a base price for bag customization
      additionalCost += 30; // Example base price for bag customization
    }

    setPrice(basePrice + additionalCost); // Add basePrice to additionalCost
  };

  // Function to clear drawing and text
  const handleClearCanvas = () => {
    saveDesignSnapshot(); // Save before clearing
    setText("");
    setDrawingData([]);
    setTextPosition({ x: 50, y: 50 });
    setTextSize(20);
    setDrawingSize(2);
    setSelectedTemplate(null);
    drawCanvas();
  };

  // Function to remove the uploaded image
  const handleRemoveImage = () => {
    saveDesignSnapshot(); // Save before removing
    setUploadedImage(null);
    drawCanvas();
  };

  // Navigate to the checkout page
  const handleProceedToCheckout = async () => {
    // Take final snapshot of design
    const canvas = canvasRef.current;
    const finalDesign = canvas.toDataURL("image/png");

    // Save the customization data with eco-friendly choices
    const customizationData = {
      id: Date.now(), // Unique ID for the order
      productName,
      price,
      finalDesign,
      ecoFriendlyChoices: {
        isEngravedText,
        isWoodenMaterial,
        isBiodegradableMaterial,
        isPlantBasedInk,
        isBambooMaterial,
        isRecycledMaterial,
      },
      previewMode,
      viewAngle: show3DView ? viewAngle : "front",
      sustainabilityScore: calculateSustainabilityScore(),
      co2Savings: calculateCO2Savings(),
      status: "Pending", // Default order status
    };

    try {
      await addDoc(collection(db, "customizations"), customizationData);
      toast.success("Customization details saved to Firebase!");
    } catch (error) {
      toast.error("Failed to save customization details to Firebase.");
      console.error("Firebase Error:", error);
    }

    // Save order details to local storage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(customizationData);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Show eco-friendly modal first before checkout
    setShowEcoModal(true);
  };

  // Save customized design for later purchase
  const saveForLater = () => {
    const canvas = canvasRef.current;
    const savedDesign = canvas.toDataURL("image/png");

    const savedDesignData = {
      id: Date.now(),
      productName,
      price,
      savedDesign,
      ecoFriendlyChoices: {
        isEngravedText,
        isWoodenMaterial,
        isBiodegradableMaterial,
        isPlantBasedInk,
        isBambooMaterial,
        isRecycledMaterial,
      },
      previewMode,
      viewAngle: show3DView ? viewAngle : "front",
      sustainabilityScore: calculateSustainabilityScore(),
      co2Savings: calculateCO2Savings(),
    };

    const savedDesigns = JSON.parse(localStorage.getItem("savedDesigns")) || [];
    savedDesigns.push(savedDesignData);
    localStorage.setItem("savedDesigns", JSON.stringify(savedDesigns));

    toast.success("Design saved for later purchase!");
  };

  // Continue to checkout after seeing eco modal
  const continueToCheckout = () => {
    // Close the modal
    setShowEcoModal(false);

    // Get the final design from storage
    const finalDesign = localStorage.getItem("finalCustomDesign");

    // Save the customization data with eco-friendly choices
    const customizationData = {
      productName,
      price,
      finalDesign,
      ecoFriendlyChoices: {
        isEngravedText,
        isWoodenMaterial,
        isBiodegradableMaterial,
        isPlantBasedInk,
        isBambooMaterial,
        isRecycledMaterial,
      },
      previewMode,
      viewAngle: show3DView ? viewAngle : "front",
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
              style={{ width: `${sustainabilityScore}%` }}
            ></div>
          </div>
          <p>Sustainability Score: {sustainabilityScore}%</p>
        </div>
        <p>
          {savings > 0
            ? `Your eco-friendly choices save ${savings}g of CO₂ emissions!`
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

  // Design history panel
  const DesignHistoryPanel = () => {
    return (
      <div
        className={`design-history-panel ${
          designHistory.length === 0 ? "empty" : ""
        }`}
      >
        <h3>Design History</h3>
        {designHistory.length === 0 ? (
          <p>No saved designs yet. Changes will be saved automatically.</p>
        ) : (
          <div className="history-items">
            {designHistory.map((item) => (
              <div
                key={item.id}
                className="history-item"
                onClick={() => restoreDesign(item)}
              >
                <img src={item.snapshot} alt="Design snapshot" />
                <p>{new Date(item.id).toLocaleTimeString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="customization-page">
        <div className="customization-toggle">
          <button
            className={`toggle-btn ${
              customizationMode === "product" ? "active" : ""
            }`}
            onClick={() => setCustomizationMode("product")}
          >
            Product Customization
          </button>
          <button
            className={`toggle-btn ${
              customizationMode === "card" ? "active" : ""
            }`}
            onClick={() => setCustomizationMode("card")}
          >
            Tag Customization
          </button>
          <button
            className={`toggle-btn ${
              customizationMode === "bag" ? "active" : ""
            }`}
            onClick={() => setCustomizationMode("bag")}
          >
            Packaging
          </button>
        </div>

        {customizationMode === "product" ? (
          <div className="product-customization">
            <h1 className="product-name-header">
              <input
                type="text"
                value={productName}
                onChange={handleProductNameChange}
                className="product-name-input"
                placeholder="Name your custom product"
              />
            </h1>
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
                    <button
                      type="button"
                      onClick={() => triggerFileInput(productImageInputRef)}
                      className="upload-btn"
                    >
                      Select Product Image
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={productImageInputRef}
                      style={{ display: "none" }}
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
                <button
                  className="customization-btn-eco save-later-btn"
                  onClick={saveForLater}
                >
                  Save for Later
                </button>
              </div>

              {/* Uploaded Image Preview Section */}
              <div className="image-upload-preview">
                <h3>Uploaded Image Preview</h3>
                {uploadedImage ? (
                  <img
                    src={uploadedImage}
                    alt="Uploaded Preview"
                    className="uploaded-image-preview"
                  />
                ) : (
                  <p>No user-uploaded image yet.</p>
                )}
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
        ) : customizationMode === "card" ? (
          renderCardCustomization()
        ) : (
          renderBagCustomization()
        )}
      </div>

      <EcoFriendlyModal />
    </>
  );
};

export default Customization;
