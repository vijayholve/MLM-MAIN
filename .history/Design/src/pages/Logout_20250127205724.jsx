import { useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutComponent = () => {
  const { setUsername } = useContext(UserContext); // Optional if you're clearing username context
  const LOGOUT_URL = "http://127.0.0.1:8000/auth/logout/";
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {

      const response = await axios.post(
        'http://127.0.0.1:8000/auth/logout/',
        {},
        { withCredentials: true }
    );
            if (response.data.success) {
        console.log("Logout successful");
        setUsername(null); // Clear user context if needed
        navigate("/login"); // Redirect to login page
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  <button
      onClick={onClick}
      className="btn btn-danger d-flex align-items-center justify-content-center gap-2"
      style={{
        padding: "10px 20px",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "500",
        cursor: "pointer",
      }}
    >
      <i className={`${icon}`}></i>
      Logout
    </button>  
};

export default LogoutComponent;
