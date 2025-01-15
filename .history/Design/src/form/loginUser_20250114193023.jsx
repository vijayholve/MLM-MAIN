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

const LoginUser_component = () => {
  const { loginUser } = useAuth();
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
    e.preventDefault();
    setsubmitblock(true);
    setopenmessage(false);

        const response = await loginUser(formData.username, formData.password);

        if (response.success) {
            setmessage({ success: "Login successful!", failure: "" });
            setError([]); // Clear any existing errors
            setopenmessage(true);
        } else {
            setError([response.error || "Login failed"]);
            setmessage({ success: "", failure: response.error || "Login failed." });
            setopenmessage(true);
        }
        setError(["Unexpected error occurred. Please try again later."]);
        setmessage({ success: "", failure: "An unexpected error occurred." });
        setopenmessage(true);
    } finally {
        setsubmitblock(false);
    }
};


  return (
    <>
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
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          onSubmit={handleSubmit}
        >
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
              autocomplete="current-password"
              onChange={handleChange}
            />
          </FormControl>

          <Typography sx={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Link href="/signup" variant="body2" sx={{ alignSelf: "center" }}>
              Sign Up
            </Link>
          </Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={submitblock}
        >
          Submit
        </Button>
        </Box>

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
    </>
  );
};

export default LoginUser_component;
