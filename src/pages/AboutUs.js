import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import "../css/aboutus.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AboutUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="about-us">
        <h1 data-aos="fade-down" data-aos-duration="1000">
          EcoGifts – Sustainable & customizable Wedding Return Gifts
        </h1>
        <section data-aos="fade-right" data-aos-duration="1000">
          <h2>Our Story</h2>
          <p>
            At EcoGifts, we believe that every wedding should leave lasting
            memories—not waste. Born from a passion for sustainability and
            personalization, we set out to redefine the art of wedding return
            gifts. Our platform offers eco-friendly, handcrafted, and
            customizable gifts that reflect both love and responsibility for the
            planet.
          </p>
        </section>
        <section data-aos="fade-left" data-aos-duration="1000">
          <h2>Our Mission</h2>
          <p>
            We are committed to sustainability, innovation, and personalization.
            Our mission is to provide couples and event hosts with meaningful,
            stylish, and environmentally responsible gifts. By integrating smart
            inventory management and green logistics, we ensure minimal waste
            and ethical sourcing.
          </p>
        </section>
        <section data-aos="fade-up" data-aos-duration="1000">
          <h2>Why Choose EcoGifts?</h2>
          <ul>
            <li>
              Sustainable Selections – Biodegradable, plant-based, and upcycled
              gifts that leave a positive impact.
            </li>
            <li>
              Personalized Gifting – Add a personal touch with our interactive
              whiteboard customization tool.
            </li>
            <li>
              Smart Inventory & Delivery – AI-powered stock optimization to
              reduce waste and ensure timely, eco-friendly delivery.
            </li>
            <li>
              Ethically Sourced & Handcrafted – Supporting local artisans and
              sustainable manufacturers.
            </li>
            <li>
              Eco-Conscious Shopping – A seamless, user-friendly experience with
              a commitment to green living.
            </li>
          </ul>
        </section>
        <section data-aos="zoom-in" data-aos-duration="1000">
          <h2>Our Green Commitment</h2>
          <p>
            We are more than just an e-commerce store—we are a movement. Every
            product we offer is curated with sustainability in mind, and every
            order placed contributes to a cleaner planet. With carbon-neutral
            shipping, recyclable packaging, and ethical sourcing, EcoGifts is
            paving the way for a greener tomorrow.
          </p>
        </section>
        <section data-aos="zoom-out" data-aos-duration="1000">
          <h2>Join Us in Making a Difference!</h2>
          <p>
            Whether you’re planning a wedding, a special celebration, or simply
            want to spread joy with thoughtful, sustainable gifts, EcoGifts is
            here for you. Choose gifts that matter—because love and
            sustainability go hand in hand.
          </p>
        </section>
        <p data-aos="fade-up" data-aos-duration="1000">
          🌿 EcoGifts – Thoughtful Gifting, Sustainable Living. 🌎
        </p>
        <button className="contact-us-button" onClick={openModal}>
          Contact Us
        </button>
      </div>

      {/* Contact Us Modal */}
      {isModalOpen && (
        <div className="about-us-modal-overlay">
          <div className="about-us-modal-content">
            <button className="about-us-close-modal" onClick={closeModal}>
              &times;
            </button>
            <h2>Contact Us</h2>
            <form>
              <div className="about-us-form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Enter your name" />
              </div>
              <div className="about-us-form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" />
              </div>
              <div className="about-us-form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Enter your message"
                ></textarea>
              </div>
              <button type="submit" className="about-us-submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutUs;
