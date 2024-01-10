import React, {useState} from "react";
import Sidebar from "./Sidebar";
import { Link, NavLink } from "react-router-dom";
import { AppBar, Toolbar, Grid, Avatar, Menu, MenuItem, Box, Typography, useTheme, useMediaQuery, Drawer} from "@mui/material";
import { styled } from "@mui/system";
import SettingsIcon from "./SettingsIcon";
import HomeIcon from "./HomeIcon";
import ScheduleIcon from "./ScheduleIcon";
import BarChartIcon from "./BarChartIcon";
import CommissionerIcon from "./ComissionerIcon";
import StandingIcon from "./StandingIcon";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';



const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "#221F3B",//"linear-gradient(#221F3B 90%, transparent)",//"linear-gradient(#1936d2, transparent)" //'#090619' //#1936d2
  boxShadow: "1px",
  maxHeight:"30%",
}));


const SearchBar = styled("input")({
  border: "solid 1px rgba(255,255,255,0.4)",
  color: "rgba(255,255,255,0.6)",
  background: "none",
  borderRadius: "18px",
  padding: "10px",
  transition: "background-color 0.3s ease-in-out", 
  outline: "none",
  width:'200px',

  '&:focus': {
      border: "solid 1px rgb(255,255,255,0.6)",
    },
  
  '&:hover': {
    border: "solid 1px rgb(255,255,255,0.6)",
  },
  '::placeholder': {
      color: 'rgba(255, 255, 255, 0.4)', 
    },
});
const Logo = styled(Box)({
    marginLeft:"20px",
    color: "rgba(255,255,255,0.3)",
    // backgroundColor:"red",
    display: "flex",
    justifyContent: "center",
    alignItems: 'center',
    // maxHeight:"100%",
    maxWidth:"7%",

    // padding: "25px 25px 35px 25px",
    // width: "20px",
  })
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

const StyledLink = styled(NavLink)({
  color: 'rgba(255,255,255, 0.75)',
  textDecoration: 'none',
  '&:hover': {
    color: 'white',
    textDecoration: 'none',
  },
  '&:active': {
    backgroundColor: '#120E26', // Apply your active background color
    borderRadius: '12px',
  },
});
const OuterBox = styled(Box)({
  padding: '8px 20px',
});

const NavLinks = () => {
  return (
    <>
      <OuterBox>
        <StyledLink to="/" activeClassName="active">
        <LinkBox isActive={location.pathname === '/'}>
            <HomeIcon width={"18px"} height={"18px"} fill={"none"} color={"rgba(255,255,255,0.7)"} style={{ cursor: "pointer" }}/>
            <Typography style={{paddingLeft:"10px"}}>Home</Typography>
          </LinkBox>
        </StyledLink>
      </OuterBox>
      
      <OuterBox>
        <StyledLink to="/commissioner">
          <LinkBox isActive={location.pathname === '/commissioner'}>
            <CommissionerIcon width={"18px"} height={"18px"} fill={"none"} color={"rgba(255,255,255,0.7)"} style={{ cursor: "pointer" }}/>
            <Typography style={{paddingLeft:"10px"}}>Commissioner</Typography>
          </LinkBox>
        </StyledLink>
      </OuterBox>
      
      <OuterBox>
        <StyledLink to="/standings">
          <LinkBox isActive={location.pathname === '/standings'}>
            <StandingIcon width={"18px"} height={"18px"} fill={"none"} color={"rgba(255,255,255,0.7)"} style={{ cursor: "pointer" }}/>
            <Typography style={{paddingLeft:"10px"}}>Standings</Typography>
          </LinkBox>
        </StyledLink>
      </OuterBox>
      
      <OuterBox>
        <StyledLink to="/stats">
          <LinkBox isActive={location.pathname === '/stats'}>
            <BarChartIcon width={"18px"} height={"18px"} fill={"none"} color={"rgba(255,255,255,0.7)"} style={{ cursor: "pointer" }}/>
            <Typography style={{paddingLeft:"10px"}}>Stats</Typography>
          </LinkBox>
        </StyledLink>
      </OuterBox>
      
      <OuterBox>
        <StyledLink to="/schedule">
          <LinkBox isActive={location.pathname === '/schedule'}>
            <ScheduleIcon width={"18px"} height={"18px"} fill={"none"} color={"rgba(255,255,255,0.7)"} style={{ cursor: "pointer" }}/>
            <Typography style={{paddingLeft:"10px"}}>Schedule</Typography>
          </LinkBox>
        </StyledLink>
      </OuterBox> 
    </>
  )}

const Navbar = ({isLarge, isXlarge}) => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [showSidebar,setShowSidebar] = useState(true)
  const drawerWidth = 240;
  const [open, setOpen] = React.useState(false);



  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const toggleSidebar = () => {
    setOpen(!open);
    console.log(!open);
    console.log("Toggle")
  }


  const theme = useTheme();
  const showNavLinks = useMediaQuery(theme.breakpoints.up("md"))
  
  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <Logo>
          <a href="/"><img className={"fy3_logo-nav"} src="/static/images/fy3-logo.png" alt="fy3-logo"></img></a>
          {/*<Typography variant="h5" style={{paddingLeft:"10px"}}>FY3</Typography>*/}
        </Logo>
        <Grid container alignItems="center" justifyContent="flex-end">
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
      <Sidebar/>
      </Drawer>
        { isLarge || isXlarge 
          ?
          (<>
            <NavLinks />
            {
              isXlarge
              ?
              <><Avatar
                alt="User Profile"
                src="/path/to/profile-image.png"
                onClick={handleMenuOpen}
                style={{ cursor: "pointer", marginLeft:'15px'}}
              />
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
              </Menu>
              </>
              :
              <></>
            }
            
          </>)
          :
          (<IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleSidebar}
            edge="start"
            sx={{ mr: 2, ...(open) }}
          >
            <MenuIcon />
          </IconButton>
          )}
        
      </Grid>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;

{/*<SearchBar placeholder="Search here..." style={{marginRight:'30px'}}/>*/}
{/*<Link to="/settings">
  <SettingsIcon 
    width={"24px"}
    height={"24px"} 
    fill={"none"} 
    color={"rgba(255,255,255,0.7)"} 
    style={{ cursor: "pointer" }}
  />
</Link>*/}

 {/*<Drawer
  sx={{
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
    },
  }}
  variant="persistent"
  anchor="left"
  open={open}
/>*/}