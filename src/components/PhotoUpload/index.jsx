import React, { useState } from "react";
export default function AddPhoto({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please pick a file!");
    const formData = new FormData();
    formData.append("photo", file);
    try {
      const apiBase = process.env.REACT_APP_API_URL || "http://localhost:4000";
      const response = await fetch(`${apiBase}/api/photos/new`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`Upload failed with Status ${response.status}`);
      }
      setFile(null);
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {}
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit">Add Photo</button>
    </form>
  );
}
