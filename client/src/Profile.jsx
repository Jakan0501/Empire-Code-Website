import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Profile.css';

const Profile = () => {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    password: false,
    phone: false,
  });
  
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = response.data;
        setUserId(userData._id);
        setName(userData.userName);
        setEmail(userData.userEmail);
        setPhone(userData.userPhone);
        setProfilePicture(userData.profilePicture);
        setRegistrationDate(new Date(userData.registrationDate).toLocaleDateString());
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setErrorMessage("Failed to fetch profile. Please try again.");
      }
    };
    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedInfo = { userName: name, userEmail: email, userPassword: password, userPhone: phone };
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:8000/api/user/update/${userId}`, updatedInfo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMessage("Your information has been updated successfully!");
      setIsEditing({ name: false, email: false, password: false, phone: false });
    } catch (error) {
      setErrorMessage("Failed to update profile. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('profilePicture', selectedFile);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`http://localhost:8000/api/user/upload/${userId}`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      setProfilePicture(response.data.profilePicture);
      setSuccessMessage("Profile picture updated successfully!");
    } catch (error) {
      setErrorMessage("Failed to upload profile picture.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <>
      <section className="user-profile">
        <h1 className="heading">Your Profile</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div className="info">
          <div className="user">
            <img src={profilePicture ? `http://localhost:8000/api/user/uploads/${profilePicture}` : "images/pic-1.jpg"} alt="Profile" />
            <h3>{name}</h3>
            <p>Student</p>
          </div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload Profile Picture</button>
          <div className="profile-info">
            {[{ label: "Name", value: name, setter: setName, key: "name" },
              { label: "Email", value: email, setter: setEmail, key: "email" },
              { label: "Password", value: password, setter: setPassword, key: "password" },
              { label: "Phone", value: phone, setter: setPhone, key: "phone" }].map(({ label, value, setter, key }) => (
              <div className="profile-row" key={key}>
                <div className="profile-box">
                  <label>{label}:</label>
                  {isEditing[key] ? (
                    <input type={key === "password" ? "password" : "text"} value={value} onChange={(e) => setter(e.target.value)} />
                  ) : (
                    <span>{key === "password" ? "******" : value}</span>
                  )}
                  <button onClick={() => {
                    if (isEditing[key]) handleSubmit();
                    setIsEditing({ ...isEditing, [key]: !isEditing[key] });
                  }}>
                    {isEditing[key] ? "Save" : "Edit"}
                  </button>
                </div>
              </div>
            ))}
            <div className="profile-row">
              <div className="profile-box">
                <label>Registration Date:</label>
                <span>{registrationDate}</span>
              </div>
            </div>
          </div>
        </div>
        <button onClick={handleSubmit} className="inline-btn">Submit Changes</button>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </section>
      <footer className="footer"></footer>
    </>
  );
};

export default Profile;
