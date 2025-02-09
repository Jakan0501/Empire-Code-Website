import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './QuizDesign.css'; // Import your QuizDesign.css

const EditQuiz = () => {
    const { id } = useParams(); // Get the quiz ID from the URL
    const [quiz, setQuiz] = useState({
        quizQuestion: '',
        quizOptions: [''], // Initialize with one empty option
        quizAnswer: '',
        quizResult: '',
        lesson: '' // New field for the selected lesson
    });
    const [lessons, setLessons] = useState([]); // State to hold lessons
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    // Fetch the quiz data when the component mounts
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/quiz/get/${id}`);
                setQuiz(response.data.data); // Assuming this includes quizOptions
            } catch (error) {
                setError('Failed to fetch quiz data.');
            }
        };

        fetchQuiz();
    }, [id]);

    // Fetch lessons from the API
    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/lesson/get');
                setLessons(response.data.data);
            } catch (error) {
                console.error('Error fetching lessons:', error);
                setError('Failed to fetch lessons.');
            }
        };

        fetchLessons();
    }, []);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8000/api/quiz/update/${id}`, quiz);
            if (response.status === 200) {
                setSuccess(true);
                setError(null);
                navigate('/quizzes-management'); // Redirect to quiz management after success
            }
        } catch (error) {
            console.error('Error updating quiz:', error);
            setError('Failed to update quiz. Please try again.');
            setSuccess(false);
        }
    };

    // Function to handle option change
    const handleOptionChange = (index, value) => {
        const updatedOptions = [...quiz.quizOptions];
        updatedOptions[index] = value;
        setQuiz({ ...quiz, quizOptions: updatedOptions });
    };

    // Function to add a new option
    const addOption = () => {
        setQuiz({ ...quiz, quizOptions: [...quiz.quizOptions, ''] });
    };

    // Function to remove an option
    const removeOption = (index) => {
        const updatedOptions = quiz.quizOptions.filter((_, i) => i !== index);
        setQuiz({ ...quiz, quizOptions: updatedOptions });
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Edit Quiz</h1>
            {error && <p className="text-danger text-center">{error}</p>}
            {success && <p className="text-success text-center">Quiz updated successfully!</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Quiz Question</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter the quiz question"
                        value={quiz.quizQuestion}
                        onChange={(e) => setQuiz({ ...quiz, quizQuestion: e.target.value })}
                        required
                    />
                </div>
                <h3>Quiz Options</h3>
                {quiz.quizOptions.map((option, index) => (
                    <div key={index} className="mb-3 d-flex align-items-center">
                        <label className="form-label me-2">{`Option ${index + 1}`}</label>
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder={`Enter option ${index + 1}`}
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            required
                        />
                        <button type="button" className="btn btn-danger" onClick={() => removeOption(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" className="btn btn-secondary mb-3" onClick={addOption}>Add Option</button>

                <div className="mb-3">
                    <label className="form-label">Select Lesson</label>
                    <select
                        className="form-select"
                        value={quiz.lesson}
                        onChange={(e) => setQuiz({ ...quiz, lesson: e.target.value })}
                        required
                    >
                        <option value="">Choose a lesson...</option>
                        {lessons.map((lesson) => (
                            <option key={lesson._id} value={lesson._id}>
                                {lesson.lessonTitle}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Quiz Answer</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter the correct answer"
                        value={quiz.quizAnswer}
                        onChange={(e) => setQuiz({ ...quiz, quizAnswer: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Quiz Result</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter the quiz result"
                        value={quiz.quizResult}
                        onChange={(e) => setQuiz({ ...quiz, quizResult: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Quiz</button>
            </form>
        </div>
    );
};

export default EditQuiz;
