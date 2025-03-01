import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Gift from "../img/gift-icon.png";
import AI from "../img/ai-icon.png";
import AR from "../img/ar-icon.png";
import Eco from "../img/eco-icon.png";
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
        <a href="/shop" className="btn">
          Shop Now
        </a>
        <a href="/personalization" className="btn">
          Customize Gift
        </a>
      </header>
      <section className="features">
        <div className="feature fade-in">
          <img src={Gift} alt="Gifts" />
          <h4>Browse Gifts 🛍️</h4>
          <p>Explore eco-friendly wedding return gifts.</p>
        </div>
        <div className="feature fade-in">
          <img src={AI} alt="AI Finder" />
          <h4>Smart Gift Finder 🤖</h4>
          <p>AI-powered personalized recommendations.</p>
        </div>
        <div className="feature fade-in">
          <img src={AR} alt="AR Preview" />
          <h4>AR Gift Preview 🌍</h4>
          <p>Visualize gifts before purchase.</p>
        </div>
        <div className="feature fade-in">
          <img src={Eco} alt="Sustainability" />
          <h4>Why Eco-Gifts? 🌱</h4>
          <p>Learn about our sustainable practices.</p>
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
