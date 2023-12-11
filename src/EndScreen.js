import React from "react";

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
} from "@mui/material";

function EndScreen({ score, onRetry }) {
  return (
    <div>
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
          <Typography variant="h5">Quiz Finished</Typography>
        </Toolbar>
      </Box>

      <p>Your score: {score}</p>

      <Button variant="contained" variant="contained" onClick={onRetry}>
        Retry Quiz
      </Button>
    </div>
  );
}

export default EndScreen;
