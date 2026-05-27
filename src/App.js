import "./App.css";
import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/LoginRegister"; // Imports the new index.jsx wrapper
import AddPhoto from "./components/PhotoUpload";

const App = (props) => {
  // Add state to track the logged-in user
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* Pass state to TopBar so it can display "Hi User" or "Please Login" */}
            <TopBar
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
            />
          </Grid>

          <div className="main-topbar-buffer" />

          <Grid item sm={3}>
            <Paper className="main-grid-item">
              {/* Only show the UserList sidebar if someone is logged in */}
              {loggedInUser && <UserList />}
            </Paper>
          </Grid>

          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                {/* The Login/Register Route */}
                <Route
                  path="/login-register"
                  element={
                    loggedInUser ? (
                      <Navigate to={`/users/${loggedInUser._id}`} />
                    ) : (
                      <LoginRegister setLoggedInUser={setLoggedInUser} />
                    )
                  }
                />

                {/* Protected Routes (Require Login) */}
                <Route
                  path="/users/:userId"
                  element={
                    loggedInUser ? (
                      <UserDetail />
                    ) : (
                      <Navigate to="/login-register" />
                    )
                  }
                />
                <Route
                  path="/photos/new"
                  element={
                    loggedInUser ? (
                      <AddPhoto />
                    ) : (
                      <Navigate to="/login-register" />
                    )
                  }
                />
                <Route
                  path="/photos/:userId"
                  element={
                    loggedInUser ? (
                      <UserPhotos />
                    ) : (
                      <Navigate to="/login-register" />
                    )
                  }
                />

                {/* Default Route */}
                <Route
                  path="/"
                  element={
                    loggedInUser ? (
                      <Navigate to={`/users/${loggedInUser._id}`} />
                    ) : (
                      <Navigate to="/login-register" />
                    )
                  }
                />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
