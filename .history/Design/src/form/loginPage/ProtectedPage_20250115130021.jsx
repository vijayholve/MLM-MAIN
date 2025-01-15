import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ProtectedPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory(); // For navigation if needed (e.g., redirect to login)

    useEffect(() => {
        const fetchProtectedData = async () => {
            const token = localStorage.getItem('access_token');
            
            if (!token) {
                setError('No token found. Please log in.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://127.0.0.1:8000/auth/protected-endpoint/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setData(response.data.message);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // Handle Unauthorized error (token expired or invalid)
                    setError('Unauthorized access. Please log in again.');
                    localStorage.removeItem('access_token'); // Remove invalid token
                    history.push('/login'); // Redirect to login page
                } else {
                    setError('Error fetching protected data. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProtectedData();
    }, [history]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <h2>{data}</h2>
            )}
        </div>
    );
};

export default ProtectedPage;
