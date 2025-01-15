import React, { useState } from "react";
import axios from "axios";
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/api/login/", formData);
      console.log(response.data);
      alert("Sign up successful!");
    } catch (error) {
      console.error(error);
      alert("Error during sign up. Please try again.");
    }
  };

  return (
    <form onSubmit={}>
   
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
      </Card>
      </form>
  );
};

export default LoginUser;
