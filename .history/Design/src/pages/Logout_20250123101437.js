import { UserContext } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutComponent = async () => {
    const LOGOUT_URL= "http://127.0.0.1:8000/auth/logout/"
    try {
        const nav = useNavigate();

        const response = await axios.post(LOGOUT_URL, { withCredentials: true });
        if (response.data.success) {
            console.log('Logout successful');
            window.location.href = '/login';
            nav('/login')

        }else{
            console.log("fjo")
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
};

export default LogoutComponent