import React, {useState, useEffect} from "react";

const Drafters = ({teamsList, handler, pickNumber, draftLength}) => {
  
  const [teams, setTeams] = useState(teamsList);

  useEffect(() => {
    // Update the draftees state when availablePlayers change.
    setTeams(teamsList);
  }, [teamsList]);

  useEffect(() => {
    if (pickNumber >= 0) {
      
      const draftersContainer = document.getElementById('drafters');
      const scrollPosition = (3*pickNumber)* draftLength ; // why 3?
      draftersContainer.scrollTop = scrollPosition;
    }
  }, [pickNumber]);


  return(
    <div className="">
      <h4>Drafter</h4>
      <div id="drafters">
      {teams.length  === 0 
        ? (
          <p>Loading draftees...</p>
          ) 
        : (
          teams.map((team, index) => (
          <p className={pickNumber === index ? 'to_select' : ''} key={team.id} index={index} value={team.id}> {team.team_name} </p>
      )))}
      </div>
    </div>
  )
}
export default Drafters;

