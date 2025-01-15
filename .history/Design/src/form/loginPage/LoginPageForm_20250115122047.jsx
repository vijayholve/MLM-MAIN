import React, { useState } from "react";
import axios from "axios";
[vite] connecting... client:742:8
Uncaught SyntaxError: The requested module 'http://localhost:5173/node_modules/.vite/deps/jwt-decode.js?v=c0fc579e' doesn't provide an export named: 'default' LoginPageForm.jsx:20:8
[vite] connected.
const LoginPage = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/api/token/", {
        username,
        password,
      });

      // Log the response to check if the tokens are being returned
      console.log('Response Data:', response.data);

      // Store tokens in localStorage
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      // Decode and set user information
      const decodedToken = jwt_decode(response.data.access);
      setUser(decodedToken); // This can be used for authenticated routes
      console.log('Logging in with', { username, password });

    } catch (error) {
      setError('Invalid credentials');
      console.error('Login error:', error);
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

export default LoginPage;
