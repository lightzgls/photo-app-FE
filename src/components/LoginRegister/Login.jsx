import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";

const Login = ({ setLoggedInUser }) => {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const apiBase = process.env.REACT_APP_API_URL || "http://localhost:8081";
      const response = await fetch(`${apiBase}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login_name: loginName, password }),
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Login failed");
      }

      const data = await response.json();

      // Save token and update state
      localStorage.setItem("token", data.token);
      setLoggedInUser(data.user);
      navigate(`/users/${data.user._id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", mt: 1 }}>
      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}

      <TextField
        label="Login Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={loginName}
        onChange={(e) => setLoginName(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
