import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditQuiz = () => {
    const { id } = useParams(); // Get the quiz ID from the URL
    const [quiz, setQuiz] = useState({
        quizQuestion: '',
        quizOptions: [''], // Initialize with one empty option
        quizAnswer: '',
        quizResult: ''
    });
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
        <div>
            <h1>Edit Quiz</h1>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">Quiz updated successfully!</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Quiz Question"
                    value={quiz.quizQuestion}
                    onChange={(e) => setQuiz({ ...quiz, quizQuestion: e.target.value })}
                    required
                />
                <h3>Quiz Options</h3>
                {quiz.quizOptions.map((option, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder={`Option ${index + 1}`}
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            required
                        />
                        <button type="button" onClick={() => removeOption(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addOption}>Add Option</button>
                <input
                    type="text"
                    placeholder="Quiz Answer"
                    value={quiz.quizAnswer}
                    onChange={(e) => setQuiz({ ...quiz, quizAnswer: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Quiz Result"
                    value={quiz.quizResult}
                    onChange={(e) => setQuiz({ ...quiz, quizResult: e.target.value })}
                />
                <button type="submit">Update Quiz</button>
            </form>
        </div>
    );
};

export default EditQuiz;
