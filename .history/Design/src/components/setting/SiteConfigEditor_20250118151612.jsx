import React, { useContext, useState } from 'react';
import axios from 'axios';
import { SiteConfigContext } from './SiteConfigContext';
import { UserContext } from '../../app';

const SiteConfigEditor = () => {
  const { siteConfig, setSiteConfig } = useContext(SiteConfigContext);
  const [formData, setFormData] = useState(siteConfig);
  const {baseURL} = useContext(UserContext)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${baseURL}/siteconfig/', formData); 
      setSiteConfig(response.data); // Update the context
      alert('Site configuration updated successfully!');
    } catch (error) {
      console.error('Failed to update site configuration:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Navbar Title:</label>
        <input
          type="text"
          name="navbar_title"
          value={formData.navbar_title}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Navbar Image URL:</label>
        <input
          type="text"
          name="navbar_image"
          value={formData.navbar_image}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Header Name:</label>
        <input
          type="text"
          name="headers_name"
          value={formData.headers_name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Footer Text:</label>
        <textarea
          name="footer_text"
          value={formData.footer_text}
          onChange={handleChange}
        ></textarea>
      </div>

      <div>
        <label>Contact Email:</label>
        <input
          type="email"
          name="contact_email"
          value={formData.contact_email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Social Links (JSON):</label>
        <textarea
          name="social_links"
          value={JSON.stringify(formData.social_links, null, 2)}
          onChange={(e) =>
            setFormData({
              ...formData,
              social_links: JSON.parse(e.target.value || '{}'),
            })
          }
        ></textarea>
      </div>

      <button type="submit">Update</button>
    </form>
  );
};

export default SiteConfigEditor;
