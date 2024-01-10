import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';


const LeagueLeaders = () => {
  const leaderboardContainer = {
    width:"100%",
    border:"2px solid #260880",
    background:"radial-gradient(circle at 85% 50%, #260880, #000)",
    borderRadius:10,
  };
  return(
    <div style={leaderboardContainer}>
      <Typography color="#260880">LeagueLeaders</Typography>
    </div>
    )
};

export default LeagueLeaders;