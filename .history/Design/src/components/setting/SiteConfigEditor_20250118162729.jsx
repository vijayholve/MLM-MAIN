import React, { useContext, useState } from "react";
import SiteConfingContent from "../context/SiteConfingContent";
import axios from "axios";
import { UserContext } from "../../app";

const SiteConfigEditor = () => {
  const { siteConfigData, setSiteConfig } = useContext(site);
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

      alert("Site configuration updated successfully!");
    } catch (error) {
      console.error("Error updating site configuration:", error);
    }
  };

  if (!siteConfigData) {
    return <p>Loading...</p>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Navbar Title:</label>
        <input
          type="text"
          name="navbar_title"
          value={formData.navbar_title || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Navbar Image:</label>
        <input type="file" name="navbar_image" onChange={handleFileChange} />
      </div>
      <div>
        <label>Header Name:</label>
        <input
          type="text"
          name="headers_name"
          value={formData.headers_name || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Footer Text:</label>
        <textarea
          name="footer_text"
          value={formData.footer_text || ""}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label>Primary Color:</label>
        <input
          type="text"
          name="primary_color"
          value={formData.primary_color || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Secondary Color:</label>
        <input
          type="text"
          name="secondary_color"
          value={formData.secondary_color || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Meta Title:</label>
        <input
          type="text"
          name="meta_title"
          value={formData.meta_title || ""}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default SiteConfigEditor;
