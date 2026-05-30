import "./App.css";
import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/LoginRegister";

function App() {
  // Read saved user from localStorage so refresh doesn't log out
  const [loggedInUser, setLoggedInUserRaw] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // Keeps localStorage in sync with React state
  function setLoggedInUser(user) {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    setLoggedInUserRaw(user);
  }

  // If not logged in, redirect to login page
  function requireLogin(element) {
    return loggedInUser ? element : <Navigate to="/login-register" />;
  }

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
          </Grid>

          <div className="main-topbar-buffer" />

          <Grid item sm={3}>
            <Paper className="main-grid-item">
              {loggedInUser && <UserList />}
            </Paper>
          </Grid>

          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route
                  path="/login-register"
                  element={
                    loggedInUser
                      ? <Navigate to={`/users/${loggedInUser._id}`} />
                      : <LoginRegister setLoggedInUser={setLoggedInUser} />
                  }
                />
                <Route path="/users/:userId" element={requireLogin(<UserDetail />)} />
                <Route path="/photos/:userId" element={requireLogin(<UserPhotos />)} />
                <Route
                  path="/"
                  element={
                    loggedInUser
                      ? <Navigate to={`/users/${loggedInUser._id}`} />
                      : <Navigate to="/login-register" />
                  }
                />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
}

export default App;
