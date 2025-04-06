import Navigation from "../../Navigation";
import React from 'react';
import { useState, useEffect } from "react";
import {useLocation,useNavigate,Link} from 'react-router-dom';
import AddCourt from "./AddCourt";



const Courts=()=>{
    const [courtdata, setCourtData] = useState([]);
    const [addressdata, setAddressData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
  const courtprop = location.state?.court;
  const updateCourtData=(courts)=>{
    
    setCourtData(courts);
    
    
    setAddressData(courts.Address)
    
};
    
    useEffect(() => {
      const fetchData = async () => {
  
           var token = sessionStorage.getItem('token'); 
          try {
              const response = await fetch('http://127.0.0.1:3000/api/courts/viewcourtdata', {
                  method : 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${(token)}`},
                  body: JSON.stringify({"CourtID" : courtprop.CourtID}),
                }
              )
          if (!response.ok) {
            navigate('/');
            throw new Error('Response Error');
          }
          const newdata = await response.json();
          updateCourtData(newdata.data);


        } catch (error) {
          setError(error);
        }
      };
  
      
      fetchData();
    }, []); 

    if (!courtdata) {
      return <div>Loading...</div>;
    }

  const toCases = ()=>{
    navigate('/admin/courts');
  }
    if (error) {
      console.log(error.message);
    }else{
    return(
    <>
    <Navigation user = "admin"/>
    <h3>Court Data <Link to = "/admin/addcourt" className="btn-add"><span>Add Court</span></Link></h3>
    
    <div className="view-court-container">
        <div className="view-court-div">
            <h3>Field</h3>
            <hr/>
        <h4 className="field-label">CourtID : </h4>
        <h4 className="field-label">Court Name : </h4>
        <h4 className="field-label">House Number : </h4>
        <h4 className="field-label">Street : </h4>
        <h4 className="field-label">Town : </h4>
        <h4 className="field-label">City : </h4>
        <h4 className="field-label">State : </h4>
        <h4 className="field-label">Country : </h4>
        <h4 className="field-label">Postal Code : </h4>
        <h4 className="field-label">Created At : </h4>
        <h4 className="field-label">Updated At : </h4>
        </div>
    
        <div className="view-court-div">
        <h3>Value</h3>
        <hr/>
        <h4 className="field-value">{courtdata.CourtID?courtdata.CourtID:""}</h4>
        <h4 className="field-value">{courtdata.CourtName?courtdata.CourtName:""}</h4>
        <h4 className="field-value">{addressdata.HouseNumber?addressdata.HouseNumber:""}</h4>
        <h4 className="field-value">{addressdata.Street?addressdata.Street:""}</h4>
        <h4 className="field-value">{addressdata.Town?addressdata.Town:""}</h4>
        <h4 className="field-value">{addressdata.City?addressdata.City:""}</h4>
        <h4 className="field-value">{addressdata.State?addressdata.State:""}</h4>
        <h4 className="field-value">{addressdata.Country?addressdata.Country:""}</h4>
        <h4 className="field-value">{courtdata.PostalCode?courtdata.PostalCode:""}</h4>
        <h4 className="field-value">{courtdata.createdAt?courtdata.createdAt:"" }</h4>
        <h4 className="field-value">{courtdata.updatedAt?courtdata.updatedAt:""}</h4>
        </div><br/>
        <button onClick={toCases}>Go Back</button>
        </div>
    </>
    )
}}
export default Courts;