import React from "react";
import {getProfilePicURL } from "../../fireBase/StorageReference";

const DisplayPlayers = ({players , handleSelection}) => {
  const [imageUrls, setImageUrls] = React.useState({});
  // const [dataReady, setDataReady] = React.useState(false);

  React.useEffect(() => {
    // Fetch profile picture URLs for all players when the component mounts
    const fetchProfilePicURLs = async () => {
      const urls = {};
      for (const player of players) {
        const { id } = player;
        try {
          const resolvedURL = await getProfilePicURL(id);
          urls[id] = resolvedURL;
        } catch (error) {
          console.error(error);
        }
      }
      setImageUrls(urls);
    };

    fetchProfilePicURLs();
  }, [players]);

  const registered = (eligibility) => {
    if(eligibility){
      return "good";
    }
      return "bad";
    }

  const handlePlayerSelection = (e,player) => {
    const id = player.id;
    const selection = {
      ...player,
      // url: imageUrls[id],
    }
    handleSelection(e,selection)
  }

  // const getProfilePicPreview = (id) => {
  //   getProfilePicURL(id)
  //     .then((resolvedURL) => {
  //       setImageUrls({
  //       ... imageUrls,
  //       [id]:resolvedURL,
  //     })  
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     })
  //   };

  
  return(
    <>
    <div className="gallery">
      {players && players.map((player) => {
        const { id: playerId , is_registered } = player;

        {/*getProfilePicPreview(playerId);     */}
      
        return (
        <div onClick={(e) => handlePlayerSelection(e,player)} className={"player_card "+registered(is_registered)} key={playerId}>
          { imageUrls[playerId] && <img className={"player_card "} src={imageUrls[playerId]} alt="profile pic"></img>}
          <p>{player.first_name +" "+player.last_name}</p>
          <p>{player.height_ft +"'' "+player.height_in+'"'}</p>
          <p>{player.weight+" lbs"}</p>
          <p>Registered: {1}</p>
          <p>ID: {playerId}</p>

        </div>
        )
      }
      )}
    </div>
    </>
  )
}

export default DisplayPlayers;