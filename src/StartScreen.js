import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  AppBar,
  Toolbar,
  CssBaseline,
  Container,
  Button,
  ThemeProvider,
  Stack,
} from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./styles.css";

import QuizManager from "./QuizManager";

function StartScreen({ onStartQuiz }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [customQuizzes, setCustomQuizzes] = useState([]);

  const handleCustomQuizUpdate = (updatedQuizzes) => {
    setCustomQuizzes(updatedQuizzes);
  };
  const handleCustomQuizStart = () => {
    // クイズが十分にない場合は警告
    if (customQuizzes.length < 3) {
      alert("At least 3 quizzes are needed to start.");
      return;
    }

    // ランダムに3つのクイズを選択
    let selectedQuizzes = [];
    while (selectedQuizzes.length < 3) {
      const randomIndex = Math.floor(Math.random() * customQuizzes.length);
      const selectedQuiz = customQuizzes[randomIndex];
      if (!selectedQuizzes.includes(selectedQuiz)) {
        selectedQuizzes.push(selectedQuiz);
      }
    }

    // 選択されたクイズを処理する
    // 例: 選択されたクイズをコンソールに表示
    console.log("Selected quizzes:", selectedQuizzes);

    // クイズを開始するロジックをここに実装
    // onStartQuiz(selectedQuizzes);  // 例: 選択されたクイズでクイズを開始
  };

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((response) => response.json())
      .then((data) => setCategories(data.trivia_categories));
  }, []);

  const handleStartClick = () => {
    fetch(
      `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${difficulty}&type=multiple`
    )
      .then((response) => response.json())
      .then((data) => onStartQuiz(data.results));
  };

  return (
    <div>
      <Box>
        <AppBar position="relative">
          <Box
            width="100%"
            maxWidth="md"
            sx={{
              bgcolor: "text.secondary",
              color: "background.paper",
              p: 2,
            }}
          >
            <Toolbar>
              <Typography variant="h3">Welcome to the Quiz Game</Typography>
            </Toolbar>
          </Box>
        </AppBar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <Paper elevation={1} sx={{ margin: "1rem auto" }}>
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </Paper>
          <Paper elevation={1} sx={{ margin: "1rem auto" }}>
            <div>
              <label htmlFor="difficulty">Difficulty:</label>
              <select
                id="difficulty"
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </Paper>

          <Button
            variant="contained"
            variant="contained"
            onClick={handleStartClick}
          >
            Start Quiz
          </Button>

          <QuizManager />
          <Button variant="contained" onClick={handleCustomQuizStart}>
            Start Custom Quiz
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default StartScreen;
