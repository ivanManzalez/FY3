import React, { useState, forwardRef, useImperativeHandle} from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const TeamsDropdown = forwardRef(({ name, options, setState, validSelection},ref) => {

  const [selection, setSelection] = useState("");
  
  const handleChange = (event) =>{
    setSelection(event.target.value);
    setState(event.target.value);
  };

  const clearTeamSelection = () => {
    console.log("*** clearing...", selection)
    setSelection("");
  }
  // Expose the clearFields function via the ref
  useImperativeHandle(ref, () => ({
    clearTeamSelection,
  }));

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth error={validSelection}>
        <InputLabel id="select_label">{name}</InputLabel>
        <Select
          labelId="select_label"
          id="select"
          value={selection}
          label={name}
          onChange={handleChange}
          >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.team_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
});

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

export default TeamsDropdown;