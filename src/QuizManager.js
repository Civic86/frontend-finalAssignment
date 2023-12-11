import React, { useState } from "react";

function QuizManager({ onQuizUpdate }) {
  const [quizzes, setQuizzes] = useState([]);
  const [editQuiz, setEditQuiz] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("yes");

  const handleAddQuiz = () => {
    const newQuiz = { id: Date.now(), question, answer };
    setQuizzes([...quizzes, newQuiz]);
    onQuizUpdate([...quizzes, newQuiz]);
    setQuestion("");
    setAnswer("yes");
  };

  const handleEditQuiz = (quiz) => {
    setEditQuiz(quiz);
    setQuestion(quiz.question);
    setAnswer(quiz.answer);
  };

  const handleUpdateQuiz = () => {
    const updatedQuizzes = quizzes.map((q) =>
      q.id === editQuiz.id ? { ...q, question, answer } : q
    );
    setQuizzes(updatedQuizzes);
    onQuizUpdate(updatedQuizzes);
    setEditQuiz(null);
    setQuestion("");
    setAnswer("yes");
  };

  const handleDeleteQuiz = (quizId) => {
    const updatedQuizzes = quizzes.filter((q) => q.id !== quizId);
    setQuizzes(updatedQuizzes);
    onQuizUpdate(updatedQuizzes);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <select value={answer} onChange={(e) => setAnswer(e.target.value)}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        {editQuiz ? (
          <button onClick={handleUpdateQuiz}>Update Quiz</button>
        ) : (
          <button onClick={handleAddQuiz}>Add Quiz</button>
        )}
      </div>
      {quizzes.map((quiz) => (
        <div key={quiz.id}>
          <span>{quiz.question}</span>
          <span>{quiz.answer}</span>
          <button onClick={() => handleEditQuiz(quiz)}>Edit</button>
          <button onClick={() => handleDeleteQuiz(quiz.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default QuizManager;
