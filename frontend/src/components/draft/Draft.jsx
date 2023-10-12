import React, {useState, useRef} from "react";
import Draftees from "./Draftees";
import Drafters from "./Drafters"; 

const Draft = ({continueDraft, availablePlayers, teamsList, messageHandler}) => {
  const drafteeRef = useRef();
  const currentSeason = "2023"; // use API to get latest season
  const [draftee, setDraftee] = useState(null); // set by Comissioner
  const [drafter, setDrafter] = useState(0); // auto set by taking next team in ordered list
  const draftLength = Object.keys(teamsList).length; // Calc.

  const stpForm = {
    season:currentSeason,
    team:drafter,
    player:draftee,
  };

  const createSTP = () => {
    const resp = {
      message:"With the "+(drafter+1)+"th pick in the "+stpForm.season+" draft, the team["+stpForm.team+"] selects, "+stpForm.player,
      status: 200,
    }   
    messageHandler(resp); 
  }

  const drafterHandler = () => {
    console.log("Draft completed: ",drafter >= draftLength);
    if(drafter >= draftLength-1)
    {
      const resp = {
        message:"The Draft is complete.",
        status: 200,
      }
      messageHandler(resp);
      continueDraft(false);
      return 0
    }
    setDrafter(drafter+1);
  }

  const handleDrafteeSelection = (e) => {
    setDraftee(e.target.value);
  }

  const handleDraftSelection = () => {
    if(draftee === null)
    {
      const resp = {
        message:"Please select a player to draft.",
        status: 400,
      }
      messageHandler(resp);
      return 0;
    }
    
    createSTP();
    drafteeRef.current.handleDraftPick(); // remove drafted player from available list
    setDraftee(null);
    drafterHandler(); // get next drafter if one available
  }

return(
  <div>
    {/* Once START button is clicked, begin timer (?) and propmt Commissioner select player for ith team */}
    <div className="v_container draft outline">
      < Drafters teamsList={teamsList} handler={drafterHandler} pickNumber={drafter} /> {/* Display list of teams in order of picks*/}
      < Draftees availablePlayers={availablePlayers} handler={handleDrafteeSelection} ref={drafteeRef}/> {/* Display list of Draftable players*/}
    </div>
    <button className="submit" onClick={handleDraftSelection} > Confirm Draft Pick </button>

    {/* GIVEN  draftee & drafter & curr_season THEN createSTP(draftee, drafter, curr_season) */}
    
  </div>
  )};

export default Draft;
