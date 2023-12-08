import React, {useState, forwardRef, useImperativeHandle} from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import dayjs from 'dayjs';
import {CalendarPicker} from "../general/DateTimeSelection";
import TextField from '@mui/material/TextField';
import {createSeason} from "../api/season/season";

const SeasonForm = forwardRef(( {season} ,ref ) => {

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
  const [buttonLabel, setButtonLabel] = useState("Update Season Details");

  const [seasonYear, setSeasonYear] = useState(season.season_year || dateToday.year);
  const [startDate, setStartDate] = useState(season.start_date || dateToday.date);
  
  // set form field init values needed?
  const formState = {
    id:season.id,
    season_year:seasonYear,
    start_date:startDate,
  };

  const getFormState = () => {
    return formState;
  }

  const [message, setMessage] = useState("");
  const [classname, setClassname] = useState("");

  // clear all form fields
  const clearFields = () =>{
    setSeasonYear(dateToday.year);
    setStartDate(dateToday.date);
  };

  const handleSeasonStartDateChange = (e) => {
    const value = dateToYYYYMMDD(e)
    setStartDate(value.date);
    setSeasonYear(value.year);
  };

  // Expose the formState via the ref
  useImperativeHandle(ref, () => ({
    getFormState
  }));

return (
  <div >
{/* <div id="message" className={classname} >{message && <p>{message}</p>}</div>*/}
    <form id="create_season_form" className='form'>

      <div className="input_fields">
        <TextField id={"season_year"} label={"Season Year"} variant={"outlined"} inputProps={{ readOnly: true }} value={seasonYear} />
        <CalendarPicker id={"start_date"} name={"start_date"} label={"Season Start Date"} variant={"outlined"} onChange={handleSeasonStartDateChange} value={dayjs(startDate)}/>
      </div>
      
    </form>
  </div>
  )
}); 

export default SeasonForm;
