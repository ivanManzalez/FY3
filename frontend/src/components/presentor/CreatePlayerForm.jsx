import React, {useState, useRef} from "react";
// Player API
import {createPlayer} from '../../components/api/player/player';
// Player profile pic
import DragAndDrop from '../dragAndDrop/DragAndDrop';
import {getTestStorageRef, uploadFileResumable} from "../../fireBase/StorageReference";
// Form API
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import {CalendarPicker} from "../general/DateTimeSelection";

const CreatePlayerForm = () => {
  
  const playerImgRef = useRef();

  const dateToYYYYMMDD = (dayjsObj) => {
    const year = dayjsObj.$y;
    const month = dayjsObj.$M+1;
    const day = dayjsObj.$D;
    const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const ret = {date, year};
    return ret;
  }


  const defaultDOB = dayjs("1998-01-01", "YYYY-MM-DD");
  const dob = dateToYYYYMMDD(dayjs(defaultDOB))

  const initialFormState = {
    first_name: '',
    last_name: '',
    height_ft: '5',
    height_in: '0',
    weight: "150",
    origin: 'Brampton',
    age: dob.date,
  };
  //image reference

  // all fields initially blank
  const [formState, setFormState] = useState(initialFormState);
  const [message, setMessage] = useState("");
  const [classname, setClassname] = useState("");
  console.log(formState);

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
    console.log(createPlayerResponse);
    if(createPlayerResponse.player.id){
      const playerId = createPlayerResponse.player.id;
      const fileuploadOutcome = handleFileUpload(playerImgRef.current.uploadedFile, playerId);
      if(fileuploadOutcome){
        playerImgRef.current.handleDelete();
      }
    }
    // 
  };
  const handleDOBChange = (e) => {
    const birthDate = dateToYYYYMMDD(e);
    handleInputChange({
      target:{
        name:"age",
        value:birthDate.date,
      }})
  }

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
      newHeightIn = Math.min(Math.max(newHeightIn, -1), 12); // Restrict to 0-11

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
          height_in: 11, // Reset height_in to 0
        });
      }else {
        handleInputChange({ target:{name, value} })
      }
    }
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

  const handleFileUpload = async (file,playerId) => {

    const filename = "profilepic.png";
    const storageRef = getTestStorageRef(playerId,filename);
    const uploadStatus = await uploadFileResumable(storageRef, file)
      .catch((error)=>{
        console.error('Upload failed:', error);
      });
    return uploadStatus;
  }

return (
  <div>
    <h3> Create Player </h3>
    
    <div id="message" className={classname}>{message && <p>{message}</p>}</div>
    
    <div className="grid_col_65_35">
    {/*70%*/}
      <form id="create_player_form" className='h_container'>
        <div className="player_name_fields">
          <TextField id={"first_name"} label={"Player First Name"} variant={"outlined"} onChange={handleInputChange} name = {"first_name"} value={formState.first_name}/>
          <TextField id={"last_name"} label={"Player Last Name"} variant={"outlined"} onChange={handleInputChange} name = {"last_name"}  value={formState.last_name} />
          
          </div>
        
        <div className="player_attr_fields">
          <TextField type= {"number"} id={"player_height_ft"} name = {"height_ft"} label={"Player Height (Ft)"}  variant={"outlined"}  onChange={handleInputChange}  name = {"height_ft"}    value={formState.height_ft} />
          <TextField type= {"number"} id={"player_height_in"} name = {"height_in"} label={"Player Height (In)"}  variant={"outlined"}  onChange={handleHeightChange} name = {"height_in"}    value={formState.height_in} />
          <TextField type= {"number"} id={"player_weight"}    name = {"weight"}    label={"Player Weight (lbs)"} variant={"outlined"}  onChange={handleInputChange}  name = {"weight"}       value={formState.weight}    />
        </div> 
        
        <div>
          <CalendarPicker id={"dob"} name={"dob"} label={"Date of Birth"} variant={"outlined"} onChange={handleDOBChange} value={dayjs(formState.age)}/>
        </div> 
      </form>
    {/*30%*/}
      < DragAndDrop ref={playerImgRef} handleFileUpload={handleFileUpload}/>
    </div>

    <button className="submit" type='submit' placeholder="Create Player" onClick={handleCreatePlayerButton}> Create Player</button>
  </div>
  )
}; 

export default CreatePlayerForm;