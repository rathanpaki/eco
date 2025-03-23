import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { initScrollAnimations } from "../utils/scrollAnimations";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/home.css";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../components/Modal";
import product1 from "../img/product2.jpg";
import product2 from "../img/product3.jpg";
import product3 from "../img/product4.jpg";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalTreesPlanted, setTotalTreesPlanted] = useState(12345); 

  // Hardcoded product data
  const [trendingProducts] = useState([
    {
      id: 2,
      badge: "Personalized 🎁",
      image: product1,
      name: "Handmade Clay Candle Holders",
      price: 1800,
      description: "Biodegradable and customizable.",
      material: "Clay",
      sustainability: "CO2 Savings: 65%, Biodegradability: 100%",
      seller: "Local Artisan - Tharushi Creations",
    },
    {
      id: 3,
      badge: "Personalized 🎁",
      image: product2,
      name: "Eco-Friendly Wooden Photo Frames",
      price: 3500,
      description: "Personalized engraving available.",
      material: "Sustainable Wood",
      sustainability: "CO2 Savings: 70%, Biodegradability: 95%",
      seller: "Local Artisan - Tharushi Creations",
    },
    {
      id: 4,
      badge: "Personalized 🎁",
      image: product3,
      name: "Recycled Paper Journals",
      price: 1200,
      description: "Custom covers, wedding-themed.",
      material: "Recycled Paper",
      sustainability: "CO2 Savings: 80%, Biodegradability: 100%",
      seller: "Local Artisan - Tharushi Creations",
    },
  ]);

  useEffect(() => {
    initScrollAnimations();
  }, []);

  const handleFeatureClick = () => {
    setIsModalOpen(true);
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
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
      {/* New Section for Total Trees Planted */}
      <section className="total-trees-planted">
        <h2 className="fade-in">
          EcoGift has planted {totalTreesPlanted} trees thanks to our customers!
          🌍
        </h2>
      </section>
      <section className="trending-products">
        <h2 className="fade-in">Trending Products</h2>
        <Slider {...carouselSettings}>
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="product-card fade-in"
              style={{ margin: "0 10px" }}
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
              <a href={`/product/${product.id}`} className="btn primary">
                View Details
              </a>
            </div>
          ))}
        </Slider>
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
