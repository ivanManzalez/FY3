// import React, {Component} from 'react';
import React,  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 

const PlayerProfile = () => {
  // set variables
  const { playerID } = useParams();
  const [player, setPlayer] = useState({
    player_first: "",
    player_last: "",
    player_height_ft: "",
    player_height_in: "",
    age: ""
  });

  // used when want to add functionality to a newly rendered/updated component
  useEffect(() => {
    // Fetch player data based on playerID
    fetchPlayerData(playerID)
    // Update the player state with fetched data
      .then(data => setPlayer(data))
    // Handle any error returned from fetchPlayerData
      .catch(error => console.log(error));
  }, [playerID]);

// Function to fetch player data
  const fetchPlayerData = async (playerID) => {
    try {
      // Perform API call to fetch player data
      const response = await fetch(`/api/player-profile/${playerID}`);
      // Convert response to JSON obj
      const data = await response.json();
      return data;
      // Handle any error returned from fetch (api call)
    } catch (error) {
      console.log(error)
      throw new Error('Failed to fetch player data');
    }
  };

  return (
    <div id="profile">
      <h1>Player Profile</h1>
      <h2>{playerID}</h2>
      <p>Name: {player.player_first} {player.player_last}</p>
      <p>Height: {player.player_height_ft}'{player.player_height_in}" </p>
      <p>Age: {player.age}</p>
      <br/>
      <p>IG: TODO</p>
      <p>TW: TODO</p>
      <p>SC: TODO</p>
    </div>
  );
};

export default PlayerProfile;

// export default class PlayerProfile extends Component{

//   constructor(props){
//     const { playerID } = useParams();
//     super(props);
//     this.state = {
//       player_first: "",
//       player_last : "",
//       player_height : "",
//       player_age : "",
//     };
//   } 