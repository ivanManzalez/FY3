import React from "react";

import {deletePlayerByFullName, updatePlayer, createPlayer, retrieveAllPlayers, retrievePlayerByFullName} from '../../components/api/player/player';


const playerName = {
  'first':"test",
  'last':"tester010",
};

const requestOptionsPOST = {
  method: "POST",
  headers: {"Content-Type":"application/json"},
  body: JSON.stringify({
      first_name : playerName.first,
      last_name: playerName.last,
      height_ft: '5',
      height_in: '11',
      weight: '200',
      origin: 'Mountainview',
    })
  };
const requestOptionsPUT = {
  method: "PUT",
  headers: {"Content-Type":"application/json"},
  body: JSON.stringify({
      first_name : playerName.first,
      last_name: playerName.last,
      height_ft: '6',
      height_in: '5',
      weight: '888',
      origin: 'Mountainview',
    })
  };

const requestOptionsDELETE = {
  method: "DELETE",
  headers: {"Content-Type":"application/json"},
  };

const testAPI = () => {
  console.log('testAPI')

  // console.log('-- retrieveAllPlayers')
  // retrieveAllPlayers();

  // console.log('-- createPlayer')
  // createPlayer(requestOptionsPOST);

  // console.log('-- retrievePlayerByFullName')
  // retrievePlayerByFullName(playerName);

  // console.log('-- updatePlayer')
  // updatePlayer(playerName, requestOptionsPUT);
  
  // console.log('-- deletePlayer')
  // deletePlayerByFullName(playerName, requestOptionsDELETE);

};

export default testAPI;
