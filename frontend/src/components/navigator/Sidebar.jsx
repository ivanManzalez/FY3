import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Drawer, CssBaseline, List, ListItem, ListItemText, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import HomeIcon from "./HomeIcon";
import ScheduleIcon from "./ScheduleIcon";
import BarChartIcon from "./BarChartIcon";
import CommissionerIcon from "./ComissionerIcon";
import StandingIcon from "./StandingIcon";

const StyledSidebar = styled(Drawer)(({ theme }) => ({
  width: "300px",
  flexShrink: 0,

  "& .MuiDrawer-paper": {
    width: "250px",
    border: "none",
    background: `linear-gradient(135deg, rgba(34, 31, 59, 0.99), rgba(27, 9, 82, 0.95), rgba(34, 31, 59, 0.99))`,
    // backgroundColor: 'rgba(34, 31, 59, 0.99)',//"#221F3B",//"#6F4A8E",//"#090619",//"#0b091e",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%", 
    // zIndex:5,
  },
}));

const Logo = styled(Box)({
  color: "rgba(255,255,255,0.3)",
  display: "flex",
  justifyContent: "center",
  padding: "25px 25px 35px 25px",
})

const StyledLink = styled(NavLink)({
  color: 'rgba(255,255,255, 0.75)',
  textDecoration: 'none',
  '&:hover': {
    // color: 'white',
    textDecoration: 'none',
  },
  '&.active': {
    backgroundColor: '#120E26', // Apply your active background color
    borderRadius: '12px',
  },
});

const LinkBox = styled(Box)(({ isActive }) => ({
  padding: '15px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: isActive ? '#201B36' : 'transparent',
  borderRadius: isActive ? '12px' : '0',
  '&:hover': {
    backgroundColor: '#201B36',
    borderRadius: '12px',
  },
}));

const OuterBox = styled(Box)({
  padding: '8px 20px',
});

const Sidebar = () => {
  const location = useLocation(); // Get the current location

  const list = (
    <List>
      <Logo>
        <a href="/"><img className={"fy3_logo"} src="/static/images/fy3-logo.png" alt="fy3-logo"></img></a>
      </Logo>
      {/*************/}
      <OuterBox>
        <StyledLink to="/" activeClassName="active">
          <LinkBox isActive={location.pathname === '/'}>
            <HomeIcon width={"18px"} height={"18px"} fill={"none"} color={"rgba(255,255,255,0.7)"} style={{ cursor: "pointer" }}/>
            <Typography style={{paddingLeft:"10px"}}>Home</Typography>
          </LinkBox>
        </StyledLink>
      </OuterBox>
      {/*************/}
      <OuterBox>
        <StyledLink to="/commissioner">
          <LinkBox isActive={location.pathname === '/commissioner'}>
            <CommissionerIcon width={"18px"} height={"18px"} fill={"none"} color={"rgba(255,255,255,0.7)"} style={{ cursor: "pointer" }}/>
            <Typography style={{paddingLeft:"10px"}}>Commissioner</Typography>
          </LinkBox>
        </StyledLink>
      </OuterBox>
      {/*************/}
      <OuterBox>
        <StyledLink to="/standings">
          <LinkBox isActive={location.pathname === '/standings'}>
            <StandingIcon width={"18px"} height={"18px"} fill={"none"} color={"rgba(255,255,255,0.7)"} style={{ cursor: "pointer" }}/>
            <Typography style={{paddingLeft:"10px"}}>Standings</Typography>
          </LinkBox>
        </StyledLink>
      </OuterBox>
      {/*************/}
      <OuterBox>
        <StyledLink to="/stats">
          <LinkBox isActive={location.pathname === '/stats'}>
            <BarChartIcon width={"18px"} height={"18px"} fill={"none"} color={"rgba(255,255,255,0.7)"} style={{ cursor: "pointer" }}/>
            <Typography style={{paddingLeft:"10px"}}>Stats</Typography>
          </LinkBox>
        </StyledLink>
      </OuterBox>
      {/*************/}
      <OuterBox>
        <StyledLink to="/schedule">
          <LinkBox isActive={location.pathname === '/schedule'}>
            <ScheduleIcon width={"18px"} height={"18px"} fill={"none"} color={"rgba(255,255,255,0.7)"} style={{ cursor: "pointer" }}/>
            <Typography style={{paddingLeft:"10px"}}>Schedule</Typography>
          </LinkBox>
        </StyledLink>
      </OuterBox>
      {/*************/}
    </List>
  );

  const settingsAndProfile = (
    <List>
      {/* Settings link */}
      <ListItem button>
        <ListItemText primary={<StyledLink to="/settings">Settings</StyledLink>} />
      </ListItem>
      {/* User profile link */}
      <ListItem button>
        <ListItemText primary={<StyledLink to="/profile">User Profile</StyledLink>} />
      </ListItem>
    </List>
  );


  return (
    <React.Fragment>
      <CssBaseline />      
      <StyledSidebar variant="permanent">
        {list}
        {/* <div>{settingsAndProfile}</div> */}
      </StyledSidebar>
    </React.Fragment>
  );
};

export default Sidebar;

