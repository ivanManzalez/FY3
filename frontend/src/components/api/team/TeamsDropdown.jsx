import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const TeamsDropdown = ({ name, options, setState}) => {

  const [selection, setSelection] = React.useState("");
  const optionsArray = convertToArray(options);

  const handleChange = (event) =>{
    setSelection(event.target.value);
    setState(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select_label">{name}</InputLabel>
        <Select
          labelId="select_label"
          id="select"
          value={selection}
          label={name}
          onChange={handleChange}
          >
          {optionsArray.map((option) => (
            <MenuItem key={option[1].id} value={option[0]}>
              {option[1].team_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

const convertToArray = (nonArray) => {
  let newArr = nonArray;
  if (!Array.isArray(nonArray)) {
    newArr = Object.entries(nonArray);
  };
  return newArr;
};

const selectTeamOptions = ({options}) => {
  if (options == null) {
    return null; // Return null or an appropriate fallback if options is not an array
  };
  return (
    optionsArray.map((option) => (
      <MenuItem
        key={option[1].id}
        value={option[1].team_name}
      >
        {option[1].team_name}
      </MenuItem>
    ))
  );
};


// <MenuItem key={id} value={option[1].team_name} onClick={clickHandler}>
    //   {option[1].team_name}
    // </MenuItem>
export default TeamsDropdown;