import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import About from "./components/About";
import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ProfileLoader from "./components/auth/ProfileLoader";
import Profile from "./components/Profile";
import Cart from './components/Cart';
import Orders from './components/Orders';
import Help from './components/Help';
import ProductDetail from './components/ProductDetail';
import { CartProvider } from "./contexts/CartContext";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev); // ✅ toggle logic

  return (
    <CartProvider>
      <Header onMenuClick={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      <div
        style={{
          paddingTop: "60px", // ✅ Matches header height
          paddingLeft: sidebarOpen ? "220px" : "0",
          transition: "padding-left 0.3s",
        }}
      >
        <ProfileLoader/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
