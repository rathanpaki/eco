import React, { useState, useEffect } from "react";
import "../css/shoppingCart.css";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ref, set } from "firebase/database";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShoppingCart = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = cart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(cart);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleIncrease = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index] = {
      ...newCartItems[index],
      quantity: newCartItems[index].quantity + 1,
    };
    setCartItems(newCartItems);
    localStorage.setItem("cart", JSON.stringify(newCartItems));
  };

  const handleDecrease = (index) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity -= 1;
      setCartItems(newCartItems);
      localStorage.setItem("cart", JSON.stringify(newCartItems));
    }
  };

  const handleRemove = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
    localStorage.setItem("cart", JSON.stringify(newCartItems));
  };

  const addProductToCart = (product) => {
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );
    let newCartItems;
    if (existingProductIndex !== -1) {
      newCartItems = [...cartItems];
      newCartItems[existingProductIndex].quantity += 1;
    } else {
      newCartItems = [...cartItems, { ...product, quantity: 1 }];
    }
    setCartItems(newCartItems);
    localStorage.setItem("cart", JSON.stringify(newCartItems));
  };

  const handleCheckout = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.error("Please log in to proceed to checkout.");
      navigate("/login");
      return;
    }
    const orderDetails = {
      id: new Date().getTime().toString(),
      details: {
        items: cartItems,
        subtotal: parseFloat(subTotal),
        deliveryCost: 5.5,
      },
      payment: {},
    };
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    toast.success("Redirecting to checkout...");
    navigate("/checkout", { state: { orderDetails } });
  };

  const subTotal = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  if (!isOpen) return null;

  return (
    <div className="shopping-cart">
      <button className="close-cart" onClick={onClose}>
        X
      </button>{" "}
      <h2>Shopping Cart</h2>
      <div className="cart-content">
        {cartItems.length === 0 ? (
          <p>Your cart is empty 😔</p>
        ) : (
          cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>{item.size}</p>
                <div className="quantity-control">
                  <button onClick={() => handleDecrease(index)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrease(index)}>+</button>
                </div>
              </div>
              <div className="item-price">
                <p>LKR {item.price * item.quantity}</p>
                <a href="#" onClick={() => handleRemove(index)}>
                  Remove
                </a>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-summary">
        <p>
          <strong>Sub-Total:</strong> LKR {subTotal}
        </p>
        <button className="checkout-button" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
