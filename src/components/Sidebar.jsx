import React from 'react';
import { Link } from "react-router-dom";

import './styles/Sidebar.css';
import {
  Home,
  Info,
  ShoppingCart,
  Package,
  HelpCircle,
  X,
  ChevronRight,
  ShoppingBag,
  User
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/cart', label: 'Cart', icon: ShoppingCart },
    { path: '/orders', label: 'My Orders', icon: Package },
    { path: '/About', label: 'About Us', icon: Info },
    { path: '/help', label: 'Help & Support', icon: HelpCircle }
  ];

  const handleNavClick = (path) => {
    console.log(`Navigating to: ${path}`);
    onClose();
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="logo-section">
            <div className="logo-icon">
              <ShoppingBag size={32} />
            </div>
            <h2 className="logo-text">ShopX</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <div className="nav-section">
            <h3 className="nav-section-title">Navigation</h3>
            <ul className="nav-list">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <li key={index} className="nav-item">
                    <Link
                      to={item.path}
                      className="nav-link"
                      onClick={() => handleNavClick(item.path)}
                    >
                      <div className="nav-link-content">
                        <IconComponent size={20} className="nav-icon" />
                        <span className="nav-text">{item.label}</span>
                      </div>
                      <ChevronRight size={16} className="nav-arrow" />
                    </Link>

                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div className="footer-content">
            <div className="user-info">
              <div className="user-avatar">
                <User size={20} />
              </div>
              <div className="user-details">
                <p className="user-name">Welcome!</p>
                <p className="user-status">Happy Shopping</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose}></div>}


    </>
  );
};

export default Sidebar;