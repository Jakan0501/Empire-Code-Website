import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './QuizDesign.css';

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
    <div className="container mt-4">
      <h1 className="text-center">Manage Quizzes</h1>
      {error && <p className="text-danger text-center">{error}</p>}
      <div className="text-center mb-4">
        <Link to="/create-quiz">
          <button className="btn btn-primary">Create New Quiz</button>
        </Link>
      </div>
      <ul className="list-group">
        {quizzes.map((quiz) => (
          <li key={quiz._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h3>{quiz.quizQuestion}</h3>
              <p><strong>Answer:</strong> {quiz.quizAnswer}</p>
              <p><strong>Result:</strong> {quiz.quizResult}</p>
            </div>
            <div>
              <Link to={`/quizzes/update/${quiz._id}`}>
                <button className="btn btn-warning me-2">Edit</button>
              </Link>
              <button className="btn btn-danger" onClick={() => handleDelete(quiz._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizManagement;
