import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CourseForm from './CoursesForm'; // Ensure the path is correct


const ViewCourse = () => {
    const { id } = useParams(); // Get course ID from URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        courseTitle: '',
        courseDescription: '',
        coursePrice: 0,
        teacher: '',
    });
    const [error, setError] = useState(null);

    // Fetch course data
    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/course/get/${id}`);
                if (response.data.success) {
                    setFormData(response.data.data);
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

    const handleBack = () => {
        navigate('/courses'); // Navigate back to courses list
    };

    return (
        <div className="container">
            <h1>View Course</h1>
            {error && <p className="text-danger">{error}</p>}
            <CourseForm
                formData={formData}
                setFormData={() => {}} // No-op function since we don't want to change data in view mode
                teachers={[]} // No need for teachers in view mode
                error={error}
                onSubmit={() => {}} // No submit action needed in view mode
                mode="view" // Set mode to 'view'
            />
            <button onClick={handleBack} className="btn btn-secondary mt-3">
                Back to Courses
            </button>
        </div>
    );
};

export default ViewCourse;
