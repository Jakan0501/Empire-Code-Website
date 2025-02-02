import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateCourse = () => {
    const [formData, setFormData] = useState({
        courseTitle: '',
        courseDescription: '',
        coursePrice: 0,
        // Teacher field can be kept for later use
        teacher: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/course/create', formData);
            console.log('Course created:', response.data);
            navigate('/courses'); // Redirect after creation
        } catch (err) {
            const message = err.response ? err.response.data.message : err.message;
            setError(`Failed to create course: ${message}`);
            console.error('Error details:', err);
        }
    };

    return (
        <div>
            <h1>Create Course</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Course Title"
                    value={formData.courseTitle}
                    onChange={(e) => setFormData({ ...formData, courseTitle: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Course Description (optional)"
                    value={formData.courseDescription}
                    onChange={(e) => setFormData({ ...formData, courseDescription: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Course Price"
                    value={formData.coursePrice}
                    onChange={(e) => setFormData({ ...formData, coursePrice: e.target.value })}
                    required
                    min="0"
                />
                {/* Teacher selection can be added later */}
                <button type="submit">Create Course</button>
            </form>
        </div>
    );
};

export default CreateCourse;
