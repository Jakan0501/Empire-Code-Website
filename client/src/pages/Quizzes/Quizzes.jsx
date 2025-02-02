import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/Quizzes.css";

const Quizzes = () => {
  const [questions, setQuestions] = useState([]); // State to hold fetched questions
  const [userAnswers, setUserAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null); // State for error handling

  // Fetch questions from the API when the component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/quiz/get"); // Update with your actual API endpoint
        if (response.data && response.data.data) {
          setQuestions(response.data.data);
          setUserAnswers(Array(response.data.data.length).fill("")); // Initialize userAnswers array
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        setError("Failed to fetch questions."); // Set error message
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleChange = (index, value) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = value;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="quiz">
      <h1>Quizzes</h1>
      {error && <p className="error">{error}</p>}{" "}
      {/* Display error message if any */}
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={index} className="question">
            <h3>{q.quizQuestion}</h3> {/* Display the question */}
            <div className="options">
              {q.quizOptions.map((option, i) => (
                <div key={i} className="option">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={userAnswers[index] === option}
                    onChange={() => handleChange(index, option)}
                    disabled={submitted}
                  />
                  <span>
                    {`${String.fromCharCode(97 + i)})`} {option}
                  </span>
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
          <h2>Results</h2>
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

export default Quizzes;
