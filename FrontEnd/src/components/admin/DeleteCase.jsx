import Navigation from "../../Navigation";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const DeleteCase = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const location = useLocation();
  const court = location.state?.caseItem;
  const caseId = court?.CaseID;

  useEffect(() => {
    const deleteCase = async () => {
      if (!caseId) {
        setError('No case ID provided');
        return;
      }

      setError(null);
      setSuccess(null);

      try {
        const response = await fetch(`http://127.0.0.1:3000/api/cases/deletecase`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
          body: JSON.stringify({ CaseID: caseId })
        });

        if (!response.ok) {
            navigate('/');
            throw new Error('Response Error');
        }

        const result = await response.json();
        setSuccess('Case deleted successfully');
        navigate('/admin/cases');
      } catch (error) {
        setError('Failed to delete case');
        console.error('Error:', error);
      }
    };

    deleteCase();
  }, [caseId, navigate]);

  return (
    <>
      <Navigation user="admin" />
      <h3>Delete Case</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </>
  );
};

export default DeleteCase;
