import React from "react";

// URL endpoints
const TESTBASE = 'http://127.0.0.1:8000/';
const API = 'events/';
const RETRIEVE_EVENT = 'event-profile/';
const CREATE_EVENT = 'create-event/';

// GET all existing Events
const retrieveAllEvents = () => {
  return fetch(TESTBASE+API)
  .then((response)=>{
    return response.json();
  })
  .catch((error) => {
    return error;
  })
};


// GET existing Event by Name
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

// POST new Event w/ all Event details
const createEvent = async (requestOptions) => { 
  console.log("createEvent");
  return fetch(TESTBASE + API + CREATE_EVENT, requestOptions )
  .then((response)=>{
    if(!response.ok){
      throw new Error()
    }
    console.log("createEvent-then");
    return response.json();
    })
  .catch((error) => {
    console.error('An error occurred:', error);
    return error; 
  });
};


// PUT Event w/ new Event details
const updateEvent = (name, requestOptions) => {   
  const fullname = name.first + "+" + name.last; 
  return fetch(TESTBASE + API + RETRIEVE_EVENT + fullname, requestOptions )
  .then((response)=>{
    return response.json();
    })
    .catch((error) => {
      return error;
  });
};

// DELETE Event by name
const deleteEventByName = (name, requestOptions) => {  
  const fullname = name.first + "+" + name.last; 
  return fetch(TESTBASE + API + RETRIEVE_EVENT + fullname, requestOptions )
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