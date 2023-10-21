import React, {useState, useEffect, useRef} from "react";
import {retrieveAllEvents} from '../../components/api/event/event';

const Schedule = (props) => {
  const [allEventsLabel, setAllEventsLabel] = useState("Display all Events");
  const [submitButtonName, setSubmitButtonName] = useState("Submit")
  const [events, setEvents] = useState([]);
  
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
  
  // EVENTS
  const handleDisplayEventsButton = async () => {
    const allEvents = await getAllEvents();
    setEvents(allEvents);
    setAllEventsLabel("Refresh");
  };
  const handleClearButton = () => {
    setEvents([]);
    setAllEventsLabel("Display all Events")
  };

  // const getCookie = (name) => {
  //   const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  // return cookieValue ? cookieValue.pop() : '';
  // };
  
  return(
    <div id='schedule'>
      <h1> Schedule </h1>
      <button id='clear_events' onClick={handleClearButton}> Clear </button>
      <div className="events">{eventsComponent(events)}</div>
      <button id='get_all_events' onClick={handleDisplayEventsButton}> {allEventsLabel} </button>
    </div>  
    );
  };

export default Schedule;