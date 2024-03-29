import React, { forwardRef, useRef, useImperativeHandle} from "react";
import {retrieveAllTeams} from './team'
import TeamsDropdown from "./TeamsDropdown";


const SelectTeams = forwardRef(({setHomeTeam, setAwayTeam, validator},ref) => {
  const homeTeamRef = useRef();
  const awayTeamRef = useRef();

  const [allTeams, setAllTeams] = React.useState([]);
  const [homeTeams, setHomeTeams] = React.useState(allTeams);
  const [awayTeams, setAwayTeams] = React.useState(allTeams);

  //
  const clearTeamsSelection = () => {
    homeTeamRef.current.clearTeamSelection();
    awayTeamRef.current.clearTeamSelection();
  } 

  // Expose the clearFields function via the ref
  useImperativeHandle(ref, () => ({
    clearTeamsSelection,
  }));

  // Populate seasons on initial render
  React.useEffect(async () => {
    const teamOptions = await retrieveAllTeams(); // TODO: retrieve ACTIVE teams
    const teams = Object.values(teamOptions.data)
    console.log("teams....",teams)
    setAllTeams(teams);
    setHomeTeams(teams);
    setAwayTeams(teams);

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
  // console.log("home teams:", homeTeams)
  // console.log("away teams:", awayTeams)
  return(
    <div id = "select_teams" >
      <HomeTeamSelection ref={homeTeamRef} homeTeamOptions={homeTeams} setHomeTeam = {handleHomeTeamChange}  />
      <AwayTeamSelection ref={awayTeamRef} awayTeamOptions={awayTeams} setAwayTeam = {handleAwayTeamChange}  />
    </div>
    )

});

const HomeTeamSelection = forwardRef(({homeTeamOptions, setHomeTeam},ref) => {
  return(
    <TeamsDropdown ref={ref} name="Home Team" options = {homeTeamOptions} setState={setHomeTeam} />
  )
})

const AwayTeamSelection = forwardRef(({awayTeamOptions, setAwayTeam}, ref) => {
  return(
    <TeamsDropdown ref={ref} name="Away Team" options = {awayTeamOptions} setState={setAwayTeam} />
  )
})

export default SelectTeams;