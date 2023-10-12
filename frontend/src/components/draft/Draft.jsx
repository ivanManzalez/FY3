import React, {useState, useRef} from "react";
import Draftees from "./Draftees";
import Drafters from "./Drafters"; 

const Draft = ({draftees, teamsList}) => {
  const drafteeRef = useRef();
  const currentSeason = "2023"; // use API to get latest season
  const [draftee, setDraftee] = useState(""); // set by Comissioner
  const [drafter, setDrafter] = useState(0); // auto set by taking next team in ordered list
  const stpForm = {
    season:currentSeason,
    team:drafter,
    player:draftee,
  };

  const drafterHandler = () => {
    setDrafter(drafter+1);
    console.log("\nDrafter: ",drafter)
  }

  const handleDrafteeSelection = (e) => {
    setDraftee(e.target.value);
    console.log("\nDraftee: ",e.target.value)
  }

  const handleDraftSelection = () => {
    drafterHandler()
    setDraftee("Select Draftee");
    console.log("\n--- create STP ---");
    console.log("Season: ", currentSeason);
    console.log("Team: ", drafter);
    console.log("Player: ", draftee);
    drafteeRef.current.handleDraftPick();
  }

return(
  <div>
    {/* Once START button is clicked, begin timer (?) and propmt Commissioner select player for ith team */}
    <div className="v_container draft">
      < Drafters handler={drafterHandler} pickNumber={drafter} /> {/* Display list of teams in order of picks*/}
      < Draftees handler={handleDrafteeSelection} ref={drafteeRef}/> {/* Display list of Draftable players*/}
    </div>
    <button onClick={handleDraftSelection} > Join </button>

    {/* GIVEN  draftee & drafter & curr_season THEN createSTP(draftee, drafter, curr_season) */}
    
  </div>
  )};

export default Draft;
