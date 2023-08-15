import React, { Component, useState, useEffect } from "react";
import {useAuth} from '../../contexts/AuthContext';
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const [loginRedirect, setLoginRedirect] = useState("/");
  // set form field init values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // pull sign up functino directly from AuthContext.js
  const {login, currentUser} = useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Event handlers
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // does password only contain valid characters?
  };
  const handleLoginButton = async (e) => {
    e.preventDefault();
    setLoading(true);

    try{
      setMessage('');
      await login(email, password); //Login
      navigate(loginRedirect) // redirect
      console.log('message');
      console.log(message);
    }catch{
      setMessage('Failed to sign in'); 
    }
    setLoading(false);
    console.log('handle login button');
    };

  return (
    <div id="login-container">
      <h3> Login </h3>
      <div id="message" >{message && <p>{message}</p>}</div>
      {/*{currentUser.email}*/}
      <form id="login-form" className='form'>
        <TextField id={"email"} field={"Email"} handler={handleEmailChange} value={email} />
        <TextField id={"password"} field={"Password"} handler={handlePasswordChange} value={password} />
        <button type='submit' placeholder="Login" disabled={loading} onClick={handleLoginButton}> Login </button>
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