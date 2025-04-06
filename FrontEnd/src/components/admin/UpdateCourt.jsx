import Navigation from "../../Navigation";
import React from 'react';
import { useState, useEffect } from "react";
import {useNavigate,useLocation, Link} from 'react-router-dom';



const UpdateCourt=()=>{
    const adjustFormData=(props)=>{
        var obj = {CourtID : props.CourtID,
        CourtName:  props.CourtName,
        Address : {HouseNumber : props.HouseNumber,
        Street : props.Street,
        Town : props.Town,
        City : props.City,
        State : props.State,
        Country : props.Country},
        PostalCode : props.PostalCode,}
        return(obj);
    };

    const location = useLocation();
  const court = location.state?.court;

    var [formData, setFormData] = useState({
        CourtID: court.CourtID,
        CourtName: court.CourtName,
        HouseNumber: court.Address.HouseNumber,
        Street: court.Address.Street,
        Town: court.Address.Town,
        City: court.Address.City,
        State: court.Address.State,
        Country: court.Address.Country,
        PostalCode: court.PostalCode,
      });
      
      const navigate = useNavigate();
      const [error, setError] = useState(null);
      const [success, setSuccess] = useState(null);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        var updatedformdata=adjustFormData(formData)
    
        try {
          const response = await fetch('http://127.0.0.1:3000/api/courts/updatecourt', { 
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${sessionStorage.getItem('token')}` 
            },
            body: JSON.stringify(updatedformdata)
          });
    
          if (!response.ok) {
            navigate('/');
            throw new Error('Response Error');
          }
    
          const result = await response.json();
          setSuccess('Court added successfully');
          
        } catch (error) {
          setError('Failed to add court');
          console.error('Error:', error);
        }
        navigate('/admin/courts');
      };
    
      return (
        <>
        <Navigation user = "admin"/>
        <h3>Update Courts</h3>
        <form onSubmit={handleSubmit} className="container-login">
          <div >
            <label htmlFor="CourtID">Court ID:</label>
            <input
              type="text"
              id="CourtID"
              name="CourtID"
              value={formData.CourtID}
              onChange={handleChange}
              readOnly
              required
            />
          </div>
          <div>
            <label htmlFor="CourtName">Court Name:</label>
            <input
              type="text"
              id="CourtName"
              name="CourtName"
              value={formData.CourtName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="HouseNumber">House Number:</label>
            <input
              type="number"
              id="HouseNumber"
              name="HouseNumber"
              value={formData.HouseNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="Street">Street:</label>
            <input
              type="text"
              id="Street"
              name="Street"
              value={formData.Street}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="Town">Town:</label>
            <input
              type="text"
              id="Town"
              name="Town"
              value={formData.Town}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="City">City:</label>
            <input
              type="text"
              id="City"
              name="City"
              value={formData.City}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="State">State:</label>
            <input
              type="text"
              id="State"
              name="State"
              value={formData.State}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="Country">Country:</label>
            <input
              type="text"
              id="Country"
              name="Country"
              value={formData.Country}
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
          </div><br/>
          <button type="submit">Update</button>
        </form>
        </>
      );
    };


export default UpdateCourt;