import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const UserActivation = () => {
    const [message, setMessage] = useState('');
    const token=new URLSearchParams(useLocation().search).get('token')
    const location = useLocation();

    useEffect(() => {
        debugger

        if (token) {
            axios.post('http://localhost:5000/api/activate',{
                token
            })
                .then(response => {
                    alert(response)
                    debugger
                    setMessage(response?.data);
                })
                .catch(error => {
                    console.log(error)
                    setMessage("error");
                });
        } else {
            setMessage('Invalid activation link.');
        }
    }, [location]);

    return (
        <div>
            <h1>Account Activation</h1>
            <p>{message}</p>
        </div>
    );
};

export default UserActivation;
