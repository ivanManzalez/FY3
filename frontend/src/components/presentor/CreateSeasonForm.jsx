import React, {useState} from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import dayjs from 'dayjs';
import {CalendarPicker} from "../general/DateTimeSelection";
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';

const CreateSeasonForm = () => {
  

  const dateToYYYYMMDD = (dayjsObj) => {
    const year = dayjsObj.$y;
    const month = dayjsObj.$M+1;
    const day = dayjsObj.$D;
    const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const ret = {date, year};
    return ret;
  }
  const today = dayjs();
  const dateToday = dateToYYYYMMDD(dayjs(today))
  // set form field init values
  const [seasonYear, setSeasonYear] = useState(dateToday.year);
  const [startDate, setStartDate] = useState(dateToday.date);
  
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
        setMessage(data.message);
        // Clear the form fields
        }
      }).catch(
    )}
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

  const handleSeasonStartDateChange = (e) => {
    const value = dateToYYYYMMDD(e)
    setStartDate(value.date);
    setSeasonYear(value.year);
  };

console.log("Start Date:",startDate);
console.log("Year:",seasonYear);
return (
  <div >
    <h3> Create Season </h3>
    <div id="message" className={classname}>{message && <p>{message}</p>}</div>
    <form id="create_season_form" className='form'>
      {/*<FormControlLabel label="Select Start Date of new Season" /> */} {/*control= {<Switch defaultChecked={isGame} onChange={handleGameSwitchChange} />}*/}                            
      
      <div className="input_fields">
        <TextField id={"season_year"} label={"Season Year"} variant={"outlined"} inputProps={{ readOnly: true }} value={seasonYear} />
        <CalendarPicker id={"start_date"} name={"start_date"} label={"Season Start Date"} variant={"outlined"} onChange={handleSeasonStartDateChange} value={dayjs(startDate)}/>
      </div>
      <button className="submit" type='submit' placeholder="Create Season" onClick={handleCreateSeasonButton}> Create Season </button>
    
    </form>
  </div>
  )
}; 

export default CreateSeasonForm;
