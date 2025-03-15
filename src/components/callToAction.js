import React from "react";

const CallToAction = () => {
  const navigateToShop = () => {
    window.location.href = "/shop";
  };

  return (
    <div className="call-to-action" data-aos="fade-up" data-aos-delay="400">
      <h2>Love these eco-friendly gift ideas?</h2>
      <p>Shop our curated collection of sustainable products!</p>
      <button onClick={navigateToShop}>Shop Now</button>
    </div>
  );
};

export default CallToAction;
