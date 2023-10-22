import React, { useState, useRef, useEffect } from "react";
import CreateTeamForm from "./CreateTeamForm";
import DisplayTeams from "./DisplayTeams";

import {retrieveAllTeams} from "../api/team/Team";

import AutoCompleteTeamDropdown from "../general/AutoCompleteTeamDropdown";


const Teams = () => {

  const [allTeams, setAllTeams] = useState(null);
  const [team, setTeam] = useState(null);
  const [editTeam, setEditTeam] = useState(false);
  // utilities
  const [classname, setClassname] = useState("");
  const [message, setMessage] = useState("");

  const getTeams = async () => {
    const teamResp = await retrieveAllTeams();

    handleMessage(teamResp);
    setAllTeams(Object.values(teamResp.data));
  };

  // GET players on render
  useEffect(() => {
    getTeams();
  }, []);

  // GET selected player from Search
  const handleTeamSelection = (event, teamSelected) => {
    if(!editTeam){
      setEditTeam(true);
    }
    setTeam(teamSelected);
  };

  const handleDeleteImg = () => {
    if(team){
      deleteProfilePicURL(team.id);
    }
  };
  // Factor out as utility
  const handleMessage = (response) => {
    if(response.status == 200){
      setClassname('good');
    }else{
      setClassname('bad');
    }
    setMessage(response.message);
  };
  console.log("!editTeam",!editTeam);
  return (
    <>
      <h1>Teams</h1>
      <div id="message" className={" "+classname} >{message && <p>{message}</p>}</div>

      {allTeams &&
      <AutoCompleteTeamDropdown handleSelection={handleTeamSelection} options={allTeams}/>}
      <br></br>
      {/* Team is NOT Selected*/}
      { 
      !editTeam && 
        < DisplayTeams teams={allTeams} handleSelection={handleTeamSelection} /> 
      }

    </>
    )
}

export default Teams;