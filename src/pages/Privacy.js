import React from "react";

const Privacy = () => {
  return (
    <div>
      <style>
        {`
          .privacy-container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            font-family: Arial, sans-serif;
          }
          .privacy-title {
            text-align: center;
            color: #388E3C;
          }
          .privacy-heading {
            color: #2E7D32;
            margin-top: 20px;
          }
          .privacy-text {
            font-size: 16px;
            color: #333;
            line-height: 1.6;
          }
          .privacy-list {
            padding-left: 20px;
            list-style-type: none; 
          }
          .privacy-list li {
            margin-bottom: 10px;
            text-decoration: none;
          }
          .privacy-email {
            font-weight: bold;
            color: #388E3C;
          }
          .privacy-email a {
            text-decoration: none;
            color: #388E3C;
          }
          .privacy-email a:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <div className="privacy-container">
        <h1 className="privacy-title">🌿 Privacy Policy | EcoGifts</h1>

        <h2 className="privacy-heading">1. Introduction</h2>
        <p className="privacy-text">
          Welcome to EcoGifts, your destination for sustainable and personalized
          wedding return gifts. Your privacy is important to us, and we are
          committed to safeguarding your personal data. This Privacy Policy
          explains how we collect, use, and protect your information.
        </p>

        <h2 className="privacy-heading">2. What Information We Collect</h2>
        <p className="privacy-text">
          When you visit our website, make a purchase, or sign up for our
          services, we may collect:
        </p>
        <ul className="privacy-list">
          <li>
            <strong>Personal Information:</strong> Name, email, phone number,
            shipping address.
          </li>
          <li>
            <strong>Payment Details:</strong> Processed securely via third-party
            payment providers (we do not store your credit card information).
          </li>
          <li>
            <strong>Order History:</strong> For better recommendations and
            seamless customer service.
          </li>
          <li>
            <strong>Cookies & Tracking Data:</strong> Used to enhance user
            experience and analyze website trends.
          </li>
        </ul>

        <h2 className="privacy-heading">3. How We Use Your Information</h2>
        <ul className="privacy-list">
          <li>✅ Process orders and ensure on-time delivery.</li>
          <li>
            ✅ Improve your shopping experience with personalized
            recommendations.
          </li>
          <li>✅ Provide customer support and address any inquiries.</li>
          <li>✅ Enhance website functionality and security.</li>
          <li>
            ✅ Send updates, promotions, and eco-conscious insights (only with
            your consent).
          </li>
        </ul>

        <h2 className="privacy-heading">4. Data Security & Protection</h2>
        <ul className="privacy-list">
          <li>
            🔒 Secure encryption technology to protect your personal data.
          </li>
          <li>
            🔒 Trusted payment gateways (like Stripe & PayPal) for safe
            transactions.
          </li>
          <li>
            🔒 Strict access control policies to prevent unauthorized data
            usage.
          </li>
        </ul>

        <h2 className="privacy-heading">5. Your Rights & Choices</h2>
        <ul className="privacy-list">
          <li>✔ Access, update, or delete your personal data.</li>
          <li>✔ Opt out of marketing communications at any time.</li>
          <li>✔ Request a copy of the data we hold on you.</li>
        </ul>

        <h2 className="privacy-heading">6. Cookies & Tracking Technologies</h2>
        <p className="privacy-text">We use cookies to:</p>
        <ul className="privacy-list">
          <li>Improve website functionality and personalization.</li>
          <li>Track shopping behavior for a seamless user experience.</li>
          <li>Provide relevant ads and offers based on your interests.</li>
        </ul>
        <p className="privacy-text">
          You can manage cookie preferences in your browser settings.
        </p>

        <h2 className="privacy-heading">7. Third-Party Services</h2>
        <p className="privacy-text">
          We only work with trusted third-party partners for payment processing,
          logistics, and analytics. Your data is never sold or shared without
          your explicit consent.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
