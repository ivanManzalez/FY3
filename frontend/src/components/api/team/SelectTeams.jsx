import React from "react";
import {retrieveAllTeams} from './team'
import TeamsDropdown from "./TeamsDropdown";


const SelectTeams = ({setHomeTeam, setAwayTeam, validator}) => {
  const [allTeams, setAllTeams] = React.useState([]);
  const [homeTeams, setHomeTeams] = React.useState(allTeams);
  const [awayTeams, setAwayTeams] = React.useState(allTeams);

  // Populate seasons on initial render
  React.useEffect(async () => {
    const teamOptions = await retrieveAllTeams(); // TODO: retrieve ACTIVE teams
    setAllTeams(teamOptions);
    setHomeTeams(teamOptions);
    setAwayTeams(teamOptions);

  }, []);

  // Filter function to get available teams for the opposite dropdown
  const getAvailableTeams = (selectedTeam) => {
    const team = allTeams.filter((allTeams) => allTeams !== (selectedTeam));// remove team by id
    return team;
  };

  const handleHomeTeamChange = (homeTeam) => {
    setHomeTeam(homeTeam);
    const teams = getAvailableTeams(homeTeam)
    setAwayTeams(teams)
  };

  const handleAwayTeamChange = (awayTeam) => {
    setAwayTeam(awayTeam);
    const teams = getAvailableTeams(awayTeam)
    setHomeTeams(teams)
  };

  return(
    <div id = "select_teams" >
      <HomeTeamSelection homeTeamOptions={homeTeams} setHomeTeam = {handleHomeTeamChange}  />
      <AwayTeamSelection awayTeamOptions={awayTeams} setAwayTeam = {handleAwayTeamChange}  />
    </div>
    )

};

const HomeTeamSelection = ({homeTeamOptions, setHomeTeam}) => {
  return(
  <div>
    <TeamsDropdown name="Home Team" options = {homeTeamOptions} setState={setHomeTeam} />
  </div>
  )
}

const AwayTeamSelection = ({awayTeamOptions, setAwayTeam}) => {
  return(
    <div>
    <TeamsDropdown name="Away Team" options = {awayTeamOptions} setState={setAwayTeam} />
    </div>
  )
}

export default SelectTeams;