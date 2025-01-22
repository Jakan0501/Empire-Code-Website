import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  // State to manage the visibility of profile options
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  // Function to toggle profile options
  const toggleProfileOptions = () => {
    setShowProfileOptions((prev) => !prev);
  };

  return (
    <header className="header">
      <section className="flex">
      <a href="/home" className="logo">Empire Code</a>
        <form action="search.html" method="post" className="search-form">
          <input 
            type="text" 
            name="search_box" 
            required 
            placeholder="search courses..." 
            maxLength="100" 
          />
          <button type="submit" className="fas fa-search"></button>
        </form>
        <div className="icons">
          <div id="menu-btn" className="fas fa-bars" onClick={toggleSidebar}></div>
          <div id="search-btn" className="fas fa-search"></div>
          <div id="user-btn" className="fas fa-user" onClick={toggleProfileOptions}></div>
          <div id="toggle-btn" className="fas fa-sun"></div>
        </div>

        {/* Conditionally render profile options */}
        {showProfileOptions && (
          <div className="profile-options">
            <Link to="/profile" className="btn">View Profile</Link>
            <div className="flex-btn">
              <Link to="/login" className="btn">Login</Link>
              <Link to="/register" className="btn">Register</Link>
            </div>
          </div>
        )}
      </section>
    </header>
  );
};

export default Navbar;
