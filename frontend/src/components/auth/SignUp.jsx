import React, { Component, useState, useEffect } from "react";

const SignUp = () => {
  // set form field init values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // Event handlers
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };
  const handleSignInButton = (e) => {
    e.preventDefault();
    
    
    };

  return (
    <div id="sign-in-container">
      <h3> Sign Up </h3>

      <form id="sign-in-form" className='form'>
        <TextField id={"username"} field={"Username"} handler={handleUsernameChange} value={username} />
        <TextField id={"password"} field={"Password"} handler={handlePasswordChange} value={password} />
        <TextField id={"password-confirm"} field={"Password Confirmation"} handler={handlePasswordConfirmChange} value={passwordConfirm} />
        <button type='submit' placeholder="Sign Up" onClick={handleSignInButton}> Sign Up </button>
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