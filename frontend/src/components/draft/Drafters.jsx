import React, {useState, useEffect} from "react";

const Drafters = ({teamsList, handler, pickNumber}) => {
  
  const [teams, setTeams] = useState(teamsList);
  console.log(teams);
  useEffect(() => {
    // Update the draftees state when availablePlayers change.
    setTeams(teamsList);
  }, [teamsList]);
  // console.log("team:",teams[pickNumber].team_name)

  return(
    <div>
    <h4>Drafter</h4>
    <div className="drafters">
    {teams.length && 
      <p key={teams[pickNumber].id} index={pickNumber} value={teams[pickNumber].id}>
        {teams[pickNumber].team_name + " ("+teams[pickNumber].abbr_name +")"}
      </p>
    }
    </div>
    </div>
  )}
export default Drafters;