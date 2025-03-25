import React, { useState } from "react";

const ArticlesCaseStudies = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalId) => {
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const modalContents = {
    1: {
      title: "The Rise of Eco-Friendly Gifting: Why Consumers Prefer Sustainable Choices",
      date: "Published on: 12.19.2024",
      content: (
        <>
          <h4 className="ecogift-modal__subtitle">Introduction</h4>
          <p className="ecogift-modal__text">In today's world, sustainability is no longer just a trend it's a movement. Consumers are becoming more conscious about the impact of their purchases, especially when it comes to gifts. Eco-friendly gifting is gaining popularity as more people seek sustainable, ethical, and personalized gift options.</p>
          
          <h4 className="ecogift-modal__subtitle">Why Eco-Friendly Gifts Matter</h4>
          <ul className="ecogift-modal__list">
            <li className="ecogift-modal__list-item">🌱 Reduces Waste: Reusable and biodegradable materials help cut down on environmental pollution.</li>
            <li className="ecogift-modal__list-item">🌍 Lower Carbon Footprint: Sustainable production methods consume less energy and water.</li>
            <li className="ecogift-modal__list-item">🎁 More Thoughtful: A personalized eco-gift shows care for both the recipient and the planet.</li>
          </ul>
          
          <h4 className="ecogift-modal__subtitle">Top Trends in Eco-Friendly Gifting</h4>
          <p className="ecogift-modal__text">✅ Sustainable Materials – Gifts made from bamboo, recycled wood, or organic fabrics.</p>
          <p className="ecogift-modal__text">✅ Zero-Waste Packaging – Reusable, biodegradable, or plantable packaging.</p>
          <p className="ecogift-modal__text">✅ Personalization with Purpose – Engraving names/messages instead of using plastic decorations.</p>
          
          <h4 className="ecogift-modal__subtitle">Final Thoughts</h4>
          <p className="ecogift-modal__text">Eco-friendly gifting isn't just good for the environment it's good for business. By offering sustainable, customizable gifts, e-commerce platforms can attract environmentally conscious shoppers and boost customer loyalty.</p>
        </>
      )
    },
    2: {
      title: "How Personalization Enhances the Gifting Experience",
      date: "Published on: 02.24.2025",
      content: (
        <>
          <h4 className="ecogift-modal__subtitle">Introduction</h4>
          <p className="ecogift-modal__text">Gifting has evolved beyond buying generic items today, people want something unique and meaningful. Personalized gifts are booming in the e-commerce space, with businesses integrating customization features to enhance the customer experience.</p>
          
          <h4 className="ecogift-modal__subtitle">The Power of Personalization</h4>
          <p className="ecogift-modal__text">🔹 Creates Emotional Connections: A customized gift feels more special and thoughtful.</p>
          <p className="ecogift-modal__text">🔹 Increases Customer Satisfaction: People love having creative control over their purchases.</p>
          <p className="ecogift-modal__text">🔹 Boosts Brand Loyalty: Businesses that offer personalization see higher repeat purchases.</p>
          
          <h4 className="ecogift-modal__subtitle">How EcoGift Integrates Personalization</h4>
          <p className="ecogift-modal__text">💚 Whiteboard Customization – Customers can engrave text or upload images.</p>
          <p className="ecogift-modal__text">💚 Sustainable Printing Options – Laser engraving instead of ink-based printing.</p>
          <p className="ecogift-modal__text">💚 Eco-Friendly Gift Wrapping Choices – Customizable wrapping with recycled materials.</p>
          
          <h4 className="ecogift-modal__subtitle">Future of Personalized E-Gifting</h4>
          <p className="ecogift-modal__text">With the rise of AI and machine learning, the next step is AI-driven gift recommendations based on user preferences, creating a fully personalized shopping experience.</p>
        </>
      )
    },
    3: {
      title: "Case Study: How EcoGift's Sustainable Approach Reduced Packaging Waste by 50%",
      date: "Published on: 02.11.2025",
      content: (
        <>
          <h4 className="ecogift-modal__subtitle">Overview</h4>
          <p className="ecogift-modal__text">At EcoGift, our mission is to make gifting more sustainable. Over the past year, we focused on reducing packaging waste, improving inventory management, and enhancing personalization.</p>
          
          <h4 className="ecogift-modal__subtitle">The Challenge</h4>
          <p className="ecogift-modal__text">🛒 Traditional e-commerce packaging generates tons of plastic waste annually. Customers were demanding sustainable alternatives, but the challenge was maintaining packaging quality without increasing costs.</p>
          
          <h4 className="ecogift-modal__subtitle">The Solution</h4>
          <p className="ecogift-modal__text">✅ Switched to 100% Recycled Paper & Jute Bags – Eliminating plastic-based wrapping.</p>
          <p className="ecogift-modal__text">✅ Offered "No Packaging" Option – Customers could choose minimal packaging.</p>
          <p className="ecogift-modal__text">✅ Planted a Tree for Every Order – Engaging customers with a green initiative.</p>
          
          <h4 className="ecogift-modal__subtitle">Results & Impact</h4>
          <p className="ecogift-modal__text">📉 50% reduction in plastic packaging waste.</p>
          <p className="ecogift-modal__text">📈 30% increase in customer engagement for sustainable packaging.</p>
          <p className="ecogift-modal__text">💚 95% positive feedback from customers about eco-friendly choices.</p>
          
          <h4 className="ecogift-modal__subtitle">Key Takeaway</h4>
          <p className="ecogift-modal__text">By integrating sustainability into the user experience, businesses can achieve both environmental and financial benefits.</p>
        </>
      )
    }
  };

  return (
    <section className="ecogift-articles" data-aos="fade-up">
      <h2 className="ecogift-articles__title">Articles & Case Studies</h2>
      <div className="ecogift-articles__grid">
        <div className="ecogift-articles__card">
          <h3 className="ecogift-articles__card-title">Top 5 Sustainable Gift Wrapping Ideas</h3>
          <p className="ecogift-articles__card-text">Learn how to wrap gifts without harming the environment.</p>
          <button className="ecogift-articles__card-button" onClick={() => openModal(1)}>Read More</button>
        </div>
        <div className="ecogift-articles__card">
          <h3 className="ecogift-articles__card-title">Case Study: How Brands Are Going Green</h3>
          <p className="ecogift-articles__card-text">Explore how companies are adopting eco-friendly practices.</p>
          <button className="ecogift-articles__card-button" onClick={() => openModal(2)}>Read More</button>
        </div>
        <div className="ecogift-articles__card">
          <h3 className="ecogift-articles__card-title">The Rise of Eco-Friendly Packaging</h3>
          <p className="ecogift-articles__card-text">Discover the latest trends in sustainable packaging.</p>
          <button className="ecogift-articles__card-button" onClick={() => openModal(3)}>Read More</button>
        </div>
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="ecogift-modal__overlay">
          <div className="ecogift-modal__content">
            <button className="ecogift-modal__close-button" onClick={closeModal}>×</button>
            <h3 className="ecogift-modal__title">{modalContents[activeModal].title}</h3>
            <p className="ecogift-modal__date">{modalContents[activeModal].date}</p>
            <div className="ecogift-modal__body">
              {modalContents[activeModal].content}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ArticlesCaseStudies;