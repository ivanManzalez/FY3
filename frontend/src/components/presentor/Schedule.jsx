import React from "react";

const Schedule = (props) => {
  const [events, setEvents] = useState({});

  const handleDisplayEventsButton = () => {

  };
  const handleClearButton = () => {
    setEvents({});
  };

  return(
    <div id='schedule'>
    <h1> this is the Schedule page</h1> 
    <button id='get_all_events' onClick={handleDisplayEventsButton}> Display all Events </button>
    <button id='clear_events' onClick={handleClearButton}> Clear </button>

    </div>
    );
};

const getAllEvents = (props) => {
  TESTBASE = 'http://127.0.0.1:8000/';
  API = 'events/';
  return fetch(TESTBASE+API);
};


export default Schedule;