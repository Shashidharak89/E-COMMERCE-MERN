import React from 'react';
import { ShoppingBag, Users, Award, Truck, Shield, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './styles/about.css';


const About = () => {
  const navigate = useNavigate();
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
            <button className="cta-button" onClick={() => navigate('/')}>
  Start Shopping Now
</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;