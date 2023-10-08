import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const SeasonDropdown = ({ name, options, setState}) => {

  const [selection, setSelection] = React.useState("");
  // const optionsArray = convertToArray(options);

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
        {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.season_year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>)
};
const convertToArray = (nonArray) => {
  let newArr = nonArray;
  if (!Array.isArray(nonArray)) {
    newArr = Object.entries(nonArray);
  };
  return newArr;
};

export default SeasonDropdown;