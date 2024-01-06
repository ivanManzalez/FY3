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


  return (
    <Grid container direction="column" style={{display:"flex"}}>
      <Grid item gutterBottom>
        <Navbar isLarge={isLarge||isXlarge} />
      </Grid>
      <Grid item>{children}</Grid>
    </Grid>
  );
};

export default Layout;

// 
// {isPhone && (
//   <>
//   <Grid item md={2} sm={1} xs={0}>
//     <Sidebar />
//   </Grid>
//   <Grid item xs={12}>
//     <div style={{ padding: "10px", marginLeft: "300px"}}>
//       {children}
//     </div>
//   </Grid>
//   </>
// )}
// {isTablet && (
//   <>
//   <Grid item md={2} sm={1} xs={0}>
//     <Sidebar />
//   </Grid>
//   <Grid item xs={12}>
//     <div style={{ padding: "10px", marginLeft: "300px"}}>
//       {children}
//     </div>
//   </Grid>
//   </>
// )}
// {isDesktop && (
//   <>
//   <Grid item md={3}>
//     <Navbar />
//   </Grid>
//   <Grid item xs={12}>
//     <div style={{ padding: "10px", marginTop: "6%"}}>
//       {children}
//     </div>
//   </Grid>
//   </>
// )}
// 