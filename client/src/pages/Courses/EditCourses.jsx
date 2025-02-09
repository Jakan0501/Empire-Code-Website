import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import CourseForm from './CoursesForm';

const UpdateCourse = () => {
    const { id } = useParams(); // Get course ID from URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        courseTitle: '',
        courseDescription: '',
        coursePrice: 0,
        teacher: '',
    });
    const [teachers, setTeachers] = useState([]);
    const [error, setError] = useState(null);

    // Fetch course data
    useEffect(() => {
        if (!id) {
            setError("Invalid course ID");
            return;
        }

        const fetchCourseData = async () => {
            try {
                const courseResponse = await axios.get(`http://localhost:8000/api/course/get/${id}`);
                if (courseResponse.data.success) {
                    setFormData(courseResponse.data.data);
                } else {
                    setError('Failed to load course data');
                }
            } catch (err) {
                console.error("Error fetching course:", err);
                setError('Failed to fetch course data');
            }
        };

        fetchCourseData();
    }, [id]);

    // Fetch teachers list
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/teacher/get');
                if (response.data.success && Array.isArray(response.data.data)) {
                    setTeachers(response.data.data);
                } else {
                    setError("Unexpected response structure for teachers");
                }
            } catch (err) {
                setError("Failed to load teachers");
            }
        };

        fetchTeachers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/course/update/${id}`, formData);
            navigate('/courses');
        } catch (err) {
            const message = err.response ? err.response.data.message : err.message;
            setError(`Failed to update course: ${message}`);
        }
    };

    return (
        <div className="container">
            <h1>Update Course</h1>
            {error && <p className="text-danger">{error}</p>}
            <CourseForm
                formData={formData}
                setFormData={setFormData}
                teachers={teachers}  // ✅ Ensure teachers list is passed
                error={error}
                onSubmit={handleSubmit}
                mode="update"
            />
        </div>
    );
};

export default UpdateCourse;
