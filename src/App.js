import "./App.css";
import Navbar from "./components/Navbar";
import Favourite from "./components/Favourite";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favourites" element={<Favourite />} />
      </Routes>
    </Router>
  );
}

export default App;
