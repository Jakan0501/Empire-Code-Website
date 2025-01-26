import React, { useState } from 'react';
import './css/Quizzes.css';


const questions = [
  {
    question: "What is the primary role of the ChatBot1.Converse block?",
    options: [
      "To send a predefined message.",
      "To process the user's input and return a response.",
      "To clear the text box after a response.",
      "To display the chatbot's name."
    ],
    answer: "To process the user's input and return a response."
  },
  {
    question: "Which component in the front end is responsible for displaying the chat history?",
    options: [
      "TextBox1",
      "Label1",
      "ChatBot1",
      "Button1"
    ],
    answer: "Label1"
  },
  {
    question: "Why is the TextBox1.Text cleared in the GotResponse block?",
    options: [
      "To allow the user to type a new question.",
      "To save memory.",
      "To display the chatbot's answer.",
      "To end the conversation."
    ],
    answer: "To allow the user to type a new question."
  },
  {
    question: "What will happen if the Label1.Text block is not set to include the user's input in the GotResponse block?",
    options: [
      "The app will crash.",
      "The chatbot's response will not display.",
      "The user's input will not appear in the conversation history.",
      "Nothing will happen."
    ],
    answer: "The user's input will not appear in the conversation history."
  }
];

const QuizComponent = () => {
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(''));
  const [submitted, setSubmitted] = useState(false);

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
    <section className="quiz-container">
      <h1>Quizzes</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={index} className="quiz-question">
            <h3>{q.question}</h3>
            <div className="quiz-options">
              {q.options.map((option, i) => (
                <label key={i} className="quiz-option" data-option={`${String.fromCharCode(65 + i)})`}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={userAnswers[index] === option}
                    onChange={() => handleChange(index, option)}
                    disabled={submitted}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="submit" disabled={submitted}>Submit</button>
      </form>

      {submitted && (
        <div className="quiz-results">
          <h2>Results</h2>
          {questions.map((q, index) => (
            <div key={index} className="quiz-result">
              <h3>{q.question}</h3>
              <p>Your answer: {userAnswers[index]}</p>
              <p>Correct answer: {q.answer}</p>
              <p>{userAnswers[index] === q.answer ? 'Correct!' : 'Incorrect!'}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default QuizComponent;
