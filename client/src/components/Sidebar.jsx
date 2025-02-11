import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Sidebar.css";

const Sidebar = () => {
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:8000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = response.data;
        setProfilePicture(userData.profilePicture);
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="side-bar">
      <div className="profile">
        <img
          src={profilePicture ? `http://localhost:8000/api/user/uploads/${profilePicture}` : "images/default-profile.jpg"}
          className="image"
          alt="Profile"
        />
        <h3 className="name">User Name</h3>
        <p className="role">Student</p>
        <Link to="/profile" className="btn">View Profile</Link>
      </div>
      <nav className="navbar">
        <Link to="/home"><i className="fas fa-home"></i><span>Home</span></Link>
        <Link to="/courses"><i className="fas fa-graduation-cap"></i><span>Courses</span></Link>
        <Link to="/teachers"><i className="fas fa-chalkboard-user"></i><span>Teachers</span></Link>
        
        <Link to="/lesson-page"><i className="fas fa-book"></i><span>Lesson</span></Link>

        <Link to="/contact"><i className="fas fa-headset"></i><span>Contact Us</span></Link>
      </nav>
    </div>
  );
};

export default Sidebar;
