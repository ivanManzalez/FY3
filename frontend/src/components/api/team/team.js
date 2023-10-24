import React from "react";

// URL endpoints
const TESTBASE = 'http://127.0.0.1:8000/';
const API = 'teams/';
const RETRIEVE_TEAM = 'team-profile/';
const CREATE_TEAM = 'create-team/';

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

const retrieveTeamByID = async (id) => {
  
  return fetch(TESTBASE + API + RETRIEVE_TEAM + id)
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
    console.error('An error occurred:', error);
    return error;
  });
};

const createTeam = async (requestOptions) => { 
  return fetch(TESTBASE + API + CREATE_TEAM, requestOptions )
  .then((response)=>{
    return response.json();
  })
  .catch((error) => {
    return error; //new Error();
  });
};

const updateTeamByID = (id, requestOptions) => {  
  console.log("updateTeamByID",id) 
  return fetch(TESTBASE + API + RETRIEVE_TEAM + id+"/", requestOptions )
  .then((response)=>{
    return response.json();
  })
  .catch((error) => {
    return error;
  });
};

const deleteTeamByID = (id, requestOptions) => {
  console.log(TESTBASE + API + RETRIEVE_TEAM + id) ; 
  return fetch(TESTBASE + API + RETRIEVE_TEAM + id, requestOptions )
  .then((response) => {
    return response.json()
  })
  .catch((error) => {
    console.error('An error occurred:', error);
    return error;
  })
};

export {retrieveAllTeams, retrieveTeamByID, createTeam, updateTeamByID, deleteTeamByID};

// 