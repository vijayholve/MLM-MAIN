import React, { useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import { Navigate } from "react-router-dom";
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Card,
  Link,
} from "@mui/material";
import { useAuth } from "../components/context/useAuth";
import { useNavigate } from "react-router-dom";

const LoginUser = () => {
  // const { loginUser } = useAuth();
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [submitblock, setsubmitblock] = useState(false);
  const [openmessage, setopenmessage] = useState(false);
  const [error, setError] = useState([]);
  const [message, setmessage] = useState({
    success: "",
    failure: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setopenmessage(false); // Close Snackbar
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default behavior
    setsubmitblock(true); // Disable button to prevent multiple submissions;
    try {
      console.log("data is ",formData)
    const response = await axios.post('http://127.0.0.1:8000/auth/login-page-2/', {
      formData
    });

    
  };

  return (
    <form onSubmit={handleSubmit}>
      <CssBaseline />
      <Card
        variant="outlined"
        sx={{ padding: 4, maxWidth: 500, margin: "0 auto" }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: "100%",
            fontSize: "clamp(2rem, 10vw, 2.15rem)",
            textAlign: "center",
          }}
        >
          Sign In
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <TextField
              autoComplete="username"
              name="username"
              required
              fullWidth
              id="username"
              placeholder="Jon_Snow"
              value={formData.username}
              onChange={handleChange}
              error={error.username ? true : false}
              helperText={error.username}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              required
              fullWidth
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              error={error.password ? true : false}
              helperText={error.password}
            />
          </FormControl>

          <Typography sx={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Link href="/signup" variant="body2" sx={{ alignSelf: "center" }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={submitblock}
        >
          Submit
        </Button>

        {message.success && (
          <Snackbar
            open={openmessage}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {message.success}
            </Alert>
          </Snackbar>
        )}

        {message.failure && (
          <Stack sx={{ width: "40%" }} spacing={2}>
            {message.failure}
            {Object.keys(error).map((key) => (
              <Alert key={key} variant="filled" severity="error">
                {Array.isArray(error[key]) ? error[key][0] : error[key]}
              </Alert>
            ))}
          </Stack>
        )}
      </Card>
    </form>
  );
};

export default LoginUser;
