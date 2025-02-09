import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateLesson = () => {
    const [lesson, setLesson] = useState({ 
        lessonTitle: '', 
        lessonContent: '',
        course: '' // Add course field
    });
    const [pdfFile, setPdfFile] = useState(null);
    const [courses, setCourses] = useState([]); // Store courses
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // ✅ Fetch courses when the component loads
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/course/get');
                if (response.data.success && Array.isArray(response.data.data)) {
                    setCourses(response.data.data);
                } else {
                    setError('Unexpected response structure for courses.');
                }
            } catch (error) {
                setError('Failed to load courses.');
            }
        };

        fetchCourses();
    }, []);

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

        if (!lesson.lessonTitle.trim()) {
            setError('Lesson title is required.');
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append('lessonTitle', lesson.lessonTitle);
        formData.append('lessonContent', lesson.lessonContent);
        formData.append('course', lesson.course); // ✅ Include selected course

        if (pdfFile) {
            formData.append('lessonPdf', pdfFile);
        }

        try {
            const response = await axios.post('http://localhost:8000/api/lesson/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setSuccess('Lesson created successfully!');
            setLesson({ lessonTitle: '', lessonContent: '', course: '' });
            setPdfFile(null);

            setTimeout(() => navigate('/lessons-management'), 2000);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to create lesson.');
            console.error('Error creating lesson:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Create Lesson</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

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
                
                {/* ✅ Course Dropdown */}
                <div className="mb-3">
                    <label className="form-label">Select Course</label>
                    <select 
                        className="form-control" 
                        value={lesson.course} 
                        onChange={(e) => setLesson({ ...lesson, course: e.target.value })} 
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
                    {isLoading ? 'Uploading...' : 'Create Lesson'}
                </button>
            </form>
        </div>
    );
};

export default CreateLesson;
