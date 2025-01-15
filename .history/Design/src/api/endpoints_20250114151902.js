import axios from "axios";

// Base URL for the authentication API
const BASE_URL = "http://127.0.0.1:8000/auth/";

// API endpoints
const LOGIN_URL = `${BASE_URL}login/`;
const REGISTER_URL = `${BASE_URL}register/`;
const LOGOUT_URL = `${BASE_URL}logout/`;
const AUTHENTICATED_URL = `${BASE_URL}authenticated/`;

// Axios configuration
axios.defaults.withCredentials = true; // Include cookies in cross-origin requests
axios.defaults.headers.common["Content-Type"] = "application/json";


const [accessTokenrefreshToken] =

/**
 * Login user
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 */
export const login = async (username, password) => {
  try {
    const response = await axios.post(
      LOGIN_URL,
      { username, password }, // Object shorthand for cleaner syntax
      { withCredentials: true } // Ensures cookies are included
    );

    // Check if the response contains a success attribute (depends on backend response structure)
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    return false; // Return false or handle the error as needed
  }
};

export const get_notes = async () => {
  const response = await axios.get(NOTES_URL, { withCredentials: true });
  return response.data;
};

export const logout = async () => {
  const response = await axios.post(LOGOUT_URL, { withCredentials: true });
  return response.data;
};

export const register = async (username, email, password) => {
  const response = await axios.post(
    REGISTER_URL,
    { username, email, password },
    { withCredentials: true }
  );
  return response.data;
};

export const authenticated_user = async () => {
  const response = await axios.get(AUTHENTICATED_URL, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
}); return response.data;
};
