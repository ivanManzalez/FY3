import React from "react";

// URL endpoints
const TESTBASE = 'http://127.0.0.1:8000/';
const API = 'users/';
const RETRIEVE_USER = 'user-profile/';
const CREATEUSER = 'create-user/';

// GET all existing Users 
const retrieveAllUser = () => {
  return fetch(TESTBASE+API)
  .then((response)=>{
    return response.json();
  })
  .catch((error) => {
    return error;
  })
};

// GET existing User by First and Last name
const retrieveUserById = async (id) => {
  
  return fetch(TESTBASE + API + RETRIEVE_USER + id)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error('An error occurred:', error);
      return error;
    });
};

// POST new User w/ all User details
const createUser = async (requestOptions) => { 
  return fetch(TESTBASE + API + CREATEUSER, requestOptions )
  .then((response)=>{
    return response.json();
    })
  .catch((error) => {
    return error; //new Error();
  });
};


// PUT User w/ new User details
const updateUserById = (id, requestOptions) => {  
  return fetch(TESTBASE + API + RETRIEVE_USER + id, requestOptions )
  .then((response)=>{
    return response.json();
    })
    .catch((error) => {
      
      console.log(error)
      return error;
  });
};

// DELETE User by full name
const deleteUserById = (id, requestOptions) => {  
  return fetch(TESTBASE + API + RETRIEVE_USER + id, requestOptions )
  .then((response) => {
    return response.json()
    })
  .catch((error) => {
    console.error('An error occurred:', error);
    return error;
  });
};

export {retrieveAllUser, retrieveUserById, createUser, updateUserById,deleteUserById};

// 