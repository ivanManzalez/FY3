import React, {useState, useRef} from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {createTeam} from '../../components/api/team/team';
import TextField from '@mui/material/TextField';

// 
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//
import DragAndDrop from '../dragAndDrop/DragAndDrop';

const CreateTeamForm = () => {
  const teamImageRef = useRef();
  // set form field init values
  const initialFormState = {
    team_name: '',
    abbr_name: '',
    division_ind: '',
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
    console.log(response.status)
    console.log(classname)
    if(response.status == 200){
      clearFields();
      setClassname('good');
    }else{
      setClassname('bad');
    }
    setMessage(response.message);
  };

  

  const DivisionIndicator = ({value, handler}) => {
  return(
  <Box sx={{ minWidth: 50 }}>
    <FormControl fullWidth>
      <InputLabel id="div_ind">Division</InputLabel>
      <Select
        labelId="div_ind"
        value={value}
        label="Division"
        onChange={handler}
        name={"division_ind"}
      >
        <MenuItem value={"W"}>West</MenuItem>
        <MenuItem value={"E"}>East</MenuItem>
      </Select>
    </FormControl>
  </Box>)
}

return (
  <div >
    <h3> Create Team </h3>
    
    <div id="message" className={classname}>{ message && <p>{message}</p> }</div>
    <form id="create_team_form" className='input_fields'>

      <TextField id={"team_name"} label={"Team Name"} variant={"outlined"} onChange={handleInputChange} value={formState.team_name} name={"team_name"} />
      <TextField id={"abbr_name"} label={"Team Short Name"} variant={"outlined"} onChange={handleInputChange} value={formState.abbr_name} name={"abbr_name"} />
      <DivisionIndicator  label={"Team Division"} variant={"outlined"} handler={handleInputChange}  value={formState.division_ind} />
      {/*<DragAndDrop url={team.url} ref={teamImageRef} handleImgDelete={deleteImg} />*/}
      <button className="submit" type='submit' placeholder="Create Team" onClick={handleCreateTeamButton}> Create Team </button>
    
    </form>
  </div>
  )}; 



export default CreateTeamForm;
