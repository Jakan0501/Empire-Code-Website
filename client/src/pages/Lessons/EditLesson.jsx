import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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
        <div>
            <h1>Edit Lesson</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Lesson Title"
                    value={lesson.lessonTitle}
                    onChange={(e) => setLesson({ ...lesson, lessonTitle: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Lesson Content"
                    value={lesson.lessonContent}
                    onChange={(e) => setLesson({ ...lesson, lessonContent: e.target.value })}
                    required
                />
                <button type="submit">Update Lesson</button>
            </form>
        </div>
    );
};

export default EditLesson;
