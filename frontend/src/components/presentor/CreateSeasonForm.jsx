import React, {useState} from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const CreateSeasonForm = () => {

  // set form field init values
  const [seasonYear, setSeasonYear] = useState("");
  const [startDate, setStartDate] = useState("");
  
  const [message, setMessage] = useState("");
  const [classname, setClassname] = useState("");

  // clear all form fields
  const clearFields = () =>{
    setSeasonYear("");
    setStartDate("");
    setMessage("");
    setClassname("");
  };

  // create player API
  const createSeasonAPI = (requestOptions) => {
    // POST request to /api/create-players/
    // IF a response is received 
    // THEN convert it to JSON
    // THEN print
    // fetch().then().then()
    fetch('/seasons/create-season/', requestOptions 
      ).then((response)=>{
      if(response.status === 200){
          clearFields();
          setClassname("good");
        }
      else{
          setClassname("bad");
        }
        return response.json();
      }).then((data) => {
        console.log('data')
      if (data.message) {
        // Display the message to the user
        setMessage(data.message);
        // Clear the form fields
        }
      })//.catch()
      // Handle other response data
      // data.data
    }
  // event handler
  const handleCreateSeasonButton = (event) => {
    event.preventDefault();
    
    // define API request options
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
          season_year : seasonYear,
          start_date: startDate,
        })
      };
    createSeasonAPI(requestOptions);
    };

  const handleSeasonYearChange = (e) => {
    setSeasonYear(e.target.value);
  };

  const handleSeasonStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

console.log('render season form');
return (
  <div >
    <h3> Create Season </h3>
    <h5> Add season details then click submit </h5>
    <div id="message" className={classname}>{message && <p>{message}</p>}</div>
    <form id="create-season-form" className='form centre'>
    
    <TextField id={"season_year"} field={"Season Year"} handler={handleSeasonYearChange} value={seasonYear} />
    <DateField id={"start_date"} field={"Season Start Date"} handler={handleSeasonStartDateChange} value={startDate} />
    
    <button type='submit' placeholder="Create Season" onClick={handleCreateSeasonButton}> Create Season </button>
    </form>
  </div>
  )
}; 

////////////////////////
const TextField = (props) => {
  return(
    <div className = "entryarea">
      {/*<label>{props.field}</label>*/}
      <input className = "inputter" type="text" id={props.id} value={props.value} onChange={props.handler} required/>
      <div className="labelline">{"Enter " + props.field}</div>
    </div>
    )
}

////////////////////////./
const NumberField = (props) => {
  return(
    <div className = "entryarea">
      {/*<label>{props.field}</label>*/}
      <input className = "inputter" type="number" id={props.id} value={props.value} onChange={props.handler} required/>
      <div className="labelline">{"Enter " + props.field}</div>
    </div>
    )
}
////////////////////////
// <input type="date" id="start_date" name="trip-start" value="2018-07-22" min="2018-01-01" max="2018-12-31" />

const DateField = (props) => {
  return(
    <div className = "entryarea">
    <input className = "inputter" type="date" id={props.id} value={props.value} onChange={props.handler} required />
    <div className="labelline">{"Enter " + props.field}</div>
    </div>
    )
}
export default CreateSeasonForm;
