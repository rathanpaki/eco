import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../css/shop.css";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
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
            setFilteredProducts(productsArray);
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

  const filterProducts = (badge) => {
    if (badge === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.badge === badge)
      );
    }
  };

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

  const navigateToProductDetails = (product) => {
    if (product.badge === "Personalized 🎁") {
      navigate("/customize", { state: { product } });
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <h1
        style={{
          color: "#388e3c",
          textAlign: "center",
          fontSize: "2rem",
          marginTop: "1rem",
        }}
      >
        Our Products
      </h1>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <div className="filter-buttons">
        <button className="btn all" onClick={() => filterProducts("all")}>
          All
        </button>
        <button
          className="btn personalized"
          onClick={() => filterProducts("Personalized 🎁")}
        >
          Personalized
        </button>
        <button
          className="btn eco"
          onClick={() => filterProducts("Biodegradable 🌿")}
        >
          Eco
        </button>
        <button
          className="btn handmade"
          onClick={() => filterProducts("Recycled ♻️")}
        >
          Recycled
        </button>
        <button
          className="btn nature"
          onClick={() => filterProducts("Nature-Inspired 🌿")}
        >
          Nature
        </button>
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => navigateToProductDetails(product)}
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
          <p style={{ textAlign: "center" }}>
            <Loader />
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default Shop;
