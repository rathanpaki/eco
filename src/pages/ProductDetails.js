import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue, push } from "firebase/database";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import "../css/productDetails.css";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [user, setUser] = useState(null);

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

    const reviewsRef = ref(db, `reviews/${productId}`);

    const unsubscribeReviews = onValue(
      reviewsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setReviews(Object.values(data));
        }
      },
      (err) => {
        console.error("Firebase data fetch error:", err);
      }
    );

    return () => {
      unsubscribe();
      unsubscribeReviews();
    };
  }, [productId]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const addToCart = (product) => {
    try {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Product added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Error adding to cart.");
    }
  };

  const addToWishlist = (product) => {
    if (!localStorage.getItem("user")) {
      toast.error("Please log in to add items to your wishlist.");
      return;
    }
    try {
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      toast.success("Product added to wishlist!");
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      toast.error("Error adding to wishlist.");
    }
  };

  const handleReviewSubmit = async () => {
    if (!reviewText.trim() || rating <= 0) {
      toast.error("Please provide a valid review and rating.");
      return;
    }

    try {
      const reviewData = {
        user: user.displayName || user.email,
        comment: reviewText.trim(),
        rating,
      };

      const productReviewRef = ref(db, `reviews/${productId}`);
      const userReviewRef = ref(db, `userReviews/${user.uid}/${productId}`);

      await push(productReviewRef, reviewData);
      await push(userReviewRef, reviewData);

      setReviews((prevReviews) => [...prevReviews, reviewData]);
      setReviewText("");
      setRating(0);
      toast.success("Review submitted successfully!");
    } catch (err) {
      console.error("Error submitting review:", err);
      toast.error("Error submitting review.");
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
      </div>
      <div className="reviews-section">
        <h2>Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review">
              <p>
                <strong>{review.user}</strong>
              </p>
              <p>{review.comment}</p>
              <p>Rating: {review.rating}/5</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
        {user && (
          <div className="review-form">
            <h3>Leave a Review</h3>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              rows="4"
            />
            <div className="rating">
              <label>Rating: </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <option value="0">Select Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <button onClick={handleReviewSubmit}>Submit Review</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
