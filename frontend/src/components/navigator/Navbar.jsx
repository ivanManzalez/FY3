import React, {useState} from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Grid, Avatar, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import SettingsIcon from "./SettingsIcon";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#090619',
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

const Navbar = () => {
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <Grid container alignItems="center" justifyContent="flex-end">
        <SearchBar placeholder="Search here..." style={{marginRight:'30px'}}/>
        <Link to="/settings">
          <SettingsIcon 
            width={"24px"}
            height={"24px"} 
            fill={"none"} 
            color={"rgba(255,255,255,0.7)"} 
            style={{ cursor: "pointer" }}
          />
        </Link>
        <Avatar
            alt="User Profile"
            src="/path-to-profile-image.png"
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
        </Grid>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
