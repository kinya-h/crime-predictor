import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [theme, setTheme] = useState("dim");

  useEffect(() => {
    if (document) {
      if (document) {
        document.querySelector("html")!.setAttribute("data-theme", theme);
      }
    }
  }, [theme]);
  return (
    <>
      <div>
        <Router>
          <Navbar />
          <Routes>
            {/* <Route path="/about" element={<About />} /> */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
