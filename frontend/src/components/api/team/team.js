import React from "react";

// URL endpoints
const TESTBASE = 'http://127.0.0.1:8000/';
const API = 'teams/';
const RETRIEVE_TEAM = 'team-profile/';
const CREATETEAM = 'create-team/';

// GET all existing players 
const retrieveAllTeams = () => {
  return fetch(TESTBASE+API)
  .then((response)=>{
    return response.json();
  })
  .catch((error) => {
    return error;
  })
};

const retrieveTeamByName = async (name) => {
  
  return fetch(TESTBASE + API + RETRIEVE_TEAM + name)
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
    console.error('An error occurred:', error);
    return error;
  });
};

const createTeam = async (requestOptions) => { 
  return fetch(TESTBASE + API + CREATETEAM, requestOptions )
  .then((response)=>{
    return response.json();
  })
  .catch((error) => {
    return error; //new Error();
  });
};

const updateTeam = (name, requestOptions) => {   
  return fetch(TESTBASE + API + RETRIEVE_TEAM + name, requestOptions )
  .then((response)=>{
    return response.json();
  })
  .catch((error) => {
    return error;
  });
};

const deleteTeamByName = (name, requestOptions) => {  
  return fetch(TESTBASE + API + RETRIEVE_PLAYER + name, requestOptions )
  .then((response) => {
    return response.json()
  })
  .catch((error) => {
    console.error('An error occurred:', error);
    return error;
  })
};

export {retrieveAllTeams, retrieveTeamByName, createTeam, updateTeam, deleteTeamByName};

// 