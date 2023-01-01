import React, { useState } from "react";

const Quiz = () => {
  const quizContent = [
    {
      questionText: "What is React?",
      answerOptions: [
        { answerText: "idk", isCorrect: false },
        { answerText: "frontend", isCorrect: false },
        { answerText: "batates", isCorrect: true },
        { answerText: "backend", isCorrect: false },
      ],
    },
    {
      questionText: "will this code work?",
      answerOptions: [
        { answerText: "yes", isCorrect: false },
        { answerText: "batates", isCorrect: true },
        { answerText: "no", isCorrect: false },
        { answerText: "idk", isCorrect: false },
      ],
    },
    {
      questionText: "what is 2x2?",
      answerOptions: [
        { answerText: "batates", isCorrect: true },
        { answerText: "4", isCorrect: false },
        { answerText: "32", isCorrect: false },
        { answerText: "5", isCorrect: false },
      ],
    },
    {
      questionText: "last question?",
      answerOptions: [
        { answerText: "no", isCorrect: false },
        { answerText: "yes", isCorrect: false },
        { answerText: "nooooo", isCorrect: false },
        { answerText: "batates", isCorrect: true },
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
    <div className="quiz">
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

export default Quiz;
