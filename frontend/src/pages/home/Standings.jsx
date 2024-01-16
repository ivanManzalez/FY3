import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

{/*<div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>*/}
const ToggleSwitch = ({changeState, labels}) => {
  
  const [isChecked, setIsChecked] = useState(true);
  const conference = (isChecked) ?labels.right :labels.left;
  
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    changeState();
  };

  const labelContainerStyles = {
    backgroundColor:"black",
    color:"#260880",
    borderRadius:5,
    height:"100%",
  };

  const sliderStyles = {
  };

  return(
    <label className="switch">

      <input 
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange} />

      <span className="slider" style={{height:0}}></span>
      <span className="slider-content round">{conference}</span>
      <Grid container direction="row" xs={12} style={labelContainerStyles}>
        <Grid item xs={6} justifyContent="center" textAlign="center" alignItems="center" >{labels.left  && <Typography variant="h4" >{labels.left}</Typography>}</Grid>
        <Grid item xs={6} justifyContent="center" textAlign="center" alignItems="center" >{labels.right && <Typography variant="h4" >{labels.right}</Typography>}</Grid>
      </Grid>
      
    </label>
)};

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
      <Grid item xs={12}>
        <Typography variant="button" style={textStyles} color={"#440EBD"} sx={{marginBottom:2, cursor: "pointer"}}> See all </Typography>
      </Grid>
    </div> 
)};

const WesternConferencePreview = () => {
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
  ];
  return(
    <ConferenceColumn conference={"WEST"} teamData={teamData} />
)};

const EasternConferencePreview = () => {
  const teamLogos = "/static/images/team_logos/"
  const teamData = [
    {
      id:4,
      logo:teamLogos+"betTheHouse-nobg.png",
      name:"Bet the House",
      record:"9 - 0"
  },
    {
      id:5,
      logo:teamLogos+"getMoney-nobg.png",
      name:"Get Money",
      record:"6 - 3"
  },
    {
      id:6,
      logo:teamLogos+"bullyBall-nobg.png",
      name:"Bully Ball",
      record:"1 - 8"
  },
  ];
return(
  <ConferenceColumn conference={"EAST"} teamData={teamData} />
)};

const StandingsPreview = () => {
  const [conference, setConference] = useState(false);
  
  const toggleConference = () => {
    setConference(!conference);
  };


  return(
    <div style={{
      border: "2px solid #260880",
      background: 'radial-gradient(circle at -50% 50%, #260880 10%, #000 80%)', // Example gradient from red to blue
      borderRadius:10,
      width:"100%", 
      height:"100%"
    }}>
    
    <div style={{width:"100%", minHeight:"10%",display:"flex", justifyContent:"center", marginTop:10}}>
      <ToggleSwitch changeState={toggleConference} labels={{left:"East", right:"West"}}/>
    </div>
    {
    conference
    ?
    <WesternConferencePreview  />
    :
    <EasternConferencePreview  />
    }
    </div >
    )
};

export default StandingsPreview;