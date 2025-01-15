import React, { useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Divider,
  FormControlLabel,
  FormLabel,
  FormControl,
  Link,
  TextField,
  Typography,
  Card,
} from "@mui/material";

const LoginUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleClose = () => {
    setopenmessage(false); // Close Snackbar
  };
  const [submitblock,setsubmitblock]=useState(false)
  const [openmessage, setopenmessage] = useState(false);
  const [errors, setError] = useState([]);

  const [message, setmessage] = useState({
    success: "",
    failure: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/api/login/", formData);
      console.log(response.data);
      alert("Sign up successful!");
    } 
    catch(error){
        console.log(error);
        console.error("Error:", error.response?.data || error.message);
  
        // Set error messages correctly
        if (error.response && error.response.data) {
          setError(error.response.data);
        } else {
          setError({ general: "Something went wrong. Please try again." });
        }
  
        setmessage({
          success: "",
          failure: "User is not Created",
        });
  
        setsubmitblock(false);
      }
    }
  

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
          Sign up
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          onSubmit={handleSubmit}
        >
          <FormControl>
            <FormLabel htmlFor="name">username</FormLabel>
            <TextField
              autoComplete="username"
              name="username"
              required
              fullWidth
              id="username"
              placeholder="Jon_Snow"
              value={formData.username}
              onChange={handleChange}
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
            />
          </FormControl>
          <FormControlLabel
                control={
                <Checkbox
                name="receiveUpdates"
                color="primary"
                checked={formData.receiveUpdates}
                onChange={handleChange}
              />
            }
            label="I want to receive updates via email."
          />
          <Button type="submit" fullWidth variant="contained">
            Sign up
          </Button>
        </Box>
        <Divider>
          <Typography sx={{ color: "text.secondary" }}>or</Typography>
        </Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign up with Google")}
          >
            Sign up with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign up with Facebook")}
           
           >
            Sign up with Facebook
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link href="/login" variant="body2" sx={{ alignSelf: "center" }}>
              Sign in
            </Link>
          </Typography>
        </Box>
        
        {message.success && (
          <>
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
          </>
        )}

        {message.failure && (
          <Stack sx={{ width: "40%" }} spacing={2}>
            {message.failure}
            {Object.keys(error).map((key) => (
              <Alert key={error.id} variant="filled" severity="error">
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
