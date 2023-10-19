import React, { Component, useState } from "react";
import { Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../fireBase/AuthContext';
import dayjs from 'dayjs';



const Home = (props) => {
  const today = dayjs();
  const [error, setError] = useState('');
  const {logout, currentUser} = useAuth();
  const [logoutRedirect, setLogoutRedirect] = useState("login/");
  const navigate = useNavigate();


  // Refactor
  // const dateToYYYYMMDD = (dayjsObj) => {
  //   const year = dayjsObj.$y;
  //   const month = dayjsObj.$M+1;
  //   const day = dayjsObj.$D;
  //   const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
  //   const hour = dayjsObj.$H;
  //   const min = dayjsObj.$m;
  //   const sec = dayjsObj.$s;
  //   const time = `${hour.toString().padStart(2,'0')}_${min.toString().padStart(2, '0')}_${sec.toString().padStart(2, '0')}`;
    
  //   const ret = {date, year,time};
  //   return ret;
  // }

  const handleLogout = async () =>{
    setError('');
    try{
      await logout();
      navigate(logoutRedirect) // redirect
    }catch{
      setError('Failed to logout');
    }
  }

  // console.log(currentUser);
  return(
    <div>
      <h1>This is {currentUser.email}'s Home page</h1>
      <Link to="/login" ><button onClick={handleLogout}>Logout</button></Link>
    </div>
    );
};

export default Home;