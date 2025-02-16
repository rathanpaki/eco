import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { db } from "../firebaseConfig";
import "../css/productDetails.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const productRef = ref(db, `produt/${productId}`);

    const unsubscribe = onValue(
      productRef,
      (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            setProduct(data);
          } else {
            setError("Product not found.");
          }
        } catch (err) {
          console.error("Error processing Firebase data:", err);
          setError("Failed to load product details.");
        }
      },
      (err) => {
        console.error("Firebase data fetch error:", err);
        setError("Error fetching product details from Firebase.");
      }
    );

    return () => unsubscribe();
  }, [productId]);

  const addToCart = (product) => {
    try {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Product added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const addToWishlist = (product) => {
    try {
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("Product added to wishlist!");
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  if (!product) {
    return <p style={{ textAlign: "center" }}>Loading product details...</p>;
  }

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} className="product-image" />
      <p className="price">lkr {product.price.toFixed(2)}</p>
      <p>{product.description}</p>
      <span className="badge">{product.badge}</span>
      <button className="btn primary" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
      <button className="btn wishlist" onClick={() => addToWishlist(product)}>
        Add to Wishlist
      </button>
    </div>
  );
};

export default ProductDetails;
