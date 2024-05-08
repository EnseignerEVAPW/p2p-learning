import React, { useState, useEffect } from "react";
import axios from 'axios';

const UserProfile = () => {
    const [username, setUsername] = useState('hola');
    
    function prefix () {
      return username.charAt(0);
    }
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No authentication token found.');
                return;
            }

            try {
                const response = await axios.get('http://localhost:3000/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response);
                setUsername(response.data.username); 
            } catch (error) {
                console.error('El error es:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {username ? (<p>{username}</p>) : (<></>)}
        </div>
    );
};

export default UserProfile;
