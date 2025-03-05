import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/customization.css";

const Customization = () => {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#000000");
  const [font, setFont] = useState("Arial");
  const [image, setImage] = useState(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};

  useEffect(() => {
    if (product) {
      setImage(product.image);
    }
  }, [product]);

  useEffect(() => {
    drawCanvas();
  }, [text, color, font, image]);

  const handleTextChange = (e) => setText(e.target.value);
  const handleColorChange = (e) => setColor(e.target.value);
  const handleFontChange = (e) => setFont(e.target.value);
  const handleImageChange = (e) =>
    setImage(URL.createObjectURL(e.target.files[0]));

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        drawText(ctx);
      };
    } else {
      drawText(ctx);
    }
  };

  const drawText = (ctx) => {
    ctx.fillStyle = color;
    ctx.font = `20px ${font}`;
    ctx.fillText(text, 50, 50);
  };

  const handleSaveDesign = () => {
    const canvas = canvasRef.current;
    const design = canvas.toDataURL();
    localStorage.setItem("savedDesign", design);
    alert("Design saved!");
  };

  const handleProceedToCheckout = () => {
    handleSaveDesign();
    navigate("/checkout");
  };

  return (
    <div className="customization-page-eco">
      <h1>Customize Your Gift</h1>
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
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <canvas
        ref={canvasRef}
        width="500"
        height="500"
        className="customization-canvas-eco"
      />
      <button className="customization-btn-eco" onClick={drawCanvas}>
        Preview
      </button>
      <button className="customization-btn-eco" onClick={handleSaveDesign}>
        Save Design
      </button>
      <button
        className="customization-btn-eco"
        onClick={handleProceedToCheckout}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Customization;
