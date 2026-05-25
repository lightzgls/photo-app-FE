// src/components/LoginRegister/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setLoggedInUser }) => {
  const [loginName, setLoginName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiBase = process.env.REACT_APP_API_URL || "http://localhost:4000";
      // Assuming you have a baseApi variable defined, otherwise just use "/admin/login"
      const response = await fetch(`${apiBase}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login_name: loginName }), // NO password!
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      // 1. Save the token to the browser's local storage
      localStorage.setItem("token", data.token);

      // 2. Update your React state with the user info
      setLoggedInUser(data.user);

      // 3. Redirect to the user's detail page
      navigate(`/users/${data.user._id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginName">Login Name:</label>
          <input
            type="text"
            id="loginName"
            value={loginName}
            onChange={(e) => setLoginName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
