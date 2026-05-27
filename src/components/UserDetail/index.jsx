import React from "react";
import { Typography, Button } from "@mui/material";

import "./styles.css";
import { Link, useLocation, useParams } from "react-router-dom";
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const location = useLocation();
  const userData = location.state.userData;
  return (
    <>
      <Typography variant="body1">
        {`${userData.first_name} ${userData.last_name}`}
        <br />
        <strong>Location: </strong> {userData.location}
        <br />
        <strong>Occupation: </strong> {userData.occupation}
        <br />
        <strong>Desciption: </strong> {userData.description}
        <br />
        <Button
          variant="contained"
          component={Link}
          to={`/photos/${userId}`}
          state={{ userData }}
        >
          See Photos
        </Button>
      </Typography>
    </>
  );
}

export default UserDetail;
