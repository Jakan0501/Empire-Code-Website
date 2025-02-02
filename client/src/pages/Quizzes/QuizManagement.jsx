import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/quiz/get");
        setQuizzes(response.data.data);
      } catch (error) {
        setError("Failed to fetch quizzes.");
      }
    };

    fetchQuizzes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/quiz/delete/${id}`);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== id)); // Update state to remove deleted quiz
    } catch (error) {
      setError("Failed to delete quiz.");
    }
  };

  return (
    <div>
      <h1>Manage Quizzes</h1>
      {error && <p className="error">{error}</p>}
      <Link to="/create-quiz">
        <button>Create New Quiz</button>
      </Link>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
            <h3>{quiz.quizQuestion}</h3>
            <p>Answer: {quiz.quizAnswer}</p>
            <p>Result: {quiz.quizResult}</p>
            <Link to={`/quizzes/update/${quiz._id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(quiz._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizManagement;
