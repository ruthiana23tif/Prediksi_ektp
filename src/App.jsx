import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ModelProvider } from "./hooks/useModel.jsx";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Check from "./pages/Check";
import About from "./pages/About";
import "./App.css";

export default function App() {
  return (
    <ModelProvider>
      <BrowserRouter>
        <div className="layout">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cek" element={<Check />} />
              <Route path="/tentang" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ModelProvider>
  );
}