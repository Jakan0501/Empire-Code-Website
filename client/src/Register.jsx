import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const [errorMessage, setErrorMessage] = useState(''); // State for error message

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/user/register', { email, password })
            .then(result => {
                console.log(result);
                setSuccessMessage('Registration successful!'); // Set success message
                setErrorMessage(''); // Clear any previous error message
            })
            .catch(err => {
                console.log(err);
                setErrorMessage('Registration failed. Please try again.'); // Set error message
                setSuccessMessage(''); // Clear any previous success message
            });
    }

    return (
        <>
            <section className="form-container">
                <form onSubmit={handleSubmit}>
                    <h3>Register</h3>
                    {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
                    {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
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
