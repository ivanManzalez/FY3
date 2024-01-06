import React, { useState } from "react";
import { Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../fireBase/AuthContext';
import HomeLayout from './HomeLayout'

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const PlayerCard = (props) => {
  const fy3Logo = "/static/images/fy3-logo.png";

  return(
    <Card >
     <Typography variant="h6" component="div"> {props.name} </Typography>
     <img src={fy3Logo} alt=""></img>
     <Typography variant="p" component="div"> PPG: {props.ppg} </Typography>
    </Card>
  )
}

const TeamPositionCard = (props) => {
  const teamImgsDir = "/static/images/";

  return(
    <Card >
      <CardContent>
      <Grid container direction="row" alignItems="center" spacing={2} justifyContent="space-between">
        
        <Grid item>
          <Typography variant="h4">#{props.pos+1}</Typography>
          <Typography variant="p">{props.wins} - {props.losses}</Typography>
        </Grid>
        
        <Grid item> 
        <CardMedia
          component="img"
          width="94"
          height="94"
          image={"/static/images/team_logos/"+props.teamName+".png"}
          alt="team logo"
        />
        </Grid>

      </Grid>
      </CardContent>
    </Card >
  )
}

const Home = (props) => {
  const [error, setError] = useState('');
  const {logout, currentUser} = useAuth();
  const [logoutRedirect, setLogoutRedirect] = useState("login/");
  const navigate = useNavigate();
  const westTeamNames = [
    "brickLayers",
    "pointGods",
    "secureTheBag",
    "chipNation",
    "splashZone",
  ];
  const eastTeamNames = [
    "betTheHouse",
    "getMoney",
    "bullyBall",
    "slaughterGang",
    "firingSquad",
  ];

  const handleLogout = async () =>{
    setError('');
    try{
      await logout();
      navigate(logoutRedirect) // redirect
    }catch{
      setError('Failed to logout');
    }
  }

  return(
    <div>
      <HomeLayout>
        <h1>Welcome back {currentUser.email}!</h1>
        <Link to="/login" ><button onClick={handleLogout}>Logout</button></Link>

        <Box>
          <Grid container style={{border:"2px solid black"}}>
          
          {/***SCHEDULE*****/}
          <Grid container style={{backgroundColor:"blue"}}>
            <Typography variant="h6" component="div" align="left" >
            {"Schedule"}
            </Typography>
            <Grid container  direction="row" style={{border:"1px solid white"}}>
            </Grid>
          </Grid>

          {/***STANDINGS*****/}
          <Container style={{backgroundColor:"green"}}>
            <Typography variant="h6" component="div" align="left" >
            {"Standings"}
            </Typography>
            <Grid container direction="row" spacing={2} style={{border:"1px solid white"}} >
             
              <Grid continer direction="column" rowSpacing={2} item md={6}>
                <Grid item xs={12}>
                  <Typography variant="h4">East</Typography>
                </Grid>
                
                {
                  eastTeamNames &&
                  eastTeamNames.map((teamName, key) => (

                    <Grid item xs={12} key={key}>
                      <TeamPositionCard pos={key} teamName={teamName} wins={7-key} losses={key}/>
                    </Grid>
                  ))
                }
                
              </Grid>
              
              <Grid continer direction="column" item md={6}>
                <Grid item xs={12}>
                  <Typography variant="h4">West</Typography>
                </Grid>
                
                {
                  westTeamNames &&
                  westTeamNames.map((teamName, key) => (
                    <Grid item xs={12} key={key}>
                      <TeamPositionCard pos={key} teamName={teamName}  wins={6-key} losses={key}/>
                    </Grid>
                  ))
                }
              </Grid>

            </Grid>
          </Container>
  
        {/**STATISTICS******/}
          <Grid container style={{backgroundColor:"red"}} direction="column">
            <Typography variant="h5" component="h2" align="left" >
            {"Statistics"}
            </Typography>
            <br>
            </br>
            <Typography variant="h6" component="div" align="left" >
            {"PPG"}
            </Typography>
            <Grid container direction="row" columnSpacing={2} justifyContent="space-evenly" style={{border:"1px solid white"}}>
              <Grid item md={2} >
                <PlayerCard name="Player1" ppg={10.5}/>
              </Grid>
              <Grid item md={2} >
                {<PlayerCard name="Player2" ppg={10.5}/>}
              </Grid>
              <Grid item md={2} >
                {<PlayerCard name="Player3" ppg={10.5}/>}
              </Grid>
              <Grid item md={2} >
                {<PlayerCard name="Player4" ppg={10.5}/>}
              </Grid>
              <Grid item md={2} >
                {<PlayerCard name="Player5" ppg={10.5}/>}
              </Grid>
            </Grid>
            
            <Typography variant="h6" component="div" align="left" >
            {"APG"}
            </Typography>
            <Grid container direction="row" columnSpacing={2} justifyContent="space-evenly" style={{border:"1px solid white"}}>
              <Grid item md={2} >
                <PlayerCard name="Player1" ppg={10.5}/>
              </Grid>
              <Grid item md={2} >
                {<PlayerCard name="Player2" ppg={10.5}/>}
              </Grid>
              <Grid item md={2} >
                {<PlayerCard name="Player3" ppg={10.5}/>}
              </Grid>
              <Grid item md={2} >
                {<PlayerCard name="Player4" ppg={10.5}/>}
              </Grid>
              <Grid item md={2} >
                {<PlayerCard name="Player5" ppg={10.5}/>}
              </Grid>
            </Grid>

            <Typography variant="h6" component="div" align="left" >
            {"RPG"}
            </Typography>
            <Grid container direction="row" justifyContent="space-evenly" style={{border:"1px solid white"}}>
              <Grid item md={2} >
                <PlayerCard name="Player1" ppg={10.5}/>
              </Grid>
              <Grid item md={2} >
                {<PlayerCard name="Player2" ppg={10.5}/>}
              </Grid>
              <Grid item md={2} >
                {<PlayerCard name="Player3" ppg={10.5}/>}
              </Grid>
              <Grid item md={2} >
                {<PlayerCard name="Player4" ppg={10.5}/>}
              </Grid>
              <Grid item md={2} >
                {<PlayerCard name="Player5" ppg={10.5}/>}
              </Grid>
            </Grid>
          </Grid>
          
          
          </Grid>
        </Box>

      </HomeLayout>
    </div>
    );
};

export default Home;