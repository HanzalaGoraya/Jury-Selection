import React from 'react';
import { useState, useEffect } from "react";
import { Link} from 'react-router-dom';
import Home from '../components/admin/Home';
import { useNavigate } from 'react-router-dom';

const Login=()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://127.0.0.1:3000/api/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ UserName: username, Password: password }),
        });
  
        if (!response.ok) {
          throw new Error('Response Error');
        }
  
        const data = await response.json();
        setResponseMessage('User Logged in');
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('UserName', data.UserName);
        sessionStorage.setItem('Role', data.Role);
        
        const token = sessionStorage.getItem('token');
        const UserName = sessionStorage.getItem('UserName');
        const Role = sessionStorage.getItem('Role');

        if(Role ==="admin")
        {
          navigate('/admin/home');
        }
        else{
          navigate('/user');
        }
        
      } catch (error) {
        setError(error.message);
      }


      
    }
    return(
        <>
        
        <div className="container-login">
        <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete='true'
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='true'
            required
          />
        </div>
        <span>
        <button className='btn-login' type="submit" >Login</button>
        <Link to = "/register"><button className='btn-register'>Register</button></Link>
        </span>
      </form>
      {error && <p className="error">Error: {error}</p>}
      {responseMessage && <p className="success">{responseMessage}</p>}
    </div>
        
        </>




    )


    }
    export default Login;