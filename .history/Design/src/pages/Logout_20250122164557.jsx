import { useContext } from 'react';
import { UserContext } from '../App';
import axios from 'axios';
const LogoutComponent =  () => {
    const { baseURL } = useContext(UserContext);

    try {
        const response = axios.post(`${baseURL}/auth/logout/`, {}, { withCredentials: true });
        if (response.data.success) {
            console.log('Logout successful');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
};

export default LogoutComponent