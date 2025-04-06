import Navigation from "../../Navigation";
import React from 'react';
import { useState, useEffect } from "react";
import { Link} from 'react-router-dom';
import CasesFilledByUser from "./CasesFilledByUser";
import CasesFilledOnUser from "./CasesFilledOnUser";
const UserCases=()=>{

    return(
    <>
    <Navigation user = "user"/>
    <h3>UserCases</h3>
    <br/>
        <h3>Cases Filled By User : {sessionStorage.getItem('UserName')}</h3>
        <CasesFilledByUser/>        
    <br/><hr/><br/>

        <h3>Cases Filled On User : {sessionStorage.getItem('UserName')}</h3>
        <CasesFilledOnUser/>
    </>
    )
}
export default UserCases;