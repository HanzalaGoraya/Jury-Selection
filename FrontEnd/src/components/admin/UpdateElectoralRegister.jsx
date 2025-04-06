import Navigation from "../../Navigation";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateElectoralRegister = () => {
  const [formData, setFormData] = useState({
    isAdmin: false,
    UserName: '',
    FirstName: '',
    LastName: '',
    DOB: '',
    FathersName: '',
    MothersName: '',
    Email: '',
    Password: '',
    PhoneNumber: '',
    NIN: '',
    PassportNumber: '',
    Address: {
      HouseNumber: '',
      Street: '',
      Town: '',
      City: '',
      State: '',
      Country: '',
    },
    PostalCode: '',
    FamilyRegistrationNumber: '',
    ResidentialStatus: '',
    HasConvictions: false,
    JuryEligibility: false,
    JuryInvitations: '',
    JuryInvitationsAccepted: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const propuser = location.state?.user;

  

  const updateFormData = (data) => {
    setFormData({
      ...data,
      Address: data.Address || {
        HouseNumber: "",
        Street: "",
        Town: "",
        City: "",
        State: "",
        Country: ""
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      var token = sessionStorage.getItem('token');
      try {
        const response = await fetch('http://127.0.0.1:3000/api/electoralregister/userdata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ "UserName": propuser.UserName }),
        });
        if (!response.ok) {
          navigate('/');
          throw new Error('Response Error');
        }
        const newData = await response.json();
        updateFormData(newData.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [propuser.UserName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("Address.")) {
      const addressName = name.split('.')[1];
      setFormData(prevState => ({
        ...prevState,
        Address: {
          ...prevState.Address,
          [addressName]: value
        }
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch('http://127.0.0.1:3000/api/electoralregister/updateuser', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
        
      });
      if (!response.ok) {
        navigate('/');
        throw new Error('Response Error');
      }
      const result = await response.json();
      setSuccess('Electoral Register updated successfully');
      navigate('/admin/home');
    } catch (error) {
      setError('Failed to update electoral register');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Navigation user="admin" />
      <h3>Update Electoral Register</h3>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      
      
      <form onSubmit={handleSubmit} className="container-login">
        <div>
          <label htmlFor="isAdmin">Is Admin:</label>
          <input
            type="checkbox"
            id="isAdmin"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })}
          />
        </div>
        <div>
          <label htmlFor="UserName">User Name:</label>
          <input
            type="text"
            id="UserName"
            name="UserName"
            value={formData.UserName}
            onChange={handleChange}
            readOnly
            required
          />
        </div>
        <div>
          <label htmlFor="FirstName">First Name:</label>
          <input
            type="text"
            id="FirstName"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="LastName">Last Name:</label>
          <input
            type="text"
            id="LastName"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="DOB">Date of Birth:</label>
          <input
            type="String"
            id="DOB"
            name="DOB"
            value={formData.DOB}
            placeholder="dd/mm/yyyy"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="FathersName">Father's Name:</label>
          <input
            type="text"
            id="FathersName"
            name="FathersName"
            value={formData.FathersName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="MothersName">Mother's Name:</label>
          <input
            type="text"
            id="MothersName"
            name="MothersName"
            value={formData.MothersName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Email">Email:</label>
          <input
            type="email"
            id="Email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Password">Password:</label>
          <input
            type="password"
            id="Password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="PhoneNumber">Phone Number:</label>
          <input
            type="text"
            id="PhoneNumber"
            name="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="NIN">NIN:</label>
          <input
            type="text"
            id="NIN"
            name="NIN"
            value={formData.NIN}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="PassportNumber">Passport Number:</label>
          <input
            type="text"
            id="PassportNumber"
            name="PassportNumber"
            value={formData.PassportNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Address.HouseNumber">House Number:</label>
          <input
            type="text"
            id="HouseNumber"
            name="Address.HouseNumber"
            value={formData.Address.HouseNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Address.Street">Street:</label>
          <input
            type="text"
            id="Street"
            name="Address.Street"
            value={formData.Address.Street}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Address.Town">Town:</label>
          <input
            type="text"
            id="Town"
            name="Address.Town"
            value={formData.Address.Town}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Address.City">City:</label>
          <input
            type="text"
            id="City"
            name="Address.City"
            value={formData.Address.City}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Address.State">State:</label>
          <input
            type="text"
            id="State"
            name="Address.State"
            value={formData.Address.State}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Address.Country">Country:</label>
          <input
            type="text"
            id="Country"
            name="Address.Country"
            value={formData.Address.Country}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="PostalCode">Postal Code:</label>
          <input
            type="text"
            id="PostalCode"
            name="PostalCode"
            value={formData.PostalCode}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="FamilyRegistrationNumber">Family Registration Number:</label>
          <input
            type="text"
            id="FamilyRegistrationNumber"
            name="FamilyRegistrationNumber"
            value={formData.FamilyRegistrationNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="ResidentialStatus">Residential Status:</label>
          <input
            type="text"
            id="ResidentialStatus"
            name="ResidentialStatus"
            value={formData.ResidentialStatus}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="HasConvictions">Has Convictions:</label>
          <input
            type="checkbox"
            id="HasConvictions"
            name="HasConvictions"
            checked={formData.HasConvictions}
            onChange={(e) => setFormData({ ...formData, HasConvictions: e.target.checked })}
          />
        </div>
        <div>
          <label htmlFor="JuryEligibility">Jury Eligibility:</label>
          <input
            type="checkbox"
            id="JuryEligibility"
            name="JuryEligibility"
            checked={formData.JuryEligibility}
            onChange={(e) => setFormData({ ...formData, JuryEligibility: e.target.checked })}
          />
        </div>
        <div>
          <label htmlFor="JuryInvitations">Jury Invitations:</label>
          <input
            type="text"
            id="JuryInvitations"
            name="JuryInvitations"
            value={formData.JuryInvitations}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="JuryInvitationsAccepted">Jury Invitations Accepted:</label>
          <input
            type="text"
            id="JuryInvitationsAccepted"
            name="JuryInvitationsAccepted"
            value={formData.JuryInvitationsAccepted}
            onChange={handleChange}
          />
        </div><br/>
        <button type="submit">Update</button>
      </form>
      <br/>
    </>
  );
};

export default UpdateElectoralRegister;
