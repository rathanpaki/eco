import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { db } from "../firebaseConfig";
import "../css/productDetails.css";
import Loader from "../components/Loader";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const productRef = ref(db, `produt/${productId}`); // Fixed typo here

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
    if (!localStorage.getItem("user")) {
      alert("Please log in to add items to your wishlist.");
      return;
    }
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
    return (
      <p style={{ textAlign: "center" }}>
        <Loader />
      </p>
    );
  }

  return (
    <div className="product-details">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">LKR {product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <p>
          <strong>Material:</strong> {product.material}
        </p>
        <p>
          <strong>Sustainability:</strong> {product.sustainability}
        </p>
        <p>
          <strong>Seller:</strong> {product.seller}
        </p>
        <span className="badge">{product.badge}</span>
        <div className="buttons">
          <button className="cart-btn" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
          <button
            className="wishlist-btn"
            onClick={() => addToWishlist(product)}
          >
            Add to Wishlist
          </button>
        </div>
        <div className="ar-preview">
          <button onClick={() => alert("AR preview coming soon!")}>
            View in AR
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
