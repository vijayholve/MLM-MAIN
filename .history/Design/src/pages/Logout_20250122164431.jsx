import { useContext } from 'react';
import { UserContext } from '../App';
import axios from 'axios';
const logout = async () => {
    const { baseURL } = useContext(UserContext);

    try {
        const response = await axios.post('/logout/', {}, { withCredentials: true });
        if (response.data.success) {
            console.log('Logout successful');
            setUser(null); // Clear user from context
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
};

export default logout