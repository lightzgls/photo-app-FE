import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

import "./styles.css";
import { useLocation } from "react-router-dom";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar () {
  const location = useLocation();
  const userData = location.state?.userData;
  const isPhotos = location.pathname.includes("/photos/");

    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography variant="h5" color="inherit">
            Vu Minh Sang
          </Typography>
          {userData && 
          (<Typography variant="h5" color="inherit">
             {isPhotos ? "Photos of " : "Details of "}{userData.first_name} {userData.last_name}
          </Typography>)}
        </Toolbar>
      </AppBar>
    );
}

export default TopBar;
