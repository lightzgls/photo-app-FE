import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import "./styles.css";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar({ loggedInUser, setLoggedInUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  // This is the user you are currently viewing (from your existing code)
  const viewedUser = location.state?.userData;
  const isPhotos = location.pathname.includes("/photos/");
  const handleUpload = () => {
    navigate("/photos/new")
  }
  // Function to handle the logout process
  const handleLogout = async () => {
    try {
      // 1. Tell the backend we are logging out (Assignment requirement)
      await fetch("/admin/logout", { method: "POST" });

      // 2. Remove the JWT token from the browser's storage
      localStorage.removeItem("token");

      // 3. Clear the user state in App.js
      setLoggedInUser(null);

      // 4. Redirect the user back to the login page
      navigate("/login-register");
    } catch (err) {
      console.error("Error logging out", err);
    }
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar style={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE: App Name and Viewing Context */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5" color="inherit">
            Vu Minh Sang
          </Typography>
          {viewedUser && (
            <Typography variant="subtitle1" color="inherit">
              {isPhotos ? "Photos of " : "Details of "}
              {viewedUser.first_name} {viewedUser.last_name}
            </Typography>
          )}
        </div>

        {/* RIGHT SIDE: Auth Status (Hi User / Logout / Please Login) */}
        <div>
          {loggedInUser ? (
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Typography variant="h6" color="inherit">
                Hi {loggedInUser.first_name}
              </Typography>
              <Button onClick={handleUpload}>
                Upload
              </Button>
              <Button color="inherit" variant="outlined" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Typography variant="h6" color="inherit">
              Please Login
            </Typography>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
