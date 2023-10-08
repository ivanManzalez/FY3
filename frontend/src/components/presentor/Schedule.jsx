import React, {useState, useEffect, useRef} from "react";
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
// 

const Schedule = (props) => {
  
  // DISPLAY
  const [message, setMessage] = useState("");
  const [classname, setClassname] = useState("");
  const [allEventsLabel, setAllEventsLabel] = useState("Display all Events");
  const [isGame, setIsGame] = useState(true);
  const [submitButtonName, setSubmitButtonName] = useState("Submit")
  const csrftoken = window.csrfToken;

  // API Data
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState();
  
  // API Forms
  const [eventFormState, setEventFormState] = useState("");
  const [gameFormState, setGameFormState] = useState("");
  const createEventFormRef = useRef(null);
  const createGameFormRef = useRef(null);

  const updateGameForm = (data) =>{
    setGameFormState(data)
  };
  const updateEventForm = (data) =>{
    setEventFormState(data)
  };

  // EVENTS
  const handleDisplayEventsButton = async () => {
    const allEvents = await getAllEvents();
    setEvents(allEvents);
    setButtonLabel("Refresh");
  };
  const handleClearButton = () => {
    setEvents([]);
    setButtonLabel("Display all Events")
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
    console.log("createEventFormRef:",createEventFormRef)
    if (isGame){
      console.log(gameFormState);
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
      console.log("handleSubmitGame")
      handleSubmitGame(eventId);
    }
    else{
      handleSubmitEvent();
    }  
  };

  const handleSubmitEvent = async () =>{
    
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      'X-CSRFToken': csrftoken,
      body: JSON.stringify(eventFormState),
    };
    // const createEventResponse = await createEvent(requestOptions)
    // handleMessage(createEventResponse); 

    clearEventFormFields();
    // return createEventResponse.event.id;
  }
 
  const handleSubmitGame = async (eventId) =>{

    gameFormState['event']=eventId;
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      "X-CSRFToken": csrftoken,
      body: JSON.stringify(gameFormState),
    };
    // const createGameResponse = await createGame(requestOptions)
    // handleMessage(createGameResponse); 
    clearGameFormFields();
  }
  // Function to clear event form fields
  const clearEventFormFields = () => {
    if (createEventFormRef.current) {
      createEventFormRef.current.clearFields();
    }
  };

  // Function to clear game form fields
  const clearGameFormFields = () => {
    if (createGameFormRef.current) {
      createGameFormRef.current.clearFields();
    }
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

  return(
    <div id='schedule'>
      <h1> Schedule page</h1>
      <h3> Event/Game Form </h3>

      {/* Message */}
      <div id="message" className={classname}>{message && <p>{message}</p>}</div>
      
      {/* From: Event / Game  */}
      <FormGroup component="fieldset">
        <FormLabel component="legend"> Event Details</FormLabel>
        <CreateEventForm submitState={updateEventForm} ref={createEventFormRef} clearFormFields={clearEventFormFields}/>
        <FormControlLabel control={<Switch defaultChecked={isGame} onChange={handleGameSwitchChange} />} label="Game?" />
        {isGame && 
          <div>
            <FormLabel component="legend"> Game Details</FormLabel>
            <CreateGameForm submitState={updateGameForm} ref={createGameFormRef} clearFormFields={clearGameFormFields}/>
          </div>
        }
        <button id='submit_event' onClick={handleSubmit}> Submit </button><br></br>
      </FormGroup>

      {/*TODO: Refactor for pagination of upcoming events */}
      <button id='get_all_events' onClick={handleDisplayEventsButton}> {allEventsLabel} </button>
      <button id='clear_events' onClick={handleClearButton}> Clear </button>
      <p>{eventsComponent(events)}</p>
      
    </div>
    );
  };

const getAllEvents = () => {
  return retrieveAllEvents();
};

const eventsComponent = (events) => {
  const eventsArr = convertToArray(events);
  return(
    eventsArr.map((event) => 
      (
      <div key={event.id}>
        <h4 className="good">{event.name}</h4>
        <p>Start time: {event.date} @ {event.start_time} EST</p>
        <p>End time: {event.date} @ {event.end_time} EST</p>
        <p>{event.street_number} {event.street_name}, {event.city}</p>
        <br />
      </div>
      )
    )
  ) 
};

const convertToArray = (nonArray) => {
  const newArr = nonArray;
  if (!Array.isArray(nonArray)) {
    newArr = Object.entries(nonArray);
  };
  return newArr;

};

function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
};

export default Schedule;