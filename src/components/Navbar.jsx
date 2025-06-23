import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="navbar-header">
        <button className="menu-btn" onClick={toggleSidebar}>
          ☰
        </button>
      </div>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <nav>
          <ul>
            <li><Link to="/" onClick={toggleSidebar}>Dashboard</Link></li>
            <li><Link to="/about" onClick={toggleSidebar}>About</Link></li>
          </ul>
        </nav>
      </div>

      {/* Optional backdrop */}
      {isOpen && <div className="backdrop" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Navbar;
