import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/Login.css";

const LoginForm = () => {
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in:", { userEmail, userPassword });

    axios
      .post("http://localhost:8000/api/user/login", { userEmail, userPassword })
      .then((result) => {
        console.log("Login successful:", result);
        setSuccessMessage("Login successful!");
        setErrorMessage("");
        // Store the token in localStorage or sessionStorage
        localStorage.setItem("token", result.data.token);
        // Redirect to another page
        navigate("/home");
      })
      .catch((err) => {
        console.error(
          "Login error:",
          err.response ? err.response.data : err.message
        );
        setErrorMessage(
          "Login failed. Please check your credentials and try again."
        );
        setSuccessMessage("");
      });
  };

  return (
    <div className="login-container">
      <h2>Login Now</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            name="userEmail"
            placeholder="Enter your email"
            required
            maxLength="50"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            name="userPassword"
            placeholder="Enter your password"
            required
            maxLength="20"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {successMessage && (
          <p className="login-form-success-message">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="login-form-error-message">{errorMessage}</p>
        )}
        <button type="submit" className="login-btn">
          Login Now
        </button>

        <div className="register-link">
          You are a teacher? <Link to="/teacherLogin">Click here</Link>
        </div>
      </form>
      
      <div className="register-link1">
        Don't have an account? <Link to="/register">Register now</Link>
      </div>
    </div>
  );
};

export default LoginForm;
