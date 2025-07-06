import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './styles/Header.css';
import { 
  ShoppingCart, 
  User, 
  ShoppingBag,
  LogIn,
  UserPlus,
  Menu,
  X,
  Home,
  Package,
  Tag,
  Phone,
  Info
} from 'lucide-react';
import Sidebar from "./Sidebar";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount] = useState(3);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSignup = () => {
    // Handle signup logic
    console.log('Signup clicked');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Package, label: 'Products', href: '/products' },
    { icon: Tag, label: 'Categories', href: '/categories' },
    { icon: Phone, label: 'Contact', href: '/contact' },
    { icon: Info, label: 'About', href: '/about' }
  ];

  return (
    <>
     

      {/* Main Header */}
      <header className="main-header">
        <div className="container">
          <div className="header-content">
            {/* Left Section - Menu & Brand */}
            <div className="header-left">
              <button className="menu-toggle" onClick={toggleSidebar}>
                <Menu size={24} />
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

            {/* Right Section - Actions */}
            <div className="header-right">
              <div className="header-actions">
                {!isLoggedIn ? (
                  // Show Login/Signup when not logged in
                  <>
                   <Link to="/login" className="action-btn login-btn">
  <LogIn size={20} />
  <span className="action-text">Login</span>
</Link>

<Link to="/signup" className="action-btn signup-btn">
  <UserPlus size={20} />
  <span className="action-text">Sign Up</span>
</Link>

                  </>
                ) : (
                  // Show Profile/Cart when logged in
                  <>
                    <button className="action-btn cart-btn">
                      <ShoppingCart size={22} />
                      {cartCount > 0 && (
                        <span className="badge cart-badge">{cartCount}</span>
                      )}
                      <span className="action-text">Cart</span>
                    </button>

                    <button className="action-btn profile-btn" onClick={handleLogout}>
                      <User size={22} />
                      <span className="action-text">Profile</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      
    </>
  );
};

export default Header;