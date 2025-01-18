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
          setLoading(false); 
        }
    };

    const loginUser = async (username, password) => {
        const user = await login(username, password)
        console.log(user)
        if (user) {
          setUser(user)
        } else {
          alert('Incorrect username or password')
        }
    }

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