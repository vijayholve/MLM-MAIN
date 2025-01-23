import { UserContext } from '../App';
import axios from 'axios';

const LogoutComponent = async () => {
    LOGOUT_URL= "/auth/logout/"
    try {
        const response = await axios.post(LOGOUT_URL, { withCredentials: true });
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