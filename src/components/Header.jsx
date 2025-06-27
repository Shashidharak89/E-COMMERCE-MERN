import React, { useState } from 'react';
import './styles/Header.css';
import { 
  Menu, 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Bell,
  ShoppingBag,
  MapPin,
  Phone
} from 'lucide-react';

const Header = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(7);
  const [notificationCount] = useState(2);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-left">
            <div className="contact-info">
              <span className="contact-item">
                <Phone size={14} />
                +91 98765 43210
              </span>
              <span className="contact-item">
                <MapPin size={14} />
                Bengaluru, India
              </span>
            </div>
          </div>
          <div className="top-bar-right">
            <span className="promo-text">Free shipping on orders above ₹999!</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="container">
          <div className="header-content">
            {/* Left Section - Menu & Logo */}
            <div className="header-left">
              <button className="menu-toggle" onClick={onMenuClick}>
                <Menu size={24} />
                <span className="menu-text">Menu</span>
              </button>
              
              <div className="logo-section">
                <div className="logo-icon">
                  <ShoppingBag size={32} />
                </div>
                <div className="logo-text">
                  <h1 className="brand-name">ShopX</h1>
                  <span className="brand-tagline">Your Shopping Paradise</span>
                </div>
              </div>
            </div>

            {/* Center Section - Search */}
            <div className="header-center">
              <div className="search-form">
                <div className="search-container">
                  <Search size={20} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search for products, brands, and more..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                  />
                  <button onClick={handleSearch} className="search-button">
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="header-right">
              <div className="header-actions">
                {/* Notifications */}
                <button className="action-btn notification-btn">
                  <Bell size={22} />
                  {notificationCount > 0 && (
                    <span className="badge notification-badge">{notificationCount}</span>
                  )}
                </button>

                {/* Wishlist */}
                <button className="action-btn wishlist-btn">
                  <Heart size={22} />
                  {wishlistCount > 0 && (
                    <span className="badge wishlist-badge">{wishlistCount}</span>
                  )}
                  <span className="action-text">Wishlist</span>
                </button>

                {/* Cart */}
                <button className="action-btn cart-btn">
                  <ShoppingCart size={22} />
                  {cartCount > 0 && (
                    <span className="badge cart-badge">{cartCount}</span>
                  )}
                  <span className="action-text">Cart</span>
                </button>

                {/* Profile */}
                <button className="action-btn profile-btn">
                  <User size={22} />
                  <span className="action-text">Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <style jsx>{`
       
      `}</style>
    </>
  );
};

export default Header;