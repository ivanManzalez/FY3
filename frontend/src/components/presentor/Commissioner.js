import React, { Component } from "react";
import CreatePlayerForm from "./CreatePlayerForm";
import CreateTeamForm from "./CreateTeamForm";


const Commssioner = () => {
  console.log("render commisioner")
  return (
    <div id='commissioner'>
      < CreateTeamForm />
      < CreatePlayerForm />
    </div>
  )
}
export default Commssioner;
