import React from "react";

// URL endpoints
const TESTBASE = 'http://127.0.0.1:8000/';
const API = 'players/';
const RETRIEVE_PLAYER = 'player-profile/';
const CREATEPLAYER = 'create-player/';

// GET all existing players 
const retrieveAllPlayers = () => {
  return fetch(TESTBASE+API)
  
  .then((response)=>{
    console.log(response.status);
    return response.json();
  
  }).then((data) => {
    console.log(data)
  })
};

// GET existing player by First and Last name
const retrievePlayerByFullName = async (name) => {
  const fullname = name.first + "+" + name.last;
  
  return fetch(TESTBASE + API + RETRIEVE_PLAYER + fullname)
    .then((response) => {
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });
};

// POST new player w/ all player details
const createPlayer = async (requestOptions) => { 
  return fetch(TESTBASE + API + CREATEPLAYER, requestOptions )
  .then((response)=>{
    return response.json();
    })
  .catch((error) => {
    // console.log('Got error --- ' + error.message);
    return error; //new Error();
  });
};


// PUT player w/ new player details
const updatePlayer = (name, requestOptions) => {   
  const fullname = name.first + "+" + name.last; 
  return fetch(TESTBASE + API + RETRIEVE_PLAYER + fullname, requestOptions )
  .then((response)=>{
    console.log(response.ok)
    if (!response.ok) {
      console.log(fullname+" details NOT updated")
      throw new Error('Network response was not ok');
    }
    else{
      console.log(fullname+" details updated")
    }
    return response.json();
    }).then((data) => {
      console.log(data)
    if (data.message) {
      // Display the message to the user
      // setMessage(data.message);
      // Clear the form fields
      }
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });
    // Handle other response data
    // data.data
  };

// DELETE player by full name
const deletePlayerByFullName = (name, requestOptions) => {  
  const fullname = name.first + "+" + name.last; 
  return fetch(TESTBASE + API + RETRIEVE_PLAYER + fullname, requestOptions )
  .then((response) => {
    return response.json()
    console.log('player deleted');
    console.log(response.ok);
    })
  .catch((error) => {
    console.error('An error occurred:', error);
  });
};

export {deletePlayerByFullName, updatePlayer, createPlayer, retrieveAllPlayers,retrievePlayerByFullName};