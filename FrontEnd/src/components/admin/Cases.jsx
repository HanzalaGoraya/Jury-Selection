import Navigation from "../../Navigation";
import React from 'react';
import { useState, useEffect } from "react";
import {useNavigate, Link} from 'react-router-dom';


const Cases=()=>{

    const [casedata, setCaseData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const updateCaseData=(cases)=>{
        setCaseData(cases);
    };
    
    useEffect(() => {
      const fetchData = async () => {
  
           var token = sessionStorage.getItem('token'); 
          try {
              const response = await fetch('http://127.0.0.1:3000/api/cases/getallcases', {
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
          
          updateCaseData(newdata.data);


        } catch (error) {
          setError(error);
        }
      };
  
      
      fetchData();
    }, []); 
  
    if (error) {
      return(error.message);
    }else{
    return(
    <>
    <Navigation user = "admin"/>
    <h3>Cases       
      <Link to = "/admin/addcase" className="btn-add"><span>
        Add Case</span></Link></h3>
    <div className="table-container">
    <table className="responsive-table">
        <thead>
          <tr>
            <th>Case ID</th>
            <th>Case Type</th>
            <th>Plantiff First Name</th>
            <th>Plantiff Last Name</th>
            <th>Defendant First Name</th>
            <th>Defendant Last Name</th>
            <th>Plantiff Lawyer</th>
            <th>Defendant Lawyer</th>
            <th>Proposed Charges</th>
            <th>Proposed Decision</th>
            <th>Time and Date of Hearing</th>
            <th>Votes In Favour of Defendant</th>
            <th>Votes Against Defendant</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {casedata.map((caseItem) => (
            <tr key={caseItem.CaseID}>
              <td>{caseItem.CaseID?caseItem.CaseID:"N/A"}</td>
              <td>{caseItem.CaseType?caseItem.CaseType:"N/A"}</td>
              <td>{caseItem.PlantiffFirstName?caseItem.PlantiffFirstName:"N/A"}</td>
              <td>{caseItem.PlantiffLastName?caseItem.PlantiffLastName:"N/A"}</td>
              <td>{caseItem.DefendantFirstName?caseItem.DefendantFirstName:"N/A"}</td>
              <td>{caseItem.DefendantLastName?caseItem.DefendantLastName:"N/A"}</td>
              <td>{caseItem.PlantiffLawyer?caseItem.PlantiffLawyer:"N/A"}</td>
              <td>{caseItem.DefendantLawyer?caseItem.DefendantLawyer:"N/A"}</td>
              <td>{caseItem.ProposedCharges?caseItem.ProposedCharges:"N/A"}</td>
              <td>{caseItem.ProposedDecision?caseItem.ProposedDecision:"N/A"}</td>
              <td>{new Date(caseItem.TimeAndDateOfHearing?caseItem.TimeAndDateOfHearing:"N/A").toLocaleString()}</td>
              <td>{caseItem.VotesInFavourOfDefendant?caseItem.VotesInFavourOfDefendant:"N/A"}</td>
              <td>{caseItem.VotesAgainstDefendant?caseItem.VotesAgainstDefendant:"N/A"}</td>
              <td>
                <Link to = "/admin/viewcase" className="btn-add" state={{ caseItem }}><span>View</span></Link>
                <Link to = "/admin/updatecase" className="btn-add" state={{ caseItem }}><span>Update</span></Link>
                <Link to = "/admin/deletecase" className="btn-add" state={{ caseItem }}><span>Delete</span></Link>
                <Link to = "/admin/randomjury" className="btn-add" state={{ caseItem }}><span>AssignJury</span></Link>
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
export default Cases;