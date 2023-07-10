// import React, {Component} from 'react';
import React,  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 

const PlayerProfile = () => {
  const { playerID } = useParams();
  console.log("Player ID:")
  console.log(playerID)
  const [player, setPlayer] = useState({
    player_first: "",
    player_last: "",
    player_height_ft: "",
    player_height_in: "",
    age: ""
  });
  console.log("Player ID:")
  console.log(playerID)
  useEffect(() => {
    // Fetch player data based on playerID
    fetchPlayerData(playerID)
    // Update the player state with fetched data
      .then(data => setPlayer(data))
      .catch(error => console.log(error));
  }, [playerID]);

// Function to fetch player data
  const fetchPlayerData = async (playerID) => {
    try {
      // Perform API call to fetch player data
      const response = await fetch(`/api/player-profile/${playerID}`);
      const data = await response.json();
      return data;
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