import React, { Component, useState, useEffect } from "react";
import {useAuth} from '../../fireBase/AuthContext';
import {useNavigate} from 'react-router-dom';
import {createUser} from '../api/user/user';
import {joinUserPlayer} from '../api/user/userJoinPlayer';

const EmailSignUp = () => {
  // pull sign up functino directly from AuthContext.js
  const {emailSignup, currentUser} = useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    if(currentUser !== null){
      navigate("/")
    }
  },[])
  // 
  const [successfulSignUpRedirect, setSuccessfulSignUpRedirect] = useState("/");
  const [failedSignUpRedirect, setFailedSignUpRedirect] = useState("/signup");
  // set form field init values
  const [isPlayer, setIsPlayer] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // Initial state of ingested player
  const initialUserFormState = {
    email:email,
    password:password,
    first_name:"",
    last_name:"",
    username:"",
  };

  const initialPlayerFormState = {
    instagram:"",
    twitter:"",
    facebook:"",
    fav_player:"",
    highschool:"",
    dob:"",
    height_ft:"",
    height_in:"",
    weight_lb:"",
  };

  // Form State that will be passed to API 
  const [userFormState, setUserFormState] = useState(initialUserFormState);
  const [playerFormState, setPlayerFormState] = useState(initialPlayerFormState);

  
  const handleUserFormChange = (e) => {
    // console.log(e.target)
    const { name, value } = e.target;
    console.log("handleUserFormChange",name, value)
    console.log(e.target)
    setUserFormState({
      ...userFormState,
      [name]: value,
    });
    console.log(userFormState)
  };

  const handlePlayerFormChange = (e) => {

    const { name, value } = e.target;
    console.log("handlePlayerFormChange",name, value)
    
    setPlayerFormState({
      ...playerFormState,
      [name]: value,
    });
  };

  // Event handlers
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value)
    const emailChange = {
      target:{
        name:"email",
        value: e.target.value
      }
    }
    handleUserFormChange(emailChange)
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // does password only contain valid characters?
    const passwordChange = {
      target:{
        name:"password",
        value:e.target.value
      }
    }
    handleUserFormChange(passwordChange)
  };
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleIsPlayerRadioClick = () => {
    setIsPlayer(!isPlayer);
  }

  const registerUser = async (userForm) => {
    console.log(userForm);
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(userForm),
    }; 
    const createUserResp = await createUser(requestOptions);
    console.log(createUserResp);
    return {success:true, userId:userForm.uid}
  }

  const registerPlayer = async (playerForm) => {
    console.log(playerForm);
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(playerForm),
    }; 
    // const createPlayerResp = await createPlayer(requestOptions);
    // console.log(createPlayerResp);
    return {success:true, statusCode:false}
  }

  const joinUserAndPlayer = async (uid, userId, playerId) => {
    console.log(`Join ${uid}, ${userId}, and ${playerId}`)
    return {id:null, success:true}
  }

  const handleSignUpButton = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    if(password !== passwordConfirm){
      return setMessage('Passwords do not match'); 
    }

    try{
      setMessage('');
      const signupResp = await emailSignup(email, password); // firebase
      const userId = signupResp.user.uid;

      // sign up in django  
      const userRegisterResp = await registerUser(userFormState)
      const successful = true;
      console.log("signup:",userId);
      
      var playerRegisterResp = {id:""};
      if(userFormState.isPlayer && userRegisterResp.success && userId){
        playerRegisterResp = await registerPlayer(playerFormState); // django
        successful = registerResp.statusCode;
        console.log(`Send Player creation with UID = ${userId}`)
        }

      console.log('message');
      console.log(message);
      const userJoinPlayerResp = await joinUserAndPlayer(userId, userRegisterResp.id, playerRegisterResp.id )

      console.log((userRegisterResp.id || playerRegisterResp.userId) && successful && userJoinPlayerResp.success)
      if((userRegisterResp.success || playerRegisterResp.userId) && successful && userJoinPlayerResp.success){
        navigate(successfulSignUpRedirect); // redirect
      }else{
        setLoading(false);
        navigate(failedSignUpRedirect);
      }
      
    }catch (error){
      console.log(error.message);
      setMessage('Failed to create an account - '+ error.message); 
      setLoading(false);
    }

  };

  return (
    <div id="sign-up-container">
      <h3> Sign Up </h3>
      <div id="message" >{message && <p>{message}</p>}</div>
      {/*{currentUser.email}*/}
      <form id="sign-up-form" className='form'>
        <TextField id={"first_name"} name = {"first_name"} field={"First Name"} handler={handleUserFormChange} value={userFormState.first_name} />
        <TextField id={"last_name"}  name = {"last_name"}  field={"Last Name"}  handler={handleUserFormChange} value={userFormState.last_name} />
        
        <br></br>
        <TextField id={"username"}  name = {"username"}  field={"Username"}  handler={handleUserFormChange} value={userFormState.username} />
        <TextField id={"email"}            field={"Email"}                 handler={handleEmailChange}           value={userFormState.email} />
        <TextField id={"password"}         field={"Password"}              handler={handlePasswordChange}        value={userFormState.password} />
        <TextField id={"password-confirm"} field={"Password Confirmation"} handler={handlePasswordConfirmChange} value={passwordConfirm} />

        <br></br>

        <RadioField id={"is_player"} name = {"isPlayer"} field={"Player?"}  handler={handleIsPlayerRadioClick} value={isPlayer} />
        
        <br></br>

        { isPlayer && 
        <>
        <TextField id={"instagram"} field={"IG *"}  handler={handlePlayerFormChange} value={playerFormState.instagram} />
        <TextField id={"twitter"}   field={"X *"}   handler={handlePlayerFormChange} value={playerFormState.twitter} />
        <TextField id={"facebook"}  field={"FB *"}  handler={handlePlayerFormChange} value={playerFormState.facebook} />

        <br></br>

        <TextField id={"fav_player"} field={"Favourite Player"} handler={handlePlayerFormChange} value={playerFormState.fav_player} />
        <TextField id={"highschool"} field={"Highschool"}       handler={handlePlayerFormChange} value={playerFormState.highschool} />
        
        <br></br>

        <TextField id={"birthdate"} field={"Birth Date *"} handler={handlePlayerFormChange} value={playerFormState.dob} />
        <TextField id={"height_ft"} field={"Height Ft."}   handler={handlePlayerFormChange} value={playerFormState.height_ft} />
        <TextField id={"height_in"} field={"Height In."}   handler={handlePlayerFormChange} value={playerFormState.height_in} />
        <TextField id={"weight_lb"} field={"Weight (Lbs)"} handler={handlePlayerFormChange} value={playerFormState.weight_lb} />

        </>
        }

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
      <input className = "inputter" type="text" id={props.id} value={props.value} onChange={props.handler} name={props.name} required/>
      <div className="labelline">{"Enter " + props.field}</div>
    </div>
    )
};

const RadioField = (props) => {
  return(
    <div className = "entryarea">
      {/*<label>{props.field}</label>*/}
      
      <input className = "inputter" type="button" id={props.id} value={props.value} onClick={props.handler} required/>
      {<div className="labelline">{"" + props.field}</div>}
    </div>
    )
};

export default EmailSignUp;