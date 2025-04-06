import Navigation from "../../Navigation";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const RandomJury = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const caseItem = location.state?.caseItem;
  const [updator, setupdator] = useState(caseItem);
  const caseId = caseItem?.CaseID;
  const [proposedJury, setProposedJury] = useState([]);
  const [error, setError] = useState(null);

  const updateArray = (result) => {
    const array = result.map((juror) => ({
      ElectedJuror: juror._id,
    }));
    return array;
  };

  const updateUpdator = (result) => {
    const updatedCaseItem = { ...updator, ProposedJury: result };
    setupdator(updatedCaseItem);
  };

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3000/api/electoralregister/selectrandomjury`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
          body: JSON.stringify({ "NumRecords": caseItem.CaseType === "Criminal"? 15 : 12, "PlantiffFirstName" : caseItem.PlantiffFirstName, "PlaintiffLastName" : caseItem.PlantiffLastName,"DefendantFirstName" : caseItem.DefendantFirstName,"DefendantLastName" : caseItem.DefendantLastName})
        });

        if (!response.ok) {
          throw new Error('Response Error');
        }

        const result = await response.json();
        const array = updateArray(result);

        updateUpdator(array);
        setProposedJury(array);
      } catch (error) {
        setError('Error fetching case details');
        console.error('Error fetching case details:', error);
      }
    };

    fetchCaseDetails();
    
  }, []);

  useEffect(() => {
    const updateJury = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3000/api/cases/updatecase`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
          body: JSON.stringify(updator)
        });

        if (!response.ok) {
          navigate('/');
          throw new Error('Response Error');
        }

        const result = await response.json();
        navigate('/admin/cases');
      } catch (error) {
        setError('Failed to update case');
        console.error('Error:', error);
      }
    };

    if (proposedJury.length > 0) {
      updateJury();
    }
  }, [updator]);

  return (
    <>
      <Navigation user="admin" />
      <h3>Random Jury</h3>
      <div>
        <p>Case ID: {caseId}</p>
        <p>Proposed Jury: {JSON.stringify(proposedJury)}</p>
      </div>
    </>
  );
};

export default RandomJury;
