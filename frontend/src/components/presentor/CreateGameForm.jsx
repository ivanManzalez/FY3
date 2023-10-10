import React, {useState, useRef, forwardRef, useImperativeHandle} from "react";
// import {getTeamsBySeason} from '../../components/api/stp/stp';
import SelectSeason from '../../components/api/season/SelectSeason';
import SelectTeams from '../../components/api/team/SelectTeams';

const CreateGameForm = forwardRef(({submitState, clearFormFields}, ref) => {
  // References
  const seasonDropdownRef = useRef();
  const teamRef = useRef();

  // DB values
  const [season, setSeason] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [homeTeam, setHomeTeam] = useState("");
  const [formState, setFormState] = useState(initialFormState);

  // Initial Form state 
  const initialFormState = {
    season:"",
    event:"",
    home_team:"",
    away_team:"",
  };

  // Handle Season dropdown selection
  const handleSeasonSelection = (data) => {
    // setSeason(data);
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
    // setHomeTeam(data);
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
    console.log("clearFields-Game");
    setFormState(initialFormState);
    seasonDropdownRef.current.clearSeasonSelection();
    teamRef.current.clearTeamsSelection();
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
  // Expose the clearFields function via the ref
  useImperativeHandle(ref, () => ({
    clearFields,
  }));
  
return (
  <div >
    <form id="create-game-form" className='form centre' onSubmit={clearFields}>
      <SelectSeason ref={seasonDropdownRef} getSeason = {handleSeasonSelection} />
      <SelectTeams ref={teamRef} setAwayTeam={handleAwayTeamSelection} setHomeTeam={handleHomeTeamSelection} validator={validHomeAndAwayTeams}/>  
    </form>
  </div>
  )
}); 

export default CreateGameForm;
