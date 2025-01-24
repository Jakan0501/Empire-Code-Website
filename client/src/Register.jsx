import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [userEmail, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');
    const [userPhone, setPhone] = useState(''); // New state for phone number
    const [userName, setUserName] = useState(''); // New state for username
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/user/register', {
            userEmail,
            userPassword,
            userPhone, // Include phone number
            userName // Include username
        })
            .then(result => {
                console.log(result);
                setSuccessMessage('Registration successful!');
                setErrorMessage('');
            })
            .catch(err => {
                console.log(err);
                setErrorMessage('Registration failed. Please try again.');
                setSuccessMessage('');
            });
    }

    return (
        <>
            <section className="form-container">
                <form onSubmit={handleSubmit}>
                    <h3>Register</h3>
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    
                    <p>
                        Your email <span>*</span>
                    </p>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        maxLength="50"
                        className="box"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <p>
                        Your password <span>*</span>
                    </p>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        maxLength="20"
                        className="box"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <p>
                        Your username <span>*</span>
                    </p>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        required
                        maxLength="30"
                        className="box"
                        onChange={(e) => setUserName(e.target.value)}
                    />

                    <p>
                        Your phone number <span>*</span>
                    </p>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        required
                        maxLength="15"
                        className="box"
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <div className="register-link">
                        Have an account? <Link to="/login">Login now</Link>
                    </div>
                    <input type="submit" value="Register now" className="btn" />
                </form>
            </section>
        </>
    );
};

export default Register;
