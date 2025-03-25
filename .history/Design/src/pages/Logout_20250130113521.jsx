import { useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutComponent = () => {
  const { setUsername ,baseURL} = useContext(UserContext); // Optional if you're clearing username context
  const navigate = useNavigate();
   
 
  
  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
  
      if (!refreshToken) {
        console.error("No refresh token found in localStorage.");
        return;
      }
  
      console.log("Sending refresh token:", refreshToken); // Debugging
  
      const response = await axios.post(
        `${baseURL}/auth/logout/`,
        { refresh_token: refreshToken }, // Ensure refresh token is sent
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
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
