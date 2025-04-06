import Navigation from "../../Navigation";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const AddCase = () => {
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
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/api/courts/courtdata', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          setError("Case ID needs To Be Unique.");
            throw new Error('Response Error');
          
        }

        const result = await response.json();
        setCourts(result.data);
      } catch (error) {
        console.error('Error fetching courts:', error);
      }
    };

    fetchCourts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://127.0.0.1:3000/api/cases/addcase', {
        method: 'POST',
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
      setSuccess('Case added successfully');
      navigate('/admin/cases');
    } catch (error) {
      setError('Failed to add case \n Posible Reasons: \n 1): CaseID Duplication');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Navigation user="admin" />
      <h3>Add Case</h3>
      <form onSubmit={handleSubmit} className="container-login">
        <div>
          <label htmlFor="CaseID">Case ID:</label>
          <input
            type="text"
            id="CaseID"
            name="CaseID"
            value={formData.CaseID}
            onChange={handleChange}
            required
          />
        </div>
        <div>
  <label htmlFor="CaseType">Case Type:</label>
  <select
    id="CaseType"
    name="CaseType"
    value={formData.CaseType}
    onChange={handleChange}
    required
  >
    <option value="">Select Case Type</option>
    <option value="Criminal">Criminal</option>
    <option value="Civil">Civil</option>
  </select>
</div>
<br/>
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
            defaultValue="Pending"
          />
        </div>
        <div>
          <label htmlFor="TimeAndDateOfHearing">Time and Date of Hearing:</label>
          <input
            type="datetime-local"
            id="TimeAndDateOfHearing"
            name="TimeAndDateOfHearing"
            value={formData.TimeAndDateOfHearing}
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
            className="dropdown"
          >
            <option value="" disabled>Select Court Location</option>
            {courts.map((court) => (
              <option key={court._id} value={court._id}>
                {court.CourtName}{" , "+ court.CourtID}
              </option>
            ))}
          </select>
        </div>
        <div className="error" style= {{whiteSpace : "pre-wrap" }}>{error}</div>
        <br/>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddCase;
