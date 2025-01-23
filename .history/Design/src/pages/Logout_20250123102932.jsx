import { useContext } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutComponent = () => {
  const { setUsername } = useContext(UserContext); // Optional if you're clearing username context
  const LOGOUT_URL = "http://127.0.0.1:8000/auth/logout/";
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(LOGOUT_URL, { withCredentials: true });
      if (response.data.success) {
        console.log('Logout successful');
        setUsername(null); // Clear user context if needed
        navigate('/login'); // Redirect to login page
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutComponent;
