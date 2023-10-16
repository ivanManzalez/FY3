import React, { Component, useState, useEffect } from "react";
import {useAuth} from '../../fireBase/AuthContext';
import {useNavigate} from 'react-router-dom';

const SignUp = () => {
  const [loginRedirect, setLoginRedirect] = useState("/");
  // set form field init values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  // pull sign up functino directly from AuthContext.js
  const {signup, currentUser} = useAuth();
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
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };
  const handleSignUpButton = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    if(password !== passwordConfirm){
      return setMessage('Passwords do not match'); 
    }

    try{
      setMessage('');
      await signup(email, password);
      navigate(loginRedirect); // redirect
      console.log('message');
      console.log(message);
    }catch{
      setMessage('Failed to create an account'); 
    }
    setLoading(false);
    console.log('handle signup button');
    console.log('message');
    console.log(message);
    };

  return (
    <div id="sign-up-container">
      <h3> Sign Up </h3>
      <div id="message" >{message && <p>{message}</p>}</div>
      {/*{currentUser.email}*/}
      <form id="sign-up-form" className='form'>
        <TextField id={"email"} field={"Email"} handler={handleEmailChange} value={email} />
        <TextField id={"password"} field={"Password"} handler={handlePasswordChange} value={password} />
        <TextField id={"password-confirm"} field={"Password Confirmation"} handler={handlePasswordConfirmChange} value={passwordConfirm} />
        <button type='submit' placeholder="Sign Up" disabled={loading} onClick={handleSignUpButton}> Sign Up </button>
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

export default SignUp;