import React, {useState, useRef} from "react";
import Draftees from "./Draftees";
import Drafters from "./Drafters"; 

const Draft = ({continueDraft, availablePlayers, teamsList, messageHandler}) => {
  const drafteeRef = useRef();
  const teams = Object.values(teamsList);
  console.log("Drafters: ",teams)
  const players = Object.values(availablePlayers);
  const draftLength = Math.min(teams.length, players.length);

  const currentSeason = "2023"; // use API to get latest season
  const [draftee, setDraftee] = useState(null); // set by Comissioner
  const [drafteeName, setDrafteeName] = useState("");  
  const [drafter, setDrafter] = useState(0); // auto set by taking next team in ordered list
  

  const stpForm = {
    season:currentSeason,
    team:drafter,
    player:draftee,
  };

  const createSTP = () => {

    const resp = {
      message:"With the "+(drafter+1)+"th pick in the "+stpForm.season+" draft, the "+teams[drafter].team_name+" select, "+drafteeName,
      status: 200,
    }   
    messageHandler(resp); 
  }

  const drafterHandler = () => {
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
    // restart timer handler
  }

  const handleDrafteeSelection = (id, index) => {
    setDraftee(id);
    setDrafteeName(availablePlayers[index].first_name+" "+availablePlayers[index].last_name)
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
    drafteeRef.current.handleDraftPick(); // remove drafted player from available list
    setDraftee(null);
    createSTP(); //
    drafterHandler(); // get next drafter if one available
  };

return(
  <div>
    {/* Once START button is clicked, begin timer (?) and propmt Commissioner select player for ith team */}
    <div className="v_container draft outline">
      < Drafters className="outline" teamsList={teams} handler={drafterHandler} pickNumber={drafter} /> {/* Display list of teams in order of picks*/}
      < Draftees className="outline" availablePlayers={availablePlayers} handler={handleDrafteeSelection} ref={drafteeRef}/> {/* Display list of Draftable players*/}
    </div>

    {/* GIVEN  draftee & drafter & curr_season THEN createSTP(draftee, drafter, curr_season) */}
    <button className="submit" onClick={handleDraftSelection} > Confirm Draft Pick </button>    
  </div>
  )};

export default Draft;
