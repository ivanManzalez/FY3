import React, {useState} from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


const CreatePlayerForm = () => {

  // set form field init values
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weight, setWeight] = useState("");
  const [origin, setOrigin] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");
  const [classname, setClassname] = useState("");

  // clear all form fields
  const clearFields = () =>{
    setFirst("");
    setLast("");
    setHeightFt("");
    setHeightIn("");
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
      fetch('/players/create-players/', requestOptions 
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
          first_name : first,
          last_name: last,
          height_ft: heightFt,
          height_in: heightIn,
          weight: weight,
          origin: origin,
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
  const handlePlayerHeightFtChange = (e) => {
    setHeightFt(e.target.value);
  };
  const handlePlayerHeightInChange = (e) => {
    setHeightIn(e.target.value);
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

console.log(classname);
return (
  <div >
    <h3> Create Player </h3>
    <h5> Add player details then click submit </h5>
    <div id="message" class={classname}>{message && <p>{message}</p>}</div>
    <form id="create-player-form" class='form centre'>
    
    <TextField id={"player_first"} field={"Player First Name"} handler={handlePlayerFirstChange} value={first} />
    <TextField id={"player_last"} field={"Player Last Name"} handler={handlePlayerLastChange} value={last} /> 
    <NumberField id={"player_height_ft"} field={"Player Height (Ft)"} handler={handlePlayerHeightFtChange} value={heightFt} />
    <NumberField id={"player_height_in"} field={"Player Height (In)"} handler={handlePlayerHeightInChange} value={heightIn} />
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
    <div class = "entryarea">
      {/*<label>{props.field}</label>*/}
      <input class = "inputter" type="text" id={props.id} value={props.value} onChange={props.handler} required/>
      <div class="labelline">{"Enter " + props.field}</div>
    </div>
    )
}

////////////////////////
const NumberField = (props) => {
  return(
    <div class = "entryarea">
      {/*<label>{props.field}</label>*/}
      <input class = "inputter" type="number" id={props.id} value={props.value} onChange={props.handler} required/>
      <div class="labelline">{"Enter " + props.field}</div>
    </div>
    )
}



export default CreatePlayerForm;
