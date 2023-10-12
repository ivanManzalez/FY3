import React, {useState, forwardRef, useImperativeHandle} from "react";

const Draftees = forwardRef(({handler},ref) => {
  const [playerId,setPlayerId] = useState("");
  const availablePlayers = {
    1:{
      id:1,
      name:"Player One",
      age:25,
      heightFt:6,
      heightIn:0,
      available:true,
    },
    2:{
      id:2,
      name:"Player Two",
      age:25,
      heightFt:6,
      heightIn:0,
      available:true,
    },
    3:{
      id:3,
      name:"Player Three",
      age:25,
      heightFt:6,
      heightIn:0,
      available:true,
    },
    4:{
      id:4,
      name:"Player Four",
      age:25,
      heightFt:6,
      heightIn:0,
      available:true,
    },
    5:{
      id:5,
      name:"Player Five",
      age:25,
      heightFt:6,
      heightIn:0,
      available:true,
    },
    6:{
      id:6,
      name:"Player Six",
      age:25,
      heightFt:6,
      heightIn:0,
      available:true,
    },
    7:{
      id:7,
      name:"Player Seven",
      age:25,
      heightFt:6,
      heightIn:0,
      available:true,
    },
    8:{
      id:8,
      name:"Player Eight",
      age:25,
      heightFt:6,
      heightIn:0,
      available:true,
    },
    9:{
      id:9,
      name:"Player Nine",
      age:25,
      heightFt:6,
      heightIn:0,
      available:true,
    },
    10:{
      id:10,
      name:"Player Ten",
      age:25,
      heightFt:6,
      heightIn:0,
      available:true,
    },
  }


  
  const draftList = Object.values(availablePlayers);
  const [draftees, setDraftees] = useState(draftList)

  const handleDraftPick = () => {
    console.log("handleDraftPick:", draftees[playerId].available);
    const updatedDraftees = [...draftees];
    updatedDraftees[playerId].available = false;
    setDraftees(updatedDraftees);
  }
  useImperativeHandle(ref, () => ({
    handleDraftPick,
  }));

  const handleDrafteeSelection = (e) => {
    // update draftee
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