import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewTeacher = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [teacher, setTeacher] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/teacher/get/${id}`);
                setTeacher(response.data.data);
            } catch (err) {
                setError('Error fetching teacher data.');
                console.error('Error fetching teacher:', err);
            }
        };

        fetchTeacher();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/teacher/delete/${id}`);
            navigate('/teachers');
        } catch (err) {
            setError('Error deleting teacher. Please try again.');
            console.error('Error deleting teacher:', err);
        }
    };

    if (!teacher) {
        return <div>Loading...</div>;
    }

    return (
        <section className="view-teacher">
            <div className="header-container">
                <h1 className="heading">Teacher Details</h1>
                <div className="button-group">
                    <button onClick={() => navigate(`/teacher/update/${id}`)} className="update-btn">
                        Update
                    </button>
                    <button onClick={handleDelete} className="delete-btn">
                        Delete
                    </button>
                </div>
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="teacher-details">
                <div className="info-group">
                    <label>Name:</label>
                    <span>{teacher.teacherName}</span>
                </div>
                <div className="info-group">
                    <label>Email:</label>
                    <span>{teacher.teacherEmail}</span>
                </div>
                <div className="info-group">
                    <label>Phone:</label>
                    <span>{teacher.teacherPhone}</span>
                </div>
                <div className="info-group">
                    <label>Bio:</label>
                    <p>{teacher.teacherBio}</p>
                </div>
            </div>
        </section>
    );
};

export default ViewTeacher;
