import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

const AutoCompletePlayerDropdown = ({options, handleSelection}) => {
  const [loadedOptions, setLoadedOptions] = React.useState([]);
  const [filteredOptions, setFilteredOptions] = React.useState([]);
  const [value, setValue] = React.useState(null);
  
  const defaultProps = {
    options: filteredOptions,
    getOptionLabel: (option) => option.first_name+" "+option.last_name,
  };

  const flatProps = {
    options: Array.isArray(options)
      ? options.map((option) => option.first_name + ' ' + option.last_name)
      : [], // Return an empty array if options is not an array
  };

  const handleInputChange = (event, newInputValue) => {
    handleSelection(event, newInputValue);
  };

  React.useEffect(()=>{
    setLoadedOptions(options);
    setFilteredOptions(options);
  },[options])

  return (
    <Stack spacing={1} sx={{ width: 500 }}>
      <Autocomplete
        {...defaultProps}
        id=""
        value={value}
        clearOnEscape={true}
        onChange={handleInputChange}
        renderInput={(params) => (
          <TextField {...params} label="Select Player" variant="outlined" />
        )}
      />
    </Stack>
  );
}

export default AutoCompletePlayerDropdown;
