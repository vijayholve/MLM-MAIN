import React, { useState, useContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  Stack,
  FormControl,
  FormLabel,
} from "@mui/material";

const LoginPageForm = () => {
  const [localUsername, setLocalUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [openMessage, setOpenMessage] = useState(false);
  const [submitBlock,setsubmitBlock]=useState(false)
  const navigate = useNavigate();
  const { setUsername ,baseURL } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setsubmitBlock(true)
    try {
      const response = await axios.post(`${baseURL}/auth/api/token/`, {
        username: localUsername,
        password,
      });
      localStorage.setItem("token", response.data.token); // Store token

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      const decodedToken = jwt_decode(response.data.access);
      setUsername(decodedToken.username);
      
      setSuccessMessage("Login successful! Redirecting...");
      setOpenMessage(true);
      setsubmitBlock(false)
      setTimeout(() => navigate("/"), 1000); // Redirect after 1.5 seconds
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials. Please try again.");
      setOpenMessage(true);
      setsubmitBlock(false)

    }
  };

  const handleCloseMessage = () => {
    setOpenMessage(false);
  };

  return (
    <Card
      variant="outlined"
      sx={{ padding: 4, maxWidth: 500, margin: "0 auto", mt: 5 }}
    >
      <Typography
        component="h1"
        variant="h4"
        sx={{
          width: "100%",
          fontSize: "clamp(2rem, 10vw, 2.15rem)",
          textAlign: "center",
          mb: 2,
        }}
      >
        Login
      </Typography>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        onSubmit={handleLogin}
      >
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <TextField
            id="username"
            type="text"
            placeholder="Enter your username"
            value={localUsername}
            onChange={(e) => setLocalUsername(e.target.value)}
            required
            fullWidth
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
        </FormControl>

        <Button disabled={submitBlock} type="submit" variant="contained" color="primary">
          Login
        </Button>
      </Box>

      {/* Success message */}
      {successMessage && (
        <Snackbar
          open={openMessage}
          autoHideDuration={6000}
          onClose={handleCloseMessage}
        >
          <Alert
            onClose={handleCloseMessage}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {successMessage}
          </Alert>
        </Snackbar>
      )}

      {/* Error message */}
      {error && (
        <Stack sx={{ width: "100%", mt: 2 }} spacing={2}>
          <Alert severity="error" variant="filled">
            {error}
          </Alert>
        </Stack>
      )}
    </Card>
  );
};

export default LoginPageForm;
