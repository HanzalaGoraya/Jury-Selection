import Navigation from "../../Navigation";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const JuryInvitations = () => {
  const [cases, setCases] = useState([]);
  const [error, setError] = useState(null);
  const[refetch,setrefetch]=useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const token = sessionStorage.getItem('token');

        const response = await fetch('http://127.0.0.1:3000/api/cases/getjuryinvites', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          navigate('/');
          throw new Error('Response Error');
        }

        const result = await response.json();
        setCases(result.data);

      } catch (error) {
        setError('Error fetching cases');
        console.error('Error fetching cases:', error);
      }
    };

    fetchCases();
  }, [refetch]);

  const checkJurorConfirmation= (proposedJury)=>{
    const userNameOfJuror = sessionStorage.getItem("UserName");
    const juror = proposedJury.find(u => u.ElectedJuror && u.ElectedJuror.UserName === userNameOfJuror);
    if(juror.JurorConfirmation)
    {
    return true;
    }
    else{
    return false;
    }
  };

  const confirminvitation = async (caseId, proposedJury, jurorConfirmation) => {
    try {
      const token = sessionStorage.getItem('token');
      const userName = sessionStorage.getItem('UserName');

      const juror = proposedJury.find(u => u.ElectedJuror.UserName === userName);

      if (!juror || juror === null) {
        if(!juror)
        console.error('Juror not found');
    if(juror === null){
        console.error('Jury Not Assigned');
    }
        return;
      }

      const response = await fetch(`http://127.0.0.1:3000/api/cases/updatejurorconfirmation`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          caseId: caseId,
          electedJurorId: juror.ElectedJuror._id,
          jurorConfirmation: jurorConfirmation
        })
      });

      if (!response.ok) {
        navigate('/');
        throw new Error('Response Error');
      }

      const result = await response.json();
      navigate('/user/juryinvitations'); 
      setrefetch(!refetch);
    } catch (error) {
      setError('Error confirming invitation');
      console.error('Error confirming invitation:', error);
    }
  };

  return (
    <>
      <Navigation user="user" />
      <h3>Jury Invitations</h3>

      <div>
        {cases.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Case Type</th>
                <th>Court ID</th>
                <th>Court Name</th>
                <th>Postal Code</th>
                <th>Time & Date of Hearing</th>
                <th>Proposed Charges</th>
                <th>Juror Confirmation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cases.map(caseItem => 
                
                      <tr key={caseItem.CaseID}>
                        <td>{caseItem.CaseID}</td>
                        <td>{caseItem.CaseType}</td>
                        <td>{caseItem.LocationOfHearing?.CourtID || 'N/A'}</td>
                        <td>{caseItem.LocationOfHearing?.CourtName || 'N/A'}</td>
                        <td>{caseItem.LocationOfHearing?.PostalCode || 'N/A'}</td>
                        <td>{new Date(caseItem.TimeAndDateOfHearing).toLocaleString()}</td>
                        <td>{caseItem.ProposedCharges}</td>
                        <td>{checkJurorConfirmation(caseItem.ProposedJury)?"Confirmed":"Not-Confirmed"}</td>
                        <td>
                            {!checkJurorConfirmation(caseItem.ProposedJury) ? (
                                <button
                                onClick={() => confirminvitation(caseItem.CaseID, caseItem.ProposedJury, true)}
                                className="btn-add"
                                >
                                <span>Confirm Invitation</span>
                                </button>
                            ) : (
                                <button
                                onClick={() => confirminvitation(caseItem.CaseID, caseItem.ProposedJury, false)}
                                className="btn-add"
                                >
                                <span>Cancel Confirmation</span>
                                </button>
                            )}
                            </td>


                      </tr> 
                    
                  )}
              
            </tbody>
          </table>
        ) : (
          <p>No jury invitations found.</p>
        )}
      </div>
    </>
  );
};

export default JuryInvitations;
