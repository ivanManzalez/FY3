import React, { Component, useState } from "react";
import { Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';


const Home = (props) => {
  const [error, setError] = useState('');
  const {currentUser, logout} = useAuth();
  const [logoutRedirect, setLogoutRedirect] = useState("login/");
  const navigate = useNavigate();

  const handleLogout = async () =>{
    setError('');
    try{
      await logout();
      navigate(logoutRedirect) // redirect
    }catch{
      setError('Failed to logout');
    }
  }
  return(
    <div>
      <h1>This is {props.name}'s Home page</h1>
      <Link to="/login" ><button onClick={handleLogout}>Logout</button></Link>
    </div>
    );
};

export default Home;