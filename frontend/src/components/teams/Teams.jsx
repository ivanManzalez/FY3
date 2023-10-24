import React, { useState, useRef, useEffect } from "react";
import CreateTeamForm from "./CreateTeamForm";
import TeamForm from "./TeamForm";
import DisplayTeams from "./DisplayTeams";

import {retrieveAllTeams, updateTeamByID, deleteTeamByID, createTeam} from "../api/team/Team";
import {deleteProfilePicURL} from "../../fireBase/StorageReference";

import AutoCompleteTeamDropdown from "../general/AutoCompleteTeamDropdown";


const Teams = () => {
    
  //********************************************************************

  const defaultTeam = {
    id:'',
    team_name: '',
    abbr_name: '',
    division_ind: '',
  };
  const [formType, setFormType] = useState(0);
  const [submitButtonLabel, setSubmitButtonLabel] = useState("Update Team");
  const teamFormRef = useRef();
  const [allTeams, setAllTeams] = useState(null);
  const [team, setTeam] = useState(defaultTeam);
  const [editTeam, setEditTeam] = useState(false);
  // utilities
  const [classname, setClassname] = useState("");
  const [message, setMessage] = useState("");

  //********************************************************************

  const getTeams = async () => {
    const teamResp = await retrieveAllTeams();
    handleMessage(teamResp);
    setAllTeams(Object.values(teamResp.data));
  };

  //********************************************************************

  const toggleEditTeam = () => {
    setEditTeam(!editTeam)
  };
  
  //********************************************************************

  const backToGallery = () => {
    setTeam(defaultTeam);
    setEditTeam(false)
    setFormType(0);
    setSubmitButtonLabel("Update Team");
  }

  //********************************************************************

  const newTeamButton = () => {
    setTeam(defaultTeam);
    setFormType(1);
    setSubmitButtonLabel("Create New Team");
    setEditTeam(true)
  }

  //********************************************************************
  // GET players on render
  useEffect(() => {
    getTeams();
  }, []);

  //********************************************************************

  // GET selected player from Search
  const handleTeamSelection = (event, teamSelected) => {
    if(!editTeam){
      setEditTeam(true);
    }
    setTeam(teamSelected);
  };

  //********************************************************************

  const handleDeleteImg = () => {
    if(team){
      deleteProfilePicURL(team.id);
    }
  };

  //********************************************************************

  // Factor out as utility
  const handleMessage = (response) => {
    if(response.status == 200){
      setClassname('good');
    }else{
      setClassname('bad');
    }
    setMessage(response.message);
  };
  //******** Create New Team *******************************************

  // event handler
  const handleCreateTeamButton = async (event) => {
    event.preventDefault();
    const formState = teamFormRef.current.getFormState()
    // define API request options
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(formState),
      };

    const createTeamResponse = await createTeam(requestOptions);
    handleMessage(createTeamResponse); 
    if(createTeamResponse.id){
      const teamId = createTeamResponse.id;
      const fileuploadOutcome = handleFileUpload(teamFormRef.current.getFile(), teamId);
      if(fileuploadOutcome){
        teamFormRef.current.deleteImage();
      }
    }
    getTeams();
    setEditTeam(false);
  };

  //****** Delete Seleted Team **************************************************

  const handleDeleteTeamButton = async (event) => {
    console.log("handleDeleteTeamButton")
    event.preventDefault();
    const requestOptions = { 
      method: 'DELETE', 
      headers: { 
          'Content-type': 'application/json'
        }
      }
    const deleteTeamResp = await deleteTeamByID(team.id, requestOptions);  
    handleMessage(deleteTeamResp);  
    getTeams();
    setEditTeam(false);
  };

  //**** Update Selected Team ********************************************************* 

  const handleUpdateTeamButton = async (event) => {
    event.preventDefault();

    const formState = teamFormRef.current.getFormState()
    console.log("handleUpdateTeamButton:",formState);
    // define API request options
    const requestOptions = {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(formState),
    }; 
    
    const updateTeamResponse = await updateTeamByID(formState.id, requestOptions);
    handleMessage(updateTeamResponse);  
    
    // if(updateTeamResponse.id){
    //   const teamId = updateTeamResponse.id;
    //   const fileuploadOutcome = handleFileUpload(teamFormRef.current.getFile(), teamId);
    //   if(fileuploadOutcome){
    //     teamFormRef.current.deleteImage();
    //   }
    // }

    getTeams();
    setEditTeam(false);
  };

  //********************************************************************

  const handleSubmitButton = (event) => {
    if(formType==0){
      handleUpdateTeamButton(event);
    }else{
      handleCreateTeamButton(event);
      }
    setFormType(0);
    setSubmitButtonLabel("Update Team");
    setEditTeam(false);
  };
  //********************************************************************

  function camelCase(str) {
    // converting all characters to lowercase
    let ans = str.toLowerCase();
 
    // Returning string to camelcase
    return ans.split(" ").reduce((s, c) => s
        + (c.charAt(0).toUpperCase() + c.slice(1)));
 
  }
  //********************************************************************
  
  return (
    <>
      <h1>Teams</h1>
      <div id="message" className={" "+classname} >{message && <p>{message}</p>}</div>
      
      {allTeams &&
      <div className="v_container">
        <AutoCompleteTeamDropdown handleSelection={handleTeamSelection} options={allTeams}/>
        {formType==0 && <button className="submit" type='submit' placeholder="Create New Team" onClick={newTeamButton}> + New Team </button>}
      </div>
      }
      <br></br>
      {/* Team is NOT Selected*/}
      { 
      !editTeam && 
        < DisplayTeams teams={allTeams} handleSelection={handleTeamSelection} /> 
      }
      {
      editTeam && 
        <div>
        <div className={"v_container space_between"}>
          <h4>Edit Team</h4>
          <button className="small submit" type='submit' placeholder="Display Team Gallery" onClick={backToGallery}> Back </button>

        </div>
        {/*<CreateTeamForm team={team} deleteImg={handleDeleteImg} ref={teamFormRef} />*/}
        <TeamForm team={team} deleteImg={handleDeleteImg} ref={teamFormRef} />
        <button className="submit" type='submit' placeholder="Update Team" onClick={handleSubmitButton}> {submitButtonLabel} </button>
        <button className="delete" type='submit' placeholder="Delete Team" onClick={handleDeleteTeamButton}> Delete Team</button>
      </div>
      }

    </>
    )
}

export default Teams;