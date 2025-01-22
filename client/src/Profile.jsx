import React, { useState } from 'react';
import axios from 'axios';

const Profile = () => {
  // State to hold user information
  const [name, setName] = useState("Student Name");
  const [email, setEmail] = useState("student@example.com");
  const [password, setPassword] = useState("");
  
  // State to manage edit mode for each field
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    password: false,
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedInfo = {
      name,
      email,
      password,
    };

    try {
      
      const response = await axios.put(`http://localhost:8000/api/user/update/${YOUR_USER_ID}`, updatedInfo, {
        headers: {
          Authorization: `Bearer YOUR_JWT_TOKEN`, // Include your JWT token here
        },
      });
      
      console.log("Updated Information:", response.data);
      // Reset edit mode after submission
      setIsEditing({ name: false, email: false, password: false });
    } catch (error) {
      console.error("Error updating information:", error);
    }
  };

  return (
    <>
      {/* User Profile Section */}
      <section className="user-profile">
        <h1 className="heading">Your Profile</h1>

        <div className="info">
          <div className="user">
            <img src="images/pic-1.jpg" alt="Profile" />
            <h3>{name}</h3>
            <p>Student</p>
          </div>

          <div className="box-container">
            {/* Name Box */}
            <div className="box">
              <div className="flex">
                <label>Name:</label>
                {isEditing.name ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <span>{name}</span>
                )}
                <button onClick={() => setIsEditing({ ...isEditing, name: !isEditing.name })}>
                  {isEditing.name ? "Save" : "Edit"}
                </button>
              </div>
            </div>

            {/* Email Box */}
            <div className="box">
              <div className="flex">
                <label>Email:</label>
                {isEditing.email ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <span>{email}</span>
                )}
                <button onClick={() => setIsEditing({ ...isEditing, email: !isEditing.email })}>
                  {isEditing.email ? "Save" : "Edit"}
                </button>
              </div>
            </div>

            {/* Password Box */}
            <div className="box">
              <div className="flex">
                <label>Password:</label>
                {isEditing.password ? (
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                ) : (
                  <span>******</span>
                )}
                <button onClick={() => setIsEditing({ ...isEditing, password: !isEditing.password })}>
                  {isEditing.password ? "Save" : "Edit"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button onClick={handleSubmit} className="inline-btn">Submit Changes</button>
      </section>

      {/* Footer */}
      <footer className="footer"></footer>
    </>
  );
};

export default Profile;
