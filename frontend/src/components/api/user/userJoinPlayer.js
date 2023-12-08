
import React from "react";

// URL endpoints
const TESTBASE = 'http://127.0.0.1:8000/';
const API = 'users/';
const USER_JOIN_PLAYER = 'user-join-player/';

// GET all existing Users 
const joinUserPlayer = () => {
  return fetch(TESTBASE+API+USER_JOIN_PLAYER)
  .then((response)=>{
    return response.json();
  })
  .catch((error) => {
    return error;
  })
};

export {joinUserPlayer};

// 