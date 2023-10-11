import React from "react";

// URL endpoints
const TESTBASE = 'http://127.0.0.1:8000/';
const API = 'games/';
const RETRIEVE_GAME = 'game-profile/';
const CREATEGAME = 'create-game/';

// GET all existing Events
const retrieveAllGames = () => {
  return fetch(TESTBASE+API)
  .then((response)=>{
    return response.json();
  })
  .catch((error) => {
    return error;
  })
};


// GET existing Event by Name
const retrieveGameByTeamNames = async (home_team, away_team) => {
  const searchQuery = home_team+"+"+away_team;
  return fetch(TESTBASE + API + RETRIEVE_GAME + searchQuery)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error('An error occurred:', error);
      return error;
    });
};

// POST new Event w/ all Event details
const createGame = async (requestOptions) => { 
  return fetch(TESTBASE + API + CREATEGAME, requestOptions )
  .then((response)=>{
    return response.json();
    })
  .catch((error) => {
    return error; //new Error();
  });
};


// PUT Event w/ new Event details
const updateGame = (name, requestOptions) => {   
  const searchQuery = requestOptions.home_team+"+"+requestOptions.away_team
  return fetch(TESTBASE + API + RETRIEVE_GAME + searchQuery, requestOptions )
  .then((response)=>{
    return response.json();
    })
    .catch((error) => {
      return error;
  });
};

// DELETE Event by name
const deleteGameByName = (name, requestOptions) => {  
  const searchQuery = requestOptions.home_team+"+"+requestOptions.away_team
  return fetch(TESTBASE + API + RETRIEVE_GAME + searchQuery, requestOptions )
  .then((response) => {
    return response.json()
    })
  .catch((error) => {
    console.error('An error occurred:', error);
    return error;
  });
};

export {retrieveAllGames, retrieveGameByTeamNames, createGame, updateGame,deleteGameByName};

// 