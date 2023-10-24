import React, {useState, useRef, forwardRef, useEffect, useImperativeHandle} from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {updateTeamByID} from '../../components/api/team/team';
import TextField from '@mui/material/TextField';

// 
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//
import DragAndDrop from '../dragAndDrop/DragAndDrop';

const TeamForm = forwardRef( ({team, deleteImg, handleFileUpload, formType}, ref) => {
  
  const teamImageRef = useRef();
  // set form field init values
  const initialFormState = {
    id:team.id,
    team_name: team.team_name,
    abbr_name: team.abbr_name,
    division_ind: team.division_ind,
  };

  const [formState, setFormState] = useState(initialFormState);
  const [message, setMessage] = useState("");
  const [classname, setClassname] = useState("");

  const getFormState = () => {
    return formState;
  }
  const getFile = () => {
    return teamImageRef.current.uploadedFile;
  }
  const deleteImage = () => {
    teamImageRef.current.handleDelete();
  }

  useEffect(()=>{
    setFormState(initialFormState);
  },[team]);

  // Expose the formState via the ref
  useImperativeHandle(ref, () => ({
    getFormState,
    getFile,
    deleteImage,
  }));

  // clear all form fields
  const clearFields = () =>{
    setMessage("");
    setClassname("");
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
    </Box>
  )};

return (
  <div >
    
    <div id="message" className={classname}>{ message && <p>{message}</p> }</div>
    <form id="create_team_form" className="grid_col_65_35" >
      
      <div className='input_fields'>
      <TextField id={"team_name"} label={"Team Name"} variant={"outlined"} onChange={handleInputChange} value={formState.team_name} name={"team_name"} />
      <TextField id={"abbr_name"} label={"Team Short Name"} variant={"outlined"} onChange={handleInputChange} value={formState.abbr_name} name={"abbr_name"} />
      <DivisionIndicator  label={"Team Division"} variant={"outlined"} handler={handleInputChange}  value={formState.division_ind} />
      </div>
      
      <div>
      <DragAndDrop url={team.url} ref={teamImageRef} handleImgDelete={deleteImg} />
      </div>
    </form>
  </div>
  )}); 



export default TeamForm;
