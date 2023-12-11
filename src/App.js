import React, { useState } from "react";
import StartScreen from "./StartScreen";
import QuizScreen from "./QuizScreen";
import EndScreen from "./EndScreen";

function App() {
  const [screen, setScreen] = useState("start"); // 'start', 'quiz', 'end'
  const [quizData, setQuizData] = useState({ questions: [], score: 0 });

  const startQuiz = (data) => {
    setQuizData({ ...quizData, questions: data });
    setScreen("quiz");
  };

  const finishQuiz = (score) => {
    setQuizData({ ...quizData, score });
    setScreen("end");
  };

  const handleRetry = () => {
    setScreen("start");
    setQuizData({ questions: [], score: 0 });
  };

  switch (screen) {
    case "quiz":
      return <QuizScreen data={quizData.questions} onEndQuiz={finishQuiz} />;
    case "end":
      return <EndScreen score={quizData.score} onRetry={handleRetry} />;
    default:
      return <StartScreen onStartQuiz={startQuiz} />;
  }
}

export default App;
