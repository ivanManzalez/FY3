import React from "react";

// URL endpoints
const TESTBASE = 'http://127.0.0.1:8000/';
const API = 'players/';
const DRAFTEES = 'draftees/'
const RETRIEVE_PLAYER = 'player-profile/';
const CREATEPLAYER = 'create-player/';

// GET all existing players 
const retrieveAllPlayers = () => {
  return fetch(TESTBASE+API)
  .then((response)=>{
    return response.json();
  })
  .catch((error) => {
    return error;
  })
};

const getDraftees = () => {
  return fetch(TESTBASE+API+DRAFTEES)
  .then((response)=>{
    return response.json();
  })
  .catch((error) => {
    return error;
  })
};

// GET existing player by First and Last name
const retrievePlayerById = async (id) => {
  
  return fetch(TESTBASE + API + RETRIEVE_PLAYER + id)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error('An error occurred:', error);
      return error;
    });
};

// POST new player w/ all player details
const createPlayer = async (requestOptions) => { 
  return fetch(TESTBASE + API + CREATEPLAYER, requestOptions )
  .then((response)=>{
    return response.json();
    })
  .catch((error) => {
    return error; //new Error();
  });
};


// PUT player w/ new player details
const updatePlayerById = (id, requestOptions) => {  
  return fetch(TESTBASE + API + RETRIEVE_PLAYER + id, requestOptions )
  .then((response)=>{
    return response.json();
    })
    .catch((error) => {
      
      console.log(error)
      return error;
  });
};

// DELETE player by full name
const deletePlayerById = (id, requestOptions) => {  
  return fetch(TESTBASE + API + RETRIEVE_PLAYER + id, requestOptions )
  .then((response) => {
    return response.json()
    })
  .catch((error) => {
    console.error('An error occurred:', error);
    return error;
  });
};

export {retrieveAllPlayers, getDraftees, retrievePlayerById, createPlayer, updatePlayerById,deletePlayerById};

// 