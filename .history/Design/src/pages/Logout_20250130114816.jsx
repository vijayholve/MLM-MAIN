import { useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutComponent = () => {
  const { setUsername ,baseURL} = useContext(UserContext); // Optional if you're clearing username context
  const navigate = useNavigate();
   
 
  
  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("access_token"); // Get access token
      const refreshToken = localStorage.getItem("refresh_token"); // Get refresh token
  
      if (!accessToken) {
        console.error("No access token found. User might not be logged in.");
        return;
      }
  
      if (!refreshToken) {
        console.error("No refresh token found.");
        return;
      }
  
      console.log("Sending access token:", accessToken); // Debugging
  
      const response = await axios.post(
        `${baseURL}/auth/logout/`,
        { refresh_token: refreshToken }, // Send refresh token in request body
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Send access token
          },
        }
      );
  
      console.log("Response from backend:", response.data);
  
      if (response.data.success) {
        console.log("Logout successful");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/login");
      } else {
        console.error("Logout failed:", response.data);
      }
    } catch (error) {
      console.error("Error during logout:", error.response?.data || error.message);
    }
  };
  
  
    return(
      <button
      onClick={handleLogout}
      className="btn btn-outline-dark d-flex align-items-center justify-content-center gap-2"
      style={{
        padding: "10px 20px",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "500",
        cursor: "pointer",
      }}
    >
      <i className='bi bi-box-arrow-right'></i>
      Logout
    </button>
    )
};

export default LogoutComponent;
