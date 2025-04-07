import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar" data-aos="slide-right" data-aos-delay="200">
      <h3>Categories</h3>
      <ul>
        <li>Eco Gift Ideas</li>
        <li>Sustainable Living</li>
        <li>DIY Eco Projects</li>
        <li>Product Reviews</li>
      </ul>
      <h3>Popular Posts</h3>
      <ul>
        <li>10 Best Reusable Products</li>
        <li>How to Live a Zero-Waste Lifestyle</li>
        <li>Top 5 Eco-Friendly Brands</li>
      </ul>
    </div>
  );
};

export default Sidebar;