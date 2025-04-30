// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./components/Feed";
import Explore from "./components/Explore";
import Trending from "./components/Trending";
import Navbar from "./components/Navbar";
import TrendingBar from "./components/TrendingBar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <TrendingBar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/trending" element={<Trending />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
