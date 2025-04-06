import React from "react";

const ElectoralRegisterTable = (props)=>
{
    var data = props.data;

return(
<div className="table-container">
<table className="responsive-table">
        <thead>
          <tr>
            <th>isAdmin</th>
            <th>UserName</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>DOB</th>
            <th>FathersName</th>
            <th>MothersName</th>
            <th>Email</th>
            <th>PhoneNumber</th>
            <th>NIN</th>
            <th>PassportNumber</th>
            <th>HouseNumber</th>
            <th>Street</th>
            <th>Town</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>PostalCode</th>
            <th>FamilyRegistrationNumber</th>
            <th>ResidentialStatus</th>
            <th>HasConvictions</th>
            <th>JuryEligibility</th>
            <th>JuryInvitations</th>
            <th>JuryInvitationsAccepted</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.UserName}>
              <td>{user.isAdmin.toString()}</td>
              <td>{user.UserName}</td>
              <td>{user.FirstName}</td>
              <td>{user.LastName}</td>
              <td>{user.DOB}</td>
              <td>{user.FathersName}</td>
              <td>{user.MothersName}</td>
              <td>{user.Email}</td>
              <td>{user.PhoneNumber}</td>
              <td>{user.NIN}</td>
              <td>{user.PassportNumber}</td>
              <td>{user.Address.HouseNumber}</td>
              <td>{user.Address.Street}</td>
              <td>{user.Address.Town}</td>
              <td>{user.Address.City}</td>
              <td>{user.Address.State}</td>
              <td>{user.Address.Country}</td>
              <td>{user.PostalCode}</td>
              <td>{user.FamilyRegistrationNumber}</td>
              <td>{user.ResidentialStatus}</td>
              <td>{user.HasConvictions.toString()}</td>
              <td>{user.JuryEligibility.toString()}</td>
              <td>{user.JuryInvitations}</td>
              <td>{user.JuryInvitationsAccepted}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
)
}
export default ElectoralRegisterTable;