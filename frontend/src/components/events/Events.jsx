import React, { useState, useRef } from "react";

import CreateEventForm from "./CreateEventForm";
import CreateGameForm from "./CreateGameForm";
import {createGame} from '../../components/api/game/game';
import {createEvent} from '../../components/api/event/event';
import {retrieveAllEvents} from '../../components/api/event/event';
// refactor
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Switch from '@mui/material/Switch';
import { Button } from '@mui/base/Button';

const Events = () => {

   // Ref
  const gameFormRef = useRef();
  const eventFormRef = useRef();

  // DISPLAY
  const [message, setMessage] = useState("");
  const [classname, setClassname] = useState("");
  const [isGame, setIsGame] = useState(true);
  const csrftoken = window.csrfToken;

  // API Data
  const [eventId, setEventId] = useState();
  
  // API Forms
  const [eventFormState, setEventFormState] = useState("");
  const [gameFormState, setGameFormState] = useState("");

  const updateGameForm = (data) =>{
    setGameFormState(data)
  };
  const updateEventForm = (data) =>{
    setEventFormState(data);
  };

  // GAMES
  const handleGameSwitchChange = (event) => {
    if(event.target.checked){
      setIsGame(true);
    }else{
      setIsGame(false);
    }
  };
  // SUBMIT 
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("eventFormState:",eventFormState)

    if (isGame){
      console.log("gameFormState:",gameFormState)
      if(gameFormState.home_team === gameFormState.away_team){
        const response = {
        status: 406,
        message: "Home team cannot also be Away team",
        }
        handleMessage(response)
        return 0
      }
      const eventId = await handleSubmitEvent();
      setEventId(eventId);
      handleSubmitGame(eventId);
    }
    else{
      handleSubmitEvent();
    }  
  };

  const handleSubmitEvent = async () =>{
    
    eventFormRef.current.clearFields();
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      'X-CSRFToken': csrftoken,
      body: JSON.stringify(eventFormState),
    };
    const createEventResponse = await createEvent(requestOptions)
    handleMessage(createEventResponse); 

    return createEventResponse.event.id;
  }
 
  const handleSubmitGame = async (eventId) =>{
    gameFormRef.current.clearFields();
    gameFormState['event']=eventId;
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      "X-CSRFToken": csrftoken,
      body: JSON.stringify(gameFormState),
    };
    const createGameResponse = await createGame(requestOptions)
    handleMessage(createGameResponse); 
  }

  // CLEAR FORMS
  const clearEventFormFields = () => {
    console.log("Clear events form")
    // updateEventsForm(initialFormState);
    };
  // CLEAR FORMS
  const clearGameFormFields = () => {
    console.log("Clear games form")
      // updateGameForm(initialFormState);
    };
  
  // Handle feedback message
  const handleMessage = (response) => {
    if(response.status >= 200 && response.status < 300){
      setEventFormState("");
      setGameFormState("");
      setClassname('good');
    }else{
      setClassname('bad');
    }
    setMessage(response.message);
  }



  return (
    <>
      <div className="h_container">
        <h3> Event Form </h3>
        <FormControlLabel id="game_switch" control={<Switch defaultChecked={isGame} onChange={handleGameSwitchChange} />} label="Game" />
      </div>
      {/* Message */}
      <div id="message" className={classname}>{message && <p>{message}</p>}</div>
      {/* From: Event / Game  */}
      <FormGroup id ="schedule_form" component="fieldset">
        <div>
          <FormLabel  component="legend"> Event Details </FormLabel>
          < CreateEventForm ref={eventFormRef} submitState={updateEventForm} clearFormFields={clearEventFormFields} /> 
        </div> 
        <br></br>
        {isGame && 
        <div>
          <FormLabel component="legend"> Game Details</FormLabel>
          {<CreateGameForm id="game_form" ref={gameFormRef} submitState={updateGameForm}  clearFormFields={clearGameFormFields}/>}
        </div>
        }
        <Button id="submit_event" className="submit centre" onClick={handleSubmit}> Submit </Button><br></br>
        {/*<button id='submit' onClick={handleSubmit}> Submit </button>*/}
      </FormGroup>
      {/*TODO: Refactor for pagination of upcoming events */}
      
    </>
    )
}

export default Events;
