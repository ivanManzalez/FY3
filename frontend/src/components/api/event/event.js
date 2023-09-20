import React from "react";

// URL endpoints
const TESTBASE = 'http://127.0.0.1:8000/';
const API = 'events/';
const RETRIEVE_PLAYER = 'event-profile/';
const CREATEPLAYER = 'create-event/';

// GET all existing players 
const retrieveAllEvents = () => {
  return fetch(TESTBASE+API)
  .then((response)=>{
    return response.json();
  })
  .catch((error) => {
    return error;
  })
};


// GET existing player by First and Last name
const retrieveEventByName = async (name) => {
  const fullname = name.first + "+" + name.last;
  
  return fetch(TESTBASE + API + RETRIEVE_PLAYER + fullname)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error('An error occurred:', error);
      return error;
    });
};

// POST new player w/ all player details
const createEvent = async (requestOptions) => { 
  return fetch(TESTBASE + API + CREATEPLAYER, requestOptions )
  .then((response)=>{
    return response.json();
    })
  .catch((error) => {
    return error; //new Error();
  });
};


// PUT player w/ new player details
const updateEvent = (name, requestOptions) => {   
  const fullname = name.first + "+" + name.last; 
  return fetch(TESTBASE + API + RETRIEVE_PLAYER + fullname, requestOptions )
  .then((response)=>{
    return response.json();
    })
    .catch((error) => {
      return error;
  });
};

// DELETE player by full name
const deleteEventByName = (name, requestOptions) => {  
  const fullname = name.first + "+" + name.last; 
  return fetch(TESTBASE + API + RETRIEVE_PLAYER + fullname, requestOptions )
  .then((response) => {
    return response.json()
    })
  .catch((error) => {
    console.error('An error occurred:', error);
    return error;
  });
};

export {retrieveAllEvents, retrieveEventByName, createEvent, updateEvent,deleteEventByName};

// 