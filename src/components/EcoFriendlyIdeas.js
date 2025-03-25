import React from "react";

const EcoFriendlyIdeas = () => {
  return (
    <section className="eco-friendly-ideas" data-aos="fade-up">
      <h2>Eco-Friendly Ideas</h2>
      <div className="ideas-grid">
        <div className="idea-card">
          <h3>DIY Reusable Gift Bags</h3>
          <p>Create your own reusable gift bags from old fabrics.</p>
        </div>
        <div className="idea-card">
          <h3>Plantable Seed Paper</h3>
          <p>Make seed paper that grows into plants when planted.</p>
        </div>
        <div className="idea-card">
          <h3>Upcycled Home Decor</h3>
          <p>Turn old items into beautiful home decor pieces.</p>
        </div>
        <div className="idea-card">
          <h3>Compostable Wrapping Paper</h3>
          <p>Use wrapping paper that can be composted after use.</p>
        </div>
        <div className="idea-card">
          <h3>Solar-Powered Gadgets</h3>
          <p>
            Gift gadgets that run on solar energy to reduce electricity usage.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EcoFriendlyIdeas;
