import React, { useState, useEffect } from "react";
import "../css/shoppingCart.css";
import productData from "../Data/data.json";

const ShoppingCart = () => {
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

  const subTotal = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {cartItems.map((item, index) => (
        <div className="cart-item" key={index}>
          <img
            src={productData.produt[item.id].image}
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
            <p>lkr {item.price}</p>
            <a href="#" onClick={() => handleRemove(index)}>
              Remove
            </a>
          </div>
        </div>
      ))}
      <div className="cart-summary">
        <p>Sub-Total</p>
        <p>lkr {subTotal}</p>
      </div>
      <button className="checkout-button">Checkout</button>
    </div>
  );
};

export default ShoppingCart;
