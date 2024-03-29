import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

////////////////////////////////////////////////////////////////////////

const Item = styled(Paper)(({ theme }) => ({

  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

////////////////////////////////////////////////////////////////////////
const HomeLayout = ({children}) => {
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Item>{children}</Item>
        </Grid>
      </Grid>
    </Box>
  )
};

export default HomeLayout;