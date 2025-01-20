import React, { useContext, useEffect, useState } from "react";
import SiteConfingContent, { SiteConfig } from "../context/SiteConfingContent";
import axios from "axios";
import { UserContext } from "../../app";
import { Alert, Box, Button, TextField, Typography, Checkbox, FormControlLabel,  Snackbar,} from "@mui/material";

const SiteConfigEditor = () => {
  const { siteConfigData, setSiteConfig } = useContext(SiteConfig);
  useEffect(

    const [formData, setFormData] = useState(siteConfigData || {});
     ,
    []
  )
  const [error, setError] = useState(null); // State to hold error messages
  const { baseURL } = useContext(UserContext);
  const [successMessage,setsuccessMessage] = useState("")
  const [openMessage, setOpenMessage] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null); // Clear error when user starts editing
  };
  const handleCloseMessage = () => {
    setOpenMessage(false);
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
    setError(null); // Clear error when user uploads a file
  };
  console.log(formData.navbar_image);

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
      setOpenMessage(true)
      setsuccessMessage("Site configuration updated successfully!");
      setError(null); // Clear error state on success
    } catch (error) {
      if (error.response) {
        // Check if detailed errors are provided
        const errorDetails = error.response.data.details || {};
        const errorMessages = Object.entries(errorDetails)
          .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
          .join('\n');
     
        setError(errorMessages || error.response.data.error || "Something went wrong");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setOpenMessage(false)
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
            value={formData.navbar_title}
            onChange={handleChange}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography>Navbar Image:</Typography>
          {formData.about_image && 
           <img
           src={`${baseURL}${formData.about_image}`}
           alt="Navbar"
           style={{ width: "100px", height: "auto", marginBottom: "10px" }}
         />
         }
          <input type="file" name="navbar_image" onChange={handleFileChange} />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Header Name"
            name="headers_name"
            value={formData.headers_name}
            onChange={handleChange}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Footer Text"
            name="footer_text"
            value={formData.footer_text}
            onChange={handleChange}
            multiline
            rows={3}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
    <TextField
      fullWidth
      label="Contact Email"
      name="contact_email"
      value={formData.contact_email || ""}
      onChange={handleChange}
    />
  </Box>

  {/* Homepage Banner */}
  <Box sx={{ mb: 2 }}>
    <Typography>Homepage Banner:</Typography>
    <input type="file" name="homepage_banner" onChange={handleFileChange} />
  </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Primary Color"
            name="primary_color"
            value={formData.primary_color}
            onChange={handleChange}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Secondary Color"
            name="secondary_color"
            value={formData.secondary_color}
            onChange={handleChange}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Meta Title"
            name="meta_title"
            value={formData.meta_title}
            onChange={handleChange}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Meta Description"
            name="meta_description"
            value={formData.meta_description}
            onChange={handleChange}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Meta Keywords"
            name="meta_keywords"
            value={formData.meta_keywords}
            onChange={handleChange}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="About Text"
            name="about_text"
            value={formData.about_text}
            onChange={handleChange}
            multiline
            rows={4}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography>About Image:</Typography>
          {formData.about_image && 
           <img
           src={`${baseURL}${formData.about_image}`}
           alt="Navbar"
           style={{ width: "100px", height: "auto", marginBottom: "10px" }}
         />
         }
          <input type="file" name="about_image" onChange={handleFileChange} />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            multiline
            rows={3}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography>Favicon:</Typography>
          <input type="file" name="favicon" onChange={handleFileChange} />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Default Language"
            name="default_language"
            value={formData.default_language}
            onChange={handleChange}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Privacy Policy"
            name="privacy_policy"
            value={formData.privacy_policy}
            onChange={handleChange}
            multiline
            rows={5}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Terms and Conditions"
            name="terms_and_conditions"
            value={formData.terms_and_conditions}
            onChange={handleChange}
            multiline
            rows={5}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.is_maintenance}
                name="is_maintenance"
                onChange={handleChange}
              />
            }
            label="Enable Maintenance Mode"
          />
        </Box>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update
        </Button>
      </form>
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
      
    </Box>
  );
};

export default SiteConfigEditor;
