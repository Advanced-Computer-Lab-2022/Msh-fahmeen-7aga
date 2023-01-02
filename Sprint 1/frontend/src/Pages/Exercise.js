import React, { useState } from "react";
import "../Components/Exercise.css";


const Exercise = () => {
  const quizContent = [
    {
      questionText: "What is React?",
      answerOptions: [
        { answerText: "programming language", isCorrect: false },
        { answerText: "database", isCorrect: false },
        { answerText: "frontend", isCorrect: true },
        { answerText: "backend", isCorrect: false },
      ],
    },
    {
      questionText: "what is JavaScript?",
      answerOptions: [
        { answerText: "programming language", isCorrect: true },
        { answerText: "database", isCorrect: false },
        { answerText: "frontend", isCorrect: false },
        { answerText: "backend", isCorrect: false },
      ],
    },
    {
      questionText: "what is 2x2?",
      answerOptions: [
        { answerText: "7", isCorrect: false },
        { answerText: "4", isCorrect: true },
        { answerText: "21", isCorrect: false },
        { answerText: "5", isCorrect: false },
      ],
    },
    {
      questionText: "is this the last question?",
      answerOptions: [
        { answerText: "no", isCorrect: false },
        { answerText: "yes", isCorrect: true },
        { answerText: "maybe", isCorrect: false },
        { answerText: "idk", isCorrect: false },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizContent.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  return (
    <div className="exercise">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {quizContent.length}
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{quizContent.length}
            </div>
            <div className="question-text">
              {quizContent[currentQuestion].questionText}
            </div>
          </div>
          <div className="answer-section">
            {quizContent[currentQuestion].answerOptions.map((answerOption) => (
              <button
                onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
              >
                {answerOption.answerText}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Exercise;
