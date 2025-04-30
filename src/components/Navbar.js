import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">OutStyl</div>
      <input type="text" className="search-input" placeholder="🔍 Search styles..." />
      <div className="nav-links">
        <Link to="/">Feed</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/trending">Trending</Link>
      </div>
    </nav>
  );
};

export default Navbar;