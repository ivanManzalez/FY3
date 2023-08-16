import React, { Component, useState, useEffect } from "react";
import {useAuth} from '../../contexts/AuthContext';
import {useNavigate, useLocation} from 'react-router-dom';

const GoogleLogin = () => {
  // set form field init values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // pull login function directly from AuthContext.js
  const {googleLogin} = useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLoginButton = async (e) => {
    setLoading(true);
    googleLogin().
    then((result) => {
      console.log("---then---");
      const name = result.user.displayName.split(" ");
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      const redirectPath = location.state?.from || '/';
      navigate(redirectPath);

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
      // can retrieve using <>localStorage.getItem("itemName")</> in render
    }).
    catch((error) => {
      console.error("Google Sign-In Error: ", error)
      })
    console.log("handleGoogleLoginButton");
    };

  return (
      // ...
      <button onClick={handleGoogleLoginButton}>Sign in with Google</button>
      // ...
  );
};

export default GoogleLogin;