import { useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutComponent = () => {
  const { setUsername ,baseURL} = useContext(UserContext); // Optional if you're clearing username context
  const navigate = useNavigate();
   
  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("access_token"); // Get token from storage
  
      if (!accessToken) {
        console.error("No access token found.");
        return;
      }
  
      const response = await axios.post(
        `${baseURL}/auth/logout/`,
        {}, 
        {
          withCredentials: true,
          headers: {
            "Authorization": `Bearer ${accessToken}`, // Ensure token is sent
            "Content-Type": "application/json",
          }
        }
      );
  
      if (response.data.success) {
        console.log("Logout successful");
        localStorage.removeItem("access_token"); // Clear tokens
        localStorage.removeItem("refresh_token");
        setUsername(null); // Clear user context
        navigate("/login"); // Redirect to login page
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
