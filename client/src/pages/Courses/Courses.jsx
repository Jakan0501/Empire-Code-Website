import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/Courses.css';

const Courses = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/course/get');
                setCourses(response.data.data);
            } catch (error) {
                setError('Failed to fetch courses.');
            }
        };

        fetchCourses();
    }, []);

    const handleDelete = async (courseId) => {
        try {
          await axios.delete(`http://localhost:8000/api/course/delete/${courseId}`);
          setCourses(courses.filter(course => course._id !== courseId)); // Remove from state
        } catch (err) {
          console.error('Error deleting course:', err);
        }
      };

    return (
        <section className="courses">
            <div className="header-container">
                <h1 className="heading">Our Courses</h1>
                <button onClick={() => navigate('/createCourse')} className="inline-btn">
                    Create New Course
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="box-container">
                {courses.map(course => (
                    <div className="box" key={course._id}>
                        <div className="tutor">

                            <div className="info">
                                <h3>{course.teacher.teacherName || 'Unknown Teacher'}</h3>
                                <span>{new Date(course.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <h3 className="title">{course.courseTitle}</h3>
                        <p>{course.courseDescription}</p>
                        <div className="button-group">
                            <button onClick={() => navigate(`/viewCourse/${course._id}`)} className="view-btn">
                                View
                            </button>
                            <button onClick={() => navigate(`/courses/update/${course._id}`)} className="update-btn">
                                Update
                            </button>
                            <button onClick={() => handleDelete(course._id)} className="delete-btn">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Courses;
