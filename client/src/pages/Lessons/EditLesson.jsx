import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditLesson = () => {
    const { id } = useParams();
    const [lesson, setLesson] = useState({ lessonTitle: '', lessonContent: '', course: '' });
    const [pdfFile, setPdfFile] = useState(null);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // ✅ Fetch lesson details
    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/lesson/get/${id}`);
                if (response.data.success) {
                    setLesson({
                        lessonTitle: response.data.data.lessonTitle,
                        lessonContent: response.data.data.lessonContent,
                        course: response.data.data.course || '',
                    });
                } else {
                    setError('Lesson not found.');
                }
            } catch (error) {
                setError('Failed to fetch lesson data.');
            }
        };

        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/course/get');
                if (response.data.success && Array.isArray(response.data.data)) {
                    setCourses(response.data.data);
                } else {
                    setError('Unexpected response structure for courses.');
                }
            } catch (error) {
                setError('Failed to fetch courses.');
            }
        };

        fetchLesson();
        fetchCourses();
    }, [id]);

    const handleChange = (e) => {
        setLesson({ ...lesson, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file && file.type !== 'application/pdf') {
            setError('Only PDF files are allowed.');
            setPdfFile(null);
            return;
        }

        if (file && file.size > 5 * 1024 * 1024) {
            setError('File size must be less than 5MB.');
            setPdfFile(null);
            return;
        }

        setError(null);
        setPdfFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('lessonTitle', lesson.lessonTitle);
        formData.append('lessonContent', lesson.lessonContent);
        formData.append('course', lesson.course);

        if (pdfFile) {
            formData.append('lessonPdf', pdfFile);
        }

        try {
            await axios.put(`http://localhost:8000/api/lesson/update/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            navigate('/lessons-management');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update lesson.');
        } finally {
            setIsLoading(false);
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
                        name="lessonTitle"
                        placeholder="Lesson Title"
                        value={lesson.lessonTitle}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        name="lessonContent"
                        placeholder="Lesson Content"
                        value={lesson.lessonContent}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* ✅ Course Selection Dropdown */}
                <div className="mb-3">
                    <label className="form-label">Select Course</label>
                    <select
                        className="form-control"
                        name="course"
                        value={lesson.course}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select Course --</option>
                        {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                                {course.courseTitle}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <input
                        type="file"
                        className="form-control"
                        accept="application/pdf"
                        onChange={handleFileChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update Lesson'}
                </button>
            </form>
        </div>
    );
};

export default EditLesson;
