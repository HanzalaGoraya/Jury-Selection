import Navigation from "../../Navigation";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

const DeleteElectoralRegister = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userprop = location.state?.user;
  useEffect(() => {
  const handleDelete = async () => {
    setError(null);
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:3000/api/electoralregister/deleteelectoralregister', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ UserName : userprop.UserName })
      });
      
      if (!response.ok) {
        navigate('/');
        throw new Error('Response Error');
      }
      
    } catch (error) {
      setError('Failed to delete electoral register');
      console.error('Error:', error);
    }
  };
  handleDelete(); 
  navigate('/admin/home');
}, []);

  return (
    <>
    </>
  );
};

export default DeleteElectoralRegister;
