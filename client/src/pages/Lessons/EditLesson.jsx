import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const EditLesson = () => {
    const { id } = useParams();
    const [lesson, setLesson] = useState({ lessonTitle: '', lessonContent: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/lesson/get/${id}`);
                setLesson({
                    lessonTitle: response.data.data.lessonTitle,
                    lessonContent: response.data.data.lessonContent,
                });
            } catch (error) {
                setError('Failed to fetch lesson data.');
            }
        };

        fetchLesson();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/lesson/update/${id}`, lesson);
            navigate('/lessons-management');
        } catch (error) {
            setError('Failed to update lesson.');
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Edit Lesson</h1>
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Lesson Title"
                        value={lesson.lessonTitle}
                        onChange={(e) => setLesson({ ...lesson, lessonTitle: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        placeholder="Lesson Content"
                        value={lesson.lessonContent}
                        onChange={(e) => setLesson({ ...lesson, lessonContent: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Update Lesson
                </button>
            </form>
        </div>
    );
};

export default EditLesson;
