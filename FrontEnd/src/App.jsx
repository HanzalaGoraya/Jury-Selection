import React from 'react';
import { Route,Routes} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

import AddCourt from './components/admin/AddCourt';
import Cases from './components/admin/Cases';
import RandomJury from './components/admin/RandomJury';
import Courts from './components/admin/Courts';
import Home from './components/admin/Home';
import JuryInvitations from './components/user/JuryInvitations';
import UserCases from './components/user/UserCases';
import AddCase from './components/admin/AddCase';
import ViewCase from './components/admin/ViewCase';
import UpdateCase from './components/admin/UpdateCase.jsx';
import DeleteCase from './components/admin/DeleteCase';
import UpdateCourt from './components/admin/UpdateCourt';
import ViewCourt from './components/admin/ViewCourt';
import DeleteCourt from './components/admin/DeleteCourt';
import UpdateElectoralRegister from './components/admin/UpdateElectoralRegister.jsx';
import DeleteElectoralRegister from './components/admin/DeleteElectoralRegister.jsx';
import ViewElectoralRegister from './components/admin/ViewElectoralRegister.jsx';



function App() {
  return (
    <>
    <Routes>
    <Route path='/' element = {<Login/>}/>
    <Route path='/register' element = {<Register/>}/>
    <Route path='/admin/home' element = {<Home/>}/>
    <Route path='/admin/cases' element = {<Cases/>}/>
    <Route path='/admin/randomjury' element = {<RandomJury/>}/>
    <Route path='/admin/courts' element = {<Courts/>}/>
    <Route path='/admin/viewcourt' element = {<ViewCourt/>}/>
    <Route path='/admin/addcourt' element = {<AddCourt/>}/>
    <Route path='/admin/Updatecourt' element = {<UpdateCourt/>}/>
    <Route path='/admin/Deletecourt' element = {<DeleteCourt/>}/>
    <Route path='/admin/addcase' element = {<AddCase/>}/>
    <Route path='/admin/viewcase' element = {<ViewCase/>}/>
    <Route path='/admin/updatecase' element = {<UpdateCase/>}/>
    <Route path='/admin/deletecase' element = {<DeleteCase/>}/>
    <Route path='/admin/updateelectoralregister' element = {<UpdateElectoralRegister/>}/>
    <Route path='/admin/viewelectoralregister' element = {<ViewElectoralRegister/>}/>
    <Route path='/admin/deleteelectoralregister' element = {<DeleteElectoralRegister/>}/>
    <Route path='/user' element = {<UserCases/>}/>
    <Route path='/user/juryinvitations' element = {<JuryInvitations/>}/>
  </Routes>
 
  </>
  )
}

export default App
