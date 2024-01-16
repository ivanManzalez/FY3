import React from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const PlayerCard = (props) => {
  const fy3Logo = "/static/images/fy3-logo.png";
  const cardStyles ={
    position:"relative",
    background:"transparent",


  };
  const backgroundStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "green",
    opacity: 1,
    zIndex:0,
  };

  const typoStyles={
    position: "relative", 
    color:"white",
    justifyContents:"center",
    alignItems:"center",
    textAlign:"center",
    zIndex:3,
  };

  return(
    <Card  xs={props.xs} md={props.md} lg={props.lg} style={cardStyles} raised>
      
      <Typography variant="h6" component="div" style={typoStyles}> {props.name} </Typography>
      <CardMedia
        component="img"
        width="100"
        height="120"
        image={fy3Logo}
        alt="team logo"
        margin="right"
        style={{zIndex:3, position: "relative",}}
      />
      {props.ppg && <Typography variant="p" component="div" style={typoStyles}>{props.ppg} PPG</Typography>}
      {props.rpg && <Typography variant="p" component="div" style={typoStyles}>{props.rpg} RPG</Typography>}
      {props.apg && <Typography variant="p" component="div" style={typoStyles}>{props.apg} APG</Typography>}
      <div style={backgroundStyles}></div>
      </Card>
  )
}

export default PlayerCard;