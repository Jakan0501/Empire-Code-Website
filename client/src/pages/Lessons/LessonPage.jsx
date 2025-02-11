import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const LessonManagement = () => {
    const [lessons, setLessons] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/lesson/get');
                setLessons(response.data.data);
            } catch (error) {
                setError('Failed to fetch lessons.');
            }
        };

        fetchLessons();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this lesson?')) {
            try {
                await axios.delete(`http://localhost:8000/api/lesson/delete/${id}`);
                setLessons(lessons.filter(lesson => lesson._id !== id));
            } catch (error) {
                setError('Failed to delete lesson.');
            }
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">All Lessons</h1>
            {error && <div className="alert alert-danger">{error}</div>}

            <ul className="list-group">
                {lessons.map((lesson) => (
                    <li key={lesson._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <h5>{lesson.lessonTitle}</h5>
                            <p>{lesson.lessonContent}</p>
                        </div>
                        <div>
                            <Link to={`/view-lesson/${lesson._id}`} className="btn btn-info btn-sm me-2">
                                View
                            </Link>

                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LessonManagement;
