import React, {useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
// 
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import {CalendarPicker} from "../general/DateTimeSelection";
import DragAndDrop from '../dragAndDrop/DragAndDrop';

const PlayerForm = forwardRef( ( {player, handleFileUpload} ,ref ) => {
  const playerImgRef = useRef();
  // Refactor to Utilities components
  const dateToYYYYMMDD = (dayjsObj) => {
    const year = dayjsObj.$y;
    const month = dayjsObj.$M+1;
    const day = dayjsObj.$D;
    const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const ret = {date, year};
    return ret;
  }

  // 
  console.log("DOB:",player.date_of_birth);
  const defaultDOB = dayjs(player.date_of_birth,"YYYY-MM-DD");
  const dob = dateToYYYYMMDD(dayjs(defaultDOB)).date
  const [eligibility, setEligibility] = useState(player.is_registered);

  
  // Initial state of ingested player

  const initialFormState = {
    id:player.id,
    first_name: player.first_name,
    last_name: player.last_name,
    height_ft: player.height_ft,
    height_in: player.height_in,
    weight: player.weight,
    // origin: player.origin,
    date_of_birth: dob,
    is_registered:eligibility,
  };
  
  // Form State that will be passed to API 
  const [formState, setFormState] = useState(initialFormState);
  const [message, setMessage] = useState("");
  const [classname, setClassname] = useState("");

  const getFormState = () => {
    return formState;
  }
  const getFile = () => {
    console.log(playerImgRef.current.uploadedFile);
    return playerImgRef.current.uploadedFile;
  }
  const deleteImage = () => {
    playerImgRef.current.handleDelete();
  }

  // Expose the formState via the ref
  useImperativeHandle(ref, () => ({
    getFormState,
    getFile,
    deleteImage,
  }));

  // clear all fields on form -- Needed?
  const clearFields = () =>{
    setMessage("");
    setClassname("");
  };
  

  const handleDOBChange = (e) => {
    const birthDate = dateToYYYYMMDD(e);
    handleInputChange({
      target:{
        name:"date_of_birth",
        value:birthDate.date,
    }})
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  
  const handleHeightChange = (e) => {
    const { name, value } = e.target;

    if (name === "height_in") {
      // Ensure height_in is a number and not exceeding a certain limit
      let newHeightIn = parseInt(value, 10) || 0;
      newHeightIn = Math.min(Math.max(newHeightIn, 0), 12); // Restrict to 0-11

      // If height_in reaches 12, increment height_ft
      if (newHeightIn === 12) {
        const newHeightFt = parseInt(formState.height_ft, 10) + 1;
        setFormState({
          ...formState,
          height_ft: newHeightFt,
          height_in: 0, // Reset height_in to 0
        });
      } else if(newHeightIn === -1){
        const newHeightFt = parseInt(formState.height_ft, 10) - 1;
        setFormState({
          ...formState,
          height_ft: newHeightFt,
          height_in: 11, // Reset height_in to 11
        });
      }
      else {
        handleInputChange({ target:{name, value} })
      }
    }
  };

  const handleEligibilityChange = () =>{
    let message = "";
    let statusResp = 0;

    if(!eligibility){
      message = player.first_name +" "+player.last_name+" is eligible for the upcoming draft"
      statusResp = 200;
    }else{
      message = player.first_name +" "+player.last_name+" is ineligible for the upcoming draft"
    }
    setEligibility(!eligibility);
    handleInputChange({ target:{name:"is_registered", value:!eligibility} })
    const resp = {
      message:message,
      status:statusResp,
    }
    handleMessage(resp)
  }

  // Refactor to Utilities components
  const handleMessage = (response) => {
    if(response.status == 200){
      clearFields();
      setClassname('good');
    }else{
      setClassname('bad');
    }
    setMessage(response.message);
  };

  useEffect(()=>{
    setFormState(initialFormState);
  },[player]);


return (
  <div id="player_form_container">
    <div id="message" className={classname}>{message && <p>{message}</p>}</div>
    <div className="grid_col_65_35">

    <form id="player_form" className='h_container'>
      <div className="player_name_fields">
        <TextField id={"first_name"} label={"Player First Name"} variant={"outlined"} onChange={handleInputChange} name = {"first_name"} value={formState.first_name}/>
        <TextField id={"last_name"} label={"Player Last Name"} variant={"outlined"} onChange={handleInputChange} name = {"last_name"}  value={formState.last_name} />
        <FormControlLabel id="draft_eligibility" control={<Switch defaultChecked={formState.is_registered} onChange={handleEligibilityChange} />} label="Draft Eligibility" />
      </div>
      
      <div className="player_attr_fields">
        <TextField type= {"number"} id={"player_height_ft"} name = {"height_ft"} label={"Player Height (Ft)"}  variant={"outlined"}  onChange={handleInputChange} name = {"height_ft"}     value={formState.height_ft} />
        <TextField type= {"number"} id={"player_height_in"} name = {"height_in"} label={"Player Height (In)"}  variant={"outlined"}  onChange={handleHeightChange} name = {"height_in"}     value={formState.height_in} />
        <TextField type= {"number"} id={"player_weight"}    name = {"weight"}    label={"Player Weight (lbs)"} variant={"outlined"}  onChange={handleInputChange} name = {"weight"}        value={formState.weight}    />
      </div>  
      
      <div>
        <CalendarPicker id={"dob"} name={"dob"} label={"Date of Birth"} variant={"outlined"} onChange={handleDOBChange} value={dayjs(formState.date_of_birth)}/>
      </div>
    </form>

    < DragAndDrop url={player.url} ref={playerImgRef} handleFileUpload={handleFileUpload}/>
   
    </div>

  </div>
  )
}); 

export default PlayerForm;