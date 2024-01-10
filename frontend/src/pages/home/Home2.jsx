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
    // border:"2px solid black"
  }
  const boxStyles = {
    marginTop:100, 
    // border:"3px dashed black", 
    padding:20
  };

  const sectionStyles = {

  };

  return(
    <Box style={boxStyles}>
      <Grid container direction="row" spacing={2} style={{}} justifyContent="space-evenly">
        <Grid container direction="column" item md={6} xs={12} spacing={1} >
          <Grid container item style={styles} >
            <Carousel />
          </Grid>
          {/*<Grid container item style={styles} >
            <EventCarousel />
          </Grid>*/}
          <Grid container item style={styles} >
            <LeagueLeaders />
          </Grid>
          <Grid container item style={styles} >
            <LeagueLeaders />
          </Grid>
          <Grid container item style={styles} >
            <LeagueLeaders />
          </Grid>
        </Grid>

        <Grid container item style={sectionStyles} md={6} xs={12}>
          <StandingsPreview />
        </Grid>
      </Grid>
    </Box>  
  )};

export default Home2;