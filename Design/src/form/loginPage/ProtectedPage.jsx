import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const ProtectedPage = ({ children }) => {
  const navigate = useNavigate();
  const { setUsername, username } = useContext(UserContext);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("access_token");

      // Redirect if no token is found
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Validate the token by calling a protected endpoint
        const response = await axios.get(
          "http://127.0.0.1:8000/auth/protected-endpoint/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Assuming the response contains the username
        setUsername(response.data.username ); 
      } catch (error) {
        console.error("Error verifying token:", error);
        localStorage.removeItem("access_token"); // Remove invalid token
        navigate("/login");
      }
    };

    verifyToken();
  }, [navigate, setUsername]);

  // Redirect while waiting for verification or if username isn't set
  if (!username) {
    return null; // Optionally, render a loader or placeholder
  }

  // Render protected content
  return <>{children}</>;
};

export default ProtectedPage;
