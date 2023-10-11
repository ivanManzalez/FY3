import React, { Component } from "react";
import CreatePlayerForm from "./CreatePlayerForm";
import CreateTeamForm from "./CreateTeamForm";
import CreateSeasonForm from "./CreateSeasonForm";
import Api from "./Api";



const Commssioner = () => {
  console.log("render commisioner")
  return (
    <div id='commissioner'>
      {/*< Api />*/}
      <h1>Commssioner</h1>
      <div className="h_container" >
        < CreateSeasonForm />
        < CreateTeamForm />
        < CreatePlayerForm />
      </div>
      
    </div>
  )
}
export default Commssioner;
