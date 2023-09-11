import React, { Component, useState } from "react";
import { Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';


const Home = (props) => {
  const [error, setError] = useState('');
  const {logout, currentUser} = useAuth();
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
  console.log(currentUser);
  return(
    <div>
      <h1>This is {currentUser.email}'s Home page</h1>
      <Link to="/login" ><button onClick={handleLogout}>Logout</button></Link>
    </div>
    );
};

export default Home;