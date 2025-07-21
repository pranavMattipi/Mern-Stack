// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast"; // ✅ import

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} /> {/* ✅ add this */}
    </div>
  );
}

export default App;
