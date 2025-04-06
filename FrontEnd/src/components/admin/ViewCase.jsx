import Navigation from "../../Navigation";
import React from 'react';
import { useState, useEffect } from "react";
import {useLocation,useNavigate,Link} from 'react-router-dom';

const ViewCase = () => {
  const [caseData, setCaseData] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const caseprop = location.state?.caseItem;
  const navigate = useNavigate();
  const toHome=()=>{
    navigate('/admin/cases');
};
  const handleEmailClick = (email) => {
    const subject = 'Jury Invitation';
    const body = 'Your Email Body';
    const mailto = `mailto:${email}?subject=${subject}&body=${body}`;

    window.location.href = mailto;
  };
  useEffect(() => {
    const fetchCaseData = async () => {
      try {
        var token = sessionStorage.getItem('token'); 
        const response = await fetch(`http://127.0.0.1:3000/api/cases/getcase`, {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${(token)}`},
                body: JSON.stringify({"CaseID" : caseprop.CaseID}),
              
        });

        if (!response.ok) {
          navigate('/');
          throw new Error('Response Error');
        }

        const result = await response.json();
        setCaseData(result.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCaseData();
  },[]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!caseData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navigation user="admin" />
      <h3>View Case Details</h3>
      <div className="view-case">
        <table>
          <tbody>
            <tr>
              <td>Case ID</td>
              <td>{caseData.CaseID?caseData.CaseID:""}</td>
            </tr>
            <tr>
              <td>Case Type</td>
              <td>{caseData.CaseType?caseData.CaseType:""}</td>
            </tr>
            <tr>
              <td>Plaintiff First Name</td>
              <td>{caseData.PlantiffFirstName?caseData.PlantiffFirstName:""}</td>
            </tr>
            <tr>
              <td>Plaintiff Last Name</td>
              <td>{caseData.PlantiffLastName?caseData.PlantiffLastName:""}</td>
            </tr>
            <tr>
              <td>Defendant First Name</td>
              <td>{caseData.DefendantFirstName?caseData.DefendantFirstName:""}</td>
            </tr>
            <tr>
              <td>Defendant Last Name</td>
              <td>{caseData.DefendantLastName?caseData.DefendantLastName:""}</td>
            </tr>
            <tr>
              <td>Plaintiff Lawyer</td>
              <td>{caseData.PlantiffLawyer?caseData.PlantiffLawyer:""}</td>
            </tr>
            <tr>
              <td>Defendant Lawyer</td>
              <td>{caseData.DefendantLawyer?caseData.DefendantLawyer:""}</td>
            </tr>
            <tr>
              <td>Proposed Charges</td>
              <td>{caseData.ProposedCharges?caseData.ProposedCharges:""}</td>
            </tr>
            <tr>
              <td>Proposed Decision</td>
              <td>{caseData.ProposedDecision?caseData.ProposedDecision:""}</td>
            </tr>
            <tr>
              <td>Time and Date of Hearing</td>
              <td>{caseData.TimeAndDateOfHearing?new Date(caseData.TimeAndDateOfHearing).toLocaleString():""}</td>
            </tr>
            <tr>
              <td>Location of Hearing</td>
              <td><>{caseData.LocationOfHearing.CourtID != null?caseData.LocationOfHearing?.CourtID:""}{" , " }{caseData.LocationOfHearing.CourtName != null?caseData.LocationOfHearing.CourtName:""}</></td>
            </tr>
            <tr>
              <td>Votes in Favour of Defendant</td>
              <td>{caseData.VotesInFavourOfDefendant?caseData.VotesInFavourOfDefendant:0}</td>
            </tr>
            <tr>
              <td>Votes Against Defendant</td>
              <td>{caseData.VotesAgainstDefendant?caseData.VotesAgainstDefendant:0}</td>
            </tr>
        
              <tr>
                <td><b>Jurors : </b></td>
                <td>
                <table>
  <thead>
    <tr>
    <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th> 
      <th>Confirmation Status</th>
      <th>Substitute</th>
      <th>Confirmation Date</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {caseData.ProposedJury.map((juror, index) => (
      <tr key={juror.ElectedJuror.FirstName}>
        
                
            <td>{juror.ElectedJuror.FirstName?juror.ElectedJuror.FirstName:""}</td>
            <td>{juror.ElectedJuror.LastName?juror.ElectedJuror.LastName:""}</td>
            <td>{juror.ElectedJuror.Email?juror.ElectedJuror.Email:""}</td>
            <td>{juror.ElectedJuror.PhoneNumber?juror.ElectedJuror.PhoneNumber:""}</td>
            
        
        <td>{juror.JurorConfirmation ? 'Confirmed' : 'Not Confirmed'}</td>
        <td>{juror.IsSubstitute ? 'Yes' : 'No'}</td>
        <td>{juror.ConfirmationDate ? new Date(juror.ConfirmationDate).toLocaleString() : ''}</td>
        <td><button onClick={() => handleEmailClick(juror.ElectedJuror.Email?juror.ElectedJuror.Email:"")}>
        Send Email
      </button></td>
      </tr>
    ))}
  </tbody>
</table>
                </td>
              </tr>
            
          </tbody>
        </table><br/>
        <button onClick={toHome}>Go Back</button>
      </div>
    </>
  );
};

export default ViewCase;
