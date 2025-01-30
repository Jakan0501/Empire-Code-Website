import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Profile.css'; // Import the profile.css file

const Profile = () => {
  // State to hold user information
  const [userId, setUserId] = useState(""); // State for user ID
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");

  // State to manage edit mode for each field
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    password: false,
    phone: false,
  });

  // State for error messages
  const [errorMessage, setErrorMessage] = useState("");
  
  // State for success message
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message
  
  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage
      try {
        const response = await axios.get('http://localhost:8000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data;
        setUserId(userData._id); // Set user ID
        setName(userData.userName); // Ensure userName is returned from the backend
        setEmail(userData.userEmail);
        setPhone(userData.userPhone); // Ensure userPhone is returned from the backend
        setRegistrationDate(new Date(userData.registrationDate).toLocaleDateString());
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setErrorMessage("Failed to fetch profile. Please try again.");
      }
    };

    fetchUserProfile();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedInfo = {
      userName: name,
      userEmail: email,
      userPassword: password,
      userPhone: phone,
    };

    console.log("Updated Info:", updatedInfo); // Debugging log

    const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage

    try {
      const response = await axios.put(`http://localhost:8000/api/user/update/${userId}`, updatedInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log("Updated Information:", response.data); // Debugging log
      setSuccessMessage("Your information has been updated successfully!"); // Set success message
      setErrorMessage(""); // Clear any previous error messages
      // Reset edit mode after submission
      setIsEditing({ name: false, email: false, password: false, phone: false });
    } catch (error) {
      console.error("Error updating information:", error);
      setErrorMessage("Failed to update profile. Please try again.");
      setSuccessMessage(""); // Clear success message on error
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from local storage
    window.location.href = '/login'; // Redirect to the login page
  };

  return (
    <>
      {/* User Profile Section */}
      <section className="user-profile">
        <h1 className="heading">Your Profile</h1>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}

        <div className="info">
          <div className="user">
            <img src="images/pic-1.jpg" alt="Profile" />
            <h3>{name}</h3>
            <p>Student</p>
          </div>

          <div className="profile-info">
            {/* Name Row */}
            <div className="profile-row">
              <div className="profile-box">
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
                <button onClick={() => {
                  if (isEditing.name) handleSubmit(); // Save changes if editing
                  setIsEditing({ ...isEditing, name: !isEditing.name });
                }}>
                  {isEditing.name ? "Save" : "Edit"}
                </button>
              </div>
            </div>

            {/* Email Row */}
            <div className="profile-row">
              <div className="profile-box">
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
                <button onClick={() => {
                  if (isEditing.email) handleSubmit(); // Save changes if editing
                  setIsEditing({ ...isEditing, email: !isEditing.email });
                }}>
                  {isEditing.email ? "Save" : "Edit"}
                </button>
              </div>
            </div>

            {/* Password Row */}
            <div className="profile-row">
              <div className="profile-box">
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
                <button onClick={() => {
                  if (isEditing.password) handleSubmit(); // Save changes if editing
                  setIsEditing({ ...isEditing, password: !isEditing.password });
                }}>
                  {isEditing.password ? "Save" : "Edit"}
                </button>
              </div>
            </div>

            {/* Phone Row */}
            <div className="profile-row">
              <div className="profile-box">
                <label>Phone:</label>
                {isEditing.phone ? (
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                ) : (
                  <span>{phone}</span>
                )}
                <button onClick={() => {
                  if (isEditing.phone) handleSubmit(); // Save changes if editing
                  setIsEditing({ ...isEditing, phone: !isEditing.phone });
                }}>
                  {isEditing.phone ? "Save" : "Edit"}
                </button>
              </div>
            </div>

            {/* Registration Date Row */}
            <div className="profile-row">
              <div className="profile-box">
                <label>Registration Date:</label>
                <span>{registrationDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button onClick={handleSubmit} className="inline-btn">Submit Changes</button>

        {/* Logout Button */}
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </section>

      {/* Footer */}
      <footer className="footer"></footer>
    </>
  );
};

export default Profile;
