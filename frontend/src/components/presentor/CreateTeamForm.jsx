import React, {useState} from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {createTeam} from '../../components/api/team/team';

const CreateTeamForm = () => {

  // set form field init values
  const initialFormState = {
    team_name: '',
    abbr_name: '',
    division_ind: 'E',
  };
  const [message, setMessage] = useState("");
  const [classname, setClassname] = useState("");
  const [formState, setFormState] = useState(initialFormState);

  // clear all form fields
  const clearFields = () =>{
    setFormState(initialFormState);
    setMessage("");
    setClassname("");
  };
  
  // event handler
  const handleCreateTeamButton = async (event) => {
    event.preventDefault();
    
    // define API request options
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(formState),
      };

    const createTeamResponse = await createTeam(requestOptions);
    handleMessage(createTeamResponse); 
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
console.log('formState');
console.log(formState);
return (
  <div >
    <h3> Create Team </h3>
    <h5> Add team details then click submit </h5>
    <div id="message" className={classname}>{message && <p>{message}</p>}</div>
    <form id="create-team-form" className='form centre'>
    
    <TextField name = {"team_name"} id={"team_name"} field={"Team Name"} handler={handleInputChange} value={formState.team_name} />
    <TextField name = {"abbr_name"} id={"abbr_name"} field={"Team Short Name"} handler={handleInputChange} value={formState.abbr_name} /> 
    <TextField name = {"division_ind"} id={"division_ind"} field={"Team Division"} handler={handleInputChange} value={formState.division_ind} />
    
    <button type='submit' placeholder="Create Team" onClick={handleCreateTeamButton}> Create Team </button>
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

export default CreateTeamForm;
