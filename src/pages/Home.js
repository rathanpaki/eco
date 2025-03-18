import React, { useEffect, useState } from "react";
import { initScrollAnimations } from "../utils/scrollAnimations";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Gift from "../img/gift-icon.png";
import AI from "../img/ai-icon.png";
import AR from "../img/ar-icon.png";
import Eco from "../img/eco-icon.png";
import "../css/home.css";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../components/Modal"; 

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    initScrollAnimations();
  }, []);

  const handleFeatureClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <Navbar />
      <header className="hero">
        <h1 className="fade-in gradient-text">
          Make Your Wedding Green & Personal!
        </h1>
        <p className="fade-in">
          Personalized & Eco-friendly gifts for your special occasions.
        </p>
        <a href="/shop" className="btn fade-in">
          Shop Now
        </a>
        <a href="/community" className="btn fade-in">
          Community
        </a>
      </header>
      <section className="features">
        <div
          className="feature fade-in slide-in-left"
          onClick={handleFeatureClick}
        >
          <img src={Gift} alt="Gifts" />
          <h4>Browse Gifts 🛍️</h4>
          <p>Explore eco-friendly wedding return gifts.</p>
        </div>
        <div
          className="feature fade-in slide-in-right"
          onClick={handleFeatureClick}
        >
          <img src={AI} alt="AI Finder" />
          <h4>Smart Gift Finder 🤖</h4>
          <p>AI-powered personalized recommendations.</p>
        </div>
        <div
          className="feature fade-in slide-in-left"
          onClick={handleFeatureClick}
        >
          <img src={AR} alt="AR Preview" />
          <h4>AR Gift Preview 🌍</h4>
          <p>Visualize gifts before purchase.</p>
        </div>
        <div
          className="feature fade-in slide-in-right"
          onClick={handleFeatureClick}
        >
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
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="modal-t">Coming Soon</h2>
          <p className="modal-p">This feature is coming soon. Stay tuned!</p>
        </Modal>
      )}
    </div>
  );
};

export default Home;
