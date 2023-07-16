import React, {useState} from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


const CreatePlayerForm = () => {

  // set form field init values
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [origin, setOrigin] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");
  const [classname, setClassname] = useState("");

  // clear all form fields
  const clearFields = () =>{
    setFirst("");
    setLast("");
    setHeight("");
    setWeight("");
    setOrigin("");
    setAge("");
    setMessage("");
    setClassname("");
  };

  // create player API
  const createPlayerAPI = (requestOptions) => {
      // POST request to /api/create-players/
      // IF a response is received 
      // THEN convert it to JSON
      // THEN print
      // fetch().then().then()
      fetch('/api/create-players/', requestOptions 
        ).then((response)=>{
        
        if(response.status === 200){
            clearFields();
            setClassname("good");
          }
        else{
            setClassname("bad");
          }
          return response.json();
        }).then((data) => {
          console.log('data')
        if (data.message) {
          // Display the message to the user
          setMessage(data.message);
          // Clear the form fields
          }
        })//.catch()
        // Handle other response data
        // data.data
    }
  
  // event handler
  const handleCreatePlayerButton = (event) => {
    event.preventDefault();
    
    // define API request options
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
          player_first : first,
          player_last: last,
          player_height: height,
          player_weight: weight,
          origin: origin,
          age: age,
        })
      };
    
    createPlayerAPI(requestOptions);
      
    };
  const handlePlayerFirstChange = (e) => {
    setFirst(e.target.value);
  };
  const handlePlayerLastChange = (e) => {
    setLast(e.target.value);
  };
  const handlePlayerHeightChange = (e) => {
    setHeight(e.target.value);
  };
  const handlePlayerWeightChange = (e) => {
    setWeight(e.target.value);
  };
  const handlePlayerOriginChange = (e) => {
    setOrigin(e.target.value);
  };
  const handlePlayerAgeChange = (e) => {
    setAge(e.target.value);
  };

console.log("render create player form");
return (
  <div >
    <h3> Create Player </h3>
    <h5> Add player details then click submit </h5>
    <div id="message" class={classname}>{message && <p>{message}</p>}</div>
    <form id="create-player-form" class='form centre'>
    
    <TextField id={"player_first"} field={"Player First Name"} handler={handlePlayerFirstChange} value={first} />
    <TextField id={"player_last"} field={"Player Last Name"} handler={handlePlayerLastChange} value={last} />
    <NumberField  field={"Player Height"} handler={handlePlayerHeightChange} value={height} />
    <Box id={"player_height"} sx={{ width: 300 }}>
      <Slider
        aria-label="Small steps"
        defaultValue={0.00000005}
        getAriaValueText={valuetext}
        step={0.00000001}
        marks
        min={-0.00000005}
        max={0.0000001}
        valueLabelDisplay="auto"
      />
    </Box>
    <NumberField id={"player_weight"} field={"Player Weight"} handler={handlePlayerWeightChange} value={weight} />
    <TextField id={"player_origin"} field={"Player Origin"} handler={handlePlayerOriginChange} value={origin} />
    <TextField id={"player_age"} field={"Player Age"} handler={handlePlayerAgeChange} value={age} />
    
    <button type='submit' placeholder="Create Player" onClick={handleCreatePlayerButton}> Create Player</button>
    </form>
  </div>
  )
}; 

////////////////////////
const TextField = (props) => {
  return(
    <div class = "">
      <label>{props.field}</label>
      <input type="text" id={props.id} placeholder={"Enter " + props.field} value={props.value} onChange={props.handler}/>
    </div>
    )
}

////////////////////////
const NumberField = (props) => {
  return(
    <div class = "">
      <label>{props.field}</label>
      <input type="number" id={props.id} placeholder={"Enter " + props.field} value={props.value} onChange={props.handler}/>
    </div>
    )
}

////////////////////////
function valuetext(value) {
  return `${value}°C`;
}


export default CreatePlayerForm;