import { UserContext } from '../App';
import axios from 'axios';

const LogoutComponent =  () => {
    /auth/logout/""
    try {
        const response = await axios.post(LOGOUT_URL, { withCredentials: true });
        const response = axios.post(`${baseURL}/auth/logout/`, {}, { withCredentials: true });
        if (response.data.success) {
            console.log('Logout successful');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }else{
            console.log("fjo")
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
};

export default LogoutComponent