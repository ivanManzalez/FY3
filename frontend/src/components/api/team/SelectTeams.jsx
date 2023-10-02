import React from "react";
import TeamsDropdown from "./TeamsDropdown";


const SelectTeams = ({teamOptions,setHomeTeam, setAwayTeam}) => {
  // const [allTeams, setAllTeams] = React.useState(teamOptions);
  const [homeTeams, setHomeTeams] = React.useState(teamOptions);
  const [awayTeams, setAwayTeams] = React.useState(teamOptions);
  // console.log("Select from these teams: ");
  console.log(teamOptions)

  const handleHomeTeamChange = (homeTeam) => {
    // Given homeTeam is selected
    setHomeTeam(homeTeams[homeTeam]);
    
  };
  const handleAwayTeamChange = (awayTeam) => {
    setAwayTeam(awayTeams[awayTeam]);
  };

  return(
    <div id = "select_teams" >
      <HomeTeamSelection homeTeamOptions={teamOptions} setHomeTeam = {handleHomeTeamChange} />
      <AwayTeamSelection awayTeamOptions={awayTeams} setAwayTeam = {handleAwayTeamChange} />
    </div>
    )

};

const HomeTeamSelection = ({homeTeamOptions, setHomeTeam}) => {

  console.log("HomeTeamSelection");
  // given teams 
  // set them up in MUI select dropdown
  return(
  <div>
    <TeamsDropdown name="Home Team" options = {homeTeamOptions} setState={setHomeTeam} />
  </div>
  )
}

const AwayTeamSelection = ({awayTeamOptions, setAwayTeam}) => {
  // given teams 
  // set them up in MUI select dropdown
  return(
    <div>
    <TeamsDropdown name="Away Team" options = {awayTeamOptions} setState={setAwayTeam} />
    </div>
  )
}

export default SelectTeams;