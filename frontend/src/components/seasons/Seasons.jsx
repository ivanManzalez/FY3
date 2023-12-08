import React, { useState, useRef, useEffect } from "react";
import CreateSeasonForm from "./CreateSeasonForm";
import SeasonForm from "./SeasonForm";
import DisplaySeasons from "./DisplaySeasons";
import {createSeason, retrieveAllSeasons, updateSeason, deleteSeasonByYear} from "../api/season/season"
////////////////////////////////////////////////////////////////////////////////////////// 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notification, {errorNotification, warningNotification, successNotification, infoNotification} from "../notification/Notification"


const Seasons = () => {

  const seasonFormRef = useRef();
  const [season, setSeason] = useState("");
  const [submitButtonLabel, setSubmitButtonLabel] = useState("Update Season");
  const [seasonSelected, setSeasonSelected] = useState(false);
  const [createNewSeason, setCreateNewSeason] = useState(false);
  // ******************************************************************
  
  const [allSeasons, setAllSeasons] = useState("")
  // utilities
  const [classname, setClassname] = useState("");
  const [message, setMessage] = useState("");

  // ******************************************************************
  
  const getSeasons = async () => {
    const seasonsResp = await retrieveAllSeasons();
    handleMessage(seasonsResp);
    setAllSeasons(Object.values(seasonsResp.data));
    
  };

  // ******************************************************************
  
  useEffect(()=>{
    getSeasons();
  },[])

  // ******************************************************************

  // Factor out as utility
  const handleMessage = (response) => {
    if(response.status == 200){
      setClassname('good');
    }else{
      setClassname('bad');
    }
    setMessage(response.message);
  };
  
  // ******************************************************************
  const handleUpdateSeason = async () =>{
    console.log("handleUpdateSeason")
    const formState = seasonFormRef.current.getFormState();
    const requestOptions = {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(formState)
      };

    const seasonResponse = await updateSeason(requestOptions);
    return seasonResponse;
  }


  // ******************************************************************
  const handleCreateSeason = async () =>{
    // define API request options
    console.log("handleCreateSeason")
    const formState = seasonFormRef.current.getFormState();
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(formState)
      };

    const seasonResponse = await createSeason(requestOptions);
    return seasonResponse;
  }


  // ******************************************************************
  // event handler
  const handleSubmitSeasonButton = async (event) => {
    event.preventDefault();
    let seasonResponse = "";
  
    
    if(createNewSeason){
      seasonResponse = await handleCreateSeason();
    }
    else{
      seasonResponse = await handleUpdateSeason();
    }
    // handleMessage(seasonResponse)

    };
  // ******************************************************************
  const handleDeleteSeasonButton = async (event) => {
    event.preventDefault();
    // define API request options
    
    const requestOptions = { 
    method: 'DELETE', 
    headers: { 
        'Content-type': 'application/json'
      }
    }

    const deleteSeasonResp = await deleteSeasonById(season.id,requestOptions); 
    handleMessage(deleteSeasonResp);  
    getSeasons();
  }



  // ******************************************************************

  const newSeasonButton = () => {
    setSeasonSelected(true)
    setCreateNewSeason(true);
    setSubmitButtonLabel("Create Season");
    errorNotification("Create New Season")
  }

  // ******************************************************************

  const backButton = () => {
    setCreateNewSeason(false);
    setSeasonSelected(false)
    setSubmitButtonLabel("Update Season")
    infoNotification("Back")
  }

  // ******************************************************************

  const handleSeasonSelection = (event, chosenSeason) => {
    if(!seasonSelected){
      setSeasonSelected(true);
    }
    setSeason(chosenSeason);
  };

  return (
    <>
      <h1> Seasons </h1>
      <Notification />
      {!seasonSelected && <button className="submit" type='submit' placeholder="Create New Season" onClick={newSeasonButton}> + New Season </button>}
      {seasonSelected && 
        <>
        <button className="submit" type='submit' placeholder="back" onClick={backButton}> Back </button>
        <SeasonForm season={season} ref={seasonFormRef} /> 
        <button className="submit" type='submit' placeholder="Submit Season" onClick={handleSubmitSeasonButton}> {submitButtonLabel} </button>
        <button className="delete" type='submit' placeholder="Delete Season" onClick={handleDeleteSeasonButton}> Delete Season </button>
        
        </>
      }
      < DisplaySeasons seasons={allSeasons} handleSelection={handleSeasonSelection}/>
      <p>test</p>
      
    </>
    )
}

export default Seasons;