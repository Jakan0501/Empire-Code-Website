import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/Quizzes.css';

const Quizzes = () => {
    const [quizzes, setQuizzes] = useState([]); // State to hold quizzes

    // Fetch quizzes from the API when the component mounts
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('/api/quizzes/get');
                if (response.data && response.data.data) {
                    setQuizzes(response.data.data); // Set the quizzes state
                } else {
                    console.error('Unexpected response structure:', response.data);
                }
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };
        fetchQuizzes();
    }, []);

    // Function to handle starting a quiz
    const handleStartQuiz = (quizId) => {
        // Navigate to the quiz page or handle quiz start logic
        console.log(`Starting quiz with ID: ${quizId}`);
        // You can use React Router to navigate to a quiz detail page
        // e.g., history.push(`/quiz/${quizId}`);
    };

    return (
        <div>
            <h1>Welcome to the Quiz Landing Page</h1>
            <h2>Available Quizzes</h2>
            {quizzes.length > 0 ? (
                <ul>
                    {quizzes.map((quiz) => (
                        <li key={quiz._id}>
                            <span>{quiz.quizQuestion}</span>
                            <button onClick={() => handleStartQuiz(quiz._id)}>Start Quiz</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No quizzes available at the moment. Please check back later!</p>
            )}
        </div>
    );
};

export default Quizzes;
