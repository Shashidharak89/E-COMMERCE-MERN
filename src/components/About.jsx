import React from 'react';
import { ShoppingBag, Users, Award, Truck, Shield, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="about-page-container">
      <div className="about-header-section">
        <h1 className="about-main-title">About ShopX</h1>
        <div className="about-subtitle">Your Ultimate Shopping Destination</div>
      </div>

      <div className="about-content-wrapper">
        {/* Story Section */}
        <div className="about-story-card">
          <div className="story-icon-wrapper">
            <ShoppingBag size={60} className="story-main-icon" />
          </div>
          <div className="story-content">
            <h2 className="story-title">Our Story</h2>
            <p className="story-paragraph">
              Welcome to <span className="brand-highlight">ShopX</span>, where shopping meets innovation! Founded in 2025, we've revolutionized the online shopping experience by bringing you the finest collection of fashion, technology, and lifestyle products all under one digital roof.
            </p>
            <p className="story-paragraph">
              What started as a small dream has grown into a thriving marketplace that connects millions of customers with premium products from around the world. We believe that great shopping should be accessible, enjoyable, and trustworthy.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="about-mission-card">
          <div className="mission-icon-wrapper">
            <Award size={50} />
          </div>
          <div className="mission-content">
            <h2 className="mission-title">Our Mission</h2>
            <p className="mission-text">
              To provide an unparalleled online shopping experience by delivering premium quality products at competitive prices, backed by exceptional customer service and innovative technology solutions.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="about-values-section">
          <h2 className="about-section-title">Why Choose ShopX?</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon-wrapper">
                <Shield size={40} />
              </div>
              <div className="value-content">
                <h3 className="value-title">Trusted & Secure</h3>
                <p className="value-description">
                  Your security is our priority. We use advanced encryption and secure payment gateways to protect your data.
                </p>
              </div>
            </div>
            
            <div className="value-card">
              <div className="value-icon-wrapper">
                <Truck size={40} />
              </div>
              <div className="value-content">
                <h3 className="value-title">Fast Delivery</h3>
                <p className="value-description">
                  Lightning-fast shipping with real-time tracking. Get your orders delivered right to your doorstep.
                </p>
              </div>
            </div>
            
            <div className="value-card">
              <div className="value-icon-wrapper">
                <Users size={40} />
              </div>
              <div className="value-content">
                <h3 className="value-title">24/7 Support</h3>
                <p className="value-description">
                  Our dedicated customer support team is always ready to help you with any questions or concerns.
                </p>
              </div>
            </div>
            
            <div className="value-card">
              <div className="value-icon-wrapper">
                <Heart size={40} />
              </div>
              <div className="value-content">
                <h3 className="value-title">Customer First</h3>
                <p className="value-description">
                  Every decision we make is centered around providing you with the best possible shopping experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="about-stats-section">
          <h2 className="about-section-title">ShopX by Numbers</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">1M+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="about-cta-card">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Shopping?</h2>
            <p className="cta-text">
              Join millions of satisfied customers who trust ShopX for their shopping needs. 
              Discover amazing products and unbeatable deals today!
            </p>
            <button className="cta-button">
              Start Shopping Now
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-page-container {
          min-height: 100vh;
          background: #f8f9fa;
          padding: 20px;
          font-family: 'Arial', sans-serif;
        }

        .about-header-section {
          text-align: center;
          margin-bottom: 40px;
          padding: 40px 0;
        }

        .about-main-title {
          font-size: 3rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 10px;
        }

        .about-subtitle {
          font-size: 1.2rem;
          color: #666;
          font-weight: 300;
        }

        .about-content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .about-story-card {
          background: white;
          border-radius: 15px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 30px;
          animation: fadeInUp 0.6s ease-out;
        }

        .story-icon-wrapper {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 50%;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .story-main-icon {
          color: white;
        }

        .story-content {
          flex: 1;
        }

        .story-title {
          font-size: 2rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 20px;
        }

        .story-paragraph {
          color: #666;
          line-height: 1.6;
          margin-bottom: 15px;
          font-size: 1.1rem;
        }

        .brand-highlight {
          color: #667eea;
          font-weight: bold;
        }

        .about-mission-card {
          background: white;
          border-radius: 15px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 30px;
          animation: fadeInUp 0.6s ease-out 0.1s both;
        }

        .mission-icon-wrapper {
          background: linear-gradient(135deg, #f093fb, #f5576c);
          border-radius: 50%;
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: white;
        }

        .mission-title {
          font-size: 1.8rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 15px;
        }

        .mission-text {
          color: #666;
          line-height: 1.6;
          font-size: 1.1rem;
        }

        .about-values-section {
          background: white;
          border-radius: 15px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          animation: fadeInUp 0.6s ease-out 0.2s both;
        }

        .about-section-title {
          font-size: 2rem;
          font-weight: bold;
          color: #333;
          text-align: center;
          margin-bottom: 30px;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
        }

        .value-card {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 25px;
          display: flex;
          align-items: flex-start;
          gap: 15px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .value-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .value-icon-wrapper {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: white;
        }

        .value-title {
          font-size: 1.2rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 10px;
        }

        .value-description {
          color: #666;
          line-height: 1.5;
          font-size: 0.95rem;
        }

        .about-stats-section {
          background: white;
          border-radius: 15px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          animation: fadeInUp 0.6s ease-out 0.3s both;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 25px;
        }

        .stat-card {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 12px;
          padding: 30px;
          text-align: center;
          color: white;
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: scale(1.05);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .stat-label {
          font-size: 1rem;
          opacity: 0.9;
        }

        .about-cta-card {
          background: white;
          border-radius: 15px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          text-align: center;
          animation: fadeInUp 0.6s ease-out 0.4s both;
        }

        .cta-title {
          font-size: 2rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 15px;
        }

        .cta-text {
          color: #666;
          line-height: 1.6;
          margin-bottom: 30px;
          font-size: 1.1rem;
        }

        .cta-button {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 15px 35px;
          border-radius: 25px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .about-main-title {
            font-size: 2rem;
          }

          .about-story-card,
          .about-mission-card {
            flex-direction: column;
            text-align: center;
          }

          .story-icon-wrapper,
          .mission-icon-wrapper {
            margin-bottom: 20px;
          }

          .about-content-wrapper {
            padding: 0 10px;
          }

          .values-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default About;