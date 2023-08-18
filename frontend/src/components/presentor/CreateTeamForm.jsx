import React, {useState} from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const CreateTeamForm = () => {

  // set form field init values
  const [name, setName] = useState("");
  const [abbrName, setAbbrName] = useState("");
  const [divisionInd, setDivisionInd] = useState("");
  const [message, setMessage] = useState("");
  const [classname, setClassname] = useState("");

  // clear all form fields
  const clearFields = () =>{
    setName("");
    setAbbrName("");
    setDivisionInd("");
    setMessage("");
    setClassname("");
  };

  // create player API
  const createTeamAPI = (requestOptions) => {
      // POST request to /api/create-players/
      // IF a response is received 
      // THEN convert it to JSON
      // THEN print
      // fetch().then().then()
      fetch('/teams/create-teams/', requestOptions 
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
  const handleCreateTeamButton = (event) => {
    event.preventDefault();
    
    // define API request options
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        team_name: name,
        abbr_name: abbrName,
        division_ind: divisionInd,
        })
      };
    
    createTeamAPI(requestOptions);
      
    };

  const handleTeamNameChange = (e) => {
    setName(e.target.value);
  };
  const handleTeamAbbrNameChange = (e) => {
    setAbbrName(e.target.value);
  };
  const handleTeamDivisionChange = (e) => {
    setDivisionInd(e.target.value);
  };

console.log(classname);

return (
  <div >
    <h3> Create Team </h3>
    <h5> Add team details then click submit </h5>
    <div id="message" className={classname}>{message && <p>{message}</p>}</div>
    <form id="create-team-form" className='form centre'>
    
    <TextField id={"team_name"} field={"Team Name"} handler={handleTeamNameChange} value={name} />
    <TextField id={"abbr_name"} field={"Team Short Name"} handler={handleTeamAbbrNameChange} value={abbrName} /> 
    <TextField id={"diviion_ind"} field={"Team Division"} handler={handleTeamDivisionChange} value={divisionInd} />
    
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
      <input className = "inputter" type="text" id={props.id} value={props.value} onChange={props.handler} required/>
      <div className="labelline">{"Enter " + props.field}</div>
    </div>
    )
}

////////////////////////
const NumberField = (props) => {
  return(
    <div className = "entryarea">
      {/*<label>{props.field}</label>*/}
      <input className = "inputter" type="number" id={props.id} value={props.value} onChange={props.handler} required/>
      <div className="labelline">{"Enter " + props.field}</div>
    </div>
    )
}

export default CreateTeamForm;
