import Navigation from "../../Navigation";
import React from 'react';
import { useState, useEffect } from "react";
import {useNavigate,Link} from 'react-router-dom';
import AddCourt from "./AddCourt";



const Courts=()=>{
    const [courtdata, setCourtData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const updateCourtData=(courts)=>{
        setCourtData(courts);
    };
    
    useEffect(() => {
      const fetchData = async () => {
  
           var token = sessionStorage.getItem('token'); 
          try {
              const response = await fetch('http://127.0.0.1:3000/api/courts/courtdata', {
                  method : 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${(token)}`},
                  
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
    if (error) {
      console.log(error.message);
    }else{
    return(
    <>
    <Navigation user = "admin"/>
    <h3>Courts <Link to = "/admin/addcourt" className="btn-add"><span>Add Court</span></Link></h3>
    
    <div className="table-container">
    <table className="responsive-table">
        <thead>
          <tr>
            <th>Court ID</th>
            <th>Court Name</th>
            <th>House Number</th>
            <th>Street</th>
            <th>Town</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Postal Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {courtdata.map((court) => (
            <tr key={court.CourtID}>
              <td>{court.CourtID?court.CourtID:""}</td>
              <td>{court.CourtName?court.CourtName:""}</td>
              <td>{court.Address.HouseNumber?court.Address.HouseNumber:""}</td>
              <td>{court.Address.Street?court.Address.Street:""}</td>
              <td>{court.Address.Town?court.Address.Town:""}</td>
              <td>{court.Address.City?court.Address.City:""}</td>
              <td>{court.Address.State?court.Address.State:""}</td>
              <td>{court.Address.Country?court.Address.Country:""}</td>
              <td>{court.PostalCode?court.PostalCode:""}</td>
              <td>
              <Link to = "/admin/viewcourt" className="btn-add" state={{ court }}><span>View</span></Link>
                <Link to = "/admin/updatecourt" className="btn-add" state={{ court }}><span>Update</span></Link>
                <Link to = "/admin/deletecourt" className="btn-add" state={{ court }}><span>Delete</span></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
    )
}

}
export default Courts;