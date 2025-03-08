// Home.js
import React, { useEffect } from "react";
import { initScrollAnimations } from "../utils/scrollAnimations";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Gift from "../img/gift-icon.png";
import AI from "../img/ai-icon.png";
import AR from "../img/ar-icon.png";
import Eco from "../img/eco-icon.png";
import "../css/home.css";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  useEffect(() => {
    initScrollAnimations();

    // Snowfall effect
    const createSnowflakes = () => {
      const snowfallContainer = document.querySelector(".snowfall");

      if (snowfallContainer) {
        for (let i = 0; i < 100; i++) {
          const snowflake = document.createElement("div");
          snowflake.classList.add("snowflake");
          snowflake.style.left = `${Math.random() * 100}vw`;
          snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
          snowflake.style.opacity = Math.random();
          snowflake.style.width = `${Math.random() * 10 + 5}px`;
          snowflake.style.height = snowflake.style.width;
          snowfallContainer.appendChild(snowflake);
        }
      }
    };
    createSnowflakes();
  }, []);

  return (
    <div>
      <div className="snowfall"></div>
      <Navbar />
      <header className="hero">
        <h1 className="fade-in">Make Your Wedding Green & Personal!</h1>
        <p className="fade-in">
          Personalized & Eco-friendly gifts for your special occasions.
        </p>
        <a href="/shop" className="btn fade-in">
          Shop Now
        </a>
        <a href="/customize" className="btn fade-in">
          Customize Gift
        </a>
      </header>
      <section className="features">
        <div className="feature fade-in slide-in-left">
          <img src={Gift} alt="Gifts" />
          <h4>Browse Gifts 🛍️</h4>
          <p>Explore eco-friendly wedding return gifts.</p>
        </div>
        <div className="feature fade-in slide-in-right">
          <img src={AI} alt="AI Finder" />
          <h4>Smart Gift Finder 🤖</h4>
          <p>AI-powered personalized recommendations.</p>
        </div>
        <div className="feature fade-in slide-in-left">
          <img src={AR} alt="AR Preview" />
          <h4>AR Gift Preview 🌍</h4>
          <p>Visualize gifts before purchase.</p>
        </div>
        <div className="feature fade-in slide-in-right">
          <img src={Eco} alt="Sustainability" />
          <h4>Why Eco-Gifts? 🌱</h4>
          <p>Learn about our sustainable practices.</p>
        </div>
      </section>

      <section className="testimonials">
        <h2 className="fade-in">What Our Customers Say</h2>
        <div>
          <div className="testimonial fade-in slide-in-left">
            <p>
              "EcoGifts made our wedding special and sustainable!" - Jane D.
            </p>
          </div>
          <div className="testimonial fade-in slide-in-right">
            <p>"The personalized gifts were a hit at our wedding!" - John S.</p>
          </div>
        </div>
      </section>
      <section className="eco-impact">
        <h2 className="fade-in">Our Eco-Impact</h2>
        <p className="fade-in" style={{ fontSize: "2rem", fontWeight: "bold" }}>
          We've helped reduce waste by over 10,000 pounds through sustainable
          gifting.
        </p>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
