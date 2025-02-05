import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import CourseForm from './CoursesForm';

const UpdateCourse = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        courseTitle: '',
        courseDescription: '',
        coursePrice: 0,
        teacher: '',
    });
    const [teachers, setTeachers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const courseResponse = await axios.get(`http://localhost:8000/api/course/get/${courseId}`);
                const teachersResponse = await axios.get('http://localhost:8000/api/teacher/get');
                setFormData(courseResponse.data);
                setTeachers(teachersResponse.data);
            } catch (err) {
                setError('Failed to fetch course data');
            }
        };
        fetchCourseData();
    }, [courseId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/course/update/${courseId}`, formData);
            navigate('/courses');
        } catch (err) {
            const message = err.response ? err.response.data.message : err.message;
            setError(`Failed to update course: ${message}`);
        }
    };

    return (
        <div className="container">
            <h1>Update Course</h1>
            <CourseForm
                formData={formData}
                setFormData={setFormData}
                teachers={teachers}
                error={error}
                onSubmit={handleSubmit}
                mode="update"
            />
        </div>
    );
};

export default UpdateCourse;
