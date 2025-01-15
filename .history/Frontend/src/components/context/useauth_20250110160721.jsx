import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// import { authenticated_user, login, logout, register } from '../api/endpoints';
import { authenticated_user, login, logout, register } from '../../api/endpoints';
const AuthContext = createContext();

export const AuthProvider = ({children}) => {

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
          setLoading(false); // Set loading to false after request completes
        }
    };

   const loginUser = async (username, password) => {
  try {
    const response = await axios.post("/api/login", { username, password });
    if (response.status === 200) {
      // Save token or perform necessary actions for successful login
      return { success: true, message: "Login successful" };
    } else {
      return { success: false, message: "Invalid username or password" };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.detail || "Login failed",
    };
  }
};

    const logoutUser = async () => {
      await logout();
      nav('/login')
    }

    const registerUser = async (username, email, password, confirm_password) => {
      try {
        if (password === confirm_password) {
          await register(username, email, password)
          alert('User successfully registered')
          nav('/login')
        }
      } catch {
        alert('error registering user')
      }
    }

    useEffect(() => {
        get_authenticated_user();
    }, [window.location.pathname])

    return (
        <AuthContext.Provider value={{ user, loading, loginUser, logoutUser, registerUser }}>
          {children}
        </AuthContext.Provider>
      );
}

export const useAuth = () => useContext(AuthContext);