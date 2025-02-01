import React, { useState } from 'react';
import axios from 'axios';
// import '../../css/CreateQuizzes.css'; // Add your own styles here

const CreateQuizzes = () => {
    const [quiz, setQuiz] = useState({
        quizQuestion: '',
        quizOptions: [''], // Initialize with one empty option
        quizAnswer: '',
        quizResult: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/quiz/create', [quiz]); // Sending as an array
            if (response.status === 201) {
                setSuccess(true);
                setQuiz({ quizQuestion: '', quizOptions: [''], quizAnswer: '', quizResult: '' }); // Reset form
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
        <div>
            <h1>Create a New Quiz</h1>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">Quiz created successfully!</p>}
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
                <button type="submit">Create Quiz</button>
            </form>
        </div>
    );
};

export default CreateQuizzes;
