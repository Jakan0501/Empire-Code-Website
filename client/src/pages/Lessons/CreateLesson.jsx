import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateLesson = () => {
    const [lesson, setLesson] = useState({ lessonTitle: '', lessonContent: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/lesson/create', lesson);
            navigate('/lessons-management'); // Redirect after creation
        } catch (error) {
            setError('Failed to create lesson.');
            console.error('Error creating lesson:', error.response.data); // Log the error response for debugging
        }
    };

    return (
        <div>
            <h1>Create Lesson</h1>
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
                <button type="submit">Create Lesson</button>
            </form>
        </div>
    );
};

export default CreateLesson;
