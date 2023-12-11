import React, { useState } from "react";

import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  CssBaseline,
  Container,
  Button,
  Stack,
  Paper,
} from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./styles.css";

function QuizScreen({ data, onEndQuiz }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  const question = data[currentQuestionIndex];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    if (selectedOption === question.correct_answer) {
      setScore(score + 1);
    }
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < data.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedOption(null);
    } else {
      onEndQuiz(score);
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-end"
      flexWrap="wrap"
    >
      <div>
        <Box>
          <Box width="100%" maxWidth="md" m="auto">
            <Toolbar>
              <Typography variant="h5">{question.question}</Typography>
            </Toolbar>
          </Box>

          {question.incorrect_answers
            .concat(question.correct_answer)
            .map((option, index) => (
              <Paper elevation={1} sx={{ margin: "1rem auto" }}>
                <Stack spacing={6} direction="row">
                  <Button
                    variant="contained"
                    variant="text"
                    key={index}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </Button>
                </Stack>
              </Paper>
            ))}
          <Button
            variant="contained"
            variant="contained"
            onClick={handleNextClick}
          >
            Next Question
          </Button>
        </Box>
      </div>
    </Stack>
  );
}

export default QuizScreen;
