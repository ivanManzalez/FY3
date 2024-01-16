import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import PlayerCard from "../../components/players/PlayerCard"
import Grid from '@mui/material/Grid';

const LeagueLeaders = ({playerData}) => {
  const leaderboardContainer = {
    width:"100%",
    border:"2px solid #260880",
    background:"radial-gradient(circle at 85% 50%, #260880, #000)",
    borderRadius:10,

  };
  
  
  return(

    <Grid container style={leaderboardContainer} flexDirection="row" justifyContent="space-between" item>
      {playerData && playerData.map((player, index)=>(
        <PlayerCard 
          key={index}
          name={player.name} 
          ppg={player.ppg} 
          rpg={player.rpg} 
          apg={player.apg}
          xs ={4}
          md ={3}
          lg ={2}
          />
        ))}
    </Grid>
    )
};

export default LeagueLeaders;