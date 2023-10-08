import React, {useState, useRef} from "react";
// import {getTeamsBySeason} from '../../components/api/stp/stp';
import SelectSeason from '../../components/api/season/SelectSeason';
import SelectTeams from '../../components/api/team/SelectTeams';

const CreateGameForm = ({submitState, clearFormFields}) => {
  // DB values
  const [season, setSeason] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [homeTeam, setHomeTeam] = useState("");
  const [formState, setFormState] = useState(initialFormState);

  // Initial Form state 
  const initialFormState = {
    season:season,
    event:"", // TODO: must modify
    home_team:homeTeam,
    away_team:awayTeam,
  };

  // Handle Season dropdown selection
  const handleSeasonSelection = (data) => {
    setSeason(data);
    setFormState({
      ...formState,
      ['season']: data,
    })
    submitState({
      ...formState,
      ['season']: data,
    })
  }
  // Handle Home Team dropdown selection
  const handleHomeTeamSelection = (data) => {
    setHomeTeam(data);
    setFormState({
      ...formState,
      ['home_team']: data,
    })
    submitState({
      ...formState,
      ['home_team']: data,
    })
  }
  // Handle Away Team dropdown selection
  const handleAwayTeamSelection = (data) => {
    setAwayTeam(data);
    setFormState({
      ...formState,
      ['away_team']: data,
    })
    submitState({
      ...formState,
      ['away_team']: data,
    })
  }

  // Handle form input changes (TODO: Needed?)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    submitState({
      ...formState,
      [name]: value,
    });
  }

  // clear all form fields
  const clearFields = () =>{
    setFormState(initialFormState);
    clearFormFields();
  };

  const validHomeAndAwayTeams = (homeTeam, awayTeam) => {
    var valid = true;
    if(homeTeam === awayTeam){
      const response = {
        status: 406,
        message: "Home team cannot also be Away team",
      }
      handleMessage(response);
      valid = false;
    }
    return valid;
  }
  
return (
  <div >
    <form id="create-game-form" className='form centre'>
      <SelectSeason getSeason = {handleSeasonSelection} />
      <SelectTeams setAwayTeam={handleAwayTeamSelection} setHomeTeam={handleHomeTeamSelection} validator={validHomeAndAwayTeams}/>
      {/*<button type='submit' placeholder="Create Game" onClick={handleCreateGameButton}></button>*/}
    </form>
  </div>
  )
}; 

export default CreateGameForm;
