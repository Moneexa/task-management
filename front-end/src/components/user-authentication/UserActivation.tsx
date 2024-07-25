import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const UserActivation = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    if (token) {
      axios.get(`http://localhost:5000/api/activate?token=${token}`)
        .then(response => {
          setMessage('Account activated successfully!');
        })
        .catch(error => {
          setMessage('Invalid or expired activation token.');
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
