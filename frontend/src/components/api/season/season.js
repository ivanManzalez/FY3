import React from "react";

// URL endpoints
const TESTBASE = 'http://127.0.0.1:8000/';
const API = 'seasons/';
const RETRIEVE_SEASON = 'season-profile/';
const CREATESEASON = 'create-season/';

// CRUD
const createSeason = async (requestOptions) => { 
  return fetch(TESTBASE + API + CREATESEASON, requestOptions )
  .then((response)=>{
    return response.json();
  })
  .catch((error) => {
    return error; //new Error();
  });
};

const retrieveAllSeasons = () => {
  return fetch(TESTBASE+API)
  .then((response)=>{
    return response.json();
  .catch((error) => {
    return error;
  })
};

const retrieveSeasonByYear = async (year) => {
  return fetch(TESTBASE + API + RETRIEVE_SEASON + year)
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
    console.error('An error occurred:', error);
    return error;
  });
};

const updateSeason = (year, requestOptions) => {   
  return fetch(TESTBASE + API + RETRIEVE_SEASON + name, requestOptions )
  .then((response)=>{
    return response.json();
  })
  .catch((error) => {
    return error;
  });
};

const deleteSeasonByYear = (year, requestOptions) => {  
  return fetch(TESTBASE + API + RETRIEVE_SEASON + year, requestOptions )
  .then((response) => {
    return response.json()
  })
  .catch((error) => {
    console.error('An error occurred:', error);
    return error;
  });


export {createSeason, retrieveAllSeasons, retrieveSeasonByYear, updateSeason, deleteSeasonByYear};

  // 