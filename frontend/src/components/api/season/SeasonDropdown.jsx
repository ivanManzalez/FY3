import React, {useState, useRef, forwardRef, useImperativeHandle} from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const SeasonDropdown = forwardRef(({ name, options, setState},ref) => {

  const [selection, setSelection] = useState("");

  const handleChange = (event) =>{
    setSelection(event.target.value);
    setState(event.target.value);
  };
  const clearSeasonSelection = () => {
    setSelection("");
  }
  // Expose the clearFields function via the ref
  useImperativeHandle(ref, () => ({
    clearSeasonSelection,
  }));
  console.log("SeasonDropdown options -- ",options);
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
        {options && options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.season_year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>)
});

console.log("...end...")
export default SeasonDropdown;