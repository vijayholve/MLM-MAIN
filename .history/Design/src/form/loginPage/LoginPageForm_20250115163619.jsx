import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode"; // Correct default import 
import { useNavigate } from "react-router-dom";

const LoginPageForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/api/token/", {
        username,
        password,
      });

      // Store tokens in localStorage
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      // Decode and set user information
      const decodedToken = jwt_decode(response.data.access);
      setUser(response.data.username); // This can be used for authenticated routes
      console.log("Logging in with", { username, password });

      // Redirect to the home page after successful login
      navigate("/"); // Navigate to home page
    } catch (error) {
      setError(` ${error} Invalid credentials`);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPageForm;
