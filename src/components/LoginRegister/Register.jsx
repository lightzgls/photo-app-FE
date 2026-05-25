import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";

const Register = ({ setIsLoginView }) => {
  // Required Info
  const [loginName, setLoginName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  // Additional Info for UserDetail
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [occupation, setOccupation] = useState("");

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    try {
      // NOTE: Looking at your backend screenshot, your index.js expects plural "/api/users/register"
      const apiBase = process.env.REACT_APP_API_URL || "http://localhost:4000";
      const response = await fetch(`${apiBase}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login_name: loginName,
          first_name: firstName,
          last_name: lastName,
          location: location,
          description: description,
          occupation: occupation,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      setSuccessMsg("Account created successfully! You can now log in.");
      
      // Clear the form fields
      setLoginName("");
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
      
      {error && <Typography color="error" align="center">{error}</Typography>}
      {successMsg && <Typography color="success.main" align="center">{successMsg}</Typography>}

      {/* --- REQUIRED FIELDS --- */}
      <TextField
        label="Login Name *"
        variant="outlined"
        fullWidth
        margin="normal"
        value={loginName}
        onChange={(e) => setLoginName(e.target.value)}
        required
      />
      <TextField
        label="First Name *"
        variant="outlined"
        fullWidth
        margin="normal"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <TextField
        label="Last Name *"
        variant="outlined"
        fullWidth
        margin="normal"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />

      {/* --- OPTIONAL EXTRA FIELDS --- */}
      <TextField
        label="Location"
        variant="outlined"
        fullWidth
        margin="normal"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <TextField
        label="Occupation"
        variant="outlined"
        fullWidth
        margin="normal"
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      
      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        sx={{ mt: 3, mb: 2 }}
      >
        Register Me
      </Button>

      <Button
        color="secondary"
        fullWidth
        onClick={() => setIsLoginView(true)}
      >
        Already have an account? Login here.
      </Button>

    </Box>
  );
};

export default Register;