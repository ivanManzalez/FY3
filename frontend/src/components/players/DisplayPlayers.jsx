import React from "react";

const DisplayPlayers = ({players , handleSelection}) => {

  const registered = (eligibility) => {

    if(eligibility){
      return "good";
    }
      return "bad";
    }
  const handlePlayerSelection = (e,player) => {
    handleSelection(e,player)
  }

  return(
    <div className="gallery">
      {players && players.map((player) => 
        (
        <div onClick={(e) => handlePlayerSelection(e,player)} className={"player_card "+registered(player.is_registered)} key={player.id}>
          <p>{player.first_name +" "+player.last_name}</p>
          <p>{player.height_ft +"'' "+player.height_in+'"'}</p>
          <p>{player.weight+" lbs"}</p>
          <p>{player.is_registered}</p>
        </div>
        )
      )}
    </div>
  )
}

export default DisplayPlayers;