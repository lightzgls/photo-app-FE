import React from "react";
import {Typography, Button} from "@mui/material";

import "./styles.css";
import {useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchModel from "../../lib/fetchModelData";
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const {userId} = useParams();
    const [userData, setUserData] = useState([]);

    useEffect(() => {
      async function fetchData() {
        try {
          const apiBase = process.env.REACT_APP_API_URL || "http://localhost:4000";
          const response = await fetchModel(`${apiBase}/users/${userId}`);
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
      fetchData();
    }, [userId]);
    return (
        <>
          <Typography variant="body1">
            {`${userData.first_name} ${userData.last_name}`}
            <br/>
            <strong>Location: </strong> {userData.location}
            <br/>
            <strong>Occupation: </strong> {userData.occupation}
            <br/>
            <strong>Desciption: </strong> {userData.description}
            <br/>
            <Button variant="contained" component={Link} to={`/photos/${userId}`} state={{ userData }}>
                See Photos
            </Button>
          </Typography>
        </>
    );
}

export default UserDetail;
