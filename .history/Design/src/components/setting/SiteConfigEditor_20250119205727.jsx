import React, { useContext, useState } from "react";
import SiteConfingContent, { SiteConfig } from "../context/SiteConfingContent";
import axios from "axios";
import { UserContext } from "../../app";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";

const SiteConfigEditor = () => {
  const { siteConfigData, setSiteConfig } = useContext(SiteConfig);
  const [formData, setFormData] = useState(siteConfigData || {});
  const [error, setError] = useState(null); // State to hold error messages
  const { baseURL } = useContext(UserContext);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null); // Clear error when user starts editing
  };

  // Handle file inputs
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
    setError(null); // Clear error when user uploads a file
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.put(
        `${baseURL}/siteconfig/main/`,
        formDataObj,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setSiteConfig(response.data);
      alert("Site configuration updated successfully!");
      setError(null);
    } catch (error) {
      if (error.response) {
        // Handle server-side validation errors
        setError(error.response.data.error || "Something went wrong");
        console.error(
          "Validation Details: ",
          error.response.data.details || {}
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      // setSuccessMessage(null);
    }
  };

  if (!siteConfigData) {
    return <p>Loading...</p>;
  }

  return (
    <Box sx={{ p: 3, maxWidth: "600px", mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Site Configuration Editor
      </Typography>

      {/* Display error message */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Navbar Title"
            name="navbar_title"
            value={formData.navbar_title || ""}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography>Navbar Image:</Typography>
          <input type="file" name="navbar_image" onChange={handleFileChange} />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Header Name"
            name="headers_name"
            value={formData.headers_name || ""}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Footer Text"
            name="footer_text"
            value={formData.footer_text || ""}
            multiline
            rows={3}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Primary Color"
            name="primary_color"
            value={formData.primary_color || ""}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Secondary Color"
            name="secondary_color"
            value={formData.secondary_color || ""}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Meta Title"
            name="meta_title"
            value={formData.meta_title || ""}
            onChange={handleChange}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update
        </Button>
      </form>
    </Box>
  );
};

export default SiteConfigEditor;
