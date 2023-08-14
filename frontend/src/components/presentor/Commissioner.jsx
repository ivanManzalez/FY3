import React, { Component } from "react";
import CreatePlayerForm from "./CreatePlayerForm";
import CreateTeamForm from "./CreateTeamForm";
import CreateSeasonForm from "./CreateSeasonForm";


const Commssioner = () => {
  console.log("render commisioner")
  return (
    <div id='commissioner'>
      < CreateSeasonForm />
      < CreatePlayerForm />
      < CreateTeamForm />
    </div>
  )
}
export default Commssioner;
