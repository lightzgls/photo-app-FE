import React, { useRef } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function TopBar({ loggedInUser, setLoggedInUser }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const apiBase = process.env.REACT_APP_API_URL || "http://localhost:8081";

  // --- Logout ---
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedInUser(null);
    navigate("/login-register");
  };

  // --- Photo Upload ---
  const handleAddPhoto = () => {
    fileInputRef.current.click(); // open file picker
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiBase}/api/photos/new`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      alert("Photo uploaded!");

      // Navigate to the logged-in user's photos so they see it
      navigate(`/photos/${loggedInUser._id}`);
    } catch (err) {
      alert("Upload failed: " + err.message);
    }

    // Reset so the same file can be picked again
    e.target.value = "";
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Typography variant="h5" color="inherit">
          Vu Minh Sang
        </Typography>

        {loggedInUser ? (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Typography variant="h6" color="inherit">
              Hi {loggedInUser.first_name}
            </Typography>

            {/* Hidden file input for photo upload */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Button color="inherit" variant="outlined" onClick={handleAddPhoto}>
              Add Photo
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
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
