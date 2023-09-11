import React, {useState} from "react";


const Schedule = (props) => {
  const [events, setEvents] = useState([]);
  const [buttonLabel, setButtonLabel] = useState("Display all Events");


  const handleDisplayEventsButton = async () => {
    const allEvents = await getAllEvents();
    setEvents(allEvents)
    console.log("allEvents: ");
    console.log(events);
    setButtonLabel("Refresh")

  };
  const handleClearButton = () => {
    setEvents([]);
    setButtonLabel("Display all Events")
  };

  return(
    <div id='schedule'>
    <h1> this is the Schedule page</h1> 
    <button id='get_all_events' onClick={handleDisplayEventsButton}> {buttonLabel} </button>
    <button id='clear_events' onClick={handleClearButton}> Clear </button>
    <p className="good">{eventsComponent(events)}</p>
    </div>
    );
};

const getAllEvents = () => {
  const TESTBASE = 'http://127.0.0.1:8000/';
  const API = 'events/';
  return fetch(TESTBASE+API)
  .then((response) => {
    return response.json();
  })
  .catch((error) => console.error(error));
};

const eventsComponent = (events) => {
  const eventsArr = convertToArray(events);
  return(
    eventsArr.map((event) => 
      (
      <div key={event.id}>
        <h4>{event.name}</h4>
        <p>Start: {event.date} @ {event.start_time} EST</p>
        <p>Ends: {event.end_time}</p>
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

export default Schedule;