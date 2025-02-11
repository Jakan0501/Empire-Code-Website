import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TeacherPage = () => {
    const navigate = useNavigate();
    const [teachers, setTeachers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/teacher/get');
                setTeachers(response.data.data);
            } catch (error) {
                setError('Failed to fetch teachers.');
            }
        };

        fetchTeachers();
    }, []);

    const handleDelete = async (teacherId) => {
        try {
          await axios.delete(`http://localhost:8000/api/teacher/delete/${teacherId}`);
          setTeachers(teachers.filter(teacher => teacher._id !== teacherId)); // Remove from state
        } catch (err) {
          console.error('Error deleting teacher:', err);
        }
      };

    return (
        <section className="teachers">
            <div className="header-container">
                <h1 className="heading">Our Teachers</h1>
                <button onClick={() => navigate('/createteacher')} className="inline-btn">
                    Create New Teacher
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="box-container">
                {teachers.map(teacher => (
                    <div className="box" key={teacher._id}>
                        <div className="tutor">
                            <div className="info">
                                <h3>{teacher.teacherName || 'Unknown Teacher'}</h3>
                                <span>{teacher.teacherEmail}</span>
                                <span>{teacher.teacherPhone}</span>
                                <p>{teacher.teacherBio || 'No bio available'}</p>
                            </div>
                        </div>
                        <div className="button-group">
                            <button onClick={() => navigate(`/viewTeacher/${teacher._id}`)} className="view-btn">
                                View
                            </button>
                            <button onClick={() => navigate(`/teacher/update/${teacher._id}`)} className="update-btn">
                                Update
                            </button>
                            <button onClick={() => handleDelete(teacher._id)} className="delete-btn">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TeacherPage;
