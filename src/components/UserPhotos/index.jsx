import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

import "./styles.css";
import { useParams, useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const location = useLocation();

  // 1. Get the userData passed from the UserDetail component
  const userData = location.state?.userData || {};
  const [photos, setPhotos] = useState([]);
  const apiBase = process.env.REACT_APP_API_URL || "http://localhost:4000";

  // --- NEW CODE: State for the comment box ---
  const [newComments, setNewComments] = useState({});

  const handleAddComment = async (photoId) => {
    if (!newComments[photoId]) return;
    const apiBase = process.env.REACT_APP_API_URL || "http://localhost:4000";

    await fetch(`${apiBase}/api/photos/commentsOfPhoto/${photoId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ comment: newComments[photoId] }),
    });

    try {
      const response = await fetchModel(`/api/photos/${userId}`);
      setPhotos(response.data);

      setNewComments({ ...newComments, [photoId]: "" });
    } catch (error) {
      console.error("Error refreshing photos:", error);
    }
  };

  // 2. Fetch the photos (you'll need to create this endpoint in server.js)
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchModel(`${apiBase}/api/photos/${userId}`);
        setPhotos(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchData();
  }, [userId]);

  return (
    <>
      {photos.map((photo) => (
        <div key={photo._id}>
          <frame>
            <img src={`${apiBase}/images/${photo.file_name}`} />
            <p>{photo.date_time}</p>
            <strong>Comments</strong>
            <br />
            {photo.comments &&
              photo.comments.map((comment) => (
                <div key={comment._id}>
                  <p>
                    <strong>
                      {comment.user_id.first_name} {comment.user_id.last_name}:{" "}
                    </strong>{" "}
                    {comment.comment}
                  </p>
                </div>
              ))}

            {/* --- NEW CODE: The input box and button --- */}
            <div>
              <input
                type="text"
                value={newComments[photo._id] || ""}
                onChange={(e) =>
                  setNewComments({
                    ...newComments,
                    [photo._id]: e.target.value,
                  })
                }
              />
              <button onClick={() => handleAddComment(photo._id)}>
                Add Comment
              </button>
            </div>
          </frame>
        </div>
      ))}
    </>
  );
}

export default UserPhotos;
