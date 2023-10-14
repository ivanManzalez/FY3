import React, {useEffect, useState, forwardRef, useImperativeHandle} from "react";
import DrafteeProfile from "./DrafteeProfile";

const Draftees = forwardRef(({handler, availablePlayers},ref) => {
  const [playerId,setPlayerId] = useState(null);
  const draftList = Object.values(availablePlayers);
  const [draftees, setDraftees] = useState(Object.values(availablePlayers));

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
    const index = e.currentTarget.value;
    setPlayerId(index)
    handler(draftees[index].id ,index);
  }

  return(
    <div className="">
      <h4>Draftees List</h4>
      <div className="draftees">
        {draftees.length === 0 ? (
          <p>Loading draftees...</p>
          ) : (
          draftees.map((player,index) => player.is_registered ? (
            < DrafteeProfile handleDrafteeSelection={handleDrafteeSelection} index={index} key={player.id} player={player}/>
          ) : null 
        ))}
      </div>

    </div>
  )})

export default Draftees;
