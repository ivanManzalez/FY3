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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useMediaQuery, useTheme} from "@mui/material";

// 
import PlayerCard from "../players/PlayerCard"
import Carousel from "../carousel/Carousel"
// 

const TeamPositionCard = (props) => {
  const teamImgsDir = "/static/images/";
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.only("md"))
  const isSmall = useMediaQuery(theme.breakpoints.only("sm"))
  const isXsmall = useMediaQuery(theme.breakpoints.only("xs"))
  const dir = (isSmall || isXsmall ) ? "column" : "row";

  return(
    <Card style={{ marginBottom: '10px', padding:"0px" }} variant="outlined" >
      <CardContent>
      <Grid container direction={dir} alignItems="left" justifyContent="space-between">
        
        <Grid container item sx={{backgroundColor:'yellow'}} xs={9}>
          <Grid item>
            <Typography variant="h5">#{props.pos+1}</Typography>
          </Grid>

          <Grid item> 
            <CardMedia
              component="img"
              width="50"
              height="50"
              image={"/static/images/team_logos/"+props.teamName+".png"}
              alt="team logo"
              margin="right"
            />
          </Grid>
        </Grid>

        <Grid item margin={"left"} sx={{backgroundColor:'red'}} xs={3}>
          <Typography variant="h6">{props.wins} - {props.losses}</Typography>
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

  const data = [
  {
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    title: 'Night view',
    description: '4.21M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
    title: 'Lake view',
    description: '4.74M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    title: 'Mountain view',
    description: '3.98M views',
  },
];


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

  const pointsLeaders = [
    {
      name:"Player One",
      ppg:6.8
    },
    {
      name:"Player Two",
      ppg:5.8
    },
    {
      name:"Player Three",
      ppg:4.8
    },
    {
      name:"Player Four",
      ppg:3.3
    },
    {
      name:"Player Five",
      ppg:1.0
    },
  ]

  const astsLeaders = [
    {
      name:"Player One",
      apg:6.8
    },
    {
      name:"Player Two",
      apg:5.8
    },
    {
      name:"Player Three",
      apg:4.8
    },
    {
      name:"Player Four",
      apg:3.3
    },
    {
      name:"Player Five",
      apg:1.0
    },
  ]

  const rebsLeaders = [
    {
      name:"Player One",
      rpg:6.8
    },
    {
      name:"Player Two",
      rpg:5.8
    },
    {
      name:"Player Three",
      rpg:4.8
    },
    {
      name:"Player Four",
      rpg:3.3
    },
    {
      name:"Player Five",
      rpg:1.0
    },
  ]


  const handleLogout = async () =>{
    setError('');
    try{
      await logout();
      navigate(logoutRedirect) // redirect
    }catch{
      setError('Failed to logout');
    }
  };
                  
  return(
    <div>
      <HomeLayout>
        <h1>Welcome back {currentUser.email}!</h1>
        <Link to="/login" ><button onClick={handleLogout}>Logout</button></Link>
        
       
        <Box>
          <Grid container style={{border:"2px solid black"}}>
          
          {/***SCHEDULE*****/}
          <Grid container direction="column" style={{backgroundColor:"blue"}}>
            <Typography variant="h6" component="div" align="left" >
            {"Upcoming Events"}
            </Typography>

            

            <Grid container direction="row" style={{border:"2px solid white", minHeight:"50px"}} item >
              {/*<Carousel data={upcomingGames} ChildComponent={GameCard} />}*/}
              <Carousel />
            </Grid>
          </Grid>

          {/***STANDINGS*****/}
          <Container style={{backgroundColor:""}}>
            <Typography variant="h6" component="div" align="left" >
            {"Standings"}
            </Typography>
            <Grid container direction="row" spacing={1} style={{}} >
             
              <Grid continer direction="column" item xs={6} sx={{}}>
                <Grid item xs={12}>
                  <Typography variant="h4">East</Typography>
                </Grid>
                
                {
                  eastTeamNames &&
                  eastTeamNames.map((teamName, key) => (

                    <Grid item xs={12} key={key}>
                      <TeamPositionCard pos={key} teamName={teamName} wins={7-key} losses={key} />
                    </Grid>
                  ))
                }
                
              </Grid>
              
              <Grid continer direction="column" item xs={6} sx={{}} >
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
            {"League Leaders"}
            </Typography>
            <br>
            </br>
            <Typography variant="h6" component="div" align="left" >
            {"PPG"}
            </Typography>
            <Grid container direction="row" columnSpacing={2} justifyContent="space-evenly" style={{}}>
              
            {
              pointsLeaders &&
                pointsLeaders.map((player, key) => (
                  <Grid item key={key}>
                    <PlayerCard name={player.name} ppg={player.ppg}/>
                  </Grid>
                ))
            }
            <Grid item >
              <Typography variant="p">See all</Typography>
            </Grid>

            </Grid>
            
            <Typography variant="h6" component="div" align="left" >
            {"APG"}
            </Typography>
            <Grid container direction="row" columnSpacing={2} justifyContent="space-evenly" style={{}}>
            {
              astsLeaders &&
                astsLeaders.map((player, key) => (
                  <Grid item key={key}>
                    <PlayerCard name={player.name} apg={player.apg}/>
                  </Grid>
                ))
            }
            <Grid item >
              <Typography variant="p">See all</Typography>
            </Grid>
            </Grid>

            <Typography variant="h6" component="div" align="left" >
            {"RPG"}
            </Typography>
            <Grid container direction="row" columnSpacing={2} justifyContent="space-evenly" style={{}}>
            {
              rebsLeaders &&
                rebsLeaders.map((player, key) => (
                  <Grid item key={key}>
                    <PlayerCard name={player.name} rpg={player.rpg}/>
                  </Grid>
                ))
            }
            <Grid item >
              <Typography variant="p">See all</Typography>
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