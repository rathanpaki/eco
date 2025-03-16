import React from "react";
import image from "../img/eco-friendly-gifts.jpg";

const BlogContent = () => {
  return (
    <div className="blog-content">
      <h1 data-aos="slide-left">
        Eco-Friendly Gifts: Thoughtful Presents for a Sustainable Future
      </h1>
      <p className="author-date" data-aos="fade-up" data-aos-delay="200">
        By Jane Doe | October 10, 2023
      </p>
      <img
        src={image}
        alt="Eco-Friendly Gifts"
        className="featured-image"
        data-aos="zoom-in"
        data-aos-delay="400"
      />
      <div className="content-list-container">
        <div className="content">
          <h2 data-aos="slide-left" data-aos-delay="600">
            Why Choose Eco-Friendly Gifts?
          </h2>
          <p data-aos="fade-up" data-aos-delay="800">
            Traditional gift-giving often involves products that are
            mass-produced, wrapped in plastic, and shipped long distances,
            contributing to pollution and waste. Eco-friendly gifts, on the
            other hand, are made from sustainable materials, support ethical
            practices, and often have a smaller environmental impact.
          </p>
        </div>
        <div className="list">
          <h2 data-aos="slide-left" data-aos-delay="1000">
            Top Eco-Friendly Gift Ideas
          </h2>
          <ul data-aos="fade-up" data-aos-delay="1200">
            <li>Reusable Shopping Bags</li>
            <li>Bamboo Kitchenware</li>
            <li>Eco-Friendly Skincare Sets</li>
            <li>Reusable Water Bottles or Coffee Cups</li>
            <li>Indoor Plants or Seed Kits</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
