import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import CourseForm from './CoursesForm';

const ViewCourse = () => {
    const { id } = useParams(); // Get course ID from URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        courseTitle: '',
        courseDescription: '',
        coursePrice: 0,
        teacher: '',
    });
    const [lessons, setLessons] = useState([]);
    const [error, setError] = useState(null);

    // Fetch course data and lessons
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

        const fetchLessons = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/lesson/course/${id}`);
                if (response.data.success) {
                    setLessons(response.data.data);
                } else {
                    setError('Failed to load lessons');
                }
            } catch (err) {
                console.error("Error fetching lessons:", err);
                setError('Failed to fetch lessons');
            }
        };

        fetchCourseData();
        fetchLessons();
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
                setFormData={() => {}}
                teachers={[]}
                error={error}
                onSubmit={() => {}}
                mode="view"
            />
            
            <h2 className="mt-4">Lessons</h2>
            {lessons.length === 0 ? (
                <p>No lessons available for this course.</p>
            ) : (
                <ul className="list-group">
                    {lessons.map((lesson) => (
                        <li key={lesson._id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>{lesson.lessonTitle}</span>
                            <Link to={`/view-lesson/${lesson._id}`} className="btn btn-primary">View Lesson</Link>
                        </li>
                    ))}
                </ul>
            )}

            <button onClick={handleBack} className="btn btn-secondary mt-3">
                Back to Courses
            </button>
        </div>
    );
};

export default ViewCourse;
