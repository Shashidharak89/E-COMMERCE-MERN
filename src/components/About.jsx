import React from 'react';
import './styles/about.css';
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
       
      `}</style>
    </div>
  );
};

export default About;