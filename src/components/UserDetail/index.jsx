import React, { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData"; 
import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Define the async function inside the useEffect
    const getUserData = async () => {
      try {
        // Await the fetch request
        const apiBase = process.env.REACT_APP_API_URL || "http://localhost:4000";
        const response = await fetchModel(`${apiBase}/api/users/${userId}`); 
        setUserData(response.data);
      } catch (err) {
        // Catch any errors just like .catch() would
        console.error("Error fetching user data:", err);
        setError("Could not load user data.");
      }
    };

    // 2. Call the function immediately
    getUserData();
  }, [userId]);

  // Show an error if it fails
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  // Show a loading state while waiting for the server
  if (!userData) {
    return <Typography>Loading user details...</Typography>;
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {`${userData.first_name} ${userData.last_name}`}
      </Typography>
      
      <Typography variant="body1">
        <strong>Location: </strong> {userData.location} <br />
        <strong>Occupation: </strong> {userData.occupation} <br />
        <strong>Description: </strong> {userData.description} <br />
      </Typography>

      <Button
        variant="contained"
        component={Link}
        to={`/photos/${userId}`}
        style={{ marginTop: "16px" }}
      >
        See Photos
      </Button>
    </>
  );
}

export default UserDetail;