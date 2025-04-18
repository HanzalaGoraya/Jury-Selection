import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate,Link} from 'react-router-dom';
import Navigation from "../../Navigation";
import ElectoralRegisterTable from "../ElectoralRegisterDetails";

const Home=()=>{

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [array, setarray] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
         var token = sessionStorage.getItem('token'); 
        try {
            const response = await fetch('${backendUrl}api/register/users', {
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
        setData(newdata);
        setarray(newdata.data)
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
    <h3>Electoral Register</h3>

    <div className="table-container">
    <table className="responsive-table">
        <thead>
          <tr>
            <th>isAdmin</th>
            <th>UserName</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>DOB</th>
            <th>Email</th>
            
            <th>JuryEligibility</th>
            {/* <th>JuryInvitations</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {array.map((user) => (
            <tr key={user.UserName}>
               <td>{user.isAdmin.toString() != (null || "")? user.isAdmin.toString(): "N/A"}</td>
              <td>{user.UserName != (null || "")? user.UserName : "N/A"}</td>
              <td>{user.FirstName != (null || "")? user.FirstName : "N/A"}</td>
              <td>{user.LastName!= (null || "")? user.LastName : "N/A"}</td>
              <td>{user.DOB!= (null || "")? user.DOB : "N/A"}</td>
              <td>{user.PhoneNumber!= (null || "")? user.Email : "N/A"}</td>
              <td>{user.JuryEligibility?"Eligible":"Not Eligible"}</td>
              {/* <td>{user.JuryInvitations!= (null || "")? user.JuryInvitations : "N/A"}</td> */}
              
              
              <td>
              
              <Link to = "/admin/viewelectoralregister" className="btn-add" state={{ user }}><span>View</span></Link>
                <Link to = "/admin/updateelectoralregister" className="btn-add" state={{ user }}><span>Update</span></Link>
                <Link to = "/admin/deleteelectoralregister" className="btn-add" state={{ user }}><span>Delete</span></Link>
              
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
export default Home;


