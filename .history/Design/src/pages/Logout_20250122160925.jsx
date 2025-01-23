import { UserContext } from '../App';
import { useContext } from 'react';
import axios from 'axios';

const Logout = async () => {
     const {baseURL} = useContext(UserContext);
    try {
        const response = await axios.post(`${baseURL}/auth/logout/`, {}, { withCredentials: true });
        if (response.data.success) {
            console.log('Logout successful');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
};

export default Logout