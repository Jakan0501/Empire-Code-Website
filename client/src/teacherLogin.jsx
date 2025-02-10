import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TeacherLogin = () => {
    const [teacherEmail, setEmail] = useState('');
    const [teacherPassword, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logging in:", { teacherEmail, teacherPassword });

        axios.post('http://localhost:8000/api/teacher/login', { teacherEmail, teacherPassword })
            .then(result => {
                if (result.data.success) {
                    console.log("Login successful:", result);
                    setMessage('Login successful!');
                    // Store the token in localStorage or sessionStorage
                    localStorage.setItem('token', result.data.token);
                    // Redirect to another page
                    navigate('/teacher/home');
                } else {
                    setMessage(result.data.message);
                }
            })
            .catch(err => {
                console.error("Login error:", err.response ? err.response.data : err.message);
                setMessage('Login failed. Please check your credentials and try again.');
            });
    }

    return (
        <section className="form-container">
            <form onSubmit={handleSubmit}>
                <h3>Teacher Login</h3>
                {message && <p className={message.includes('successful') ? 'success-message' : 'error-message'}>{message}</p>}
                <p>Your Email <span>*</span></p>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    maxLength="50"
                    className="box"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p>Your Password <span>*</span></p>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    maxLength="20"
                    className="box"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" value="Login Now" name="submit" className="btn" />
                <div className="register-link">
                    Contact admin if you can not login.
                </div>
                <div className="register-link">
                    You are a student? <Link to='/login'>Click here</Link>
                </div>
            </form>
        </section>
    );
};

export default TeacherLogin;
