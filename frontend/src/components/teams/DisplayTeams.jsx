import React from "react";
import {getProfilePicURL } from "../../fireBase/StorageReference";

const DisplayTeams = ({teams , handleSelection}) => {
  // const [imageUrls, setImageUrls] = React.useState(JSON.parse(localStorage.getItem('cachedImageUrls')) || {});
  const [imageUrls, setImageUrls] = React.useState({});
  console.log(teams);

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
    
    if(teams){
      
      teams.forEach((team)=>{
        console.log(team);
    //     if(imageUrls[team.id] == null){
    //       console.log("Id not in cached items:",team.id)
    //       fetchProfilePicURLs(team.id);
    //     }else{

    //     }
        });
      }
    
    console.log(teams)
  }, [teams]);


  const handleTeamSelection = (e,team) => {
    const selection = {
      ...team,
      url: imageUrls[team.id],
    }
    handleSelection(e,selection)
  }
  console.log("teams not null? ",teams)
  return(
    <>
    <div className="gallery">
      {teams && teams.map((team) => {
        const { id: teamId } = team;
        console.log(teamId)
        return (
        <div onClick={(e) => handleTeamSelection(e, team)} className={"clickable centre player_card "}  key={teamId}>
          {/* imageUrls[teamId] && <img id={"team_img"} className={"inner"} src={imageUrls[teamId]} alt="profile pic"></img>}*/}
          
          <img src="/static/images/fy3-logo.png" alt="fy3-logo"></img>
          <p className={"align centre inner player_name "}>{team.team_name}</p>
        </div>
        )
      }
      )}
    </div>
    </>
  )
}


export default DisplayTeams;