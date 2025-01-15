import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/auth/'

const LOGIN_URL = `${BASE_URL}login/`
const REGISTER_URL = `${BASE_URL}register/`
const LOGOUT_URL = `${BASE_URL}logout/`
const AUTHENTICATED_URL = `${BASE_URL}authenticated/`

axios.defaults.withCredentials = true; 

export const login = async (username, password) => {
    try {
        const response = await axios.post(
            LOGIN_URL,
            { username, password },
        );
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        return {
            success: false,
            error: error.response?.data?.error || "Invalid credentials or server error."
        };
    }
};
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;


export const logout = async () => {
    const response = await axios.post(LOGOUT_URL, { withCredentials: true });
    return response.data;
};

export const register = async (username, email, password) => {
    const response = await axios.post(REGISTER_URL, {username, email, password}, { withCredentials: true });
    return response.data;
};

export const authenticated_user = async () => {
    try {
        const response = await axios.get(AUTHENTICATED_URL);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Authentication check failed:", error.response?.data || error.message);
        return {
            success: false,
            error: error.response?.data?.error || "Authentication check failed."
        };
    }
};
