import React, { useState, useRef } from "react";

import Api from "./Api";

// Actionable Menu
import ActionButton from "../general/ActionButton";

//////////////////////////////////////////////////////////////////////// 
const Commssioner = () => {

  return (
    <div id='commissioner'>
      <h1>Commssioner</h1>
      
      <div className="gallery">
        <ActionButton title={"Players"} path={"/commissioner/players"}/>
        <ActionButton title={"Teams"} path={"/commissioner/teams"}/>
        <ActionButton title={"Seasons"} path={"/commissioner/seasons"}/>
        <ActionButton title={"Games/Events"} path={"/commissioner/events"}/>
        <ActionButton title={"Draft"} path={"/commissioner/draft"}/>
      </div>

    </div>
  )
}
export default Commssioner;
