import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  authenticated_user,
  login,
  logout,
  register,
} from "../../api/endpoints";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For handling errors
  const nav = useNavigate();

  // Fetch authenticated user
  const get_authenticated_user = async () => {
    try {
      const user = await authenticated_user();
      setUser(user);
    } catch (error) {
      setUser(null);
      setErrorFailed to fetch authenticated user.");
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const loginUser = async (username, password) => {
    try {
     
      const user = await login(username, password)
      if (user) {
        setUser(user); // Update user state
        return { success: true, message: "Login successful" };
      } else {
        return {
          success: false,
          message: response.data.error || "Login failed",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || "An error occurred.",
      };
    }
  };

  // Logout user
  const logoutUser = async () => {
    try {
      await logout();
      setUser(null); // Clear user data on logout
      nav("/login");
    } catch (error) {
      setError("Failed to logout.");
    }
  };

  // Register user
  const registerUser = async (username, email, password, confirm_password) => {
    if (password !== confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await register(username, email, password);
      alert("User successfully registered");
      nav("/login");
    } catch (error) {
      setError("Error registering user.");
    }
  };

  useEffect(() => {
    if (!user) {
      get_authenticated_user();
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);