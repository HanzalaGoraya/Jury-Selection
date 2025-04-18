import Navigation from "../../Navigation";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const UpdateCase = () => {
  const [formData, setFormData] = useState({
    CaseID: '',
    CaseType: '',
    PlantiffFirstName: '',
    PlantiffLastName: '',
    DefendantFirstName: '',
    DefendantLastName: '',
    PlantiffLawyer: '',
    DefendantLawyer: '',
    ProposedCharges: '',
    ProposedDecision: 'Pending',
    ProposedJury: [],
    TimeAndDateOfHearing: '',
    LocationOfHearing: '',
    VotesInFavourOfDefendant: 0,
    VotesAgainstDefendant: 0,
  });

  const [courts, setCourts] = useState([]);
  const [electoralRegisters, setElectoralRegisters] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);


  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const navigate = useNavigate();
  const location = useLocation();
  const caseItem = location.state?.caseItem;
const caseId = caseItem.CaseID;
  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const response = await fetch(`${backendUrl}api/cases/getcase`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
          body:JSON.stringify({CaseID:caseId})
        });

        if (!response.ok) {
          navigate('/');
          throw new Error('Response Error');
        }

        const result = await response.json();
        setFormData(result.data);
      } catch (error) {
        console.error('Error fetching case details:', error);
      }
    };

    const fetchCourts = async () => {
      try {
        const response = await fetch('${backendUrl}api/courts/courtdata', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          navigate('/');
          throw new Error('Response Error');
        }

        const result = await response.json();
        setCourts(result.data);
      } catch (error) {
        console.error('Error fetching courts:', error);
      }
    };

    const fetchElectoralRegisters = async () => {
      try {
        const response = await fetch('${backendUrl}api/register/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          navigate('/');
          throw new Error('Response Error');
        }

        const result = await response.json();
        setElectoralRegisters(result.data);
      } catch (error) {
        console.error('Error fetching electoral registers:', error);
      }
    };

    fetchCaseDetails();
    fetchCourts();
    fetchElectoralRegisters();
  }, [caseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleJuryChange = (index, field, value) => {
    const newProposedJury = [...formData.ProposedJury];
    newProposedJury[index][field] = value;
    setFormData({ ...formData, ProposedJury: newProposedJury });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${backendUrl}api/cases/updatecase`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Response Error');
      }

      const result = await response.json();
      setSuccess('Case updated successfully');
      navigate('/admin/cases');
    } catch (error) {
      setError('Failed to update case');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Navigation user="admin" />
      <h3>Update Case</h3>
      <form onSubmit={handleSubmit} className="container-login">
        <div>
          <label htmlFor="CaseID">Case ID:</label>
          <input
            type="text"
            id="CaseID"
            name="CaseID"
            value={formData.CaseID}
            onChange={handleChange}
            readOnly
            required
          />
        </div>
        <div>
          <label htmlFor="CaseType">Case Type:</label>
          <input
            type="text"
            id="CaseType"
            name="CaseType"
            value={formData.CaseType}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="PlantiffFirstName">Plaintiff First Name:</label>
          <input
            type="text"
            id="PlantiffFirstName"
            name="PlantiffFirstName"
            value={formData.PlantiffFirstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="PlantiffLastName">Plaintiff Last Name:</label>
          <input
            type="text"
            id="PlantiffLastName"
            name="PlantiffLastName"
            value={formData.PlantiffLastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="DefendantFirstName">Defendant First Name:</label>
          <input
            type="text"
            id="DefendantFirstName"
            name="DefendantFirstName"
            value={formData.DefendantFirstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="DefendantLastName">Defendant Last Name:</label>
          <input
            type="text"
            id="DefendantLastName"
            name="DefendantLastName"
            value={formData.DefendantLastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="PlantiffLawyer">Plaintiff Lawyer:</label>
          <input
            type="text"
            id="PlantiffLawyer"
            name="PlantiffLawyer"
            value={formData.PlantiffLawyer}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="DefendantLawyer">Defendant Lawyer:</label>
          <input
            type="text"
            id="DefendantLawyer"
            name="DefendantLawyer"
            value={formData.DefendantLawyer}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="ProposedCharges">Proposed Charges:</label>
          <input
            type="text"
            id="ProposedCharges"
            name="ProposedCharges"
            value={formData.ProposedCharges}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="ProposedDecision">Proposed Decision:</label>
          <input
            type="text"
            id="ProposedDecision"
            name="ProposedDecision"
            value={formData.ProposedDecision}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="TimeAndDateOfHearing">Time and Date of Hearing:</label>
          <input
            type="datetime-local"
            id="TimeAndDateOfHearing"
            name="TimeAndDateOfHearing"
            value={formatDateForInput(formData.TimeAndDateOfHearing)}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="LocationOfHearing">Location of Hearing:</label>
          <select
            id="LocationOfHearing"
            name="LocationOfHearing"
            value={formData.LocationOfHearing}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Court Location</option>
            {courts.map((court) => (
              <option key={court._id} value={court._id}>
                {court.CourtName}
              </option>
            ))}
          </select>
        </div><br/>
        {formData.ProposedJury.map((juror, index) => (
          <div key={index}>
            <label htmlFor={`ProposedJury_${index}`}><b>Juror {index + 1}: </b><br/> FirstName : {juror.ElectedJuror.FirstName}<br/> LastName : {juror.ElectedJuror.LastName}<br/> Email : {juror.ElectedJuror.Email}<br/>Phone Number : {juror.ElectedJuror.PhoneNumber}</label>
            
            <label htmlFor={`JurorConfirmation_${index}`}>Confirmed:</label>
            <input
              type="checkbox"
              id={`JurorConfirmation_${index}`}
              name={`JurorConfirmation_${index}`}
              checked={juror.JurorConfirmation}
              onChange={(e) => handleJuryChange(index, 'JurorConfirmation', e.target.checked)}
            />
            <label htmlFor={`IsSubstitute_${index}`}>Substitute:</label>
            <input
              type="checkbox"
              id={`IsSubstitute_${index}`}
              name={`IsSubstitute_${index}`}
              checked={juror.IsSubstitute}
              onChange={(e) => handleJuryChange(index, 'IsSubstitute', e.target.checked)}
            />
          </div>
        ))}
        <div>
          <label htmlFor="VotesInFavourOfDefendant">Votes in Favour of Defendant:</label>
          <input
            type="number"
            id="VotesInFavourOfDefendant"
            name="VotesInFavourOfDefendant"
            value={formData.VotesInFavourOfDefendant != null?formData.VotesInFavourOfDefendant:0}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="VotesAgainstDefendant">Votes Against Defendant:</label>
          <input
            type="number"
            id="VotesAgainstDefendant"
            name="VotesAgainstDefendant"
            value={formData.VotesAgainstDefendant != null?formData.VotesAgainstDefendant:0}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </>
  );
};

export default UpdateCase;
