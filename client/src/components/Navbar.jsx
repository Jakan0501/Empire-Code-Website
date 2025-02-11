import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const profileOptionsRef = useRef(null);

  const toggleProfileOptions = () => {
    setShowProfileOptions((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileOptionsRef.current &&
        !profileOptionsRef.current.contains(event.target)
      ) {
        setShowProfileOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="navbar-header">
      <section className="navbar-container">
        <a href="/home" className="navbar-logo">
          Empire Code
        </a>
        <form action="search.html" method="post" className="navbar-search-form">
          <input
            type="text"
            name="search_box"
            required
            placeholder="Search courses..."
            maxLength="100"
            className="navbar-search-input"
          />
          <button type="submit" className="navbar-search-button">
            <i className="fas fa-search"></i>
          </button>
        </form>

        <div className="navbar-icons">
          <div className="navbar-user-container" onClick={toggleProfileOptions}>
            <i className="fas fa-user"></i>
          </div>
        </div>

        {showProfileOptions && (
          <div className="navbar-profile-options" ref={profileOptionsRef}>
            <Link to="/profile" className="navbar-btn">
              View Profile
            </Link>
            <div className="navbar-flex-btn">
              <Link to="/login" className="navbar-btn">
                Login
              </Link>
              <Link to="/register" className="navbar-btn">
                Register
              </Link>
            </div>
          </div>
        )}
      </section>
    </header>
  );
};

export default Navbar;
