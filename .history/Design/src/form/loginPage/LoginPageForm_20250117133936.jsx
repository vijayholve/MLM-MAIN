import React, { useState ,useContext} from "react";
import axios from "axios";
import jwt_decode from "jwt-decode"; // Correct default import 
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

const LoginPageForm = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {username,setUsername} =useContext(UserContext)
  const handleLogin = async (e) => {
    e.preventDefault();
      try {
        const response = await axios.post("http://127.0.0.1:8000/auth/api/token/", {
          username,
          password,
        });

        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);

        const decodedToken = jwt_decode(response.data.access);
        setUsername(decodedToken.username); 
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
