import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const CreateQuizzes = () => {
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
            const response = await axios.post('http://localhost:8000/api/quiz/create', [quiz]); // Sending as an array
            if (response.status === 201) {
                setSuccess(true);
                setQuiz({ quizQuestion: '', quizOptions: [''], quizAnswer: '', quizResult: '', lesson: '' }); // Reset form
                setError(null);
            }
        } catch (error) {
            console.error('Error creating quiz:', error);
            setError('Failed to create quiz. Please try again.');
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
            <h1 className="text-center">Create a New Quiz</h1>
            {error && <p className="text-danger text-center">{error}</p>}
            {success && <p className="text-success text-center">Quiz created successfully!</p>}
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
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
                <label className="form-label">Quiz Options</label>
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
                <button type="submit" className="btn btn-primary">Create Quiz</button>
            </form>
        </div>
    );
};

export default CreateQuizzes;
