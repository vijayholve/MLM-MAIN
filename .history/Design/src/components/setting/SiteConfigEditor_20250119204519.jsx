import React, { useContext, useState } from "react";
import { Box, Grid, TextField, Button, Typography, Card, CardContent } from "@mui/material";
import axios from "axios";
import { UserContext } from "../../app";
import { SiteConfig } from "../context/SiteConfingContent";

const SiteConfigEditor = () => {
  const { siteConfigData, setSiteConfig } = useContext(SiteConfig);
  const [formData, setFormData] = useState(siteConfigData || {});
  const { baseURL } = useContext(UserContext);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file inputs
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
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
    } catch (error) {
          {}
    }
  };

  if (!siteConfigData) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Box sx={{ mt: 4, mx: "auto", maxWidth: 800 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Site Configuration Editor
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Navbar Title"
                  name="navbar_title"
                  value={formData.navbar_title || ""}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                >
                  Upload Navbar Image
                  <input
                    type="file"
                    hidden
                    name="navbar_image"
                    onChange={handleFileChange}
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Header Name"
                  name="headers_name"
                  value={formData.headers_name || ""}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Footer Text"
                  name="footer_text"
                  value={formData.footer_text || ""}
                  onChange={handleChange}
                  variant="outlined"
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Primary Color"
                  name="primary_color"
                  value={formData.primary_color || ""}
                  onChange={handleChange}
                  variant="outlined"
                  type="color"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Secondary Color"
                  name="secondary_color"
                  value={formData.secondary_color || ""}
                  onChange={handleChange}
                  variant="outlined"
                  type="color"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Meta Title"
                  name="meta_title"
                  value={formData.meta_title || ""}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Update Site Configuration
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SiteConfigEditor;
