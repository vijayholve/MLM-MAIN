import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  authenticated_user,
  login,
  logout,
  register,
} from "../../api/endpoints";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const get_authenticated_user = async () => {
    try {
      const user = await authenticated_user();
      setUser(user);
    } catch (error) {
      setUser(null); 
    } finally {
      setLoading(false); 
    }
  };
  const loginUser = async (username, password) => {
    try {
      const response = await login(username, password);
      if (response.success) {
        const userData = response.user;  // Extract user data from response
        setUser(userData);  // Update the user state
        nav("/");  // Redirect to home page or dashboard
      } else {
        console.log("Incorrect username or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  
  const logoutUser = async () => {
    await logout();
    nav("/login");
  };

  const registerUser = async (username, email, password, confirm_password) => {
    try {
      if (password === confirm_password) {
        await register(username, email, password);
        alert("User successfully registered");
        nav("/login");
      }
    } catch {
      alert("error registering user");
    }
  };

  useEffect(() => {
    get_authenticated_user();
  }, [window.location.pathname]);

  return (
    <AuthContext.Provider
      value={{ user, loading, loginUser, logoutUser, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
