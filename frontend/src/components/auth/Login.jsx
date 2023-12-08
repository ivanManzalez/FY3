import React, { Component, useState, useEffect } from "react";
import {useAuth} from '../../fireBase/AuthContext';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import GoogleLogin from './GoogleLogin';

const Login = () => {
  // set form field init values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // pull login function directly from AuthContext.js
  const {login, currentUser} = useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  // Event handlers
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // TODO: how to check that email is properly formatted?
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // TODO: how to check that password contains only valid characters?
  };
  const handleLoginButton = async (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: How to handle response payload to display specific user errs?
    try{
      setMessage('');
      await login(email, password); //Login
      const redirectPath = location.state?.from || '/';
      console.log("redirect set to -> "+redirectPath)
      navigate(redirectPath);
    }catch{
      setMessage('Failed to sign in'); 
    }
    setLoading(false);
    console.log('handle login button');
    };

  const handleSignupButton = () => {
    // call user api
  }

  return (
    <div id="login-container">
      <h3> Login </h3>
      <div id="message" >{message && <p>{message}</p>}</div>
      {/*{currentUser.email}*/}
      <form id="login-form" className='form'>
        <TextField id={"email"} field={"Email"} handler={handleEmailChange} value={email} />
        <TextField id={"password"} field={"Password"} handler={handlePasswordChange} value={password} />
        <button type='submit' placeholder="Login" disabled={loading} onClick={handleLoginButton}> Login </button>
        <GoogleLogin />
        <Link to="/signup" ><button>Sign Up</button></Link>
      </form>
    </div>
  );
};

////////////////////////
const TextField = (props) => {
  return(
    <div className = "entryarea">
      {/*<label>{props.field}</label>*/}
      <input className = "inputter" type="text" id={props.id} value={props.value} onChange={props.handler} required/>
      <div className="labelline">{"Enter " + props.field}</div>
    </div>
    )
};

export default Login;