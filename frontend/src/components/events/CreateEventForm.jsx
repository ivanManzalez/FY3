import React, {useState, forwardRef, useImperativeHandle } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {createEvent} from '../../components/api/event/event';
// 
import dayjs from 'dayjs';
import {CalendarPicker, ClockPicker} from "../general/DateTimeSelection";
import TextField from '@mui/material/TextField';

// 
const CreateEventForm = forwardRef(({submitState, clearFormFields}, ref) => {
  const defaultTime = dayjs().hour(0).minute(0); // YYYY-MM-DD
  const today = dayjs();
  

  const transformDate = (date) => {
    const year = date.$y;
    const month = date.$M+1;
    const day = date.$D;
    
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  const transformTime = (time) => {
    const hour = time.$H;
    const minute = time.$m;
    const second = time.$s;
    
   return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
    
  }
  // set form field init values
  const initialFormState = {
    name: '',
    date: today,
    start_time:defaultTime,
    end_time: '20:00:00',
    street_number:'',
    street_name:'',
    city:'',
  };
  const [formState, setFormState] = useState(initialFormState);
  // clear all form fields
  const clearFields = () =>{
    console.log("clearFields-Event");
    setFormState(initialFormState);
  };
  // Expose the clearFields function via the ref
  useImperativeHandle(ref, () => {
    console.log('Assigning ref to clearFields function');
    return {
      clearFields,
    };
  });

  // Function to handle input changes
  const handleInputChange = (e) => {
    console.log(formState)
    console.log("On change called... ");
    console.log(e.target);

    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    submitState({
      ...formState,
      [name]: value,
    });
  };

  const handleDateChange = (e) => {
    const value = transformDate(e);

    const name = 'date';
    const obj = {target:{name, value}}
    console.log(obj)
    handleInputChange(obj);
  };

  const handleTimeChange = (e) => {
    const value = transformTime(e);
    const name = 'start_time';
    const obj = {target:{name, value}}
    handleInputChange(obj);
  };

console.log(formState)
return (
  <form id="create-event-form" className='form' onSubmit={clearFields}>
    <TextField id={"event_name"} name={"name"} label={"Event Name"} variant={"outlined"} onChange={handleInputChange} value={formState.name} />
    <div id="event_datetime">
      <CalendarPicker id={"date"} name={"date"} label={"Event Date"} variant={"outlined"} onChange={handleDateChange} value={dayjs(formState.date)}/>
      <ClockPicker id={"start_time"} name = {"start_time"}  label={"Event Start Time"} variant={"outlined"} onChange={handleTimeChange} value={dayjs(formState.start_time)} />
    </div>
    <div id="event_location">
      <TextField type= {"number"} id={"street_number"} name = {"street_number"} label={"Street #"} variant={"outlined"}  onChange={handleInputChange} value={formState.street_number} />
      <TextField id={"street_name"} name = {"street_name"} label={"Street"} variant={"outlined"} onChange={handleInputChange} value={formState.street_name} />
      <TextField id={"city"} name = {"city"} label={"City"} variant={"outlined"} onChange={handleInputChange} value={formState.city} />
    </div>
  </form>
  )
}); 

export default CreateEventForm;
