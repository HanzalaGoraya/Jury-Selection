import Navigation from "../../Navigation";
import React from 'react';
import { useState, useEffect } from "react";
import {useLocation,useNavigate,Link} from 'react-router-dom';


const ElectoralRegisterView = () => {
  const [electoralRegister, setElectoralRegister] = useState({});
const [address,setAddress]=useState({});
const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
  const propuser = location.state?.user;
 
  const updateElectoralRegisterData=(electoralRegister)=>{
  setElectoralRegister(electoralRegister);
  if(electoralRegister.Address){
  setAddress(electoralRegister.Address);}
  };

const toHome=()=>{
    navigate('/admin/home');
};
  useEffect(() => {
    const fetchData = async () => {
  
           var token = sessionStorage.getItem('token'); 
          try {
              const response = await fetch('${backendUrl}api/electoralregister/userdata', {
                  method : 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${(token)}`},
                  body: JSON.stringify({"UserName" : propuser.UserName}),
                }
              )
          if (!response.ok) {
            navigate('/');
            throw new Error('Response Error');
          }
          const newdata = await response.json();
          updateElectoralRegisterData(newdata.data);

        } catch (error) {
          setError(error);
        }
      };
    fetchData();
  }, []);

  if (!electoralRegister) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Navigation user = "admin"/>
    <h3>View Electoral Register</h3>
    <div>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>isAdmin</td>
            <td>{electoralRegister.isAdmin ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td>UserName</td>
            <td>{electoralRegister.UserName?electoralRegister.UserName:"N/A"}</td>
          </tr>
          <tr>
            <td>FirstName</td>
            <td>{electoralRegister.FirstName?electoralRegister.FirstName:"N/A"}</td>
          </tr>
          <tr>
            <td>LastName</td>
            <td>{electoralRegister.LastName?electoralRegister.LastName:"N/A"}</td>
          </tr>
          <tr>
            <td>DOB</td>
            <td>{electoralRegister.DOB?electoralRegister.DOB:"N/A"}</td>
          </tr>
          <tr>
            <td>FathersName</td>
            <td>{electoralRegister.FathersName?electoralRegister.FathersName:"N/A"}</td>
          </tr>
          <tr>
            <td>MothersName</td>
            <td>{electoralRegister.MothersName?electoralRegister.MothersName:"N/A"}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{electoralRegister.Email?electoralRegister.Email:"N/A"}</td>
          </tr>
          <tr>
            <td>Password</td>
            <td>******</td>
          </tr>
          <tr>
            <td>PhoneNumber</td>
            <td>{electoralRegister.PhoneNumber?electoralRegister.PhoneNumber:"N/A"}</td>
          </tr>
          <tr>
            <td>NIN</td>
            <td>{electoralRegister.NIN?electoralRegister.NIN:"N/A"}</td>
          </tr>
          <tr>
            <td>PassportNumber</td>
            <td>{electoralRegister.PassportNumber?electoralRegister.PassportNumber:"N/A"}</td>
          </tr>
          <tr>
            <td>House Number</td>
            <td>{address.HouseNumber?address.HouseNumber:"N/A"}</td>
          </tr>
          <tr>
            <td>Street</td>
            <td>{address.Street?address.Street:"N/A"}</td>
          </tr>
          <tr>
            <td>Town</td>
            <td>{address.Town?address.Town:"N/A"}</td>
          </tr>
          <tr>
            <td>City</td>
            <td>{address.City?address.City:"N/A"}</td>
          </tr>          <tr>
            <td>State</td>
            <td>{address.State?address.State:"N/A"}</td>
          </tr>          <tr>
            <td>Country</td>
            <td>{address.Country?address.Country:"N/A"}</td>
          </tr>
          <tr>
            <td>PostalCode</td>
            <td>{electoralRegister.PostalCode?electoralRegister.PostalCode:"N/A"}</td>
          </tr>
          <tr>
            <td>FamilyRegistrationNumber</td>
            <td>{electoralRegister.FamilyRegistrationNumber?electoralRegister.FamilyRegistrationNumber:"N/A"}</td>
          </tr>
          <tr>
            <td>ResidentialStatus</td>
            <td>{electoralRegister.ResidentialStatus?electoralRegister.ResidentialStatus:"N/A"}</td>
          </tr>
          <tr>
            <td>HasConvictions</td>
            <td>{electoralRegister.HasConvictions ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td>JuryEligibility</td>
            <td>{electoralRegister.JuryEligibility ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td>JuryInvitations</td>
            <td>{electoralRegister.JuryInvitations?electoralRegister.JuryInvitations:"N/A"}</td>
          </tr>
          <tr>
            <td>JuryInvitationsAccepted</td>
            <td>{electoralRegister.JuryInvitationsAccepted?electoralRegister.JuryInvitationsAccepted:"N/A"}</td>
          </tr>
        </tbody>
      </table><br/>
      <button onClick={toHome}>Go Back</button>
    </div>

    </>
  );
};

export default ElectoralRegisterView;