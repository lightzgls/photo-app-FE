import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";

const Register = () => {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [occupation, setOccupation] = useState("");

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    // Check passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const apiBase = process.env.REACT_APP_API_URL || "http://localhost:8081";
      const response = await fetch(`${apiBase}/api/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login_name: loginName,
          password,
          first_name: firstName,
          last_name: lastName,
          location,
          description,
          occupation,
        }),
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Registration failed");
      }

      setSuccessMsg("Account created successfully! You can now log in.");

      // Clear form
      setLoginName("");
      setPassword("");
      setConfirmPassword("");
      setFirstName("");
      setLastName("");
      setLocation("");
      setDescription("");
      setOccupation("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleRegister} sx={{ width: "100%", mt: 1 }}>
      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
      {successMsg && (
        <Typography color="success.main" align="center">
          {successMsg}
        </Typography>
      )}

      {/* Required fields */}
      <TextField
        label="Login Name *"
        fullWidth
        margin="normal"
        value={loginName}
        onChange={(e) => setLoginName(e.target.value)}
        required
      />
      <TextField
        label="Password *"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <TextField
        label="Confirm Password *"
        type="password"
        fullWidth
        margin="normal"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <TextField
        label="First Name *"
        fullWidth
        margin="normal"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <TextField
        label="Last Name *"
        fullWidth
        margin="normal"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />

      {/* Optional fields */}
      <TextField
        label="Location"
        fullWidth
        margin="normal"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <TextField
        label="Occupation"
        fullWidth
        margin="normal"
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
      />
      <TextField
        label="Description"
        fullWidth
        margin="normal"
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 3, mb: 2 }}>
        Register Me
      </Button>
    </Box>
  );
};

export default Register;
