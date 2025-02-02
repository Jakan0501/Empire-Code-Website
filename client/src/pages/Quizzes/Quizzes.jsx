import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/Quizzes.css';

const Quizzes = () => {
    const [quizzes, setQuizzes] = useState([]); // State to hold quizzes
    const [currentQuiz, setCurrentQuiz] = useState(null); // State for the selected quiz
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);

    // Fetch quizzes from the API when the component mounts
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/quiz/get/');
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
    const handleStartQuiz = (quiz) => {
        setCurrentQuiz(quiz);
        setCurrentQuestionIndex(0);
        setAnswers(Array(quiz.questions.length).fill('')); // Initialize answers array
    };

    const handleAnswerChange = (e) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = e.target.value;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        setCurrentQuestionIndex((prev) => Math.min(prev + 1, currentQuiz.questions.length - 1));
    };

    const handlePrevious = () => {
        setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleSubmit = () => {
        // Logic to submit answers (e.g., POST to an API)
        console.log('Submitting answers:', answers);
        // Reset to initial state after submission
        setCurrentQuiz(null);
        setCurrentQuestionIndex(0);
        setAnswers([]);
    };

    return (
        <div>
            <h1>Welcome to the Quiz Page</h1>
            {currentQuiz ? (
                <div>
                    <h2>{currentQuiz.title}</h2>
                    <h3>Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</h3>
                    <p>{currentQuiz.questions[currentQuestionIndex].question}</p>
                    <ul>
                        {currentQuiz.questions[currentQuestionIndex].options.map((option, index) => (
                            <li key={index}>
                                <label>
                                    <input
                                        type="radio"
                                        name="quiz-option"
                                        value={option}
                                        checked={answers[currentQuestionIndex] === option}
                                        onChange={handleAnswerChange}
                                    />
                                    {option}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <div className="navigation-buttons">
                        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Previous</button>
                        {currentQuestionIndex < currentQuiz.questions.length - 1 ? (
                            <button onClick={handleNext}>Next</button>
                        ) : (
                            <button onClick={handleSubmit}>Submit</button>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <h2>Available Quizzes</h2>
                    {quizzes.length > 0 ? (
                        <ul>
                            {quizzes.map((quiz) => (
                                <li key={quiz._id}>
                                    <span>{quiz.title}</span>
                                    <button onClick={() => handleStartQuiz(quiz)}>Start Quiz</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No quizzes available at the moment. Please check back later!</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Quizzes;
