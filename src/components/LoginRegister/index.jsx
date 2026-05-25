import React, { useState } from "react";
import { Paper, Typography, Button, Box } from "@mui/material";
import Login from "./Login";
import Register from "./Register";

const LoginRegister = ({ setLoggedInUser }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper
        elevation={3}
        style={{ padding: "30px", maxWidth: "400px", width: "100%" }}
      >
        <Typography variant="h5" gutterBottom align="center">
          {isLoginView ? "Welcome Back" : "Create an Account"}
        </Typography>

        {isLoginView ? (
          <Login setLoggedInUser={setLoggedInUser} />
        ) : (
          <Register />
        )}

        {/* This is the Toggle Section that was missing! */}
        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            {isLoginView
              ? "Don't have an account yet?"
              : "Already have an account?"}
          </Typography>
          <Button
            color="primary"
            onClick={toggleView}
            style={{ marginTop: "8px" }}
          >
            {isLoginView ? "Register Here" : "Login Here"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginRegister;
