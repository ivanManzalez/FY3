import React, {useState} from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useMediaQuery, Grid, useTheme} from "@mui/material";


const Layout = ({ children }) => {

  const theme = useTheme();
  const isXlarge = useMediaQuery(theme.breakpoints.only("xl"))
  const isLarge = useMediaQuery(theme.breakpoints.only("lg"))
  const isMedium = useMediaQuery(theme.breakpoints.only("md"))
  const isSmall = useMediaQuery(theme.breakpoints.only("sm"))
  const isXsmall = useMediaQuery(theme.breakpoints.only("xs"))
  const pady = 100;


  return (
    <Grid container direction="column" style={{display:"flex"}}>
      <Grid item >
        <Navbar isLarge={isLarge} isXlarge={isXlarge} />
      </Grid>
      <Grid item style={{paddingTop:pady}} >
        {children}
      </Grid>
    </Grid>
  );
};

export default Layout;
