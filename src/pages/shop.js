import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../css/shop.css";
import Navbar from "../components/Navbar";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const productsRef = ref(db, "produt");

    console.log(products);
    const unsubscribe = onValue(
      productsRef,
      (snapshot) => {
        try {
          const data = snapshot.val();
          console.log("Firebase data:", data);
          if (data) {
            const productsArray = Object.entries(data).map(([id, product]) => ({
              id,
              ...product,
            }));
            setProducts(productsArray);
            console.log(productsArray);
          }
        } catch (err) {
          console.error("Error processing Firebase data:", err);
          setError("Failed to load products.");
        }
      },
      (err) => {
        console.error("Firebase data fetch error:", err);
        setError("Error fetching products from Firebase.");
      }
    );

    return () => unsubscribe();
  }, []);

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

  const navigateToProductDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div>
        <div>
            <Navbar/>
        </div>
      <h1 style={{ color: "#388e3c", textAlign: "center", fontSize: "2rem" }}>
        Our Products
      </h1>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => navigateToProductDetails(product.id)}
            >
              <span className="badge">{product.badge}</span>
              <div className="product-image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </div>
              <h3>{product.name}</h3>
              <p className="price">lkr {product.price.toFixed(2)}</p>
              <p>{product.description}</p>
              <button
                className="btn primary"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
              <button
                className="btn wishlist"
                onClick={() => addToWishlist(product)}
              >
                Add to Wishlist
              </button>
            </div>
          ))
        ) : !error ? (
          <p style={{ textAlign: "center" }}>Loading products...</p>
        ) : null}
      </div>
    </div>
  );
};

export default Shop;
