import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import "./index.css";
import App from "./App.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import News from "./pages/News.jsx";
import Services from "./pages/Services.jsx";
import SubServices from "./pages/SubServices.jsx";
import Footer from "./components/Footer";
import Header2 from "./components/Header2.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Header2 />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="services" element={<Services />} />
        <Route path="sub-services" element={<SubServices />} />
        <Route path="news" element={<News />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  </StrictMode>
);
