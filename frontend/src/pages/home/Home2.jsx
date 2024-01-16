import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import StandingsPreview from "./Standings";
import LeagueLeaders from "./LeagueLeaders";
import EventCarousel from "./EventCarousel";


import Carousel from "../../components/carousel/Carousel"

const Home2 = () => {
  const styles = {
    minHeight:150,
    // backgroundColor:"",
    // border:"2px solid white"
  };

  const boxStyles = {
    marginTop:100, 
    border:"2px dashed white", 
    padding:20
  };

  const sectionStyles = {

  };
  
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

  return(
    <Box style={boxStyles}>
      <Grid container direction="row" spacing={2} justifyContent="space-evenly">
        <Grid container direction="column" item md={6} xs={12} spacing={1} >
          <Grid container item style={styles} >
            <Carousel />
          </Grid>
          {/*<Grid container item style={styles} >
            <EventCarousel />
          </Grid>*/}
          <Grid container item style={styles} >
            <LeagueLeaders playerData={pointsLeaders} />
          </Grid>
          <Grid container item style={styles} >
            <LeagueLeaders playerData={astsLeaders} />
          </Grid>
          <Grid container item style={styles} >
            <LeagueLeaders playerData={rebsLeaders} />
          </Grid>
        </Grid>

        <Grid container item style={sectionStyles} md={6} xs={12}>
          <StandingsPreview />
        </Grid>
      </Grid>
    </Box>  
  )};

export default Home2;