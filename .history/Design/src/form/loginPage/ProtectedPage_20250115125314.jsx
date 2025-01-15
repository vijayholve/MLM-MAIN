import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProtectedPage = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchProtectedData = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const response = await axios.get('http://127.0.0.1:8000/auth/protected-endpoint/', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setData(response.data.message);
                } catch (error) {
                    console.error('Error fetching protected data', error);
                }
            }
        };

        fetchProtectedData();
    }, []);

    return (
        <div>
            {data ? <h2>{data}</h2> 
        </div>
    );
};

export default ProtectedPage;
