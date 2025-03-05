import React, { useState, useEffect } from "react";
import "../css/shoppingCart.css";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ref, set } from "firebase/database";
import { db } from "../firebaseConfig";

const ShoppingCart = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
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

  const saveOrderToFirebase = (orderDetails) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const orderRef = ref(db, `orders/${user.uid}/${orderDetails.id}`);
      set(orderRef, orderDetails);
    }
  };

  const handleCheckout = () => {
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
  };

  const subTotal = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  if (!isOpen) return null; // Don't render the cart if it's not open

  return (
    <div className="shopping-cart">
      <button className="close-cart" onClick={onClose}>
        X
      </button>{" "}
      {/* Close Button */}
      <h2>Shopping Cart</h2>
      <div className="cart-content">
        {cartItems.length === 0 ? (
          <p>Your cart is empty 😔</p>
        ) : (
          cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <img
                src={item.image}
                alt={item.name}
                className="item-image"
              />
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
                <p>LKR {item.price}</p>
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
        <Link to="/checkout">
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ShoppingCart;
