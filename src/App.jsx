import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import { Routes, Route } from "react-router-dom";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev); // ✅ toggle logic

  return (
    <>
      <Header onMenuClick={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      <div
  style={{
    paddingTop: "60px", // ✅ Matches header height
    paddingLeft: sidebarOpen ? "220px" : "0",
    transition: "padding-left 0.3s",
  }}
>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/about" element={<About />} />
  </Routes>
</div>

    </>
  );
}

export default App;
