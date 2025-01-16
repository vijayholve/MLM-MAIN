import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProtectedPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem("access_token");

      // Redirect if no token is present
      if (!token) {
        setError("No token found. Redirecting to login...");
        setLoading(false);
        setTimeout(() => navigate("/login"), 2000); // Delayed navigation for better UX
        return;
      }

      try {
        // Attempt to fetch protected data
        const response = await axios.get(
          "http://127.0.0.1:8000/auth/protected-endpoint/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data.message);
        setUser(response.data.)
      } catch (error) {
        if (error.response) {
          // Handle HTTP error statuses
          if (error.response.status === 401) {
            setError("Unauthorized access. Redirecting to login...");
            localStorage.removeItem("access_token"); // Clear token
            setTimeout(() => navigate("/login"), 2000); // Delayed navigation
          } else {
            setError("Server error. Please try again later.");
          }
        } else {
          setError("Network error. Check your connection and try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProtectedData();
  }, [navigate]);

  return (
    <div className="protected-page">
      {loading ? (
        <div className="loading">
          <p>Loading...</p>
          {/* Optionally replace with a spinner or animation */}
        </div>
      ) : error ? (
        <div className="error">
          <p>{error}</p>
        </div>
      ) : (
        <div className="content">
          <h2>Protected Data</h2>
          <p>{data}</p>
        </div>
      )}
    </div>
  );
};

export default ProtectedPage;
