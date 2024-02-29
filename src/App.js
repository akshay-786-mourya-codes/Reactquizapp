import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10); // Set the initial timer value in seconds
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]); 

  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Mars", "Venus", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
    },
  ];

  const handleAnswerClick = (selectedAnswer) => {
    setSelectedAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
    if (!isAnswered) {
      if (selectedAnswer === questions[questionIndex].correctAnswer) {
        setScore(score + 1);
      }
      setIsAnswered(true);
    }
  };

  const handleNextQuestion = () => {
    setQuestionIndex(questionIndex + 1);
    setIsAnswered(false);
    setTimer(10); // Reset the timer for the next question
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(interval);
      handleNextQuestion();
    }

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <>
      {questionIndex < questions.length ? (
        <div>
          <h1>Question {questionIndex + 1}</h1>
          <p>{questions[questionIndex].question}</p>
          <ul style={{ listStyleType: 'none' }}>
            {questions[questionIndex].options.map((option, index) => (
              <li key={index}>
                <input
                  type="radio"
                  id={`option${index}`}
                  name={`option${index}`}
                  value={option}
                  onChange={() => handleAnswerClick(option)}
                  checked={selectedAnswers[questionIndex] === option}
                />
                <label htmlFor={`option${index}`}>{option}</label>
              </li>
            ))}
          </ul>
          <p>Time left: {timer} seconds</p>
          {isAnswered && (
            <div>
              <p>
                {selectedAnswers[questionIndex] === questions[questionIndex].correctAnswer
                  ? "Correct!"
                  : "Incorrect!"}
              </p>
              <button onClick={handleNextQuestion}>Next Question</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1>Quiz Completed!</h1>
          <p>Your Score: {score}</p>
        </div>
      )}
    </>
  );
}

export default App;
