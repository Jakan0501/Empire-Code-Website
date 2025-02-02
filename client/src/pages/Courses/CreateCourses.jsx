import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateCourse = () => {
    const [formData, setFormData] = useState({
        courseTitle: '',
        courseDescription: '',
        coursePrice: 0,
        teacher: '',
    });
    
    const [teachers, setTeachers] = useState([]); // Ensure initial state is an array
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/teacher/get');
                console.log('Fetched teachers:', response.data); // Log the fetched data
                setTeachers(response.data); // Ensure this is an array
            } catch (err) {
                console.error('Error fetching teachers:', err);
                setError('Failed to load teachers');
            }
        };

        fetchTeachers();
    }, []);

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
                <select
                    value={formData.teacher || ""}
                    onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                    required
                >
                    <option value="" disabled>Select a Teacher</option>
                    {teachers.length > 0 ? (
                        teachers.map((teacher) => (
                            <option key={teacher._id} value={teacher._id}>
                                {teacher.teacherName}
                            </option>
                        ))
                    ) : (
                        <option disabled>Loading teachers...</option>
                    )}
                </select>



                <button type="submit">Create Course</button>
            </form>
        </div>
    );
};

export default CreateCourse;
