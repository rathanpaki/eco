import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <header
        className="hero"
      >
        <h1>Make Your Wedding Green & Personal!</h1>
        <p>Personalized & Eco-friendly gifts for your special occasions.</p>
        <a href="productList.html" className="btn">
          Shop Now
        </a>
        <a href="personalization.html" className="btn">
          Customize Gift
        </a>
      </header>
      <section className="features">
        <div className="feature fade-in">
          <img src="assets/img/gift-icon.png" alt="Gifts" />
          <h4>Browse Gifts 🛍️</h4>
          <p>Explore eco-friendly wedding return gifts.</p>
        </div>
        <div className="feature fade-in">
          <img src="assets/img/ai-icon.png" alt="AI Finder" />
          <h4>Smart Gift Finder 🤖</h4>
          <p>AI-powered personalized recommendations.</p>
        </div>
        <div className="feature fade-in">
          <img src="assets/img/ar-icon.png" alt="AR Preview" />
          <h4>AR Gift Preview 🌍</h4>
          <p>Visualize gifts before purchase.</p>
        </div>
        <div className="feature fade-in">
          <img src="assets/img/eco-icon.png" alt="Sustainability" />
          <h4>Why Eco-Gifts? 🌱</h4>
          <p>Learn about our sustainable practices.</p>
        </div>
      </section>
      <section className="featured-products">
        <h2>Featured Sustainable Products</h2>
        <div className="product-grid">
          <div className="product">
            <img src="assets/img/hero1.jpg" alt="Product 1" />
            <h3>Eco-friendly Candle</h3>
            <p>lkr 500.00</p>
          </div>
          <div className="product">
            <img src="assets/img/product29.jpg" alt="Product 2" />
            <h3>Bamboo Sunglasses</h3>
            <p>lkr 5200.00</p>
          </div>
          <div className="product">
            <img src="assets/img/product26.jpg" alt="Product 3" />
            <h3>Dried Flower Wedding Keepsakes</h3>
            <p>lkr 2800.00</p>
          </div>
        </div>
      </section>
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div>
          <div className="testimonial fade-in">
            <p>
              "EcoGifts made our wedding special and sustainable!" - Jane D.
            </p>
          </div>
          <div className="testimonial fade-in">
            <p>"The personalized gifts were a hit at our wedding!" - John S.</p>
          </div>
        </div>
      </section>
      <section className="eco-impact">
        <h2>Our Eco-Impact</h2>
        <p style={{ fontSize: "2rem", fontWeight: "bold" }}>
          We've helped reduce waste by over 10,000 pounds through sustainable
          gifting.
        </p>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
