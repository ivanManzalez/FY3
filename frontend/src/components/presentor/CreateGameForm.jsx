import React, {useState} from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {createEvent} from '../../components/api/event/event';

const CreateGameForm = () => {

  // set form field init values
  const initialFormState = {
    season:'',
    // event:'',
    home_team:'',
    away_team:'',
    home_player_01:'',
    home_player_02:'',
    home_player_03:'',
    home_player_04:'',
    home_player_05:'',
    away_player_01:'',
    away_player_02:'',
    away_player_03:'',
    away_player_04:'',
    away_player_05;'',
  };
  const [message, setMessage] = useState("");
  const [classname, setClassname] = useState("");
  const [event, setEvent] = useState("");
  const [isGame, setIsGame] = useState(false);
  const [formState, setFormState] = useState(initialFormState);

  // clear all form fields
  const clearFields = () =>{
    setFormState(initialFormState);
    setMessage("");
    setClassname("");
  };
  
  // event handler
  const handleCreateGameButton = async (event) => {
    event.preventDefault();
    
    // define API request options
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(formState),
      };
    // console.log("handleCreateEventButton");

    const createEventResponse = await createEvent(requestOptions);
    handleMessage(createEventResponse); 
};

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleMessage = (response) => {
    console.log(response);
    if(response.status == 200){
      console.log('good and clear fields')
      clearFields();
      setClassname('good');
    }else{
      console.log('bad and NOT clear fields')
      setClassname('bad');
    }
    setMessage(response.message);
  };
// console.log('formState');
// console.log(formState);
return (
  <div >
    <h3> Create Game </h3>
    <h5> Add game details then click submit </h5>
    <div id="message" className={classname}>{message && <p>{message}</p>}</div>
    <form id="create-event-form" className='form centre'>
    
    <TextField name = {"name"} id={"name"} field={"Event Name"} handler={handleInputChange} value={formState.name} />
    
    <button type='submit' placeholder="Create Event" onClick={handleCreateEventButton}> Create Event </button>
    </form>
  </div>
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

export default CreateGameForm;
