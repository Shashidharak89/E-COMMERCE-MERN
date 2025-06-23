import { Link } from "react-router-dom";
import "./styles/Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <nav>
          <ul>
  <li><Link to="/" onClick={onClose}>Dashboard</Link></li>
  <li><Link to="/about" onClick={onClose}>About</Link></li>
</ul>

        </nav>
      </div>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose}></div>}
    </>
  );
};

export default Sidebar;
