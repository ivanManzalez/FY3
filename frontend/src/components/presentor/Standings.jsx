import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const TeamRow = ({team, pos}) => {
  const style = {
    display: 'flex',
    flexDirection:"row",
    justifyContent:"space-evenly",
    gap: 1,
    py: "1rem",
    overflowY: 'visible', 
    backgroundColor: 'transparent',
    border: "2px solid #260880",
    position: 'relative',
    maxHeight: '60px',
    minHeight: '50px',
    zIndex: '1',
    borderRadius:5,
    margin:"10px",

  }
  const imgStyle = {
    // backgroundColor:"red",
    zIndex: '2',
    position: 'absolute', // Set the position to absolute
    top: '-70px', // Adjust the top position to overflow above the container
    left: '50%', // Center the image horizontally
    transform: 'translateX(-50%)', // Adjust to center horizontally
    height: 'calc(100% + 140px)',
    // width: '100px', // Ensure the width adjusts to maintain aspect ratio
    // objectFit: 'contain', // Prevent image distortion
  };
  const textStyles = {
    display:"flex", 
    alignItems:"center", 
    justifyContent:"center",
  };
  
  return(
    <>
    <div size="sm" key={team.id} style={style} >
      
      <Typography variant={"h3"} style={textStyles} color="#05010E">{pos} </Typography>

      <div style={{}}> 
        <img src={team.logo} alt={team.name} style={imgStyle} />
      </div>

      <Typography variant="h5" style={textStyles} sx={{ color: '#440EBD' }}>{team.record}</Typography>

    </div>
    </>)
  };

const ConferenceColumn = ({conference, teamData}) => {
  const textStyles = {
    display:"flex", 
    alignItems:"center", 
    justifyContent:"center",
  };
  return(    
    <div style={{width:"100%", display:"flex", flexDirection:"column", gap:50}}>
      <Grid item xs={12} style={{backgroundColor:'', display:"flex", justifyContent:"center"}}>
        
      </Grid>
      { teamData && teamData.map((team, index)=>(
        <Grid item key={team.id} xs={12}>
          <TeamRow team={team} pos={index+1} />
        </Grid>
        ))
      }
      {/*<Grid item xs={12}>
        <Typography variant="button" style={textStyles} color={"#440EBD"} sx={{marginBottom:2, cursor: "pointer"}}> See all </Typography>
      </Grid>*/}
    </div> 
)};

const WesternConference = () => {
  const teamLogos = "/static/images/team_logos/" 
  const teamData = [
  {
    id:1,
    logo:teamLogos+"brickLayers-nobg.png",
    name:"Brick Layers",
    record:"9 - 0"
  },
  {
    id:2,
    logo:teamLogos+"pointGods-nobg.png",
    name:"Point Gods",
    record:"6 - 3"
  },
  {
    id:3,
    logo:teamLogos+"secureTheBag-nobg.png",
    name:"Secure the Bag",
    record:"1 - 8"
  },
  {
    id:4,
    logo:teamLogos+"chipNation-nobg.png",
    name:"Chip Name",
    record:"1 - 8"
  },
  {
    id:5,
    logo:teamLogos+"firingSquad-nobg.png",
    name:"Firing Squad",
    record:"1 - 8"
  },
  ];
  return(
    <div style={{display:"flex", flexDirection:"column", width:"100%"}}>
    <Typography variant="h4" style={{color:"white", display:"flex", justifyContent:"center"}}> WEST </Typography>
    <ConferenceColumn conference={"WEST"} teamData={teamData} />
    </div>
)};

const EasternConference = () => {
  const teamLogos = "/static/images/team_logos/"
  const teamData = [
    {
      id:6,
      logo:teamLogos+"betTheHouse-nobg.png",
      name:"Bet the House",
      record:"9 - 0"
    },
    {
      id:7,
      logo:teamLogos+"getMoney-nobg.png",
      name:"Get Money",
      record:"6 - 3"
    },
    {
      id:8,
      logo:teamLogos+"bullyBall-nobg.png",
      name:"Bully Ball",
      record:"1 - 8"
    },
    {
      id:9,
      logo:teamLogos+"slaughterGang-nobg.png",
      name:"Slaughter Gang",
      record:"1 - 8"
    },
    {
      id:10,
      logo:teamLogos+"splashZone-nobg.png",
      name:"Splash Zone",
      record:"1 - 8"
    },
  ];
return(
  <div style={{display:"flex", flexDirection:"column", width:"100%"}}>
  <Typography variant="h4" style={{color:"white", display:"flex", justifyContent:"center"}}>EAST</Typography>
  <ConferenceColumn conference={"EAST"} teamData={teamData} />
  </div>
)};

// Parent component
const Standings = () => {
  const screenWidth = 1000;
  const flexDirection = "row";
  const standingsContainer = {
    background:"radial-gradient(circle at 50% 50%, #260880, #000)",
    display:"flex",
    flexDirection:flexDirection,
    justifyContent:"space-around",
    gap:5,
    marginTop:"100px",
    minHeight:100,
    padding:5,
    paddingBottom:"30px",
  }
  const conferenceContainer = {
    backgroundColor:"red",
    height:99,
    width:"50%",
    borderRadius:10,
  }
  return (
    <div style={standingsContainer}>
      <EasternConference />
      <WesternConference />
    </div>
  );
};

export default Standings;
