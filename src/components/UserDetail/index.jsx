import React, { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiBase = process.env.REACT_APP_API_URL || "http://localhost:8081";
        const response = await fetchModel(`${apiBase}/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    fetchData();
  }, [userId]);

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <>
      <Typography variant="h5">
        {user.first_name} {user.last_name}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        <strong>Location:</strong> {user.location}
        <br />
        <strong>Occupation:</strong> {user.occupation}
        <br />
        <strong>Description:</strong> {user.description}
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to={`/photos/${userId}`}
        sx={{ mt: 2 }}
      >
        See Photos
      </Button>
    </>
  );
}

export default UserDetail;
