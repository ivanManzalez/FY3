import React, {useState, useEffect} from "react";
import CreatePlayerForm from "../presentor/CreatePlayerForm";
import {retrieveAllPlayers} from "../api/player/player";

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import FilterSearch from "../general/FilterSearch";


const Players = () => {
  const [allPlayers, setAllPlayers] = useState("");
  const [classname, setClassname] = useState("");
  const [message, setMessage] = useState("");
  const [editPlayer, setEditPlayer] = useState(false)

  const getPlayers = async () => {
    const playerResp = await retrieveAllPlayers();
    handleMessage(playerResp);
    setAllPlayers(Object.values(playerResp.data));
  };
  
  useEffect(() => {
    getPlayers();
  }, []);
  
  // Factor out as utility
  const handleMessage = (response) => {
    if(response.status == 200){
      setClassname('good');
    }else{
      setClassname('bad');
    }
    setMessage(response.message);
  };

  const handlePlayerSelection = () => {
    if(editPlayer){
      setEditPlayer(false);
    }else{
      setEditPlayer(true);
    }
    
  };

  return(
    <>
    <h1>Players</h1>
    <div id="message" className={classname} >{message && <p>{message}</p>}</div>
      <FilterSearch handleSelection={handlePlayerSelection} initialItems={allPlayers} /> 
      {/*<FormControlLabel id="edit_player" control={<Switch defaultChecked={editPlayer} onChange={handleEditPlayerButton} />} label="Edit" />
      */}
      {
      editPlayer && 
      <div>
        <h4>Edit Player</h4>
        <CreatePlayerForm />
      </div>
      }
    </>
    )
};

export default Players;
