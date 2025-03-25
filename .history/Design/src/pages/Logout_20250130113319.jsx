import { useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutComponent = () => {
  const { setUsername ,baseURL} = useContext(UserContext); // Optional if you're clearing username context
  const navigate = useNavigate();
   
  const refreshToken = async () => {
    const refresh_token = localStorage.getItem("refresh_token");
  
    if (!refresh_token) return null;
  
    try {
      const response = await axios.post(`${baseURL}/auth/token/refresh/`, { refresh: refresh_token });
  
      if (response.data.access) {
        localStorage.setItem("access_token", response.data.access);
        return response.data.access;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
    }
  
    return null;
  };
  
  const handleLogout = async () => {
    let accessToken = localStorage.getItem("access_token");
  
    if (!accessToken) {
      accessToken = await refreshToken();
    }
  
    if (!accessToken) {
      console.error("No valid token available.");
      return;
    }
  
    try {
      const response = await axios.post(
        `${baseURL}/auth/logout/`,
        {}, 
        {
          withCredentials: true,
          headers: { "Authorization": `Bearer ${accessToken}` }
        }
      );
  
      if (response.data.success) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUsername(null);
        navigate("/login");
      } else {
        console.error("Logout failed:", response.data);
      }
    } catch (error) {
      console.error("Error during logout:", error);
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
