import React, {useState} from "react";
import PlayerForm from "../players/PlayerForm"
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import {CalendarPicker} from "../general/DateTimeSelection";


////////////////////////////////////////////////////////////////////////////////////

const Registration = () => {

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

  const defaultDOB = dayjs();

  const dob = dateToYYYYMMDD(dayjs(defaultDOB)).date
  // Initial state of ingested player

  const initialFormState = {
    username:"",
    phone:"",
    first_name: "",
    last_name: "",
    height_ft: 5,
    height_in: 5,
    weight: 150,
    // origin: player.origin,
    date_of_birth: dob,
    is_registered:"",
    highschool:"",
    fav_player:"",

  };

  const [formState, setFormState] = useState(initialFormState);

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleDOBChange = (e) => {
    const birthDate = dateToYYYYMMDD(e);
    handleInputChange({
      target:{
        name:"date_of_birth",
        value:birthDate.date,
    }})
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

  return(
    <>
    <h1>Registration</h1>
    {/*ENTER UNIQUE USERNAME*/}
    {/*ENTER PHONE NUMER (OPTIONAL) */}
    <div id="user_info">
      <TextField 
        id={"username"} 
        label={"Username"} 
        variant={"outlined"} 
        onChange={handleInputChange} 
        name = {"username"} 
        value={formState.username}/>

      <TextField 
        id={"phone_number"} 
        name = {"phone_number"} 
        label={"Phone Number (optional)"}  
        variant={"outlined"}  
        onChange={handleInputChange} 
        name = {"phone"} 
        value={formState.phone} />  
    </div>

    {/*JOINING AS A PLAYER? IF YES:*/}
    {/*ENTER FIRST AND LAST NAME*/}
    {/*ENTER DOB */}
    {/*ENTER WEIGHT */}
    {/*ENTER HEIGHT */}
    {/*ENTER HIGHEST LEVEL PLAYED */}
    {/*ENTER FAV PLAYER */}
    
    <div id="player_info">
      <TextField id={"first_name"} label={"First Name"} variant={"outlined"} onChange={handleInputChange} name = {"first_name"} value={formState.first_name}/>
      <TextField id={"last_name"} label={"Last Name"} variant={"outlined"} onChange={handleInputChange} name = {"last_name"} value={formState.last_name}/>  
    </div>

    <div className="player_attr_fields">
      <TextField type= {"number"} id={"player_height_ft"} name = {"height_ft"} label={"Player Height (Ft)"}  variant={"outlined"}  onChange={handleInputChange}  value={formState.height_ft} />
      <TextField type= {"number"} id={"player_height_in"} name = {"height_in"} label={"Player Height (In)"}  variant={"outlined"}  onChange={handleHeightChange} value={formState.height_in} />
      <TextField type= {"number"} id={"player_weight"}    name = {"weight"}    label={"Player Weight (lbs)"} variant={"outlined"}  onChange={handleInputChange}  value={formState.weight}    />
    </div> 

    <div>
      <CalendarPicker id={"dob"} name={"dob"} label={"Date of Birth"} variant={"outlined"} onChange={handleDOBChange} value={dayjs(formState.date_of_birth)}/>
    </div>

    <div className="player_personal_fields">
      <TextField id={"player_highschool"} name = {"highschool"} label={"Player Highschool"}  variant={"outlined"}  onChange={handleInputChange}  value={formState.highschool} />
      <TextField id={"fav_player"}        name = {"fav_player"} label={"Favourite Player"}   variant={"outlined"}  onChange={handleInputChange}  value={formState.fav_player} />
    </div> 


    {/*<PlayerForm player={initialFormState}/>*/}

    
    

    </>
    );
}
export default Registration;