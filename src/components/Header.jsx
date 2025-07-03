import React, { useState } from 'react';
import { Link } from "react-router-dom";

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

      <style jsx>{`
       

        /* Header Styles */
        .main-header {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%);
          box-shadow: 0 4px 20px rgba(30, 64, 175, 0.3);
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(10px);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 0;
          gap: 30px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-shrink: 0;
        }

        .menu-toggle {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          padding: 12px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .menu-toggle:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 6px 20px rgba(251, 191, 36, 0.4);
        }

        .brand-name {
          font-size: 2rem;
          font-weight: 800;
          color: white;
          margin: 0;
          letter-spacing: -1px;
          line-height: 1;
        }

        .brand-tagline {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .header-right {
          flex-shrink: 0;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          cursor: pointer;
          padding: 12px 16px;
          border-radius: 12px;
          transition: all 0.3s ease;
          position: relative;
          backdrop-filter: blur(10px);
          font-weight: 500;
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .login-btn {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .login-btn:hover {
          background: linear-gradient(135deg, #059669, #047857);
          transform: translateY(-2px);
        }

        .signup-btn {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
        }

        .signup-btn:hover {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          transform: translateY(-2px);
        }

        .action-text {
          font-size: 0.75rem;
          font-weight: 500;
          opacity: 0.9;
        }

        .badge {
          position: absolute;
          top: 0;
          right: 8px;
          background: #fbbf24;
          color: #111827;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 10px;
          min-width: 18px;
          text-align: center;
          line-height: 1.2;
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 280px;
            left: -280px;
          }
          
          .header-content {
            gap: 15px;
            padding: 12px 0;
          }
          
          .brand-name {
            font-size: 1.5rem;
          }
          
          .brand-tagline {
            display: none;
          }
          
          .header-actions {
            gap: 15px;
          }
          
          .action-text {
            display: none;
          }
          
          .action-btn {
            padding: 10px 12px;
          }
        }

        @media (max-width: 480px) {
          .sidebar {
            width: 260px;
            left: -260px;
          }
          
          .logo-section {
            gap: 8px;
          }
          
          .logo-icon {
            width: 40px;
            height: 40px;
          }
          
          .brand-name {
            font-size: 1.3rem;
          }
          
          .header-actions {
            gap: 10px;
          }
          
          .action-btn {
            padding: 8px 10px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;