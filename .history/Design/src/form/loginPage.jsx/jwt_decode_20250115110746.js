import jwt_decode from 'jwt-decode';

export const jwtDecode = (token) => {
    try {
        return jwt_decode(token);
    } catch (error) {
        console.error('Invalid token', error);
        return null;
    }
};
