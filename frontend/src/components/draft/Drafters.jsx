import React, {useState} from "react";

const Drafters = ({teamsList, handler, pickNumber}) => {
  
  const teams = Object.values(teamsList);
  return(
    <div>
    <h4>Drafter</h4>
    <div className="drafters">
      <p key={teams[pickNumber].id} value={teams[pickNumber].id}>
        {teams[pickNumber].name}
      </p>
    </div>
    </div>
  )}
export default Drafters;