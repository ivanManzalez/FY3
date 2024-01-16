import React from "react";
import PlayerStatsTable from "./PlayerStatsTable";
////////////////////////////////////////////////////////////////////////////////
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { Grid, Typography, CardMedia, Badge, useMediaQuery } from '@mui/material';
////////////////////////////////////////////////////////////////////////////////
import ReactPlayer from 'react-player/youtube'

////////////////////////////////////////////////////////////////////////////////

const GameScoreCard = ({ containerStyles }) => {
  const fy3Logo = "/static/images/fy3-logo.png";
  
  const gameScoreCard = {
    padding:10,
    width:"100%",
    height:"100%",
    display: "flex",
    flexDirection: "column",
    justifyContent:"space-evenly",
    }
    

  const teamRow = {
    height:"100%",
    width:"100%",
    display:"flex",
    flexDirection:"row",
    alignItems:"stretch",
  }

  const imgStyles = {
    minWidth:"40%",
    maxWidth:"40%",
    aspectRatio:1,
  }

  const period = {
    color:"white",
    display:'flex',
    justifyContent:'center',
    textAlign: "center",
    alignItems: 'center',
    // borderRadius:10,
    width:"50%",
    borderLeft:"1px solid #260880",
  }

  const finalCol = {
    width:"100%",
  };

  return(
    <div style={gameScoreCard}>
      <div style={{...teamRow , borderBottom:"1px solid #260880",height:"20%"}}>
        <Typography variant="p" textAlign="center" style={{minWidth:"40%",}} >  </Typography>
        <div style={period}>1</div>
        <div style={period}>2</div>
        <div style={period}>3</div>
        <div style={{...period, ...finalCol}}>Final</div>
      </div> 
      <div style={{...teamRow, borderBottom:"1px solid #260880",}}>
        <img src={fy3Logo} style={imgStyles} alt="team-logo"></img>
        <div style={period}>11</div>
        <div style={period}>10</div>
        <div style={period}>11</div>
        <div style={{...period, ...finalCol}}>32</div>
      </div> 
      <div style={teamRow}>
        <img src={fy3Logo} style={imgStyles} alt="team-logo"></img>
        <div style={period}>4</div>
        <div style={period}>11</div>
        <div style={period}>4</div>
        <div style={{...period, ...finalCol}}>18</div>
      </div> 
    </div>
  )
};

const PlayerStat = ({playerImg, amount, stat}) => {
  const fy3Logo = "/static/images/fy3-logo.png";
  const playerImgStyles = {
    height:70,
    aspectRatio:1,
  }
  return(
    <div style={{display:"flex", flexDirection:"row", flex:"1 1" , height:"100%", alignItems:"center", paddingRight:5}}>
      <img style={playerImgStyles} src={fy3Logo} alt=""></img>
      <p style={{display:"flex", flexDirection:"row-reversed", flex:1, justifyContent:"end",}}>{amount} {stat}</p>
    </div>
  )
}

const TeamLeaders = () => {
  const teamOneLeaders = [
    {
      img:"/static/images/fy3-logo.png",
      stat:6,
      statistic:"PTS"
    },
    {
      img:"/static/images/fy3-logo.png",
      stat:5,
      statistic:"REB"
    },
    {
      img:"/static/images/fy3-logo.png",
      stat:19,
      statistic:"AST"
    }
  ];

  const teamTwoLeaders = [
    {
      img:"/static/images/fy3-logo.png",
      stat:16,
      statistic:"PTS"
    },
    {
      img:"/static/images/fy3-logo.png",
      stat:5,
      statistic:"REB"
    },
    {
      img:"/static/images/fy3-logo.png",
      stat:9,
      statistic:"AST"
    }
  ];

  const teamLeaders = {
    padding:10,
    display:"flex",
    flexDirection:"column",
    justifyContent:"flex-start",
    color:"white",
    borderLeft:"3px solid #260880",
    width:"100%",
    height:"100%",
  };

  const teamCol = {
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-evenly",
    width:"50%",
    height:"100%",
    // alignItems:"stretch",
  }

  const leaderCell = {
    display:"flex", 
    alignItems:"center", 
    height:"100%",
  }

  return(
    <div style={teamLeaders}>
      <Typography variant="p" textAlign="center" style={{color:"white", margin:0, borderBottom:"1px solid #260880"}}>Leaders</Typography>
      <div style={{display:"flex", flexDirection:"row", height:"100%",}}>
        <div style={teamCol}>
        {
          teamOneLeaders && teamOneLeaders.map((player, index) => (
            <div key={index} style={leaderCell}>
            {/*{console.log("team1",player)}*/}
            <PlayerStat playerImg={player.img} amount={player.stat} stat={player.statistic} />
            </div>
            ))
        }
          
        </div>
        <div style={{...teamCol, borderLeft:"3px solid #260880",}}>
          {
          teamTwoLeaders && teamTwoLeaders.map((player, index) => (
            <div key={index} style={leaderCell}>
            {/*{console.log("team2",player)}*/}
            <PlayerStat playerImg={player.img} amount={player.stat} stat={player.statistic} />
            </div>
            ))
        }
        </div>
      </div>
    </div>
  )
};
////////////////////////////////////////////////////////////////////////////////

const GameSummaryCard = ({containerStyles}) => {
  const gameSummaryCard = (containerStyles) 
  ? containerStyles
  : {
    width:"100%",
    display:"flex",
    flexDirection:"column",
    

  };

  const gameSummaryCardContent = {
    display:"flex",
    flexDirection:"row",
    width:"100%",
    height:"100%",
    marginTop:5,
    marginBottom:5,
  };

  const col1 ={
    width:"60%",
  }
  const col2 ={
    width:"40%",
  }

  return(
    <div style={gameSummaryCard}>
      <Typography variant="p" textAlign="center" color="white" style={{borderBottom:"3px solid #260880"}}>Week 2: Team1 v Team2</Typography>
      <div style={gameSummaryCardContent}>
        <div style={col1}>
          <GameScoreCard />
        </div>
        <div style={col2}>
          <TeamLeaders />
        </div>
      </div>
    </div>
  )
}

////////////////////////////////////////////////////////////////////////////////
const PlayerCard = (props) => {
  const isMediumOrSmaller = useMediaQuery('(max-width: 1200px)'); // Adjust the breakpoint as needed
  const fy3Logo = "/static/images/fy3-logo.png";
  const teamLogo = "/static/images/team_logos/betTheHouse.png";
  const cardStyles ={
    position:"relative",
    background:"transparent",
    height:"100%",

  };
  const backgroundStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "",
    opacity: 1,
    zIndex:0,
  };

  const typoStyles={
    // border:"1px solid black",
    position: "relative", 
    color:"white",
    justifyContents:"center",
    alignItems:"center",
    textAlign:"center",
    zIndex:3,
    backgroundColor:"",
  };
  const badgeStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width:"350%",
    backgroundColor: 'transparent',
    position: 'absolute',
    // top: '50%', // Center vertically
    // left: '50%', // Center horizontally
    transform: 'translate(70%, -70%)', // (right, down)
    borderRadius: '50%', // Make it circular
    overflow: 'hidden', // Hide overflow for perfect circle
    zIndex: 5, // Ensure it's on top
  };
  return(
    <Card  xs={props.xs} md={props.md} lg={props.lg} style={cardStyles} raised>
      
      <Typography variant="h6" component="div" style={typoStyles}> Player of the Week </Typography>
      
      <Grid container direction={{xs:"row",lg:"column"}} sx={{backgroundColor:""}} item>
        <Grid container direction="column"  justifyContent="center"  xs={4} lg={12} direction={{xs:"column-reverse",lg:"column"}} sx={{border:""}}>
          <Typography variant="p" component="div" style={typoStyles}> {props.name} </Typography>
          
          <CardMedia
            component="img"
            image={fy3Logo}
            alt="team logo"
            margin="right"
            style={{ zIndex: 3, position: 'relative',backgroundColor:""}}
            />
          <Badge
            badgeContent={
              <div style={badgeStyles}>
                <CardMedia
                  component="img"
                  image={teamLogo}
                  alt="team-logo"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Ensure image covers the circle
                />
              </div>
            }
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            style={{ display: 'flex', justifyContent: 'center',zIndex: 5}}
          />

        </Grid>
      
      <Grid container direction="column" xs={8} lg={12} item >

        {props.oppTeam && <Typography variant={{lg:"p", xs:"h5"}} component="div" style={typoStyles}> Weeks 2 vs {props.oppTeam} </Typography>}
        <Grid container direction={{xs:"row", lg:"column"}} justifyContent="space-evenly" item>
          {props.pts && <Typography variant="p" component="div" style={typoStyles}>{props.pts} PTS</Typography>}
          {props.reb && <Typography variant="p" component="div" style={typoStyles}>{props.reb} REB</Typography>}
          {props.ast && <Typography variant="p" component="div" style={typoStyles}>{props.ast} AST</Typography>}
        </Grid>  
        {isMediumOrSmaller && (
          <Grid container lg={0} style={{padding:20, display:"flex", justifyContent:"center", boxShadow:"5px"}}> 
            <ReactPlayer url='https://www.youtube.com/watch?v=SkML640BcoA' />
          </Grid>)}
      </Grid>
      </Grid>
    </Card>
    )
};

const PlayerOfTheWeek = ({containerStyles}) => {
  const playerOfTheWeek = containerStyles 
  ?containerStyles
  :{
    padding:10,
    width:"100%",
    minHeight:"100%",
    maxHeight:"100%",
    background:"transparent",
  }

  const player = {
    name:"Player Fifteen",
    oppTeam:"Team 10",
    pts:10,
    reb:10,
    ast:10,
  }

  return(
    <div style={playerOfTheWeek}>
      <PlayerCard xs={12} {...player} />
    </div>
  )
};
//////////////////////////////////////////////////////////////////////////////// 

const Stats = () => {

  //////////////////////////////// 
  const boxStyles = {
    marginTop:70,
    padding:20,
  };

  const gridItem = {
    padding:5, 
    // border: "0.5px dotted red",
  }

  const contentStyles = {
    background:"radial-gradient(circle at 50% 50%, #260880, #000)",
    border: "2px solid #260880",//#260880
    borderRadius:10, 
    height:"100%",
    width:"100%",
    display:"flex",
    flexDirection:"column",
  }
  
  return (

    <Box style={boxStyles}>
    
    <Grid container direction="column" style={{padding:10, margin:10}}>
      
      <Grid container direction="row" item >
        <Grid container item xs={12} lg={9} style={gridItem} justifyContent="center" alignItems="center">
          {< GameSummaryCard containerStyles={contentStyles}/>}
        </Grid>
        <Grid item xs={12} lg={3} style={gridItem}>
          {< PlayerOfTheWeek containerStyles={contentStyles}/>}
        </Grid>
      </Grid>
      
      <Grid container item >
        <Grid container item xs={12} style={gridItem}>
          <PlayerStatsTable />
        </Grid>
      </Grid>

    </Grid>


    </Box>
    );

};

export default Stats;