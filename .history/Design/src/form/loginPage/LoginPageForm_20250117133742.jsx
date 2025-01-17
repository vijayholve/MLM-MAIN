import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import {
  Card,
  Typography,
  Box,
  Button,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";

const ProtectedPage = ({ children }) => {
  const navigate = useNavigate();
  const { setUsername, username } = useContext(UserContext);

  const [error, setError] = useState({});
  const [message, setMessage] = useState({ success: "", failure: "" });
  const [openMessage, setOpenMessage] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setMessage({
          success: "",
          failure: "No token found. Redirecting to login.",
        });
        setOpenMessage(true);
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/auth/protected-endpoint/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUsername(response.data.username);
        setMessage({
          success: "User verified successfully.",
          failure: "",
        });
        setOpenMessage(true);
      } catch (err) {
        console.error("Error verifying token:", err);
        setError({ general: "Invalid or expired token." });
        setMessage({
          success: "",
          failure: "Session expired. Redirecting to login.",
        });
        setOpenMessage(true);
        localStorage.removeItem("access_token"); // Remove invalid token
        navigate("/login");
      }
    };

    verifyToken();
  }, [navigate, setUsername]);

  const handleCloseMessage = () => {
    setOpenMessage(false);
  };

  if (!username) {
    return (
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
          Verifying User...
        </Typography>
      </Card>
    );
  }

  return (
    <>
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
          Protected Content
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          {children}
        </Box>
      </Card>

      {message.success && (
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
            {message.success}
          </Alert>
        </Snackbar>
      )}

      {message.failure && (
        <Stack sx={{ width: "100%", marginTop: 2 }} spacing={2}>
          <Alert severity="error" variant="filled">
            {message.failure}
          </Alert>
          {Object.keys(error).map((key) => (
            <Alert key={key} variant="filled" severity="error">
              {Array.isArray(error[key]) ? error[key][0] : error[key]}
            </Alert>
          ))}
        </Stack>
      )}
    </>
  );
};

export default ProtectedPage;
