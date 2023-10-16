import React, {useState, useEffect, useRef} from "react";
import PlayerForm from "./PlayerForm";
import DisplayPlayers from "./DisplayPlayers";
import {retrieveAllPlayers, updatePlayerById,deletePlayerById } from "../api/player/player";

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

// import FilterSearch from "../general/FilterSearch";
import AutoCompleteDropdown from "../general/AutoCompleteDropdown";

const Players = () => {
  // Ref to getPlayerForm
  const playerFormRef = useRef();
  // Players to select from
  const [allPlayers, setAllPlayers] = useState("");

  // utilities
  const [classname, setClassname] = useState("");
  const [message, setMessage] = useState("");

  // player button
  const [editPlayer, setEditPlayer] = useState(false)

  // player selected
  const [player, setPlayer] = useState("");

  const getPlayers = async () => {
    const playerResp = await retrieveAllPlayers();
    handleMessage(playerResp);
    setAllPlayers(Object.values(playerResp.data));
  };
  
  // GET players on render
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

  const toggleEditPlayer = () => {
    if(!editPlayer){
      setEditPlayer(true);
    }else{
      setEditPlayer(false);
    }
  }

  // GET selected player from Search
  const handlePlayerSelection = (event, playerSelected) => {
    if(!editPlayer){
      setEditPlayer(true);
    }
    setPlayer(playerSelected) 
  };

  const getFormState = (data) => {
    return data;
  }

  // UPDATE form before submission to API
  // Event handler - Factor to Parent
  const handleUpdatePlayerButton = async (event) => {
    event.preventDefault();

    const formState = playerFormRef.current.getFormState()
    // define API request options
    const requestOptions = {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(formState),
    }; 
    
    const updatePlayerResponse = await updatePlayerById(player.id, requestOptions);
    handleMessage(updatePlayerResponse);  
    getPlayers();
    toggleEditPlayer();
  };

  const handleDeletePlayerButton = async () => {
    event.preventDefault();

    const requestOptions = { 
      method: 'DELETE', 
      headers: { 
          'Content-type': 'application/json'
        }
      } 
    const deletePlayerResp = await deletePlayerById(player.id,requestOptions); 
    handleMessage(deletePlayerResp);  
    getPlayers();
    toggleEditPlayer();
  };

  return(
    <>
    <h1>Players</h1>
    <div id="message" className={classname} >{message && <p>{message}</p>}</div>

      {/*<FilterSearch handleSelection={handlePlayerSelection} initialItems={allPlayers} /> */}
      
      {allPlayers &&
      <AutoCompleteDropdown handleSelection={handlePlayerSelection} options={allPlayers}/>}
      
      {/* Player is Selected*/}
      {
      editPlayer && 
      <div>
        <div className={"v_container space_between"}>
          <h4>Edit Player</h4>
          <button className="small submit" type='submit' placeholder="Display Player Gallery" onClick={toggleEditPlayer}> Back </button>
        </div>
        <PlayerForm player={player} ref={playerFormRef} />
        <button className="submit" type='submit' placeholder="Update Player" onClick={handleUpdatePlayerButton}> Update Player</button>
        <button className="delete" type='submit' placeholder="Delete Player" onClick={handleDeletePlayerButton}> Delete Player</button>
      </div>
      }
      {/* Player is NOT Selected*/}
      { 
      !editPlayer && 
        < DisplayPlayers players={allPlayers} handleSelection={handlePlayerSelection} />
      }

    </>
  )
};

export default Players;
