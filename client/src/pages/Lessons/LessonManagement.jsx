import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        try {
            await axios.delete(`http://localhost:8000/api/lesson/delete/${id}`);
            setLessons(lessons.filter(lesson => lesson._id !== id));
        } catch (error) {
            setError('Failed to delete lesson.');
        }
    };

    return (
        <div>
            <h1>Manage Lessons</h1>
            {error && <p className="error">{error}</p>}
            <Link to="/create-lesson">
                <button>Create New Lesson</button>
            </Link>
            <ul>
                {lessons.map((lesson) => (
                    <li key={lesson._id}>
                        <h3>{lesson.title}</h3>
                        <p>{lesson.content}</p>
                        <Link to={`/lessons/update/${lesson._id}`}>
                            <button>Edit</button>
                        </Link>
                        <button onClick={() => handleDelete(lesson._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LessonManagement;
