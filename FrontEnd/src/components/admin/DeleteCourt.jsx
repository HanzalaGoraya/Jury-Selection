import Navigation from "../../Navigation";
import React from 'react';
import { useState, useEffect } from "react";
import { Link} from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';


const DeleteCourt=()=>{
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const location = useLocation();
    const court = location.state?.court;
    
    const handleDelete = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:3000/api/courts/deletecourt', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ CourtID : court.CourtID })
        });
        if (response.ok) {
          
          console.log('Court deleted successfully');
        } else {
          setError('Failed to delete court');
          navigate('/');
        }
      } catch (error) {
        setError('Failed to delete court');
      }
    };
handleDelete();
navigate('/admin/courts');
return(
    <>
    </>
)
}
export default DeleteCourt; 