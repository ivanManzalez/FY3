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
      < CreateSeasonForm />
      < CreatePlayerForm />
      < CreateTeamForm />
    </div>
  )
}
export default Commssioner;
