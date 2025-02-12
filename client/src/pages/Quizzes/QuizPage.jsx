import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../css/Quizzes.css"; // Add custom CSS for styling

const QuizPage = () => {
  const { lessonId } = useParams(); // Get lessonId from the URL parameters
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/quiz/getByLesson/${lessonId}`
        );
        if (response.data.success && response.data.data) {
          setQuestions(response.data.data);
          setUserAnswers(Array(response.data.data.length).fill("")); // Initialize answers as empty strings
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        setError("Failed to fetch questions.");
        console.error("Error fetching questions:", error);
      }
    };

    if (lessonId) {
      fetchQuestions();
    }
  }, [lessonId]);

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = value; // Update the specific answer
    setUserAnswers(updatedAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // Mark quiz as submitted
  };

  return (
    <section className="quiz">
      <h1>Quiz for this Lesson</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={index} className="question">
            <h3>{q.quizQuestion}</h3>
            <div className="options">
              {q.quizOptions.map((option, i) => (
                <div key={i} className="option">
                  <input
                    type="radio"
                    name={`question-${index}`} // Ensure unique names for each question
                    value={option}
                    onChange={() => handleAnswerChange(index, option)} // Update state when an option is selected
                    disabled={submitted} // Disable inputs once the quiz is submitted
                  />
                  <span>{`${String.fromCharCode(97 + i)})`} {option}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button type="submit" disabled={submitted}>
          Submit
        </button>
      </form>
      {submitted && (
        <div className="results">
          <h2a>Results</h2a>
          {questions.map((q, index) => (
            <div key={index} className="result">
              <h3>{q.quizQuestion}</h3>
              <p>Your answer: {userAnswers[index]}</p>
              <p>Correct answer: {q.quizAnswer}</p>
              <p>
                {userAnswers[index] === q.quizAnswer
                  ? "Correct!"
                  : "Incorrect!"}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default QuizPage;