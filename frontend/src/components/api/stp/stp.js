import React from "react";

// URL endpoints
const TESTBASE = 'http://127.0.0.1:8000/';
const API = 'stp/';
const RETRIEVE_SEASONS_TEAM = 'stp-szn-teams/';
const CREATESTP = 'create-stp/';

// CRUD
const createStp = async (requestOptions) => { 
  return fetch(TESTBASE + API + CREATESTP, requestOptions )
  .then((response)=>{
    return response.json();
  })
  .catch((error) => {
    return error; //new Error();
  });
};

const retrieveAllSTPs = () => {
  return fetch(TESTBASE+API)
  .then((response) => {
    return response.json()
  })
  .catch((error) => console.error(error))
};

const retrieveStpBySeason = async (season) => {
  return fetch(TESTBASE + API + RETRIEVE_SEASONS_TEAM + season)
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
    console.error('An error occurred:', error);
    return error;
  });
};


export {createStp, retrieveAllSTPs, retrieveStpBySeason};
 