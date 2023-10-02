import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {retrieveAllSeasons} from './season';


const SelectSeason = ({getSeason}) => {
  const [seasonsList, setSeasonsList] = React.useState([]);
  const [season, setSeason] = React.useState("");

  // Populate seasons on initial render
  React.useEffect(async () => {
    const allSeasons = await retrieveAllSeasons();
    setSeasonsList(allSeasons);
  }, []);

  const handleChange = async (event) => {
    setSeason(event.target.value);
    getSeason(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="all_seasons">Season</InputLabel>
        <Select
          labelId="season_select_label"
          id="season_select"
          value={season}
          label="Select a Season"
          onChange={handleChange}
        >  
        {seasonsList.map((season) => (
          <MenuItem key={season.id} value={season.id}>
            {season.season_year}
          </MenuItem>
        ))}

        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectSeason;