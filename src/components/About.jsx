import React from 'react';
import { ShoppingBag, Users, Award, Truck, Shield, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">About ShopX</h1>
          <p className="hero-subtitle">Your Ultimate Shopping Destination</p>
          <div className="hero-decoration"></div>
        </div>
      </section>

      {/* Main Content */}
      <section className="main-content">
        <div className="container">
          {/* Story Section */}
          <div className="story-section">
            <h2 className="section-title">Our Story</h2>
            <div className="story-content">
              <div className="story-text">
                <p className="story-paragraph">
                  Welcome to <span className="brand-highlight">ShopX</span>, where shopping meets innovation! Founded in 2025, we've revolutionized the online shopping experience by bringing you the finest collection of fashion, technology, and lifestyle products all under one digital roof.
                </p>
                <p className="story-paragraph">
                  What started as a small dream has grown into a thriving marketplace that connects millions of customers with premium products from around the world. We believe that great shopping should be accessible, enjoyable, and trustworthy.
                </p>
              </div>
              <div className="story-visual">
                <div className="visual-element">
                  <ShoppingBag size={80} className="story-icon" />
                  <div className="visual-text">Since 2025</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="mission-section">
            <h2 className="section-title">Our Mission</h2>
            <div className="mission-card">
              <div className="mission-icon">
                <Award size={60} />
              </div>
              <div className="mission-content">
                <h3 className="mission-title">Excellence in Every Click</h3>
                <p className="mission-text">
                  To provide an unparalleled online shopping experience by delivering premium quality products at competitive prices, backed by exceptional customer service and innovative technology solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="values-section">
            <h2 className="section-title">Why Choose ShopX?</h2>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">
                  <Shield size={40} />
                </div>
                <h3 className="value-title">Trusted & Secure</h3>
                <p className="value-description">
                  Your security is our priority. We use advanced encryption and secure payment gateways to protect your data.
                </p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">
                  <Truck size={40} />
                </div>
                <h3 className="value-title">Fast Delivery</h3>
                <p className="value-description">
                  Lightning-fast shipping with real-time tracking. Get your orders delivered right to your doorstep.
                </p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">
                  <Users size={40} />
                </div>
                <h3 className="value-title">24/7 Support</h3>
                <p className="value-description">
                  Our dedicated customer support team is always ready to help you with any questions or concerns.
                </p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">
                  <Heart size={40} />
                </div>
                <h3 className="value-title">Customer First</h3>
                <p className="value-description">
                  Every decision we make is centered around providing you with the best possible shopping experience.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="stats-section">
            <h2 className="section-title">ShopX by Numbers</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">1M+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Products</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="cta-section">
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
      </section>

      <style jsx>{`
        .about-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%);
        }

        .hero-section {
          padding: 100px 20px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
          animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .hero-content {
          position: relative;
          z-index: 1;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          color: white;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          letter-spacing: -2px;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          color: #fbbf24;
          margin-bottom: 30px;
          font-weight: 600;
        }

        .hero-decoration {
          width: 100px;
          height: 4px;
          background: linear-gradient(90deg, #fbbf24, #f59e0b);
          margin: 0 auto;
          border-radius: 2px;
        }

        .main-content {
          background: white;
          position: relative;
          z-index: 1;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 20px;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 50px;
          background: linear-gradient(45deg, #1e40af, #3b82f6, #fbbf24);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .story-section {
          margin-bottom: 80px;
        }

        .story-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .story-paragraph {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #374151;
          margin-bottom: 25px;
          text-align: justify;
        }

        .brand-highlight {
          color: #1e40af;
          font-weight: 700;
          font-size: 1.3em;
        }

        .story-visual {
          display: flex;
          justify-content: center;
        }

        .visual-element {
          text-align: center;
          padding: 40px;
          background: linear-gradient(135deg, #1e40af, #3b82f6);
          border-radius: 20px;
          color: white;
          box-shadow: 0 20px 40px rgba(30, 64, 175, 0.3);
        }

        .story-icon {
          color: #fbbf24;
          margin-bottom: 15px;
        }

        .visual-text {
          font-size: 1.2rem;
          font-weight: 600;
        }

        .mission-section {
          margin-bottom: 80px;
        }

        .mission-card {
          background: linear-gradient(135deg, #111827, #374151);
          padding: 50px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 40px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
          border: 2px solid #fbbf24;
        }

        .mission-icon {
          color: #fbbf24;
          flex-shrink: 0;
        }

        .mission-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #fbbf24;
          margin-bottom: 15px;
        }

        .mission-text {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #f9fafb;
        }

        .values-section {
          margin-bottom: 80px;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .value-card {
          background: white;
          padding: 40px 30px;
          border-radius: 15px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 2px solid transparent;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .value-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .value-card:hover::before {
          left: 100%;
        }

        .value-card:hover {
          border-color: #3b82f6;
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
        }

        .value-icon {
          color: #1e40af;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .value-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 15px;
          position: relative;
          z-index: 1;
        }

        .value-description {
          color: #6b7280;
          line-height: 1.6;
          position: relative;
          z-index: 1;
        }

        .stats-section {
          margin-bottom: 80px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
        }

        .stat-item {
          text-align: center;
          padding: 40px 20px;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          border-radius: 15px;
          color: white;
          box-shadow: 0 15px 30px rgba(251, 191, 36, 0.3);
          transition: transform 0.3s ease;
        }

        .stat-item:hover {
          transform: translateY(-5px);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 10px;
        }

        .stat-label {
          font-size: 1.1rem;
          font-weight: 600;
          opacity: 0.9;
        }

        .cta-section {
          text-align: center;
          padding: 60px 40px;
          background: linear-gradient(135deg, #1e40af, #3b82f6);
          border-radius: 20px;
          color: white;
        }

        .cta-title {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .cta-text {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 30px;
          opacity: 0.9;
        }

        .cta-button {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          color: white;
          padding: 15px 40px;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(251, 191, 36, 0.3);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(251, 191, 36, 0.4);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .story-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .mission-card {
            flex-direction: column;
            text-align: center;
          }
          
          .section-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default About;