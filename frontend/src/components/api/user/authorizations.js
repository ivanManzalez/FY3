import React from "react";

// URL endpoints
const TESTBASE = 'http://127.0.0.1:8000/';
const API = 'users/';
const RETRIEVE_AUTH = 'user-groups/';


// GET all existing Users 
const getUserAuthorization = (requestOptions) => {
  return fetch(TESTBASE+API, requestOptions)
  .then((response)=>{
    return response.json();
  })
  .catch((error) => {
    return error;
  })
};


export {getUserAuthorization};

// 