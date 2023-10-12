import React, {useState, forwardRef, useImperativeHandle} from "react";

const Draftees = forwardRef(({handler, availablePlayers},ref) => {
  const [playerId,setPlayerId] = useState(null);
  

  
  const draftList = Object.values(availablePlayers);
  const [draftees, setDraftees] = useState(draftList)

  const handleDraftPick = () => {
    console.log("handleDraftPick:", draftees[playerId].available);
    const updatedDraftees = [...draftees];
    updatedDraftees[playerId].available = false;
    setDraftees(updatedDraftees);
    setPlayerId(null)
  }
  useImperativeHandle(ref, () => ({
    handleDraftPick,
  }));

  const handleDrafteeSelection = (e) => {
    // update draftee
    console.log("Selected Player: ",e.target.value)
    setPlayerId(e.target.value)
    handler(e);
  }
  return(
    <div>
    <h4>Draftees List</h4>
      <div className="draftees">
        {draftees.map((player) => (
          player.available ? (
            <button onClick={handleDrafteeSelection} className="draftee" key={player.id} value={player.id-1}>
              {player.name}
            </button>
          ) : null
        ))}
      </div>
    </div>
  )})

export default Draftees;