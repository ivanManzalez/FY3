import React from "react";
import { Link } from "react-router-dom";
import { Drawer, CssBaseline, List, ListItem, ListItemText } from "@mui/material";
import { styled } from "@mui/system";

const Sidebar = styled(Drawer)(({ theme }) => ({
  width: "300px",
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: "250px",
    backgroundColor:"#333",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%", 
  },
}));

const StyledLink = styled(Link)({
  color: 'white',
  textDecoration: 'none',
  '&:hover': {
    color: 'white',
    textDecoration: 'none',
  },
});

const Navbar = () => {
  const list = (
    <List>
      <ListItem button >
        <ListItemText primary={<StyledLink to="/">Home</StyledLink>} />
      </ListItem>
      <ListItem button>
        <ListItemText primary={<StyledLink to="/commissioner">Commissioner</StyledLink>} />
      </ListItem>
      <ListItem button>
        <ListItemText primary={<StyledLink to="/standings">Standings</StyledLink>} />
      </ListItem>
      <ListItem button>
        <ListItemText primary={<StyledLink to="/stats">Stats</StyledLink>} />
      </ListItem>
      <ListItem button>
        <ListItemText primary={<StyledLink to="/schedule">Schedule</StyledLink>} />
      </ListItem>
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
      <Sidebar variant="permanent">
        {list}
        <div>{settingsAndProfile}</div>
      </Sidebar>
    </React.Fragment>
  );
};

export default Navbar;
