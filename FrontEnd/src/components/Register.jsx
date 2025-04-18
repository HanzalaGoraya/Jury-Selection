import React from 'react';
import { useState, useEffect } from "react";
import { Link} from 'react-router-dom';


const Register=()=>{
    const [formData, setFormData] = useState({
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
          Country: ''
        },
        PostalCode: '',
        FamilyRegistrationNumber: '',
        ResidentialStatus: '',
        HasConvictions: false,
        JuryEligibility: true,
        
      });
    
      const [error, setError] = useState(null);
      
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.includes('Address.')) {
          const addressField = name.split('.')[1];
          setFormData((prevData) => ({
            ...prevData,
            Address: {
              ...prevData.Address,
              [addressField]: type === 'number' ? Number(value) : value
            }
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
          }));
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            var token = sessionStorage.getItem('token'); 
          
          const response = await fetch('${backendUrl}api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${(token)}`},
            body: JSON.stringify(formData)
          });
          if (!response.ok) {
            throw new Error('Response Error');
          }
          
          setFormData({
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
              Country: ''
            },
            PostalCode: '',
            FamilyRegistrationNumber: '',
            ResidentialStatus: '',
            HasConvictions: false,
            JuryEligibility: true,
            
          });
        } catch (error) {
          setError(error.message);
        }
      };
    
      return (
        <div className='register-page-background'>
          
          {error && <div>Error: {error}</div>}
          <form onSubmit={handleSubmit} className='container-login'>
          <h3>Electoral Register Form</h3>
            <label>
              User Name:
              <input type="text" id = "UserName" name="UserName" value={formData.UserName} onChange={handleChange} required />
            </label>
            <label>
              First Name:
              <input type="text" id="FirstName" name="FirstName" value={formData.FirstName} onChange={handleChange} required />
            </label>
            <label>
              Last Name:
              <input type="text" name="LastName" id="LastName" value={formData.LastName} onChange={handleChange} />
            </label>
            <label>
              Date of Birth:
              <input type="date" name="DOB" id="DOB" value={formData.DOB} onChange={handleChange} />
            </label>
            <label>
              Father's Name:
              <input type="text" name="FathersName" id="FathersName" value={formData.FathersName} onChange={handleChange} />
            </label>
            <label>
              Mother's Name:
              <input type="text" name="MothersName" id="MothersName" value={formData.MothersName} onChange={handleChange} />
            </label>
            <label>
              Email:
              <input type="email" name="Email" id="Email" value={formData.Email} onChange={handleChange} required />
            </label>
            <label>
              Password:
              <input type="password" name="Password" id="Password" value={formData.Password} onChange={handleChange} required />
            </label>
            <label>
              Phone Number:
              <input type="text" name="PhoneNumber" id="PhoneNumber" value={formData.PhoneNumber} onChange={handleChange} />
            </label>
            <label>
              NIN:
              <input type="text" name="NIN" id="NIN" value={formData.NIN} onChange={handleChange} />
            </label>
            <label>
              Passport Number:
              <input type="text" name="PassportNumber" id="PassportNumber" value={formData.PassportNumber} onChange={handleChange} />
            </label>
            <fieldset>
              <legend>Address</legend>
              <label>
                House Number:
                <input type="number" name="Address.HouseNumber" id="Address.HouseNumber" value={formData.Address.HouseNumber} onChange={handleChange} />
              </label>
              <label>
                Street:
                <input type="text" name="Address.Street" id="Address.Street" value={formData.Address.Street} onChange={handleChange} />
              </label>
              <label>
                Town:
                <input type="text" name="Address.Town" id="Address.Town" value={formData.Address.Town} onChange={handleChange} />
              </label>
              <label>
                City:
                <input type="text" name="Address.City" id="Address.City" value={formData.Address.City} onChange={handleChange} />
              </label>
              <label>
                State:
                <input type="text" name="Address.State" id="Address.State" value={formData.Address.State} onChange={handleChange} />
              </label>
              <label>
                Country:
                <input type="text" name="Address.Country" id="Address.Country" value={formData.Address.Country} onChange={handleChange} />
              </label>
            </fieldset>
            <label>
              Postal Code:
              <input type="text" name="PostalCode" id="PostalCode" value={formData.PostalCode} onChange={handleChange} />
            </label>
            <label>
              Family Registration Number:
              <input type="text" name="FamilyRegistrationNumber" id="FamilyRegistrationNumber" value={formData.FamilyRegistrationNumber} onChange={handleChange} />
            </label>
            <label>
              Residential Status:
              <input type="text" name="ResidentialStatus" id="ResidentialStatus" value={formData.ResidentialStatus} onChange={handleChange} />
            </label>
            <label>
              Has Convictions:
              <input type="checkbox" name="HasConvictions" id="HasConvictions" checked={formData.HasConvictions} onChange={handleChange} />
            </label>
            <br/>
            <label>
              Jury Eligibility:
              <input type="checkbox" name="JuryEligibility" id="JuryEligibility" checked={formData.JuryEligibility} onChange={handleChange} />
            </label>
            <br/>
              <span>
            <button type="submit">Register</button><span>   </span>
            <Link to = "/"><button className='btn-register'>Go To Login</button></Link>
            </span>
          </form>
        </div>
      ); 
    }
    export default Register; 