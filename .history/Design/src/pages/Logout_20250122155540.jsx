import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const Logout = async () => {

    try {
        const response = await axios.post('/logout/', {}, { withCredentials: true });
        if (response.data.success) {
            console.log('Logout successful');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
};
