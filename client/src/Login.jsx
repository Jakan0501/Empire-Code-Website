import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [userEmail, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logging in:", { userEmail, userPassword });

        axios.post('http://localhost:8000/api/user/login', { userEmail, userPassword })
            .then(result => {
                console.log("Login successful:", result);
                setSuccessMessage('Login successful!');
                setErrorMessage('');
                // Store the token in localStorage or sessionStorage
                localStorage.setItem('token', result.data.token);
                // Redirect to another page
                navigate('/home');
            })
            .catch(err => {
                console.error("Login error:", err.response ? err.response.data : err.message);
                setErrorMessage('Login failed. Please check your credentials and try again.');
                setSuccessMessage('');
            });
    }

    return (
        <section className="form-container">
            <form onSubmit={handleSubmit}>
                <h3>Login Now</h3>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <p>Your Email <span>*</span></p>
                <input
                    type="email"
                    name="userEmail"
                    placeholder="Enter your email"
                    required
                    maxLength="50"
                    className="box"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p>Your Password <span>*</span></p>
                <input
                    type="password"
                    name="userPassword"
                    placeholder="Enter your password"
                    required
                    maxLength="20"
                    className="box"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" value="Login Now" name="submit" className="btn" />
                <div className="register-link">
                    Don't have an account? <Link to="/register">Register now</Link>
                </div>
                <div className="register-link">
                    You are a teacher? <Link to='/teacherLogin'>Click here</Link>
                </div>
            </form>
        </section>
    );
};

export default Login;
