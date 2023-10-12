import React, { Component } from "react";
import CreatePlayerForm from "./CreatePlayerForm";
import CreateTeamForm from "./CreateTeamForm";
import CreateSeasonForm from "./CreateSeasonForm";
import Api from "./Api";
import Draft from "../draft/Draft";



const Commssioner = () => {
  const beginDraft = true;
  return (
    <div id='commissioner'>
      {/*< Api />*/}
      <h1>Commssioner</h1>
      <div className="h_container" >
        {beginDraft && < Draft />}
        < CreatePlayerForm />
        < CreateSeasonForm />
        < CreateTeamForm />
        
      </div>
      
    </div>
  )
}
export default Commssioner;
