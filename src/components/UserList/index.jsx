import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import {Link} from "react-router-dom"
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList () {
    const [users, setUsers] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
      async function fetchData() {
        try {
          const apiBase = process.env.REACT_APP_API_URL || "http://localhost:4000";
          const response = await fetchModel(`${apiBase}/users/list`);
          setUsers(response.data);
          console.log(users);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
      fetchData();
    }, []);
    const handleListItemClick = (e, index) => {
      setSelectedIndex(index);
    }

    return (
      <div>
        <Typography variant="body1">
          This is the user list, which takes up 3/12 of the window. You might
          choose to use <a href="https://mui.com/components/lists/">Lists</a>{" "}
          and <a href="https://mui.com/components/dividers/">Dividers</a> to
          display your users like so:
        </Typography>
        <List component="nav">
          {users.map((item) => (
            <ListItem 
              key={item._id} 
              divider={true} 
              disablePadding
            >
              <ListItemButton 
                selected={selectedIndex === item._id}
                onClick={(e) => {handleListItemClick(e, item._id)}}
                component={Link}
                to={`/users/${item._id}`}
                state={{ userData: item }}
              >
                <ListItemText primary={`${item.first_name} ${item.last_name}`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Typography variant="body1">
          The model comes in from models.userListModel()
        </Typography>
      </div>
    );
}

export default UserList;
