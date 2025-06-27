import React from 'react';
import './styles/Sidebar.css';
import { 
  Home, 
  Info, 
  ShoppingBag, 
  User, 
  Settings, 
  Heart, 
  ShoppingCart, 
  Package, 
  Tag, 
  HelpCircle,
  X,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/about', label: 'About Us', icon: Info },
    { path: '/products', label: 'Products', icon: ShoppingBag },
    { path: '/categories', label: 'Categories', icon: Tag },
    { path: '/cart', label: 'Shopping Cart', icon: ShoppingCart },
    { path: '/orders', label: 'My Orders', icon: Package },
    { path: '/wishlist', label: 'Wishlist', icon: Heart },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/settings', label: 'Settings', icon: Settings },
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
            <h3 className="nav-section-title">Main Menu</h3>
            <ul className="nav-list">
              {menuItems.slice(0, 3).map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <li key={index} className="nav-item">
                    <a href={item.path} onClick={(e) => { e.preventDefault(); handleNavClick(item.path); }} className="nav-link">
                      <div className="nav-link-content">
                        <IconComponent size={20} className="nav-icon" />
                        <span className="nav-text">{item.label}</span>
                      </div>
                      <ChevronRight size={16} className="nav-arrow" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="nav-section">
            <h3 className="nav-section-title">Shopping</h3>
            <ul className="nav-list">
              {menuItems.slice(3, 7).map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <li key={index} className="nav-item">
                    <a href={item.path} onClick={(e) => { e.preventDefault(); handleNavClick(item.path); }} className="nav-link">
                      <div className="nav-link-content">
                        <IconComponent size={20} className="nav-icon" />
                        <span className="nav-text">{item.label}</span>
                      </div>
                      <ChevronRight size={16} className="nav-arrow" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="nav-section">
            <h3 className="nav-section-title">Account</h3>
            <ul className="nav-list">
              {menuItems.slice(7).map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <li key={index} className="nav-item">
                    <a href={item.path} onClick={(e) => { e.preventDefault(); handleNavClick(item.path); }} className="nav-link">
                      <div className="nav-link-content">
                        <IconComponent size={20} className="nav-icon" />
                        <span className="nav-text">{item.label}</span>
                      </div>
                      <ChevronRight size={16} className="nav-arrow" />
                    </a>
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

      <style jsx>{`
        
      `}</style>
    </>
  );
};

export default Sidebar;