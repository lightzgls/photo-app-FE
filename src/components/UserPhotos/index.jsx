import React, { useState, useEffect } from "react";
import { Typography, TextField, Button, Card, CardMedia, CardContent, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const apiBase = process.env.REACT_APP_API_URL || "http://localhost:8081";

  // Track new comment text per photo
  const [commentTexts, setCommentTexts] = useState({});

  // Fetch photos
  const fetchPhotos = async () => {
    try {
      const response = await fetchModel(`${apiBase}/api/photosOfUser/${userId}`);
      setPhotos(response.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [userId]);

  // Handle comment text change for a specific photo
  const handleCommentChange = (photoId, text) => {
    setCommentTexts((prev) => ({ ...prev, [photoId]: text }));
  };

  // Submit a comment
  const handleAddComment = async (photoId) => {
    const text = (commentTexts[photoId] || "").trim();
    if (!text) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiBase}/api/commentsOfPhoto/${photoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment: text }),
      });

      if (!response.ok) throw new Error("Failed to add comment");

      // Clear the input and re-fetch photos to show the new comment
      setCommentTexts((prev) => ({ ...prev, [photoId]: "" }));
      fetchPhotos();
    } catch (err) {
      alert("Error adding comment: " + err.message);
    }
  };

  return (
    <>
      {photos.map((photo) => (
        <Card key={photo._id} sx={{ mb: 3 }}>
          <CardMedia
            component="img"
            image={`${apiBase}/images/${photo.file_name}`}
            alt="User photo"
            sx={{ maxHeight: 500, objectFit: "contain" }}
          />
          <CardContent>
            <Typography variant="caption" color="text.secondary">
              {new Date(photo.date_time).toLocaleString()}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Typography variant="subtitle2">Comments</Typography>

            {photo.comments &&
              photo.comments.map((c) => (
                <Typography key={c._id} variant="body2" sx={{ ml: 1, mt: 0.5 }}>
                  <strong>
                    {c.user ? `${c.user.first_name} ${c.user.last_name}` : "Unknown"}:
                  </strong>{" "}
                  {c.comment}
                </Typography>
              ))}

            {/* Add comment form */}
            <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
              <TextField
                size="small"
                placeholder="Add a comment..."
                fullWidth
                value={commentTexts[photo._id] || ""}
                onChange={(e) => handleCommentChange(photo._id, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddComment(photo._id);
                  }
                }}
              />
              <Button
                variant="contained"
                size="small"
                onClick={() => handleAddComment(photo._id)}
              >
                Post
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default UserPhotos;
