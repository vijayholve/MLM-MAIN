import axios from 'axios';

export const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                refresh: refreshToken,
            });

            // Update access token in localStorage
            localStorage.setItem('access_token', response.data.access);
        } catch (error) {
            console.error('Error refreshing token', error);
        }
    }
};
