import React, {useState, useRef} from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {createEvent} from '../../components/api/event/event';

const CreateEventForm = ({submitState, clearFormFields}) => {

  // set form field init values
  const initialFormState = {
    name: '',
    date: '',
    start_time: '',
    end_time: '',
    street_number:'',
    street_name:'',
    city:'',
  };

  const [formState, setFormState] = useState(initialFormState);

  // clear all form fields
  const clearFields = () =>{
    setFormState(initialFormState);
    clearFormFields();
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(name)
    console.log(value)
    submitState({
      ...formState,
      [name]: value,
  });
  };

  const handleMessage = (response) => {
    console.log(response);
    if(response.status == 200){
      clearFields();
      setClassname('good');
    }else{
      setClassname('bad');
    }
    setMessage(response.message);
  };

return (
  <form id="create-event-form" className='form centre' >
    <TextField name = {"name"} id={"name"} field={"Event Name"} handler={handleInputChange} value={formState.name} />
    <DateField name = {"date"} id={"date"} field={"Event Date"} handler={handleInputChange} value={formState.date} />
    <TimeField name = {"start_time"} id={"start_time"} field={"Event Start Time"} handler={handleInputChange} value={formState.start_time} />
    <TimeField name = {"end_time"} id={"end_time"} field={"Event End Time"} handler={handleInputChange} value={formState.end_time} />
    <NumberField name = {"street_number"} id={"street_number"} field={"Street Number"} handler={handleInputChange} value={formState.street_number} />
    <TextField name = {"street_name"} id={"street_name"} field={"Street Name"} handler={handleInputChange} value={formState.street_name} /> 
    <TextField name = {"city"} id={"city"} field={"City"} handler={handleInputChange} value={formState.city} />
    {/*<button type='submit' placeholder="Create Event" onClick={handleCreateEventButton}> Create Event </button>*/}
  </form>
  )
}; 

////////////////////////
const TextField = (props) => {
  return(
    <div className = "entryarea">
      {/*<label>{props.field}</label>*/}
      <input className = "inputter" type="text" name = {props.name} id={props.id} value={props.value} onChange={props.handler} required/>
      <div className="labelline">{"Enter " + props.field}</div>
    </div>
    )
}

////////////////////////
const NumberField = (props) => {
  return(
    <div className = "entryarea">
      {/*<label>{props.field}</label>*/}
      <input className = "inputter" type="number" name = {props.name} id={props.id} value={props.value} onChange={props.handler} required/>
      <div className="labelline">{"Enter " + props.field}</div>
    </div>
    )
}

////////////////////////
const DateField = (props) => {
  return(
    <div className = "entryarea">
    <input className = "inputter" type="date" name = {props.name} id={props.id} value={props.value} onChange={props.handler} required />
    <div className="labelline">{"Enter " + props.field}</div>
    </div>
    )
}

////////////////////////
const TimeField = (props) => {
  return(
    <div className = "entryarea">
    <input className = "inputter" type="time" name = {props.name} id={props.id} value={props.value} onChange={props.handler} required />
    <div className="labelline">{"Enter " + props.field}</div>
    </div>
    )
}

export default CreateEventForm;
