import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiBase = process.env.REACT_APP_API_URL || "http://localhost:8081";
        const response = await fetchModel(`${apiBase}/api/users/list`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchData();
  }, []);

  if (users.length === 0) {
    return <Typography variant="body2">No users found.</Typography>;
  }

  return (
    <List component="nav">
      {users.map((user) => (
        <ListItem key={user._id} divider disablePadding>
          <ListItemButton
            selected={selectedId === user._id}
            onClick={() => setSelectedId(user._id)}
            component={Link}
            to={`/users/${user._id}`}
          >
            <ListItemText primary={`${user.first_name} ${user.last_name}`} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default UserList;
