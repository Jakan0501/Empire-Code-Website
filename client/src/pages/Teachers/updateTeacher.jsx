import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateTeacher = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        teacherName: '',
        teacherEmail: '',
        teacherPhone: '',
        teacherBio: '',
        teacherPassword: '',
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/teacher/get/${id}`);
                setFormData(response.data.data);
            } catch (err) {
                setError('Error fetching teacher data.');
                console.error('Error fetching teacher:', err);
            }
        };

        fetchTeacher();
    }, [id]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8000/api/teacher/update/${id}`, formData);
            navigate('/teachers');
        } catch (err) {
            setError('Error updating teacher. Please try again.');
            console.error('Error updating teacher:', err);
        }
    };

    return (
        <section className="update-teacher">
            <div className="header-container">
                <h1 className="heading">Update Teacher</h1>
            </div>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label htmlFor="teacherName">Teacher Name</label>
                    <input
                        type="text"
                        id="teacherName"
                        name="teacherName"
                        value={formData.teacherName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="teacherEmail">Teacher Email</label>
                    <input
                        type="email"
                        id="teacherEmail"
                        name="teacherEmail"
                        value={formData.teacherEmail}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="teacherPhone">Teacher Phone</label>
                    <input
                        type="tel"
                        id="teacherPhone"
                        name="teacherPhone"
                        value={formData.teacherPhone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="teacherBio">Teacher Bio</label>
                    <textarea
                        id="teacherBio"
                        name="teacherBio"
                        value={formData.teacherBio}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="teacherPassword">Teacher Password</label>
                    <input
                        type="password"
                        id="teacherPassword"
                        name="teacherPassword"
                        value={formData.teacherPassword}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">
                    Update Teacher
                </button>
            </form>
        </section>
    );
};

export default UpdateTeacher;
