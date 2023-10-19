import React, {useState, useEffect, useRef} from "react";
import PlayerForm from "./PlayerForm";
import DisplayPlayers from "./DisplayPlayers";
import {retrieveAllPlayers, updatePlayerById,deletePlayerById } from "../api/player/player";
import {createTestStorageRef, uploadFileResumable} from "../../fireBase/StorageReference";

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import dayjs from 'dayjs';
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

  const dateToYYYYMMDD = (dayjsObj) => {
    const year = dayjsObj.$y;
    const month = dayjsObj.$M+1;
    const day = dayjsObj.$D;
    const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const ret = {date, year};
    return ret;
  }
  
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

  // UPDATE form before submission to API
  // Event handler - Factor to Parent
  const handleUpdatePlayerButton = async (event) => {
    event.preventDefault();

    const formState = playerFormRef.current.getFormState()
    console.log("update button",formState.id);
    // define API request options
    const requestOptions = {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(formState),
    }; 
    
    const updatePlayerResponse = await updatePlayerById(formState.id, requestOptions);
    handleMessage(updatePlayerResponse);  
    console.log("handleUpdatePlayerButton:",updatePlayerResponse.id)
    if(updatePlayerResponse.id){
      const playerId = updatePlayerResponse.id;
      const fileuploadOutcome = handleFileUpload(playerFormRef.current.getFile(), playerId);
      if(fileuploadOutcome){
        playerFormRef.current.deleteImage();
      }
    }

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
  const getFilepath = (playerId) => {
    const today = dayjs();
    const filename = dateToYYYYMMDD(today).date
    return {playerId, filename};
  }
  const handleFileUpload = async (file,playerId) => {

    const fileType = file.type.slice(6);
    const {dir, filename} = getFilepath(playerId);
    const fileName = filename+"."+fileType;
    const storageRef = createTestStorageRef(playerId,fileName);
    const uploadStatus = await uploadFileResumable(storageRef, file)
      .catch((error)=>{
        console.error('Upload failed:', error);
      });
    return uploadStatus;
  }

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
