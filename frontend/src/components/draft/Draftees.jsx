import React, {useEffect, useState, forwardRef, useImperativeHandle} from "react";

const Draftees = forwardRef(({handler, availablePlayers},ref) => {
  const [playerId,setPlayerId] = useState(null);
  const draftList = Object.values(availablePlayers);
  const [draftees, setDraftees] = useState(Object.values(availablePlayers));
  // create array from 0: N-1 ?
  

  useEffect(() => {
    // Update the draftees state when availablePlayers change.
    setDraftees(availablePlayers);
  }, [availablePlayers]);

  const handleDraftPick = () => {
    const updatedDraftees = [...draftees];
    updatedDraftees[playerId].is_registered = false;
    setDraftees(updatedDraftees);
    setPlayerId(null)
  }
  useImperativeHandle(ref, () => ({
    handleDraftPick,
  }));

  const handleDrafteeSelection = (e) => {
    // update draftee
    const index = e.target.value;
    setPlayerId(index)
    handler(draftees[index].id ,index);
  }

  return(
    <div>
    <h4>Draftees List</h4>
      
      <div className="draftees">
        {draftees.length === 0 ? (
          <p>Loading draftees...</p>
          ) : (
          draftees.map((player,index) => player.is_registered ? (
            <button onClick={handleDrafteeSelection} className="draftee" value={index} key={player.id}  >
              {player.first_name + ' ' + player.last_name}
            </button> 
          ) : null 
        ))}
      </div>

    </div>
  )})

export default Draftees;
