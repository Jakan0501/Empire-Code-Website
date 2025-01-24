import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="side-bar"> {/* Always visible, no conditional class */}
      <div className="profile">
        <img src="image-placeholder" className="image" alt="Profile" />
        <h3 className="name">User Name</h3>
        <p className="role">Student</p>
        <Link to="/profile" className="btn">View Profile</Link>
      </div>
      <nav className="navbar">
        <Link to="/home"><i className="fas fa-home"></i><span>Home</span></Link>
        <Link to="/courses"><i className="fas fa-graduation-cap"></i><span>Courses</span></Link>
        <Link to="/teachers"><i className="fas fa-chalkboard-user"></i><span>Teachers</span></Link>
        <Link to="/contact"><i className="fas fa-headset"></i><span>Contact Us</span></Link>
        <Link to="/about"><i className="fas fa-question"></i><span>Quizzes</span></Link>
      </nav>
    </div>
  );
};

export default Sidebar;
