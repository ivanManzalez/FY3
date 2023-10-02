import React, {useState} from "react";
import {createGame} from '../../components/api/game/game';
// import {getTeamsBySeason} from '../../components/api/stp/stp';
import SelectSeason from '../../components/api/season/SelectSeason';
import SelectTeams from '../../components/api/team/SelectTeams';

const CreateGameForm = () => {

  const [season, setSeason] = useState("");
  const [seasons, setSeasons] = useState([]);
  console.log("CreateGameForm - season");
  console.log(season);

  const [awayTeam, setAwayTeam] = useState("");
  console.log("CreateGameForm - awayTeam");
  console.log(awayTeam);

  const [homeTeam, setHomeTeam] = useState("");
  console.log("CreateGameForm - homeTeam");
  console.log(homeTeam);

  // set form field init values
  const initialFormState = {
    season:season,
    // event:'',
    home_team:homeTeam,
    away_team:awayTeam,
    home_player_01:'',
    home_player_02:'',
    home_player_03:'',
    home_player_04:'',
    home_player_05:'',
    away_player_01:'',
    away_player_02:'',
    away_player_03:'',
    away_player_04:'',
    away_player_05:'',
  };
  const [formState, setFormState] = useState(initialFormState);
  const [message, setMessage] = useState("");
  const [classname, setClassname] = useState("");
 
  
  const teams = {
    team1:{
      team_name:"FY1",
      id:1,         },
    team2:{
      team_name:"FY2",
      id:2,         },
    team3:{
      team_name:"FY3",
      id:3,         },
    team4:{
      team_name:"FY4",
      id:4,         },
    team5:{
      team_name:"FY5",
      id:5,         },
    team6:{
      team_name:"FY6",
      id:6,         },
    };
  const [players, setPlayers] = useState([]);
 
  const handleSeasonSelection = async (data) => {
    setSeason(data);
    handleInputChange({ season: data });
    console.log("make STP api call w/ season filter")
    console.log("const stpResponse = await ... ")
    console.log("setTeams(STPresponse)")
  };

  // clear all form fields
  const clearFields = () =>{
    setFormState(initialFormState);
    setMessage("");
    setClassname("");
  };
  
  // event handler
  const handleCreateGameButton = async (event) => {
    event.preventDefault();
    // define API request options
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(formState),
      };
    console.log("handleCreateGameButton");

    const createGameResponse = await createGame(requestOptions);
    handleMessage(createGameResponse); 
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
      clearFields();
      setClassname('good');
    }else{
      setClassname('bad');
    }
    setMessage(response.message);
  };
console.log('CreateGameForm - current form state');
console.log(formState);
return (
  <div >
    
    <h3> Create Game </h3>
    <h5> Add game details then click submit </h5>
    <div id="message" className={classname}>{message && <p>{message}</p>}</div>
    
    <SelectSeason getSeason = {handleSeasonSelection} />
    <SelectTeams teamOptions={teams} setAwayTeam={setAwayTeam} setHomeTeam={setHomeTeam} />

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

////////////////////////
const DateField = (props) => {
  return(
    <div className = "entryarea">
    <input className = "inputter" type="date" name = {props.name} id={props.id} value={props.value} onChange={props.handler} required />
    <div className="labelline">{"Enter " + props.field}</div>
    </div>
    )
}

////////////////////////
const TimeField = (props) => {
  return(
    <div className = "entryarea">
    <input className = "inputter" type="time" name = {props.name} id={props.id} value={props.value} onChange={props.handler} required />
    <div className="labelline">{"Enter " + props.field}</div>
    </div>
    )
}




export default CreateGameForm;
