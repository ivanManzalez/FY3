import React, {useState} from "react";
import CreateEventForm from "./CreateEventForm";
import {retrieveAllEvents} from '../../components/api/event/event';


const Schedule = (props) => {
  const [events, setEvents] = useState([]);
  const [buttonLabel, setButtonLabel] = useState("Display all Events");


  const handleDisplayEventsButton = async () => {
    const allEvents = await getAllEvents();
    setEvents(allEvents);
    setButtonLabel("Refresh");
  };
  
  const handleClearButton = () => {
    setEvents([]);
    setButtonLabel("Display all Events")
  };

  return(
    <div id='schedule'>
    <h1> this is the Schedule page</h1> 
    <CreateEventForm />
    <button id='get_all_events' onClick={handleDisplayEventsButton}> {buttonLabel} </button>
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

export default Schedule;