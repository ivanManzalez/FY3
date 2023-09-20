import React, {useState} from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {createPlayer} from '../../components/api/player/player';

const CreatePlayerForm = () => {

  const initialFormState = {
    first_name: '',
    last_name: '',
    height_ft: '',
    height_in: '',
    weight: '',
    origin: '',
    age: '',
  };
  // all fields initially blank
  const [formState, setFormState] = useState(initialFormState);
  const [message, setMessage] = useState("");
  const [classname, setClassname] = useState("");

  // clear all fields on form
  const clearFields = () =>{
    setFormState(initialFormState);
    setMessage("");
    setClassname("");
  };
  
  // Event handler
  const handleCreatePlayerButton = async (event) => {
    event.preventDefault();
    
    // define API request options
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(formState),
    }; 

    const createPlayerResponse = await createPlayer(requestOptions);
    handleMessage(createPlayerResponse);  
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
    if(response.status == 200){
      clearFields();
      setClassname('good');
    }else{
      setClassname('bad');
    }
    setMessage(response.message);
  };


return (
  <div >
    <h3> Create Player </h3>
    <h5> Add player details then click submit </h5>
    <div id="message" className={classname}>{message && <p>{message}</p>}</div>
    <form id="create-player-form" className='form centre'>
    
    <TextField name = {"first_name"} id={"player_first"} field={"Player First Name"} handler={handleInputChange} value={formState.first_name} />
    <TextField name = {"last_name"} id={"player_last"} field={"Player Last Name"} handler={handleInputChange} value={formState.last_name} /> 
    <NumberField name = {"height_ft"} id={"player_height_ft"} field={"Player Height (Ft)"} handler={handleInputChange} value={formState.height_ft} placeholder={5}/>
    <NumberField name = {"height_in"} id={"player_height_in"} field={"Player Height (In)"} handler={handleInputChange} value={formState.height_in} placeholder={5}/>
    <NumberField name = {"weight"} id={"player_weight"} field={"Player Weight"} handler={handleInputChange} value={formState.weight} placeholder={150}/>
    <TextField name = {"origin"} id={"player_origin"} field={"Player Origin"} handler={handleInputChange} value={formState.origin} />
    <TextField name = {"age"} id={"player_age"} field={"Player Age"} handler={handleInputChange} value={formState.age} placeholder={25}/>
    
    <button type='submit' placeholder="Create Player" onClick={handleCreatePlayerButton}> Create Player</button>
    </form>
  </div>
  )
}; 

////////////////////////
const TextField = (props) => {
  return(
    <div className = "entryarea">
      <input className = "inputter" type="text" name = {props.name} id={props.id} value={props.value} onChange={props.handler} required/>
      <div className="labelline">{"Enter " + props.field}</div>
    </div>
    )
}

////////////////////////
const NumberField = (props) => {
  return(
    <div className = "entryarea">
      <input className = "inputter" type="number" name = {props.name} id={props.id} value={props.value} onChange={props.handler} required/>
      <div className="labelline">{"Enter " + props.field}</div>
    </div>
    )
}

export default CreatePlayerForm;