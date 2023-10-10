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
  const defaultTime = dayjs().hour(0).minute(0); 
  const today = dayjs();
  console.log("ref: " + ref);

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
    // event.preventDefault();
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
    // console.log(e);

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
    const year = e.$y;
    const month = e.$M+1;
    const day = e.$D;
    
    // const value = year+"-"+month+"-"+day;
    const value = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const name = 'date';
    const obj = {target:{name, value}}
    handleInputChange(obj);
  };

  const handleTimeChange = (e) => {
    const hour = e.$H;
    const minute = e.$m;
    const second = e.$s;
    
    const value = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
    const name = 'start_time';
    const obj = {target:{name, value}}
    handleInputChange(obj);
  };

  

return (
  <form id="create-event-form" className='form centre' onSubmit={clearFields}>
    <TextField id={"name"} name={"name"} label={"Event Name"} variant={"outlined"} onChange={handleInputChange} value={formState.name} />
    <CalendarPicker id={"date"} name={"date"} label={"Event Date"} variant={"outlined"} onChange={handleDateChange} value={dayjs(formState.date)}/>
    <ClockPicker id={"start_time"} name = {"start_time"}  label={"Event Start Time"} variant={"outlined"} onChange={handleTimeChange} value={dayjs(formState.start_time)} />
    <TextField type= {"number"} id={"street_number"} name = {"street_number"} label={"Street #"} variant={"outlined"}  onChange={handleInputChange} value={formState.street_number} />
    <TextField id={"street_name"} name = {"street_name"} label={"Street"} variant={"outlined"} onChange={handleInputChange} value={formState.street_name} />
    <TextField id={"city"} name = {"city"} label={"City"} variant={"outlined"} onChange={handleInputChange} value={formState.city} />
  </form>
  )
}); 

export default CreateEventForm;
