import React from "react";
import {getProfilePicURL } from "../../fireBase/StorageReference";
import axios from 'axios';

const DisplayTeams = ({teams , handleSelection}) => {
  // const [imageUrls, setImageUrls] = React.useState(JSON.parse(localStorage.getItem('cachedImageUrls')) || {});
  const [imageUrls, setImageUrls] = React.useState({});
  const fy3Logo = "/static/images/fy3-logo.png";

  //********************************************************************

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

  //********************************************************************
  
  React.useEffect(() => {
    // Fetch profile picture URLs for all players when the component mounts
    
    if(teams){
      teams.forEach((team)=>{
        if(imageUrls[team.id] == null){
          const pathname = "/static/images/team_logos/"+camelCase(team.team_name)+".png";
          
          setImageUrls((imageUrls)=>({
            ... imageUrls,
            [team.id]:pathname,
          }))    

          // fetchProfilePicURLs(team.id);
        }
      })
    }
    
  }, [teams]);


  //********************************************************************

  const handleTeamSelection = (e,team) => {
    const selection = {
      ...team,
      url: imageUrls[team.id],
    }
    handleSelection(e,selection)
  }
  //********************************************************************

  function camelCase(str) {
    // converting all characters to lowercase
    let ans = str.toLowerCase();
 
    // Returning string to camelcase
    return ans.split(" ").reduce((s, c) => s
        + (c.charAt(0).toUpperCase() + c.slice(1)));
 
  }
  //********************************************************************

  return(
    <>
    <div className="gallery">
      {teams && teams.map((team) => {
        const { id: teamId } = team;

        return (
        <div onClick={(e) => handleTeamSelection(e, team)} className={"clickable centre player_card shadow silver"}  key={teamId}>

          { !imageUrls[teamId] && 
            <>
            <p className={"align centre inner player_name "}>{team.team_name}</p>
            <img src={fy3Logo} alt="fy3-logo"></img>
            </>
          }
          <p>{team.id}</p>
          <img id={"team_img"} className={"inner"} src={imageUrls[teamId]} alt="profile pic"></img>
          
        </div>
        )
      }
      )}
    </div>
    </>
  )
}


export default DisplayTeams;