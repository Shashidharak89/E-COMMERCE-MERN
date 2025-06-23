import "./styles/Header.css";

const Header = ({ onMenuClick }) => {
  return (
    <header className="main-header">
      <h1 className="app-title">My App</h1>
      <button className="menu-toggle" onClick={onMenuClick}>
  ☰
</button>

    </header>
  );
};

export default Header;
