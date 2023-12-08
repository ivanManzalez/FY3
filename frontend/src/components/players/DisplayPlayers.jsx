import React from "react";
import {getProfilePicURL } from "../../fireBase/StorageReference";

const DisplayPlayers = ({players , handleSelection}) => {
  const [imageUrls, setImageUrls] = React.useState(JSON.parse(localStorage.getItem('cachedImageUrls')) || {});

  const fetchProfilePicURLs = async (id) => {
    try {
      const resolvedURL = await getProfilePicURL(id);

      setImageUrls((prevImageUrls) => ({
      ...prevImageUrls,
      [id]: resolvedURL,
      }));

      localStorage.setItem('cachedImageUrls', JSON.stringify({ ...imageUrls, [id]: resolvedURL }));
    } catch (error) {
      console.error(error);
    }

  }; 

  React.useEffect(() => {
    // Fetch profile picture URLs for all players when the component mounts
    
    if(players){
      
      players.forEach((player)=>{
        
        if(imageUrls[player.id] == null){
          console.log("Id not in cached items:",player.id)
          // fetchProfilePicURLs(player.id);
        }else{

        }
      });
    }
  }, [players]);

  const registered = (eligibility) => {
    if(eligibility){
      return "good";
    }
      return "bad";
    }

  const handlePlayerSelection = (e,player) => {
    const selection = {
      ...player,
      url: imageUrls[player.id],
    }
    handleSelection(e,selection)
  }
  console.log("Players loaded:", players != null)
  return(
    <>
    <div className="gallery">
      {players && players.map((player) => {
        const { id: playerId , is_registered } = player;
      
        return (
        <div onClick={(e) => handlePlayerSelection(e, player)} className={" clickable centre player_card "+registered(is_registered)}  key={playerId}>
          { imageUrls[playerId] && <img id={"player_img"} className={"inner"} src={imageUrls[playerId]} alt="profile pic"></img>}
          
          <img src="/static/images/fy3-logo.png" alt="fy3-logo"></img>
          <p className={"align centre inner player_name "}>{player.first_name +" "+player.last_name}</p>
        </div>
        )
      }
      )}
    </div>
    </>
  )
}


export default DisplayPlayers;