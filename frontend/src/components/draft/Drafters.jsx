import React, {useState} from "react";

const Drafters = ({teams, handler, pickNumber}) => {

  return(
    <div>
    <h4>Drafter</h4>
    <div className="drafters">
      <p key={teams[pickNumber].id} index={pickNumber} value={teams[pickNumber].id}>
        {teams[pickNumber].name}
      </p>
    </div>
    </div>
  )}
export default Drafters;