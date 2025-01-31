import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditQuiz = () => {
    const { id } = useParams(); // Get the quiz ID from the URL
    const [quiz, setQuiz] = useState({
        quizQuestion: '',
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
                setQuiz(response.data.data);
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
