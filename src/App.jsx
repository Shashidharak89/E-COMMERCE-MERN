import { Routes, Route } from "react-router-dom";
import About from "./components/About"
import Dashboard from "./components/Dashboard"
import Navbar from "./components/Navbar";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}


export default App
