import React, { useState, useRef } from "react";

// import Api from "./Api";

// Actionable Menu
import ActionButton from "../general/ActionButton";

//////////////////////////////////////////////////////////////////////// 
const Commssioner = () => {
  const iconsFolder = "/static/images/icons/"; 

  return (
    <div id='commissioner'>
      <h1>Commssioner</h1>
      
      <div className="gallery">
        <ActionButton title={"Players"}      path={"/commissioner/players"} imgSrc={iconsFolder+"basketball_players.png"}/>
        <ActionButton title={"Teams"}        path={"/commissioner/teams"}   imgSrc={iconsFolder+"basketball_team.png"} />
        <ActionButton title={"Seasons"}      path={"/commissioner/seasons"} imgSrc={iconsFolder+"basketball_field.png"} />
        <ActionButton title={"Games/Events"} path={"/commissioner/events"}  imgSrc={iconsFolder+"basketball_game2.png"} />
        <ActionButton title={"Draft"}        path={"/commissioner/draft"}   imgSrc={iconsFolder+"basketball_bench.png"} />
        <ActionButton title={"Stats"}        path={"/commissioner/draft"}   imgSrc={iconsFolder+"basketball_stats.png"} />
      </div>

    </div>
  )
}
export default Commssioner;
